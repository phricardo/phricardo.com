import { useEffect, useState } from "react";
import LanguageMenu from "./LanguageMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import logoSrc from "../assets/images/logos/phricardo.svg";

const Header = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [formattedDate, setFormattedDate] = useState("");
  const [showDate, setShowDate] = useState(true);

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
      const tzLabel =
        language === "pt" ? "Horario Sao Paulo" : "Sao Paulo time";

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

  return (
    <header className="bg-github-secondary border-b border-github-border w-full sticky top-0 z-50">
      <div className="max-w-[1100px] mx-auto w-full px-4 md:px-6 py-4 flex flex-col gap-2 md:gap-1">
        {showDate && (
          <div className="w-full text-[10px] sm:text-xs text-[#9f9f9f] leading-tight text-center break-words">
            <span className="capitalize">{formattedDate}</span>
          </div>
        )}

        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex-shrink-0">
            <a className="flex-shrink-0" href="/">
              <img src={logoSrc} alt="PhRicardo Logo" className="h-6 w-auto" />
            </a>
          </div>

          <div className="flex-shrink-0">
            <LanguageMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
