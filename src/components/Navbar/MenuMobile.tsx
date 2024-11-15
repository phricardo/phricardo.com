"use client";

import React from "react";
import MenuLinks from "./MenuLinks";
import { MingcuteMenuLine } from "../Icons";
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
        {isMenuOpen && <MenuLinks onClickLink={() => setIsMenuOpen(false)} />}
      </div>
    </div>
  );
}
