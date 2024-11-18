"use client";

import React from "react";
import { Motion } from "../motion";
import { MingcuteFoldersLine } from "../Icons";
import { EmblaOptionsType } from "embla-carousel";
import ProjectsCarousel from "../ProjectsCarousel/ProjectsCarousel";
import styles from "./ProjectsSection.module.css";

const SLIDES = [
  {
    title: "PetLoveTag!",
    thumbnail: "/assets/images/projects/p1.webp",
    build: "https://petlovetag.com/",
    repo: "",
  },
  {
    title: "integra.cefetrj",
    thumbnail: "/assets/images/projects/p2.webp",
    build: "https://integra-cefetrj.phricardo.com/",
    repo: "https://github.com/phricardo/integra.cefetrj",
  },
  {
    title: "ListVideo",
    thumbnail: "/assets/images/projects/p3.webp",
    build: "http://listvideo.phricardo.com/",
    repo: "",
  },
  {
    title: "MockEcomm API",
    thumbnail: "/assets/images/projects/p4.webp",
    build: "",
    repo: "https://github.com/phricardo/mockecomm-api",
  },
];

const OPTIONS: EmblaOptionsType = { align: "start" };

export default function ProjectsSection() {
  return (
    <Motion
      as="section"
      id="projects"
      className={styles.projects}
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container">
        <h1 className={`title`}>
          <MingcuteFoldersLine /> Projetos
        </h1>
        <ProjectsCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </Motion>
  );
}
