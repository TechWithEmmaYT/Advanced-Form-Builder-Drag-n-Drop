export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen bg-[#E3EDFD]">
      <div className="pt-3">{children}</div>
    </main>
  );
}
