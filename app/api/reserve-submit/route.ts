// /app/api/review-submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
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
                <li><b>서비스:</b> ${body.service}</li>
                <li><b>신청인:</b> ${body.name}</li>
                <li><b>연락처:</b> ${body.contact}</li>
                <li><b>희망 날짜:</b> ${body.date}</li>
                <li><b>희망 시간:</b> ${body.time}</li>
                <li><b>희망 지역:</b> ${body.region}</li>
                <li><b>인원수:</b> ${body.people}</li>
                <li><b>요청사항:</b> ${body.request}</li>
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
