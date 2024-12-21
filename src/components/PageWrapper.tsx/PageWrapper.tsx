"use client";

import React from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <React.Fragment>{children}</React.Fragment>;
}
