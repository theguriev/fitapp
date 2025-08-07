import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Link } from "react-router";
import { useLocale } from "@/hooks/use-locale";

export default function MainHeader() {
  const today = new Date();
  const locale = useLocale();
  const formattedDate = format(today, "EEEE, d MMM", { locale });

  return (
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
  );
}
