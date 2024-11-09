"use client";

import React from "react";
import { Navbar } from "../Navbar/Navbar";
import DeveloperBadge from "@/components/global/DeveloperBadge/DeveloperBadge";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Navbar />
      <div className={`container ${styles.header_wrapper}`}>
        <div className={styles.highlight}>
          <DeveloperBadge github="phricardo" />
          <div>
            <h1 className={styles.title}>
              depuro. <span>logo existo.</span>
            </h1>
            <p>Frontend / Backend Developer_</p>
          </div>
        </div>
      </div>
    </header>
  );
}
