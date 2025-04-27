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
        className="bg-[#0D1117] text-github-text border-none flex items-center gap-2"
      >
        <img
          src={currentFlagUrl}
          alt={currentAlt}
          className="w-5 h-3.5 object-cover mr-2"
        />
        {languageNames[language]}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className="bg-[#0D1117] hover:bg-[#161B22] text-github-text border-none flex items-center gap-2 min-w-[140px] transition-colors px-3 py-1.5 rounded-md"
        >
          <img
            src={currentFlagUrl}
            alt={currentAlt}
            className="w-5 h-3.5 object-cover"
          />
          <span className="flex-1 text-left">{languageNames[language]}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#0D1117] border border-[#30363D] text-github-text min-w-[140px] p-1 rounded-md shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`cursor-pointer px-3 py-1.5 text-sm rounded-sm ${
            language === "en"
              ? "bg-github-green text-[#c9d1d9]"
              : "hover:bg-[#161B22] hover:text-[#8b949e] text-github-text"
          }`}
        >
          <img
            src={USA_FLAG_URL}
            alt="US Flag"
            className="w-5 h-3.5 object-cover mr-2"
          />
          {languageNames["en"]}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("pt")}
          className={`cursor-pointer px-3 py-1.5 text-sm rounded-sm ${
            language === "pt"
              ? "bg-github-green text-[#c9d1d9]"
              : "hover:bg-[#161B22] hover:text-[#8b949e] text-github-text"
          }`}
        >
          <img
            src={BRAZIL_FLAG_URL}
            alt="Brazil Flag"
            className="w-5 h-3.5 object-cover mr-2"
          />
          {languageNames["pt"]}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageMenu;
