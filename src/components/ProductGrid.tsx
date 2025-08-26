interface Product {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  image: string;
  link: string;
  brand?: string;
  inStock?: boolean;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-2xl p-4 md:p-5" style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
            <div className="bg-[#F2F3F5] rounded-xl mb-3 md:mb-4" style={{ height: '200px' }}></div>
            <div className="h-3 bg-[#F2F3F5] rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-[#F2F3F5] rounded w-full mb-2"></div>
            <div className="h-4 bg-[#F2F3F5] rounded w-1/2 mb-4"></div>
            <div className="h-11 bg-[#F2F3F5] rounded-full"></div>
            <div className="h-3 bg-[#F2F3F5] rounded w-3/4 mt-3"></div>
          </div>
        ))}
      </div>
    );
  }

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log('Adding to cart:', productId);
  };

  const formatPrice = (price: string, locale = 'es-ES', currency = 'EUR') => {
    const numericPrice = parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.'));
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(numericPrice);
  };

  const calculateDiscount = (price: string, oldPrice: string) => {
    const current = parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.'));
    const old = parseFloat(oldPrice.replace(/[^\d.,]/g, '').replace(',', '.'));
    return Math.round(((old - current) / old) * 100);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <a
          key={product.id}
          href={product.link}
          className="group bg-white rounded-2xl p-4 md:p-5 cursor-pointer transition-all duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-opacity-24"
          style={{ 
            boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)';
          }}
        >
          {/* Product Image */}
          <div 
            className="bg-white border border-gray-200 rounded-xl mb-3 md:mb-4 flex items-center justify-center overflow-hidden"
            style={{ height: '200px' }}
          >
            <img
              src={product.image}
              alt={`${product.title} - ${product.brand || 'Product'} image`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-3">
            {/* Brand */}
            <p className="text-[#9AA0A6] text-base font-light capitalize">
              {(product.brand || 'Riviera blanc').toLowerCase()}
            </p>
            
            {/* Title */}
            <h3 className="text-foreground text-[17px] md:text-[18px] font-bold leading-tight line-clamp-2">
              {product.title}
            </h3>
            
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-foreground text-[16px] md:text-[17px] font-normal">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-[#9AA0A6] text-sm line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
                    -{calculateDiscount(product.price, product.oldPrice)}%
                  </span>
                </>
              )}
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={(e) => handleAddToCart(e, product.id)}
              disabled={product.inStock === false}
              className="w-full h-11 md:h-12 bg-foreground text-background font-semibold rounded-full transition-all duration-200 hover:bg-foreground/90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-opacity-24 text-sm md:text-base"
              aria-label={`Agregar ${product.title} al carrito`}
            >
              {product.inStock === false ? 'Agotado' : <span className="hidden sm:inline">Agregar al carrito</span>}
              {product.inStock !== false && <span className="sm:hidden">Agregar</span>}
            </button>
            
            {/* Shipping Info */}
            <p className="text-[#6B7280] text-xs text-center">
              <span className="hidden sm:inline">Envío en un plazo de 3 a 5 días</span>
              <span className="sm:hidden">Envío 3-5 días</span>
            </p>
          </div>
        </a>
      ))}
    </div>
  );
};