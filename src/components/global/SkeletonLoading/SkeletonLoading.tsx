"use client";

import React from "react";
import styles from "./SkeletonLoading.module.css";

export function SkeletonLoading() {
  return (
    <div className={`${styles.skeletonItem} ${styles.skeletonAnimation}`}></div>
  );
}
