import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, Zap, Heart, Package, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer' as const,
  };

  const stats = {
    totalOrders: 12,
    tryCartUsed: 5,
    wishlistItems: 8,
    totalSpent: 15640,
  };

  const recentOrders = [
    { id: '1', date: '2024-01-20', amount: 2499, status: 'Delivered', items: 2 },
    { id: '2', date: '2024-01-18', amount: 1299, status: 'Shipped', items: 1 },
    { id: '3', date: '2024-01-15', amount: 3499, status: 'Processing', items: 3 },
  ];

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
              <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Badge className="btn-brand capitalize">{user.role}</Badge>
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
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                    <p className="text-sm text-muted-foreground">{order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{order.amount}</p>
                    <Badge 
                      className={
                        order.status === 'Delivered' ? 'bg-success text-success-foreground' :
                        order.status === 'Shipped' ? 'bg-primary text-primary-foreground' :
                        'bg-secondary text-secondary-foreground'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">View All Orders</Button>
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
            <Button variant="outline" className="p-6 h-auto flex-col hover-lift">
              <ShoppingBag className="w-6 h-6 mb-2" />
              View Orders
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col hover-lift">
              <Heart className="w-6 h-6 mb-2" />
              Wishlist
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col hover-lift">
              <User className="w-6 h-6 mb-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col hover-lift">
              <Star className="w-6 h-6 mb-2" />
              Reviews
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;