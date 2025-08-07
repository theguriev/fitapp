import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import WeightChart from "./components/weight-chart";

export default function WeightPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f5] flex flex-col">
      {/* Header with back navigation */}
      <div className="bg-background border-border p-2">
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Головна</h1>
        </div>
      </div>

      {/* Tabs and Content */}
      <Tabs defaultValue="D" className="w-full">
        {/* Title and Subtitle */}
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-2xl font-bold mb-1">Вага</h2>
          <TabsContent value="D" className="p-0 m-0">
            <p className="text-sm text-muted-foreground">Сьогодні</p>
          </TabsContent>
          <TabsContent value="W" className="p-0 m-0">
            <p className="text-sm text-muted-foreground">Цей тиждень</p>
          </TabsContent>
          <TabsContent value="M" className="p-0 m-0">
            <p className="text-sm text-muted-foreground">Цей місяць</p>
          </TabsContent>
          <TabsContent value="Y" className="p-0 m-0">
            <p className="text-sm text-muted-foreground">Цей рік</p>
          </TabsContent>
        </div>

        {/* Tabs */}
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="D">D</TabsTrigger>
            <TabsTrigger value="W">W</TabsTrigger>
            <TabsTrigger value="M">M</TabsTrigger>
            <TabsTrigger value="Y">Y</TabsTrigger>
          </TabsList>
        </div>

        {/* Content */}
        <div className="p-4">
          <TabsContent value="D" className="p-0">
            <WeightChart period="D" />
          </TabsContent>
          <TabsContent value="W" className="p-0">
            <WeightChart period="W" />
          </TabsContent>
          <TabsContent value="M" className="p-0">
            <WeightChart period="M" />
          </TabsContent>
          <TabsContent value="Y" className="p-0">
            <WeightChart period="Y" />
          </TabsContent>
        </div>
      </Tabs>

      {/* Кнопка в самом низу страницы */}
      <div className="p-4 mt-auto">
        <Button
          className="w-full"
          onClick={() => {
            // В реальном приложении здесь будет логика добавления данных
            console.log("Открыть форму добавления веса");
          }}
        >
          Внести данні
        </Button>
      </div>
    </div>
  );
}
