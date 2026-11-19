import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiAngular,
  SiJavascript,
  SiSpringboot,
  SiKotlin,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { Database } from "lucide-react";
import { motion } from "framer-motion";
import sectionStyles from "./Section.module.css";
import styles from "./MainLanguages.module.css";

type LanguageItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

const MainLanguages = () => {
  const { t } = useLanguage();

  const languages: LanguageItem[] = [
    { name: "TypeScript", icon: SiTypescript },
    { name: "Java", icon: DiJava },
    { name: "Kotlin", icon: SiKotlin },
    { name: "Spring Boot", icon: SiSpringboot },
    { name: "React Js", icon: SiReact },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "NestJS", icon: SiNestjs },
    { name: "Mongo DB", icon: SiMongodb },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Angular 2+", icon: SiAngular },
    { name: "JavaScript", icon: SiJavascript },
    { name: "SQL", icon: Database },
  ];

  return (
    <div className="my-24 md:my-28">
      <h2 className={sectionStyles.title}>
        {t("mainLanguages")}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {languages.map((lang) => {
          const Icon = lang.icon;

          return (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className={`${sectionStyles.card} ${styles.card} p-4 sm:p-6`}>
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <Icon className={`${styles.icon} h-8 w-8 sm:h-12 sm:w-12`} />

                  <span className={`${styles.label} text-sm sm:text-base`}>
                    {lang.name}
                  </span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MainLanguages;
