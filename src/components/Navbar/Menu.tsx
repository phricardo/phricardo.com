"use client";

import React from "react";
import MenuLinks from "./MenuLinks";
import styles from "./Navbar.module.css";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <MenuLinks />
    </div>
  );
}
