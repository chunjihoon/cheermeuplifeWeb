"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { track } from "@/lib/analytics";
import { SharePrompt } from "@/components/share-prompt";
import "./vod-tutorial.css";

type CurriculumItem = {
  id: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
};

type FaqItemData = {
  question: string;
  answer: string;
};

type PurchaseFormData = {
  depositorName: string;
  gmail: string;
  gmailConfirm: string;
  gmailAccepted: boolean;
  refundAccepted: boolean;
  licenseAccepted: boolean;
};

const bankDetails = {
  bankName: process.env.NEXT_PUBLIC_VOD_BANK_NAME || "카카오뱅크",
  accountHolder: process.env.NEXT_PUBLIC_VOD_ACCOUNT_HOLDER || "천지훈",
  accountNumber: process.env.NEXT_PUBLIC_VOD_ACCOUNT_NUMBER || "33333-29-779901",
};

const littlyPurchaseUrl = "https://litt.ly/cheermeuplife/sale/bOYaLKX";

const initialPurchaseForm: PurchaseFormData = {
  depositorName: "",
  gmail: "",
  gmailConfirm: "",
  gmailAccepted: false,
  refundAccepted: false,
  licenseAccepted: false,
};

const curriculumGroups: Array<{
  id: string;
  title: string;
  description: string;
  items: CurriculumItem[];
}> = [
  {
    id: "tutorial",
    title: "파트별 동작 강의",
    description: "안무를 파트별로 나누어 동작과 카운트를 차근차근 학습합니다.",
    items: [
      { id: 1, title: "질풍가도 1번+2번동작", duration: "41분 47초", description: "1번 및 2번 파트 동작 학습", thumbnail: "/Thumbnail-video1.png" },
      { id: 2, title: "질풍가도 3번동작", duration: "9분 25초", description: "3번 파트 동작 학습", thumbnail: "/Thumbnail-video2.png" },
      { id: 3, title: "질풍가도 4번동작", duration: "12분", description: "4번 파트 동작 학습", thumbnail: "/Thumbnail-video3.png" },
      { id: 4, title: "질풍가도 브릿지동작", duration: "13분 34초", description: "브릿지 구간 동작 학습", thumbnail: "/Thumbnail-video4.png" },
      { id: 5, title: "질풍가도 5번+6번+엔딩동작", duration: "16분 30초", description: "5번, 6번 및 엔딩 파트 동작 학습", thumbnail: "/Thumbnail-video5.png" },
    ],
  },
  {
    id: "practice",
    title: "완곡 연습 배속별 따라 하기",
    description: "느린 속도부터 원곡 속도까지 단계적으로 전체 안무를 연결합니다.",
    items: [
      { id: 6, title: "질풍가도 0.3배속 따라하기", duration: "10분 45초", description: "매우 느린 속도로 전체 동작 확인", thumbnail: "/Thumbnail-video6.png" },
      { id: 7, title: "질풍가도 0.5배속 따라하기", duration: "6분 32초", description: "느린 속도로 전체 안무 연결", thumbnail: "/Thumbnail-video6.png" },
      { id: 8, title: "질풍가도 0.7배속 따라하기", duration: "4분 43초", description: "원곡에 가까운 속도로 연습", thumbnail: "/Thumbnail-video6.png" },
      { id: 9, title: "질풍가도 1배속 따라하기", duration: "3분 21초", description: "원곡 속도로 전체 안무 연습", thumbnail: "/Thumbnail-video6.png" },
    ],
  },
];

const faqItems: FaqItemData[] = [
  {
    question: "치어리딩을 처음 배우는데도 따라갈 수 있나요?",
    answer: "네. 파트별 동작 설명과 카운트 연습, 0.3배속부터 1배속까지의 반복 연습 영상으로 구성되어 있어 입문자도 순서대로 학습할 수 있습니다.",
  },
  {
    question: "계좌이체 후 언제부터 볼 수 있나요?",
    answer: "입금 확인 후 구매 시 입력한 Gmail 계정으로 Google Drive 이용 권한을 보내드립니다. 자세한 확인 시간은 구매 신청 시 안내해드립니다.",
  },
  {
    question: "휴대폰에서도 볼 수 있나요?",
    answer: "네. Google Drive를 이용할 수 있는 PC, 태블릿, 모바일에서 시청할 수 있습니다.",
  },
  {
    question: "영상이나 링크를 팀원에게 공유해도 되나요?",
    answer: "강의를 통해 익힌 안무는 개인 또는 단체 공연에 활용할 수 있지만, 영상 파일과 Google Drive 링크는 구매자 본인만 이용할 수 있습니다. 팀원 각자가 영상을 시청하려면 개별 구매가 필요합니다.",
  },
  { question: "음원도 함께 제공되나요?", answer: "아니요. 본 상품에는 질풍가도 음원 파일이 포함되지 않습니다." },
  {
    question: "환불은 어떻게 진행되나요?",
    answer: "Google Drive 이용 권한이 제공되기 전에는 전액 환불이 가능합니다. 권한 제공 후에는 디지털 콘텐츠의 특성상 단순 변심에 의한 환불이 제한될 수 있습니다. 파일 손상, 재생 불가 또는 안내된 내용과 실제 상품이 다른 경우에는 확인 후 재제공 또는 환불해드립니다.",
  },
];

const painPoints = [
  { icon: "⚡", label: "동작 속도", text: "동작이 빨라 팔과 발의 순서가 잘 보이지 않는다." },
  { icon: "↔", label: "방향 전환", text: "좌우 방향과 동작 전환 시점을 알기 어렵다." },
  { icon: "8", label: "카운트", text: "몇 번을 돌려봐도 정확한 카운트를 모르겠다." },
  { icon: "♟", label: "단체 연습", text: "여러 명이 연습하는데 동작과 타이밍이 계속 달라진다." },
  { icon: "?", label: "연습 순서", text: "어느 구간부터 어떻게 연습해야 할지 모르겠다." },
];

const outcomes = [
  "질풍가도 전체 안무의 구성과 흐름을 이해할 수 있습니다.",
  "각 동작의 방향과 정확한 순서를 익힐 수 있습니다.",
  "카운트에 맞춰 파트별로 안무를 연습할 수 있습니다.",
  "느린 속도부터 원곡 속도까지 단계적으로 연습할 수 있습니다.",
  "학교 축제·행사·축하공연을 위한 전체 안무를 완성할 수 있습니다.",
];

function CheckIcon() {
  return <span className="vod-check" aria-hidden="true">✓</span>;
}

function CurriculumCard({ item }: { item: CurriculumItem }) {
  return (
    <article className="vod-curriculum-card">
      <div className="vod-thumbnail">
        <Image
          src={item.thumbnail}
          alt={`${item.title} 강의 썸네일`}
          width={480}
          height={270}
          sizes="(max-width: 480px) 100vw, 155px"
        />
      </div>
      <div className="vod-curriculum-copy">
        <small>LESSON {String(item.id).padStart(2, "0")}</small>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        <span className="vod-duration">◷ {item.duration}</span>
      </div>
    </article>
  );
}

export default function CheerVodLandingPage() {
  const [licenseAccepted, setLicenseAccepted] = useState(false);
  const [refundAccepted, setRefundAccepted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(true);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchaseForm, setPurchaseForm] = useState<PurchaseFormData>(initialPurchaseForm);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState("");
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const canPurchase = useMemo(
    () => licenseAccepted && refundAccepted,
    [licenseAccepted, refundAccepted],
  );
  const normalizedGmail = purchaseForm.gmail.trim().toLowerCase();
  const normalizedGmailConfirm = purchaseForm.gmailConfirm.trim().toLowerCase();
  const isGmailValid = /^[^\s@]+@gmail\.com$/i.test(normalizedGmail);
  const isGmailMatching = normalizedGmail.length > 0 && normalizedGmail === normalizedGmailConfirm;
  const canSubmitOrder = Boolean(
    purchaseForm.depositorName.trim()
    && isGmailValid
    && isGmailMatching
    && purchaseForm.gmailAccepted
    && purchaseForm.refundAccepted
    && purchaseForm.licenseAccepted,
  );

  const scrollToPurchase = () => {
    track("vod_purchase_section_click");
    document.getElementById("purchase")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToPreview = () => {
    track("vod_preview_click", { location: "hero" });
    document.getElementById("preview")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleHeroVideo = async () => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsHeroVideoPlaying(false);
      }
      return;
    }

    video.pause();
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      const video = heroVideoRef.current;
      if (!video) return;

      if (reduceMotion.matches) {
        video.pause();
        setIsHeroVideoPlaying(false);
      }
    };

    applyMotionPreference();
    reduceMotion.addEventListener("change", applyMotionPreference);
    return () => reduceMotion.removeEventListener("change", applyMotionPreference);
  }, []);

  useEffect(() => {
    if (!purchaseModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmittingOrder) setPurchaseModalOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [purchaseModalOpen, isSubmittingOrder]);

  const openPurchaseModal = () => {
    setPurchaseForm({
      ...initialPurchaseForm,
      refundAccepted,
      licenseAccepted,
    });
    setCompletedOrderId("");
    setOrderError("");
    setCopiedAccount(false);
    setPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    if (isSubmittingOrder) return;
    setPurchaseModalOpen(false);
  };

  const copyAccountNumber = async () => {
    let copied = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(bankDetails.accountNumber);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      const textarea = document.createElement("textarea");
      textarea.value = bankDetails.accountNumber;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copied = document.execCommand("copy");
      textarea.remove();
    }

    if (copied) {
      setOrderError("");
      setCopiedAccount(true);
      window.setTimeout(() => setCopiedAccount(false), 1800);
      void track("vod_bank_account_copy").catch(() => undefined);
      return;
    }

    setOrderError("계좌번호를 복사하지 못했습니다. 계좌번호를 직접 선택해 복사해주세요.");
  };

  const submitPurchaseOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmitOrder || isSubmittingOrder) return;

    setIsSubmittingOrder(true);
    setOrderError("");
    try {
      const response = await fetch("/api/vod-order-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          depositorName: purchaseForm.depositorName.trim(),
          gmail: normalizedGmail,
          gmailAccepted: purchaseForm.gmailAccepted,
          refundAccepted: purchaseForm.refundAccepted,
          licenseAccepted: purchaseForm.licenseAccepted,
        }),
      });
      const result = await response.json() as { ok?: boolean; orderId?: string; error?: string };
      if (!response.ok || !result.ok || !result.orderId) {
        throw new Error(result.error || "주문 접수에 실패했습니다.");
      }

      setCompletedOrderId(result.orderId);
      track("vod_purchase_order_submitted", { method: "bank_transfer" });
    } catch (error) {
      setOrderError(error instanceof Error ? error.message : "주문 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const handleDirectPurchase = () => {
    if (!canPurchase) return;
    track("vod_purchase_inquiry_click", { method: "direct" });
    openPurchaseModal();
  };

  return (
    <main className="vod-page">
      <section className="vod-section vod-hero">
        <div className="vod-hero-media">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/vod-hero-poster.jpg"
            aria-hidden="true"
            onPlay={() => setIsHeroVideoPlaying(true)}
            onPause={() => setIsHeroVideoPlaying(false)}
          >
            <source src="/vod-hero-loop.mp4" type="video/mp4" />
          </video>
          <div className="vod-hero-overlay" aria-hidden="true" />
          <button
            className="vod-hero-video-control"
            type="button"
            onClick={toggleHeroVideo}
            aria-label={isHeroVideoPlaying ? "배경 영상 일시정지" : "배경 영상 재생"}
            aria-pressed={!isHeroVideoPlaying}
          >
            <span aria-hidden="true">{isHeroVideoPlaying ? "Ⅱ" : "▶"}</span>
          </button>
        </div>
        <div className="vod-container vod-hero-grid">
          <div className="vod-hero-content">
            <p className="vod-eyebrow hero-eyebrow">학교 축제 · 행사 · 축하공연 준비를 위한 온라인 클래스</p>
            <h1 className="hero-title">
              <span className="hero-product-title"><em>질풍가도</em> 치어리딩</span>
              <span className="hero-product-subtitle">완전정복 클래스</span>
            </h1>
            <p className="vod-headline"><b>구간별로 배우며 직접 무대를 완성해보세요.</b></p>
            <div className="vod-facts" aria-label="상품 핵심 정보">
              <span><i className="vod-fact-icon" aria-hidden="true">▶</i>총 9개 영상</span>
              <span><i className="vod-fact-icon" aria-hidden="true">◷</i>1시간 58분</span>
              <span><i className="vod-fact-icon" aria-hidden="true">∞</i>평생 소장</span>
            </div>
            <div className="vod-price" aria-label="결제 방식별 가격">
              <span>계좌이체 <strong>39,000원</strong></span>
              <span>리틀리 <strong>45,000원</strong></span>
            </div>
            <div className="vod-actions">
              <button className="vod-button vod-primary" type="button" onClick={scrollToPurchase}>구매 방법 선택하기</button>
              <button className="vod-button vod-secondary" type="button" onClick={scrollToPreview}>강의 맛보기</button>
            </div>
            {/* <p className="vod-microcopy">계좌이체 구매는 입금 확인 후 Google Drive 이용 권한을 보내드립니다.</p> */}
            <p className="vod-hero-compact-note"><span aria-hidden="true">✓</span> 입금 확인 후 Gmail로 Google Drive 이용 권한 제공</p>
          </div>
        </div>
      </section>

      <section id="preview" className="vod-section vod-white vod-preview-section">
        <div className="vod-container vod-narrow vod-centered">
          <p className="vod-eyebrow">PREVIEW</p><h2>실제 강의는 이렇게 진행됩니다</h2>
          <div className="vod-preview">
            <iframe
              src="https://www.youtube-nocookie.com/embed/rmNImGLrTfQ?autoplay=1&mute=1&playsinline=1&rel=0&start=44"
              title="질풍가도 치어리딩 완전정복 클래스 미리보기"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className="vod-note">무료 영상에서는 완성된 안무를 확인할 수 있고, 완전정복 클래스에서는 각 동작을 카운트별로 나누어 천천히 배우고 반복할 수 있습니다.</p>
          <div className="vod-next-section-notices">
            <p>계좌이체 구매는 입금 확인 후 Gmail 계정으로 Google Drive 이용 권한을 보내드립니다.</p>
            <p>리틀리에서는 카드·카카오페이·네이버페이로 결제하고 바로 수강할 수 있습니다.</p>
          </div>
        </div>
      </section>

      <section className="vod-section">
        <div className="vod-container">
          <div className="vod-heading"><p className="vod-eyebrow">WHY THIS CLASS</p><h2>완성 안무 영상만 보고 따라 하다가 막히셨나요?</h2></div>
          <div className="vod-pain-visual">
            <Image
              src="/image-section-painpoint.png"
              alt="완성 안무 영상을 보며 막막해 하는 모습"
              width={1672}
              height={941}
              sizes="(max-width: 760px) calc(100vw - 28px), 920px"
            />
          </div>
          <p className="vod-pain-lead"><strong>한 번이라도 이런 답답함을 느꼈다면,</strong> 지금 필요한 건 완성 영상의 반복 재생이 아니라 제대로 쪼개서 배우는 과정입니다.</p>
          <div className="vod-pain-grid">
            {painPoints.map((item, index) => (
              <article className="vod-problem" key={item.label}>
                <div className="vod-pain-card-head">
                  <span className="vod-pain-icon" aria-hidden="true">{item.icon}</span>
                  <span className="vod-pain-label">PAIN {String(index + 1).padStart(2, "0")} · {item.label}</span>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="vod-highlight">
            <strong>질풍가도 치어리딩 완전정복 클래스는 완성 영상을 단순히 느리게 재생한 영상이 아닙니다.</strong>
            <Image
              className="vod-highlight-image vod-highlight-image-slow"
              src="/image-slow.png"
              alt="완성 영상을 느리게 재생하는 방식의 한계"
              width={1584}
              height={1342}
              sizes="(max-width: 760px) calc(100vw - 64px), 760px"
            />
            <p>안무를 실제로 익힐 수 있도록 각 파트를 나누고, 설명과 반복 연습을 더한 학습용 강의입니다.</p>
            <Image
              className="vod-highlight-image vod-highlight-image-tutorial"
              src="/image-tutorial.png"
              alt="파트별 설명과 반복 연습으로 안무를 배우는 강의"
              width={1122}
              height={1402}
              sizes="(max-width: 760px) calc(100vw - 64px), 560px"
            />
          </div>
        </div>
      </section>

      <section className="vod-section vod-soft vod-outcomes-section">
        <div className="vod-container vod-centered">
          <div className="vod-heading"><p className="vod-eyebrow">LEARNING OUTCOMES</p><h2>강의를 순서대로 따라가면</h2></div>
          <div className="vod-outcome-grid">
            {outcomes.map((text, index) => (
              <article className="vod-outcome" key={text}>
                <span className="vod-outcome-number">{String(index + 1).padStart(2, "0")}</span>
                <small>STEP {String(index + 1).padStart(2, "0")}</small>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vod-section vod-white">
        <div className="vod-container vod-narrow vod-centered">
          <div className="vod-heading"><p className="vod-eyebrow">FREE VS CLASS</p><h2>무료 영상과 완전정복 클래스는 이렇게 다릅니다</h2></div>
          <div className="vod-comparison">
            <div className="vod-comparison-head"><b>무료 완성 안무 영상</b><b>질풍가도 치어리딩 완전정복 클래스</b></div>
            {[["전체 안무 확인", "파트별 동작 학습"], ["원곡 속도 중심", "느린 속도부터 단계별 연습"], ["공연 흐름 중심", "팔·발·방향 등 세부 설명"], ["반복 재생하며 직접 분석", "카운트에 맞춘 반복 연습"], ["안무 감상·참고", "실제 학습과 공연 준비"]].map(([free, paid]) => <div key={free}><span>{free}</span><strong>{paid}</strong></div>)}
          </div>
          <p className="vod-note">완성 안무를 확인하는 영상에서 한 단계 더 나아가, 실제로 몸에 익힐 수 있도록 만든 수업입니다.</p>
        </div>
      </section>

      <section className="vod-section vod-curriculum">
        <div className="vod-container">
          <div className="vod-heading"><p className="vod-eyebrow">CURRICULUM</p><h2>총 9개 영상 · 1시간 58분 37초</h2><p>동작 학습부터 배속별 완곡 연습까지 한 흐름으로 구성했습니다.</p></div>
          {curriculumGroups.map((group) => <div className="vod-curriculum-group" key={group.id}>
            <div className="vod-group-heading"><h3>{group.title}</h3><p>{group.description}</p></div>
            <div className="vod-curriculum-list">{group.items.map((item) => <CurriculumCard item={item} key={item.id} />)}</div>
          </div>)}
        </div>
      </section>

      <section className="vod-share-section" aria-label="친구와 완전정복 클래스 공유하기">
        <SharePrompt
          variant="vod"
          eyebrow="PRACTICE TOGETHER"
          title="혼자라서 망설여지신다면? 친구와 함께 연습해보세요"
          description="학교 축제나 공연을 같이 준비하는 친구에게 보내고, 이 커리큘럼으로 함께 연습할지 편하게 의논해보세요."
          buttonLabel="친구에게 공유하기"
          shareTitle="질풍가도 치어리딩 완전정복 클래스"
          shareText="질풍가도 안무를 구간별로 배우고 배속별로 함께 연습할 수 있는 클래스예요. 같이 연습해볼래요?"
          sharePath="/vod-tutorial"
          location="vod_after_curriculum"
        />
      </section>

      <section className="vod-section">
        <div className="vod-container vod-two-grid">
          <article className="vod-info vod-positive"><p className="vod-eyebrow">RECOMMENDED FOR</p><h2>이런 분께 추천합니다</h2><ul>{["질풍가도 치어리딩 안무를 처음 배우는 분", "유튜브 완성 영상만으로는 따라 하기 어려웠던 분", "학교 축제나 동아리 공연을 준비하는 분", "결혼식 또는 행사에서 축하공연을 준비하는 분", "원하는 시간에 반복해서 연습하고 싶은 분"].map((text) => <li key={text}><CheckIcon />{text}</li>)}</ul></article>
          <article className="vod-info vod-caution"><p className="vod-eyebrow">BEFORE YOU BUY</p><h2>구매 전 확인해주세요</h2><ul>{["본 상품에는 질풍가도 음원 파일이 포함되지 않습니다.", "실시간 피드백이나 개인 안무 교정은 포함되지 않습니다.", "영상 파일과 Google Drive 링크는 구매자 본인만 이용할 수 있습니다.", "강의에서 익힌 안무는 개인 또는 단체 공연에 활용할 수 있습니다."].map((text) => <li key={text}><span className="vod-alert">!</span>{text}</li>)}</ul></article>
        </div>
      </section>

      <section className="vod-section vod-white">
        <div className="vod-container vod-narrow vod-centered">
          <div className="vod-heading"><p className="vod-eyebrow">PRODUCT DETAILS</p><h2>상품 정보</h2></div>
          <dl className="vod-product-table">{[["상품명", "질풍가도 치어리딩 완전정복 클래스"], ["계좌이체 판매가", "39,000원"], ["리틀리 판매가", "45,000원"], ["영상 수", "총 9개"], ["총 재생시간", "1시간 58분 37초"], ["난이도", "치어리딩 입문·초급"], ["이용 기간", "평생 소장"], ["지원 기기", "PC·태블릿·모바일"], ["결제 방식", "계좌이체 또는 리틀리(카드·카카오페이·네이버페이)"], ["이용 방식", "결제 방식에 따라 Google Drive 또는 리틀리 강의실 이용"], ["음원", "제공하지 않음"], ["공연 활용", "가능"], ["파일·링크 공유", "불가"]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      </section>

      <section id="purchase" className="vod-section vod-purchase">
        <div className="vod-container">
          <div className="vod-heading vod-centered"><p className="vod-eyebrow">PURCHASE</p><h2>편리한 구매 방식을 선택해주세요</h2></div>
          <div className="vod-two-grid">
            <article className="vod-purchase-card vod-featured">
              <span className="vod-purchase-label">공식 홈페이지 직접 구매</span><h3>계좌이체 후 Google Drive 이용</h3><strong className="vod-purchase-price">39,000원</strong>
              <ul>{["계좌이체", "입금 확인 후 Gmail 계정 초대", "별도의 시청 기한 없이 반복 이용", "PC·태블릿·모바일 지원"].map((text) => <li key={text}><CheckIcon />{text}</li>)}</ul>
              <p className="vod-purchase-notice">입금 확인 일정과 계좌 정보는 구매 신청 후 안내해드립니다.</p>
              <div className="vod-agreements">
                <label><input type="checkbox" checked={licenseAccepted} onChange={(event) => setLicenseAccepted(event.target.checked)} /><span>구매자 개인의 학습 목적으로 이용하며, 영상 파일이나 시청 링크를 타인에게 공유·복제·재판매·재배포하지 않는 것에 동의합니다.</span></label>
                <label><input type="checkbox" checked={refundAccepted} onChange={(event) => setRefundAccepted(event.target.checked)} /><span>상품 제공 방식, 이용 범위 및 환불 규정을 확인했습니다.</span></label>
              </div>
              <button type="button" className="vod-button vod-primary vod-full" disabled={!canPurchase} onClick={handleDirectPurchase}>계좌이체로 구매하기</button>
              {!canPurchase && <p className="vod-disabled-hint">두 항목에 동의하면 구매 버튼이 활성화됩니다.</p>}
            </article>
            <article className="vod-purchase-card">
              <span className="vod-purchase-label">결제 후 바로 수강</span>
              <h3>리틀리에서 결제</h3>
              <strong className="vod-purchase-price">45,000원</strong>
              <ul>{["카드결제·카카오페이·네이버페이", "결제 후 이메일·카카오 알림톡으로 강의실 링크 즉시 전달", "별도의 시청 기한 없이 반복 이용", "리틀리의 이용·환불 정책 적용"].map((text) => <li key={text}><CheckIcon />{text}</li>)}</ul>
              <p className="vod-purchase-notice">리틀리 결제 금액에는 플랫폼 결제 수수료가 포함되어 계좌이체 금액과 다른 점 양해 부탁드립니다.</p>
              <a className="vod-button vod-primary vod-full" href={littlyPurchaseUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("vod_purchase_littly_click", { location: "purchase_card" })}>리틀리에서 결제하고 바로 수강하기</a>
            </article>
          </div>
        </div>
      </section>

      <section className="vod-section vod-legal">
        <div className="vod-container vod-narrow">
          <article className="vod-legal-card"><h2>콘텐츠 이용 안내</h2><p>본 상품은 구매자 개인의 학습을 위한 디지털 콘텐츠입니다. 강의를 통해 익힌 안무를 개인 또는 단체 공연에서 활용할 수 있으나, 영상 파일과 시청 링크를 다른 사람에게 공유하거나 복제·재판매·재배포할 수 없습니다.</p></article>
          <article className="vod-legal-card"><h2>환불 안내</h2><ul><li>Google Drive 시청 권한이 제공되기 전에는 전액 환불이 가능합니다.</li><li>콘텐츠 이용이 시작된 이후에는 디지털 콘텐츠의 특성상 단순 변심에 의한 환불이 제한될 수 있습니다.</li><li>파일 손상, 영상 재생 불가 또는 안내된 내용과 실제 콘텐츠가 다른 경우에는 확인 후 재제공 또는 환불해드립니다.</li><li>입금자명이나 Gmail 주소 오입력으로 인한 전달 지연은 환불 사유에 해당하지 않으나, 확인 후 올바른 계정으로 다시 안내해드립니다.</li></ul><p className="vod-legal-note">※ 실제 판매 조건에 따라 최종 환불 문구는 공개 전에 별도 검토가 필요합니다.</p></article>
        </div>
      </section>

      <section className="vod-section vod-white">
        <div className="vod-container vod-narrow">
          <div className="vod-heading vod-centered"><p className="vod-eyebrow">FAQ</p><h2>자주 묻는 질문</h2></div>
          <div className="vod-faq-list">{faqItems.map((item, index) => <article className="vod-faq" key={item.question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{item.question}</span><span aria-hidden="true">{openFaq === index ? "−" : "+"}</span></button>{openFaq === index && <p>{item.answer}</p>}</article>)}</div>
        </div>
      </section>

      <section className="vod-final"><div className="vod-container vod-final-inner"><div><p className="vod-eyebrow">START YOUR PRACTICE</p><h2>이제 질풍가도 안무를 직접 완성해보세요.</h2><p>리틀리에서 간편하게 결제하고 바로 수강할 수 있습니다.</p></div><a className="vod-button vod-light" href={littlyPurchaseUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("vod_purchase_littly_click", { location: "final_cta" })}>결제하고 바로 수강하기</a></div></section>

      {purchaseModalOpen && (
        <div className="vod-order-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closePurchaseModal(); }}>
          <section className="vod-order-modal" role="dialog" aria-modal="true" aria-labelledby="vod-order-title">
            <header className="vod-order-header">
              <div>
                <span>DIRECT PURCHASE</span>
                <h2 id="vod-order-title">{completedOrderId ? "입금 정보가 접수되었습니다" : "계좌이체로 구매하기"}</h2>
              </div>
              <button type="button" onClick={closePurchaseModal} aria-label="결제 팝업 닫기">×</button>
            </header>

            {completedOrderId ? (
              <div className="vod-order-complete">
                <div className="vod-order-complete-icon" aria-hidden="true">✓</div>
                <h3>입금 정보를 안전하게 접수했습니다.</h3>
                <p>매일 한국 시간 오전 10시와 오후 10시에 입금을 확인합니다. 입금 확인 후 입력하신 Gmail 계정으로 Google Drive 이용 권한을 보내드립니다.</p>
                <dl className="vod-order-summary">
                  <div><dt>주문번호</dt><dd>{completedOrderId}</dd></div>
                  <div><dt>상품</dt><dd>질풍가도 치어리딩 완전정복 클래스</dd></div>
                  <div><dt>결제 금액</dt><dd>39,000원</dd></div>
                  <div><dt>입금자명</dt><dd>{purchaseForm.depositorName.trim()}</dd></div>
                  <div><dt>초대 Gmail</dt><dd>{normalizedGmail}</dd></div>
                  <div><dt>현재 상태</dt><dd><b>입금 확인 대기</b></dd></div>
                </dl>
                <button className="vod-button vod-primary vod-order-confirm" type="button" onClick={closePurchaseModal}>확인</button>
              </div>
            ) : (
              <form className="vod-order-form" onSubmit={submitPurchaseOrder} noValidate>
                <div className="vod-order-body">
                  <p className="vod-order-intro">아래 계좌로 상품 금액을 입금한 후, Google Drive 초대에 사용할 Gmail 주소와 입금 정보를 제출해주세요.</p>

                  <section className="vod-order-product" aria-labelledby="vod-order-product-title">
                    <div>
                      <span>주문 상품</span>
                      <h3 id="vod-order-product-title">질풍가도 치어리딩 완전정복 클래스</h3>
                      <p>총 9개 영상 · 1시간 58분 · 기간 제한 없이 이용</p>
                    </div>
                    <strong>39,000원</strong>
                  </section>

                  <section className="vod-order-section" aria-labelledby="vod-bank-title">
                    <div className="vod-order-section-title"><span>01</span><h3 id="vod-bank-title">입금 계좌 정보</h3></div>
                    <dl className="vod-bank-card">
                      <div><dt>입금 은행</dt><dd>{bankDetails.bankName}</dd></div>
                      <div><dt>예금주</dt><dd>{bankDetails.accountHolder}</dd></div>
                      <div className="vod-bank-account-row"><dt>계좌번호</dt><dd><b>{bankDetails.accountNumber}</b><button type="button" onClick={copyAccountNumber}>{copiedAccount ? "복사됨" : "복사"}</button></dd></div>
                      <div><dt>입금 금액</dt><dd><strong>39,000원</strong></dd></div>
                    </dl>
                    <p className="vod-order-help">입금자명은 아래 주문 정보에 입력하는 이름과 동일하게 작성해주세요.</p>
                  </section>

                  <section className="vod-order-section" aria-labelledby="vod-buyer-title">
                    <div className="vod-order-section-title"><span>02</span><h3 id="vod-buyer-title">구매자 정보</h3></div>
                    <div className="vod-order-fields">
                      <label>
                        <span>입금자명 <b>*</b></span>
                        <input
                          value={purchaseForm.depositorName}
                          onChange={(event) => setPurchaseForm((current) => ({ ...current, depositorName: event.target.value }))}
                          placeholder="실제 입금 시 사용한 이름을 입력해주세요"
                          autoComplete="name"
                          required
                        />
                      </label>
                      <label>
                        <span>Google Drive 초대용 Gmail 주소 <b>*</b></span>
                        <input
                          type="email"
                          value={purchaseForm.gmail}
                          onChange={(event) => setPurchaseForm((current) => ({ ...current, gmail: event.target.value }))}
                          placeholder="example@gmail.com"
                          autoComplete="email"
                          aria-invalid={purchaseForm.gmail.length > 0 && !isGmailValid}
                          required
                        />
                        {purchaseForm.gmail.length > 0 && !isGmailValid && <small className="vod-field-error">@gmail.com으로 끝나는 Gmail 주소를 입력해주세요.</small>}
                        <small>입력하신 Gmail 계정으로 클래스 폴더 이용 권한을 보내드립니다.</small>
                      </label>
                      <label>
                        <span>Gmail 주소 다시 입력 <b>*</b></span>
                        <input
                          type="email"
                          value={purchaseForm.gmailConfirm}
                          onChange={(event) => setPurchaseForm((current) => ({ ...current, gmailConfirm: event.target.value }))}
                          placeholder="동일한 Gmail 주소를 다시 입력해주세요"
                          autoComplete="off"
                          aria-invalid={purchaseForm.gmailConfirm.length > 0 && !isGmailMatching}
                          required
                        />
                        {purchaseForm.gmailConfirm.length > 0 && !isGmailMatching && <small className="vod-field-error">입력한 Gmail 주소가 서로 일치하지 않습니다.</small>}
                      </label>
                    </div>
                    <label className="vod-order-checkbox">
                      <input type="checkbox" checked={purchaseForm.gmailAccepted} onChange={(event) => setPurchaseForm((current) => ({ ...current, gmailAccepted: event.target.checked }))} />
                      <span><b>입력한 주소가 Google Drive 초대에 사용할 수 있는 Gmail 계정임을 확인했습니다.</b><small>Gmail 주소를 잘못 입력하면 상품 제공이 지연될 수 있습니다.</small></span>
                    </label>
                  </section>

                  <section className="vod-order-section" aria-labelledby="vod-schedule-title">
                    <div className="vod-order-section-title"><span>03</span><h3 id="vod-schedule-title">이용 권한 제공 안내</h3></div>
                    <div className="vod-order-schedule">
                      <strong>매일 한국 시간 오전 10시와 오후 10시에 입금을 확인합니다.</strong>
                      <p>입금이 확인된 주문은 해당 확인 시간 이후 순차적으로 처리되며, 입력한 Gmail 계정으로 Google Drive 초대 메일을 보내드립니다.</p>
                      <ul>
                        <li><span>오전 10시 이전 입금</span><b>오전 확인 이후 처리</b></li>
                        <li><span>오후 10시 이전 입금</span><b>오후 확인 이후 처리</b></li>
                        <li><span>오후 10시 이후 입금</span><b>다음 날 오전 확인 이후 처리</b></li>
                      </ul>
                      <small>은행 처리 상황에 따라 바로 다음 확인 시간에 반영되지 않을 수 있습니다.</small>
                    </div>
                  </section>

                  <section className="vod-order-section" aria-labelledby="vod-terms-title">
                    <div className="vod-order-section-title"><span>04</span><h3 id="vod-terms-title">환불·이용 조건 확인</h3></div>
                    <div className="vod-order-terms">
                      <label className="vod-order-checkbox">
                        <input type="checkbox" checked={purchaseForm.refundAccepted} onChange={(event) => setPurchaseForm((current) => ({ ...current, refundAccepted: event.target.checked }))} />
                        <span>Google Drive 이용 권한이 제공된 이후에는 디지털 콘텐츠의 특성상 단순 변심에 의한 환불이 제한될 수 있음을 확인했습니다.</span>
                      </label>
                      <label className="vod-order-checkbox">
                        <input type="checkbox" checked={purchaseForm.licenseAccepted} onChange={(event) => setPurchaseForm((current) => ({ ...current, licenseAccepted: event.target.checked }))} />
                        <span>영상 파일과 Google Drive 링크를 타인에게 공유·복제·재판매·재배포하지 않는 것에 동의합니다.</span>
                      </label>
                    </div>
                  </section>
                </div>

                <footer className="vod-order-footer">
                  {orderError && <p role="alert">{orderError}</p>}
                  <button className="vod-button vod-primary" type="submit" disabled={!canSubmitOrder || isSubmittingOrder}>{isSubmittingOrder ? "접수 중…" : "입금 완료 알리기"}</button>
                  <small>제출 후 입금 확인이 완료되면 Gmail로 Google Drive 초대 메일을 보내드립니다.</small>
                </footer>
              </form>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
