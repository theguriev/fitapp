import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import NutritionList from "./components/nutrition-list";

export default function NutritionPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f5] flex flex-col">
      {/* Header with back navigation */}
      <div className="bg-background border-border p-2">
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Головна</h1>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-2xl font-bold mb-1">Раціон</h2>
        <p className="text-sm text-muted-foreground">
          Відстежуйте харчування та калорії
        </p>
      </div>

      {/* Content - список раціону */}
      <div className="flex-1 overflow-y-auto">
        <NutritionList />
      </div>

      {/* Кнопка в самом низу страницы */}
      <div className="p-4 mt-auto">
        <Button
          className="w-full"
          onClick={() => {
            // В реальном приложении здесь будет логика добавления данных
            console.log("Открыть форму добавления рациона");
          }}
        >
          Додати прийом їжі
        </Button>
      </div>
    </div>
  );
}
