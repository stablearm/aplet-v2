export function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
