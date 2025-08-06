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

  const getProgressPercentage = (consumed: number, target: number) => {
    return Math.min((consumed / target) * 100, 100);
  };

  const ConcentricCircles = () => {
    const ringSize = 120;
    const strokeWidth = 8;
    const center = ringSize / 2;

    // Calculate ring radii (from outer to inner) - like Apple Activity Rings
    const fatsRadius = center - strokeWidth; // Жиры (внешний)
    const carbsRadius = center - strokeWidth * 3; // Углеводы (средний)
    const proteinsRadius = center - strokeWidth * 5; // Белки (внутренний)

    // Calculate circumferences
    const fatsCircumference = 2 * Math.PI * fatsRadius;
    const carbsCircumference = 2 * Math.PI * carbsRadius;
    const proteinsCircumference = 2 * Math.PI * proteinsRadius;

    // Calculate stroke dash offsets for progress
    const fatsProgress = getProgressPercentage(
      nutrition.fats.consumed,
      nutrition.fats.target
    );
    const carbsProgress = getProgressPercentage(
      nutrition.carbs.consumed,
      nutrition.carbs.target
    );
    const proteinsProgress = getProgressPercentage(
      nutrition.proteins.consumed,
      nutrition.proteins.target
    );

    const fatsOffset =
      fatsCircumference - (fatsProgress / 100) * fatsCircumference;
    const carbsOffset =
      carbsCircumference - (carbsProgress / 100) * carbsCircumference;
    const proteinsOffset =
      proteinsCircumference - (proteinsProgress / 100) * proteinsCircumference;

    return (
      <div className="w-full">
        <div className="relative flex flex-col items-center">
          <div
            className="relative"
            style={{ width: ringSize, height: ringSize }}
          >
            <svg
              width={ringSize}
              height={ringSize}
              className="transform -rotate-90"
            >
              {/* Background circles with opacity */}
              <circle
                cx={center}
                cy={center}
                r={fatsRadius}
                fill="none"
                stroke="rgba(255, 45, 85, 0.2)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              <circle
                cx={center}
                cy={center}
                r={carbsRadius}
                fill="none"
                stroke="rgba(48, 209, 88, 0.2)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              <circle
                cx={center}
                cy={center}
                r={proteinsRadius}
                fill="none"
                stroke="rgba(100, 210, 255, 0.2)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />

              {/* Progress circles */}
              {/* Жиры (внешний круг) - красный/розовый */}
              <circle
                cx={center}
                cy={center}
                r={fatsRadius}
                fill="none"
                stroke="#FF2D55"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={fatsCircumference}
                strokeDashoffset={fatsOffset}
                className="transition-all duration-1000 ease-out"
              />

              {/* Углеводы (средний круг) - зеленый */}
              <circle
                cx={center}
                cy={center}
                r={carbsRadius}
                fill="none"
                stroke="#30D158"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={carbsCircumference}
                strokeDashoffset={carbsOffset}
                className="transition-all duration-1000 ease-out"
              />

              {/* Белки (внутренний круг) - голубой */}
              <circle
                cx={center}
                cy={center}
                r={proteinsRadius}
                fill="none"
                stroke="#64D2FF"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={proteinsCircumference}
                strokeDashoffset={proteinsOffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>
        </div>
        {/* Activity Stats - в стиле Apple */}
        <div className="mt-6 space-y-3 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#64D2FF" }}
              ></div>
              <span className="text-sm text-muted-foreground">Білки</span>
            </div>
            <span className="text-xs">
              {nutrition.proteins.consumed}г / {nutrition.proteins.target}г
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#30D158" }}
              ></div>
              <span className="text-sm text-muted-foreground">Вуглеводи</span>
            </div>
            <span className="text-xs">
              {nutrition.carbs.consumed}г / {nutrition.carbs.target}г
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#FF2D55" }}
              ></div>
              <span className="text-sm text-muted-foreground">Жири</span>
            </div>
            <span className="text-xs">
              {nutrition.fats.consumed}г / {nutrition.fats.target}г
            </span>
          </div>
        </div>
      </div>
    );
  };

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
      <CardContent className="space-y-6">
        {/* Макронутриенты */}
        <div className="flex justify-center">
          <ConcentricCircles />
        </div>
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
      </CardContent>
    </Card>
  );
}
