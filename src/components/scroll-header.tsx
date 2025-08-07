interface ScrollHeaderProps {
  onHeaderClick: () => void;
}

export default function ScrollHeader({ onHeaderClick }: ScrollHeaderProps) {
  return (
    <header
      className="header-on-scroll fixed top-0 left-0 right-0 flex items-center justify-center bg-background/70 backdrop-blur-[40px] backdrop-saturate-[180%] border-b border-border/30 transition-all duration-300 p-4 z-50 cursor-pointer hover:bg-background/80 active:scale-95"
      onClick={onHeaderClick}
    >
      <h2 className="font-semibold">Головна</h2>
    </header>
  );
}
