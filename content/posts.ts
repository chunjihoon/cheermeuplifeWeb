import { basicMovePosts } from "@/content/basic-moves";

export type PostBlock =
  | { type: "heading"; text: string; id?: string }
  | { type: "subheading"; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "orderedList"; items: string[] }
  | { type: "links"; items: Array<{ label: string; href: string }> }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string; width: number; height: number }
  | { type: "imagePlaceholder"; label: string }
  | { type: "moveCards"; items: Array<{ order: number; title: string; summary: string; feature: string; href: string; imageLabel?: string }> }
  | { type: "youtube"; id: string; title: string; start?: number; end?: number };

export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: "치어리딩 기초" | "안무 가이드" | "응원가·플레이리스트" | "학교 축제·행사" | "레슨·연습 팁";
  tags: string[];
  author: "취미로운응원생활";
  status: "draft" | "published";
  publishedAt: string;
  updatedAt: string;
  coverImage: { src: string; alt: string; width: number; height: number };
  showCoverImage?: boolean;
  seoTitle: string;
  seoDescription: string;
  relatedSlugs: string[];
  parentPost?: { slug: string; title: string };
  learningNavigation?: {
    previous?: { href: string; label: string };
    hub: { href: string; label: string };
    next?: { href: string; label: string };
  };
  video?: { id: string; title: string; description: string; start?: number; end?: number };
  body: PostBlock[];
};

const legacyPosts: Post[] = [
  {
    slug: "cheerleading-basic-cheer-moves-7",
    title: "치어리딩 응원 기본동작 7가지 쉽게 배우기",
    summary: "끌기, 차기, 좌우 이동, 박수, 화이팅, 팔 돌리기와 점프까지 치어리딩 초보자가 먼저 익히면 좋은 응원 기본동작 7가지를 소개합니다.",
    category: "치어리딩 기초",
    tags: ["치어리딩 기본동작", "응원 기본동작", "거울모드 연습"],
    author: "취미로운응원생활",
    status: "published",
    publishedAt: "2026-07-16T09:00:00+09:00",
    updatedAt: "2026-07-16T09:00:00+09:00",
    coverImage: { src: "/youtubeCapture1.png", alt: "치어리딩 응원 기본동작을 시범 보이는 강사", width: 547, height: 294 },
    seoTitle: "치어리딩 응원 기본동작 7가지 쉽게 배우기 | 거울모드 연습",
    seoDescription: "치어리딩 초보자를 위한 응원 기본동작 7가지를 소개합니다. 끌기, 차기, 좌우 이동, 박수, 화이팅, 팔 돌리기, 점프 동작을 거울모드 영상과 함께 쉽게 연습해보세요.",
    relatedSlugs: ["cheerleading-beginner-common-mistakes", "jilpunggadu-cheerleading-beginner-guide", "school-festival-cheer-song-guide"],
    body: [
      { type: "paragraph", text: "치어리딩이나 응원 안무를 처음 접하면 동작이 빠르고 복잡해 보일 수 있습니다. 하지만 실제 응원 안무는 몇 가지 기본동작을 반복하거나 서로 연결해서 만드는 경우가 많습니다." },
      { type: "paragraph", text: "이번 글에서는 치어리딩 초보자도 쉽게 연습할 수 있는 응원 기본동작 7가지를 소개합니다. 동작을 하나씩 익혀두면 〈그대에게〉, 〈질풍가도〉, 〈힘내〉, 〈혜성〉처럼 빠르고 신나는 응원곡의 안무를 배울 때도 훨씬 수월합니다." },
      { type: "quote", text: "영상은 거울모드로 보면서 천천히 따라 해보세요." },

      { type: "heading", text: "1. 끌기 동작" },
      { type: "paragraph", text: "첫 번째는 발을 바닥에서 끌어오며 이동하는 기본동작입니다." },
      { type: "paragraph", text: "양발을 편안하게 벌리고 선 뒤, 한쪽 발을 움직이고 반대쪽 발을 가운데로 끌어옵니다. 발을 완전히 들어 올리기보다 바닥을 가볍게 스치듯이 움직이는 것이 핵심입니다." },
      { type: "subheading", text: "연습 방법" },
      { type: "orderedList", items: ["오른발을 옆으로 이동합니다.", "왼발을 오른발 쪽으로 끌어옵니다.", "반대 방향도 같은 방식으로 반복합니다.", "처음에는 하나부터 열까지 천천히 세며 연습합니다."] },
      { type: "paragraph", text: "상체가 좌우로 크게 흔들리지 않도록 중심을 잡아주세요." },

      { type: "heading", text: "2. 차기 동작" },
      { type: "paragraph", text: "두 번째는 발을 끌어온 뒤 반대쪽 발을 가볍게 차는 동작입니다." },
      { type: "paragraph", text: "한 발로 중심을 잡고, 다른 발을 뒤쪽 또는 옆쪽으로 차면서 리듬을 만듭니다. 발을 너무 높게 차기보다는 음악의 박자에 맞춰 가볍고 빠르게 움직이는 것이 좋습니다." },
      { type: "subheading", text: "연습 방법" },
      { type: "orderedList", items: ["한쪽 발을 옆으로 이동합니다.", "반대쪽 발을 끌어옵니다.", "끌어온 발을 가볍게 뒤로 차줍니다.", "좌우 방향을 번갈아 반복합니다."] },
      { type: "paragraph", text: "무릎과 발목에 힘을 지나치게 주지 말고 자연스럽게 움직여주세요." },

      { type: "heading", text: "3. 좌우 이동 스텝" },
      { type: "paragraph", text: "세 번째는 좌우로 이동하면서 발을 뒤로 차는 스텝입니다." },
      { type: "paragraph", text: "응원 안무에서 대형을 바꾸거나 이동감을 보여줄 때 자주 활용할 수 있는 동작입니다." },
      { type: "subheading", text: "연습 방법" },
      { type: "orderedList", items: ["오른쪽으로 한 걸음 이동합니다.", "반대쪽 발을 뒤로 가볍게 차줍니다.", "왼쪽으로 한 걸음 이동합니다.", "반대쪽 발을 다시 뒤로 차줍니다.", "좌우 이동을 반복합니다."] },
      { type: "paragraph", text: "처음에는 발동작만 익히고, 익숙해진 뒤 팔동작을 함께 넣는 것이 좋습니다." },

      { type: "heading", text: "4. 박수 치기 동작" },
      { type: "paragraph", text: "다음은 양팔을 크게 열었다가 머리 위에서 박수를 치는 동작입니다." },
      { type: "paragraph", text: "동작의 범위가 크기 때문에 단체로 함께하면 시각적으로 힘 있고 정돈된 느낌을 줄 수 있습니다." },
      { type: "subheading", text: "연습 방법" },
      { type: "orderedList", items: ["양팔을 어깨 높이에서 수평으로 펼칩니다.", "팔을 머리 위로 크게 올립니다.", "머리 위에서 박수를 칩니다.", "다시 팔을 수평으로 펼칩니다.", "일정한 박자에 맞춰 반복합니다."] },
      { type: "paragraph", text: "팔꿈치를 지나치게 구부리지 않고, 손끝까지 힘을 전달한다는 느낌으로 동작해주세요." },

      { type: "heading", text: "5. 화이팅 동작" },
      { type: "paragraph", text: "다음은 한 손을 힘차게 위로 뻗으면서 같은 쪽 다리를 차는 화이팅 동작입니다." },
      { type: "paragraph", text: "치어리딩의 밝고 힘찬 분위기를 가장 쉽게 표현할 수 있는 대표적인 응원동작입니다." },
      { type: "subheading", text: "연습 방법" },
      { type: "orderedList", items: ["오른손을 위쪽으로 힘차게 뻗습니다.", "동시에 오른발을 가볍게 차줍니다.", "팔과 다리를 원래 위치로 되돌립니다.", "반대쪽도 같은 방식으로 반복합니다."] },
      { type: "paragraph", text: "팔과 다리를 따로 움직이기보다 한 박자에 동시에 뻗어야 동작이 더 힘차게 보입니다." },

      { type: "heading", text: "6. 팔 돌리기 동작" },
      { type: "paragraph", text: "여섯 번째는 한쪽 팔을 앞으로 찌른 뒤 크게 돌려 다시 찌르는 동작입니다." },
      { type: "paragraph", text: "팔을 작게 돌리면 동작이 잘 보이지 않으므로 어깨부터 크게 원을 그린다는 느낌으로 움직이는 것이 중요합니다." },
      { type: "subheading", text: "연습 방법" },
      { type: "orderedList", items: ["오른손을 앞쪽으로 힘껏 찌릅니다.", "팔을 바깥쪽으로 크게 한 바퀴 돌립니다.", "다시 앞쪽으로 손을 찌릅니다.", "같은 동작을 여러 번 반복합니다.", "반대쪽 팔도 연습합니다."] },
      { type: "paragraph", text: "팔만 움직이지 말고 상체의 방향과 시선도 함께 맞춰주면 훨씬 자연스럽습니다." },

      { type: "heading", text: "7. 점프 동작" },
      { type: "paragraph", text: "마지막은 양팔을 크게 펼치며 점프한 뒤 자세를 낮추는 동작입니다." },
      { type: "paragraph", text: "응원 안무의 마지막이나 음악이 강하게 터지는 부분에서 사용하면 큰 에너지를 보여줄 수 있습니다." },
      { type: "subheading", text: "연습 방법" },
      { type: "orderedList", items: ["무릎을 가볍게 구부려 점프를 준비합니다.", "점프하면서 양팔을 크게 펼칩니다.", "착지할 때 무릎을 부드럽게 구부립니다.", "착지 후 자세를 낮추며 다음 동작을 준비합니다."] },
      { type: "paragraph", text: "점프 높이보다 안전하게 착지하는 것이 더 중요합니다. 발 앞부분과 뒤꿈치가 자연스럽게 바닥에 닿도록 하고, 무릎을 완전히 편 상태로 착지하지 않도록 주의해주세요." },

      { type: "heading", text: "초보자를 위한 연습 순서" },
      { type: "paragraph", text: "처음부터 음악 속도에 맞춰 모든 동작을 연결하려고 하면 어렵게 느껴질 수 있습니다. 다음 순서로 연습해보세요." },
      { type: "orderedList", items: ["영상을 멈춰가며 한 동작씩 확인합니다.", "하나부터 열까지 숫자를 세면서 반복합니다.", "발동작과 팔동작을 따로 연습합니다.", "동작이 익숙해지면 팔과 발을 함께 움직입니다.", "마지막에 음악 속도에 맞춰 연결합니다."] },
      { type: "paragraph", text: "거울모드 영상을 이용하면 화면 속 동작을 실제 거울처럼 그대로 따라 할 수 있어 방향을 익히는 데 도움이 됩니다." },

      { type: "heading", text: "기본동작을 익히면 응원 안무가 쉬워집니다" },
      { type: "paragraph", text: "치어리딩 안무는 어려운 기술만으로 구성되는 것이 아닙니다. 끌기, 차기, 이동 스텝, 박수, 팔 돌리기, 점프처럼 비교적 간단한 동작도 음악의 박자와 대형에 맞춰 연결하면 충분히 힘찬 응원 안무가 됩니다." },
      { type: "paragraph", text: "기본동작을 반복해서 익혀두면 새로운 응원곡을 배울 때 동작을 이해하고 따라가는 속도도 빨라집니다." },
      { type: "quote", text: "초보자라면 동작의 크기보다 먼저 박자와 방향을 정확하게 맞추는 것부터 시작해보세요." },

      { type: "heading", text: "치어리딩 안무를 더 체계적으로 배우고 싶다면" },
      { type: "paragraph", text: "취미로운응원생활에서는 초보자도 쉽게 따라 할 수 있는 치어리딩 안무 영상과 단계별 학습 콘텐츠를 제공합니다." },
      { type: "links", items: [
        { label: "치어리딩 레슨 예약하기", href: "/#products" },
        { label: "질풍가도 안무 VOD 살펴보기", href: "/vod-tutorial" },
        { label: "취미로운응원생활 유튜브에서 거울모드 영상 보기", href: "https://www.youtube.com/@cheermeuplife" },
      ] },
    ],
  },
  {
    slug: "jilpunggadu-cheerleading-beginner-guide",
    title: "질풍가도 치어리딩 안무를 처음 배울 때 알아야 할 점",
    summary: "완성 영상만 반복하기 전에 동작 순서, 방향과 카운트를 기준으로 질풍가도 안무를 익히는 방법을 정리합니다.",
    category: "안무 가이드",
    tags: ["질풍가도 안무", "치어리딩 초보", "응원단 안무"],
    author: "취미로운응원생활",
    status: "published",
    publishedAt: "2026-07-13T09:00:00+09:00",
    updatedAt: "2026-07-15T09:00:00+09:00",
    coverImage: { src: "/vod-hero-poster.jpg", alt: "연습실에서 질풍가도 치어리딩 안무를 시범 보이는 강사", width: 1280, height: 720 },
    seoTitle: "질풍가도 치어리딩 안무 초보 학습 가이드",
    seoDescription: "질풍가도 치어리딩 안무를 처음 배울 때 필요한 카운트, 방향, 구간별 연습과 배속 연습 방법을 확인하세요.",
    relatedSlugs: ["cheerleading-basic-cheer-moves-7", "cheerleading-beginner-common-mistakes", "school-festival-cheer-song-guide"],
    body: [
      { type: "paragraph", text: "질풍가도는 학교 축제와 체육대회, 응원 공연에서 자주 선택되는 곡입니다. 에너지가 크고 동작 전환이 빠르기 때문에 완성 영상만 보고 한 번에 따라 하려 하면 팔과 발의 순서가 쉽게 섞일 수 있습니다." },
      { type: "heading", text: "먼저 전체 흐름을 확인하세요" },
      { type: "paragraph", text: "처음부터 모든 동작을 정확하게 따라 하기보다 곡의 어느 부분에서 안무가 바뀌는지 확인합니다. 인트로, 주요 파트, 브리지와 엔딩처럼 큰 구간을 먼저 구분하면 연습 순서를 잡기 쉽습니다." },
      { type: "image", src: "/image-tutorial.png", alt: "질풍가도 치어리딩 튜토리얼의 구간별 학습 구성", width: 1122, height: 1402 },
      { type: "heading", text: "동작은 카운트와 방향으로 나눕니다" },
      { type: "list", items: ["팔 동작만 먼저 확인하기", "발의 이동 방향과 무게 중심 확인하기", "8카운트 단위로 팔과 발 연결하기", "동작 전환 시 시선과 몸의 방향 확인하기"] },
      { type: "quote", text: "빠른 안무일수록 느리게 보는 것보다 정확한 기준으로 나누어 연습하는 과정이 중요합니다." },
      { type: "heading", text: "느린 속도에서 원곡 속도로 올립니다" },
      { type: "paragraph", text: "동작을 외운 뒤에는 0.3배속처럼 충분히 느린 속도에서 연결하고, 안정되면 0.5배속과 0.7배속을 거쳐 원곡 속도로 올립니다. 속도를 높였을 때 틀리는 구간은 다시 짧게 분리해 반복합니다." },
      { type: "youtube", id: "rmNImGLrTfQ", title: "질풍가도 치어리딩 안무 영상" },
    ],
  },
  {
    slug: "school-festival-cheer-song-guide",
    title: "학교 축제에서 분위기를 띄우는 응원곡 고르는 방법",
    summary: "학교 축제와 체육대회 공연에서 관객 참여와 팀의 연습 난이도를 함께 고려해 응원곡을 선택하는 기준을 소개합니다.",
    category: "학교 축제·행사",
    tags: ["학교 축제 공연", "체육대회 응원", "응원곡 추천"],
    author: "취미로운응원생활",
    status: "published",
    publishedAt: "2026-07-10T09:00:00+09:00",
    updatedAt: "2026-07-10T09:00:00+09:00",
    coverImage: { src: "/goyangCheerFestival2022.png", alt: "야외 무대에서 진행되는 치어리딩 공연", width: 665, height: 393 },
    seoTitle: "학교 축제·체육대회 응원곡 선택 가이드",
    seoDescription: "학교 축제와 체육대회 치어리딩 공연을 위한 응원곡을 고를 때 관객 반응, 안무 난이도와 연습 기간을 판단하는 방법입니다.",
    relatedSlugs: ["jilpunggadu-cheerleading-beginner-guide", "cheerleading-beginner-common-mistakes"],
    body: [
      { type: "paragraph", text: "좋은 공연곡은 유명한 노래라는 이유만으로 결정되지 않습니다. 관객이 반응할 수 있는 구간, 팀이 소화할 수 있는 동작과 실제 연습 기간이 맞아야 무대의 완성도가 높아집니다." },
      { type: "heading", text: "관객이 알아볼 수 있는 구간이 있는지 확인합니다" },
      { type: "paragraph", text: "후렴이나 응원 구호처럼 짧게 들어도 알아볼 수 있는 부분은 관객 참여를 만들기 좋습니다. 공연 전체가 낯선 곡이라면 시작이나 엔딩에 익숙한 포인트를 배치하는 방법도 있습니다." },
      { type: "heading", text: "연습 기간과 팀의 경험을 기준으로 선택합니다" },
      { type: "list", items: ["초보자가 많다면 반복되는 리듬과 명확한 박자의 곡", "연습 기간이 짧다면 대형 이동이 적고 포인트가 분명한 안무", "인원이 많다면 좌우 방향과 시작 위치가 쉽게 구분되는 구성", "행사 성격에 맞는 가사와 분위기"] },
      { type: "image", src: "/youtubeCapture1.png", alt: "학교와 행사 공연을 위한 치어리딩 동작", width: 547, height: 294 },
      { type: "heading", text: "메들리는 전환 시간을 계산합니다" },
      { type: "paragraph", text: "여러 곡을 연결할 때는 곡 수보다 전환의 자연스러움이 중요합니다. 의상, 대형과 동작 분위기가 크게 바뀌면 짧은 공연도 준비해야 할 요소가 많아집니다." },
      { type: "quote", text: "관객 반응이 좋은 곡과 우리 팀이 잘할 수 있는 곡이 겹치는 지점을 찾는 것이 가장 현실적인 선택입니다." },
    ],
  },
  {
    slug: "cheerleading-beginner-common-mistakes",
    title: "치어리딩 초보자가 자주 틀리는 기본 동작과 연습법",
    summary: "팔 각도, 무게 중심, 카운트와 방향 전환 등 치어리딩 입문자가 자주 놓치는 기본을 점검합니다.",
    category: "치어리딩 기초",
    tags: ["치어리딩 기본동작", "치어리딩 기초", "치어리딩 연습"],
    author: "취미로운응원생활",
    status: "published",
    publishedAt: "2026-07-07T09:00:00+09:00",
    updatedAt: "2026-07-12T09:00:00+09:00",
    coverImage: { src: "/youtubeCapture1.png", alt: "치어리딩 기본 동작을 연습하는 모습", width: 547, height: 294 },
    seoTitle: "치어리딩 초보자가 자주 틀리는 기본동작",
    seoDescription: "치어리딩 초보자가 자주 틀리는 팔 각도, 무게 중심, 카운트와 방향 전환을 점검하고 효과적인 연습 방법을 알아보세요.",
    relatedSlugs: ["cheerleading-basic-cheer-moves-7", "jilpunggadu-cheerleading-beginner-guide", "school-festival-cheer-song-guide"],
    body: [
      { type: "paragraph", text: "치어리딩 동작은 크게 움직이는 것만큼 시작과 끝을 정확히 만드는 것이 중요합니다. 초보자는 음악을 따라가는 데 집중하다 보니 팔의 높이와 중심 이동을 놓치기 쉽습니다." },
      { type: "heading", text: "팔이 아니라 어깨부터 방향을 확인합니다" },
      { type: "paragraph", text: "같은 팔 동작도 어깨가 들리거나 몸통이 함께 돌아가면 모양이 달라집니다. 거울을 볼 때 손끝만 보지 말고 어깨 높이와 팔꿈치 방향을 함께 확인하세요." },
      { type: "heading", text: "무게 중심이 다음 동작을 결정합니다" },
      { type: "list", items: ["발을 내딛기 전에 어느 발에 체중이 있는지 확인하기", "점프와 이동 후 무릎을 잠그지 않기", "좌우 전환 직전에 상체가 먼저 기울지 않게 하기", "큰 동작 뒤 기본 자세로 돌아오는 지점 확인하기"] },
      { type: "heading", text: "카운트를 말하며 연습합니다" },
      { type: "paragraph", text: "음악만 반복하면 익숙한 구간에서는 맞지만 긴장하거나 대형이 바뀌면 타이밍을 놓칠 수 있습니다. 동작 이름이나 방향을 카운트와 함께 소리 내어 연습하면 팀의 기준을 맞추기 좋습니다." },
      { type: "quote", text: "기본 동작은 작게 하는 연습이 아니라, 큰 동작을 같은 기준으로 반복할 수 있게 만드는 연습입니다." },
    ],
  },
];

const replacedBasicMoveSlug = "cheerleading-basic-cheer-moves-7";
const basicMoveHubSlug = "cheerleading-basic-moves";

export const posts: Post[] = [
  ...basicMovePosts,
  ...legacyPosts
    .filter((post) => post.slug !== replacedBasicMoveSlug)
    .map((post) => ({
      ...post,
      relatedSlugs: post.relatedSlugs.map((slug) => slug === replacedBasicMoveSlug ? basicMoveHubSlug : slug),
    })),
];
