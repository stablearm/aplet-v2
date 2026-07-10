export function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
