import { Briefcase, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useRef, MouseEvent } from "react";

// Logos Images Src
import MagaluLogo from "../assets/images/companies/magalu.png";
import UpWorkLogo from "../assets/images/companies/upwork.png";
import SantanderLogo from "../assets/images/companies/santander.png";

type ExperienceItem = {
  company: string;
  role: string;
  description: string;
  duration: string;
  isCurrent: boolean;
  logo: string;
};

type HoverState = {
  isHovered: boolean;
  position: { x: number; y: number };
};

const Experience = () => {
  const { t, language } = useLanguage();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoverStates, setHoverStates] = useState<HoverState[]>([
    { isHovered: false, position: { x: 0, y: 0 } },
    { isHovered: false, position: { x: 0, y: 0 } },
    { isHovered: false, position: { x: 0, y: 0 } },
  ]);

  const handleMouseMove = (index: number, e: MouseEvent<HTMLDivElement>) => {
    if (cardRefs.current[index]) {
      const rect = cardRefs.current[index]!.getBoundingClientRect();
      setHoverStates((prev) => {
        const newStates = [...prev];
        newStates[index] = {
          ...newStates[index],
          position: {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          },
        };
        return newStates;
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoverStates((prev) => {
      const newStates = [...prev];
      newStates[index] = {
        ...newStates[index],
        isHovered: true,
      };
      return newStates;
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoverStates((prev) => {
      const newStates = [...prev];
      newStates[index] = {
        ...newStates[index],
        isHovered: false,
      };
      return newStates;
    });
  };

  const experiences: ExperienceItem[] = [
    {
      company: "Magalu / Luizalabs",
      role: "Desenvolvedor Backend Java",
      description:
        language === "en"
          ? "Develop APIs with Java (Spring Boot & Micronaut), design microservices, implement CI/CD pipelines, and manage Docker with Elasticsearch, MongoDB, ScyllaDB & PostgreSQL."
          : "Desenvolvo APIs em Java (Spring Boot & Micronaut), projeto microserviços, implemento pipelines CI/CD e gerencio Docker com Elasticsearch, MongoDB, ScyllaDB & PostgreSQL.",
      duration:
        language === "en" ? "Jun 2022 - Present" : "Jun de 2022 - o momento",
      isCurrent: true,
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
        language === "en" ? "Mar 2021 - May 2022" : "Mar de 2021 - Mai de 2022",
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
        language === "en" ? "Jan 2019 - May 2022" : "Jan de 2019 - Mai de 2022",
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
            ref={(el) => (cardRefs.current[index] = el)}
            key={index}
            className="group relative bg-github-secondary border border-github-border rounded-lg p-4 md:p-6 overflow-hidden transition-colors duration-500"
            onMouseMove={(e) => handleMouseMove(index, e)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: hoverStates[index].isHovered
                  ? `radial-gradient(600px circle at ${hoverStates[index].position.x}px ${hoverStates[index].position.y}px, rgba(74, 222, 128, 0.1), transparent 40%)`
                  : "",
                borderRadius: "8px",
                border: hoverStates[index].isHovered
                  ? `1px solid rgba(74, 222, 128, ${Math.min(
                      1,
                      1 -
                        Math.sqrt(
                          Math.pow(
                            hoverStates[index].position.x -
                              (cardRefs.current[index]?.offsetWidth ?? 0) / 2,
                            2
                          ) +
                            Math.pow(
                              hoverStates[index].position.y -
                                (cardRefs.current[index]?.offsetHeight ?? 0) /
                                  2,
                              2
                            )
                        ) /
                          300
                    )})`
                  : "",
              }}
            />
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
