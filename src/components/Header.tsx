import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LanguageMenu from "./LanguageMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { getExternalRoutePath } from "@/config/externalRoutes";
import logoSrc from "../assets/images/logos/phricardo.svg";

const Header = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [formattedDate, setFormattedDate] = useState("");
  const [showDate, setShowDate] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      {
        href: "/",
        label: language === "pt" ? "Início" : "Home",
        type: "internal" as const,
      },
      {
        href: "/#projects",
        label: language === "pt" ? "Projetos" : "Projects",
        type: "anchor" as const,
      },
      {
        href: getExternalRoutePath("youtube"),
        label: "YouTube",
        type: "external" as const,
      },
    ],
    [language]
  );

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href.replace("#", ""));
  };

  useEffect(() => {
    const locale = language === "pt" ? "pt-BR" : "en-US";
    const updateDate = () => {
      const formatter = new Intl.DateTimeFormat(locale, {
        weekday: isMobile ? "short" : "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "America/Sao_Paulo",
        timeZoneName: "short",
      });

      const formatted = formatter.format(new Date());
      const tzLabel = language === "pt" ? "Horário de Brasília" : "UTC−3 (BRT)";

      setFormattedDate(`${formatted} - ${tzLabel}`);
    };

    updateDate();
    const intervalId = window.setInterval(updateDate, 60_000);

    return () => window.clearInterval(intervalId);
  }, [language, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setShowDate(window.scrollY < 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-github-secondary border-b border-github-border w-full sticky top-0 z-50">
      <div className="max-w-[1100px] mx-auto w-full px-4 md:px-6 py-4 flex flex-col gap-2 md:gap-1">
        {showDate && (
          <div className="w-full text-[10px] sm:text-xs text-[#9f9f9f] leading-tight text-center break-words">
            <span className="capitalize">{formattedDate}</span>
          </div>
        )}

        <div className="w-full flex items-center justify-between gap-3">
          <Link className="flex-shrink-0 flex items-center gap-2" to="/">
            <img src={logoSrc} alt="PhRicardo Logo" className="h-6 w-auto" />
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-1 bg-[#0d0d0d] border border-github-border rounded-full px-2 py-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const baseClasses =
                  "px-3 py-2 rounded-full text-sm font-medium transition-colors";

                if (item.type === "external") {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseClasses} ${
                        active
                          ? "bg-[#0f2718] text-[#34eb64] border border-[#34eb64]/60"
                          : "text-github-text hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                }

                if (item.type === "anchor") {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`${baseClasses} ${
                        active
                          ? "bg-[#0f2718] text-[#34eb64] border border-[#34eb64]/60"
                          : "text-github-text hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`${baseClasses} ${
                      active
                        ? "bg-[#0f2718] text-[#34eb64] border border-[#34eb64]/60"
                        : "text-github-text hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <LanguageMenu />
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-github-border bg-[#0d0d0d] text-white hover:border-[#34eb64]/60"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={
                  isMenuOpen
                    ? language === "pt"
                      ? "Fechar menu"
                      : "Close menu"
                    : language === "pt"
                    ? "Abrir menu"
                    : "Open menu"
                }
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="md:hidden border border-github-border bg-[#0d0d0d] rounded-2xl overflow-hidden shadow-lg">
            <nav className="flex flex-col divide-y divide-github-border">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const baseClasses =
                  "px-4 py-3 text-sm font-medium flex items-center justify-between";

                if (item.type === "external") {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseClasses} ${
                        active
                          ? "bg-[#0f2718] text-[#34eb64]"
                          : "text-github-text hover:text-white"
                      }`}
                    >
                      {item.label}
                      <span className="text-[10px] uppercase tracking-[0.08em] text-[#34eb64]">
                        {language === "pt" ? "Externo" : "External"}
                      </span>
                    </a>
                  );
                }

                if (item.type === "anchor") {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`${baseClasses} ${
                        active
                          ? "bg-[#0f2718] text-[#34eb64]"
                          : "text-github-text hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`${baseClasses} ${
                      active
                        ? "bg-[#0f2718] text-[#34eb64]"
                        : "text-github-text hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
