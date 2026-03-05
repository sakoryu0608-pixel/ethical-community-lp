import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Router, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Security from "./pages/Security";

// GitHub Pages では /ethical-community-lp というベースパスが付く
// BASE_URL は "/ethical-community-lp/" のように末尾スラッシュ付きで来るため除去する
const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

function AppRouter() {
  return (
    <Router base={base}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/security"} component={Security} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
