"use client";

import React from "react";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navbar_wrapper}`}>
        <div className={styles.branding}>
          <h1>phricardo</h1>
        </div>
        <span className={styles.desktop}>
          <Menu />
        </span>
        <span className={styles.mobile}>
          <MenuMobile />
        </span>
      </div>
    </nav>
  );
}
