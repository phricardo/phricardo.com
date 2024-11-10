"use client";

import React from "react";
import styles from "./SkillsSection.module.css";
import {
  MingcuteTerminalLine,
  MingcuteCheckCircleFill,
  LogosJava,
  LogosReact,
  LogosTypescript,
  LogosJavascript,
  LogosHtml5,
  LogosCss3,
  LogosNodeJs,
  LogosAngular,
} from "../Icons";

export default function SkillsSection() {
  return (
    <section id="skills">
      <div className="container">
        <h1 className={`title`}>
          <MingcuteTerminalLine /> Habilidades
        </h1>

        <div className={styles.cardGroup}>
          <div>
            <span className={styles.languageName}>HTML 5</span>
            <LogosHtml5 />
          </div>
          <div>
            <span className={styles.languageName}>CSS</span>
            <LogosCss3 />
          </div>
          <div>
            <div className={styles.topSkill}>
              <span className={styles.infoHover}>Top Skill</span>
              <MingcuteCheckCircleFill />
            </div>
            <span className={styles.languageName}>JavaScript</span>
            <LogosJavascript />
          </div>
          <div>
            <div className={styles.topSkill}>
              <span className={styles.infoHover}>Top Skill</span>
              <MingcuteCheckCircleFill />
            </div>
            <span className={styles.languageName}>TypeScript</span>
            <LogosTypescript />
          </div>
          <div>
            <div className={styles.topSkill}>
              <span className={styles.infoHover}>Top Skill</span>
              <MingcuteCheckCircleFill />
            </div>
            <span className={styles.languageName}>React Js</span>
            <LogosReact />
          </div>
          <div>
            <span className={styles.languageName}>Angular 2+</span>
            <LogosAngular />
          </div>
          <div>
            <span className={styles.languageName}>Node.js</span>
            <LogosNodeJs />
          </div>
          <div>
            <div className={styles.topSkill}>
              <span className={styles.infoHover}>Top Skill</span>
              <MingcuteCheckCircleFill />
            </div>
            <span className={styles.languageName}>Java</span>
            <LogosJava />
          </div>
        </div>
      </div>
    </section>
  );
}
