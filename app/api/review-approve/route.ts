// /app/api/review-approve/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "리뷰 id 누락" }, { status: 400 });
  }

  try {
    const reviewRef = doc(db, "reviews", id);
    await updateDoc(reviewRef, { isApproved: true });
    return NextResponse.redirect("https://cheermeuplife-web.vercel.app/");
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
