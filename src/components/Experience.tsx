import { Briefcase, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Logos Images Src
import MagaluLogo from "../assets/images/companies/magalu.png";
import UpWorkLogo from "../assets/images/companies/upwork.png";
import SantanderLogo from "../assets/images/companies/santander.png";
import PicPayLogo from "../assets/images/companies/picpay.png";

type ExperienceItem = {
  company: string;
  role: string;
  description: string;
  duration: string;
  isCurrent: boolean;
  logo: string;
};

const Experience = () => {
  const { t, language } = useLanguage();

  const experiences: ExperienceItem[] = [
    // {
    //   company: "PicPay Bank",
    //   role: "Desenvolvedor Backend Java Pleno",
    //   description:
    //     language === "en"
    //       ? "Contribute to the development of scalable APIs using Java (Spring Boot & Micronaut), focusing on performance and resilience. Work on microservices architecture, integrations with MongoDB, PostgreSQL, ScyllaDB, and Elasticsearch, and manage CI/CD pipelines with Docker and GitHub Actions."
    //       : "Participo da construção de APIs escaláveis com Java (Spring Boot e Micronaut), com foco em performance e resiliência. Atuo na arquitetura de microserviços, integração com bases como MongoDB, PostgreSQL, ScyllaDB e Elasticsearch, além de pipelines CI/CD com Docker e GitHub Actions.",
    //   duration:
    //     language === "en" ? "Aug 2025 - Present" : "ago de 2025 - o momento",
    //   isCurrent: true,
    //   logo: PicPayLogo,
    // },
    {
      company: "Magalu / Luizalabs",
      role: "Desenvolvedor Backend Java",
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
      role: "Desenvolvedor Backend Java Júnior",
      description:
        language === "en"
          ? "Built and maintained backend services using Java and Angular, enhancing system reliability and performance."
          : "Desenvolvi e mantive serviços backend com Java e Angular, aprimorando confiabilidade e performance do sistema.",
      duration:
        language === "en" ? "Mar 2021 - May 2022" : "mar de 2021 - mai de 2022",
      isCurrent: false,
      logo: SantanderLogo,
    },
    {
      company: "Upwork",
      role: "Full-stack Developer",
      description:
        language === "en"
          ? "Delivered custom full-stack solutions with Java, PHP, React & Spring, alongside database management, boosting client satisfaction."
          : "Entreguei soluções full-stack com Java, PHP, React & Spring, além de gestão de bancos, elevando a satisfação dos clientes.",
      duration:
        language === "en" ? "Jan 2019 - May 2022" : "jan de 2019 - mai de 2022",
      isCurrent: false,
      logo: UpWorkLogo,
    },
  ];

  return (
    <section className="py-8 md:py-12">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">
        {t("workExperience")}
      </h2>
      <div className="space-y-4 md:space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-github-secondary border border-github-border rounded-lg p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden mx-auto md:mx-0">
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-3 md:mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white text-center md:text-left">
                      {exp.company}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-github-text mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm md:text-base">{exp.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-github-text">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm md:text-base">{exp.duration}</span>
                    {exp.isCurrent && (
                      <span className="bg-github-green text-white text-xs px-2 py-1 rounded-full">
                        {language === "pt" ? "Atual" : t("current")}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-github-text text-sm md:text-base text-center md:text-left">
                  {exp.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
