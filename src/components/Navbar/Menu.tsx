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

export default function Menu() {
  return (
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
  );
}
