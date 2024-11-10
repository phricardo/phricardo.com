"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "../CoursesCarousel/EmblaCarousel";
import { MingcuteFoldersLine } from "../Icons";
import styles from "./ProjectsSection.module.css";

const SLIDES = [
  {
    title: "Project Name",
    src: "/assets/images/01.webp",
    build: "http://phricardo.com/",
    repo: "https://github.com/",
  },
  {
    title: "Project Name",
    src: "/assets/images/01.webp",
    build: "http://phricardo.com/",
    repo: "https://github.com/",
  },
  {
    title: "Project Name",
    src: "/assets/images/01.webp",
    build: "http://phricardo.com/",
    repo: "https://github.com/",
  },
  {
    title: "Project Name",
    src: "/assets/images/01.webp",
    build: "http://phricardo.com/",
    repo: "https://github.com/",
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

        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </section>
  );
}
