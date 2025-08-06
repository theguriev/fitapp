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
        <CardTitle>Упражнения</CardTitle>
        <CardAction>
          <ChevronRight className="w-5 h-5 text-green-400" />
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* Workout Icon */}
        <div className="mb-2">
          <div className="w-12 h-12 bg-gradient-to-tr from-green-500 to-green-400 rounded-full flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Workout Details */}
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Прогулка на улице</h3>

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
