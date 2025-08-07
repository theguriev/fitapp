"use client";

import { useState } from "react";
import { Dumbbell, Timer, Target, TrendingUp, Zap } from "lucide-react";

interface ExerciseRecord {
  id: string;
  type: "strength" | "cardio" | "flexibility" | "sports";
  name: string;
  duration: string;
  date: string;
  sets?: number;
  reps?: number;
  weight?: number;
  calories?: number;
}

interface DailyExercises {
  date: string;
  records: ExerciseRecord[];
  totalDuration: number;
  totalCalories: number;
}

export default function ExerciseList() {
  const [activeFilter, setActiveFilter] = useState("Всі");

  const filters = ["Всі", "Силові", "Кардіо", "Розтяжка", "Спорт"];

  const exerciseData: DailyExercises[] = [
    {
      date: "Сьогодні",
      totalDuration: 85,
      totalCalories: 420,
      records: [
        {
          id: "1",
          type: "strength",
          name: "Присідання зі штангою",
          duration: "25 хв",
          date: "09:00",
          sets: 4,
          reps: 12,
          weight: 80,
          calories: 180,
        },
        {
          id: "2",
          type: "strength",
          name: "Жим лежачи",
          duration: "20 хв",
          date: "09:30",
          sets: 3,
          reps: 10,
          weight: 70,
          calories: 140,
        },
        {
          id: "3",
          type: "cardio",
          name: "Біг на доріжці",
          duration: "30 хв",
          date: "10:00",
          calories: 350,
        },
        {
          id: "4",
          type: "flexibility",
          name: "Розтяжка",
          duration: "10 хв",
          date: "10:35",
          calories: 25,
        },
      ],
    },
    {
      date: "Вчора",
      totalDuration: 60,
      totalCalories: 320,
      records: [
        {
          id: "5",
          type: "strength",
          name: "Станова тяга",
          duration: "30 хв",
          date: "18:00",
          sets: 5,
          reps: 8,
          weight: 100,
          calories: 220,
        },
        {
          id: "6",
          type: "cardio",
          name: "Велотренажер",
          duration: "25 хв",
          date: "18:35",
          calories: 180,
        },
        {
          id: "7",
          type: "flexibility",
          name: "Йога",
          duration: "15 хв",
          date: "19:05",
          calories: 40,
        },
      ],
    },
    {
      date: "2 дні тому",
      totalDuration: 45,
      totalCalories: 280,
      records: [
        {
          id: "8",
          type: "sports",
          name: "Футбол",
          duration: "45 хв",
          date: "17:00",
          calories: 380,
        },
      ],
    },
    {
      date: "3 дні тому",
      totalDuration: 70,
      totalCalories: 380,
      records: [
        {
          id: "9",
          type: "strength",
          name: "Підтягування",
          duration: "15 хв",
          date: "08:00",
          sets: 4,
          reps: 8,
          calories: 120,
        },
        {
          id: "10",
          type: "strength",
          name: "Віджимання",
          duration: "15 хв",
          date: "08:20",
          sets: 3,
          reps: 15,
          calories: 80,
        },
        {
          id: "11",
          type: "cardio",
          name: "Плавання",
          duration: "40 хв",
          date: "19:00",
          calories: 420,
        },
      ],
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "strength":
        return <Dumbbell className="w-5 h-5 text-white" />;
      case "cardio":
        return <Zap className="w-5 h-5 text-white" />;
      case "flexibility":
        return <Target className="w-5 h-5 text-white" />;
      case "sports":
        return <Timer className="w-5 h-5 text-white" />;
      default:
        return <Dumbbell className="w-5 h-5 text-white" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "strength":
        return "bg-red-600";
      case "cardio":
        return "bg-blue-600";
      case "flexibility":
        return "bg-green-600";
      case "sports":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "strength":
        return "Силові";
      case "cardio":
        return "Кардіо";
      case "flexibility":
        return "Розтяжка";
      case "sports":
        return "Спорт";
      default:
        return "Тренування";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="px-4">
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-red-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Records */}
      <div className="px-4 space-y-6">
        {exerciseData.map((dayData) => (
          <div key={dayData.date}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                {dayData.date}
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {dayData.totalDuration} хв
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-muted-foreground">
                    {dayData.totalCalories} ккал
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {dayData.records.map((record) => (
                <div
                  key={record.id}
                  className="bg-card rounded-xl p-4 border border-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 ${getIconBg(
                          record.type
                        )} rounded-full flex items-center justify-center`}
                      >
                        {getIcon(record.type)}
                      </div>
                      <div>
                        <p className="text-foreground font-medium">
                          {record.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getTypeName(record.type)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-semibold">
                        {record.duration}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {record.date}
                      </p>
                    </div>
                  </div>

                  {/* Детали упражнения */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {record.sets && record.reps && record.weight && (
                        <>
                          <span>
                            Підходи:{" "}
                            <span className="font-medium text-red-600">
                              {record.sets}
                            </span>
                          </span>
                          <span>
                            Повтори:{" "}
                            <span className="font-medium text-blue-600">
                              {record.reps}
                            </span>
                          </span>
                          <span>
                            Вага:{" "}
                            <span className="font-medium text-purple-600">
                              {record.weight}кг
                            </span>
                          </span>
                        </>
                      )}
                      {record.calories && (
                        <span className="ml-auto">
                          Калорії:{" "}
                          <span className="font-medium text-orange-600">
                            {record.calories}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
