import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuides, compileMDXContent, estimateReadingTime } from "@/lib/mdx";
import { generateArticleMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/json-ld";
import { PillarLayout } from "@/components/content/pillar-layout";

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return generateArticleMetadata({
    title: guide.meta.title,
    description: guide.meta.description,
    path: `/guides/${guide.meta.slug}/`,
    author: "آپلت",
    publishedAt: "2026-07-01",
    tags: guide.meta.tags,
  });
}

const chapterMap: Record<string, Array<{ id: string; title: string }>> = {
  "complete-telegram-marketing": [
    { id: "فصل-اول-مبانی-بازاریابی-در-تلگرام", title: "مبانی بازاریابی در تلگرام" },
    { id: "فصل-دوم-شناخت-مخاطبان-هدف", title: "شناخت مخاطبان هدف" },
    { id: "فصل-سوم-استراتژی-محتوا", title: "استراتژی محتوا" },
    { id: "فصل-چهارم-جذب-مخاطب", title: "جذب مخاطب" },
    { id: "فصل-پنجم-تعامل-با-مخاطبان", title: "تعامل با مخاطبان" },
    { id: "فصل-ششم-تحلیل-و-بهینه‌سازی", title: "تحلیل و بهینه‌سازی" },
  ],
  "complete-telegram-advertising": [
    { id: "فصل-اول-مبانی-تبلیغات-در-تلگرام", title: "مبانی تبلیغات در تلگرام" },
    { id: "فصل-دوم-انتخاب-کانال-مناسب-برای-تبلیغات", title: "انتخاب کانال مناسب" },
    { id: "فصل-سوم-طراحی-کمپین-تبلیغاتی", title: "طراحی کمپین تبلیغاتی" },
    { id: "فصل-چهارم-اجرای-کمپین", title: "اجرای کمپین" },
    { id: "فصل-پنجم-تحلیل-و-بهینه‌سازی", title: "تحلیل و بهینه‌سازی" },
    { id: "فصل-ششم-اشتباهات-رایج-در-تبلیغات-تلگرام", title: "اشتباهات رایج" },
  ],
  "complete-telegram-monetization": [
    { id: "فصل-اول-مبانی-درآمدزایی-از-تلگرام", title: "مبانی درآمدزایی از تلگرام" },
    { id: "فصل-دوم-روش‌های-کسب-درآمد-از-تلگرام", title: "روش‌های کسب درآمد" },
    { id: "فصل-سوم-محاسبه-درآمد-بالقوه", title: "محاسبه درآمد بالقوه" },
    { id: "فصل-چهارم-استراتژی‌های-پیشرفته-درآمدزایی", title: "استراتژی‌های پیشرفته" },
    { id: "فصل-پنجم-ابزارهای-مدیریت-درآمد", title: "ابزارهای مدیریت درآمد" },
    { id: "فصل-ششم-نکات-حقوقی-و-مالی", title: "نکات حقوقی و مالی" },
  ],
  "complete-telegram-growth": [
    { id: "فصل-اول-مبانی-رشد-کانال-تلگرام", title: "مبانی رشد کانال" },
    { id: "فصل-دوم-روش‌های-ارگانیک-رشد", title: "روش‌های ارگانیک رشد" },
    { id: "فصل-سوم-روش‌های-پولی-رشد", title: "روش‌های پولی رشد" },
    { id: "فصل-چهارم-افزایش-تعامل", title: "افزایش تعامل" },
    { id: "فصل-پنجم-تحلیل-و-بهینه‌سازی-رشد", title: "تحلیل و بهینه‌سازی رشد" },
    { id: "فصل-ششم-اشتباهات-رایج-در-رشد-کانال", title: "اشتباهات رایج" },
  ],
  "complete-telegram-bot": [
    { id: "فصل-اول-مبانی-بات‌های-تلگرام", title: "مبانی بات‌های تلگرام" },
    { id: "فصل-دوم-مزایای-استفاده-از-بات-تلگرام", title: "مزایای بات تلگرام" },
    { id: "فصل-سوم-بات‌های-محتوا", title: "بات‌های محتوا" },
    { id: "فصل-چهارم-بات‌های-پشتیبانی", title: "بات‌های پشتیبانی" },
    { id: "فصل-پنجم-مدیریت-بات‌ها", title: "مدیریت بات‌ها" },
    { id: "فصل-ششم-اشتباهات-رایج-در-استفاده-از-بات", title: "اشتباهات رایج" },
  ],
  "complete-telegram-business": [
    { id: "فصل-اول-مبانی-کسب-و-کار-در-تلگرام", title: "مبانی کسب و کار در تلگرام" },
    { id: "فصل-دوم-مدل‌های-کسب-و-کار-در-تلگرام", title: "مدل‌های کسب و کار" },
    { id: "فصل-سوم-راه‌اندازی-کسب-و-کار", title: "راه‌اندازی کسب و کار" },
    { id: "فصل-چهارم-مدیریت-حرفه‌ای", title: "مدیریت حرفه‌ای" },
    { id: "فصل-پنجم-رشد-و-توسعه", title: "رشد و توسعه" },
    { id: "فصل-ششم-چالش‌ها-و-راه‌حل‌ها", title: "چالش‌ها و راه‌حل‌ها" },
  ],
};

const clusterArticlesMap: Record<string, Array<{ title: string; href: string; description: string }>> = {
  "complete-telegram-marketing": [
    { title: "بازاریابی تلگرام", href: "/telegram-marketing/", description: "راهنمای بازاریابی در تلگرام" },
    { title: "تبلیغات تلگرام", href: "/telegram-ads/", description: "راهنمای تبلیغات در تلگرام" },
    { title: "رشد تلگرام", href: "/telegram-growth/", description: "روش‌های رشد کانال" },
    { title: "تحلیل تلگرام", href: "/telegram-analytics/", description: "ابزارهای تحلیل" },
  ],
  "complete-telegram-advertising": [
    { title: "تبلیغات تلگرام", href: "/telegram-ads/", description: "راهنمای تبلیغات" },
    { title: "افزایش عضو", href: "/telegram-member-service/", description: "جذب اعضای واقعی" },
    { title: "ابزار CPM", href: "/tools/cpm-calculator/", description: "محاسبه هزینه تبلیغات" },
  ],
  "complete-telegram-monetization": [
    { title: "کسب درآمد از تلگرام", href: "/telegram-monetization/", description: "روش‌های درآمدزایی" },
    { title: "محاسبه درآمد", href: "/tools/income-calculator/", description: "محاسبه درآمد بالقوه" },
    { title: "محاسبه ROI", href: "/tools/roi-calculator/", description: "بازگشت سرمایه" },
  ],
  "complete-telegram-growth": [
    { title: "رشد تلگرام", href: "/telegram-growth/", description: "روش‌های رشد" },
    { title: "افزایش عضو", href: "/telegram-member-service/", description: "جذب اعضای واقعی" },
    { title: "محاسبه رشد", href: "/tools/growth-calculator/", description: "پیش‌بینی رشد" },
  ],
  "complete-telegram-bot": [
    { title: "بات تلگرام", href: "/telegram-bot/", description: "راهنمای بات‌ها" },
    { title: "اتوماسیون", href: "/telegram-automation/", description: "خودکارسازی" },
  ],
  "complete-telegram-business": [
    { title: "کسب و کار تلگرام", href: "/telegram-business-os/", description: "سیستم عامل کسب و کار" },
    { title: "مدیریت کانال", href: "/telegram-channel/", description: "مدیریت حرفه‌ای" },
  ],
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { content: compiledContent } = await compileMDXContent(guide.content);
  const chapters = chapterMap[slug] || [];
  const clusterArticles = clusterArticlesMap[slug] || [];

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: guide.meta.title,
          description: guide.meta.description,
          path: `/guides/${guide.meta.slug}/`,
          author: "آپلت",
          publishedAt: "2026-07-01",
        })}
      />
      <PillarLayout
        title={guide.meta.title}
        description={guide.meta.description}
        author="آپلت"
        publishedAt="2026-07-01"
        readingTime={estimateReadingTime(guide.content)}
        tags={guide.meta.tags}
        breadcrumbs={[
          { label: "راهنماها", href: "/guides" },
          { label: guide.meta.title, href: `/guides/${guide.meta.slug}/` },
        ]}
        chapters={chapters}
        clusterArticles={clusterArticles}
      >
        {compiledContent}
      </PillarLayout>
    </>
  );
}
