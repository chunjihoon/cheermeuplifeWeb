// /app/api/review-submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // 1. 리뷰 저장 (isApproved: false로)
  const docRef = await addDoc(collection(db, "reviews"), {
    ...body,
    isApproved: false,
    createdAt: new Date(),
  });
  const reviewId = docRef.id;

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
  await transporter.sendMail({
    to: "guatemala3081@gmail.com",
    subject: "[취미로운응원생활] 새로운 리뷰가 도착했습니다.",
    html: `
      <div>
        <b>이름:</b> ${body.name}<br>
        <b>수업일자:</b> ${body.date}<br>
        <b>수업횟수:</b> ${body.count}<br>
        <b>내용:</b> ${body.content}<br>
        <a href="https://cheermeuplife-web.vercel.app/api/review-approve?id=${reviewId}">[승인]</a>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
