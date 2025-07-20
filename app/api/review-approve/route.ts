// /app/api/review-approve/route.ts
import { NextRequest, NextResponse } from "next/server";
// 예: 파일시스템/DB 등에서 해당 리뷰 찾아서 승인 처리
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  // DB/file에서 해당 name, date 리뷰 찾아서 isApproved: true로 업데이트
  // 실제 구현 필요 (ex. json file, mongo, firebase 등)
  return NextResponse.redirect("https://cheermeuplife-web.vercel.app/");
}
