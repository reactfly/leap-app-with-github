import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Clock, Truck, Star, Search, Filter, Heart, Plus, Minus, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import backend from '~backend/client';
import { useCart } from '../context/CartContext';
import CartModal from '../components/CartModal';
import MonteSeuMacarrao from '../components/MonteSeuMacarrao';

export default function DeliveryMenuPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMonteSeuMacarraoOpen, setIsMonteSeuMacarraoOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  const { data: pastaTypes, isLoading: pastaLoading } = useQuery({
    queryKey: ['pasta-types'],
    queryFn: () => backend.pastaTypes.list(),
  });

  const { data: sauces, isLoading: saucesLoading } = useQuery({
    queryKey: ['sauces'],
    queryFn: () => backend.sauces.list(),
  });

  const { data: ingredients, isLoading: ingredientsLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => backend.ingredients.list(),
  });

  const categories = [
    { id: 'all', name: 'Todos', icon: '🍝' },
    { id: 'classic', name: 'Clássicas', icon: '⭐' },
    { id: 'premium', name: 'Premium', icon: '👑' },
    { id: 'vegetarian', name: 'Especiais', icon: '🥬' },
  ];

  const filteredPastaTypes = pastaTypes?.filter(pasta => {
    const matchesSearch = pasta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pasta.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pasta.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (pastaType: any, sauce: any, selectedIngredients: any[]) => {
    addToCart({
      pasta_type: pastaType,
      sauce: sauce,
      ingredients: selectedIngredients,
      quantity: 1,
    });
  };

  if (pastaLoading || saucesLoading || ingredientsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando cardápio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header estilo iFood */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-gray-700">Entregar em</span>
                <span className="text-sm font-semibold text-gray-900">São Paulo, SP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">25-30 min</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-red-500">
                <Heart className="w-4 h-4 mr-1" />
                Favoritos
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="bg-red-500 text-white hover:bg-red-600 border-red-500"
              >
                <Truck className="w-4 h-4 mr-1" />
                Ver Carrinho
              </Button>
            </div>
          </div>
          
          {/* Barra de busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar massas, molhos ou ingredientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-base border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Cardápio Fetuccine
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Massas italianas autênticas entregues na sua casa. 
            Monte sua combinação perfeita e receba em até 30 minutos.
          </p>
          
          <Button 
            onClick={() => setIsMonteSeuMacarraoOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-8"
          >
            <ChefHat className="w-6 h-6 mr-3" />
            Monte seu Macarrão Personalizado
          </Button>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white text-gray-700 hover:bg-red-50 border-gray-300'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Grid - estilo iFood */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPastaTypes?.map((pastaType) => (
            <Card key={pastaType.id} className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Imagem do prato */}
              <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center relative">
                <span className="text-6xl">🍝</span>
                {pastaType.popular && (
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                    Popular
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-bold text-gray-900">{pastaType.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">4.8</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{pastaType.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-500">R$ {pastaType.price.toFixed(2)}</span>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {pastaType.category === 'premium' ? 'Premium' : pastaType.category === 'vegetarian' ? 'Especial' : 'Clássica'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Molhos Populares */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Molhos Populares:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {sauces?.filter(sauce => sauce.popular).slice(0, 4).map((sauce) => (
                        <Button
                          key={sauce.id}
                          variant="outline"
                          size="sm"
                          className="text-xs justify-start hover:bg-red-50 hover:border-red-300"
                          onClick={() => handleAddToCart(pastaType, sauce, [])}
                        >
                          {sauce.name}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">+ {sauces?.length - 4} outros molhos</p>
                  </div>

                  {/* Botão de Adicionar */}
                  <Button
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3"
                    onClick={() => {
                      const defaultSauce = sauces?.find(s => s.popular) || sauces?.[0];
                      if (defaultSauce) {
                        handleAddToCart(pastaType, defaultSauce, []);
                      }
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção de Estatísticas */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Nosso Cardápio Completo</h2>
            <p className="text-red-100 text-lg">Variedade e qualidade em cada prato</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{pastaTypes?.length || 0}</div>
              <div className="text-red-100">Tipos de Massa</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{sauces?.length || 0}</div>
              <div className="text-red-100">Molhos Artesanais</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{ingredients?.length || 0}</div>
              <div className="text-red-100">Ingredientes Frescos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-red-100">Combinações Possíveis</div>
            </div>
          </div>
        </div>

        {/* Informações de Delivery */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Informações de Delivery</h2>
            <p className="text-lg text-gray-600">Tudo que você precisa saber sobre nossa entrega</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tempo de Entrega</h3>
              <p className="text-gray-600">25-30 minutos em média. Pedidos preparados na hora com ingredientes frescos.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Área de Cobertura</h3>
              <p className="text-gray-600">Entregamos em toda a região metropolitana. Verifique sua localização no checkout.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Taxa de Entrega</h3>
              <p className="text-gray-600">Delivery grátis para pedidos acima de R$ 30. Taxa de R$ 5 para pedidos menores.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Monte seu Macarrão Modal */}
      <Dialog open={isMonteSeuMacarraoOpen} onOpenChange={setIsMonteSeuMacarraoOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Monte seu Macarrão</DialogTitle>
          </DialogHeader>
          <MonteSeuMacarrao onClose={() => setIsMonteSeuMacarraoOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}