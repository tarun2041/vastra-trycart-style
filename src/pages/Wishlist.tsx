import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';

export default function Wishlist() {
  const { items, loading } = useWishlist();
  const { addToCart } = useCart(false);

  const handleMoveToCart = async (product: any) => {
    await addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">My Wishlist</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Save items you love for later!
            </p>
            <Button asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <div className="mt-3">
                    <Button
                      className="w-full"
                      onClick={() => handleMoveToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Move to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
