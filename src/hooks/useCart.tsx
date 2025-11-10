import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/Product';
import { toast } from 'sonner';

export interface CartItem {
  product: Product;
  quantity: number;
}

export function useCart(isTryCart: boolean = false) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      loadLocalCart();
    }
  }, [user, isTryCart]);

  const fetchCart = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select('*, products(*)')
        .eq('user_id', user.id)
        .eq('is_try_cart', isTryCart);

      if (error) throw error;

      const transformedItems: CartItem[] = (cartItems || []).map((item: any) => ({
        product: transformProductFromDB(item.products),
        quantity: item.quantity,
      }));

      setItems(transformedItems);
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const loadLocalCart = () => {
    const storageKey = isTryCart ? 'try-cart' : 'cart';
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading local cart:', error);
      }
    }
  };

  const saveLocalCart = (cartItems: CartItem[]) => {
    const storageKey = isTryCart ? 'try-cart' : 'cart';
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  };

  const addToCart = useCallback(async (product: Product, quantity: number = 1) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: product.id,
            quantity,
            is_try_cart: isTryCart,
          }, {
            onConflict: 'user_id,product_id,is_try_cart',
          });

        if (error) throw error;
        await fetchCart();
        toast.success(`${product.name} added to ${isTryCart ? 'TryCart' : 'cart'}`);
      } catch (error: any) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add to cart');
      }
    } else {
      const existingItem = items.find((item) => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...items, { product, quantity }];
      }

      setItems(newItems);
      saveLocalCart(newItems);
      toast.success(`${product.name} added to ${isTryCart ? 'TryCart' : 'cart'}`);
    }
  }, [user, items, isTryCart]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .eq('is_try_cart', isTryCart);

        if (error) throw error;
        await fetchCart();
        toast.success('Item removed from cart');
      } catch (error: any) {
        console.error('Error removing from cart:', error);
        toast.error('Failed to remove from cart');
      }
    } else {
      const newItems = items.filter((item) => item.product.id !== productId);
      setItems(newItems);
      saveLocalCart(newItems);
      toast.success('Item removed from cart');
    }
  }, [user, items, isTryCart]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .eq('is_try_cart', isTryCart);

        if (error) throw error;
        await fetchCart();
      } catch (error: any) {
        console.error('Error updating quantity:', error);
        toast.error('Failed to update quantity');
      }
    } else {
      const newItems = items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      setItems(newItems);
      saveLocalCart(newItems);
    }
  }, [user, items, isTryCart]);

  const clearCart = useCallback(async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('is_try_cart', isTryCart);

        if (error) throw error;
        setItems([]);
        toast.success('Cart cleared');
      } catch (error: any) {
        console.error('Error clearing cart:', error);
        toast.error('Failed to clear cart');
      }
    } else {
      setItems([]);
      saveLocalCart([]);
      toast.success('Cart cleared');
    }
  }, [user, isTryCart]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return {
    items,
    loading,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
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
