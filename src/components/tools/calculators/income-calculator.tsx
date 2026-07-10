"use client";

import { useState } from "react";

export default function IncomeCalculator() {
  const [members, setMembers] = useState(10000);
  const [adPosts, setAdPosts] = useState(4);
  const [adPrice, setAdPrice] = useState(200);

  const monthlyAdIncome = adPosts * 4 * adPrice * (members / 1000);
  const campaignIncome = Math.floor(members * 0.01) * 400;
  const totalIncome = monthlyAdIncome + campaignIncome;

  return (
    <>
      <div className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">تعداد اعضای کانال</label>
          <input
            type="number"
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
            className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">پست تبلیغاتی در هفته</label>
          <input
            type="number"
            value={adPosts}
            onChange={(e) => setAdPosts(Number(e.target.value))}
            className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">قیمت هر پست (تومان به ازای هر ۱۰۰۰ عضو)</label>
          <input
            type="number"
            value={adPrice}
            onChange={(e) => setAdPrice(Number(e.target.value))}
            className="w-full h-10 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-[#5B5FEF]/40"
          />
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] p-6 text-center">
        <p className="text-white/80 text-sm mb-2">درآمد ماهانه تخمینی</p>
        <p className="text-3xl font-extrabold text-white">
          {new Intl.NumberFormat("fa-IR").format(Math.round(totalIncome))} تومان
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-white/60 text-xs">درآمد تبلیغات</p>
            <p className="text-white font-bold">{new Intl.NumberFormat("fa-IR").format(Math.round(monthlyAdIncome))} تومان</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-white/60 text-xs">درآمد کمپین</p>
            <p className="text-white font-bold">{new Intl.NumberFormat("fa-IR").format(campaignIncome)} تومان</p>
          </div>
        </div>
      </div>
    </>
  );
}
