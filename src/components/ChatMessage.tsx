import { ProductGrid } from "@/components/ProductGrid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
}

interface ChatMessageProps {
  type: "user" | "assistant";
  message: string;         // Puede venir en Markdown
  products?: Product[];
  closing?: string;        // También admite Markdown
  timestamp: Date;
}

export const ChatMessage = ({
  type,
  message,
  products,
  closing,
  timestamp,
}: ChatMessageProps) => {
  if (type === "user") {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3">
          <p className="text-sm">{message}</p>
          <span className="text-xs opacity-70 mt-1 block">
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-8">
      <div className="max-w-[95%] w-full">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-md px-6 py-4">
          {/* Mensaje (Markdown) */}
          <ReactMarkdown
            className="prose prose-lg dark:prose-invert max-w-none mb-4"
            remarkPlugins={[remarkGfm]}
            // Abrir enlaces en nueva pestaña
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {message}
          </ReactMarkdown>

          {/* Productos */}
          {products && products.length > 0 && (
            <div className="mb-4">
              <ProductGrid products={products} isLoading={false} />
            </div>
          )}

          {/* Mensaje de cierre (Markdown) */}
          {closing && (
            <ReactMarkdown
              className="prose prose-lg dark:prose-invert max-w-none mb-4"
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            >
              {closing}
            </ReactMarkdown>
          )}

          {/* Hora */}
          <span className="text-xs text-muted-foreground block">
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    </div>
  );
};
