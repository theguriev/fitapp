import { ChevronRight, Dumbbell } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WorkoutSessionCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Вправи</CardTitle>
        <CardAction>
          <ChevronRight className="w-5 h-5 text-green-400" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Workout Icon */}
        <div>
          <div className="size-12 bg-gradient-to-tr from-green-500 to-green-400 rounded-full flex items-center justify-center">
            <Dumbbell className="size-6 text-white" />
          </div>
        </div>

        {/* Workout Details */}
        <div>
          <h3 className="text-xl font-medium">Прогулянка на вулиці</h3>

          <div className="text-4xl font-light text-green-400 tabular-nums">
            11,53<span className="text-2xl">KM</span>
          </div>
        </div>

        {/* Date */}
        <div className="mt-2 pt-4">
          <p className="text-sm text-gray-500">15.09.2024</p>
        </div>
      </CardContent>
    </Card>
  );
}
