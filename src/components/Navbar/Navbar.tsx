"use client";

import React from "react";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navbar_wrapper}`}>
        <h1>Logo</h1>
      </div>
    </nav>
  );
}
