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

const btnClass =
  "bg-[#121212] hover:bg-[#212121] text-github-text border border-[#212121] flex items-center gap-2 px-3 py-1.5 rounded-md focus:outline-none min-w-[140px] shrink-0";

const LanguageMenu = () => {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentFlagUrl = language === "en" ? USA_FLAG_URL : BRAZIL_FLAG_URL;
  const currentAlt = language === "en" ? "US Flag" : "Brazil Flag";

  // Mantém o mesmo tamanho/estilo no primeiro paint (mobile agradece)
  if (!mounted) {
    return (
      <Button variant="ghost" size="default" className={btnClass}>
        <img
          src={currentFlagUrl}
          alt={currentAlt}
          className="w-5 h-3.5 object-cover shrink-0"
        />
        <span className="min-w-0 truncate">
          {languageNames[language as "en" | "pt"]}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="default" className={btnClass}>
          <img
            src={currentFlagUrl}
            alt={currentAlt}
            className="w-5 h-3.5 object-cover shrink-0"
          />
          <span className="min-w-0 truncate text-left">
            {languageNames[language as "en" | "pt"]}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

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
