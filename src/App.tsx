import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { externalRoutes } from "./config/externalRoutes";
import { ExternalRedirect } from "./components/ExternalRedirect";
import { ExternalRedirectDynamic } from "./components/ExternalRedirectDynamic";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
  </QueryClientProvider>
);

export default App;
