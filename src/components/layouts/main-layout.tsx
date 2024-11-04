import { TitleBar } from "../title-bar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <TitleBar />
      <div className="h-screen pt-8 overflow-auto">
        {children}
      </div>
    </>
  );
}