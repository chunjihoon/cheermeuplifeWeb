# SEO 운영 및 Search Console 연결 가이드

## 현재 기준

- 대표 주소(canonical): `https://www.cheermeuplife.com`
- 비-www 주소는 운영 환경에서 www 주소로 301 또는 308 리다이렉트합니다.
- 기존 Firebase Analytics 설정과 측정 ID는 그대로 유지합니다.
- 새로운 GA4 속성을 만들거나 기존 측정 ID를 교체하지 않습니다.
- 사이트맵: `https://www.cheermeuplife.com/sitemap.xml`
- robots.txt: `https://www.cheermeuplife.com/robots.txt`

## Google Search Console 등록

1. Search Console에서 `cheermeuplife.com` 도메인 속성을 생성합니다.
2. 도메인 구입처의 DNS 설정에 Google이 제공한 TXT 레코드를 추가합니다.
3. 소유권 확인 후 `색인 생성 > Sitemaps`에서 `https://www.cheermeuplife.com/sitemap.xml`을 제출합니다.
4. 중요한 신규 페이지는 URL 검사에서 실제 URL을 입력하고 색인 생성을 요청합니다.
5. Search Console의 연결 설정에서 현재 사용 중인 Google Analytics 속성을 연결합니다. 새 Analytics 속성은 생성하지 않습니다.

도메인 속성은 www와 비-www, http와 https를 한 번에 확인할 수 있으므로 우선 권장합니다. DNS 수정이 어렵고 HTML 메타 태그 방식이 필요한 경우 배포 환경 변수에 다음 값을 설정합니다.

```text
GOOGLE_SITE_VERIFICATION=Google이 제공한 verification content 값
```

환경 변수를 설정하고 재배포하면 모든 공개 페이지의 `<head>`에 확인용 메타 태그가 포함됩니다. Google이 제공하는 전체 `<meta>` 태그가 아니라 `content` 값만 넣습니다.

## 신규 글 발행 절차

현재 첫 단계에서는 `content/posts.ts`를 콘텐츠 원본으로 사용합니다. 다음 단계에서 Notion 데이터베이스 어댑터로 교체하더라도 페이지 URL과 SEO 구조는 유지되도록 데이터 접근을 `lib/posts.ts`로 분리했습니다.

- 상태가 `published`이고 `publishedAt`이 현재 시각보다 이전인 글만 공개됩니다.
- 미래 시각을 지정하면 해당 시각 이후 최대 10분 안에 목록과 사이트맵에 반영됩니다.
- 대표 카테고리는 한 개만 선택하고, 태그는 검색어를 억지로 반복하지 말고 글의 실제 주제만 사용합니다.
- 발행 후 실제 페이지의 제목, 설명, 대표 이미지와 본문을 확인합니다.
- 사이트맵 자동 반영을 확인한 뒤, 중요 글은 Search Console URL 검사로 색인을 요청합니다.

### 예정된 Notion 데이터베이스 필드

| 필드 | 형식 | 용도 |
| --- | --- | --- |
| Title | 제목 | 페이지 제목 |
| Slug | 텍스트 | `/posts/{slug}` 주소 |
| Summary | 텍스트 | 목록 요약 |
| Category | 선택 | 대표 카테고리 |
| Tags | 다중 선택 | 관련 주제 라벨 |
| Status | 선택 | `draft`, `published` |
| Published At | 날짜·시간 | 예약 발행 시각 |
| Updated At | 날짜·시간 | 수정 시각 |
| Cover Image | 파일 또는 URL | 목록·공유 이미지 |
| SEO Title | 텍스트 | 검색 결과 제목 |
| SEO Description | 텍스트 | 검색 결과 설명 |

Notion 연결 단계에서는 토큰과 데이터베이스 ID를 배포 환경 변수에만 저장하고 소스 코드에 넣지 않습니다.

## 배포 후 점검

- `/`, `/about`, `/posts`, `/vod-tutorial`, `/faq`, `/contact`가 정상 응답하는지 확인
- `https://cheermeuplife.com`이 대표 www 주소로 한 번만 리다이렉트되는지 확인
- 각 페이지 소스에 고유한 title, description, canonical이 있는지 확인
- `/robots.txt`와 `/sitemap.xml`이 로그인 없이 열리는지 확인
- Search Console의 페이지 색인 및 모바일 사용성 오류 확인
- 기존 Firebase Analytics의 실시간 보고서에서 기존 이벤트가 계속 들어오는지 확인

쿠키 동의 UI와 내부 테스트 트래픽 제외는 이번 범위에서 구현하지 않았습니다. Analytics 호출이 `lib/analytics.ts`로 모여 있어 이후 동의 상태나 내부 트래픽 조건을 한곳에서 추가할 수 있습니다.

## 운영 전 검토가 필요한 문서

`/privacy`와 `/terms`는 현재 기능을 기준으로 한 운영 초안입니다. 사업자 정보, 실제 결제·환불 절차와 법정 보관 기간이 확정되면 공개 전 최종 검토가 필요합니다.
