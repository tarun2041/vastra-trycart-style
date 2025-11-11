import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  status: string;
  payment_method: string | null;
  payment_status: string | null;
  payment_id: string | null;
  tracking_number: string | null;
  address: any;
  notes: string | null;
  is_try_order: boolean;
  created_at: string;
  updated_at: string;
  products?: any;
  profiles?: any;
}

export function useOrders(adminView: boolean = false) {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    if (adminView && !isAdmin) return;

    try {
      setLoading(true);
      let query = supabase
        .from('orders')
        .select('*, products(*), profiles(name, email)')
        .order('created_at', { ascending: false });

      if (!adminView) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [user, isAdmin, adminView]);

  useEffect(() => {
    fetchOrders();

    // Real-time subscription for admin
    if (adminView && isAdmin) {
      const channel = supabase
        .channel('orders-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders'
          },
          () => {
            fetchOrders();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [fetchOrders, adminView, isAdmin]);

  const updateOrderStatus = useCallback(async (orderId: string, status: string) => {
    if (!isAdmin) {
      toast.error('Unauthorized');
      return;
    }

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      toast.success('Order status updated');
      fetchOrders();
    } catch (error: any) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  }, [isAdmin, fetchOrders]);

  const createOrder = useCallback(async (orderData: {
    product_id: string;
    quantity: number;
    total_price: number;
    address: any;
    payment_method: string;
    is_try_order?: boolean;
    notes?: string;
  }) => {
    if (!user) {
      toast.error('Please login to place order');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          ...orderData,
          status: 'order_processing',
          payment_status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Order placed successfully');
      fetchOrders();
      return data;
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order');
      return null;
    }
  }, [user, fetchOrders]);

  return {
    orders,
    loading,
    updateOrderStatus,
    createOrder,
    refetch: fetchOrders,
  };
}
