import { ProductGrid } from "@/components/ProductGrid";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
}

interface ChatMessageProps {
  type: 'user' | 'assistant';
  message: string;
  products?: Product[];
  closing?: string;
  timestamp: Date;
}

export const ChatMessage = ({ type, message, products, closing, timestamp }: ChatMessageProps) => {
  if (type === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3">
          <p className="text-sm">{message}</p>
          <span className="text-xs opacity-70 mt-1 block">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-8">
      <div className="max-w-[95%] w-full">
        <div className="bg-muted rounded-2xl rounded-tl-md px-6 py-4 mb-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-[18px] leading-[1.6] text-foreground m-0">
              {message}
            </p>
          </div>
          <span className="text-xs text-muted-foreground mt-2 block">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {products && products.length > 0 && (
          <div className="mt-4">
            <ProductGrid products={products} isLoading={false} />
          </div>
        )}
        
        {closing && (
          <div className="mt-4 bg-background border border-border rounded-xl px-4 py-3">
            <p className="text-sm text-foreground leading-relaxed">
              {closing}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};