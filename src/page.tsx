import type { ReactNode } from "react";
import AppFooter from "./components/app-footer";
import MainContent from "./components/main-content";
import MainHeader from "./components/main-header";
import ScrollHeader from "./components/scroll-header";
import { scrollToTop } from "./lib/scroll";

export default function Home({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <ScrollHeader onHeaderClick={scrollToTop} />
      <MainContent />
      {children}
      <AppFooter />
    </div>
  );
}
