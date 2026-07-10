import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getAllGuides } from "@/lib/mdx";
import { GuidesList } from "@/components/content/guides-list";

export const metadata: Metadata = {
  title: "راهنماها",
  description: "راهنمای جامع مدیریت، رشد و درآمدزایی از کسب و کار تلگرامی. از مبتدی تا حرفه‌ای.",
};

export default function GuidesPage() {
  const allGuides = getAllGuides();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#5B5FEF]/6 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-gradient-radial from-[#10B981]/4 via-[#10B981]/1 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/8 px-3.5 py-1.5 mb-6">
            <BookOpen className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">راهنماها</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-5">
            راهنماهای <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">جامع</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            راهنمای جامع مدیریت، رشد و درآمدزایی از کسب و کار تلگرامی. از مبتدی تا حرفه‌ای.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 max-w-5xl">
        {allGuides.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#3B82F6]/10 mb-6">
              <BookOpen className="h-10 w-10 text-[#5B5FEF]" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-text-primary">راهنماها</h2>
            <p className="text-text-secondary max-w-md text-sm leading-relaxed">
              راهنماهای جامع تلگرام به زودی منتشر خواهند شد.
            </p>
          </div>
        ) : (
          <GuidesList allGuides={allGuides} />
        )}
      </main>
    </>
  );
}
