import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Clock, Truck, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import backend from '~backend/client';
import { useCart } from '../context/CartContext';
import CartModal from '../components/CartModal';

export default function DeliveryMenuPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    { id: 'vegetarian', name: 'Vegetarianas', icon: '🥬' },
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando cardápio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header com informações de delivery */}
      <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">Entregamos em toda a região</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Tempo médio: 25-30 min</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Delivery grátis acima de R$ 30</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Ver Carrinho
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Cardápio Delivery
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Massas italianas autênticas entregues na sua casa. 
            Monte sua combinação perfeita e receba em até 30 minutos.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar massas, molhos ou ingredientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-base"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

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
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-orange-50'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPastaTypes?.map((pastaType) => (
            <Card key={pastaType.id} className="bg-white/80 backdrop-blur-sm shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-bold text-gray-900">{pastaType.name}</CardTitle>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {pastaType.category === 'premium' ? 'Premium' : pastaType.category === 'vegetarian' ? 'Vegetariana' : 'Clássica'}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm">{pastaType.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-2xl font-bold text-orange-500">R$ {pastaType.price.toFixed(2)}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Sauce Selection */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Escolha o Molho:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {sauces?.slice(0, 4).map((sauce) => (
                        <Button
                          key={sauce.id}
                          variant="outline"
                          size="sm"
                          className="text-xs justify-start"
                          onClick={() => handleAddToCart(pastaType, sauce, [])}
                        >
                          {sauce.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Combinations */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Combinações Populares:</h4>
                    <div className="space-y-2">
                      {sauces?.slice(0, 2).map((sauce) => (
                        <Button
                          key={sauce.id}
                          variant="outline"
                          size="sm"
                          className="w-full justify-between"
                          onClick={() => handleAddToCart(pastaType, sauce, [])}
                        >
                          <span>{pastaType.name} + {sauce.name}</span>
                          <span className="text-orange-500 font-semibold">
                            R$ {(pastaType.price + sauce.price).toFixed(2)}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Add Button */}
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => {
                      const defaultSauce = sauces?.[0];
                      if (defaultSauce) {
                        handleAddToCart(pastaType, defaultSauce, []);
                      }
                    }}
                  >
                    <Truck className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Delivery Info */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-orange-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Informações de Delivery</h2>
            <p className="text-lg text-gray-600">Tudo que você precisa saber sobre nossa entrega</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tempo de Entrega</h3>
              <p className="text-gray-600">25-30 minutos em média. Pedidos preparados na hora com ingredientes frescos.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Área de Cobertura</h3>
              <p className="text-gray-600">Entregamos em toda a região metropolitana. Verifique sua localização no checkout.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Taxa de Entrega</h3>
              <p className="text-gray-600">Delivery grátis para pedidos acima de R$ 30. Taxa de R$ 5 para pedidos menores.</p>
            </div>
          </div>
        </div>
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
