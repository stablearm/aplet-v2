"use client";

import { useState } from "react";

export default function CpmCalculator() {
  const [cost, setCost] = useState(500000);
  const [views, setViews] = useState(10000);
  const cpm = views > 0 ? (cost / views) * 1000 : 0;

  return (
    <>
      <div className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">هزینه تبلیغات (تومان)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">تعداد بازدید</label>
          <input
            type="number"
            value={views}
            onChange={(e) => setViews(Number(e.target.value))}
            className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40"
          />
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-gradient-to-l from-[#3B82F6] to-[#5B5FEF] p-6 text-center">
        <p className="text-white/80 text-sm mb-2">CPM (هزینه هر ۱۰۰۰ بازدید)</p>
        <p className="text-3xl font-extrabold text-white">
          {new Intl.NumberFormat("fa-IR").format(Math.round(cpm))} تومان
        </p>
      </div>
    </>
  );
}
