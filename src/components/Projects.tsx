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
  const { t, language } = useLanguage();

  const projects: Project[] = [
    {
      title: "convidar.me",
      description:
        language === "en"
          ? "A data-driven event manager that simplifies invites, RSVPs and reminders in real time."
          : "EMS orientado a dados que simplifica convites, confirmações e lembretes em tempo real.",
      tags: ["Java", "NextJs", "Typescript", "MongoDB"],
      demo: "https://www.convidar.me/",
      logo: convidarMeSrc,
    },
    {
      title: "English Daily",
      description:
        language === "en"
          ? "Daily curated vocabulary lists to build your English skills with quick lessons."
          : "Listas diárias de vocabulário para aprimorar seu inglês com lições rápidas.",
      tags: ["HTML", "CSS", "Javascript"],
      demo: "https://englishdaily.phricardo.com/",
      github: "https://github.com/phricardorj/daily-english-words",
      logo: englishdailySrc,
    },
    {
      title: "integra.Cefet/Rj",
      description:
        language === "en"
          ? "Centralizes student IDs, schedules and grades on one easy-to-use platform."
          : "Centraliza carteirinha, horários e notas em uma plataforma fácil de usar.",
      tags: ["Next.js", "Typescript", "Web Scraping"],
      github: "https://integra-cefetrj.phricardo.com/",
      demo: "https://integra-cefetrj.phricardo.com/",
      logo: integraCefetRjSrc,
    },
  ];

  return (
    <section id="projects" className="my-12">
      <h2 className="text-xl font-semibold text-white mb-6">
        {t("featuredProjects")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="flex flex-col h-full bg-github-secondary border border-github-border rounded-lg overflow-hidden"
          >
            <CardHeader className="px-6 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-github-dark shadow-lg">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-white text-lg">
                  {project.title}
                </CardTitle>
              </div>
              <CardDescription className="text-github-text mt-3">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow px-6 pt-4 pb-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#238636] bg-opacity-20 text-[#7ee787] px-2 py-1 rounded-full text-sm font-medium border border-[#238636] border-opacity-30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                {project.github && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-github-dark border-github-border text-github-text hover:bg-github-border hover:text-white transition-colors"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-center"
                    >
                      <Github className="mr-1" size={16} /> GitHub
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-github-dark border-github-border text-github-text hover:bg-github-border hover:text-white transition-colors"
                    asChild
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-center"
                    >
                      <ExternalLink className="mr-1" size={16} /> Online
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
