"use client";

import React from "react";
import Image from "next/image";
import { Motion } from "../motion";
import { Navbar } from "../Navbar/Navbar";
import TypingEffect from "../TypingEffect/TypingEffect";
import DeveloperBadge from "../DeveloperBadge/DeveloperBadge";
import { LogosAngular, LogosJava, LogosReact, LogosTypescript } from "../Icons";
import styles from "./Header.module.css";

export default function Header() {
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
          <div className={styles.floatSkill}>
            <div className={styles.contentCard}>
              <LogosJava />
            </div>
          </div>
          <div className={styles.floatSkill}>
            <div className={styles.contentCard}>
              <LogosReact />
            </div>
          </div>
          <div className={styles.floatSkill}>
            <div className={styles.contentCard}>
              <LogosAngular />
            </div>
          </div>
          <div className={styles.floatSkill}>
            <div className={styles.contentCard}>
              <LogosTypescript />
            </div>
          </div>

          <div className={styles.highlight}>
            <DeveloperBadge github="phricardo" />
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
        </div>
      </Motion>
    </header>
  );
}
