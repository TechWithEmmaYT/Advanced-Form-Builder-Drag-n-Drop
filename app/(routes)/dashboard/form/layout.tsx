import BuilderContextProvider from "@/context/builder-provider";
import SideMenu from "../_components/_common/SideMenu";

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BuilderContextProvider>
      <div className="flex h-[calc(100vh_-_65px)] w-full flex-row">
        <div className="hidden md:flex relative w-[45px]">
          <SideMenu />
        </div>
        <main className="w-full flex-1 ">{children}</main>
      </div>
    </BuilderContextProvider>
  );
}
