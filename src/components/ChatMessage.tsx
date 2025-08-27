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
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-md px-6 py-4">
          {/* Message text */}
          <div className="prose prose-lg max-w-none mb-4">
            <p className="text-[22px] font-inter font-normal leading-[100%] tracking-[0%] text-foreground m-0">
              {message}
            </p>
          </div>
          
          {/* Products */}
          {products && products.length > 0 && (
            <div className="mb-4">
              <ProductGrid products={products} isLoading={false} />
            </div>
          )}
          
          {/* Closing message */}
          {closing && (
            <div className="mb-4">
              <p className="text-[22px] font-inter font-normal leading-[100%] tracking-[0%] text-foreground m-0">
                {closing}
              </p>
            </div>
          )}
          
          {/* Timestamp */}
          <span className="text-xs text-muted-foreground block">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};