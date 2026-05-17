import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Language = "en" | "pt";

type Translations = {
  [key in Language]: {
    workExperience: string;
    current: string;
    featuredProjects: string;
    areasOfExpertise: string;
    frontendDevelopment: string;
    backendDevelopment: string;
    databaseManagement: string;
    cloudServices: string;
    devOps: string;
    uiUxDesign: string;
    systemArchitecture: string;
    projectManagement: string;
    mainLanguages: string;
  };
};

const translations: Translations = {
  en: {
    workExperience: "Work Experience",
    current: "Current",
    featuredProjects: "Featured Projects",
    areasOfExpertise: "Expertise",
    frontendDevelopment: "Frontend Development",
    backendDevelopment: "Backend Development",
    databaseManagement: "Database Management",
    cloudServices: "Cloud Services",
    devOps: "DevOps",
    uiUxDesign: "UI/UX Design",
    systemArchitecture: "System Architecture",
    projectManagement: "Project Management",
    mainLanguages: "Programming Languages",
  },
  pt: {
    workExperience: "Experiência Profissional",
    current: "Atual",
    featuredProjects: "Projetos em Destaque",
    areasOfExpertise: "Especialização",
    frontendDevelopment: "Desenvolvimento Frontend",
    backendDevelopment: "Desenvolvimento Backend",
    databaseManagement: "Gerenciamento de Banco de Dados",
    cloudServices: "Serviços em Nuvem",
    devOps: "DevOps",
    uiUxDesign: "Design de UI/UX",
    systemArchitecture: "Arquitetura de Sistemas",
    projectManagement: "Gestão de Projetos",
    mainLanguages: "Linguagens de Programação",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof (typeof translations)["en"]) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [showModal, setShowModal] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = localStorage.getItem(
      "preferredLanguage"
    ) as Language | null;

    if (storedLang && (storedLang === "en" || storedLang === "pt")) {
      setLanguage(storedLang);
      setShowModal(false);
    } else {
      const browserLang = navigator.language.toLowerCase();
      const defaultLang: Language = browserLang.startsWith("pt") ? "pt" : "en";
      setLanguage(defaultLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  const t = (key: keyof (typeof translations)["en"]) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {mounted && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="bg-github-secondary border-github-border text-github-text">
            <DialogHeader>
              <DialogTitle className="text-white">
                Select your language / Selecione seu idioma
              </DialogTitle>
              <DialogDescription className="text-github-text">
                Choose your preferred language / Escolha seu idioma preferido
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button
                onClick={() => {
                  handleSetLanguage("en");
                  setShowModal(false);
                }}
                className="bg-black hover:bg-[#121212] text-white border border-[#212121]"
              >
                English
              </Button>
              <Button
                onClick={() => {
                  handleSetLanguage("pt");
                  setShowModal(false);
                }}
                className="bg-black hover:bg-[#121212] text-white border border-[#212121]"
              >
                Português
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
