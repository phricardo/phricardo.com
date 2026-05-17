import {
  BarChart3,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Network,
  Palette,
  Server,
  type LucideIcon,
} from "lucide-react";
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

type ExpertiseItem = {
  label: string;
  icon: LucideIcon;
};

const TechStack = () => {
  const { t, language } = useLanguage();

  const technologies: ExpertiseItem[] = [
    { label: t("frontendDevelopment"), icon: Code2 },
    { label: t("backendDevelopment"), icon: Server },
    { label: t("databaseManagement"), icon: Database },
    { label: t("cloudServices"), icon: Cloud },
    { label: t("devOps"), icon: GitBranch },
    { label: t("uiUxDesign"), icon: Palette },
    { label: t("systemArchitecture"), icon: Network },
    { label: t("projectManagement"), icon: BarChart3 },
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
    <section className="w-full min-w-0 overflow-x-clip border-t border-github-border pt-7 md:pt-8">
      <div className="w-full min-w-0">
        <h2 className="section-title section-heading">
          {t("areasOfExpertise")}
        </h2>

        <div className="flex w-full min-w-0 flex-wrap gap-3">
          {technologies.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex min-h-11 max-w-full min-w-0 items-center gap-3 rounded-md border border-github-border bg-[#0d0f11] px-4 py-2 text-sm font-medium text-[#e4e7ec] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <Icon className="h-5 w-5 shrink-0 text-github-green" />
              <span className="min-w-0 whitespace-normal break-words leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-9 w-full min-w-0 overflow-x-clip md:mt-10">
        <h3 className="section-title section-heading">
          {language === "pt"
            ? "Organizações que já contaram com meu trabalho"
            : "Organizations I have supported"}
        </h3>

        <div className="tech-stack-marquee relative w-full overflow-hidden py-3">
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
