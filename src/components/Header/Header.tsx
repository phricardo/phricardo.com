"use client";

import React from "react";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Navbar />
      <div className={`container ${styles.header_wrapper}`}>
        <h1>Olá Mundo!</h1>
      </div>
    </header>
  );
}
