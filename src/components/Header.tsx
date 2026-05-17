import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  CalendarDays,
  ChevronRight,
  FolderOpen,
  GraduationCap,
  Home,
  Menu,
  Newspaper,
  X,
  type LucideIcon,
} from "lucide-react";
import LanguageMenu from "./LanguageMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePublicArticlesAvailability } from "@/hooks/usePublicArticlesAvailability";
import logoSrc from "../assets/images/logos/phricardo.svg";
import brazilFlagSrc from "../assets/images/flags/brazil.svg";
import usaFlagSrc from "../assets/images/flags/united_states.svg";

type NavItem =
  | {
      href: string;
      label: string;
      type: "internal";
      icon: LucideIcon;
      sectionId?: string;
    }
  | {
      href: string;
      label: string;
      type: "anchor";
      icon: LucideIcon;
      sectionId: string;
    }
  | {
      href: string;
      label: string;
      type: "external";
      icon: LucideIcon;
      sectionId?: string;
    };

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [formattedDate, setFormattedDate] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { hasArticles } = usePublicArticlesAvailability();
  const shouldShowArticles = language === "pt" && hasArticles;

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        href: "/",
        label: language === "pt" ? "Início" : "Home",
        type: "internal",
        icon: Home,
        sectionId: "home",
      },
      {
        href: "/#experience",
        label: language === "pt" ? "Experiência" : "Experience",
        type: "anchor",
        icon: Briefcase,
        sectionId: "experience",
      },
      {
        href: "/#academic",
        label: language === "pt" ? "Acadêmico" : "Academic",
        type: "anchor",
        icon: GraduationCap,
        sectionId: "academic",
      },
      {
        href: "/#projects",
        label: language === "pt" ? "Projetos" : "Projects",
        type: "anchor",
        icon: FolderOpen,
        sectionId: "projects",
      },
      ...(shouldShowArticles
        ? [
            {
              href: "/articles",
              label: language === "pt" ? "Artigos" : "Articles",
              type: "internal" as const,
              icon: Newspaper,
            },
          ]
        : []),
    ],
    [shouldShowArticles, language]
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
      if (location.pathname !== "/") {
        setIsMenuOpen(false);
        return;
      }

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
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "America/Sao_Paulo",
        timeZoneName: "short",
      });

      setFormattedDate(formatter.format(new Date()));
    };

    updateDate();
    const intervalId = window.setInterval(updateDate, 60_000);

    return () => window.clearInterval(intervalId);
  }, [language]);

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

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const renderNavItem = (item: NavItem, mobile = false) => {
    const active = isActive(item);
    const Icon = item.icon;
    const desktopClasses = `relative flex h-16 items-center px-3 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-9 after:-translate-x-1/2 after:bg-github-green after:transition-opacity ${
      active
        ? "text-github-green after:opacity-100"
        : "text-[#c9ced6] after:opacity-0 hover:text-white"
    }`;
    const mobileClasses = `flex min-h-[64px] items-center justify-between rounded-xl px-5 text-lg font-semibold transition-colors ${
      active
        ? "bg-[radial-gradient(circle_at_30%_50%,rgba(34,235,100,0.13),rgba(15,45,28,0.62)_48%,rgba(13,22,20,0.9)_100%)] text-github-green"
        : "text-[#f2f3f5] hover:bg-[#10151b]/70 hover:text-white"
    }`;
    const className = mobile ? mobileClasses : desktopClasses;
    const content = mobile ? (
      <>
        <span className="flex min-w-0 items-center gap-5">
          <Icon
            className={`h-7 w-7 shrink-0 ${
              active ? "text-github-green" : "text-[#aeb4be]"
            }`}
            strokeWidth={1.8}
          />
          <span className="truncate">{item.label}</span>
        </span>
        <ChevronRight
          className={`h-6 w-6 shrink-0 ${
            active ? "text-github-green" : "text-[#aeb4be]"
          }`}
          strokeWidth={2.3}
        />
      </>
    ) : (
      item.label
    );

    if (item.type === "external") {
      return (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMenuOpen(false)}
          className={className}
        >
          {content}
        </a>
      );
    }

    if (item.type === "anchor") {
      return (
        <a
          key={item.href}
          href={item.href}
          onClick={(event) => handleNavClick(event, item)}
          className={className}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        key={item.href}
        to={item.href}
        onClick={(event) => handleNavClick(event, item)}
        className={className}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      <div className="relative z-40 hidden w-full border-b border-github-border/80 bg-[radial-gradient(circle_at_50%_0%,rgba(34,230,101,0.16),rgba(11,13,15,0.96)_42%,rgba(11,13,15,0.98)_100%)] md:block">
        <div className="mx-auto flex h-9 w-full max-w-[1100px] items-center justify-center px-5 md:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 text-xs font-medium text-[#b9bec7]">
            <CalendarDays className="h-4 w-4 text-[#858b94]" />
            <span className="whitespace-nowrap capitalize">{formattedDate}</span>
          </div>
        </div>
      </div>

      <header className="fixed left-0 right-0 top-0 z-[90] w-full border-b border-github-border bg-[#0b0d0f]/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-[1100px] items-center justify-between gap-4 px-5 md:min-h-[74px] md:px-6 lg:px-8">
          <Link className="flex shrink-0 items-center gap-2" to="/">
            <img
              src={logoSrc}
              alt="PhRicardo Logo"
              className="h-7 w-auto md:h-8"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-4 md:flex lg:gap-6">
            {navItems.map((item) => renderNavItem(item))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 md:border-l md:border-[#343840] md:pl-5">
            <div className="hidden md:block">
              <LanguageMenu />
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-github-border bg-[#101214] text-white transition-colors hover:border-github-green/60 md:hidden"
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
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>
      <div className="h-16 md:h-[74px]" aria-hidden="true" />

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[100] flex min-h-svh flex-col overflow-y-auto bg-[#05080b] px-6 py-7 text-white md:hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(52,235,100,0.08),transparent_34%),linear-gradient(140deg,rgba(8,16,20,0.98),rgba(3,5,8,1)_55%,rgba(7,11,16,1))]" />

          <div className="relative z-10 flex items-center justify-between">
            <Link
              className="flex shrink-0 items-center"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src={logoSrc}
                alt="PhRicardo Logo"
                className="h-7 w-auto"
              />
            </Link>

            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#222933] bg-[#090d12]/80 text-white transition-colors hover:border-github-green/60"
              onClick={() => setIsMenuOpen(false)}
              aria-label={language === "pt" ? "Fechar menu" : "Close menu"}
            >
              <X className="h-6 w-6" strokeWidth={1.8} />
            </button>
          </div>

          <nav className="relative z-10 mt-14 flex flex-col">
            {navItems.map((item, index) => (
              <div key={item.href}>
                {renderNavItem(item, true)}
                {index < navItems.length - 1 ? (
                  <div className="h-px bg-[#1a2028]" />
                ) : null}
              </div>
            ))}
          </nav>

          <div className="relative z-10 mt-auto pb-3 pt-14">
            <p className="mb-5 text-lg font-medium text-[#aeb4be]">Idioma</p>
            <div className="grid h-14 max-w-[420px] grid-cols-2 rounded-2xl border border-[#1d242d] bg-[#05080b]/80 p-1">
              <button
                type="button"
                onClick={() => setLanguage("pt")}
                className={`inline-flex items-center justify-center gap-2 rounded-xl text-base font-bold transition-colors ${
                  language === "pt"
                    ? "bg-[radial-gradient(circle_at_30%_50%,rgba(52,235,100,0.12),rgba(15,48,30,0.76)_65%,rgba(13,22,20,0.92)_100%)] text-github-green shadow-[inset_0_0_0_1px_rgba(52,235,100,0.24)]"
                    : "text-[#c9ced6] hover:text-white"
                }`}
              >
                <img
                  src={brazilFlagSrc}
                  alt=""
                  className="h-4 w-6 rounded-sm object-cover"
                  aria-hidden="true"
                />
                <span>PT-BR</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`inline-flex items-center justify-center gap-2 rounded-xl text-base font-bold transition-colors ${
                  language === "en"
                    ? "bg-[radial-gradient(circle_at_30%_50%,rgba(52,235,100,0.12),rgba(15,48,30,0.76)_65%,rgba(13,22,20,0.92)_100%)] text-github-green shadow-[inset_0_0_0_1px_rgba(52,235,100,0.24)]"
                    : "text-[#c9ced6] hover:text-white"
                }`}
              >
                <img
                  src={usaFlagSrc}
                  alt=""
                  className="h-4 w-6 rounded-sm object-cover"
                  aria-hidden="true"
                />
                <span>EN-US</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
