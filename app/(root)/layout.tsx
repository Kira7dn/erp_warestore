import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <section className="flex-1 flex h-full flex-col">
        <Navbar />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
}
