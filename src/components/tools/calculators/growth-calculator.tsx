"use client";

import { useState } from "react";

export default function GrowthCalculator() {
  const [currentMembers, setCurrentMembers] = useState(5000);
  const [monthlyGrowth, setMonthlyGrowth] = useState(10);
  const [months, setMonths] = useState(6);

  const projections = Array.from({ length: months + 1 }, (_, i) => ({
    month: i,
    members: Math.round(currentMembers * Math.pow(1 + monthlyGrowth / 100, i)),
  }));

  const finalMembers = projections[projections.length - 1].members;
  const totalGrowth = finalMembers - currentMembers;
  const growthPercent = currentMembers > 0 ? ((finalMembers / currentMembers - 1) * 100) : 0;

  return (
    <>
      <div className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">تعداد اعضای فعلی</label>
          <input type="number" value={currentMembers} onChange={(e) => setCurrentMembers(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">نرخ رشد ماهانه (%)</label>
          <input type="number" value={monthlyGrowth} onChange={(e) => setMonthlyGrowth(Number(e.target.value))} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">تعداد ماه‌ها</label>
          <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} min={1} max={24} className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40" />
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-gradient-to-l from-[#5B5FEF] to-[#10B981] p-6 text-center">
        <p className="text-white/80 text-sm mb-2">پیش‌بینی رشد</p>
        <p className="text-3xl font-extrabold text-white">
          {new Intl.NumberFormat("fa-IR").format(finalMembers)} عضو
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-white/60 text-xs">افزایش اعضا</p>
            <p className="text-white font-bold">+{new Intl.NumberFormat("fa-IR").format(totalGrowth)}</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-white/60 text-xs">رشد کل</p>
            <p className="text-white font-bold">%{growthPercent.toFixed(0)}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
        <h3 className="font-bold text-text-primary mb-4">نمودار پیش‌بینی رشد</h3>
        <div className="space-y-2">
          {projections.filter((_, i) => i % Math.max(1, Math.floor(months / 6)) === 0 || i === months).map((p) => {
            const maxMembers = finalMembers;
            const width = maxMembers > 0 ? (p.members / maxMembers) * 100 : 0;
            return (
              <div key={p.month} className="flex items-center gap-3">
                <span className="text-xs text-text-tertiary w-12 text-left">{p.month === 0 ? "الان" : `${p.month} ماه`}</span>
                <div className="flex-1 h-6 bg-surface-elevated rounded-lg overflow-hidden">
                  <div className="h-full bg-gradient-to-l from-[#5B5FEF] to-[#10B981] rounded-lg transition-all duration-500" style={{ width: `${width}%` }} />
                </div>
                <span className="text-xs font-bold text-text-primary w-20 text-left">
                  {new Intl.NumberFormat("fa-IR").format(p.members)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
