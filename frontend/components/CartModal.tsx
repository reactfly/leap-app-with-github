import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import backend from '~backend/client';
import { useCart } from '../context/CartContext';
import { useToast } from '@/components/ui/use-toast';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = item.pasta_type.price + item.sauce.price + 
      item.ingredients.reduce((ingredientSum, ing) => ingredientSum + ing.price, 0);
    return sum + (itemPrice * item.quantity);
  }, 0);

  const createOrderMutation = useMutation({
    mutationFn: (orderData: any) => backend.orders.createOrder(orderData),
    onSuccess: (order) => {
      clearCart();
      setIsCheckoutOpen(false);
      setCustomerInfo({ name: '', email: '', phone: '' });
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

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite seu nome.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      customer_name: customerInfo.name,
      customer_email: customerInfo.email || undefined,
      customer_phone: customerInfo.phone || undefined,
      items: items.map(item => ({
        pasta_type_id: item.pasta_type.id,
        sauce_id: item.sauce.id,
        ingredient_ids: item.ingredients.map(ing => ing.id),
        quantity: item.quantity,
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  if (!isOpen) return null;

  if (items.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Seu Carrinho
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Seu carrinho está vazio</p>
            <p className="text-sm text-gray-400 mt-2">Comece a montar sua massa perfeita!</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Seu Carrinho ({items.reduce((sum, item) => sum + item.quantity, 0)} itens)
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 pr-2">
            {items.map((item, index) => {
              const itemPrice = item.pasta_type.price + item.sauce.price + 
                item.ingredients.reduce((sum, ing) => sum + ing.price, 0);
              
              return (
                <div key={index} className="border rounded-lg p-4 space-y-3">
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

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center text-xl font-bold mb-4">
            <span>Total:</span>
            <span className="text-orange-500">R$ {totalPrice.toFixed(2)}</span>
          </div>

          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-base py-3"
            onClick={() => setIsCheckoutOpen(true)}
          >
            Finalizar Pedido
          </Button>
          
          <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Complete Seu Pedido</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Digite seu nome"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Digite seu email (opcional)"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Digite seu telefone (opcional)"
                  />
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-orange-500">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={createOrderMutation.isPending}
                >
                  {createOrderMutation.isPending ? 'Realizando Pedido...' : 'Realizar Pedido'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}
