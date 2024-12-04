import { defaultBackgroundColor } from "@/constant";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="w-full min-h-screen "
      style={{
        backgroundColor: defaultBackgroundColor,
      }}
    >
      {children}
    </main>
  );
}
