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
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.menu_wrapper}>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen((prev) => !prev);
        }}
        className={`${styles.button} ${isMenuOpen ? styles.activated : ""}`}
      >
        <MingcuteMenuLine />
      </button>

      <div className={styles.menu} ref={menuRef}>
        {isMenuOpen && (
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <MingcuteHome1Line /> Início
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/sobre" onClick={() => setIsMenuOpen(false)}>
                <MingcuteUser1Line /> Sobre
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/projetos" onClick={() => setIsMenuOpen(false)}>
                <MingcuteTerminalLine /> Projetos
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/contato" onClick={() => setIsMenuOpen(false)}>
                <MingcuteMailLine /> Contato
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
