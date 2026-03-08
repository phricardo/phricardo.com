import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { CSSProperties, ReactNode } from "react";
import styles from "./CodeBlock.module.css";

const matrixTheme: { [key: string]: CSSProperties } = {
  'code[class*="language-"]': {
    color: "#39ff14",
    fontFamily: "var(--font-mono)",
    fontSize: "0.85em",
    lineHeight: "1.6",
  },
  'pre[class*="language-"]': {
    color: "#39ff14",
    fontFamily: "var(--font-mono)",
    fontSize: "0.85em",
    lineHeight: "1.6",
    padding: "1.25em",
    margin: "1.5em 0",
    overflow: "auto",
    borderRadius: "0.5rem",
    background: "#0a0f0a",
    border: "1px solid #1a3a1a",
  },
  comment: { color: "#2d6b2d", fontStyle: "italic" },
  prolog: { color: "#2d6b2d" },
  doctype: { color: "#2d6b2d" },
  cdata: { color: "#2d6b2d" },
  punctuation: { color: "#30a830" },
  property: { color: "#00ff41" },
  tag: { color: "#00ff41" },
  boolean: { color: "#7fff00" },
  number: { color: "#7fff00" },
  constant: { color: "#7fff00" },
  symbol: { color: "#7fff00" },
  deleted: { color: "#ff3333" },
  selector: { color: "#39ff14" },
  "attr-name": { color: "#39ff14" },
  string: { color: "#90ee90" },
  char: { color: "#90ee90" },
  builtin: { color: "#90ee90" },
  inserted: { color: "#90ee90" },
  operator: { color: "#30a830" },
  entity: { color: "#30a830" },
  url: { color: "#30a830" },
  atrule: { color: "#00ff41" },
  "attr-value": { color: "#00ff41" },
  keyword: { color: "#00ff41", fontWeight: "bold" },
  function: { color: "#7fff00" },
  "class-name": { color: "#7fff00" },
  regex: { color: "#90ee90" },
  important: { color: "#00ff41", fontWeight: "bold" },
  variable: { color: "#39ff14" },
};

interface CodeBlockProps {
  className?: string;
  children?: ReactNode;
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || "");
  const code = String(children).replace(/\n$/, "");

  if (match) {
    return (
      <SyntaxHighlighter style={matrixTheme} language={match[1]} PreTag="div">
        {code}
      </SyntaxHighlighter>
    );
  }

  return <code className={styles.inlineCode}>{children}</code>;
};

export { CodeBlock };
