import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";

import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import ArticleShortCodeRedirect from "./pages/ArticleShortCodeRedirect";
import NotFound from "./pages/NotFound";

import { externalRoutes } from "./config/externalRoutes";
import { ExternalRedirect } from "./components/ExternalRedirect";
import { ExternalRedirectDynamic } from "./components/ExternalRedirectDynamic";

const queryClient = new QueryClient();

const LegacyArticleSlugRedirect = () => {
  const { slug = "" } = useParams();
  return <Navigate to={`/articles/${slug}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/a/:shortCode" element={<ArticleShortCodeRedirect />} />
            <Route path="/artigos" element={<Navigate to="/articles" replace />} />
            <Route path="/artigos/:slug" element={<LegacyArticleSlugRedirect />} />
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
