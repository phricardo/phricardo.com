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
    "bg-transparent text-[#c9ced6] border-0 rounded-md focus:outline-none transition-colors shrink-0 py-1.5 hover:text-white hover:bg-transparent flex items-center shadow-none";
  const triggerSpacingClass = "px-2 gap-2.5 min-w-[124px]";
  const labelVisibilityClass = "inline";
  const chevronVisibilityClass = "h-4 w-4 opacity-70";

  const triggerButton = (
    <Button
      variant="ghost"
      size="default"
      className={`${baseTriggerClass} ${triggerSpacingClass}`}
    >
      <img
        src={currentFlagUrl}
        alt={currentAlt}
        className="h-3.5 w-5 shrink-0 object-cover"
      />
      <span
        className={`min-w-0 truncate text-left text-sm ${labelVisibilityClass}`}
      >
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
        className="z-[110] min-w-[150px] rounded-md border border-github-border bg-[#101214] p-1 text-[#c9ced6] shadow-lg focus:outline-none"
      >
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`flex cursor-pointer items-center rounded-sm bg-[#101214] px-3 py-2 text-sm transition-colors focus:outline-none ${
            language === "en"
              ? "bg-[#17251c] text-white"
              : "text-[#c9ced6] hover:bg-[#171a1d]"
          }`}
        >
          <img
            src={USA_FLAG_URL}
            alt="US Flag"
            className="mr-2 h-3.5 w-5 shrink-0 object-cover"
          />
          <span>{languageNames.en}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setLanguage("pt")}
          className={`flex cursor-pointer items-center rounded-sm bg-[#101214] px-3 py-2 text-sm transition-colors focus:outline-none ${
            language === "pt"
              ? "bg-[#17251c] text-white"
              : "text-[#c9ced6] hover:bg-[#171a1d]"
          }`}
        >
          <img
            src={BRAZIL_FLAG_URL}
            alt="Brazil Flag"
            className="mr-2 h-3.5 w-5 shrink-0 object-cover"
          />
          <span>{languageNames.pt}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageMenu;
