import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import ufciRjSrc from "../assets/images/logos/ufcirj.png";
import sectionStyles from "./Section.module.css";
import styles from "./AcademicFormation.module.css";

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
      <h2 className={sectionStyles.title}>
        {sectionTitle}
      </h2>
      <div className="space-y-4 md:space-y-8">
        {formationData.map((data) => (
          <motion.div
            key={data.id}
            className={`${sectionStyles.card} p-4 md:p-6`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className={`${styles.logoFrame} mx-auto h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg md:mx-0 md:h-24 md:w-24`}>
                <img
                  src={data.imageSrc}
                  alt={data.imageAlt[language]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-3 md:mb-4">
                  <h3 className={`${sectionStyles.cardTitle} text-center text-lg md:text-left`}>
                    {data.title[language]}
                  </h3>
                  {data.period && (
                    <div className={`${sectionStyles.metadata} flex items-center justify-center gap-2 md:justify-start`}>
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm md:text-base">
                        {data.period}
                      </span>
                    </div>
                  )}
                </div>
                <p className={`${sectionStyles.description} text-center text-sm md:text-left md:text-base`}>
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
