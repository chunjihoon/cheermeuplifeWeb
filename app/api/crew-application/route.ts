import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import nodemailer from "nodemailer";
import { isFirstPerformanceOpen } from "@/lib/crew";
import { db } from "@/lib/firebase";

type CrewApplicationBody = Record<string, unknown>;

const genders = new Set(["남성", "여성", "기타", "응답하지 않음"]);
const activityStatuses = new Set(["졸업생", "휴학생", "재학생", "기타"]);
const availableTimeOptions = new Set([
  "평일 오전",
  "평일 오후",
  "평일 저녁",
  "토요일",
  "일요일",
  "고정적으로 말하기 어렵지만 사전 안내 시 일정 조정 가능",
  "기타",
]);
const seoulMetroOptions = new Set(["참여 가능합니다.", "일정이나 지역에 따라 가능합니다.", "참여가 어렵습니다."]);
const oct21Options = new Set(["참여 가능합니다.", "아직 일정을 확인해야 합니다.", "이번 공연은 어렵습니다."]);
const preparationOptions = new Set(["가능합니다.", "세부 일정 협의가 필요합니다.", "어렵습니다."]);

const normalizeText = (value: unknown) => typeof value === "string" ? value.trim() : "";
const isWithin = (value: string, max: number) => value.length <= max;
const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");
const formatMultiline = (value: string) => escapeHtml(value).replaceAll("\n", "<br />");

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json().catch(() => null) as CrewApplicationBody | null;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json({ ok: false, error: "올바른 요청 형식이 아닙니다." }, { status: 400 });
    }

    const name = normalizeText(payload.name);
    const birthYear = normalizeText(payload.birthYear);
    const gender = normalizeText(payload.gender);
    const phone = normalizeText(payload.phone);
    const email = normalizeText(payload.email).toLowerCase();
    const location = normalizeText(payload.location);
    const cheerleadingExperience = normalizeText(payload.cheerleadingExperience);
    const activityStatus = normalizeText(payload.activityStatus);
    const activityStatusOther = normalizeText(payload.activityStatusOther);
    const availableTimeOther = normalizeText(payload.availableTimeOther);
    const seoulMetroAvailable = normalizeText(payload.seoulMetroAvailable);
    const activityLink = normalizeText(payload.activityLink);
    const motivation = normalizeText(payload.motivation);
    const oct21Availability = normalizeText(payload.oct21Availability);
    const oct21PreparationAvailability = normalizeText(payload.oct21PreparationAvailability);
    const questions = normalizeText(payload.questions);
    const privacyAccepted = payload.privacyAccepted === true;
    const firstPerformanceOpen = isFirstPerformanceOpen();
    const availableTimes = Array.isArray(payload.availableTimes)
      ? [...new Set(payload.availableTimes.map(normalizeText).filter(Boolean))]
      : [];

    const requiredText = [name, birthYear, gender, phone, email, location, cheerleadingExperience, activityStatus, seoulMetroAvailable, motivation];
    if (firstPerformanceOpen) requiredText.push(oct21Availability);
    if (requiredText.some((value) => !value) || availableTimes.length === 0 || !privacyAccepted) {
      return NextResponse.json({ ok: false, error: "필수 입력값과 개인정보 동의를 확인해주세요." }, { status: 400 });
    }

    if (!/^\d{4}$/.test(birthYear)) {
      return NextResponse.json({ ok: false, error: "출생연도는 4자리로 입력해주세요." }, { status: 400 });
    }

    if (!genders.has(gender) || !activityStatuses.has(activityStatus) || !seoulMetroOptions.has(seoulMetroAvailable) || (firstPerformanceOpen && !oct21Options.has(oct21Availability))) {
      return NextResponse.json({ ok: false, error: "선택 항목을 다시 확인해주세요." }, { status: 400 });
    }

    if (availableTimes.some((value) => !availableTimeOptions.has(value))) {
      return NextResponse.json({ ok: false, error: "활동 가능 시간대를 다시 확인해주세요." }, { status: 400 });
    }

    if (activityStatus === "기타" && !activityStatusOther) {
      return NextResponse.json({ ok: false, error: "현재 활동 상태를 입력해주세요." }, { status: 400 });
    }

    if (availableTimes.includes("기타") && !availableTimeOther) {
      return NextResponse.json({ ok: false, error: "기타 활동 가능 시간대를 입력해주세요." }, { status: 400 });
    }

    const preparationRequired = firstPerformanceOpen && (oct21Availability === "참여 가능합니다." || oct21Availability === "아직 일정을 확인해야 합니다.");
    if (preparationRequired && !preparationOptions.has(oct21PreparationAvailability)) {
      return NextResponse.json({ ok: false, error: "첫 공연 준비 일정 참여 여부를 확인해주세요." }, { status: 400 });
    }

    const phoneDigits = phone.replace(/\D/g, "").replace(/^82/, "0");
    if (!/^01[016789]\d{7,8}$/.test(phoneDigits)) {
      return NextResponse.json({ ok: false, error: "휴대전화 번호를 확인해주세요." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
      return NextResponse.json({ ok: false, error: "이메일 주소를 확인해주세요." }, { status: 400 });
    }

    const textLimits: Array<[string, number]> = [
      [name, 50], [phone, 20], [location, 100], [cheerleadingExperience, 3000],
      [activityStatusOther, 100], [availableTimeOther, 200], [activityLink, 500],
      [motivation, 3000], [questions, 3000],
    ];
    if (textLimits.some(([value, max]) => !isWithin(value, max))) {
      return NextResponse.json({ ok: false, error: "입력 가능한 글자 수를 초과한 항목이 있습니다." }, { status: 400 });
    }

    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
      console.error("Crew application email configuration is missing");
      return NextResponse.json({ ok: false, error: "지원서 전송 설정을 확인할 수 없습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
    }

    const application = {
      name,
      birthYear,
      gender,
      phone,
      email,
      location,
      cheerleadingExperience,
      activityStatus,
      activityStatusOther: activityStatus === "기타" ? activityStatusOther : "",
      availableTimes,
      availableTimeOther: availableTimes.includes("기타") ? availableTimeOther : "",
      seoulMetroAvailable,
      activityLink,
      motivation,
      oct21Availability: firstPerformanceOpen ? oct21Availability : null,
      oct21PreparationAvailability: preparationRequired ? oct21PreparationAvailability : null,
      questions,
      privacyAccepted: true,
      status: "new",
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "crewApplications"), application);
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      secure: true,
    });
    const availableTimesLabel = [
      ...availableTimes.filter((value) => value !== "기타"),
      ...(availableTimes.includes("기타") ? [`기타: ${availableTimeOther}`] : []),
    ].join(", ");
    const activityStatusLabel = activityStatus === "기타" ? `기타: ${activityStatusOther}` : activityStatus;

    await transporter.sendMail({
      from: `"취미로운 응원 크루 지원" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: `[취미로운 응원 크루 지원] ${name} / ${birthYear} / ${gender}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.65;color:#332a31">
          <h2>새로운 취미로운 응원 크루 지원서가 접수되었습니다.</h2>
          <p><b>지원서 ID:</b> ${escapeHtml(docRef.id)}</p>
          <table style="width:100%;border-collapse:collapse">
            <tbody>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">이름</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(name)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">출생연도</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(birthYear)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">성별</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(gender)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">연락처</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(phone)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">이메일</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(email)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">거주지역</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(location)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">액션 치어리딩 경력</th><td style="padding:8px;border:1px solid #eadce3">${formatMultiline(cheerleadingExperience)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">현재 활동 상태</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(activityStatusLabel)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">가능한 시간</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(availableTimesLabel)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">수도권 공연 참여</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(seoulMetroAvailable)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">활동 영상/SNS</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(activityLink || "미입력")}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">지원동기</th><td style="padding:8px;border:1px solid #eadce3">${formatMultiline(motivation)}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">10월 21일 참여</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(firstPerformanceOpen ? oct21Availability : "해당 없음")}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">첫 공연 준비</th><td style="padding:8px;border:1px solid #eadce3">${escapeHtml(preparationRequired ? oct21PreparationAvailability : "해당 없음")}</td></tr>
              <tr><th style="padding:8px;border:1px solid #eadce3;text-align:left">기타 문의</th><td style="padding:8px;border:1px solid #eadce3">${formatMultiline(questions || "미입력")}</td></tr>
            </tbody>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Crew application submission failed", error);
    return NextResponse.json({ ok: false, error: "지원서 전송 중 문제가 발생했습니다. 입력 내용을 유지한 채 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
