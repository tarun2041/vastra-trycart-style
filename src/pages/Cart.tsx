import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
    toast.info('Item removed from cart');
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info('Cart cleared');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const savings = items.reduce((sum, item) => {
    const originalPrice = item.product.originalPrice || item.product.price;
    return sum + ((originalPrice - item.product.price) * item.quantity);
  }, 0);

  return (
    <>
      <Helmet>
        <title>Shopping Cart - Vastra Bazaar</title>
        <meta name="description" content="Review your selected items and proceed to checkout." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">Review your items and proceed to checkout</p>
            </div>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-4">
              <Badge className="btn-brand text-lg px-4 py-2">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </Badge>
              <Button variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Add some items to get started with your shopping
                  </p>
                  <Button className="btn-brand" asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Cart Items</h2>

                {items.map((item) => (
                  <Card key={item.product.id} className="hover-lift">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Link to={`/product/${item.product.id}`}>
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-lg hover-lift cursor-pointer"
                          />
                        </Link>
                        <div className="flex-1">
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-semibold hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mb-2">
                            by {item.product.vendor.name}
                          </p>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-semibold">₹{item.product.price}</span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ₹{item.product.originalPrice}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            {/* Item Total & Remove */}
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">
                                ₹{item.product.price * item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleRemoveItem(item.product.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Order Summary</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} items):</span>
                      <span>₹{total}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-success">
                        <span>You save:</span>
                        <span>-₹{savings}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Delivery charges:</span>
                      <span className="text-success">FREE</span>
                    </div>
                    
                    <hr />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  <Button className="w-full btn-brand py-6 text-lg" asChild>
                    <Link to="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Promo Section */}
              <Card className="bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-accent mb-2">Try TryCart!</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Want to try before you buy? Add items to TryCart and try them at home.
                  </p>
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white" asChild>
                    <Link to="/trycart">Explore TryCart</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;