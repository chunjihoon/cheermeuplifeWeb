# 2026년 11월 원데이 클래스 운영 설정

## 배포 환경변수

Vercel 프로젝트에 아래 값을 설정해야 사전예약 저장과 관리자 대시보드가 동작한다.

- `FIREBASE_ADMIN_PROJECT_ID`: Firebase 프로젝트 ID
- `FIREBASE_ADMIN_CLIENT_EMAIL`: Firebase 서비스 계정 이메일
- `FIREBASE_ADMIN_PRIVATE_KEY`: Firebase 서비스 계정 비공개 키. Vercel에는 줄바꿈을 `\\n`으로 넣어도 된다.
- `ONE_DAY_CLASS_ADMIN_PASSWORD`: 관리자 대시보드 로그인 비밀번호
- `ONE_DAY_CLASS_ADMIN_SESSION_SECRET`: 관리자 세션 서명용 충분히 긴 무작위 문자열

## 접수 상태 관리

배포 직후에는 별도 시작 시각 없이 사전예약을 받는다.

- `ONE_DAY_CLASS_RESERVATIONS_OPEN`을 설정하지 않거나 `true`로 설정: 접수 가능
- `ONE_DAY_CLASS_RESERVATIONS_OPEN=false`: 신규 접수 중단

마감 시 자동 시각 계산은 하지 않는다. 운영자가 환경변수를 `false`로 변경하고 다시 배포하면 페이지와 API가 모두 접수를 중단한다.

## 관리자 화면

- 주소: `/one-day-class/admin`
- 단일 관리자 비밀번호로 로그인한다.
- 세션은 HttpOnly·SameSite 쿠키로 8시간 유지된다.
- 전체 고유 신청자 수, 날짜별 신청자 수, 7명 기준 충족 여부와 신청자 상세를 조회할 수 있다.
- 수정·삭제·날짜 자동 선정 기능은 제공하지 않는다.

## Firestore

- 컬렉션: `oneDayClassReservations`
- 클래스 식별자: `cheermeuplife-one-day-2026-11`
- 같은 클래스와 정규화된 이메일 조합은 SHA-256 기반의 동일 문서 ID를 사용한다.
- 중복 신청은 트랜잭션에서 거절하며 기존 신청을 덮어쓰지 않는다.
- Firebase Admin SDK를 사용하므로 이 컬렉션의 클라이언트 직접 읽기·쓰기는 Firestore 보안 규칙에서 허용할 필요가 없다.

## 운영 확인 사항

- Firestore 보안 규칙에서 `oneDayClassReservations`의 공개 읽기·쓰기가 허용되지 않았는지 확인한다.
- 개인정보의 구체적인 보유기간은 현재 개인정보처리방침에 확정되어 있지 않다. 실제 운영 정책과 법률 검토 후 방침에 반영한다.
