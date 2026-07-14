import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import nodemailer from "nodemailer";
import { db } from "@/lib/firebase";

type VodOrderBody = {
  depositorName?: unknown;
  gmail?: unknown;
  gmailAccepted?: unknown;
  refundAccepted?: unknown;
  licenseAccepted?: unknown;
};

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const createOrderId = () => {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()).replaceAll("-", "");
  return `JFG-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as VodOrderBody;
    const depositorName = typeof body.depositorName === "string" ? body.depositorName.trim() : "";
    const gmail = typeof body.gmail === "string" ? body.gmail.trim().toLowerCase() : "";
    const gmailIsValid = /^[^\s@]+@gmail\.com$/i.test(gmail);
    const agreementsAccepted = body.gmailAccepted === true
      && body.refundAccepted === true
      && body.licenseAccepted === true;

    if (!depositorName || !gmailIsValid || !agreementsAccepted) {
      return NextResponse.json(
        { ok: false, error: "필수 정보와 동의 항목을 다시 확인해주세요." },
        { status: 400 },
      );
    }

    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
      console.error("VOD order email configuration is missing");
      return NextResponse.json(
        { ok: false, error: "주문 알림 설정을 확인할 수 없습니다. 잠시 후 다시 시도해주세요." },
        { status: 500 },
      );
    }

    const orderId = createOrderId();
    await addDoc(collection(db, "vodOrders"), {
      orderId,
      productCode: "JFG-VOD-001",
      productName: "질풍가도 치어리딩 전체 안무 튜토리얼",
      amount: 39000,
      depositorName,
      gmail,
      gmailAccepted: true,
      refundAccepted: true,
      licenseAccepted: true,
      status: "pending_deposit_confirmation",
      createdAt: new Date(),
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      secure: true,
    });

    await transporter.sendMail({
      from: `"취미로운응원생활 VOD 주문" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `[질풍가도 VOD] 입금 확인 요청 ${orderId}`,
      html: `
        <div>
          <h2>질풍가도 VOD 입금 정보가 접수되었습니다.</h2>
          <ul>
            <li><b>주문번호:</b> ${escapeHtml(orderId)}</li>
            <li><b>입금자명:</b> ${escapeHtml(depositorName)}</li>
            <li><b>Gmail:</b> ${escapeHtml(gmail)}</li>
            <li><b>결제 금액:</b> 39,000원</li>
            <li><b>상태:</b> 입금 확인 대기</li>
          </ul>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    console.error("VOD order submission failed", error);
    return NextResponse.json(
      { ok: false, error: "주문 접수 중 오류가 발생했습니다. 오류가 지속 될 경우 guatemala3081@gmail.com 으로 문의 부탁드리겠습니다." },
      { status: 500 },
    );
  }
}
