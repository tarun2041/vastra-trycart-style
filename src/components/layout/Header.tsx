import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, User, Search, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: tryCartItems } = useSelector((state: RootState) => state.tryCart);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container mx-auto px-4 py-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-brand">Vastra Bazaar</h1>
              <p className="text-xs text-muted-foreground">Quick Commerce Fashion</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for clothes, brands, and more..."
                className="pl-10 pr-4 py-2 rounded-xl border-border/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* TryCart */}
            <Button
              variant="ghost"
              className="relative hover-lift"
              onClick={() => navigate('/trycart')}
            >
              <Zap className="w-5 h-5 text-accent" />
              {tryCartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 trycart-badge text-xs">
                  {tryCartItems.length}
                </Badge>
              )}
              <span className="ml-2 font-semibold text-accent">TryCart</span>
            </Button>

            {/* Regular Cart */}
            <Button
              variant="ghost"
              className="relative hover-lift"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 btn-brand text-xs">
                  {totalCartItems}
                </Badge>
              )}
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" className="hover-lift">
              <Heart className="w-5 h-5" />
            </Button>

            {/* User Account */}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="hover-lift"
                onClick={() => navigate('/dashboard')}
              >
                <User className="w-5 h-5" />
                <span className="ml-2">{user?.name}</span>
              </Button>
            ) : (
              <Button className="btn-brand">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-center space-x-8">
          <Link 
            to="/products/Men" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Men
          </Link>
          <Link 
            to="/products/Women" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Women
          </Link>
          <Link 
            to="/products/Kids" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Kids
          </Link>
          <Link 
            to="/products/Accessories" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Accessories
          </Link>
          <Link 
            to="/products" 
            className="text-accent hover:text-accent-dark transition-colors font-semibold"
          >
            Try & Buy
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;