"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GithubLine } from "../Icons";
import { IGitHubUser } from "@/functions/fetchGitHubUser";
import styles from "./DeveloperBadge.module.css";

export default function DeveloperBadge({
  user,
  hexColor,
}: {
  user?: IGitHubUser | null;
  hexColor?: string;
}) {
  if (!user) return <h1>User não encontrado</h1>;
  return (
    <Link
      className={styles.badge}
      href={`https://github.com/${user.login}`}
      target="_blank"
      style={{ color: hexColor }}
    >
      <div className={styles.badge_wrapper}>
        <Image
          src={user.avatar_url}
          alt={user.name || user.login}
          width={50}
          height={50}
          className={styles.avatar}
        />
        <div>
          <h1>{user.name}</h1>
          <span>
            <GithubLine /> @{user.login}
          </span>
        </div>
      </div>
    </Link>
  );
}
