import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, Zap, Heart, Package, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { useWishlist } from '@/hooks/useWishlist';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders } = useOrders(false);
  const { items: wishlistItems } = useWishlist();

  const stats = {
    totalOrders: orders.length,
    tryCartUsed: orders.filter(o => o.is_try_order).length,
    wishlistItems: wishlistItems.length,
    totalSpent: orders.reduce((sum, order) => sum + order.total_price, 0),
  };

  const recentOrders = orders.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Dashboard - Vastra Bazaar</title>
        <meta name="description" content="Manage your account, orders, and preferences." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.email?.split('@')[0]}!</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-lift">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{stats.totalOrders}</h3>
              <p className="text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{stats.tryCartUsed}</h3>
              <p className="text-muted-foreground">TryCart Used</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{stats.wishlistItems}</h3>
              <p className="text-muted-foreground">Wishlist Items</p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1">₹{stats.totalSpent}</h3>
              <p className="text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No orders yet</p>
              ) : (
                <>
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">{order.quantity} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.total_price}</p>
                        <Badge 
                          className={
                            order.status === 'delivered' ? 'bg-success text-success-foreground' :
                            order.status === 'shipped' || order.status === 'out_for_delivery' ? 'bg-primary text-primary-foreground' :
                            'bg-secondary text-secondary-foreground'
                          }
                        >
                          {order.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => navigate('/orders')}>
                    View All Orders
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* TryCart History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                TryCart Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Experience TryCart</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Try up to 5 clothes at home before buying
                </p>
                <Button className="trycart-button">Start Trying</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="p-6 h-auto flex-col hover-lift" onClick={() => navigate('/orders')}>
              <ShoppingBag className="w-6 h-6 mb-2" />
              View Orders
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col hover-lift" onClick={() => navigate('/wishlist')}>
              <Heart className="w-6 h-6 mb-2" />
              Wishlist
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col hover-lift" onClick={() => navigate('/products')}>
              <ShoppingBag className="w-6 h-6 mb-2" />
              Browse Products
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col hover-lift" onClick={() => navigate('/trycart')}>
              <Zap className="w-6 h-6 mb-2" />
              TryCart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;