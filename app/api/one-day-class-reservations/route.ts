import { createHash } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import {
  isOneDayClassReservationOpen,
  ONE_DAY_CLASS_COLLECTION,
  ONE_DAY_CLASS_ID,
  oneDayClassDateValues,
  type OneDayClassDate,
} from "@/lib/one-day-class";

type ReservationPayload = {
  name?: unknown;
  email?: unknown;
  availableDates?: unknown;
  privacyConsent?: unknown;
  marketingConsent?: unknown;
};

const normalizeText = (value: unknown) => typeof value === "string" ? value.trim() : "";

function reservationId(email: string) {
  return createHash("sha256").update(`${ONE_DAY_CLASS_ID}:${email}`).digest("hex");
}

export async function POST(request: NextRequest) {
  if (!isOneDayClassReservationOpen()) {
    return NextResponse.json(
      { ok: false, error: "무료 사전예약이 종료되었습니다." },
      { status: 410 },
    );
  }

  try {
    const payload = await request.json().catch(() => null) as ReservationPayload | null;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json({ ok: false, error: "올바른 요청 형식이 아닙니다." }, { status: 400 });
    }

    const name = normalizeText(payload.name);
    const email = normalizeText(payload.email).toLowerCase();
    const privacyConsent = payload.privacyConsent === true;
    const marketingConsent = payload.marketingConsent === true;
    const availableDates = Array.isArray(payload.availableDates)
      ? [...new Set(payload.availableDates.map(normalizeText).filter(Boolean))]
      : [];

    if (!name || !email || availableDates.length === 0 || !privacyConsent) {
      return NextResponse.json(
        { ok: false, error: "필수 입력 항목과 개인정보 동의를 확인해주세요." },
        { status: 400 },
      );
    }

    if (name.length > 50 || email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "이름과 이메일 주소를 확인해주세요." }, { status: 400 });
    }

    if (availableDates.some((date) => !oneDayClassDateValues.has(date))) {
      return NextResponse.json({ ok: false, error: "참여 가능한 날짜를 다시 선택해주세요." }, { status: 400 });
    }

    const db = getAdminFirestore();
    const id = reservationId(email);
    const documentRef = db.collection(ONE_DAY_CLASS_COLLECTION).doc(id);

    const created = await db.runTransaction(async (transaction) => {
      const existing = await transaction.get(documentRef);
      if (existing.exists) return false;

      transaction.create(documentRef, {
        id,
        classId: ONE_DAY_CLASS_ID,
        name,
        email,
        availableDates: availableDates as OneDayClassDate[],
        privacyConsent: true,
        marketingConsent,
        createdAt: FieldValue.serverTimestamp(),
      });
      return true;
    });

    if (!created) {
      return NextResponse.json(
        { ok: false, error: "이미 사전예약이 접수된 이메일입니다. 기존 신청은 변경되지 않았습니다." },
        { status: 409 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("One-day class reservation failed", error);
    return NextResponse.json(
      { ok: false, error: "사전예약 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 },
    );
  }
}
