"use client";

import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import MenuMobile from "./MenuMobile";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navbar_wrapper}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="./assets/logo.svg"
            alt="phricado"
            layout="fill"
            objectFit="contain"
          />
        </Link>
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
