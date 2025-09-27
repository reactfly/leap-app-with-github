import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Clock, ChefHat, Package } from 'lucide-react';
import client from "../client";
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
    queryFn: () => client.orders.getOrder({ id: parseInt(id!) }),
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
          <h2 className="text-2xl font-bold text-red-600 mb-4">Pedido não encontrado</h2>
          <p className="text-gray-600">O pedido que você está procurando não existe.</p>
        </div>
      </div>
    );
  }

  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
  const statusColor = statusColors[order.status as keyof typeof statusColors];

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 mb-3 sm:mb-4`}>
              <StatusIcon className={`w-6 h-6 sm:w-8 sm:h-8 ${statusColor}`} />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Pedido #{order.id}</h1>
            <p className="text-sm sm:text-base text-gray-600 capitalize">Status: <span className={`font-semibold ${statusColor}`}>{order.status}</span></p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Informações do Cliente</h2>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-base"><span className="font-medium">Nome:</span> {order.customer_name}</p>
                {order.customer_email && (
                  <p className="text-sm sm:text-base"><span className="font-medium">Email:</span> {order.customer_email}</p>
                )}
                {order.customer_phone && (
                  <p className="text-sm sm:text-base"><span className="font-medium">Telefone:</span> {order.customer_phone}</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Itens do Pedido</h2>
              <div className="space-y-3 sm:space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg pr-2">{item.pasta_type_name} com {item.sauce_name}</h3>
                      <span className="text-sm sm:text-base lg:text-lg font-bold">R$ {item.item_price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">Quantidade: {item.quantity}</p>
                    {item.ingredients.length > 0 && (
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Ingredientes:</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {item.ingredients.map((ingredient, index) => (
                            <span 
                              key={index}
                              className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-orange-100 text-orange-700 text-xs sm:text-sm rounded-full"
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

            <div className="border-t pt-4 sm:pt-6">
              <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                <span>Total:</span>
                <span className="text-orange-500">R$ {order.total_price.toFixed(2)}</span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                Pedido realizado em {new Date(order.created_at).toLocaleDateString('pt-BR')} às {new Date(order.created_at).toLocaleTimeString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
