import { Button } from "@/components/ui/button";
import Providers from "./components/providers";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Providers>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
      <Toaster />
    </Providers>
  );
}

export default App;
