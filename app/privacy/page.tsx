import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({ title: "개인정보처리방침", description: "취미로운응원생활의 레슨 예약, 문의와 VOD 구매 과정에서 처리되는 개인정보와 이용자 권리를 안내합니다.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <main className="content-page">
      <PageHero eyebrow="PRIVACY" title="개인정보처리방침" description="취미로운응원생활은 서비스 제공에 필요한 범위에서 개인정보를 처리하고 안전하게 관리하기 위해 노력합니다." breadcrumbs={[{ label: "개인정보처리방침" }]} />
      <article className="content-narrow content-prose">
        <h2>1. 수집하는 개인정보</h2><p>서비스 이용 과정에서 아래 정보가 수집될 수 있습니다.</p><ul><li>레슨 예약: 신청 서비스, 이름 또는 단체명, 연락처, 희망 날짜·시간·지역, 인원, 요청사항</li><li>VOD 구매: 입금자명, Google Drive 초대용 Gmail 주소, 주문번호, 결제 금액과 주문 상태</li><li>일반 문의: 이메일 주소와 문의자가 직접 작성한 내용</li><li>서비스 이용 기록: 접속 및 이벤트 이용 기록 등 분석 도구를 통해 생성되는 정보</li></ul>
        <h2>2. 개인정보 이용 목적</h2><ul><li>레슨 일정 협의와 예약 처리</li><li>VOD 입금 확인과 Google Drive 이용 권한 제공</li><li>문의 답변과 고객 지원</li><li>서비스 오류 확인과 이용 현황 분석</li><li>부정 이용 방지와 분쟁 대응</li></ul>
        <h2>3. 개인정보 보관 및 삭제</h2><p>개인정보는 수집 목적을 달성한 후 지체 없이 삭제하는 것을 원칙으로 합니다. 다만 거래·분쟁 처리 또는 관계 법령상 보관 의무가 있는 정보는 필요한 범위와 기간 동안 별도로 보관할 수 있습니다. 구체적인 보관 기간은 실제 운영 정책과 적용 법령을 확인하여 본 방침에 반영합니다.</p>
        <h2>4. 외부 서비스 제공자</h2><p>사이트 운영을 위해 다음 외부 서비스를 사용합니다.</p><ul><li>Google Firebase·Firestore: 예약, 후기와 VOD 주문 정보 저장 및 서비스 운영</li><li>Firebase Analytics·Google Analytics: 사이트 이용 현황 분석</li><li>이메일 전송 서비스: 예약 및 주문 알림</li><li>YouTube: 영상 콘텐츠 임베드 및 공식 채널 연결</li><li>Vercel: 웹사이트 호스팅 및 서버 기능 제공</li></ul><p>각 서비스 제공자는 자체 개인정보처리방침에 따라 데이터를 처리할 수 있습니다.</p>
        <h2>5. 쿠키와 분석 도구</h2><p>사이트는 Firebase Analytics 등 분석 도구를 통해 서비스 이용 정보를 처리할 수 있습니다. 현재 별도의 맞춤형 광고 기능은 사이트 기능으로 구현되어 있지 않습니다. 향후 분석 또는 쿠키 사용 범위가 변경되면 필요한 안내와 선택 수단을 검토합니다.</p>
        <h2>6. 개인정보의 제3자 제공</h2><p>법령에 근거하거나 이용자의 동의가 있는 경우를 제외하고 개인정보를 제3자에게 임의로 판매하거나 제공하지 않습니다.</p>
        <h2>7. 이용자의 권리</h2><p>이용자는 자신의 개인정보에 대한 열람, 정정 또는 삭제를 요청할 수 있습니다. 다만 법령상 보관 의무가 있거나 다른 사람의 권리를 침해할 우려가 있는 경우 요청 처리가 제한될 수 있습니다.</p>
        <h2>8. 안전성 확보 조치</h2><p>접근 권한을 필요한 범위로 제한하고, 인증 정보와 서비스 설정값을 공개 소스에 노출하지 않으며, 운영 목적이 끝난 정보는 정리하는 방식으로 개인정보를 관리합니다.</p>
        <h2>9. 문의</h2><p>개인정보 관련 문의와 삭제 요청은 <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>로 보내주세요.</p>
        <h2>10. 방침의 변경</h2><p>서비스 또는 관련 기준이 변경되면 본 방침을 수정할 수 있으며, 중요한 변경은 사이트를 통해 안내합니다.</p>
        <p className="content-meta">시행일·최종 수정일: 2026년 7월 15일</p>
      </article>
    </main>
  );
}
