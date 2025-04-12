"use client";

import React from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MingcuteExternalLinkLine } from "../Icons";
import styles from "./ProjectsSection.module.css";

interface ProjectsProps {
  className?: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectsSection: React.FC<ProjectsProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const projects: Project[] = [
    {
      title: "Daily English Words",
      description:
        "Aprenda uma nova palavra em inglês todos os dias com este projeto interativo, que facilita a prática diária do idioma e enriquece seu vocabulário.",
      image: "/assets/images/projects/01.png",
      tags: ["Tailwind CSS", "Javascript"],
      liveUrl: "https://englishdaily.phricardo.com/",
      githubUrl: "https://github.com/phricardo/daily-english-words",
    },
    {
      title: "História da Democracia: Mundo e Brasil",
      description:
        "Explore a evolução da democracia no mundo e no Brasil, conhecendo os principais marcos históricos e os contextos políticos que moldaram nossa sociedade.",
      image: "/assets/images/projects/02.png",
      tags: ["Javascript", "HTML", "CSS"],
      liveUrl: "https://hdmb.phricardo.com/",
    },
    {
      title: "ListVideo - Plataforma EduTech",
      description:
        "Descubra a ListVideo, uma plataforma inovadora de EduTech que integra recursos multimídia para aprimorar o processo de ensino e aprendizado.",
      image: "/assets/images/projects/03.png",
      tags: ["React", "Redux", "Java/Spring Boot"],
      liveUrl: "https://listvideo.phricardo.com/",
    },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      slideNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  React.useEffect(() => {
    if (!isMobile || !sliderRef.current) return;

    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      endX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const threshold = 50;

      if (startX - endX > threshold) {
        slideNext(); // Swipe para esquerda
      } else if (endX - startX > threshold) {
        slidePrev(); // Swipe para direita
      }
    };

    const slider = sliderRef.current;
    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, currentIndex]);

  const slidePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const slideNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="projects"
      className={`${styles.section} ${styles.bgSecondary} ${className || ""}`}
    >
      <div className="container">
        <div>
          <h1 className={`title`}>
            <MingcuteExternalLinkLine /> Meus Projetos
          </h1>
        </div>

        <div className={styles.sliderContainer}>
          <div ref={sliderRef} className={styles.sliderWrapper}>
            <div
              className={styles.slides}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className={styles.slide}>
                  <div className={styles.slideContent}>
                    <div className={styles.slideText}>
                      <div>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <p className={styles.projectDescription}>
                          {project.description}
                        </p>
                        <div className={styles.tags}>
                          {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={styles.projectLinks}>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                          >
                            <ExternalLink size={18} className={styles.icon} />{" "}
                            Acessar Online
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                          >
                            <Github size={18} className={styles.icon} />
                            Código Fonte
                          </a>
                        )}
                      </div>
                    </div>
                    <div className={styles.slideImageWrapper}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={styles.slideImage}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isMobile && (
            <div className={styles.navButtons}>
              <button onClick={slidePrev} className={styles.navButton}>
                <ChevronLeft size={24} />
                <span>Anterior</span>
              </button>

              <button onClick={slideNext} className={styles.navButton}>
                <span>Próximo</span>
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          <div className={styles.dots}>
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.dotActive : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
