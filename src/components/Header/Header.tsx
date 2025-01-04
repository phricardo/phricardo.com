"use client";

import React from "react";
import Image from "next/image";
import { Motion } from "../motion";
import { Navbar } from "../Navbar/Navbar";
import { IGitHubUser } from "@/functions/fetchGitHubUser";
import TypingEffect from "../TypingEffect/TypingEffect";
import DeveloperBadge from "../DeveloperBadge/DeveloperBadge";
import { LogosAngular, LogosJava, LogosReact, LogosTypescript } from "../Icons";
import styles from "./Header.module.css";

const skills = [
  { name: "Java", icon: <LogosJava /> },
  { name: "React Js", icon: <LogosReact /> },
  { name: "TypeScript", icon: <LogosTypescript /> },
  { name: "Angular 2+", icon: <LogosAngular /> },
];

export default function Header({
  user,
}: {
  user: IGitHubUser | null | undefined;
}) {
  const intervalSeconds = 10;
  const texts = [
    "Brazilian Software Developer",
    "Fullstack Developer",
    "Frontend / Backend Developer",
  ];

  return (
    <header className={styles.header}>
      <Navbar />

      <Motion
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={`container ${styles.header_wrapper}`}>
          {skills.map((skill, index) => (
            <Motion
              as="div"
              className={styles.floatSkill}
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
            >
              <div className={styles.contentCard}>{skill.icon}</div>
            </Motion>
          ))}

          <div className={styles.highlight}>
            <DeveloperBadge user={user} />
            <div>
              <h1 className={styles.title}>
                <Motion
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  depuro.
                </Motion>
                <Motion
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <span>logo existo.</span>
                </Motion>
              </h1>

              <p className={styles.description}>
                <Image
                  alt=""
                  src="/assets/images/flags/brazil.png"
                  height="20"
                  width="20"
                />{" "}
                <TypingEffect texts={texts} intervalSeconds={intervalSeconds} />
              </p>
            </div>
          </div>

          {/* Stars */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={styles.star}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </Motion>
    </header>
  );
}
