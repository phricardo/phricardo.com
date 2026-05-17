import { Briefcase, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

import MagaluLogo from "../assets/images/companies/magalu.png";
import UpWorkLogo from "../assets/images/companies/upwork.png";
import SantanderLogo from "../assets/images/companies/santander.png";
import PicPayLogo from "../assets/images/companies/picpay.png";
import GovernancaBrasilLogo from "../assets/images/companies/governancabrasil.jpg";

type ExperienceItem = {
  company: string;
  role: string;
  description: string;
  duration: string;
  isCurrent: boolean;
  isVolunteer?: boolean;
  logo: string;
};

const Experience = () => {
  const { t, language } = useLanguage();

  const experiences: ExperienceItem[] = [
    {
      company: "PicPay",
      role:
        language === "en"
          ? "Mid-level Java Backend Developer"
          : "Desenvolvedor Backend Java Pleno",
      description:
        language === "en"
          ? "Backend Java Developer in the Retail Financial Services (PF) Business Unit, working on the Wallet & Banking domain, in integration with the Accounts and Segments Tribe, with a focus on the Banking Platform."
          : "Desenvolvedor Backend Java na BU de Serviços Financeiros PF, atuando na frente de Wallet & Banking, em integração com a Tribo de Contas e Segmentos, com foco na Plataforma Banking. Atualmente, faço parte da squad de Rendimento de Conta, atuando como desenvolvedor Java, com experiência na elaboração de contratos, integração de sistemas, desenvolvimento de BFFs em Spring Boot e microserviços, além de participação ativa em reuniões e discussões estratégicas para alinhamento, definição de requisitos e estimativas técnicas.",
      duration:
        language === "en" ? "Aug 2025 - Present" : "ago de 2025 - o momento",
      isCurrent: true,
      logo: PicPayLogo,
    },
    {
      company: "Magalu / Luizalabs",
      role:
        language === "en"
          ? "Java Backend Developer"
          : "Desenvolvedor Backend Java",
      description:
        language === "en"
          ? "Develop APIs with Java (Spring Boot & Micronaut), design microservices, implement CI/CD pipelines, and manage Docker with Elasticsearch, MongoDB, ScyllaDB & PostgreSQL."
          : "Desenvolvo APIs em Java (Spring Boot & Micronaut), projeto microserviços, implemento pipelines CI/CD e gerencio Docker com Elasticsearch, MongoDB, ScyllaDB & PostgreSQL.",
      duration:
        language === "en" ? "Jun 2022 - Jul 2025" : "jun de 2022 - jun de 2025",
      isCurrent: false,
      logo: MagaluLogo,
    },
    {
      company: "Santander Brasil",
      role:
        language === "en"
          ? "Junior Java Backend Developer"
          : "Desenvolvedor Backend Java Júnior",
      description:
        language === "en"
          ? "Built and maintained backend services using Java and Angular, improving system reliability and performance."
          : "Desenvolvi e mantive serviços backend com Java e Angular, aprimorando confiabilidade e performance do sistema.",
      duration:
        language === "en" ? "Mar 2021 - May 2022" : "mar de 2021 - mai de 2022",
      isCurrent: false,
      logo: SantanderLogo,
    },
    {
      company: "CEFET/RJ + SOUGOV",
      role:
        language === "en"
          ? "Volunteer in Digital Accessibility"
          : "Voluntário em Acessibilidade Digital",
      description:
        language === "en"
          ? "Volunteering with CEFET/RJ on a digital accessibility analysis project for the SOUGOV platform across web and mobile versions. The work involves evaluating real usage scenarios, identifying accessibility barriers, assessing adherence to guidelines such as WCAG, eMAG and DS-GOV, and proposing technical recommendations to improve usability and inclusive experience, with a focus on blind and low-vision users."
          : "Participando, de forma voluntária e em conjunto com o CEFET/RJ, de um projeto de análise de acessibilidade digital da plataforma SOUGOV, nas versões web e mobile. A atuação envolve avaliação de cenários reais de uso, identificação de barreiras de acessibilidade, análise de aderência a diretrizes como WCAG, eMAG e DS-GOV, e proposição de recomendações técnicas para melhoria da usabilidade e da experiência inclusiva, com foco em pessoas cegas e com baixa visão.",
      duration:
        language === "en" ? "May 2026 - Present" : "mai de 2026 - o momento",
      isCurrent: true,
      isVolunteer: true,
      logo: GovernancaBrasilLogo,
    },
    {
      company: "Upwork",
      role: language === "en" ? "Full-stack Developer" : "Full-stack Developer",
      description:
        language === "en"
          ? "Delivered custom full-stack solutions with Java, PHP, React & Spring, along with database management, boosting client satisfaction."
          : "Entreguei soluções full-stack com Java, PHP, React & Spring, além de gestão de bancos, elevando a satisfação dos clientes.",
      duration:
        language === "en" ? "Jan 2019 - May 2022" : "jan de 2019 - mai de 2022",
      isCurrent: false,
      logo: UpWorkLogo,
    },
  ];

  return (
    <section id="experience" className="py-8 md:py-12">
      <h2 className="section-title section-heading">{t("workExperience")}</h2>
      <div className="space-y-4 md:space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="card-hover rounded-lg p-4 md:p-6"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
              <div className="mx-auto h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg md:mx-0 md:h-24 md:w-24">
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="mb-3 flex flex-col gap-2 md:mb-4 md:flex-row md:items-start md:justify-between md:gap-4">
                  <div>
                    <h3 className="text-center text-lg font-medium text-white md:text-left">
                      {exp.company}
                    </h3>
                    <div className="mt-1 flex items-center justify-center gap-2 text-github-text md:justify-start">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-sm md:text-base">{exp.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-github-text md:justify-start">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm md:text-base">{exp.duration}</span>
                    {(exp.isCurrent || exp.isVolunteer) && (
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          exp.isVolunteer
                            ? "border border-github-border bg-[#171a1d] text-[#c9ced6]"
                            : "bg-github-green text-black"
                        }`}
                      >
                        {exp.isVolunteer
                          ? language === "pt"
                            ? "Voluntário"
                            : "Volunteer"
                          : language === "pt"
                          ? "Atual"
                          : t("current")}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-center text-sm text-github-text md:text-left md:text-base">
                  {exp.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
