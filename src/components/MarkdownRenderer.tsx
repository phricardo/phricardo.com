import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "@/components/CodeBlock";
import styles from "./MarkdownRenderer.module.css";
import { ReactNode } from "react";

interface MarkdownRendererProps {
  content: string;
}

const getNodeText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    const maybeProps = (node as { props?: { children?: ReactNode } }).props;
    return getNodeText(maybeProps?.children ?? "");
  }

  return "";
};

const createHeadingId = (children: ReactNode): string => {
  const text = getNodeText(children).trim().toLowerCase();
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s/g, "-");
};

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => (
  <div className={styles.markdown}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ className, children }) {
          const isInline = !className;
          if (isInline) {
            return <CodeBlock>{children}</CodeBlock>;
          }
          return <CodeBlock className={className}>{children}</CodeBlock>;
        },
        h1({ children }) {
          return <h1 id={createHeadingId(children)}>{children}</h1>;
        },
        h2({ children }) {
          return <h2 id={createHeadingId(children)}>{children}</h2>;
        },
        h3({ children }) {
          return <h3 id={createHeadingId(children)}>{children}</h3>;
        },
        h4({ children }) {
          return <h4 id={createHeadingId(children)}>{children}</h4>;
        },
        h5({ children }) {
          return <h5 id={createHeadingId(children)}>{children}</h5>;
        },
        h6({ children }) {
          return <h6 id={createHeadingId(children)}>{children}</h6>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

export default MarkdownRenderer;
