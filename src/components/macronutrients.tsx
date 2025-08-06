import ActivityRings from "./activity-rings";
import MacroStats from "./macro-stats";

interface MacronutrientsProps {
  proteins: { consumed: number; target: number };
  carbs: { consumed: number; target: number };
  fats: { consumed: number; target: number };
}

export default function Macronutrients({
  proteins,
  carbs,
  fats,
}: MacronutrientsProps) {
  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <ActivityRings proteins={proteins} carbs={carbs} fats={fats} />
      </div>
      <MacroStats proteins={proteins} carbs={carbs} fats={fats} />
    </div>
  );
}
