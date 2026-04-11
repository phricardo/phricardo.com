import { useLanguage } from "@/contexts/LanguageContext";
import icon01 from "../assets/images/companies/icons/01.svg";
import icon02 from "../assets/images/companies/icons/02.svg";
import icon03 from "../assets/images/companies/icons/03.svg";

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

  const logos = [icon01, icon02, icon03, icon01, icon02, icon03];

  return (
    <section className="tech-stack-section my-20 overflow-hidden rounded-[2rem] border border-[#1f1f1f] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:my-28 md:px-8 md:py-10">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          {t("areasOfExpertise")}
        </h2>

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

        <div className="tech-stack-marquee relative overflow-hidden py-4">
          <div className="tech-stack-marquee-track">
            {[0, 1].map((copy) => (
              <div
                key={`logo-copy-${copy}`}
                className="tech-stack-marquee-group"
                aria-hidden={copy === 1}
              >
                {logos.map((logo, idx) => (
                  <img
                    key={`logo-${copy}-${idx}`}
                    src={logo}
                    alt={`Company logo ${idx + 1}`}
                    className="h-10 w-auto shrink-0 opacity-80"
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-github-dark via-github-dark/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-github-dark via-github-dark/80 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
