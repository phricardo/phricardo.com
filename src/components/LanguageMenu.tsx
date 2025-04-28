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

const languageNames = {
  en: "English",
  pt: "Português",
};

import BRAZIL_FLAG_URL from "../assets/images/flags/brazil.svg";
import USA_FLAG_URL from "../assets/images/flags/united_states.svg";

const LanguageMenu = () => {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentFlagUrl = language === "en" ? USA_FLAG_URL : BRAZIL_FLAG_URL;
  const currentAlt = language === "en" ? "US Flag" : "Brazil Flag";

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="default"
        className="bg-[#161B22] hover:bg-[#30363D] text-github-text border-none flex items-center gap-2 px-3 py-1.5 rounded-md focus:outline-none"
      >
        <img
          src={currentFlagUrl}
          alt={currentAlt}
          className="w-5 h-3.5 object-cover mr-2"
        />
        <span className="text-github-text">{languageNames[language]}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className="bg-[#161B22] hover:bg-[#30363D] text-github-text border-none flex items-center gap-2 min-w-[140px] px-3 py-1.5 rounded-md focus:outline-none"
        >
          <img
            src={currentFlagUrl}
            alt={currentAlt}
            className="w-5 h-3.5 object-cover"
          />
          <span className="flex-1 text-left text-github-text">
            {languageNames[language]}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50 text-github-text" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#161B22] border border-[#30363D] text-github-text min-w-[140px] p-1 rounded-md shadow-lg focus:outline-none"
      >
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`cursor-pointer flex items-center bg-[#161B22] px-3 py-1.5 text-sm rounded-sm focus:outline-none transition-colors ${
            language === "en"
              ? "bg-[#30363D] text-github-text"
              : "hover:bg-[#30363D] text-github-text"
          }`}
        >
          <img
            src={USA_FLAG_URL}
            alt="US Flag"
            className="w-5 h-3.5 object-cover mr-2"
          />
          <span>{languageNames["en"]}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("pt")}
          className={`cursor-pointer flex items-center bg-[#161B22] px-3 py-1.5 text-sm rounded-sm focus:outline-none transition-colors ${
            language === "pt"
              ? "bg-[#30363D] text-github-text"
              : "hover:bg-[#30363D] text-github-text"
          }`}
        >
          <img
            src={BRAZIL_FLAG_URL}
            alt="Brazil Flag"
            className="w-5 h-3.5 object-cover mr-2"
          />
          <span>{languageNames["pt"]}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageMenu;
