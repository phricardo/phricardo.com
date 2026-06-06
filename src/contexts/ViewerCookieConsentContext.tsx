import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, Cookie, X } from "lucide-react";
import { ensureViewerCookie } from "@/services/publicArticleApi";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ACCEPTED_VALUE,
  VIEWER_COOKIE_OPT_IN_KEY,
  ViewerCookieConsentContext,
  hasStoredViewerCookieConsent,
} from "@/contexts/viewerCookieConsent";

type CookieConsentBannerText = {
  title: string;
  body: string;
  decline: string;
  accept: string;
  saving: string;
};

const cookieConsentCopy: Record<"en" | "pt", CookieConsentBannerText> = {
  en: {
    title: "View cookies",
    body: "I use an anonymous cookie to count article views anonymously.",
    decline: "Decline",
    accept: "Accept cookies",
    saving: "Saving...",
  },
  pt: {
    title: "Cookies de visualização",
    body: "Uso um cookie anônimo para contabilizar visualizações de forma anônima.",
    decline: "Não aceitar",
    accept: "Aceitar cookies",
    saving: "Salvando...",
  },
};

export const ViewerCookieConsentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { language, hasConfirmedLanguageSelection } = useLanguage();
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasAcceptedViewerCookies, setHasAcceptedViewerCookies] = useState(false);
  const [hasAnsweredCookieConsent, setHasAnsweredCookieConsent] = useState(false);
  const [isViewerCookieReady, setIsViewerCookieReady] = useState(false);
  const ensureRequestRef = useRef<Promise<void> | null>(null);

  const ensureViewerCookieOnce = useCallback(async () => {
    if (!ensureRequestRef.current) {
      ensureRequestRef.current = ensureViewerCookie();
    }

    try {
      await ensureRequestRef.current;
      setIsViewerCookieReady(true);
    } catch {
      setIsViewerCookieReady(false);
      ensureRequestRef.current = null;
    }
  }, []);

  useEffect(() => {
    const accepted = hasStoredViewerCookieConsent();
    setHasAcceptedViewerCookies(accepted);
    setHasAnsweredCookieConsent(
      window.localStorage.getItem(VIEWER_COOKIE_OPT_IN_KEY) !== null
    );
    setIsInitialized(true);

    if (accepted) {
      void ensureViewerCookieOnce();
    }
  }, [ensureViewerCookieOnce]);

  const acceptViewerCookies = useCallback(async () => {
    window.localStorage.setItem(VIEWER_COOKIE_OPT_IN_KEY, ACCEPTED_VALUE);
    setHasAcceptedViewerCookies(true);
    setHasAnsweredCookieConsent(true);
    await ensureViewerCookieOnce();
  }, [ensureViewerCookieOnce]);

  const declineViewerCookies = useCallback(() => {
    window.localStorage.setItem(VIEWER_COOKIE_OPT_IN_KEY, "false");
    setHasAcceptedViewerCookies(false);
    setHasAnsweredCookieConsent(true);
    setIsViewerCookieReady(false);
  }, []);

  const value = useMemo(
    () => ({
      hasAcceptedViewerCookies,
      isViewerCookieReady,
      acceptViewerCookies,
    }),
    [acceptViewerCookies, hasAcceptedViewerCookies, isViewerCookieReady]
  );

  return (
    <ViewerCookieConsentContext.Provider value={value}>
      {children}
      {isInitialized && hasConfirmedLanguageSelection && !hasAnsweredCookieConsent ? (
        <CookieConsentBanner
          language={language}
          onAccept={acceptViewerCookies}
          onDecline={declineViewerCookies}
        />
      ) : null}
    </ViewerCookieConsentContext.Provider>
  );
};

const CookieConsentBanner = ({
  language,
  onAccept,
  onDecline,
}: {
  language: "en" | "pt";
  onAccept: () => Promise<void>;
  onDecline: () => void;
}) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const text = cookieConsentCopy[language];

  const handleAccept = async () => {
    setIsAccepting(true);
    await onAccept().catch(() => undefined);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:px-6 md:pb-6">
      <div className="relative mx-auto flex max-w-[900px] flex-col gap-4 rounded-lg border border-[#252525] bg-[#0b0b0b]/95 p-4 text-github-text shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#252525] bg-[#111111] text-[#34eb64]">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">{text.title}</p>
            <p className="max-w-[620px] text-sm leading-relaxed text-[#b8b8b8]">
              {text.body}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#252525] bg-[#111111] px-4 text-sm font-semibold text-[#d1d5db] transition-colors hover:border-[#3a3a3a] hover:text-white"
            onClick={onDecline}
          >
            <X className="h-4 w-4" aria-hidden="true" />
            {text.decline}
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#34eb64] px-4 text-sm font-semibold text-black transition-colors hover:bg-[#54f47c] disabled:cursor-not-allowed disabled:opacity-70"
            onClick={handleAccept}
            disabled={isAccepting}
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            {isAccepting ? text.saving : text.accept}
          </button>
        </div>
      </div>
    </div>
  );
};
