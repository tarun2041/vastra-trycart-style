import { useOrders } from '@/hooks/useOrders';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Package, Truck, CheckCircle, Clock, User, Phone, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const statusConfig = {
  order_processing: {
    label: 'Order Processing',
    icon: Clock,
    color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  },
  shipped: {
    label: 'Shipped',
    icon: Package,
    color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    icon: Truck,
    color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle,
    color: 'bg-green-500/10 text-green-700 dark:text-green-400',
  },
};

export default function AdminOrders() {
  const { isChecking } = useAdminCheck();
  const { orders, loading, updateOrderStatus } = useOrders(true);

  if (isChecking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Order Management</h1>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {orders.length} Total Orders
          </Badge>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No orders yet
            </h2>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.order_processing;
              const StatusIcon = status.icon;

              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <User className="h-4 w-4" />
                          <span>{order.profiles?.name || order.profiles?.email}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={status.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                        <Select
                          value={order.status}
                          onValueChange={(value) => updateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="order_processing">Order Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex gap-4">
                        {order.products?.images?.[0] && (
                          <img
                            src={order.products.images[0]}
                            alt={order.products.name}
                            className="h-24 w-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {order.products?.name || 'Product'}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Quantity: {order.quantity}
                          </p>
                          <p className="text-lg font-bold text-primary mt-2">
                            ₹{order.total_price.toLocaleString()}
                          </p>
                          {order.is_try_order && (
                            <Badge variant="secondary" className="mt-2">
                              TryCart Order
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {order.address && (
                          <div className="flex gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Delivery Address:</p>
                              <p className="text-muted-foreground">
                                {typeof order.address === 'string' 
                                  ? order.address 
                                  : JSON.stringify(order.address)}
                              </p>
                            </div>
                          </div>
                        )}
                        {order.payment_method && (
                          <div className="text-sm">
                            <span className="font-medium">Payment:</span>{' '}
                            <span className="text-muted-foreground">{order.payment_method}</span>
                          </div>
                        )}
                        {order.tracking_number && (
                          <div className="text-sm">
                            <span className="font-medium">Tracking:</span>{' '}
                            <span className="text-muted-foreground">{order.tracking_number}</span>
                          </div>
                        )}
                        {order.notes && (
                          <div className="text-sm">
                            <span className="font-medium">Notes:</span>{' '}
                            <span className="text-muted-foreground">{order.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
