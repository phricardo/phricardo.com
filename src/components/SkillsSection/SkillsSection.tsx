"use client";

import React from "react";
import { Motion } from "../motion";
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

const skills = [
  {
    name: "TypeScript",
    icon: <LogosTypescript />,
    isTopSkill: true,
  },
  {
    name: "Java",
    icon: <LogosJava />,
    isTopSkill: true,
  },
  {
    name: "React Js",
    icon: <LogosReact />,
    isTopSkill: true,
  },
  {
    name: "Node.js",
    icon: <LogosNodeJs />,
    isTopSkill: false,
  },
  {
    name: "Angular 2+",
    icon: <LogosAngular />,
    isTopSkill: false,
  },
  {
    name: "JavaScript",
    icon: <LogosJavascript />,
    isTopSkill: true,
  },
  {
    name: "HTML 5",
    icon: <LogosHtml5 />,
    isTopSkill: false,
  },
  {
    name: "CSS",
    icon: <LogosCss3 />,
    isTopSkill: false,
  },
];

export default function SkillsSection() {
  return (
    <Motion
      as="section"
      id="skills"
      className={styles.projects}
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container">
        <h1 className={`title`}>
          <MingcuteTerminalLine /> Habilidades
        </h1>

        <div className={styles.cardGroup}>
          {skills.map((skill, index) => (
            <Motion
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
            >
              <div>
                {skill.isTopSkill && (
                  <div className={styles.topSkill}>
                    <span className={styles.infoHover}>Top Skill</span>
                    <MingcuteCheckCircleFill />
                  </div>
                )}
                <span className={styles.languageName}>{skill.name}</span>
                {skill.icon}
              </div>
            </Motion>
          ))}
        </div>
      </div>
    </Motion>
  );
}
