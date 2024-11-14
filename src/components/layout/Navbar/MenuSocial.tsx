"use client";

import React from "react";
import Link from "next/link";
import { GithubLine, LinkedinLine, InstagramLine } from "../Icons";
import styles from "./MenuSocial.module.css";

export default function MenuSocial() {
  return (
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
  );
}
