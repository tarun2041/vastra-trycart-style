import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/Product';
import { toast } from 'sonner';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform database products to match Product type
      const transformedProducts: Product[] = (data || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.original_price || undefined,
        discount: p.discount || undefined,
        description: p.description || '',
        category: p.category as 'Men' | 'Women' | 'Kids' | 'Accessories',
        subcategory: p.subcategory || '',
        images: p.images || (p.image_url ? [p.image_url] : []),
        rating: p.rating || 0,
        reviews: p.reviews || 0,
        stock: p.stock || 0,
        vendor: {
          id: p.vendor_id || '',
          name: p.vendor_name || 'Unknown Vendor',
        },
        offers: p.offers || [],
        isNew: p.is_new || false,
        isTrending: p.is_trending || false,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
      }));

      setProducts(transformedProducts);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, refetch: fetchProducts };
}
