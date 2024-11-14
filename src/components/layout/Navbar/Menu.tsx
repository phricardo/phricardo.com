"use client";

import React from "react";
import Link from "next/link";
import MenuLinks from "./MenuLinks";
import { GithubLine, LinkedinLine, InstagramLine } from "../Icons";
import styles from "./Navbar.module.css";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <MenuLinks />
      <span className={styles.divider} />
      <ul className={styles.social}>
        <li>
          <Link href="https://www.instagram.com/phricardorj/" target="_blank">
            <InstagramLine />
          </Link>
        </li>
        <li>
          <Link href="https://www.linkedin.com/in/phricardorj/" target="_blank">
            <LinkedinLine />
          </Link>
        </li>
        <li>
          <Link href="https://www.github.com/phricardo/" target="_blank">
            <GithubLine />
          </Link>
        </li>
      </ul>
    </div>
  );
}
