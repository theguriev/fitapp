"use client";

import { useState } from "react";
import { Ruler, Target, TrendingUp, TrendingDown } from "lucide-react";

interface MeasurementRecord {
  id: string;
  type: "arm" | "chest" | "waist" | "thigh" | "hips";
  title: string;
  value: string;
  date: string;
  change?: number; // изменение в см
}

interface MonthlyMeasurements {
  month: string;
  records: MeasurementRecord[];
}

export default function MeasurementsList() {
  const [activeFilter, setActiveFilter] = useState("Всі");

  const filters = ["Всі", "Руки", "Торс", "Ноги"];

  const measurementData: MonthlyMeasurements[] = [
    {
      month: "Грудень 2024",
      records: [
        {
          id: "1",
          type: "chest",
          title: "Обхват грудей",
          value: "98,2 см",
          date: "15.12.2024",
          change: 1.2,
        },
        {
          id: "2",
          type: "waist",
          title: "Обхват талії",
          value: "84,5 см",
          date: "15.12.2024",
          change: -0.6,
        },
      ],
    },
    {
      month: "Листопад 2024",
      records: [
        {
          id: "3",
          type: "arm",
          title: "Обхват плеча",
          value: "32,8 см",
          date: "28.11.2024",
          change: 0.3,
        },
        {
          id: "4",
          type: "thigh",
          title: "Обхват стегна",
          value: "58,1 см",
          date: "25.11.2024",
          change: -0.2,
        },
        {
          id: "5",
          type: "hips",
          title: "Обхват стегон",
          value: "92,3 см",
          date: "20.11.2024",
          change: 0.4,
        },
      ],
    },
    {
      month: "Жовтень 2024",
      records: [
        {
          id: "6",
          type: "chest",
          title: "Обхват грудей",
          value: "97,0 см",
          date: "18.10.2024",
        },
        {
          id: "7",
          type: "waist",
          title: "Обхват талії",
          value: "85,1 см",
          date: "18.10.2024",
        },
      ],
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "arm":
        return <Ruler className="w-5 h-5 text-white" />;
      case "chest":
        return <Target className="w-5 h-5 text-white" />;
      case "waist":
        return <Target className="w-5 h-5 text-white" />;
      case "thigh":
        return <Ruler className="w-5 h-5 text-white" />;
      case "hips":
        return <Target className="w-5 h-5 text-white" />;
      default:
        return <Ruler className="w-5 h-5 text-white" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "arm":
        return "bg-blue-600";
      case "chest":
        return "bg-purple-600";
      case "waist":
        return "bg-orange-600";
      case "thigh":
        return "bg-green-600";
      case "hips":
        return "bg-pink-600";
      default:
        return "bg-gray-600";
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
                  ? "bg-purple-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Measurement Records */}
      <div className="px-4 space-y-6">
        {measurementData.map((monthData) => (
          <div key={monthData.month}>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {monthData.month}
            </h2>
            <div className="space-y-3">
              {monthData.records.map((record) => (
                <div
                  key={record.id}
                  className="bg-card rounded-xl p-4 flex items-center justify-between border border-border"
                >
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
                      <p className="text-purple-600 text-lg font-light">
                        {record.value}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {record.change !== undefined && (
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                          record.change > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {record.change > 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span className="text-xs font-medium">
                          {record.change > 0 ? "+" : ""}
                          {record.change} см
                        </span>
                      </div>
                    )}
                    <span className="text-muted-foreground text-sm">
                      {record.date}
                    </span>
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
