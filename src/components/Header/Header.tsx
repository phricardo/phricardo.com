"use client";

import React from "react";
import Image from "next/image";
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
      <div className={`container ${styles.header_wrapper}`}>
        <div className={styles.floatSkill}>
          <LogosJava />
        </div>
        <div className={styles.floatSkill}>
          <LogosReact />
        </div>
        <div className={styles.floatSkill}>
          <LogosAngular />
        </div>
        <div className={styles.floatSkill}>
          <LogosTypescript />
        </div>

        <div className={styles.highlight}>
          <DeveloperBadge github="phricardo" />
          <div>
            <h1 className={styles.title}>
              depuro. <span>logo existo.</span>
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
    </header>
  );
}
