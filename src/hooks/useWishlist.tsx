import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/Product';
import { toast } from 'sonner';

export function useWishlist() {
  const { user } = useAuth();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wishlists')
        .select('product_id, products(*)')
        .eq('user_id', user.id);

      if (error) throw error;

      const products: Product[] = (data || []).map((item: any) => 
        transformProductFromDB(item.products)
      );

      setItems(products);
    } catch (error: any) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const isInWishlist = useCallback((productId: string) => {
    return items.some(item => item.id === productId);
  }, [items]);

  const addToWishlist = useCallback(async (product: Product) => {
    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }

    try {
      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: user.id,
          product_id: product.id,
        });

      if (error) {
        if (error.code === '23505') {
          toast.info('Already in wishlist');
          return;
        }
        throw error;
      }

      setItems(prev => [...prev, product]);
      toast.success('Added to wishlist');
    } catch (error: any) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  }, [user]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== productId));
      toast.success('Removed from wishlist');
    } catch (error: any) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  }, [user]);

  const toggleWishlist = useCallback(async (product: Product) => {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  return {
    items,
    loading,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
  };
}

function transformProductFromDB(p: any): Product {
  return {
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
  };
}
