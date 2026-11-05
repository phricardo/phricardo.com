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
  X,
  type LucideIcon,
} from "lucide-react";
import LanguageMenu from "./LanguageMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import logoSrc from "../assets/images/logos/phricardo.svg";
import brazilFlagSrc from "../assets/images/flags/brazil.svg";
import usaFlagSrc from "../assets/images/flags/united_states.svg";
import styles from "./Header.module.css";

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
      new Set(
        navItems
          .map((item) => item.sectionId)
          .filter((id): id is string => Boolean(id) && id !== "home")
      )
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
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const activationMargin = window.innerWidth >= 768 ? 48 : 32;
      const activationLine = headerHeight + activationMargin;
      let nextSection = "home";

      for (const { id, element } of elements) {
        if (element.getBoundingClientRect().top > activationLine) {
          break;
        }

        nextSection = id;
      }

      setActiveSection((prev) =>
        prev === nextSection ? prev : nextSection
      );
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
    const desktopClasses = `${styles.navItem} ${
      active ? styles.navItemActive : ""
    } relative flex h-12 items-center px-3 text-sm`;
    const mobileClasses = `${styles.mobileNavItem} ${
      active ? styles.mobileNavItemActive : ""
    } flex min-h-[60px] items-center justify-between px-5 text-lg`;
    const className = mobile ? mobileClasses : desktopClasses;
    const content = mobile ? (
      <>
        <span className="flex min-w-0 items-center gap-5">
          <Icon
            className={`${styles.mobileIcon} h-7 w-7 shrink-0`}
            strokeWidth={1.8}
          />
          <span className="truncate">{item.label}</span>
        </span>
        <ChevronRight
          className={`${styles.mobileIcon} h-6 w-6 shrink-0`}
          strokeWidth={2.3}
        />
      </>
    ) : (
      <span className={styles.desktopContent}>
        <Icon
          className={styles.desktopIcon}
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <span>{item.label}</span>
      </span>
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
      <div className={`${styles.topBar} relative z-40 hidden w-full border-b md:block`}>
        <div className="mx-auto flex h-9 w-full max-w-[1100px] items-center justify-center px-5 md:px-6 lg:px-8">
          <div className={`${styles.date} flex items-center gap-2.5`}>
            <CalendarDays className={`${styles.dateIcon} h-4 w-4`} />
            <span className="whitespace-nowrap capitalize">{formattedDate}</span>
          </div>
        </div>
      </div>

      <header className={`${styles.header} fixed left-0 right-0 top-0 z-[90] w-full border-b`}>
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

          <div className={`${styles.languageBorder} flex shrink-0 items-center gap-2 md:border-l md:pl-5`}>
            <div className="hidden md:block">
              <LanguageMenu />
            </div>
            <button
              type="button"
              className={`${styles.menuButton} inline-flex h-10 w-10 items-center justify-center md:hidden`}
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
        <div className={`${styles.mobileMenu} fixed inset-0 z-[100] flex min-h-svh flex-col overflow-y-auto px-6 py-7 text-white md:hidden`}>

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
              className={`${styles.closeButton} inline-flex h-12 w-12 items-center justify-center`}
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
                  <div className={`${styles.divider} h-px`} />
                ) : null}
              </div>
            ))}
          </nav>

          <div className="relative z-10 mt-auto pb-3 pt-14">
            <p className={`${styles.languageLabel} mb-5 text-lg`}>Idioma</p>
            <div className={`${styles.languageToggle} grid h-14 max-w-[420px] grid-cols-2 p-1`}>
              <button
                type="button"
                onClick={() => setLanguage("pt")}
                className={`${styles.languageChoice} ${
                  language === "pt" ? styles.languageChoiceActive : ""
                } inline-flex items-center justify-center gap-2 text-base`}
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
                className={`${styles.languageChoice} ${
                  language === "en" ? styles.languageChoiceActive : ""
                } inline-flex items-center justify-center gap-2 text-base`}
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
