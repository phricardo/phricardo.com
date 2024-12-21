"use client";

import React from "react";
import { Motion } from "../motion";
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
import styles from "./SkillsSection.module.css";
import { LogosMongoDB } from "../Icons/brands/LogosMongoDB";
import { LogosPostgreSQL } from "../Icons/brands/LogosPostgreSQL";
import { LogosNestjs } from "../Icons/brands/LogosNestjs";

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
    name: "NestJS",
    icon: <LogosNestjs />,
    isTopSkill: false,
  },
  {
    name: "Mongo DB",
    icon: <LogosMongoDB />,
    isTopSkill: false,
  },
  {
    name: "PostgreSQL",
    icon: <LogosPostgreSQL />,
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
  // {
  //   name: "HTML 5",
  //   icon: <LogosHtml5 />,
  //   isTopSkill: false,
  // },
  // {
  //   name: "CSS",
  //   icon: <LogosCss3 />,
  //   isTopSkill: false,
  // },
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
              as="div"
              className={styles.card}
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
            >
              {skill.isTopSkill && (
                <div className={styles.topSkill}>
                  <span className={styles.infoHover}>Top Skill</span>
                  <MingcuteCheckCircleFill />
                </div>
              )}
              {skill.icon}
              <span className={styles.languageName}>{skill.name}</span>
            </Motion>
          ))}
        </div>
      </div>
    </Motion>
  );
}
