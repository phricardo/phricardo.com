import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { externalRoutes } from "./config/externalRoutes";
import { ExternalRedirect } from "./components/ExternalRedirect";
import { ExternalRedirectDynamic } from "./components/ExternalRedirectDynamic";

const App = () => (
  <TooltipProvider>
    <LanguageProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          {externalRoutes.fixed.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<ExternalRedirect to={route.url} />}
            />
          ))}
          <Route path="/go/:key" element={<ExternalRedirectDynamic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </TooltipProvider>
);

export default App;
