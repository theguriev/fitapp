import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Ruler } from "lucide-react";
import MeasurementsRings from "./measurements-rings";
import MeasurementsStats from "./measurements-stats";

export default function MeasurementsCard() {
  // Примерные данные замеров (в см)
  const measurementsData = {
    arm: {
      current: 32.5,
      target: 35.0,
      name: "Обхват плеча"
    },
    chest: {
      current: 98.2,
      target: 102.0,
      name: "Обхват грудей"
    },
    waist: {
      current: 85.1,
      target: 80.0,
      name: "Обхват талії"
    },
    thigh: {
      current: 58.3,
      target: 60.0,
      name: "Обхват стегна"
    },
    hips: {
      current: 92.7,
      target: 95.0,
      name: "Обхват стегон"
    },
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Ruler className="h-5 w-5 text-purple-600" />
          Заміри
        </CardTitle>
        <CardAction>
          <ChevronRight className="w-5 h-5 text-purple-600" />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Круги замеров */}
        <div className="flex justify-center">
          <MeasurementsRings measurements={measurementsData} />
        </div>
        
        {/* Статистика замеров */}
        <MeasurementsStats measurements={measurementsData} />
      </CardContent>
    </Card>
  );
}
