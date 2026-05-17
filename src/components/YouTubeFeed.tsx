import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type VideoItem = {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  published: string;
};

const FEED_URL =
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCF9oonHeDfcVAcUKVKpv-hA";
const FEED_PROXY = (url: string) =>
  `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

const YouTubeFeed = () => {
  const { language } = useLanguage();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dateLocale = useMemo(
    () => (language === "pt" ? "pt-BR" : "en-US"),
    [language]
  );

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const tryFetch = async () => {
          const direct = await fetch(FEED_URL);
          if (direct.ok) {
            return direct.text();
          }
          const proxied = await fetch(FEED_PROXY(FEED_URL));
          if (!proxied.ok) {
            throw new Error(`HTTP ${proxied.status}`);
          }
          return proxied.text();
        };

        const xmlText = await tryFetch();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, "application/xml");

        if (doc.querySelector("parsererror")) {
          throw new Error("Erro ao interpretar o feed XML");
        }

        const entries = Array.from(doc.getElementsByTagName("entry")).slice(
          0,
          6
        );

        const mapped: VideoItem[] = entries.map((entry) => {
          const title =
            entry.getElementsByTagName("title")[0]?.textContent ?? "";
          const link =
            entry.getElementsByTagName("link")[0]?.getAttribute("href") ?? "";
          const thumbnail =
            entry.getElementsByTagName("media:thumbnail")[0]?.getAttribute(
              "url"
            ) ??
            entry.getElementsByTagName("media:content")[0]?.getAttribute(
              "url"
            ) ??
            "";
          const published =
            entry.getElementsByTagName("published")[0]?.textContent ?? "";

          return {
            id:
              entry.getElementsByTagName("yt:videoId")[0]?.textContent ??
              link ??
              title,
            title,
            link,
            thumbnail,
            published,
          };
        });

        setVideos(mapped);
      } catch (err) {
        setError((err as Error).message || "Erro ao carregar vídeos");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <section className="my-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            {language === "pt"
              ? "Últimos vídeos no YouTube"
              : "Latest YouTube Videos"}
          </h2>
          <p className="text-github-text text-sm">
            {language === "pt"
              ? "Atualizados direto do canal."
              : "Pulled live from the channel feed."}
          </p>
        </div>
        <a
          href="https://www.youtube.com/@phrcd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#34eb64] hover:text-[#34eb64]/80 text-sm font-semibold"
        >
          {language === "pt" ? "Ver canal" : "View channel"}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-github-text">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>
            {language === "pt" ? "Carregando vídeos..." : "Loading videos..."}
          </span>
        </div>
      )}

      {!loading && error && (
        <div className="text-github-text text-sm bg-[#121212] border border-[#212121] rounded-lg px-4 py-3">
          {language === "pt"
            ? "Não foi possível carregar os vídeos agora. Tente novamente mais tarde."
            : "Could not load videos right now. Please try again later."}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto pb-3">
          <div className="flex gap-4 min-w-full snap-x snap-mandatory">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block min-w-[240px] max-w-[280px] rounded-xl overflow-hidden snap-start card-hover hover:border-[#34eb64]/60"
              >
                <div className="aspect-video bg-[#121212]">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="p-3 space-y-2">
                  <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2">
                    {video.title}
                  </h3>
                  {video.published && (
                    <p className="text-xs text-github-text">
                      {new Date(video.published).toLocaleDateString(
                        dateLocale,
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default YouTubeFeed;
