import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import nodemailer from "nodemailer";

type ReserveRequest = {
  service: string;
  name: string;
  email: string;
  contact: string;
  date1: string;
  time1: string;
  date2: string;
  time2: string;
  date3: string;
  time3: string;
  region: string;
  people: string;
  request: string;
};

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const normalizeText = (value: unknown) => typeof value === "string" ? value.trim() : "";

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ ok: false, error: "올바른 요청 형식이 아닙니다." }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const timePeriod1 = normalizeText(data.timePeriod1);
  const timeHour1 = normalizeText(data.timeHour1);
  const timePeriod2 = normalizeText(data.timePeriod2);
  const timeHour2 = normalizeText(data.timeHour2);
  const timePeriod3 = normalizeText(data.timePeriod3);
  const timeHour3 = normalizeText(data.timeHour3);
  const formatTime = (period: string, hour: string) => `${period === "AM" ? "오전" : "오후"} ${hour}시`;
  const body: ReserveRequest = {
    service: normalizeText(data.service),
    name: normalizeText(data.name),
    email: normalizeText(data.email),
    contact: normalizeText(data.contact),
    date1: normalizeText(data.date1),
    time1: formatTime(timePeriod1, timeHour1),
    date2: normalizeText(data.date2),
    time2: formatTime(timePeriod2, timeHour2),
    date3: normalizeText(data.date3),
    time3: formatTime(timePeriod3, timeHour3),
    region: normalizeText(data.region),
    people: normalizeText(data.people),
    request: normalizeText(data.request),
  };
  const emailConfirm = normalizeText(data.emailConfirm);
  const requiredValues = [
    body.service,
    body.name,
    body.email,
    emailConfirm,
    body.contact,
    body.date1,
    timePeriod1,
    timeHour1,
    body.date2,
    timePeriod2,
    timeHour2,
    body.date3,
    timePeriod3,
    timeHour3,
    body.region,
    body.people,
  ];

  if (requiredValues.some((value) => !value)) {
    return NextResponse.json({ ok: false, error: "필수 입력값을 확인해주세요." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ ok: false, error: "이메일 주소를 확인해주세요." }, { status: 400 });
  }

  if (body.email !== emailConfirm) {
    return NextResponse.json({ ok: false, error: "입력한 이메일 주소가 일치하지 않습니다." }, { status: 400 });
  }

  const timePeriods = [timePeriod1, timePeriod2, timePeriod3];
  const timeHours = [timeHour1, timeHour2, timeHour3];
  if (timePeriods.some((period) => period !== "AM" && period !== "PM") || timeHours.some((hour) => !/^(?:[1-9]|1[0-2])$/.test(hour))) {
    return NextResponse.json({ ok: false, error: "희망 시간은 AM/PM과 1시부터 12시 사이에서 선택해주세요." }, { status: 400 });
  }

  if (!/^[1-9][0-9]*$/.test(body.people)) {
    return NextResponse.json({ ok: false, error: "인원수는 1 이상의 정수로 입력해주세요." }, { status: 400 });
  }

  // 1. 예약내역 저장 (isApproved: false로)
  const docRef = await addDoc(collection(db, "reserves"), {
    ...body,
    isApproved: false,
    createdAt: new Date(),
  });
  const reserveId = docRef.id;

  // 2. 관리자에게 메일 발송
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    secure: true
  });

  // 승인/반려 링크 모두 reviewId 사용
  try {
    await transporter.sendMail({
        from: `"취미로운응원생활 예약접수" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER, // 본인 메일 주소(여러명 보내려면 ,로 구분)
        subject: "[취미로운응원생활] 신규 예약요청이 접수되었습니다.",
        html: `
          <div>
            <h3>신규 예약 신청이 접수되었습니다.</h3>
            <ul>
                <li><b>서비스:</b> ${escapeHtml(body.service)}</li>
                <li><b>신청인:</b> ${escapeHtml(body.name)}</li>
                <li><b>이메일:</b> ${escapeHtml(body.email)}</li>
                <li><b>연락처:</b> ${escapeHtml(body.contact)}</li>
                <li><b>희망 일정 1:</b> ${escapeHtml(body.date1)} ${escapeHtml(body.time1)}</li>
                <li><b>희망 일정 2:</b> ${escapeHtml(body.date2)} ${escapeHtml(body.time2)}</li>
                <li><b>희망 일정 3:</b> ${escapeHtml(body.date3)} ${escapeHtml(body.time3)}</li>
                <li><b>희망 지역:</b> ${escapeHtml(body.region)}</li>
                <li><b>인원수:</b> ${escapeHtml(body.people)}</li>
                <li><b>요청사항:</b> ${escapeHtml(body.request)}</li>
            </ul>
            <a href="https://cheermeuplife-web.vercel.app/api/reserve-approve?id=${reserveId}">[승인]</a>
          </div>
        `,
      });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err }, { status: 500 });
  }

}
