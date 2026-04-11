import { useLanguage } from "@/contexts/LanguageContext";
import icon01 from "../assets/images/companies/icons/01.svg";
import icon02 from "../assets/images/companies/icons/02.svg";
import icon03 from "../assets/images/companies/icons/03.svg";
import icon04 from "../assets/images/companies/icons/04.svg";

type CompanyLogo = {
  src: string;
  alt: string;
  className: string;
};

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

  const logos: CompanyLogo[] = [
    {
      src: icon01,
      alt: "Santander logo",
      className: "h-10 md:h-11 max-w-[220px] md:max-w-[250px]",
    },
    {
      src: icon02,
      alt: "PicPay logo",
      className: "h-10 md:h-11 max-w-[145px] md:max-w-[165px]",
    },
    {
      src: icon03,
      alt: "Magalu logo",
      className: "h-10 md:h-11 max-w-[145px] md:max-w-[165px]",
    },
    {
      src: icon04,
      alt: "Company logo 4",
      className: "h-10 md:h-11 max-w-[170px] md:max-w-[195px]",
    },
    {
      src: icon01,
      alt: "Santander logo",
      className: "h-10 md:h-11 max-w-[220px] md:max-w-[250px]",
    },
    {
      src: icon02,
      alt: "PicPay logo",
      className: "h-10 md:h-11 max-w-[145px] md:max-w-[165px]",
    },
    {
      src: icon03,
      alt: "Magalu logo",
      className: "h-10 md:h-11 max-w-[145px] md:max-w-[165px]",
    },
    {
      src: icon04,
      alt: "Company logo 4",
      className: "h-10 md:h-11 max-w-[170px] md:max-w-[195px]",
    },
  ];

  return (
    <section className="space-y-12 md:space-y-16">
      <div>
        <h2 className="section-title text-xl mb-4">
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
        <h3 className="section-title text-xl">
          {language === "pt"
            ? "Organizações que já contaram com meu trabalho"
            : "Organizations I have supported"}
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
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.className} w-auto shrink-0 object-contain opacity-80`}
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
