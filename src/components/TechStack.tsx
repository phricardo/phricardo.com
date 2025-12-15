
import { useLanguage } from "@/contexts/LanguageContext";

const TechStack = () => {
  const { t } = useLanguage();
  
  const technologies = [
    t("frontendDevelopment"),
    t("backendDevelopment"),
    t("databaseManagement"),
    t("cloudServices"),
    t("devOps"),
    t("uiUxDesign"),
    t("systemArchitecture"),
    t("projectManagement"),
  ];

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold text-white mb-4">{t('areasOfExpertise')}</h2>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="bg-[#0f2718] border border-[#34eb64]/60 text-[#34eb64] px-4 py-1.5 rounded-full text-sm font-semibold"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
