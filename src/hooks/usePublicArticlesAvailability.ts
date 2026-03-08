import { useQuery } from "@tanstack/react-query";
import { listPublicArticlesByPage } from "@/services/publicArticleApi";

const ARTICLES_TIMEOUT_MS = 5000;

export const usePublicArticlesAvailability = () => {
  const query = useQuery({
    queryKey: ["public-articles", "availability"],
    queryFn: async () => {
      try {
        return await listPublicArticlesByPage(0, ARTICLES_TIMEOUT_MS);
      } catch {
        return null;
      }
    },
    retry: false,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const firstPage = query.data;
  const hasArticles = Boolean(firstPage && firstPage.content.length > 0);
  const isAvailable = Boolean(firstPage);

  return {
    ...query,
    firstPage,
    hasArticles,
    isAvailable,
  };
};
