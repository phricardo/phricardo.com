import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Linkedin, Maximize2, Minimize2 } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getPublicArticleByIdentifier } from "@/services/publicArticleApi";
import { transformCustomDirectives } from "@/lib/customDirectives";

const estimateReadingTime = (content: string) => {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = plainText ? plainText.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min de leitura`;
};

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

const buildGithubAvatarUrl = (username?: string) => {
  const normalized = (username || "").trim();
  if (!normalized) {
    return "";
  }

  return `https://github.com/${encodeURIComponent(normalized)}.png`;
};

const buildShortArticleUrl = (shortCode?: string, slug?: string) => {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://www.phricardo.com";

  if (shortCode?.trim()) {
    return `${baseUrl}/a/${encodeURIComponent(shortCode.trim())}`;
  }

  if (slug?.trim()) {
    return `${baseUrl}/articles/${encodeURIComponent(slug.trim())}`;
  }

  return baseUrl;
};

const buildLinkedinShareUrl = (url: string) =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

const buildXShareUrl = (url: string, title?: string) =>
  `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || "")}`;

const ArticleDetail = () => {
  const { slug = "" } = useParams();
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-article", slug],
    queryFn: () => getPublicArticleByIdentifier(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });

  const shortArticleUrl = buildShortArticleUrl(data?.shortCode, data?.slug);
  const linkedinShareUrl = buildLinkedinShareUrl(shortArticleUrl);
  const xShareUrl = buildXShareUrl(shortArticleUrl, data?.title);

  return (
    <div className="min-h-screen bg-github-dark font-inter flex flex-col [&>footer]:mt-0">
      {!isPresentationMode ? <Header /> : null}
      <div className="flex-1 flex">
        <main
          className={`w-full mx-auto px-4 md:px-6 pt-4 md:pt-6 pb-40 ${
            isPresentationMode
              ? "max-w-[860px]"
              : "max-w-[760px] border-x border-[#1b1b1b]"
          }`}
        >
          <div className="mb-6 flex items-center justify-between gap-3">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 rounded-lg border border-[#252525] bg-[#0f0f0f] px-3 py-1.5 text-sm font-medium text-[#bbbbbb] transition-colors hover:text-white hover:border-[#3a3a3a]"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para artigos
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#252525] bg-[#0f0f0f] text-[#bbbbbb] transition-colors hover:border-[#3a3a3a] hover:text-white"
              onClick={() => setIsPresentationMode((prev) => !prev)}
              aria-label={
                isPresentationMode
                  ? "Sair do modo de apresentação"
                  : "Entrar no modo de apresentação"
              }
              title={
                isPresentationMode
                  ? "Sair do modo de apresentação"
                  : "Modo de apresentação"
              }
            >
              {isPresentationMode ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
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
                <div className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-github-text">
                  <p>{formatPublishedInfo(data.createdAt, data.updatedAt)}</p>
                  <p>{estimateReadingTime(data.content || "")}</p>
                </div>
                <h1 className="text-center text-3xl md:text-4xl font-bold text-[#34eb64] mb-3">
                  {data.title}
                </h1>
                <div className="mb-4 flex items-center justify-center gap-2 text-github-text text-sm">
                  {data.author?.username ? (
                    <img
                      src={buildGithubAvatarUrl(data.author.username)}
                      alt={`Avatar de ${data.author.username}`}
                      loading="lazy"
                      className="h-7 w-7 rounded-full border border-[#2d2d2d] object-cover"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full border border-[#2d2d2d] bg-[#1a1a1a]" />
                  )}
                  <p>
                    Por{" "}
                    <strong>
                      {data.author?.name || data.author?.username || "Autor"}
                    </strong>
                  </p>
                </div>
                <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs md:text-sm text-[#8b949e]">
                    Compartilhar em:
                  </span>
                  <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#252525] bg-[#0f0f0f] text-github-text transition-colors hover:border-[#3a3a3a] hover:text-white"
                    aria-label="Compartilhar no LinkedIn"
                    title="Compartilhar no LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={xShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#252525] bg-[#0f0f0f] text-github-text transition-colors hover:border-[#3a3a3a] hover:text-white"
                    aria-label="Compartilhar no X"
                    title="Compartilhar no X"
                  >
                    <BsTwitterX className="h-4 w-4" />
                  </a>
                </div>
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

              <footer className="mt-10 pt-6 border-t border-[#1f1f1f]">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Sobre o autor
                </h2>
                <div className="rounded-xl border border-[#252525] bg-[#101010] p-4 md:p-5 flex items-start gap-4">
                  {data.author?.username ? (
                    <img
                      src={buildGithubAvatarUrl(data.author.username)}
                      alt={`Avatar de ${data.author.username}`}
                      loading="lazy"
                      className="h-14 w-14 rounded-full border border-[#2d2d2d] object-cover"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full border border-[#2d2d2d] bg-[#1a1a1a]" />
                  )}

                  <div className="min-w-0">
                    <p className="text-white font-semibold leading-tight">
                      {data.author?.name || data.author?.username || "Autor"}
                    </p>
                    {data.author?.username ? (
                      <p className="text-sm text-[#9ca3af] mt-1">
                        @{data.author.username}
                      </p>
                    ) : null}
                    {data.author?.description ? (
                      <p className="text-sm text-github-text mt-3">
                        {data.author.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </footer>
            </article>
          )}
        </main>
      </div>

      {!isPresentationMode ? <Footer /> : null}
    </div>
  );
};

export default ArticleDetail;
