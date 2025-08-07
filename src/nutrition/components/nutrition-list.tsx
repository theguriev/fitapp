"use client";

import { useState } from "react";
import {
  Apple,
  Coffee,
  Utensils,
  Pizza,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface NutritionRecord {
  id: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  title: string;
  calories: string;
  date: string;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface DailyNutrition {
  date: string;
  records: NutritionRecord[];
  totalCalories: number;
  targetCalories: number;
}

export default function NutritionList() {
  const [activeFilter, setActiveFilter] = useState("Всі");

  const filters = ["Всі", "Сніданок", "Обід", "Вечеря", "Перекуси"];

  const nutritionData: DailyNutrition[] = [
    {
      date: "Сьогодні",
      totalCalories: 1850,
      targetCalories: 2200,
      records: [
        {
          id: "1",
          type: "breakfast",
          title: "Вівсянка з фруктами",
          calories: "380 ккал",
          date: "08:30",
          protein: 12,
          carbs: 65,
          fat: 8,
        },
        {
          id: "2",
          type: "lunch",
          title: "Курячий салат",
          calories: "520 ккал",
          date: "13:15",
          protein: 35,
          carbs: 25,
          fat: 28,
        },
        {
          id: "3",
          type: "snack",
          title: "Протеїновий коктейль",
          calories: "280 ккал",
          date: "16:00",
          protein: 25,
          carbs: 15,
          fat: 12,
        },
        {
          id: "4",
          type: "dinner",
          title: "Риба з овочами",
          calories: "670 ккал",
          date: "19:45",
          protein: 40,
          carbs: 45,
          fat: 32,
        },
      ],
    },
    {
      date: "Вчора",
      totalCalories: 2150,
      targetCalories: 2200,
      records: [
        {
          id: "5",
          type: "breakfast",
          title: "Омлет з овочами",
          calories: "420 ккал",
          date: "08:00",
          protein: 22,
          carbs: 12,
          fat: 28,
        },
        {
          id: "6",
          type: "lunch",
          title: "Паста з креветками",
          calories: "680 ккал",
          date: "12:30",
          protein: 28,
          carbs: 75,
          fat: 22,
        },
        {
          id: "7",
          type: "snack",
          title: "Горіхи та йогурт",
          calories: "320 ккал",
          date: "15:30",
          protein: 15,
          carbs: 20,
          fat: 18,
        },
        {
          id: "8",
          type: "dinner",
          title: "Стейк з картоплею",
          calories: "730 ккал",
          date: "20:00",
          protein: 45,
          carbs: 50,
          fat: 35,
        },
      ],
    },
    {
      date: "2 дні тому",
      totalCalories: 1980,
      targetCalories: 2200,
      records: [
        {
          id: "9",
          type: "breakfast",
          title: "Сирники з медом",
          calories: "450 ккал",
          date: "09:00",
          protein: 18,
          carbs: 55,
          fat: 15,
        },
        {
          id: "10",
          type: "lunch",
          title: "Суп з курячими фрикадельками",
          calories: "380 ккал",
          date: "13:00",
          protein: 25,
          carbs: 30,
          fat: 18,
        },
      ],
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "breakfast":
        return <Coffee className="w-5 h-5 text-white" />;
      case "lunch":
        return <Utensils className="w-5 h-5 text-white" />;
      case "dinner":
        return <Pizza className="w-5 h-5 text-white" />;
      case "snack":
        return <Apple className="w-5 h-5 text-white" />;
      default:
        return <Utensils className="w-5 h-5 text-white" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "breakfast":
        return "bg-orange-500";
      case "lunch":
        return "bg-blue-600";
      case "dinner":
        return "bg-purple-600";
      case "snack":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const getMealName = (type: string) => {
    switch (type) {
      case "breakfast":
        return "Сніданок";
      case "lunch":
        return "Обід";
      case "dinner":
        return "Вечеря";
      case "snack":
        return "Перекус";
      default:
        return "Прийом їжі";
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
                  ? "bg-green-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Nutrition Records */}
      <div className="px-4 space-y-6">
        {nutritionData.map((dayData) => (
          <div key={dayData.date}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                {dayData.date}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {dayData.totalCalories} / {dayData.targetCalories} ккал
                </span>
                {dayData.totalCalories < dayData.targetCalories ? (
                  <TrendingDown className="w-4 h-4 text-orange-500" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                )}
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
                          {record.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getMealName(record.type)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-semibold">
                        {record.calories}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {record.date}
                      </p>
                    </div>
                  </div>

                  {/* Макронутриенты */}
                  {record.protein && record.carbs && record.fat && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          Білки:{" "}
                          <span className="font-medium text-blue-600">
                            {record.protein}г
                          </span>
                        </span>
                        <span>
                          Вуглеводи:{" "}
                          <span className="font-medium text-orange-600">
                            {record.carbs}г
                          </span>
                        </span>
                        <span>
                          Жири:{" "}
                          <span className="font-medium text-purple-600">
                            {record.fat}г
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
