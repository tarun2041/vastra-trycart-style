import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { RootState } from '../store/store';
import { setProducts } from '../store/slices/productsSlice';
import { sampleProducts } from '../data/sampleProducts';
import ProductCard from '../components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Truck, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // Load sample products
    dispatch(setProducts(sampleProducts));
  }, [dispatch]);

  const trendingProducts = products.filter(product => product.isTrending).slice(0, 4);
  const newProducts = products.filter(product => product.isNew).slice(0, 4);

  return (
    <>
      <Helmet>
        <title>Vastra Bazaar - Quick Commerce Fashion Platform</title>
        <meta name="description" content="Shop the latest fashion trends with TryCart innovation. Try before you buy with quick delivery in 10 minutes." />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-hero py-20 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Zap className="w-4 h-4 mr-2" />
                Introducing TryCart Innovation
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Fashion That
                <span className="block text-gradient-hero">Fits Perfect</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                Try up to 5 clothes at home before buying. Quick delivery in 10 minutes with our revolutionary TryCart feature.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero" asChild>
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button className="btn-hero bg-white/20 hover:bg-white/30" asChild>
                  <Link to="/trycart">
                    Try TryCart
                    <Zap className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">TryCart Innovation</h3>
                <p className="text-muted-foreground">Try up to 5 items at home</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">10 Min Delivery</h3>
                <p className="text-muted-foreground">Lightning fast delivery</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Secure Payment</h3>
                <p className="text-muted-foreground">100% safe & secure</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-dark rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-muted-foreground">Hassle-free returns</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Men', 'Women', 'Kids', 'Accessories'].map((category) => (
                <Link
                  key={category}
                  to={`/products/${category}`}
                  className="card-featured hover-lift text-center p-8 group"
                >
                  <div className="w-20 h-20 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{category[0]}</span>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        {trendingProducts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold">Trending Now</h2>
                <Button variant="outline" className="hover-lift" asChild>
                  <Link to="/products">
                    View All <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TryCart Promo Section */}
        <section className="py-20 bg-gradient-to-r from-accent to-accent-light text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Zap className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6">Experience TryCart Innovation</h2>
              <p className="text-xl mb-8 text-white/90">
                Pay just ₹1000 security amount and try up to 5 clothes at home. 
                Buy what you love, return the rest. Amount adjusted in your final bill!
              </p>
              <Button className="btn-hero bg-white/20 hover:bg-white/30" asChild>
                <Link to="/trycart">
                  Start Trying Now
                  <Zap className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        {newProducts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold">New Arrivals</h2>
                <Button variant="outline" className="hover-lift" asChild>
                  <Link to="/products">
                    Explore All <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Index;
