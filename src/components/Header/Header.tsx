"use client";

import React from "react";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Navbar />
      <div className={`container ${styles.header_wrapper}`}>
        <div className={styles.highlight}>
          <h1 className={styles.title}>
            depuro. <span>logo existo.</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
