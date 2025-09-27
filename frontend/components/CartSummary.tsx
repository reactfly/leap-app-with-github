import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import client from "../client";
import { useCart } from '../context/CartContext';
import { useToast } from '@/components/ui/use-toast';

export default function CartSummary() {
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
    mutationFn: (orderData: any) => client.orders.createOrder(orderData),
    onSuccess: (order) => {
      clearCart();
      setIsCheckoutOpen(false);
      setCustomerInfo({ name: '', email: '', phone: '' });
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

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center text-sm sm:text-base">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Seu Carrinho
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center py-6 sm:py-8">
            <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-300 mb-3 sm:mb-4" />
            <p className="text-gray-500 text-sm sm:text-base">Seu carrinho está vazio</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">Comece a montar sua massa perfeita!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center justify-between text-sm sm:text-base">
          <div className="flex items-center">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Seu Carrinho
          </div>
          <span className="text-xs sm:text-sm font-normal text-gray-500">
            {items.reduce((sum, item) => sum + item.quantity, 0)} itens
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 sm:space-y-4">
          {items.map((item, index) => {
            const itemPrice = item.pasta_type.price + item.sauce.price + 
              item.ingredients.reduce((sum, ing) => sum + ing.price, 0);
            
            return (
              <div key={index} className="border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <h4 className="font-semibold text-sm sm:text-base">{item.pasta_type.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">com molho {item.sauce.name}</p>
                    {item.ingredients.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Ingredientes:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.ingredients.map((ing, ingIndex) => (
                            <span 
                              key={ingIndex}
                              className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
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
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 sm:p-2"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                      className="p-1 sm:p-2"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="p-1 sm:p-2"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <span className="font-bold text-sm sm:text-base">R$ {(itemPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t pt-3 sm:pt-4 mt-4 sm:mt-6">
          <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
            <span>Total:</span>
            <span className="text-orange-500">R$ {totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mt-3 sm:mt-4 bg-orange-500 hover:bg-orange-600 text-sm sm:text-base py-2 sm:py-3">
              Finalizar Pedido
            </Button>
          </DialogTrigger>
          <DialogContent>
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
      </CardContent>
    </Card>
  );
}
