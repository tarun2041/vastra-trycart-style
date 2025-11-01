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

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-hero py-24 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent text-accent-foreground shadow-glow border-0">
                <Zap className="w-4 h-4 mr-2" />
                Introducing TryCart Innovation
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                Fashion That
                <span className="block text-accent mt-2">Fits Perfect</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto font-medium">
                Try up to 5 clothes at home before buying. Quick delivery in 10 minutes with our revolutionary TryCart feature.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-accent text-base" size="lg" asChild>
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-base" size="lg" asChild>
                  <Link to="/trycart">
                    Try TryCart
                    <Zap className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-glow transition-all duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">TryCart Innovation</h3>
                <p className="text-muted-foreground text-sm">Try up to 5 items at home</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-brand transition-all duration-300">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">10 Min Delivery</h3>
                <p className="text-muted-foreground text-sm">Lightning fast delivery</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-md transition-all duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
                <p className="text-muted-foreground text-sm">100% safe & secure</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-accent-dark rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-glow transition-all duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
                <p className="text-muted-foreground text-sm">Hassle-free returns</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Men', 'Women', 'Kids', 'Accessories'].map((category) => (
                <Link
                  key={category}
                  to={`/products/${category}`}
                  className="card-featured text-center p-8 group"
                >
                  <div className="w-20 h-20 bg-secondary rounded-lg mx-auto mb-4 flex items-center justify-center shadow-md group-hover:shadow-brand transition-all duration-300">
                    <span className="text-2xl font-bold text-white">{category[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-secondary transition-colors">
                    {category}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        {trendingProducts.length > 0 && (
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-bold">Trending Now</h2>
                <Button variant="outline" asChild>
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
        <section className="py-24 bg-accent-section text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Zap className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience TryCart Innovation</h2>
              <p className="text-xl md:text-2xl mb-10 text-white/90 font-medium">
                Pay just ₹1000 security amount and try up to 5 clothes at home. 
                Buy what you love, return the rest. Amount adjusted in your final bill!
              </p>
              <Button className="bg-white text-accent hover:bg-white/90 text-base shadow-lg" size="lg" asChild>
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
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-bold">New Arrivals</h2>
                <Button variant="outline" asChild>
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
