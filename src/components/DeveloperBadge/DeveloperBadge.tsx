"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GithubLine } from "../Icons";
import { SkeletonLoading } from "../SkeletonLoading/SkeletonLoading";
import { fetchGitHubUser, IGitHubUser } from "@/app/functions/fetchGitHubUser";
import styles from "./DeveloperBadge.module.css";

export default function DeveloperBadge({
  github,
  hexColor,
}: {
  github: string;
  hexColor?: string;
}) {
  const [user, setUser] = React.useState<IGitHubUser | null>(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const data = await fetchGitHubUser(github);
      setUser(data);
    };
    loadUser();
  }, [github]);

  if (!user)
    return (
      <div className={styles.badge}>
        <SkeletonLoading />
      </div>
    );

  return (
    <Link
      className={styles.badge}
      href={`https://github.com/${github}`}
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
