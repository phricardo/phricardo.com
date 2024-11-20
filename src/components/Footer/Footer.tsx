"use client";

import Link from "next/link";
import DeveloperBadge from "../DeveloperBadge/DeveloperBadge";
import {
  InstagramLine,
  MingcuteFoldersLine,
  MingcuteTrophyLine,
  LinkedinLine,
  MingcuteTerminalLine,
  GithubLine,
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
              <h1>Menu</h1>
              <ul>
                <li>
                  <Link href="#xp">
                    <MingcuteTrophyLine /> Experiências
                  </Link>
                </li>
                {/* <li>
                  <Link href="#projects">
                    <MingcuteFoldersLine /> Projetos
                  </Link>
                </li> */}
                <li>
                  <Link href="#skills">
                    <MingcuteTerminalLine /> Habilidades
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
                    <LinkedinLine /> LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.github.com/phricardo/"
                    target="_blank"
                  >
                    <GithubLine /> Github
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Ícones: MingCute Icon - Apache 2.0</p>
        <p>
          &copy; {new Date().getFullYear()} phricardo.com. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
