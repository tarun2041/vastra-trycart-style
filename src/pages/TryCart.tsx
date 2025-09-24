import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { RootState } from '../store/store';
import { removeFromTryCart, clearTryCart, paySecurityAmount } from '../store/slices/tryCartSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Trash2, ShoppingCart, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const TryCart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, maxItems, securityAmount, isPaid } = useSelector((state: RootState) => state.tryCart);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromTryCart(productId));
    toast.info('Item removed from TryCart');
  };

  const handleMoveToCart = (productId: string) => {
    const item = items.find(item => item.product.id === productId);
    if (item) {
      dispatch(addToCart(item.product));
      dispatch(removeFromTryCart(productId));
      toast.success('Item moved to regular cart!');
    }
  };

  const handlePaySecurity = () => {
    dispatch(paySecurityAmount());
    toast.success('Security amount paid! Your items will be delivered shortly.');
  };

  const handleClearTryCart = () => {
    dispatch(clearTryCart());
    toast.info('TryCart cleared');
  };

  const totalValue = items.reduce((sum, item) => sum + item.product.price, 0);

  return (
    <>
      <Helmet>
        <title>TryCart - Vastra Bazaar</title>
        <meta name="description" content="Try up to 5 clothes at home before buying. Revolutionary TryCart experience." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent-light rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">TryCart Innovation</h1>
              <p className="text-muted-foreground">Try before you buy - Revolutionary fashion experience</p>
            </div>
          </div>

          {/* TryCart Status */}
          <div className="flex items-center gap-4">
            <Badge className="trycart-badge text-lg px-4 py-2">
              {items.length}/{maxItems} slots used
            </Badge>
            {isPaid ? (
              <Badge className="bg-success text-success-foreground text-lg px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Security Paid
              </Badge>
            ) : (
              <Badge variant="outline" className="text-lg px-4 py-2">
                Security Pending
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* TryCart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your TryCart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Add up to {maxItems} items to try at home before buying
                  </p>
                  <Button className="btn-brand" asChild>
                    <Link to="/products">Start Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Items to Try ({items.length})</h2>
                  <Button variant="outline" onClick={handleClearTryCart}>
                    Clear All
                  </Button>
                </div>

                {items.map((item) => (
                  <Card key={item.product.id} className="hover-lift">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            by {item.product.vendor.name}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">₹{item.product.price}</span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ₹{item.product.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMoveToCart(item.product.id)}
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              Move to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleRemoveItem(item.product.id)}
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* TryCart Summary */}
          <div className="space-y-6">
            {/* How TryCart Works */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  How TryCart Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <p>Add up to 5 items to your TryCart</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                  <p>Pay security amount of ₹{securityAmount}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  <p>Try clothes at home for 24 hours</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                  <p>Keep what you love, return the rest</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                  <p>Security adjusted in final bill</p>
                </div>
              </CardContent>
            </Card>

            {/* TryCart Summary */}
            {items.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>TryCart Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Items to try:</span>
                    <span className="font-semibold">{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total value:</span>
                    <span className="font-semibold">₹{totalValue}</span>
                  </div>
                  <div className="flex justify-between text-accent font-semibold">
                    <span>Security amount:</span>
                    <span>₹{securityAmount}</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    {!isPaid ? (
                      <div className="space-y-3">
                        <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-accent mt-0.5" />
                          <p className="text-sm text-accent">
                            Pay security amount to get your items delivered in 10 minutes
                          </p>
                        </div>
                        <Button 
                          className="w-full trycart-button py-6"
                          onClick={handlePaySecurity}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Security ₹{securityAmount}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-2 text-success">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Security amount paid!</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Your items will be delivered in 10 minutes
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TryCart;