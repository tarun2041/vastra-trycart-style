import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Heart, Search, Zap, Package, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { items: cartItems } = useCart(false);
  const { items: tryCartItems } = useCart(true);
  const { items: wishlistItems } = useWishlist();

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-primary backdrop-blur-sm border-b border-primary-light shadow-md">
      <div className="container mx-auto px-4 py-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-brand">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Vastra Bazaar</h1>
              <p className="text-xs text-accent">Quick Commerce Fashion</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for clothes, brands, and more..."
                className="pl-10 pr-4 py-2 rounded-lg bg-white border-border focus:border-secondary shadow-sm"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* TryCart */}
            <Button
              variant="ghost"
              className="relative text-white hover:text-accent hover:bg-white/10"
              onClick={() => navigate('/trycart')}
            >
              <Zap className="w-5 h-5" />
              {tryCartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 trycart-badge text-xs shadow-glow">
                  {tryCartItems.length}
                </Badge>
              )}
              <span className="ml-2 font-semibold">TryCart</span>
            </Button>

            {/* Regular Cart */}
            <Button
              variant="ghost"
              className="relative text-white hover:text-accent hover:bg-white/10"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-secondary text-white text-xs shadow-brand">
                  {totalCartItems}
                </Badge>
              )}
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              className="relative text-white hover:text-accent hover:bg-white/10"
              onClick={() => navigate('/wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs shadow-brand">
                  {wishlistItems.length}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative text-white hover:text-accent hover:bg-white/10">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-secondary text-white">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.email}</p>
                      {isAdmin && (
                        <Badge variant="secondary" className="w-fit">Admin</Badge>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <Package className="mr-2 h-4 w-4" />
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="bg-secondary text-white hover:bg-secondary-dark"
                onClick={() => navigate('/auth/login')}
              >
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
            className="text-white/90 hover:text-white transition-all duration-300 font-medium hover:-translate-y-0.5"
          >
            Men
          </Link>
          <Link 
            to="/products/Women" 
            className="text-white/90 hover:text-white transition-all duration-300 font-medium hover:-translate-y-0.5"
          >
            Women
          </Link>
          <Link 
            to="/products/Kids" 
            className="text-white/90 hover:text-white transition-all duration-300 font-medium hover:-translate-y-0.5"
          >
            Kids
          </Link>
          <Link 
            to="/products/Accessories" 
            className="text-white/90 hover:text-white transition-all duration-300 font-medium hover:-translate-y-0.5"
          >
            Accessories
          </Link>
          <Link 
            to="/products" 
            className="text-accent hover:text-accent-light transition-all duration-300 font-bold hover:-translate-y-0.5"
          >
            Try & Buy
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
