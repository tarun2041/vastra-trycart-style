import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { RootState } from '../store/store';
import { setProducts, filterByCategory, sortProducts } from '../store/slices/productsSlice';
import { sampleProducts } from '../data/sampleProducts';
import ProductCard from '../components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Grid, List } from 'lucide-react';

const ProductListing: React.FC = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { filteredProducts, loading, sortBy } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(setProducts(sampleProducts));
    if (category) {
      dispatch(filterByCategory(category as any));
    }
  }, [dispatch, category]);

  const handleSortChange = (value: string) => {
    dispatch(sortProducts(value as any));
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{categoryTitle}</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>
          
          {/* Sort Controls */}
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-clothes w-8 h-8" />
            <span className="ml-3">Loading products...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or browse other categories.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListing;