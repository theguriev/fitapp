import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Target } from "lucide-react";

export default function NutritionCard() {
  // Примерные данные для рациона
  const nutrition = {
    calories: {
      consumed: 1420,
      target: 2000,
    },
    proteins: {
      consumed: 85,
      target: 120,
    },
    carbs: {
      consumed: 165,
      target: 250,
    },
    fats: {
      consumed: 55,
      target: 70,
    },
  };

  const caloriesProgress =
    (nutrition.calories.consumed / nutrition.calories.target) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          Раціон
        </CardTitle>
        <CardAction>
          <ChevronRight className="w-5 h-5 text-orange-600" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Калории */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Калорії</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {nutrition.calories.consumed} / {nutrition.calories.target} ккал
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(caloriesProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Макронутриенты */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Білки</div>
            <div className="text-sm font-semibold text-blue-600">
              {nutrition.proteins.consumed}г
            </div>
            <div className="text-xs text-muted-foreground">
              з {nutrition.proteins.target}г
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Вуглеводи</div>
            <div className="text-sm font-semibold text-green-600">
              {nutrition.carbs.consumed}г
            </div>
            <div className="text-xs text-muted-foreground">
              з {nutrition.carbs.target}г
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Жири</div>
            <div className="text-sm font-semibold text-yellow-600">
              {nutrition.fats.consumed}г
            </div>
            <div className="text-xs text-muted-foreground">
              з {nutrition.fats.target}г
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
