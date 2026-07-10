"use client";

import { useState } from "react";

export default function EngagementCalculator() {
  const [members, setMembers] = useState(10000);
  const [avgViews, setAvgViews] = useState(3000);
  const [avgLikes, setAvgLikes] = useState(150);
  const [avgComments, setAvgComments] = useState(30);

  const viewRate = members > 0 ? (avgViews / members) * 100 : 0;
  const engagementRate = members > 0 ? ((avgLikes + avgComments) / members) * 100 : 0;

  const getEngagementLabel = (rate: number) => {
    if (rate >= 15) return { text: "عالی", color: "text-[#10B981]" };
    if (rate >= 10) return { text: "خوب", color: "text-[#3B82F6]" };
    if (rate >= 5) return { text: "متوسط", color: "text-[#F59E0B]" };
    return { text: "ضعیف", color: "text-[#EF4444]" };
  };

  const engagement = getEngagementLabel(engagementRate);

  return (
    <>
      <div className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">تعداد اعضای کانال</label>
          <input type="number" value={members} onChange={(e) => setMembers(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">میانگین بازدید هر پست</label>
          <input type="number" value={avgViews} onChange={(e) => setAvgViews(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">میانگین لایک هر پست</label>
          <input type="number" value={avgLikes} onChange={(e) => setAvgLikes(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">میانگین کامنت هر پست</label>
          <input type="number" value={avgComments} onChange={(e) => setAvgComments(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-gradient-to-l from-[#10B981] to-[#3B82F6] p-6 text-center">
        <p className="text-white/80 text-sm mb-2">نرخ تعامل</p>
        <p className="text-3xl font-extrabold text-white">
          {engagementRate.toFixed(1)}%
          <span className={`text-lg mr-2 ${engagement.color}`}>{engagement.text}</span>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-white/60 text-xs">نرخ بازدید</p>
            <p className="text-white font-bold">{viewRate.toFixed(1)}%</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-white/60 text-xs">نرخ لایک</p>
            <p className="text-white font-bold">{members > 0 ? ((avgLikes / members) * 100).toFixed(1) : 0}%</p>
          </div>
        </div>
      </div>
    </>
  );
}
