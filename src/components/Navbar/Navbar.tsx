"use client";

import React from "react";
import Link from "next/link";
import {
  MingcuteHome1Line,
  MingcuteMailLine,
  MingcuteTerminalLine,
  MingcuteUser1Line,
} from "../Icons";

import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navbar_wrapper}`}>
        <div className={styles.branding}>
          <h1>phricardo.com</h1>
        </div>

        <div className={styles.menu}>
          <ul>
            <li>
              <Link href="">
                <MingcuteHome1Line /> Início
              </Link>
            </li>
            <li>
              <Link href="">
                <MingcuteUser1Line /> Sobre
              </Link>
            </li>
            <li>
              <Link href="">
                <MingcuteTerminalLine /> Projetos
              </Link>
            </li>
            <li>
              <Link href="#">
                <MingcuteMailLine /> Contato
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
