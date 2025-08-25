interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  link: string;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-[800px]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-muted rounded-lg mb-3"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-3"></div>
            <div className="h-9 bg-muted rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  // Limit to maximum 4 products
  const displayProducts = products.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-[800px]">
      {displayProducts.map((product) => (
        <div 
          key={product.id}
          className="group border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          {/* Square Image */}
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>
          
          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-medium text-base leading-tight mb-2 line-clamp-2 text-foreground">
              {product.title}
            </h3>
            <p className="text-lg font-semibold text-foreground mb-3">
              {product.price}
            </p>
            <a
              href={product.link}
              className="inline-flex items-center justify-center w-full h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              aria-label={`View details for ${product.title}`}
            >
              View Details
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};