import type { Metadata } from "next";
import { Package } from "lucide-react";
import { getAllResources } from "@/lib/mdx";
import { ResourcesList } from "@/components/content/resources-list";

export const metadata: Metadata = {
  title: "منابع",
  description: "بهترین ابزارها، منابع و راهنماها برای مدیریت و رشد کسب و کار تلگرامی شما.",
};

export default function ResourcesPage() {
  const allResources = getAllResources();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#5B5FEF]/6 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-gradient-radial from-[#F59E0B]/4 via-[#F59E0B]/1 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/8 px-3.5 py-1.5 mb-6">
            <Package className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">منابع</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-5">
            منابع <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">کاربردی</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            بهترین ابزارها و منابع برای مدیریت و رشد کسب و کار تلگرامی شما.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 max-w-5xl">
        {allResources.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#3B82F6]/10 mb-6">
              <Package className="h-10 w-10 text-[#5B5FEF]" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-text-primary">منابع</h2>
            <p className="text-text-secondary max-w-md text-sm leading-relaxed">
              منابع و ابزارهای تلگرام به زودی منتشر خواهند شد.
            </p>
          </div>
        ) : (
          <ResourcesList allResources={allResources} />
        )}
      </main>
    </>
  );
}
