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
import styles from "./LanguageMenu.module.css";

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

  const triggerSpacingClass = "px-2 gap-2.5 min-w-[124px]";
  const labelVisibilityClass = "inline";
  const chevronVisibilityClass = "h-4 w-4 opacity-70";

  const triggerButton = (
    <Button
      variant="ghost"
      size="default"
      className={`${styles.trigger} ${triggerSpacingClass} flex shrink-0 items-center py-1.5`}
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
        className={`${styles.content} p-1 focus:outline-none`}
      >
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`${styles.item} ${
            language === "en" ? styles.itemActive : ""
          } flex cursor-pointer items-center px-3 py-2 focus:outline-none`}
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
          className={`${styles.item} ${
            language === "pt" ? styles.itemActive : ""
          } flex cursor-pointer items-center px-3 py-2 focus:outline-none`}
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
