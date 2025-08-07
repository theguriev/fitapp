import NavUser from "./nav-user";

export default function AppFooter() {
  return (
    <footer className="footer-scroll-blur sticky bottom-0 w-full overflow-x-auto p-2 z-40 bg-background/70 backdrop-blur-[40px] backdrop-saturate-[180%] border-t border-border/30 transition-all duration-300">
      <NavUser />
    </footer>
  );
}
