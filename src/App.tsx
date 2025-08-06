import { Routes, Route } from "react-router";
import Providers from "./components/providers";
import { Toaster } from "@/components/ui/sonner";
import Home from "./page";
import Workouts from "./pages/Workouts";
import Profile from "./pages/Profile";

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
    </Providers>
  );
}

export default App;
