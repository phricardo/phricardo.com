"use client";

import Link from "next/link";
import DeveloperBadge from "../../global/DeveloperBadge/DeveloperBadge";
import {
  InstagramLine,
  MingcuteHome1Line,
  MingcuteTerminalLine,
  MingcuteUser1Line,
  MingcuteMailLine,
  MingcuteTrophyLine,
  LinkedinLine,
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
                  <Link href="#home">
                    <MingcuteHome1Line /> Início
                  </Link>
                </li>
                {/* <li>
                  <Link href="#about">
                    <MingcuteUser1Line /> Sobre
                  </Link>
                </li> */}
                <li>
                  <Link href="#xp">
                    <MingcuteTrophyLine /> Experiências
                  </Link>
                </li>
                <li>
                  <Link href="#projects">
                    <MingcuteTerminalLine /> Projetos
                  </Link>
                </li>
                {/* <li>
                  <Link href="#contact">
                    <MingcuteMailLine /> Contato
                  </Link>
                </li> */}
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
