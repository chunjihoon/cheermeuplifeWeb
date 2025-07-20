// /app/review/new/page.tsx
"use client";
import { useState } from "react";

export default function ReviewForm() {
  const [form, setForm] = useState({ name: "", date: "", count: "", content: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/review-submit", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    });
    alert("리뷰가 전송되었습니다. 승인 후 게시됩니다.");
    setForm({ name: "", date: "", count: "", content: "" });
  };

  return (
    <form className="max-w-xl mx-auto p-6 flex flex-col gap-4 bg-white rounded-xl shadow"
      onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange}
        placeholder="구매자 이름" required className="border px-3 py-2 rounded"/>
      <input name="date" value={form.date} onChange={handleChange}
        placeholder="수업일자 (예: 2024-07-20)" required className="border px-3 py-2 rounded"/>
      <input name="count" value={form.count} onChange={handleChange}
        placeholder="수업 횟수 (예: 3회)" required className="border px-3 py-2 rounded"/>
      <textarea name="content" value={form.content} onChange={handleChange}
        placeholder="리뷰 내용" required className="border px-3 py-2 rounded min-h-[100px]"/>
      <button className="bg-pink-500 text-white py-2 rounded font-bold hover:bg-pink-600">
        리뷰 전송하기
      </button>
    </form>
  );
}
