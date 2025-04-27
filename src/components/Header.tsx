import LanguageMenu from "./LanguageMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import logoSrc from "../assets/images/logos/phricardo.svg";

const Header = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <header className="bg-github-secondary border-b border-github-border w-full sticky top-0 z-50">
      <div className="max-w-[1100px] mx-auto w-full px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <img src={logoSrc} alt="PhRicardo Logo" className="h-6 w-auto" />
        </div>

        <div className="flex items-center gap-2">
          <LanguageMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
