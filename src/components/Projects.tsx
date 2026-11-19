import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LiquidGlass } from "@/components/liquid-glass";
import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import convidarMeSrc from "../assets/images/projects/convidar.me.webp";
import englishdailySrc from "../assets/images/projects/englishdaily.webp";
import gitIdentityManagerSrc from "../assets/images/projects/git-identity-manager.webp";
import alcateiaUfcirjSrc from "../assets/images/projects/alcateia-ufcirj.webp";
import sectionStyles from "./Section.module.css";
import styles from "./Projects.module.css";

type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  logo: string;
};

const Projects = () => {
  const isMobile = useIsMobile();
  const { t, language } = useLanguage();

  const title = language === "en" ? "Featured Projects" : "Projetos Destacados";

  const projects: Project[] = [
    // {
    //   title: "convidar.me",
    //   description:
    //     language === "en"
    //       ? "A data-driven event manager that simplifies invites, RSVPs and reminders in real time."
    //       : "EMS orientado a dados que simplifica convites, confirmações e lembretes em tempo real.",
    //   tags: ["Java", "NextJs", "Typescript", "MongoDB"],
    //   demo: "https://www.convidar.me/",
    //   logo: convidarMeSrc,
    // },
    // {
    //   title: "English Daily",
    //   description:
    //     language === "en"
    //       ? "Daily curated vocabulary lists to build your English skills with quick lessons."
    //       : "Listas diárias de vocabulário para aprimorar seu inglês com lições rápidas.",
    //   tags: ["HTML", "CSS", "Javascript"],
    //   demo: "https://englishdaily.phricardo.com/",
    //   github: "https://github.com/phricardorj/daily-english-words",
    //   logo: englishdailySrc,
    // },
    {
      title: "Git Identity Manager",
      description:
        language === "en"
          ? "Cross-platform desktop app for managing multiple Git identities, user profiles, repository rules and credentials in one place."
          : "Aplicativo desktop multiplataforma para gerenciar múltiplas identidades Git, perfis de usuário, regras por repositório e credenciais em um só lugar.",
      tags: ["Tauri", "React", "Rust"],
      github: "https://github.com/phricardo/Git-Identity-Manager",
      demo: "https://git-identity-manager.phricardo.com/",
      logo: gitIdentityManagerSrc,
    },
    {
      title: "Alcateia/RJ",
      description:
        language === "en"
          ? "Centralizes UFCIRJ students' IDs, schedules and grades on one easy-to-use platform."
          : "Centraliza carteirinha, horários e notas dos alunos da UFCIRJ em uma plataforma fácil de usar.",
      tags: ["Next.js", "Typescript", "Web Scraping"],
      github: "https://github.com/phricardo/alcateia.phricardo.com",
      demo: "https://alcateia.phricardo.com/",
      logo: alcateiaUfcirjSrc,
    },
  ];

  return (
    <section id="projects" className="my-12">
      <h2 className={sectionStyles.title}>{title}</h2>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="rounded-xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
          >
            <LiquidGlass
              as={Card}
              variant="card"
              interactive
              className={`${sectionStyles.card} overflow-hidden`}
            >
              <div className="p-4">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className={`${styles.logoFrame} h-16 w-16 flex-shrink-0 overflow-hidden`}>
                    <img
                      src={project.logo}
                      alt={`${project.title} icon`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                      <div>
                        <CardTitle className={`${sectionStyles.cardTitle} mb-2 text-lg`}>
                          {project.title}
                        </CardTitle>
                        <CardDescription className={`${sectionStyles.description} mb-4 line-clamp-2`}>
                          {project.description}
                        </CardDescription>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`${styles.tag} px-4 py-1.5`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`flex gap-2 ${isMobile ? "mt-2" : ""}`}>
                        {project.github && (
                          <LiquidGlass
                            as="a"
                            variant="button"
                            refract={false}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.action} inline-flex h-9 min-w-[100px] items-center justify-center whitespace-nowrap px-3 text-sm`}
                          >
                            <Github className="mr-1 h-4 w-4" />
                            GitHub
                          </LiquidGlass>
                        )}
                        {project.demo && (
                          <LiquidGlass
                            as="a"
                            variant="button"
                            refract={false}
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.action} inline-flex h-9 min-w-[100px] items-center justify-center whitespace-nowrap px-3 text-sm`}
                          >
                            <ExternalLink className="mr-1 h-4 w-4" />
                            {language === "en" ? "Open" : "Acessar"}
                          </LiquidGlass>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </LiquidGlass>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
