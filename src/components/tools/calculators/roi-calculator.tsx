"use client";

import { useState } from "react";

export default function RoiCalculator() {
  const [investment, setInvestment] = useState(1000000);
  const [newMembers, setNewMembers] = useState(2000);
  const [conversionRate, setConversionRate] = useState(2);
  const [avgRevenue, setAvgRevenue] = useState(50000);

  const convertedMembers = Math.floor(newMembers * (conversionRate / 100));
  const totalRevenue = convertedMembers * avgRevenue;
  const roi = investment > 0 ? ((totalRevenue - investment) / investment) * 100 : 0;
  const profit = totalRevenue - investment;

  return (
    <>
      <div className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">هزینه تبلیغات (تومان)</label>
          <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">اعضای جذب شده</label>
          <input type="number" value={newMembers} onChange={(e) => setNewMembers(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">نرخ تبدیل به مشتری (%)</label>
          <input type="number" value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">میانگین درآمد از هر مشتری (تومان)</label>
          <input type="number" value={avgRevenue} onChange={(e) => setAvgRevenue(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
      </div>
      <div className={`mt-6 rounded-2xl p-6 text-center ${profit >= 0 ? "bg-gradient-to-l from-[#10B981] to-[#3B82F6]" : "bg-gradient-to-l from-[#EF4444] to-[#F59E0B]"}`}>
        <p className="text-white/80 text-sm mb-2">بازگشت سرمایه (ROI)</p>
        <p className="text-3xl font-extrabold text-white">%{roi.toFixed(0)}</p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-white/60 text-xs">درآمد کل</p>
            <p className="text-white font-bold">{new Intl.NumberFormat("fa-IR").format(totalRevenue)} تومان</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-white/60 text-xs">{profit >= 0 ? "سود خالص" : "زیان"}</p>
            <p className="text-white font-bold">{new Intl.NumberFormat("fa-IR").format(Math.abs(profit))} تومان</p>
          </div>
        </div>
      </div>
    </>
  );
}
