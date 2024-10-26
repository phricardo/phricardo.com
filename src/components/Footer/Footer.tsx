"use client";

import Link from "next/link";
import DeveloperBadge from "../DeveloperBadge/DeveloperBadge";
import {
  InstagramLine,
  LinkedInFill,
  MingcuteHome4Fill,
  MingcuteTerminalBoxFill,
} from "../Icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer_wrapper}`}>
        <div className={styles.brand}>
          <DeveloperBadge github="phricardo" />
        </div>

        <div className={styles.footer_links}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <h1>Links</h1>
              <ul>
                <li>
                  <Link href="#home">
                    <MingcuteHome4Fill /> Início
                  </Link>
                </li>
                <li>
                  <Link href="#projects">
                    <MingcuteTerminalBoxFill /> Projetos
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.column}>
              <h1>Social</h1>
              <ul>
                <li>
                  <Link
                    href="https://www.instagram.com/phricardorj/"
                    target="_blank"
                  >
                    <InstagramLine /> Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/phricardorj/"
                    target="_blank"
                  >
                    <LinkedInFill /> LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          &copy; {new Date().getFullYear()} phricardo.com. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
