"use client";

import { useState } from "react";

export default function PostFrequencyCalculator() {
  const [members, setMembers] = useState(10000);
  const [contentType, setContentType] = useState<"mixed" | "text" | "media" | "news">("mixed");
  const [goal, setGoal] = useState<"engagement" | "growth" | "monetization">("engagement");

  const getRecommendation = () => {
    const base = contentType === "news" ? 8 : contentType === "media" ? 5 : contentType === "text" ? 4 : 5;
    const goalMultiplier = goal === "growth" ? 1.3 : goal === "monetization" ? 0.8 : 1;
    const sizeMultiplier = members > 50000 ? 0.7 : members > 10000 ? 0.85 : 1;
    return Math.max(2, Math.min(12, Math.round(base * goalMultiplier * sizeMultiplier)));
  };

  const recommended = getRecommendation();
  const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

  const contentTypes = [
    { value: "mixed", label: "ترکیبی" },
    { value: "text", label: "متنی" },
    { value: "media", label: "تصویری/ویدیویی" },
    { value: "news", label: "اخباری" },
  ];

  const goals = [
    { value: "engagement", label: "افزایش تعامل" },
    { value: "growth", label: "رشد سریع" },
    { value: "monetization", label: "درآمدزایی" },
  ];

  return (
    <>
      <div className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">تعداد اعضای کانال</label>
          <input type="number" value={members} onChange={(e) => setMembers(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">نوع محتوا</label>
          <div className="grid grid-cols-2 gap-2">
            {contentTypes.map((type) => (
              <button key={type.value} onClick={() => setContentType(type.value as typeof contentType)} className={`h-10 rounded-xl text-sm font-semibold transition-all ${contentType === type.value ? "bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white shadow-md" : "border border-border/60 bg-surface text-text-secondary hover:bg-surface-elevated"}`}>
                {type.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">هدف شما</label>
          <div className="grid grid-cols-3 gap-2">
            {goals.map((g) => (
              <button key={g.value} onClick={() => setGoal(g.value as typeof goal)} className={`h-10 rounded-xl text-sm font-semibold transition-all ${goal === g.value ? "bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white shadow-md" : "border border-border/60 bg-surface text-text-secondary hover:bg-surface-elevated"}`}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-gradient-to-l from-[#10B981] to-[#059669] p-6 text-center">
        <p className="text-white/80 text-sm mb-2">تعداد پیشنهادی پست در هفته</p>
        <p className="text-4xl font-extrabold text-white">{recommended}</p>
      </div>
      <div className="mt-6 rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
        <h3 className="font-bold text-text-primary mb-4">برنامه پیشنهادی</h3>
        <div className="space-y-3">
          {days.map((day, i) => {
            const shouldPost = i < recommended || (recommended >= 5 && i % 2 === 0);
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-text-tertiary w-20">{day}</span>
                <div className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${shouldPost ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20" : "bg-surface-elevated text-text-tertiary"}`}>
                  {shouldPost ? "پست" : "—"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
