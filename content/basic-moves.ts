import type { Post, PostBlock } from "@/content/posts";
import {
  armCircleManuscript,
  clapManuscript,
  fightingManuscript,
  jumpManuscript,
  pullKickManuscript,
  sideStepManuscript,
} from "@/content/basic-move-manuscripts";

const HUB_SLUG = "cheerleading-basic-moves";
const VIDEO_ID = "SkuZsgrwmJ8";
const publishedAt = "2026-07-16T00:00:00+09:00";

type DraftBlock = PostBlock;

function parseManuscript(markdown: string): DraftBlock[] {
  const blocks: DraftBlock[] = [];
  const lines = markdown.trim().split("\n");
  let paragraph: string[] = [];
  let list: string[] = [];
  let orderedList: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushLists = () => {
    if (list.length) blocks.push({ type: "list", items: list });
    if (orderedList.length) blocks.push({ type: "orderedList", items: orderedList });
    list = [];
    orderedList = [];
  };
  const flush = () => { flushParagraph(); flushLists(); };

  for (const rawLine of lines) {
    const line = rawLine.trim().replaceAll("\\u0060", "`").replaceAll("\\`", "`");
    if (!line || line === "---") { flush(); continue; }
    const heading = line.match(/^#{1,2}\s+(.+)$/);
    const subheading = line.match(/^###\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    const bullet = line.match(/^-\s+(.+)$/);
    if (subheading) { flush(); blocks.push({ type: "subheading", text: subheading[1] }); continue; }
    if (heading) { flush(); blocks.push({ type: "heading", text: heading[1] }); continue; }
    if (ordered) { flushParagraph(); if (list.length) flushLists(); orderedList.push(ordered[1]); continue; }
    if (bullet) { flushParagraph(); if (orderedList.length) flushLists(); list.push(bullet[1]); continue; }
    flushLists();
    paragraph.push(line);
  }
  flush();
  return blocks;
}

function buildBody(
  manuscript: string,
  video: { title: string; start: number; end?: number; beforeHeading: string; description: string },
) {
  const source = parseManuscript(manuscript);
  const body: PostBlock[] = [];
  for (const block of source) {
    if (block.type === "heading" && block.text === video.beforeHeading) {
      body.push({ type: "paragraph", text: video.description });
      body.push({ type: "youtube", id: VIDEO_ID, title: video.title, start: video.start, end: video.end });
    }
    if (block.type === "heading" && block.text === "끌기 동작") body.push({ ...block, id: "pull-step" });
    else if (block.type === "heading" && block.text === "차기 동작") body.push({ ...block, id: "kick-step" });
    else body.push(block);
  }
  return body;
}

const parentPost = { slug: HUB_SLUG, title: "치어리딩 기본동작 7가지" };
const hubLink = { href: `/posts/${HUB_SLUG}`, label: "기본동작 7가지 전체 보기" };

const detailCoverImages: Record<string, string> = {
  "cheerleading-pull-kick-step": "/posts-basic7-1.png",
  "cheerleading-side-step": "/posts-basic7-3.png",
  "cheerleading-clap": "/posts-basic7-4.png",
  "cheerleading-fighting-move": "/posts-basic7-5.png",
  "cheerleading-arm-circle": "/posts-basic7-6.png",
  "cheerleading-jump-move": "/posts-basic7-7.png",
};

const hub: Post = {
  slug: HUB_SLUG,
  title: "치어리딩 기본동작 7가지｜초보자 연습 순서",
  summary: "끌기, 차기, 좌우 이동, 박수, 화이팅, 팔 돌리기와 점프까지 초보자가 먼저 익히면 좋은 치어리딩 기본동작과 추천 연습 순서를 안내합니다.",
  category: "치어리딩 기초",
  tags: ["치어리딩 기본동작", "응원 기본동작", "거울모드 연습"],
  author: "취미로운응원생활",
  status: "published",
  publishedAt,
  updatedAt: publishedAt,
  coverImage: { src: "/posts-basic7-1.png", alt: "치어리딩 끌기와 차기 기본동작", width: 938, height: 712 },
  showCoverImage: false,
  seoTitle: "치어리딩 기본동작 7가지｜초보자 연습 순서",
  seoDescription: "치어리딩 초보자가 먼저 익히면 좋은 끌기, 차기, 좌우 이동, 박수, 화이팅, 팔 돌리기, 점프 동작을 소개합니다. 거울모드 영상과 동작별 상세 설명을 확인해보세요.",
  relatedSlugs: ["cheerleading-beginner-common-mistakes", "jilpunggadu-cheerleading-beginner-guide"],
  video: { id: VIDEO_ID, title: "치어리딩 기본동작 7가지 거울모드 영상", description: "끌기부터 점프까지 치어리딩 기본동작 7가지의 전체 흐름을 보여주는 거울모드 영상입니다.", start: 0 },
  body: [
    { type: "paragraph", text: "치어리딩 안무는 몇 가지 기본동작을 반복하고 서로 연결해 구성되는 경우가 많습니다." },
    { type: "paragraph", text: "초보자는 빠른 안무 전체를 바로 외우기보다 발과 팔의 기본 움직임을 하나씩 익힌 뒤 연결하는 것이 좋습니다." },
    { type: "paragraph", text: "이 페이지에서는 끌기부터 점프까지 7가지 기본동작의 특징과 추천 연습 순서를 확인하고, 필요한 동작의 상세 설명으로 바로 이동할 수 있습니다." },
    { type: "paragraph", text: "아래 영상에서는 7가지 기본동작의 전체 형태를 거울모드로 확인할 수 있습니다. 먼저 전체 흐름을 본 뒤, 어려운 동작은 아래 상세 설명에서 따로 연습해보세요." },
    { type: "youtube", id: VIDEO_ID, title: "치어리딩 기본동작 7가지 전체 거울모드 영상", start: 0 },
    { type: "heading", text: "치어리딩 기본동작 7가지" },
    { type: "moveCards", items: [
      { order: 1, title: "끌기 동작", summary: "양발의 앞부분으로 바닥을 스치며 두 발을 동시에 가운데로 모았다가 원래 위치로 돌아갑니다.", feature: "핵심 · 양발을 동시에 움직이기", href: "/posts/cheerleading-pull-kick-step#pull-step", image: { src: "/posts-basic7-1.png", alt: "치어리딩 끌기 동작" } },
      { order: 2, title: "차기 동작", summary: "오른발을 가운데로 끌어오면서 왼발을 엉덩이 방향으로 뒤로 차는 동작입니다.", feature: "핵심 · 끌기와 차기를 동시에", href: "/posts/cheerleading-pull-kick-step#kick-step", image: { src: "/posts-basic7-1.png", alt: "치어리딩 차기 동작" } },
      { order: 3, title: "좌우 이동 스텝", summary: "이동하는 발은 바닥을 스치고 반대쪽 발은 뒤로 차며 좌우로 번갈아 움직입니다.", feature: "핵심 · 좌우 중심 유지", href: "/posts/cheerleading-side-step", image: { src: "/posts-basic7-3.png", alt: "치어리딩 좌우 이동 스텝" } },
      { order: 4, title: "박수 동작", summary: "양팔을 수평으로 펼쳤다가 머리 위에서 박수를 치며 차기 동작을 연결합니다.", feature: "핵심 · 팔꿈치를 곧게 펴기", href: "/posts/cheerleading-clap", image: { src: "/posts-basic7-4.png", alt: "치어리딩 박수 동작" } },
      { order: 5, title: "화이팅 동작", summary: "오른팔을 힘차게 뻗으며 왼발 끌기와 오른발 뒤로 차기를 동시에 수행합니다.", feature: "핵심 · 팔과 다리 동시 연결", href: "/posts/cheerleading-fighting-move", image: { src: "/posts-basic7-5.png", alt: "치어리딩 화이팅 동작" } },
      { order: 6, title: "팔 돌리기 동작", summary: "왼팔을 사선 위로 고정하고 오른팔을 크게 회전한 뒤 목표 지점까지 찌릅니다.", feature: "핵심 · 어깨 중심으로 큰 원", href: "/posts/cheerleading-arm-circle", image: { src: "/posts-basic7-6.png", alt: "치어리딩 팔 돌리기 동작" } },
      { order: 7, title: "점프 동작", summary: "팔을 위·가운데·아래로 움직이며 가벼운 점프와 앉는 자세를 3박자로 연결합니다.", feature: "핵심 · 높이보다 정확한 타이밍", href: "/posts/cheerleading-jump-move", image: { src: "/posts-basic7-7.png", alt: "치어리딩 점프 동작" } },
    ] },
    { type: "heading", text: "추천 연습 순서" },
    { type: "orderedList", items: ["끌기", "차기", "좌우 이동", "박수", "화이팅", "팔 돌리기", "점프"] },
    { type: "list", items: ["발동작부터 익힙니다.", "이후 팔동작을 추가합니다.", "마지막에 팔과 발을 함께 연결합니다.", "빠른 음악보다 카운트에 맞춰 천천히 연습합니다."] },
    { type: "heading", text: "초보자 공통 주의사항" },
    { type: "list", items: ["처음부터 음악 속도에 맞추지 않습니다.", "팔과 발을 따로 연습합니다.", "동작의 크기보다 방향과 박자를 먼저 맞춥니다.", "점프나 앉는 동작은 무리하지 않습니다.", "거울모드 영상을 이용해 좌우 방향을 확인합니다."] },
    { type: "heading", text: "원하는 동작부터 자세히 배워보세요" },
    { type: "moveCards", items: [
      { order: 1, title: "끌기와 차기", summary: "두 동작의 공통 원리와 차이를 한 페이지에서 이어서 배웁니다.", feature: "영상 00:10–01:32", href: "/posts/cheerleading-pull-kick-step" },
      { order: 3, title: "좌우 이동 스텝", summary: "좌우로 이동하는 발과 뒤로 차는 발의 타이밍을 익힙니다.", feature: "영상 01:32–02:34", href: "/posts/cheerleading-side-step" },
      { order: 4, title: "박수", summary: "머리 위 박수와 차기 동작을 같은 박자에 연결합니다.", feature: "영상 02:34–03:24", href: "/posts/cheerleading-clap" },
      { order: 5, title: "화이팅", summary: "사선 방향에서 오른팔과 양발을 동시에 움직입니다.", feature: "영상 03:24–04:16", href: "/posts/cheerleading-fighting-move" },
      { order: 6, title: "팔 돌리기", summary: "찌르기와 두 번의 팔 회전을 5박자로 연결합니다.", feature: "영상 04:16–04:55", href: "/posts/cheerleading-arm-circle" },
      { order: 7, title: "점프", summary: "가벼운 점프부터 무릎을 대고 앉는 자세까지 3박자로 연결합니다.", feature: "영상 04:55–끝", href: "/posts/cheerleading-jump-move" },
    ] },
    { type: "links", items: [
      { label: "첫 번째 동작인 끌기와 차기 배우기", href: "/posts/cheerleading-pull-kick-step" },
      { label: "유튜브에서 전체 영상 보기", href: "https://www.youtube.com/watch?v=SkuZsgrwmJ8" },
      { label: "치어리딩 레슨 확인하기", href: "/#products" },
    ] },
  ],
};

function detailPost(options: Omit<Post, "category" | "author" | "status" | "publishedAt" | "updatedAt" | "coverImage" | "parentPost">): Post {
  return {
    ...options,
    category: "치어리딩 기초",
    author: "취미로운응원생활",
    status: "published",
    publishedAt,
    updatedAt: publishedAt,
    coverImage: { src: detailCoverImages[options.slug], alt: `${options.title} 대표 이미지`, width: 938, height: 712 },
    showCoverImage: false,
    parentPost,
  };
}

const pullKick = detailPost({
  slug: "cheerleading-pull-kick-step",
  title: "치어리딩 끌기와 차기 동작 배우기｜발동작과 박자",
  summary: "발 앞부분으로 바닥을 스치며 양발을 모으는 끌기 동작과 오른발을 끌면서 왼발을 뒤로 차는 차기 동작을 함께 배웁니다.",
  tags: ["치어리딩 끌기", "치어리딩 차기", "치어리딩 발동작"],
  seoTitle: "치어리딩 끌기와 차기 동작 배우기｜발동작과 박자",
  seoDescription: "발 앞부분으로 바닥을 스치며 양발을 모으는 끌기 동작과 오른발을 끌면서 왼발을 뒤로 차는 차기 동작을 시작 자세, 박자, 핵심 포인트와 함께 배워보세요.",
  relatedSlugs: [HUB_SLUG, "cheerleading-side-step", "cheerleading-beginner-common-mistakes"],
  learningNavigation: { hub: hubLink, next: { href: "/posts/cheerleading-side-step", label: "좌우 이동 스텝" } },
  video: { id: VIDEO_ID, title: "치어리딩 끌기와 차기 동작 거울모드 영상", description: "끌기와 차기 동작의 발 위치와 박자를 확인하는 거울모드 영상입니다.", start: 10, end: 92 },
  body: buildBody(pullKickManuscript, { title: "치어리딩 끌기와 차기 동작", start: 10, end: 92, beforeHeading: "끌기 동작", description: "아래 영상에서는 끌기와 차기 동작의 전체 흐름을 거울모드로 확인할 수 있습니다. 발 앞부분이 바닥을 스치는 움직임과 두 발이 동시에 움직이는 타이밍을 확인해보세요." }),
});

const sideStep = detailPost({
  slug: "cheerleading-side-step", title: "치어리딩 좌우 이동 스텝 배우기｜발 끌기와 뒤로 차기", summary: "이동하는 발은 바닥을 스치고 반대쪽 발은 뒤로 차며 왼쪽과 오른쪽으로 번갈아 움직이는 방법을 배웁니다.", tags: ["치어리딩 좌우 이동", "치어리딩 스텝", "치어리딩 발동작"], seoTitle: "치어리딩 좌우 이동 스텝 배우기｜발 끌기와 뒤로 차기", seoDescription: "한쪽 발을 바닥에 붙인 채 옆으로 끌면서 반대쪽 발을 뒤로 차는 치어리딩 좌우 이동 스텝을 시작 자세, 이동 순서, 주의사항과 함께 배워보세요.", relatedSlugs: [HUB_SLUG, "cheerleading-pull-kick-step", "cheerleading-clap"], learningNavigation: { previous: { href: "/posts/cheerleading-pull-kick-step", label: "끌기와 차기" }, hub: hubLink, next: { href: "/posts/cheerleading-clap", label: "박수 동작" } }, video: { id: VIDEO_ID, title: "치어리딩 좌우 이동 스텝 거울모드 영상", description: "좌우 이동 스텝에서 발을 끄는 방향과 반대쪽 발을 뒤로 차는 타이밍을 보여주는 영상입니다.", start: 92, end: 154 }, body: buildBody(sideStepManuscript, { title: "치어리딩 좌우 이동 스텝", start: 92, end: 154, beforeHeading: "2. 시작 자세", description: "아래 영상에서는 좌우 이동 스텝의 전체 흐름을 거울모드로 확인할 수 있습니다. 이동하는 발이 바닥을 스치는 경로와 반대쪽 발을 동시에 뒤로 차는 타이밍을 확인해보세요." })
});

const clap = detailPost({
  slug: "cheerleading-clap", title: "치어리딩 박수 동작 배우기｜팔 각도와 박자", summary: "양팔을 수평으로 펼쳤다가 머리 위에서 박수를 치고 차기 동작을 같은 박자에 연결하는 방법을 배웁니다.", tags: ["치어리딩 박수", "치어리딩 팔동작", "치어리딩 박자"], seoTitle: "치어리딩 박수 동작 배우기｜팔 각도와 박자", seoDescription: "양팔을 수평으로 크게 펼쳤다가 머리 위에서 박수를 치고, 왼발 끌기와 오른발 뒤로 차기를 연결하는 치어리딩 박수 동작을 배워보세요.", relatedSlugs: [HUB_SLUG, "cheerleading-side-step", "cheerleading-fighting-move"], learningNavigation: { previous: { href: "/posts/cheerleading-side-step", label: "좌우 이동 스텝" }, hub: hubLink, next: { href: "/posts/cheerleading-fighting-move", label: "화이팅 동작" } }, video: { id: VIDEO_ID, title: "치어리딩 박수 동작 거울모드 영상", description: "양팔을 수평으로 펼치고 머리 위에서 박수를 치며 차기 동작을 연결하는 영상입니다.", start: 154, end: 204 }, body: buildBody(clapManuscript, { title: "치어리딩 박수 동작", start: 154, end: 204, beforeHeading: "2. 시작 자세", description: "아래 영상에서는 박수 동작의 전체 흐름을 거울모드로 확인할 수 있습니다. 양팔이 수평에서 머리 위로 이동하는 각도와 박수와 차기가 동시에 이루어지는 순간을 확인해보세요." })
});

const fighting = detailPost({
  slug: "cheerleading-fighting-move", title: "치어리딩 화이팅 동작 배우기｜팔과 다리 연결", summary: "오른쪽 사선 방향에서 오른팔을 뻗고 왼발 끌기와 오른발 뒤로 차기를 동시에 연결하는 화이팅 동작을 배웁니다.", tags: ["치어리딩 화이팅", "치어리딩 팔 다리 연결", "응원 동작"], seoTitle: "치어리딩 화이팅 동작 배우기｜팔과 다리 연결", seoDescription: "오른쪽 사선 45도 방향에서 오른팔을 머리 높이까지 뻗고, 왼발 끌기와 오른발 뒤로 차기를 동시에 연결하는 치어리딩 화이팅 동작을 배워보세요.", relatedSlugs: [HUB_SLUG, "cheerleading-clap", "cheerleading-arm-circle"], learningNavigation: { previous: { href: "/posts/cheerleading-clap", label: "박수 동작" }, hub: hubLink, next: { href: "/posts/cheerleading-arm-circle", label: "팔 돌리기" } }, video: { id: VIDEO_ID, title: "치어리딩 화이팅 동작 거울모드 영상", description: "오른팔을 머리 높이까지 뻗으며 왼발과 오른발을 동시에 움직이는 화이팅 동작 영상입니다.", start: 204, end: 256 }, body: buildBody(fightingManuscript, { title: "치어리딩 화이팅 동작", start: 204, end: 256, beforeHeading: "2. 시작 자세", description: "아래 영상에서는 화이팅 동작의 전체 흐름을 거울모드로 확인할 수 있습니다. 오른쪽 사선 45도 방향과 오른팔, 왼발, 오른발이 동시에 움직이는 타이밍을 확인해보세요." })
});

const armCircle = detailPost({
  slug: "cheerleading-arm-circle", title: "치어리딩 팔 돌리기 동작 배우기｜카운트별 설명", summary: "왼팔을 사선 위로 고정하고 오른팔을 크게 회전한 뒤 왼손까지 찌르는 동작을 5박자에 맞춰 배웁니다.", tags: ["치어리딩 팔 돌리기", "치어리딩 팔동작", "치어리딩 카운트"], seoTitle: "치어리딩 팔 돌리기 동작 배우기｜카운트별 연습법", seoDescription: "왼팔을 사선 위로 고정하고 오른팔을 시계 반대 방향으로 크게 회전한 뒤 왼손을 향해 찌르는 치어리딩 팔 돌리기 동작을 카운트별로 배워보세요.", relatedSlugs: [HUB_SLUG, "cheerleading-fighting-move", "cheerleading-jump-move"], learningNavigation: { previous: { href: "/posts/cheerleading-fighting-move", label: "화이팅 동작" }, hub: hubLink, next: { href: "/posts/cheerleading-jump-move", label: "점프 동작" } }, video: { id: VIDEO_ID, title: "치어리딩 팔 돌리기 동작 거울모드 영상", description: "왼팔을 고정하고 오른팔을 시계 반대 방향으로 회전해 왼손까지 찌르는 동작 영상입니다.", start: 256, end: 295 }, body: buildBody(armCircleManuscript, { title: "치어리딩 팔 돌리기 동작", start: 256, end: 295, beforeHeading: "2. 시작 자세", description: "아래 영상에서는 팔 돌리기 동작의 전체 흐름을 거울모드로 확인할 수 있습니다. 왼팔을 사선 위에 고정한 상태에서 오른팔이 몸 뒤쪽을 지나 크게 회전하는 경로와 찌르기 동작의 도착 위치를 확인해보세요." })
});

const jump = detailPost({
  slug: "cheerleading-jump-move", title: "치어리딩 점프 동작 배우기｜3박자 팔·다리 연결법", summary: "팔을 위·가운데·아래로 크게 움직이며 가벼운 점프와 런지, 오른쪽 무릎을 대고 앉는 자세를 3박자로 연결합니다.", tags: ["치어리딩 점프", "치어리딩 3박자", "치어리딩 앉기 동작"], seoTitle: "치어리딩 점프 동작 배우기｜3박자 팔·다리 연결법", seoDescription: "팔을 위·가운데·아래로 움직이며 가벼운 점프와 런지, 무릎 앉기를 연결하는 치어리딩 점프 동작을 박자별로 배워보세요.", relatedSlugs: [HUB_SLUG, "cheerleading-arm-circle", "cheerleading-beginner-common-mistakes"], learningNavigation: { previous: { href: "/posts/cheerleading-arm-circle", label: "팔 돌리기" }, hub: hubLink }, video: { id: VIDEO_ID, title: "치어리딩 점프 동작 거울모드 영상", description: "팔의 위·가운데·아래 움직임과 가벼운 점프, 런지, 무릎 앉기를 3박자로 연결하는 영상입니다.", start: 295 }, body: buildBody(jumpManuscript, { title: "치어리딩 점프 동작", start: 295, beforeHeading: "2. 시작 자세", description: "아래 영상에서는 점프 동작의 전체 흐름을 거울모드로 확인할 수 있습니다. 팔이 위·가운데·아래로 이동하는 각도와 가벼운 점프, 런지, 무릎 앉기가 3박자에 맞춰 연결되는 과정을 확인해보세요." })
});

export const basicMovePosts: Post[] = [hub, pullKick, sideStep, clap, fighting, armCircle, jump];
