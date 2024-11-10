"use client";

import React from "react";
import { MingcuteFoldersLine } from "../Icons";
import { EmblaOptionsType } from "embla-carousel";
import ProjectsCarousel from "../ProjectsCarousel/ProjectsCarousel";
import styles from "./ProjectsSection.module.css";

const SLIDES = [
  {
    title: "PetLoveTag!",
    thumbnail: "/assets/images/01.webp",
    build: "https://petlovetag.com/",
    repo: "",
  },
  {
    title: "integra.cefetrj",
    thumbnail: "/assets/images/01.webp",
    build: "https://integra-cefetrj.phricardo.com/",
    repo: "https://github.com/phricardo/integra.cefetrj",
  },
  {
    title: "ListVideo",
    thumbnail: "/assets/images/01.webp",
    build: "http://listvideo.phricardo.com/",
    repo: "",
  },
  {
    title: "MockEcomm API",
    thumbnail: "/assets/images/01.webp",
    build: "",
    repo: "https://github.com/phricardo/mockecomm-api",
  },
];

const OPTIONS: EmblaOptionsType = { align: "start" };

export default function ProjectsSection() {
  return (
    <section className={styles.section} id="projects">
      <div className={`${styles.section_wrapper} container`}>
        <h1 className={`title`}>
          <MingcuteFoldersLine /> Projetos
        </h1>

        <ProjectsCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </section>
  );
}
