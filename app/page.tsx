"use client";
import React, { useState } from "react";
import { getApprovedReviews, Review } from "@/lib/getApprovedReviews";
import { useRouter } from "next/navigation";

const reviewImgs = [
  "/cheermeuplife_review_1.png",
  "/cheermeuplife_review_2.png",
  "/cheermeuplife_review_3.png",
  "/cheermeuplife_review_4.png",
  "/cheermeuplife_review_5.png",
  "/cheermeuplife_review_6.png",
  "/cheermeuplife_review_7.png",
  "/cheermeuplife_review_8.png",
  "/cheermeuplife_review_9.png",
];

// 더미 상품 데이터
const products = [
  {
    name: "입문반 클래스(1~3인)",
    price: "₩69,000",
    desc: "치어리딩 입문자(전 연령, 왕초보 맞춤 지도)를 위한 오프라인 레슨",
    features: ["1회 2시간 기준","1~3인 기준 레슨비 총 69,000원","최초 수업 불만족 시 100% 환불"],
    cta: "신청하기"
  },
  {
    name: "입문반 클래스 (4인 이상)",
    price: "₩20,000/인",
    desc: "치어리딩 입문자(전 연령, 왕초보 맞춤 지도)를 위한 오프라인 레슨",
    features: ["1회 2시간 기준", "4인 이상 기준 레슨비 1인당 20,000원","최초 수업 불만족 시 100% 환불"],
    cta: "신청하기"
  },
  {
    name: "온라인 30분 클래스",
    price: "₩20,000",
    desc: "시간과 공간의 제약 없이 나만의 공간에서 치어리딩을!",
    features: ["바쁜 직장인, 지방/해외 거주자 분들을 위한 온라인 레슨", "효율적 비용으로 빠르게 체험해보고 싶으신 분", "수업 후 영상 피드백 제공", ],
    cta: "신청하기"
  },
  {
    name: "질풍가도 VOD 튜토리얼",
    price: "₩39,000",
    desc: "치어리딩 희대의 명곡 ‘질풍가도’ 풀곡 DIY 트레이닝 패키지",
    features: ["언제 어디서나 반복 트레이닝 가능한 평생소장 패키지", "기본 동작부터, 배속별/구간별 반복연습", "왕초보도 쉽게 독학 가능", "다이어트에 효과적", "VOD 구매 시 온라인 클래스 할인권 제공",],
    cta: "신청하기"
  },
  {
    name: "결혼식 축하공연",
    price: "₩150,000~",
    desc: "결혼식 현장 방문, 실전 축하 공연",
    features: ["프로 치어리딩 강사 직접 방문", "원하는 곡/컨셉 100% 맞춤 공연", "현장 진행/리허설/퍼포먼스까지 All-in-One","수십 회 이상 결혼식 현장 경험"],
    cta: "신청하기"
  },
];

// 리뷰게시판 데이타
const reviews: Review[] = await getApprovedReviews();

export default function CheerMeUpLifeMain() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const [modalImg, setModalImg] = useState<string | null>(null)

  type ReserveForm = {
    service: string;
    name: string;
    contact: string;
    date: string;
    time: string;
    region: string;
    people: string;
    request: string;
  };
  
  const [form, setForm] = useState<ReserveForm>({
    service: "",
    name: "",
    contact: "",
    date: "",
    time: "",
    region: "",
    people: "",
    request: "",
  });
  
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value,               // name/value 구조 분해 삭제
    }));
  };

  const [, setFocus] = useState({ name: false, date: false, count: false, content: false });
  const router = useRouter();

  const handleFocus = (field: string, val: boolean) => setFocus(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);  // service 포함 모든 값이 채워졌는지 확인
    await fetch("/api/reserve-submit", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    });
    alert("예약이 접수되었습니다! 남겨주신 연락처로 빠르게 연락드리도록 하겠습니다.");
    setModalOpen(false);
    setForm({     
      service: "",
      name: "",
      contact: "",
      date: "",
      time: "",
      region: "",
      people: "",
      request: "", });
    router.push("/");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-yellow-50 to-pink-100 font-sans overflow-x-hidden">

    {/* 1. Hero Section */}
    <section
      className="
        w-full
        pt-16 pb-12
        flex flex-col md:flex-row
        items-center md:items-start
        justify-center
        gap-8
        max-w-4xl mx-auto
      "
    >
      <div>
        <img
          src="/cheermeuplife_logo.jpg"
          className="
            w-[70vw] max-w-[330px] 
            object-contain rounded-[3rem] 
            mx-auto md:mx-0
          "
          style={{ border: "none" }}
        />
      </div>
      <div
        className="
          w-full md:w-1/2
          flex flex-col
          items-center md:items-start
          text-center md:text-left
          "
      >
        <div className="font-giantsInline text-pink-500 mb-4 leading-tight">
          <h1
            className="
              font-bold 
              mb-2
              text-[13vw] md:text-8xl
            "
          >
            치어리딩,
          </h1>
          <br className="hidden md:block" />
          <h1
            className="
              font-bold
              text-yellow-400
              text-[5vw] md:text-[25px]
            "
          >
            처음이여도 신나게! 어렵지 않고 취미롭게!
          </h1>
        </div>
        <p
          className="
            text-[3vw] md:text-lg
            text-gray-700
            mb-6
          "
        >
          초중고,대학생/직장인/시니어, 남녀노소, 단체·동아리·개인 모두 OK
        </p>
        <button
          className="
            bg-gradient-to-r from-yellow-400 to-pink-400
            text-white
            font-giantsInline
            rounded-full
            shadow-lg
            text-[5vw] md:text-2xl
            px-[8vw] md:px-12
            py-[2.5vw] md:py-5
            mb-3
            hover:scale-110 transition-all
          "
          onClick={() => {
            setSelectedService(null); // 상품명 저장
            setModalOpen(true);
          }}
        >
          <span className="text-white-600 text-[5vw] md:text-3xl">
            지금 바로 예약하기
          </span>
        </button>
      </div>
    </section>

    {/* 2. 초록색 슬로건 띠 (좌우 무한 슬라이드) */}
    <section className="w-full bg-gradient-to-r from-yellow-300 to-pink-400 overflow-x-hidden">
      <div className="
        animate-marquee whitespace-nowrap
        py-[3vw] md:py-2
        text-[3.5vw] md:text-lg
        font-bold text-white flex items-center
        justify-center
      ">
        <span className="mx-[5vw] md:mx-6">아니, 치어리딩이 이렇게 쉬웠다고?</span>
        <span className="mx-[5vw] md:mx-6">입문자/동아리/공연 단체 모두 가능!</span>
        <span className="mx-[5vw] md:mx-6">프로 강사진 1:1 컨설팅</span>
        <span className="mx-[5vw] md:mx-6">실전/대회/방송 경험 풍부</span>
        <span className="mx-[5vw] md:mx-6">최초 100% 환불 보장</span>
        <span className="mx-[5vw] md:mx-6">아니, 치어리딩이 이렇게 쉬웠다고?</span>
        <span className="mx-[5vw] md:mx-6">입문자/동아리/공연 단체 모두 가능!</span>
        <span className="mx-[5vw] md:mx-6">프로강사진 1:1 컨설팅</span>
        <span className="mx-[5vw] md:mx-6">실전/대회/방송 경험 풍부</span>
        <span className="mx-[5vw] md:mx-6">최초 100% 환불 보장</span>
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%);}
          100% { transform: translateX(-50%);}
        }
      `}</style>
    </section>

    <section className="w-full bg-gradient-to-r from-yellow-300 to-pink-400 overflow-x-hidden mb-14"></section>

    {/* 3. 강사 소개 */}
    <section className="  flex-col md:flex-row ">
      {/* ------------- 강사 1: 천지훈 ------------- */}
      <div className="relative rounded-3xl p-6 shadow-xl bg-gradient-to-br from-pink-100 to-yellow-50 min-h-[340px] mb-14 mx-8 md:mx-20 lg:mx-40">
        {/* 강사 사진 - 우상단 플로팅, 반응형 */}
        <div
          className="absolute top-[-30px] right-6
          w-[30vw] h-[30vw] max-w-[140px] max-h-[140px] md:w-[90px] md:h-[90px] 
          flex items-center justify-center
          z-20 bg-transparent"
        >
          <img
            src="/cheermeup_profile_June.png"
            alt="천지훈 프로필"
            className="w-full h-full object-contain"
            style={{ border: "none" }}
          />
        </div>
        {/* 내용: 좌측 정렬 */}
        <div className="flex flex-col items-start mt-2">
          <h3 className="font-gotgam text-4xl font-bold text-pink-600 mb-1">천지훈 강사</h3>
          <p className="text-xl text-gray-800 font-semibold mb-3">유튜버 취미로운응원생활</p>
          <ul className="text-base text-gray-700 space-y-1 mb-2 list-disc ml-4">
            <li>2014 수원대학교 적토마응원단 27대 단장</li>
            <li>어린이응원단 강습을 시작으로 직장인 워크숍 공연 레슨, 중고생/대학생 훈련 지도, 결혼식 축무 레슨, 일반인 취미반 레슨, 어르신 복지센터 출강 등 남녀노소 다양한 수강생 경험</li>
            <li>2022 유튜브 채널 &quot;취미CheerMe로운 응원생활&quot; 운영중</li>
            <li>2024 크몽, 숨고, 탈잉 오프라인 레슨 운영중</li>
          </ul>
          <span className="font-gotgam text-xl text-pink-600 font-bold">유아부터 시니어까지, 모든 수강생의 개성을 살리는 100% 맞춤형 멘토</span>
        </div>
      </div>

      {/* ------------- 강사 2: 홍수관 ------------- */}
      <div className="relative rounded-3xl p-6 shadow-xl bg-gradient-to-br from-yellow-100 to-pink-50 min-h-[340px] mx-8 md:mx-20 lg:mx-40">
        {/* 강사 사진 - 우상단 플로팅, 반응형 */}
        <div
          className="absolute top-[-30px] right-6
          w-[30vw] h-[30vw] max-w-[140px] max-h-[140px] md:w-[90px] md:h-[90px]
          flex items-center justify-center
          z-20 bg-transparent"
        >
          <img
            src="/cheermeup_profile_Hong.jpeg"
            alt="홍수관 프로필"
            className="w-full h-full object-contain"
            style={{ border: "none" }}
          />
        </div>
        {/* 내용: 좌측 정렬 */}
        <div className="flex flex-col items-start mt-2">
          <h3 className="font-gotgam text-4xl font-bold text-yellow-600 mb-1">홍수관 강사</h3>
          <p className="text-xl text-gray-800 font-semibold mb-3">치어리딩 경력 15년, 진짜 &quot;고수&quot;</p>
          <ul className="text-base text-gray-700 space-y-1 mb-2 list-disc ml-4">
            <li>Rainbow Ent. 소속 &quot;Rainbow Cheer Team&quot; 활동</li>
            <li>일본 All-star Cheerleading 대회 입상 2회</li>
            <li>Lotteworld Cheerleading 대회 입상</li>
            <li>대영중, 장훈고, 수원대 응원단 훈련부장 출신</li>
            <li>원주 다이내믹페스티벌, 원주 청소년축제, 천안 거리퍼레이드 공연, 시즌 스포츠 강습 자격증/경험 보유</li>
          </ul>
          <span className="font-gotgam text-xl text-yellow-600 font-bold">누구도 따라올 수 없는 15년 치어리딩 실전 노하우와 깊은 이해</span>
        </div>
      </div>
    </section>

    {/* 4. 지그재그 섹션 #1 */}
    <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <img
          src="/youtubeCapture1.png"
          alt="강사1"
          className="w-[500] rounded-[3rem] shadow-2xl mx-auto"
        />
      </div>
      <div>
        <h2 className="font-giantsInline text-[40px] text-pink-600 mb-3">치어리딩, 한 번도 안해봤다고? Don&quot;t worry!</h2>
        <li><p className="text-lg text-gray-700 mb-4">누구나 처음! 동작부터 음악까지 <b>하루만에 공연 가능!</b></p>
        <p className="text-lg text-gray-700 mb-4">초등학생, 중고생, 대학생, 직장인, 시니어 / 남녀노소 입문자부터 경력자까지 모두 커버 가능</p></li>
        <ul className="list-disc text-pink-600 ml-6 space-y-1">
          <li>왕초보/입문자도 무조건 할 수 있도록 맞춤 커리큘럼 진행</li>
          <li>컨셉, 기획, 디렉팅까지 코칭 가능</li>
          <li>개별 영상 제공 & 1:1 피드백</li>
        </ul>
      </div>
    </section>

    {/* 4. 지그재그 섹션 #2 (이미지 오른쪽) */}
    <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
      <div className="order-2 md:order-1">
        <h2 className="font-giantsInline text-[40px] text-yellow-600 mb-3">단체/입시/동아리, 상황별 100% 맞춤형!
        </h2>
        <p className="text-lg text-gray-700 mb-4">
        학교·동아리·기업행사·입시·방송까지 <b>우리 팀만의 퍼포먼스</b>가 필요하다면?
        </p>
        <ul className="list-disc text-yellow-600 ml-6 space-y-1">
          <li>목표/레벨/팀 구성에 따라 100% 커스터마이징</li>
          <li>전국 대회, 방송, 학교/기업 공연 실전 노하우</li>
          <li>기획→안무→지도→영상까지 ‘올인원’ 솔루션</li>
        </ul>
      </div>
      <div className="order-1 md:order-2">
        <img
          src="/goyangCheerFestival2022.png"
          alt=""
          className="w-[500] rounded-[3rem] shadow-2xl mx-auto"
        />
      </div>
    </section>

    {/* 4. 지그재그 섹션 #3 */}
    
    <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
    <div className="w-full flex justify-center">
      <div className="w-[90vw] max-w-[500px] md:w-[60vw] md:max-w-[700px]">
        <iframe
          className="w-full aspect-video rounded-[3rem]"
          src="https://www.youtube.com/embed/uPlCSt3_qZg?si=Do7k50I4HiwGTHPG"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
      <div>
        <h2 className="font-giantsInline text-[40px] text-pink-600 mb-3">결혼식 축하무대, 저희가 직접 뛰어드립니다!</h2>
        <p className="text-lg text-gray-700 mb-4">신랑/신부, 친구, 가족 누구든 주인공! 인생 한 번뿐인 순간, 제대로 즐기세요</p>
        <ul className="list-disc text-pink-600 ml-6 space-y-1">
          <li>전국 어디든 직접 방문하여 축하 공연</li>
          <li>신랑·신부/가족/친구 모두를 위한 스페셜 퍼포먼스</li>
          <li>요청 시 원하는 곡/컨셉에 맞춰 100% 맞춤 안무</li>
          <li>수십 회 이상 결혼식 현장 경험 보유, 안전하고 완성도 높은 무대 보장</li>
          <li>리허설~당일 무대까지 현장 진행/지도/서포트 올인원</li>
        </ul>
      </div>
    </section>

    {/* 5. 상품(가격/플랜) 카드 */}
    <section className="w-full py-16 bg-gradient-to-r from-yellow-50 to-pink-100">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="font-gotgam text-4xl font-bold text-pink-500 mb-8">상품/가격 안내</h2>
        <div className="w-full flex flex-col md:flex-row gap-8 justify-center">
          {products.map((p, idx) => (
            <div
              key={idx}
              className="flex-1 bg-white rounded-2xl shadow-2xl border-4 border-pink-200 flex flex-col items-center px-8 py-10 min-w-[300px] max-w-[350px] mx-auto hover:scale-105 transition-all"
            >
              <h3 className="font-gotgam text-2xl font-extrabold text-pink-600 mb-2">{p.name}</h3>
              <p className="font-gotgam text-3xl font-bold text-yellow-500 mb-2">{p.price}</p>
              <p className="text-base text-gray-600 mb-4 text-center">{p.desc}</p>
              <ul className="mb-4 text-left list-disc ml-4 text-pink-500 space-y-1">
                {p.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <button
                className="bg-gradient-to-r from-yellow-300 to-pink-400 text-white text-lg font-bold px-8 py-3 rounded-full shadow-md hover:scale-105 transition-all"
                onClick={() => {
                  setSelectedService(p.name); // 상품명 저장
                  setForm(f => ({ ...f, service: p.name }));   // form.service 동기화
                  setModalOpen(true);
                }}
              >
                {p.cta}
                
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 6. 유튜브 강습영상 미리보기 */}
    <section className="max-w-6xl mx-auto py-16 px-6 flex flex-col items-center ">
    {/* <section> */}
      <br/><br/>
      <h2 className="font-gotgam text-4xl font-extrabold text-pink-500 mb-6">레슨/공연 영상</h2>
      <div className="w-full flex flex-col md:flex-row gap-10 items-center justify-center">
        <iframe
          width="400"
          height="200"
          src="https://www.youtube.com/embed/H-HT-cBDvhU?si=HqNeazuD0GCarO-a"
          title="YouTube Video"
          className="rounded-2xl"
          allowFullScreen
        ></iframe>
        <iframe
          width="400"
          height="200"
          src="https://www.youtube.com/embed/SkuZsgrwmJ8?si=dLIqKajvBGKBXSm5"
          title="YouTube Video"
          className="rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
        <iframe
          width="400"
          height="200"
          src="https://www.youtube.com/embed/rmNImGLrTfQ?si=J0GAZo1YT-GI67MG"
          title="YouTube Video"
          className="rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
        <iframe
          width="400"
          height="200"
          src="https://www.youtube.com/embed/Z6vVscYuOF4?si=3vLg9Q1nxoBGc5vo"
          title="YouTube Video"
          className="rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
      </div>
      <div className="col-span-full flex justify-center w-full grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
        <iframe
          width="250"
          height="350"
          src="https://youtube.com/embed/XO2v-MJIjk8"
          title="YouTube Video"
          className="rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
                  <iframe
          width="250"
          height="350"
          src="https://youtube.com/embed/FWjtQd5bAJA"
          title="YouTube Video"
          className="rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
                  <iframe
          width="250"
          height="350"
          src="https://youtube.com/embed/VgcuckaOppI"
          title="YouTube Video"
          className="rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>
                  <iframe
          width="250"
          height="350"
          src="https://youtube.com/embed/XVTtK8pZS4c"
          title="YouTube Video"
          className="rounded-2xl shadow-lg"
          allowFullScreen
        ></iframe>

      </div>
    </section>

    {/* 7. 후기 그리드 (이미지 버전) */}
    <section className="w-full py-16 bg-white">
    <div className="max-w-6xl mx-auto flex flex-col items-center">
      <h2 className="font-gotgam text-4xl font-extrabold text-yellow-500 mb-6">
        한치의 거짓없는 소중한 리뷰들
      </h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-8">
        {reviewImgs.map((src, i) => (
          <div
            key={i}
            className="flex justify-center items-center rounded-2xl overflow-hidden p-4 cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => setModalImg(src)}
          >
            <img
              src={src}
              alt={`수강생 후기 ${i + 1}`}
              className="w-full h-[340px] object-cover rounded-xl"
              draggable={false}
            
            />
          </div>
        ))}
      </div>

      <section className="w-full py-16 bg-gradient-to-br from-yellow-50 via-pink-50 to-white">
        <div className="max-w-6xl mx-auto px-4 items-center flex flex-col">
          <h2 className="text-4xl font-gotgam text-pink-500 font-bold mb-8 flex gap-2">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"></path><circle cx="12" cy="12" r="10"></circle></svg>
            생생한 실시간 후기
          </h2>
          <div className="flex flex-col gap-6">
            {reviews.map((r, i) => (
              <div key={i}
                className="relative bg-white bg-opacity-90 rounded-3xl shadow-xl p-6 border-l-8 border-gradient-to-b from-pink-200 to-yellow-200 hover:scale-[1.03] transition-all duration-300"
              >
                <div className="absolute -top-5 left-6 text-yellow-300 text-3xl">★</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-pink-600">{r.name[0]+"*"+r.name[r.name.length-1]}</span>
                    <span className="text-gray-400 text-sm">수강일 | {r.date}</span>
                    <div className="text-yellow-500 text-xs px-2 py-1 rounded-full bg-yellow-100 font-semibold">
                      {r.count}회 수강
                    </div>
                  </div>
                  <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line font-gotgam">
                    레슨곡 - {r.song}
                  </div>
                  <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line font-gotgam">
                    {r.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Modal */}
      {modalImg && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setModalImg(null)}
        >
          <div className="relative max-w-3xl w-full p-4 flex flex-col items-center">
            <img
              src={modalImg}
              alt="확대 이미지"
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
              style={{ border: "none" }}
              onClick={e => e.stopPropagation()} // 모달 바깥 클릭시만 닫힘
            />
            <button
              className="absolute top-2 right-2 text-white text-3xl bg-black/40 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => setModalImg(null)}
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
    </section>

    {/* 8. 예약/문의 콜투액션(버튼) */}
    <section className="w-full flex flex-col items-center justify-center py-12 bg-gradient-to-br from-yellow-200 to-pink-100">
      
      <button
        className="bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-2xl px-12 py-5 rounded-full shadow-lg hover:scale-110 transition-all"
        onClick={() => {
          setSelectedService(null); // 상품명 저장
          setModalOpen(true);
        }}
        // onClick={() => {
        //   window.location.href = "https://open.kakao.com/o/swR5LlZg"; // ← 오픈톡 링크로 수정
        // }}
      >
        <h2 className="font-giantsInline text-3xl text-white-600">👉🏼 취미로운 응원레슨, 지금 바로 예약하기</h2>
      </button>
    </section>

    {/* 예약/문의 모달 */}
    {modalOpen && (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full relative animate-fade-in">
          <button
            className="absolute top-4 right-4 text-gray-400 text-2xl hover:text-pink-400"
            onClick={() => setModalOpen(false)}
          >×</button>
          <h3 className="font-gotgam text-2xl font-bold mb-4 text-pink-500">레슨 예약 신청</h3>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            {selectedService ? (
                // 상품명 고정 (읽기 전용)
                <input
                  name="service"
                  className="text-gray-900 border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                  value={form.service}
                  readOnly
                  tabIndex={-1}
                /> ) : (
                // 선택박스 (드롭다운)
                <select
                  name="service"
                  className="text-gray-900 border rounded-lg px-4 py-2"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">서비스 선택</option>
                  <option value="입문반 클래스 (1~3인)">입문반 클래스 (1~3인)</option>
                  <option value="입문반 클래스 (4인 이상)">입문반 클래스 (4인 이상)</option>
                  <option value="온라인 30분 클래스">온라인 30분 클래스</option>
                  <option value="질풍가도 VOD 튜토리얼">질풍가도 VOD 튜토리얼</option>
                  <option value="결혼식 축하공연 상담">결혼식 축하공연 상담</option>
                </select>
            )}
            {/* 2) 이름 */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름/단체명"
              required
              className="text-gray-900 border rounded-lg px-4 py-2"
            />

            {/* 3) 연락처 */}
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="연락처/카카오톡"
              required
              className="text-gray-900 border rounded-lg px-4 py-2"
            />
            <div className="flex gap-2">
              <div className="flex flex-col flex-1">
                <label htmlFor="date" className="text-sm font-bold text-pink-400 mb-1 ml-1">
                  희망 날짜
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="text-gray-900 border rounded-lg px-4 py-2"
                  value={form.date}
                  required
                  onChange={handleChange}
                  onFocus={() => handleFocus("date", true)}
                  onBlur={() => handleFocus("date", false)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="time" className="text-sm font-bold text-pink-400 mb-1 ml-1">
                  희망 시간
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="text-gray-900 border rounded-lg px-4 py-2"
                  value={form.time}
                  required
                  onChange={handleChange}
                  onFocus={() => handleFocus("time", true)}
                  onBlur={() => handleFocus("time", false)}
                />
              </div>
            </div>
            {/* 5) 희망지역 */}
            <input
              name="region"
              value={form.region}
              onChange={handleChange}
              placeholder="희망지역"
              required
              className="text-gray-900 border rounded-lg px-4 py-2"
            />

            {/* 6) 인원수 */}
            <input
              name="people"
              type="number"
              min={1}
              value={form.people}
              onChange={handleChange}
              placeholder="인원수 (숫자만)"
              required
              className="text-gray-900 border rounded-lg px-4 py-2"
            />

            {/* 7) 요청사항 */}
            <textarea
              name="request"
              value={form.request}
              onChange={handleChange}
              placeholder="요청사항"
              className="text-gray-900 border rounded-lg px-4 py-2"
            />
            <button type="submit" className="font-gotgam bg-pink-400 hover:bg-yellow-400 text-white rounded-lg px-6 py-3 font-bold text-lg mt-3">
              예약 신청하기
            </button>
          </form>
        </div>
      </div>
    )}
    </div>
  );
}