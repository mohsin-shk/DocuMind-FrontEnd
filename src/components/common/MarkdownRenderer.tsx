import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-4 text-2xl font-bold">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mb-3 text-xl font-semibold">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mb-2 text-lg font-semibold">
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p className="mb-3 leading-7">
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul className="mb-3 list-disc pl-5">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="mb-3 list-decimal pl-5">
            {children}
          </ol>
        ),

        code: ({ children }) => (
          <code className="rounded bg-muted px-1 py-0.5 text-sm">
            {children}
          </code>
        ),

        blockquote: ({ children }) => (
          <blockquote className="border-l-2 pl-4 italic text-muted-foreground">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}