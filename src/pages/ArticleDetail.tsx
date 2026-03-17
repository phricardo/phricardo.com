import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Copy,
  Eye,
  Linkedin,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getPublicArticleByIdentifier,
  registerPublishedArticleView,
} from "@/services/publicArticleApi";
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

const formatTotalViews = (views: number) => {
  if (!Number.isFinite(views) || views <= 0) {
    return "0";
  }

  if (views >= 1_000_000) {
    const value = views / 1_000_000;
    const formatted =
      value >= 10
        ? Math.round(value).toString()
        : value.toFixed(1).replace(/\.0$/, "");
    return `${formatted}MM`;
  }

  if (views >= 1_000) {
    const value = views / 1_000;
    const formatted =
      value >= 10
        ? Math.round(value).toString()
        : value.toFixed(1).replace(/\.0$/, "");
    return `${formatted}k`;
  }

  return String(Math.round(views));
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

const ArticleDetailSkeleton = () => (
  <article className="p-0 md:p-0">
    <header className="mb-8 flex flex-col items-center text-center">
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        <Skeleton className="h-4 w-56 bg-[#1f2733]" />
        <Skeleton className="h-4 w-24 bg-[#1f2733]" />
      </div>

      <div className="mb-4 w-full max-w-[640px] space-y-3">
        <Skeleton className="h-12 w-full bg-[#123224]" />
        <Skeleton className="h-12 w-5/6 mx-auto bg-[#123224]" />
      </div>

      <div className="mb-4 flex items-center justify-center gap-2">
        <Skeleton className="h-7 w-7 rounded-full bg-[#1f2733]" />
        <Skeleton className="h-5 w-44 bg-[#1f2733]" />
      </div>

      <div className="mb-4 flex items-center justify-center gap-2">
        <Skeleton className="h-4 w-28 bg-[#1f2733]" />
        <Skeleton className="h-9 w-36 rounded-lg bg-[#171b22]" />
        <Skeleton className="h-9 w-9 rounded-lg bg-[#171b22]" />
        <Skeleton className="h-9 w-9 rounded-lg bg-[#171b22]" />
      </div>

      <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
        <Skeleton className="h-7 w-14 rounded-[0.6rem] bg-[#123224]" />
        <Skeleton className="h-7 w-16 rounded-[0.6rem] bg-[#123224]" />
        <Skeleton className="h-7 w-20 rounded-[0.6rem] bg-[#123224]" />
        <Skeleton className="h-7 w-24 rounded-[0.6rem] bg-[#123224]" />
      </div>
    </header>

    <section className="space-y-4">
      <Skeleton className="h-6 w-full bg-[#1a212b]" />
      <Skeleton className="h-6 w-[96%] bg-[#1a212b]" />
      <Skeleton className="h-6 w-[92%] bg-[#1a212b]" />
      <Skeleton className="h-6 w-[90%] bg-[#1a212b]" />
      <Skeleton className="h-6 w-[97%] bg-[#1a212b]" />
      <Skeleton className="h-6 w-[70%] bg-[#1a212b]" />

      <div className="pt-4">
        <Skeleton className="h-px w-full bg-[#1f2733]" />
      </div>

      <Skeleton className="h-10 w-[74%] bg-[#1f2733]" />
      <Skeleton className="h-8 w-[32%] bg-[#1f2733]" />
      <Skeleton className="h-6 w-full bg-[#1a212b]" />
      <Skeleton className="h-6 w-[95%] bg-[#1a212b]" />
      <Skeleton className="h-6 w-[88%] bg-[#1a212b]" />
    </section>

    <footer className="mt-10 pt-8 border-t border-[#1f1f1f]">
      <div className="flex flex-col items-center text-center">
        <Skeleton className="h-7 w-40 mb-5 bg-[#1f2733]" />
        <Skeleton className="h-20 w-20 rounded-full mb-4 bg-[#1f2733]" />
        <Skeleton className="h-6 w-48 mb-2 bg-[#1f2733]" />
        <Skeleton className="h-4 w-28 mb-4 bg-[#1f2733]" />
        <div className="w-full max-w-[720px] space-y-2">
          <Skeleton className="h-4 w-full bg-[#1f2733]" />
          <Skeleton className="h-4 w-[92%] mx-auto bg-[#1f2733]" />
          <Skeleton className="h-4 w-[85%] mx-auto bg-[#1f2733]" />
        </div>
      </div>
    </footer>
  </article>
);

const ArticleDetail = () => {
  const { slug = "" } = useParams();
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copiar Link");
  const copyResetTimeoutRef = useRef<number | null>(null);
  const registeredViewIdentifierRef = useRef<string | null>(null);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["public-article", slug],
    queryFn: () => getPublicArticleByIdentifier(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });

  const shortArticleUrl = buildShortArticleUrl(data?.shortCode, data?.slug);
  const linkedinShareUrl = buildLinkedinShareUrl(shortArticleUrl);
  const xShareUrl = buildXShareUrl(shortArticleUrl, data?.title);

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const identifier = data?.slug || data?.shortCode || slug;
    if (!identifier) {
      return;
    }

    if (registeredViewIdentifierRef.current === identifier) {
      return;
    }

    registeredViewIdentifierRef.current = identifier;
    void registerPublishedArticleView(identifier)
      .then(() => refetch())
      .catch(() => undefined);
  }, [data?.shortCode, data?.slug, refetch, slug]);

  const handleCopyShortLink = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shortArticleUrl);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = shortArticleUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      setCopyLabel("Copiado com sucesso!");
      if (copyResetTimeoutRef.current) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
      copyResetTimeoutRef.current = window.setTimeout(() => {
        setCopyLabel("Copiar Link");
      }, 3000);
    } catch {
      setCopyLabel("Nao foi possivel copiar");
      if (copyResetTimeoutRef.current) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
      copyResetTimeoutRef.current = window.setTimeout(() => {
        setCopyLabel("Copiar Link");
      }, 3000);
    }
  };

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
            <ArticleDetailSkeleton />
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
                <div className="mb-4 flex items-center justify-center gap-1.5 text-xs text-[#8b949e]">
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{formatTotalViews(data.totalViews || 0)}</span>
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
                  <button
                    type="button"
                    onClick={handleCopyShortLink}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#252525] bg-[#0f0f0f] px-3 text-github-text transition-colors hover:border-[#3a3a3a] hover:text-white"
                    aria-label="Copiar link curto do artigo"
                    title={copyLabel}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="text-xs md:text-sm">{copyLabel}</span>
                  </button>
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

              <footer className="mt-10 pt-8 border-t border-[#1f1f1f]">
                <h2 className="text-lg font-semibold text-white mb-5 text-center">
                  Sobre o autor
                </h2>
                <div className="flex flex-col items-center text-center">
                  {data.author?.username ? (
                    <img
                      src={buildGithubAvatarUrl(data.author.username)}
                      alt={`Avatar de ${data.author.username}`}
                      loading="lazy"
                      className="h-20 w-20 rounded-full border border-[#2d2d2d] object-cover mb-4"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full border border-[#2d2d2d] bg-[#1a1a1a] mb-4" />
                  )}

                  <div className="min-w-0 flex flex-col items-center text-center">
                    <p className="text-white font-semibold leading-tight text-xl">
                      {data.author?.name || data.author?.username || "Autor"}
                    </p>
                    {data.author?.username ? (
                      <p className="text-sm text-[#9ca3af] mt-1">
                        @{data.author.username}
                      </p>
                    ) : null}
                    {data.author?.description ? (
                      <p className="text-sm text-github-text mt-4 max-w-[720px] leading-relaxed">
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
