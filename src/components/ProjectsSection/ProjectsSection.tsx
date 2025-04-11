"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
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
  liveUrl: string;
  githubUrl: string;
}

const ProjectsSection: React.FC<ProjectsProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const projects: Project[] = [
    {
      title: "E-Commerce Website",
      description:
        "A full-featured online store with product listings, shopping cart, and secure checkout.",
      image: "https://placehold.co/600x400/e4e4e7/666?text=E-Commerce+Project",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://project1.example.com",
      githubUrl: "https://github.com/yourusername/project1",
    },
    {
      title: "Personal Finance Dashboard",
      description:
        "An application to track expenses, income, and financial goals with interactive charts.",
      image: "https://placehold.co/600x400/e4e4e7/666?text=Finance+Dashboard",
      tags: ["React", "TypeScript", "Firebase", "Chart.js"],
      liveUrl: "https://project2.example.com",
      githubUrl: "https://github.com/yourusername/project2",
    },
    {
      title: "Social Media Platform",
      description:
        "A platform for connecting users, sharing content, and real-time messaging.",
      image: "https://placehold.co/600x400/e4e4e7/666?text=Social+Media+App",
      tags: ["React", "Redux", "Node.js", "Socket.io"],
      liveUrl: "https://project3.example.com",
      githubUrl: "https://github.com/yourusername/project3",
    },
    {
      title: "Weather Application",
      description:
        "A weather forecast app with geolocation, daily and hourly forecasts, and animated visualizations.",
      image: "https://placehold.co/600x400/e4e4e7/666?text=Weather+App",
      tags: ["React", "OpenWeather API", "GeoLocation"],
      liveUrl: "https://project4.example.com",
      githubUrl: "https://github.com/yourusername/project4",
    },
    {
      title: "Task Management Tool",
      description:
        "A productivity application with task creation, organization, and progress tracking.",
      image: "https://placehold.co/600x400/e4e4e7/666?text=Task+Manager",
      tags: ["React", "TypeScript", "Firebase"],
      liveUrl: "https://project5.example.com",
      githubUrl: "https://github.com/yourusername/project5",
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
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          <ExternalLink size={18} className={styles.icon} />{" "}
                          Live Demo
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          <Github size={18} className={styles.icon} /> Source
                          Code
                        </a>
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

          {/* {!isMobile && (
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
          )} */}

          {/* <div className={styles.dots}>
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.dotActive : ""
                }`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
