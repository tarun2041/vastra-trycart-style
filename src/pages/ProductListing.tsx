import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { RootState } from '../store/store';
import { setProducts, filterByCategory, sortProducts } from '../store/slices/productsSlice';
import { sampleProducts } from '../data/sampleProducts';
import ProductCard from '../components/products/ProductCard';
import ProductFilters, { FilterState } from '../components/products/ProductFilters';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Product } from '../types/Product';

const ProductListing: React.FC = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { filteredProducts, loading, sortBy } = useSelector((state: RootState) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    categories: [],
    minRating: 0,
    inStock: false,
  });

  useEffect(() => {
    dispatch(setProducts(sampleProducts));
    if (category) {
      dispatch(filterByCategory(category as any));
    }
  }, [dispatch, category]);

  useEffect(() => {
    applyAllFilters();
  }, [filteredProducts, searchQuery, filters]);

  const applyAllFilters = () => {
    let products = [...filteredProducts];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      products = products.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    // Price filter
    products = products.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.minRating > 0) {
      products = products.filter((p) => p.rating >= filters.minRating);
    }

    // Stock filter
    if (filters.inStock) {
      products = products.filter((p) => p.stock > 0);
    }

    setDisplayProducts(products);
  };

  const handleSortChange = (value: string) => {
    dispatch(sortProducts(value as any));
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      categories: [],
      minRating: 0,
      inStock: false,
    });
    setSearchQuery('');
  };

  const categoryTitle = category || 'All Products';

  return (
    <>
      <Helmet>
        <title>{categoryTitle} - Vastra Bazaar</title>
        <meta name="description" content={`Shop ${categoryTitle.toLowerCase()} collection at Vastra Bazaar. Try before you buy with TryCart.`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{categoryTitle}</h1>
          <p className="text-muted-foreground text-lg">
            {displayProducts.length} products found
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <ProductFilters
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content - Filters + Products */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-[280px] flex-shrink-0">
            <ProductFilters
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <span className="ml-3">Loading products...</span>
              </div>
            ) : displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query.
                </p>
                <Button onClick={handleResetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;