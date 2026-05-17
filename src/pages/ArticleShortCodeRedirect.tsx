import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPublicArticleByIdentifier } from "@/services/publicArticleApi";

const ArticleShortCodeRedirect = () => {
  const { shortCode = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-article-identifier", shortCode],
    queryFn: () => getPublicArticleByIdentifier(shortCode),
    enabled: Boolean(shortCode),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data?.slug) {
      return;
    }

    queryClient.setQueryData(["public-article", data.slug], data);
    navigate(`/articles/${data.slug}`, { replace: true });
  }, [data, navigate, queryClient]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-github-dark text-github-text flex items-center justify-center px-4 text-center">
        Carregando artigo...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-github-dark text-github-text flex items-center justify-center px-4 text-center">
        Artigo nao encontrado.
      </div>
    );
  }

  return null;
};

export default ArticleShortCodeRedirect;
