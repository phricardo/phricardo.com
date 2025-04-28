import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { useState, useRef, MouseEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import convidarMeSrc from "../assets/images/projects/convidar.me.png";
import englishdailySrc from "../assets/images/projects/englishdaily.png";
import integraCefetRjSrc from "../assets/images/projects/integra-cefetrj.png";

type HoverState = {
  isHovered: boolean;
  position: { x: number; y: number };
};

const Projects = () => {
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

  const projects = [
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
          <div
            ref={(el) => (cardRefs.current[index] = el)}
            key={index}
            className="group relative bg-github-secondary border border-github-border rounded-lg overflow-hidden transition-colors duration-500"
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
            <Card className="border-0 bg-transparent">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-github-dark flex-shrink-0 shadow-lg">
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
                <CardDescription className="text-github-text">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#238636] bg-opacity-20 text-[#7ee787] px-2 py-1 rounded-full text-sm font-medium border border-[#238636] border-opacity-30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-github-dark border-github-border text-github-text hover:bg-github-border hover:text-white transition-colors"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1" size={16} />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-github-dark border-github-border text-github-text hover:bg-github-border hover:text-white transition-colors"
                      asChild
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1" size={16} />
                        Online
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
