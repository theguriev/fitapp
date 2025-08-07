import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import CaloriesProgress from "./calories-progress";
import Macronutrients from "./macronutrients";

export default function NutritionCard() {
  // Приблизні дані для раціону
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

  return (
    <Link to="/nutrition" className="block">
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle>Раціон</CardTitle>
          <CardAction>
            <ChevronRight className="w-5 h-5 text-orange-600" />
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Макронутрієнти */}
          <Macronutrients
            proteins={nutrition.proteins}
            carbs={nutrition.carbs}
            fats={nutrition.fats}
          />

          {/* Калорії */}
          <CaloriesProgress
            consumed={nutrition.calories.consumed}
            target={nutrition.calories.target}
          />
        </CardContent>
      </Card>
    </Link>
  );
}
