import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import cefetRjSrc from "../assets/images/logos/cefetrj.png";

interface FormationItem {
  id: string;
  title: {
    en: string;
    pt: string;
  };
  period?: string;
  description: {
    en: string;
    pt: string;
  };
  imageSrc: string;
  imageAlt: {
    en: string;
    pt: string;
  };
}

const formationData: FormationItem[] = [
  {
    id: "academic",
    title: {
      en: "Computer Information Systems (CIS)",
      pt: "Sistemas de Informação",
    },
    period: "Aug 2021 - Dec 2026",
    description: {
      en: "Bachelor's degree in Computer Information Systems (CIS) at Cefet/RJ - Centro Federal de Educação Tecnológica Celso Suckow da Fonseca.",
      pt: "Bacharelado em Sistemas de Informação no Cefet/RJ - Centro Federal de Educação Tecnológica Celso Suckow da Fonseca.",
    },
    imageSrc: cefetRjSrc,
    imageAlt: {
      en: "Cefet/RJ - Federal Center for Technological Education Celso Suckow da Fonseca",
      pt: "Cefet/RJ - Centro Federal de Educação Tecnológica Celso Suckow da Fonseca",
    },
  },
];

const AcademicFormation: React.FC = () => {
  const { language } = useLanguage();

  const sectionTitle =
    language === "en" ? "Academic Formation" : "Formação Acadêmica";

  return (
    <section className="mb-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-white">{sectionTitle}</h2>
      </div>
      <div className="space-y-4">
        {formationData.map((item) => (
          <Card
            key={item.id}
            className="bg-github-secondary border-github-border overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4">
                <div className="w-full max-w-[120px] mx-auto md:mx-0">
                  <AspectRatio ratio={1}>
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt[language]}
                      className="rounded-lg w-full h-full object-cover border border-github-border"
                    />
                  </AspectRatio>
                </div>
                <div className="md:col-span-5 space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {item.title[language]}
                  </h3>
                  {item.period && (
                    <p className="text-sm text-github-text">{item.period}</p>
                  )}
                  <p className="text-sm text-github-text">
                    {item.description[language]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AcademicFormation;
