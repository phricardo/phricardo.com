"use client";

import React from "react";
import styles from "./ProjectsSection.module.css";

export default function ProjectsSection() {
  return (
    <section className={styles.section} id="projects">
      <div className={`${styles.section_wrapper} container`}>
        <h1 className={styles.title}>Projetos</h1>
      </div>
    </section>
  );
}
