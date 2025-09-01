import { ProductGrid } from "@/components/ProductGrid";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
}

interface ChatMessageProps {
  type: "user" | "assistant";
  message: string;   // ahora admite HTML
  products?: Product[];
  closing?: string;  // también admite HTML
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

  // Sanear y parsear HTML de la IA
  const cleanHtml = DOMPurify.sanitize(message, { USE_PROFILES: { html: true } });
  const cleanClosing = closing
    ? DOMPurify.sanitize(closing, { USE_PROFILES: { html: true } })
    : null;

  // Forzar que los enlaces abran en nueva pestaña
  const withAnchorAttrs = (html: string) =>
    html.replaceAll("<a ", '<a target="_blank" rel="noopener noreferrer" ');

  return (
    <div className="flex justify-start mb-8">
      <div className="max-w-[95%] w-full">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-md px-6 py-4">
          {/* Mensaje (HTML seguro) */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
            {parse(withAnchorAttrs(cleanHtml))}
          </div>

          {/* Productos */}
          {products && products.length > 0 && (
            <div className="mb-4">
              <ProductGrid products={products} isLoading={false} />
            </div>
          )}

          {/* Mensaje de cierre (HTML seguro) */}
          {cleanClosing && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
              {parse(withAnchorAttrs(cleanClosing))}
            </div>
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
