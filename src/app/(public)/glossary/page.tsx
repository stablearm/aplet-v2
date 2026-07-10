import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getAllGlossaryTerms } from "@/lib/mdx";
import { GlossaryList } from "@/components/content/glossary-list";

export const metadata: Metadata = {
  title: "واژه‌نامه تلگرام",
  description: "فرهنگ لغت جامع اصطلاحات تلگرام: تبلیغات، بازاریابی، کانال، بات، عضوگیری و تمام مفاهیم مورد نیاز برای کسب و کار در تلگرام.",
};

export default function GlossaryPage() {
  const allTerms = getAllGlossaryTerms();
  const allLetters = [...new Set(allTerms.map((t) => t.term[0]))].sort();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#5B5FEF]/6 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-gradient-radial from-[#3B82F6]/4 via-[#3B82F6]/1 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/8 px-3.5 py-1.5 mb-6">
            <BookOpen className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">واژه‌نامه</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-5">
            فرهنگ لغت <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">تلگرام</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            تمام اصطلاحات تخصصی تلگرام و کسب و کار آنلاین را اینجا پیدا کنید.
          </p>

          <div className="flex items-center justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-text-primary">{allTerms.length}</div>
              <div className="text-xs text-text-tertiary">واژه</div>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div className="text-center">
              <div className="text-2xl font-extrabold text-text-primary">{allLetters.length}</div>
              <div className="text-xs text-text-tertiary">حرف</div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {allTerms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#3B82F6]/10 mb-6">
              <BookOpen className="h-10 w-10 text-[#5B5FEF]" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-text-primary">واژه‌نامه</h2>
            <p className="text-text-secondary max-w-md text-sm leading-relaxed">
              واژه‌نامه تلگرام به زودی منتشر خواهد شد.
            </p>
          </div>
        ) : (
          <GlossaryList allTerms={allTerms} />
        )}
      </main>
    </>
  );
}
