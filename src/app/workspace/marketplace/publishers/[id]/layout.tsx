export function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default function PublisherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
