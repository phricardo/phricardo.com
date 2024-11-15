"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import MenuLinks from "./MenuLinks";
import MenuMobile from "./MenuMobile";
import MenuSocial from "./MenuSocial";
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
          <div className={styles.menu}>
            <MenuLinks />
            <span className={styles.divider} />
            <MenuSocial />
          </div>
        </span>
        <span className={styles.mobile}>
          <MenuMobile />
        </span>
      </div>
    </nav>
  );
}
