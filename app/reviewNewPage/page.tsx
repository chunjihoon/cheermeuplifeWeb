// /app/reviewNewPage.tsx
"use client";
import router from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewForm() {
  const [form, setForm] = useState({ name: "", date: "", count: "", content: "" });
  const [focus, setFocus] = useState({ name: false, date: false, count: false, content: false });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFocus = (field: string, val: boolean) => setFocus(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/review-submit", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    });
    alert("리뷰가 전송되었습니다. 승인 후 게시됩니다.");
    setForm({ name: "", date: "", count: "", content: "" });
    router.push("/");
  };

  return (
    <form
      className="max-w-xl mx-auto mt-16 p-8 flex flex-col gap-8 bg-white/90 rounded-3xl shadow-2xl border border-yellow-200 animate-fadein"
      onSubmit={handleSubmit}
      style={{ boxShadow: "0 8px 36px 0 rgba(255,152,203,0.12), 0 1.5px 8px 0 rgba(255,180,80,0.10)" }}
    >
      <h2 className="font-gotgam text-3xl font-bold text-pink-500 mb-2 tracking-tight animate-slidein text-center">여러분의 소중한 후기를 남겨주세요</h2>

      {/* 각 필드: 라벨 플로팅+애니메이션 */}
      {[
        { name: "name", label: "리뷰작성자", type: "text" },
        { name: "song", label: "레슨곡", type: "text" },
      ].map(f => (
        <div key={f.name} className="relative">
          <input
            name={f.name}
            type={f.type}
            value={form[f.name as keyof typeof form]}
            onChange={handleChange}
            onFocus={() => handleFocus(f.name, true)}
            onBlur={() => handleFocus(f.name, false)}
            className={`
              w-full px-4 pt-7 pb-2 text-lg bg-white rounded-2xl border-2 
              outline-none transition-all duration-200
              ${focus[f.name as keyof typeof focus] || form[f.name as keyof typeof form] 
                ? "border-pink-400" : "border-gray-300"}
              focus:ring-2 focus:ring-yellow-200
              shadow-sm text-gray-800
            `}
            required
            autoComplete="off"
          />
          <label
            htmlFor={f.name}
            className={`
              absolute left-4 top-2 text-sm pointer-events-none transition-all duration-200
              ${focus[f.name as keyof typeof focus] || form[f.name as keyof typeof form]
                ? "text-pink-500 scale-95 font-bold" 
                : "text-gray-400"}
            `}
          >
            {f.label}
          </label>
        </div>
      ))}

      <div className="relative">
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          onFocus={() => handleFocus("date", true)}
          onBlur={() => handleFocus("date", false)}
          className={`
            w-full px-4 pt-7 pb-2 text-lg bg-white rounded-2xl border-2 
            outline-none transition-all duration-200
            ${focus.date || form.date ? "border-pink-400" : "border-gray-300"}
            focus:ring-2 focus:ring-yellow-200
            shadow-sm text-gray-800
          `}
          required
          autoComplete="off"
        />
        <label
          htmlFor="date"
          className={`
            absolute left-4 top-2 text-sm pointer-events-none transition-all duration-200
            ${focus.date || form.date ? "text-pink-500 scale-95 font-bold" : "text-gray-400"}
          `}
        >
          레슨일자
        </label>
      </div>

      <div className="relative">
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          onFocus={() => handleFocus("content", true)}
          onBlur={() => handleFocus("content", false)}
          className={`
            w-full px-4 pt-7 pb-2 text-lg bg-white rounded-2xl border-2 min-h-[120px]
            outline-none transition-all duration-200
            ${focus.content || form.content ? "border-pink-400" : "border-gray-300"}
            focus:ring-2 focus:ring-yellow-200
            shadow-sm text-gray-800
          `}
          required
        />
        <label
          htmlFor="content"
          className={`
            absolute left-4 top-2 text-sm pointer-events-none transition-all duration-200
            ${focus.content || form.content ? "text-pink-500 scale-95 font-bold" : "text-gray-400"}
          `}
        >
          레슨 후기를 적어주세요
        </label>
      </div>

      <button
        className="
          bg-gradient-to-r from-pink-500 to-yellow-400 text-white py-3 text-lg rounded-2xl font-bold
          shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 
          active:scale-95 active:brightness-110
          animate-pop
        "
        type="submit"
      >
        리뷰 등록하기
      </button>

      {/* 애니메이션 정의 */}
      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none;}}
        .animate-fadein { animation: fadein 1.0s cubic-bezier(0.4,0,0.2,1) both;}
        @keyframes slidein { from { opacity:0; transform: translateY(-20px);} to { opacity:1; transform:none;}}
        .animate-slidein { animation: slidein 1s .15s both;}
        @keyframes pop { 0% {transform: scale(0.93);} 80% {transform: scale(1.06);} 100% {transform: scale(1);}}
        .animate-pop { animation: pop 0.7s cubic-bezier(0.6,0,0.3,1) 1;}
      `}</style>
    </form>
  );
}

