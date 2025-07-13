import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-100 p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">취미로운응원생활</h1>
        <p className="text-lg text-gray-700">
          치어리딩 레슨 전문! <br />
          초보자/단체 모두 환영합니다.<br />
          <span className="font-semibold text-blue-600">수강료: 95,000원/2시간</span>
        </p>
        <div className="rounded-xl bg-blue-50 p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">강사 소개</h2>
          <p className="text-gray-700">수관이 강사 — 치어리딩 10년, 대회/공연 다수, 레슨경험 풍부</p>
        </div>
        <a
          href="https://open.kakao.com/o/네_오픈톡링크_여기_붙여넣기"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl text-center transition"
        >
          예약/문의하기 (카카오톡)
        </a>
      </div>
      <footer className="mt-8 text-gray-500 text-sm">© 2025 취미로운응원생활</footer>
    </div>
  );
}
