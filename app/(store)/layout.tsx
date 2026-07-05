import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <SanityLive />
    </>
  );
}
