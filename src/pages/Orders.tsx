import { useOrders } from '@/hooks/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
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

export default function Orders() {
  const { orders, loading } = useOrders(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No orders yet
            </h2>
            <p className="text-muted-foreground">
              Start shopping to see your orders here
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.order_processing;
              const StatusIcon = status.icon;

              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Placed {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      <Badge className={status.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
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
                        {order.tracking_number && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Tracking: {order.tracking_number}
                          </p>
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
