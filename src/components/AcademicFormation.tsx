import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import ufciRjSrc from "../assets/images/logos/ufcirj.png";

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
    period: "Aug 2021 - Dec 2027",
    description: {
      en: "Bachelor's degree in Computer Information Systems (CIS) at UFCI-RJ - Federal University of Science and Innovation of Rio de Janeiro.",
      pt: "Bacharelado em Sistemas de Informação na UFCI-RJ - Universidade Federal de Ciência e Inovação do Rio de Janeiro.",
    },
    imageSrc: ufciRjSrc,
    imageAlt: {
      en: "UFCI-RJ - Federal University of Science and Innovation of Rio de Janeiro",
      pt: "UFCI-RJ - Universidade Federal de Ciência e Inovação do Rio de Janeiro",
    },
  },
];

const AcademicFormation: React.FC = () => {
  const { language } = useLanguage();
  const sectionTitle =
    language === "en" ? "Academic Formation" : "Formação Acadêmica";

  return (
    <section id="academic" className="py-8 md:py-12">
      <h2 className="section-title section-heading">
        {sectionTitle}
      </h2>
      <div className="space-y-4 md:space-y-8">
        {formationData.map((data) => (
          <motion.div
            key={data.id}
            className="card-hover rounded-lg p-4 md:p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden mx-auto md:mx-0">
                <img
                  src={data.imageSrc}
                  alt={data.imageAlt[language]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-3 md:mb-4">
                  <h3 className="text-lg font-medium text-white text-center md:text-left">
                    {data.title[language]}
                  </h3>
                  {data.period && (
                    <div className="flex items-center justify-center md:justify-start gap-2 text-github-text">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm md:text-base">
                        {data.period}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-github-text text-sm md:text-base text-center md:text-left">
                  {data.description[language]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AcademicFormation;
