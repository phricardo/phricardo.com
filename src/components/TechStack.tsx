
import { useLanguage } from "@/contexts/LanguageContext";
import icon01 from "../assets/images/companies/icons/01.svg";
import icon02 from "../assets/images/companies/icons/02.svg";
import icon03 from "../assets/images/companies/icons/03.svg";
import icon04 from "../assets/images/companies/icons/04.svg";

const TechStack = () => {
  const { t, language } = useLanguage();
  
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
    <div className="my-20 md:my-28 space-y-12">
      <div>
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

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">
          {language === "pt"
            ? "Empresas que confiaram no meu trabalho"
            : "Companies that trusted my work"}
        </h3>
        <div className="marquee border border-github-border rounded-lg bg-[#0f0f0f] py-4 px-3">
          <div className="marquee-track">
            {[icon01, icon02, icon03, icon04, icon01, icon02, icon03, icon04].map(
              (logo, idx) => (
                <img
                  key={`logo-${idx}`}
                  src={logo}
                  alt={`Company logo ${idx + 1}`}
                  className="h-10 w-auto opacity-80"
                />
              )
            )}
            {[icon01, icon02, icon03, icon04, icon01, icon02, icon03, icon04].map(
              (logo, idx) => (
                <img
                  key={`logo-dup-${idx}`}
                  src={logo}
                  alt={`Company logo ${idx + 1}`}
                  className="h-10 w-auto opacity-80"
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
