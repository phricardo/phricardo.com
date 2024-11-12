"use client";

import React from "react";
import Link from "next/link";
import {
  GithubLine,
  LinkedinLine,
  InstagramLine,
  MingcuteFoldersLine,
  MingcuteTerminalLine,
  MingcuteTrophyLine,
} from "../Icons";

export default function MenuLinks({
  onClickLink,
}: {
  onClickLink?: () => void;
}) {
  return (
    <>
      <ul>
        <li>
          <Link href="#xp" onClick={onClickLink}>
            <MingcuteTrophyLine /> Experiências
          </Link>
        </li>
        <li>
          <Link href="#projects" onClick={onClickLink}>
            <MingcuteFoldersLine /> Projetos
          </Link>
        </li>
        <li>
          <Link href="#projects" onClick={onClickLink}>
            <MingcuteTerminalLine /> Habilidades
          </Link>
        </li>
      </ul>
      <span />
      <ul>
        {/* <li>
          <Link href="https://www.instagram.com/phricardorj/" target="_blank">
            <InstagramLine /> Instagram
          </Link>
        </li> */}
        <li>
          <Link href="https://www.linkedin.com/in/phricardorj/" target="_blank">
            <LinkedinLine /> LinkedIn
          </Link>
        </li>
        <li>
          <Link href="https://www.github.com/phricardo/" target="_blank">
            <GithubLine /> Github
          </Link>
        </li>
      </ul>
    </>
  );
}
