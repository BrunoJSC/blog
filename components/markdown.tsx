import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export function Markdown({
  children,
  content,
}: {
  children?: React.ReactNode;
  content: string;
}) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold" {...props} />
        ),

        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold" {...props} />
        ),

        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <code className={className} {...props}>
              {String(children).replace(/\n$/, "")}
            </code>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
