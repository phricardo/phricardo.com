import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getPublicArticleBySlug } from "@/services/publicArticleApi";
import { transformCustomDirectives } from "@/lib/customDirectives";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatPublishedInfo = (createdAt: string, updatedAt: string) => {
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);
  const createdMs = created.getTime();
  const updatedMs = updated.getTime();

  const base = `Publicado em ${formatDate(createdAt)}`;
  if (updatedMs === createdMs || updatedMs < createdMs) {
    return base;
  }

  const diffMs = updatedMs - createdMs;
  const hours = diffMs / (1000 * 60 * 60);

  if (hours > 24) {
    return base;
  }

  const roundedHours = Math.max(1, Math.floor(hours));
  const label = roundedHours === 1 ? "hora" : "horas";
  return `${base} - Atualizado há ${roundedHours} ${label}`;
};

const ArticleDetail = () => {
  const { slug = "" } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-article", slug],
    queryFn: () => getPublicArticleBySlug(slug),
    enabled: Boolean(slug),
  });

  return (
    <div className="min-h-screen bg-github-dark font-inter flex flex-col [&>footer]:mt-0">
      <Header />
      <div className="flex-1 flex">
        <main className="w-full max-w-[760px] mx-auto border-x border-[#1b1b1b] px-4 md:px-6 pt-4 md:pt-6 pb-40">
          <div className="mb-6">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 rounded-lg border border-[#252525] bg-[#0f0f0f] px-3 py-1.5 text-sm font-medium text-[#bbbbbb] transition-colors hover:text-white hover:border-[#3a3a3a]"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para artigos
            </Link>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-github-border bg-github-secondary p-6 text-github-text">
              Carregando artigo...
            </div>
          ) : isError || !data ? (
            <div className="rounded-2xl border border-github-border bg-github-secondary p-6 text-github-text">
              Artigo nao encontrado.
            </div>
          ) : (
            <article className="p-0 md:p-0">
              <header className="mb-8 flex flex-col items-center text-center">
                <h1 className="text-center text-3xl md:text-4xl font-bold text-[#34eb64] mb-3">
                  {data.title}
                </h1>
                <p className="text-github-text text-sm mb-4">
                  {formatPublishedInfo(data.createdAt, data.updatedAt)}
                </p>
                <p className="text-github-text text-sm mb-4">
                  Por{" "}
                  <strong>
                    {data.author?.name || data.author?.username || "Autor"}
                  </strong>
                </p>
                {data.tags.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                    {data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[0.6rem] bg-[hsl(140_65%_15%)] text-[#34eb64] px-[0.64rem] py-[0.28rem] text-[0.76rem]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <MarkdownRenderer
                content={transformCustomDirectives(data.content || "")}
              />
            </article>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
