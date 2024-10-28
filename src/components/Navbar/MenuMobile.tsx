"use client";

import React from "react";
import Link from "next/link";
import {
  MingcuteHome1Line,
  MingcuteMailLine,
  MingcuteMenuLine,
  MingcuteTerminalLine,
  MingcuteUser1Line,
} from "../Icons";
import styles from "./MenuMobile.module.css";

export default function MenuMobile() {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className={styles.menu_wrapper}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`${styles.button} ${isMenuOpen ? styles.activated : ""}`}
      >
        <MingcuteMenuLine />
      </button>

      <div className={styles.menu} ref={menuRef}>
        {isMenuOpen && (
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MingcuteHome1Line /> Início
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/sobre" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MingcuteUser1Line /> Sobre
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/projetos" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MingcuteTerminalLine /> Projetos
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/contato" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MingcuteMailLine /> Contato
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
