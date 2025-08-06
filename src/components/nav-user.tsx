import {
  Dumbbell,
  Footprints,
  LayoutDashboard,
  Ruler,
  Utensils,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "react-router";

const navItems = [
  {
    title: "Головна",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Раціон",
    url: "/nutrition",
    icon: Utensils,
  },
  {
    title: "Вправи",
    url: "/exercise",
    icon: Dumbbell,
  },
  {
    title: "Кроки",
    url: "/steps",
    icon: Footprints,
  },
  {
    title: "Заміри",
    url: "/measurements",
    icon: Ruler,
  },
];

const NavUser = () => {
  const currentPath = window.location.pathname;

  return (
    <div className="flex justify-around items-center w-full">
      {navItems.map((item) => (
        <Link
          key={item.url}
          to={item.url}
          className={cn(
            "flex flex-col items-center p-2 rounded-md transition-colors",
            currentPath === item.url
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-xs mt-1">{item.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavUser;
