import { NextRequest, NextResponse } from "next/server";
// nodemailer 설치 필요: npm i nodemailer
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // 메일 설정 (gmail 예시, 환경변수로 관리 권장)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "guatemala3081@gmail.com",
    subject: "새로운 리뷰가 도착했습니다.",
    text: `
    이름: ${body.name}
    수업일자: ${body.date}
    수업횟수: ${body.count}
    리뷰내용: ${body.content}
    `,
    // 승인버튼 포함(아래 설명)
    html: `<p>이름: ${body.name}</p>
           <p>수업일자: ${body.date}</p>
           <p>수업횟수: ${body.count}</p>
           <p>리뷰내용: ${body.content}</p>
           <a href="https://cheermeuplife-web.vercel.app/api/review-approve?name=${encodeURIComponent(body.name)}&date=${encodeURIComponent(body.date)}">[승인]</a>`
  };

  await transporter.sendMail(mailOptions);
  return NextResponse.json({ ok: true });
}
