import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PublicArticleList from "@/components/PublicArticleList";
import { listPublicArticlesByPage } from "@/services/publicArticleApi";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageParam = Number.parseInt(searchParams.get("p") ?? "1", 10);
  const page =
    Number.isFinite(currentPageParam) && currentPageParam > 0
      ? currentPageParam
      : 1;

  const currentZeroBasedPage = page - 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-articles", "list", currentZeroBasedPage],
    queryFn: () => listPublicArticlesByPage(currentZeroBasedPage),
  });

  const totalPages = Math.max(data?.totalPages ?? 1, 1);
  const safePage = Math.min(page, totalPages);

  const goToPage = (nextPage: number) => {
    setSearchParams({ p: String(Math.max(1, Math.min(totalPages, nextPage))) });
  };

  return (
    <div className="min-h-screen bg-github-dark font-inter flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-12">
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Artigos</h1>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-[#252525] bg-[#0f0f0f] px-3 py-1.5 text-sm font-medium text-[#bbbbbb] transition-colors hover:text-white hover:border-[#3a3a3a]"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para home
            </Link>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-github-border bg-github-secondary p-6 text-github-text">
              Carregando artigos...
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-github-border bg-github-secondary p-6 text-github-text">
              Nao foi possivel carregar os artigos.
            </div>
          ) : (
            <>
              <PublicArticleList articles={data?.content ?? []} />
              {totalPages > 1 && (
                <nav className="mt-5 flex items-center justify-center gap-3">
                  <button
                    className="rounded-lg border border-github-border bg-github-secondary px-3 py-2 text-sm text-github-text disabled:opacity-40"
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                  >
                    Anterior
                  </button>
                  <span className="text-sm text-github-text">
                    Pagina {safePage} de {totalPages}
                  </span>
                  <button
                    className="rounded-lg border border-github-border bg-github-secondary px-3 py-2 text-sm text-github-text disabled:opacity-40"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                  >
                    Proxima
                  </button>
                </nav>
              )}
            </>
          )}
        </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
