export const beginnerProgramConfig = {
  name: "Beginner 1기",
  startDate: "2026년 10월 18일(일)",
  schedule: "매주 일요일 19:00–21:00",
  scheduleNote: "",
  duration: "주 1회, 2시간 × 총 8회",
  venue: "서울 사당역 인근 연습실",
  venueNote: "정확한 장소는 참가 확정 후 공지 예정입니다.",
  price: 280000,
  priceLabel: "280,000원",
  totalHours: 16,
  recruitment: {
    capacity: 7,
    confirmedParticipants: 5,
  },
  orientation: {
    date: null,
    duration: "약 30분",
    note: "첫 수업 전 약 30분간 온라인으로 진행하며, 참가자들의 가능한 일정을 확인하여 날짜를 확정합니다.",
  },
  paymentUrl: process.env.NEXT_PUBLIC_BEGINNER_1_PAYAPP_URL?.trim() || "https://www.payapp.kr/L/z4lE7F",
} as const;

export type BeginnerStaffMember = {
  name: string;
  role: "프로그램 총괄" | "현장 강사";
  description: string;
  image: string | null;
  imageAlt: string;
};

export const beginnerStaff: BeginnerStaffMember[] = [
  {
    name: "천지훈",
    role: "프로그램 총괄",
    description: "Beginner 과정의 전체 기획과 커리큘럼 운영, 참가자 안내 및 프로그램 관리를 담당합니다. 현장 강사와 함께 매주 진행 상황을 확인하며 8주 과정 전체를 운영합니다.",
    image: "/beginner-1/profile-jihun.png",
    imageAlt: "천지훈 프로그램 총괄",
  },
  {
    name: "이다영",
    role: "현장 강사",
    description: "매주 오프라인 수업에서 기본동작과 스텝, 응원 안무를 직접 지도합니다. 참가자들의 진도와 어려워하는 부분을 확인하며 단계적으로 수업을 진행합니다.",
    image: "/beginner-1/profile-dayoung.png",
    imageAlt: "이다영 Beginner 1기 현장 강사",
  },
];

export type BeginnerCurriculumItem = {
  date: string;
  session: string;
  title: string;
  description: string;
  type: "orientation" | "regular";
  phase: string;
};

export const beginnerCurriculum: BeginnerCurriculumItem[] = [
  {
    date: "10/11",
    session: "사전 OT",
    title: "온라인 오리엔테이션",
    description: "첫 수업 전 약 1시간 온라인으로 진행합니다. 과정 운영 방식과 수업 진행에 필요한 내용을 안내합니다. 본격적인 연습에 들어가기 앞서 서로 인사를 나누고, 간단한 퀴즈 및 게임 등의 작은 레크리에이션을 진행할 예정입니다.",
    type: "orientation",
    phase: "과정 준비",
  },
  {
    date: "10/18",
    session: "1회차",
    title: "치어리딩 기본동작",
    description: "기본 자세와 손 모양을 익히고, 끌기·차기·좌우 이동 스텝, 박수, 화이팅 동작, 팔 돌리기, 점프 등 주요 기본동작을 연습합니다. 마지막에는 배운 기본동작을 활용한 실제 응원동작을 간단히 경험해봅니다.",
    type: "regular",
    phase: "기본동작 학습",
  },
  {
    date: "10/25",
    session: "2회차",
    title: "기초 연습곡 ① · ② 동작",
    description: "기초 연습곡의 ①·② 동작을 단계별로 익힌 뒤, 느린 속도의 음악에 맞춰 동작의 순서와 연결을 연습합니다.",
    type: "regular",
    phase: "기초 연습곡 학습",
  },
  {
    date: "11/1",
    session: "3회차",
    title: "기초 연습곡 ③ · ④ 동작",
    description: "기초 연습곡의 ③·④ 동작을 익히고, 느린 속도의 음악에 맞춰 새롭게 배운 동작과 앞서 학습한 동작을 연결해봅니다.",
    type: "regular",
    phase: "기초 연습곡 학습",
  },
  {
    date:"11/8",
    session: "4회차",
    title: "기초 연습곡 완성",
    description: "기초 연습곡의 전체 동작 학습을 마무리합니다. 느린 속도부터 실제 속도까지 단계적으로 음악에 맞춰 연습하며 한 곡의 안무를 완성합니다.",
    type: "regular",
    phase: "기초 연습곡 완성",
  },
  {
    date: "11/15",
    session: "5회차",
    title: "「그대에게」 인트로 · ① 동작",
    description: "두 번째 곡 「그대에게」의 인트로와 ① 동작을 익히고, 느린 속도의 음악에 맞춰 동작의 순서와 연결을 연습합니다.",
    type: "regular",
    phase: "실제 응원곡 학습",
  },
  {
    date: "11/22",
    session: "6회차",
    title: "「그대에게」 ② · ③ 동작",
    description: "「그대에게」의 ②·③ 동작을 단계별로 익힌 뒤, 앞서 배운 동작과 연결하여 느린 속도의 음악에 맞춰 연습합니다.",
    type: "regular",
    phase: "실제 응원곡 학습",
  },
  {
    date: "11/29",
    session: "7회차",
    title: "「그대에게」 ④ 동작 · 전체 연결",
    description: "마지막 ④ 동작을 익혀 「그대에게」의 전체 안무 학습을 마무리합니다. 이후 전체 동작을 연결하여 느린 속도부터 실제 속도까지 단계적으로 맞춰봅니다.",
    type: "regular",
    phase: "실제 응원곡 학습",
  },
  {
    date: "12/6",
    session: "8회차",
    title: "「그대에게」 전체 안무 완성",
    description: "8주 동안 배운 「그대에게」의 전체 안무를 실제 음악 속도에 맞춰 반복 연습합니다. 동작의 정확도와 전체 흐름, 멤버 간 호흡을 맞추며 최종적으로 한 곡을 완성합니다.",
    type: "regular",
    phase: "전체 안무 완성",
  },
];
