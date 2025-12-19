import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import BRAZIL_FLAG_URL from "../assets/images/flags/brazil.svg";
import USA_FLAG_URL from "../assets/images/flags/united_states.svg";

const languageNames = {
  en: "English",
  pt: "Português",
} as const;

const LanguageMenu = () => {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentFlagUrl = language === "en" ? USA_FLAG_URL : BRAZIL_FLAG_URL;
  const currentAlt = language === "en" ? "US Flag" : "Brazil Flag";

  const baseTriggerClass =
    "bg-[#121212] text-github-text border border-[#212121] rounded-md focus:outline-none transition-colors shrink-0 py-1.5 hover:text-white hover:border-[#2a2a2a] hover:bg-transparent flex items-center";
  const triggerSpacingClass = isOpen
    ? "px-3 gap-2 min-w-[140px]"
    : "px-2 gap-0 min-w-0";
  const triggerDesktopClass = "md:px-3 md:gap-2 md:min-w-[140px]";
  const labelVisibilityClass = isOpen ? "inline" : "hidden md:inline";
  const chevronVisibilityClass = isOpen
    ? "h-4 w-4 opacity-60"
    : "h-4 w-4 opacity-60 hidden md:inline";

  const triggerButton = (
    <Button
      variant="ghost"
      size="default"
      className={`${baseTriggerClass} ${triggerSpacingClass} ${triggerDesktopClass}`}
    >
      <img
        src={currentFlagUrl}
        alt={currentAlt}
        className="w-5 h-3.5 object-cover shrink-0"
      />
      <span className={`min-w-0 truncate text-left ${labelVisibilityClass}`}>
        {languageNames[language as "en" | "pt"]}
      </span>
      <ChevronDown className={chevronVisibilityClass} />
    </Button>
  );

  if (!mounted) {
    return triggerButton;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-[#121212] border border-[#212121] text-github-text min-w-[140px] p-1 rounded-md shadow-lg focus:outline-none"
      >
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`cursor-pointer flex items-center bg-[#121212] px-3 py-1.5 text-sm rounded-sm focus:outline-none transition-colors ${
            language === "en"
              ? "bg-[#313131] text-white"
              : "hover:bg-[#212121] text-github-text"
          }`}
        >
          <img
            src={USA_FLAG_URL}
            alt="US Flag"
            className="w-5 h-3.5 object-cover mr-2 shrink-0"
          />
          <span>{languageNames.en}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setLanguage("pt")}
          className={`cursor-pointer flex items-center bg-[#121212] px-3 py-1.5 text-sm rounded-sm focus:outline-none transition-colors ${
            language === "pt"
              ? "bg-[#313131] text-white"
              : "hover:bg-[#212121] text-github-text"
          }`}
        >
          <img
            src={BRAZIL_FLAG_URL}
            alt="Brazil Flag"
            className="w-5 h-3.5 object-cover mr-2 shrink-0"
          />
          <span>{languageNames.pt}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageMenu;
