import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import nodemailer from "nodemailer";
import { db } from "@/lib/firebase";

type PerformanceInquiryBody = {
  contactName?: unknown;
  organization?: unknown;
  email?: unknown;
  eventDate?: unknown;
  dateUndecided?: unknown;
  location?: unknown;
  eventType?: unknown;
  message?: unknown;
};

const eventTypes = new Set(["학교축제", "체육대회", "기업·기관 행사", "지역축제", "기타"]);

const normalizeText = (value: unknown) => typeof value === "string" ? value.trim() : "";

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json().catch(() => null) as PerformanceInquiryBody | null;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json({ ok: false, error: "올바른 요청 형식이 아닙니다." }, { status: 400 });
    }

    const contactName = normalizeText(payload.contactName);
    const organization = normalizeText(payload.organization);
    const email = normalizeText(payload.email).toLowerCase();
    const eventDate = normalizeText(payload.eventDate);
    const dateUndecided = payload.dateUndecided === true;
    const location = normalizeText(payload.location);
    const eventType = normalizeText(payload.eventType);
    const message = normalizeText(payload.message);

    if (!contactName || !organization || !email || !location || !eventTypes.has(eventType) || !message || (!dateUndecided && !eventDate)) {
      return NextResponse.json({ ok: false, error: "필수 입력값을 확인해주세요." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
      return NextResponse.json({ ok: false, error: "이메일 주소를 확인해주세요." }, { status: 400 });
    }

    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
      console.error("Performance inquiry email configuration is missing");
      return NextResponse.json({ ok: false, error: "문의 전송 설정을 확인할 수 없습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
    }

    const inquiry = {
      contactName,
      organization,
      email,
      eventDate: dateUndecided ? "일정 미정" : eventDate,
      dateUndecided,
      location,
      eventType,
      message,
      status: "new",
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "performanceInquiries"), inquiry);
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      secure: true,
    });

    await transporter.sendMail({
      from: `"취미로운응원생활 공연 문의" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `[공연·행사 섭외 문의] ${eventType} · ${organization}`,
      html: `
        <div>
          <h2>새로운 공연·행사 섭외 문의가 접수되었습니다.</h2>
          <ul>
            <li><b>문의 ID:</b> ${escapeHtml(docRef.id)}</li>
            <li><b>담당자:</b> ${escapeHtml(contactName)}</li>
            <li><b>소속·기관:</b> ${escapeHtml(organization)}</li>
            <li><b>이메일:</b> ${escapeHtml(email)}</li>
            <li><b>행사 예정일:</b> ${escapeHtml(inquiry.eventDate)}</li>
            <li><b>행사 지역·장소:</b> ${escapeHtml(location)}</li>
            <li><b>행사 종류:</b> ${escapeHtml(eventType)}</li>
            <li><b>문의 내용:</b> ${escapeHtml(message).replaceAll("\n", "<br />")}</li>
          </ul>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Performance inquiry submission failed", error);
    return NextResponse.json({ ok: false, error: "문의 전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
