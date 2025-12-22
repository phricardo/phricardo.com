import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LanguageMenu from "./LanguageMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { getExternalRoutePath } from "@/config/externalRoutes";
import logoSrc from "../assets/images/logos/phricardo.svg";
// import iconSrc from "../assets/images/logos/icon.svg";

type NavItem =
  | {
      href: string;
      label: string;
      type: "internal";
      sectionId?: string;
    }
  | {
      href: string;
      label: string;
      type: "anchor";
      sectionId: string;
    }
  | {
      href: string;
      label: string;
      type: "external";
      sectionId?: string;
    };

const Header = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [formattedDate, setFormattedDate] = useState("");
  const [showDate, setShowDate] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        href: "/",
        label: language === "pt" ? "Início" : "Home",
        type: "internal",
        sectionId: "home",
      },
      {
        href: "/#experience",
        label: language === "pt" ? "Experiência" : "Experience",
        type: "anchor",
        sectionId: "experience",
      },
      {
        href: "/#academic",
        label: language === "pt" ? "Acadêmico" : "Academic",
        type: "anchor",
        sectionId: "academic",
      },
      {
        href: "/#projects",
        label: language === "pt" ? "Projetos" : "Projects",
        type: "anchor",
        sectionId: "projects",
      },
      {
        href: getExternalRoutePath("youtube"),
        label: "YouTube",
        type: "external",
      },
    ],
    [language]
  );

  const isActive = (item: NavItem) => {
    if (item.sectionId && location.pathname === "/") {
      return activeSection === item.sectionId;
    }

    if (item.type === "internal") {
      return location.pathname === item.href;
    }

    return false;
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    if (item.type === "anchor" && item.sectionId) {
      event.preventDefault();
      const target = document.getElementById(item.sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(item.sectionId);
      }
      setIsMenuOpen(false);
      return;
    }

    if (item.type === "internal" && item.sectionId === "home") {
      event.preventDefault();
      if (location.pathname !== item.href) {
        navigate(item.href);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
      setIsMenuOpen(false);
      return;
    }

    setIsMenuOpen(false);
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

      setFormattedDate(`${formatted}`);
    };

    updateDate();
    const intervalId = window.setInterval(updateDate, 60_000);

    return () => window.clearInterval(intervalId);
  }, [language, isMobile]);

  useEffect(() => {
    const hideOffset = 140;
    const showOffset = 80;

    const handleScroll = () => {
      setShowDate((prev) => {
        if (!prev && window.scrollY <= showOffset) return true;
        if (prev && window.scrollY >= hideOffset) return false;
        return prev;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("home");
      return;
    }

    const sectionIds = Array.from(
      new Set([
        "home",
        ...navItems
          .map((item) => item.sectionId)
          .filter((id): id is string => Boolean(id)),
      ])
    );

    const elements = sectionIds
      .map((id) => {
        const element = document.getElementById(id);
        return element ? { id, element } : null;
      })
      .filter((section): section is { id: string; element: HTMLElement } =>
        Boolean(section)
      );

    if (!elements.length) return;

    const updateActiveSection = () => {
      const viewportCenter = window.scrollY + window.innerHeight * 0.45;

      const closest = elements
        .map(({ id, element }) => {
          const rect = element.getBoundingClientRect();
          const center = rect.top + window.scrollY + rect.height / 2;
          return { id, distance: Math.abs(center - viewportCenter) };
        })
        .sort((a, b) => a.distance - b.distance)[0];

      if (closest) {
        setActiveSection((prev) => (prev === closest.id ? prev : closest.id));
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [location.pathname, navItems]);

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
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const active = isActive(item);
                const baseClasses =
                  "px-3 py-2 rounded-full text-sm font-medium transition-colors";

                if (item.type === "external") {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
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
                      onClick={(event) => handleNavClick(event, item)}
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
                    onClick={(event) => handleNavClick(event, item)}
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
                const active = isActive(item);
                const baseClasses =
                  "px-4 py-3 text-sm font-medium flex items-center justify-between";

                if (item.type === "external") {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
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
                      onClick={(event) => handleNavClick(event, item)}
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
                    onClick={(event) => handleNavClick(event, item)}
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
