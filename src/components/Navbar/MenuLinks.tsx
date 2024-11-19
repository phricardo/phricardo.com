"use client";

import React from "react";
import Link from "next/link";
import {
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
          <Link href="#skills" onClick={onClickLink}>
            <MingcuteTerminalLine /> Habilidades
          </Link>
        </li>
      </ul>
    </>
  );
}
