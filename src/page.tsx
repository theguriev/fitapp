import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import type { ReactNode } from "react";
import { Link } from "react-router";
import ExerciseCard from "./components/exercise-card";
import MeasurementsCard from "./components/measurements-card";
import NavUser from "./components/nav-user";
import NutritionCard from "./components/nutrition-card";
import { StepsCard } from "./components/steps-card";
import WeightCard from "./components/weight-card";

export default function Home({ children }: { children?: ReactNode }) {
  const today = new Date();
  const formattedDate = format(today, "EEEE, d MMM", { locale: enUS });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Основной хедер */}
      <header className="main-header sticky top-0 gap-2 flex shrink-0 items-center justify-between bg-background p-4 z-40">
        <div className="flex w-full flex-col">
          <div className="text-xs text-muted-foreground font-medium uppercase">
            {formattedDate}
          </div>
          <h1 className="text-xl w-full truncate font-semibold">Головна</h1>
        </div>
        <div className="flex flex-1 items-center">
          <Link to="/settings">
            <Avatar className="h-8 w-8 rounded-full cursor-pointer">
              <AvatarImage
                src="https://t.me/i/userpic/320/RzvNak5c9L4Q7SgN8kNw-NHzli47jbL76HLk8rP3y8o.svg"
                alt="eugen"
              />
              <AvatarFallback className="rounded-lg">
                {"eugen".substring(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>
      {/* Хедер при скролле */}
      <header 
        className="header-on-scroll sticky top-0 flex items-center justify-center bg-background/70 backdrop-blur-[40px] backdrop-saturate-[180%] border-b border-border/30 transition-all duration-300 p-4 z-50 cursor-pointer hover:bg-background/80 active:scale-95"
        onClick={scrollToTop}
      >
        <h2 className="font-semibold">Головна</h2>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-md mx-auto space-y-4">
          <StepsCard />
          <WeightCard />
          <MeasurementsCard />
          <NutritionCard />
          <ExerciseCard />
        </div>
        {children}
      </main>{" "}
      <footer className="footer-scroll-blur sticky bottom-0 w-full overflow-x-auto p-2 z-40 bg-background/70 backdrop-blur-[40px] backdrop-saturate-[180%] border-t border-border/30 transition-all duration-300">
        <NavUser />
      </footer>
    </div>
  );
}
