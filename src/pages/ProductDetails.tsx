import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { sampleProducts } from '../data/sampleProducts';
import { addToCart } from '../store/slices/cartSlice';
import { addToTryCart } from '../store/slices/tryCartSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Zap, Heart, Share, Truck } from 'lucide-react';
import { toast } from 'react-toastify';
import ProductCard from '../components/products/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const product = sampleProducts.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToTryCart = () => {
    dispatch(addToTryCart(product));
    toast.success(`${product.name} added to TryCart!`);
  };

  const relatedProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Helmet>
        <title>{product.name} - Vastra Bazaar</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden cursor-pointer hover-lift">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && (
                  <Badge className="bg-success text-success-foreground">New</Badge>
                )}
                {product.isTrending && (
                  <Badge className="btn-brand">Trending</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    {discountPercentage}% OFF
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">by {product.vendor.name}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-sm text-success font-medium">
                You save ₹{product.originalPrice ? product.originalPrice - product.price : 0}
              </p>
            </div>

            {/* Offers */}
            {product.offers && product.offers.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Available Offers</h3>
                {product.offers.map((offer, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-accent border-accent">
                      {offer}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-success' : 'bg-destructive'}`} />
              <span className="text-sm">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 btn-brand py-6 text-lg"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleAddToTryCart}
                  className="flex-1 trycart-button py-6 text-lg"
                  disabled={product.stock === 0}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Add to TryCart
                </Button>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="card-product p-4">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="w-5 h-5 text-accent" />
                <span className="font-semibold">Quick Delivery</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Get it delivered in 10 minutes with TryCart or standard delivery in 2-3 days.
              </p>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Product Description</h2>
          <div className="card-product p-6">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;