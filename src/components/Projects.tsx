import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import convidarMeSrc from "../assets/images/projects/convidar.me.png";
import englishdailySrc from "../assets/images/projects/englishdaily.png";
import integraCefetRjSrc from "../assets/images/projects/integra-cefetrj.png";

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
      title: "alcateia.Cefet/Rj",
      description:
        language === "en"
          ? "Centralizes student IDs, schedules and grades on one easy-to-use platform."
          : "Centraliza carteirinha, horários e notas em uma plataforma fácil de usar.",
      tags: ["Next.js", "Typescript", "Web Scraping"],
      github: "https://github.com/phricardo/alcateia.cefetrj.app",
      demo: "https://alcateia.phricardo.com/",
      logo: integraCefetRjSrc,
    },
  ];

  return (
    <section id="projects" className="my-12">
      <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="rounded-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
          >
            <Card className="card-hover overflow-hidden">
              <div className="p-4">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden">
                    <img
                      src={project.logo}
                      alt={`${project.title} icon`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                      <div>
                        <CardTitle className="text-white text-lg mb-2">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-github-text line-clamp-2 mb-4">
                          {project.description}
                        </CardDescription>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-[#0f2718] border border-[#34eb64]/60 text-[#34eb64] px-4 py-1.5 rounded-full text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`flex gap-2 ${isMobile ? "mt-2" : ""}`}>
                        {project.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="min-w-[100px] bg-github-dark border-github-border text-github-text"
                            asChild
                          >
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-1 h-4 w-4" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {project.demo && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="min-w-[100px] bg-github-dark border-github-border text-github-text"
                            asChild
                          >
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-1 h-4 w-4" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
