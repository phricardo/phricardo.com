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
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { Database } from "lucide-react";
import { motion } from "framer-motion";

type LanguageItem = {
  name: string;
  icon: React.ComponentType<any>;
};

const MainLanguages = () => {
  const { t } = useLanguage();

  const languages: LanguageItem[] = [
    { name: "TypeScript", icon: SiTypescript },
    { name: "Java", icon: DiJava },
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
    <div className="my-12">
      <h2 className="text-2xl font-semibold text-white mb-8">
        {t("mainLanguages")}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {languages.map((lang) => {
          const Icon = lang.icon;
          return (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className="card-hover p-4 sm:p-6">
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-github-text" />
                  <span className="text-white font-medium text-sm sm:text-base">
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
