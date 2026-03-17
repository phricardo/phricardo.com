import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import PublicArticleList from "@/components/PublicArticleList";
import { usePublicArticlesAvailability } from "@/hooks/usePublicArticlesAvailability";
import { useLanguage } from "@/contexts/LanguageContext";

const HomeArticlesSection = () => {
  const { language } = useLanguage();
  const { firstPage, isLoading, hasArticles } = usePublicArticlesAvailability();

  if (language !== "pt" || isLoading || !firstPage || !hasArticles) {
    return null;
  }

  return (
    <section id="articles" className="space-y-5 md:space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Artigos</h2>
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#101010] px-4 py-2 text-sm font-semibold text-[#d6d6d6] transition-colors hover:text-white hover:border-[#34eb64]/60"
        >
          <Plus className="h-4 w-4" />
          Ver mais
        </Link>
      </div>
      <PublicArticleList articles={firstPage.content.slice(0, 3)} />
    </section>
  );
};

export default HomeArticlesSection;
