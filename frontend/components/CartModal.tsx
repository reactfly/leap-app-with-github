import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Lightbox from '@/components/ui/lightbox';
// import { IllustrativeIcon, ResponsiveIcon } from '@/components/ui/illustrative-icons';
import client from '../client';
import { useCart } from '../context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import DeliveryForm, { DeliveryData } from './DeliveryForm';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const { items, removeItem, updateQuantity } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = item.pasta_type.price + item.sauce.price + 
      item.ingredients.reduce((ingredientSum, ing) => ingredientSum + ing.price, 0);
    return sum + (itemPrice * item.quantity);
  }, 0);

  const createOrderMutation = useMutation({
    mutationFn: (orderData: any) => client.orders.createOrder(orderData),
    onSuccess: (order) => {
      onClose();
      navigate(`/order/${order.id}`);
      toast({
        title: "Pedido realizado com sucesso!",
        description: `Pedido #${order.id} foi criado.`,
      });
    },
    onError: (error) => {
      console.error('Order creation failed:', error);
      toast({
        title: "Erro",
        description: "Falha ao realizar o pedido. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleDeliveryConfirm = (deliveryData: DeliveryData) => {
    const orderData = {
      customer_name: deliveryData.name,
      customer_email: deliveryData.email || undefined,
      customer_phone: deliveryData.phone || undefined,
      delivery_address: deliveryData.address,
      delivery_notes: deliveryData.notes,
      estimated_time: deliveryData.estimatedTime,
      items: items.map(item => ({
        pasta_type_id: item.pasta_type.id,
        sauce_id: item.sauce.id,
        ingredient_ids: item.ingredients.map(ing => ing.id),
        quantity: item.quantity,
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  if (items.length === 0) {
    return (
      <Lightbox
        isOpen={isOpen}
        onClose={onClose}
        title="Seu Carrinho"
        size="md"
        header={
          <div className="flex items-center text-xl font-bold">
            <span className="mr-2 text-red-500">🛒</span>
            Seu Carrinho
          </div>
        }
      >
        <div className="p-6 text-center">
          <span className="text-6xl mx-auto mb-4 block">🛒</span>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Carrinho vazio</h3>
          <p className="text-gray-500 mb-4">Adicione itens ao seu carrinho para continuar</p>
          <Button onClick={onClose} variant="outline">
            Continuar comprando
          </Button>
        </div>
      </Lightbox>
    );
  }

  return (
    <>
      <Lightbox
        isOpen={isOpen}
        onClose={onClose}
        title="Seu Carrinho"
        size="lg"
        className="max-h-[90vh]"
        header={
          <div className="flex items-center text-xl font-bold">
            <span className="mr-2 text-red-500">🛒</span>
            Seu Carrinho
            <span className="ml-2 bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
              {items.reduce((sum, item) => sum + item.quantity, 0)} itens
            </span>
          </div>
        }
        footer={
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-orange-500">R$ {totalPrice.toFixed(2)}</span>
            </div>

            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-lg py-4 font-semibold"
              onClick={() => setIsDeliveryOpen(true)}
            >
              <span className="mr-2">🚚</span>
              Finalizar Pedido
            </Button>
          </div>
        }
      >
        <div className="p-6">
          <div className="space-y-4">
            {items.map((item, index) => {
              const itemPrice = item.pasta_type.price + item.sauce.price + 
                item.ingredients.reduce((sum, ing) => sum + ing.price, 0);
              
              return (
                <div key={index} className="border rounded-lg p-4 space-y-3 bg-white shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <h4 className="font-semibold text-base">{item.pasta_type.name}</h4>
                      <p className="text-sm text-gray-600">com molho {item.sauce.name}</p>
                      {item.ingredients.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Ingredientes:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.ingredients.map((ing, ingIndex) => (
                              <span 
                                key={ingIndex}
                                className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                              >
                                {ing.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        className="p-2"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="p-2"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="font-bold text-base">R$ {(itemPrice * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Lightbox>
      
      <DeliveryForm
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
        onConfirm={handleDeliveryConfirm}
        totalPrice={totalPrice}
        items={items}
      />
    </>
  );
}