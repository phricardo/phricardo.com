"use client";

import React from "react";
import Link from "next/link";
import {
  MingcuteHome1Line,
  MingcuteMailLine,
  MingcuteTerminalLine,
  MingcuteUser1Line,
  MingcuteTrophyLine,
} from "../Icons";

export default function MenuLinks({
  onClickLink,
}: {
  onClickLink?: () => void;
}) {
  return (
    <ul>
      {/* <li>
        <Link href="/" onClick={onClickLink}>
          <MingcuteHome1Line /> Início
        </Link>
      </li> */}
      <li>
        <Link href="#xp" onClick={onClickLink}>
          <MingcuteTrophyLine /> Experiências
        </Link>
      </li>
      <li>
        <Link href="#projects" onClick={onClickLink}>
          <MingcuteTerminalLine /> Projetos
        </Link>
      </li>
      {/* <li>
        <Link href="#about" onClick={onClickLink}>
          <MingcuteUser1Line /> Sobre
        </Link>
      </li>
      <li>
        <Link href="#contact" onClick={onClickLink}>
          <MingcuteMailLine /> Contato
        </Link>
      </li> */}
    </ul>
  );
}
