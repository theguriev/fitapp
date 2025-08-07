import ExerciseCard from "./exercise-card";
import MeasurementsCard from "./measurements-card";
import NutritionCard from "./nutrition-card";
import { StepsCard } from "./steps-card";
import WeightCard from "./weight-card";

export default function MainContent() {
  return (
    <main className="flex-1 overflow-auto p-4">
      <div className="max-w-md mx-auto space-y-4">
        <StepsCard />
        <WeightCard />
        <MeasurementsCard />
        <NutritionCard />
        <ExerciseCard />
      </div>
    </main>
  );
}
