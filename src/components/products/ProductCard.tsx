import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { addToCart } from '../../store/slices/cartSlice';
import { addToTryCart } from '../../store/slices/tryCartSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Zap, Heart } from 'lucide-react';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
  showTryCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showTryCart = true }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToTryCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToTryCart(product));
    toast.success(`${product.name} added to TryCart!`, {
      className: 'trycart-toast',
    });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="card-product group relative overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-success text-success-foreground text-xs">New</Badge>
            )}
            {product.isTrending && (
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-xs">
                Trending
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-destructive text-destructive-foreground text-xs">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="w-4 h-4" />
          </Button>

          {/* Action Buttons - Show on Hover */}
          <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              className="flex-1 btn-brand text-sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>
            {showTryCart && (
              <Button
                className="flex-1 trycart-button text-sm"
                onClick={handleAddToTryCart}
              >
                <Zap className="w-4 h-4 mr-1" />
                TryCart
              </Button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-foreground">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Offers */}
          {product.offers && product.offers.length > 0 && (
            <div className="text-sm text-accent font-medium">
              {product.offers[0]}
            </div>
          )}

          {/* Vendor */}
          <div className="text-xs text-muted-foreground mt-1">
            by {product.vendor.name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;