"use client";

import React from "react";

type TypingEffectProps = {
  texts: string[];
  intervalSeconds: number;
};

export default function TypingEffect({
  texts,
  intervalSeconds,
}: TypingEffectProps) {
  const [pause, setPause] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [isCursorVisible, setIsCursorVisible] = React.useState(true);

  React.useEffect(() => {
    const fullText = texts[currentTextIndex];
    const typingSpeed = 100;

    if (pause) return;

    const typeInterval = setInterval(() => {
      if (!isDeleting && displayedText.length < fullText.length) {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(fullText.slice(0, displayedText.length - 1));
      } else if (!isDeleting && displayedText.length === fullText.length) {
        clearInterval(typeInterval);
        setPause(true);
        setTimeout(() => setPause(false), intervalSeconds * 1000);
        setTimeout(() => setIsDeleting(true), intervalSeconds * 1000);
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [
    displayedText,
    isDeleting,
    currentTextIndex,
    texts,
    intervalSeconds,
    pause,
  ]);

  React.useEffect(() => {
    const cursorBlinkInterval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorBlinkInterval);
  }, []);

  return (
    <React.Fragment>
      <span>{displayedText}</span>
      <span>{isCursorVisible ? "|" : ""}</span>
    </React.Fragment>
  );
}
