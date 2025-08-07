import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StepsChart from "./components/steps-chart";

export default function StepsPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header with back navigation */}
      <div className="flex p-2">
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
          <h2 className="text-2xl font-bold mb-1">Кроки</h2>
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
            <StepsChart period="D" />
          </TabsContent>
          <TabsContent value="W" className="p-0">
            <StepsChart period="W" />
          </TabsContent>
          <TabsContent value="M" className="p-0">
            <StepsChart period="M" />
          </TabsContent>
          <TabsContent value="Y" className="p-0">
            <StepsChart period="Y" />
          </TabsContent>
        </div>
      </Tabs>

      {/* Кнопка в самом низу страницы */}
      <div className="px-4 pb-4 w-full mt-auto">
        <Link to="/steps/add">
          <Button className="w-full">
            Внести данні
          </Button>
        </Link>
      </div>
    </div>
  );
}
