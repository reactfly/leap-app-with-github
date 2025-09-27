import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Clock, ChefHat, Package } from 'lucide-react';
import backend from '~backend/client';
import type { OrderDetails } from '~backend/orders/get_order';

const statusIcons = {
  pending: Clock,
  preparing: ChefHat,
  ready: Package,
  completed: CheckCircle,
};

const statusColors = {
  pending: 'text-yellow-500',
  preparing: 'text-blue-500',
  ready: 'text-orange-500',
  completed: 'text-green-500',
};

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => backend.orders.getOrder({ id: parseInt(id!) }),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Order not found</h2>
          <p className="text-gray-600">The order you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
  const statusColor = statusColors[order.status as keyof typeof statusColors];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
              <StatusIcon className={`w-8 h-8 ${statusColor}`} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order #{order.id}</h1>
            <p className="text-gray-600 capitalize">Status: <span className={`font-semibold ${statusColor}`}>{order.status}</span></p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Information</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p><span className="font-medium">Name:</span> {order.customer_name}</p>
                {order.customer_email && (
                  <p><span className="font-medium">Email:</span> {order.customer_email}</p>
                )}
                {order.customer_phone && (
                  <p><span className="font-medium">Phone:</span> {order.customer_phone}</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{item.pasta_type_name} with {item.sauce_name}</h3>
                      <span className="text-lg font-bold">${item.item_price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                    {item.ingredients.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Ingredients:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.ingredients.map((ingredient, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-orange-500">${order.total_price.toFixed(2)}</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Order placed on {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
