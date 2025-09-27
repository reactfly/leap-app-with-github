import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Truck, Star, Search, Filter, Heart, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com busca - estilo iFood */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Entregar em</span>
              <span className="text-sm font-semibold text-gray-900">São Paulo, SP</span>
            </div>
            <Button variant="ghost" size="sm" className="text-red-500">
              <Heart className="w-4 h-4 mr-1" />
              Favoritos
            </Button>
          </div>
          
          {/* Barra de busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar restaurantes, pratos ou bebidas"
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

      {/* Hero Section - estilo iFood */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Massas Italianas
              <span className="block text-yellow-300">Entregues na Sua Casa</span>
            </h1>
            <p className="text-lg lg:text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Tradição italiana com a conveniência do delivery. 
              Pedidos entregues em até 30 minutos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-500 hover:bg-gray-100 text-lg px-8 py-4 font-semibold">
                <Link to="/menu">
                  Ver Cardápio Completo
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-500 text-lg px-8 py-4">
                <Link to="/about">
                  Sobre o Restaurante
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Destaques - estilo iFood */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Destaques do Dia</h2>
            <Button variant="ghost" className="text-red-500">
              Ver todos
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card de Destaque 1 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-6xl">🍝</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">Penne Alfredo</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">Massa tubular com molho cremoso de queijo parmesão</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-red-500">R$ 16,98</span>
                  <Badge className="bg-green-100 text-green-700">Popular</Badge>
                </div>
              </div>
            </div>

            {/* Card de Destaque 2 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-6xl">🥬</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">Espaguete Integral</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.6</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">Massa integral saudável com molho marinara</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-red-500">R$ 14,98</span>
                  <Badge className="bg-green-100 text-green-700">Saudável</Badge>
                </div>
              </div>
            </div>

            {/* Card de Destaque 3 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">👑</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">Fettuccine Premium</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">Massa larga com molho truffle premium</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-red-500">R$ 23,98</span>
                  <Badge className="bg-purple-100 text-purple-700">Premium</Badge>
                </div>
              </div>
            </div>

            {/* Card de Destaque 4 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-6xl">🌶️</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">Arrabbiata Picante</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.7</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">Molho de tomate picante com pimentões</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-red-500">R$ 15,98</span>
                  <Badge className="bg-red-100 text-red-700">Picante</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios - estilo iFood */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher o Fetuccine?</h2>
            <p className="text-lg text-gray-600">Qualidade e conveniência em cada pedido</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Pedidos entregues em até 30 minutos. Preparo na hora com ingredientes frescos.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">Massas artesanais e ingredientes selecionados. Tradição italiana preservada.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery Especializado</h3>
              <p className="text-gray-600">Equipe treinada para entregar suas massas na temperatura perfeita.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Informações de Delivery - estilo iFood */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tempo de Entrega</h3>
                <p className="text-red-100">25-30 minutos em média</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Área de Cobertura</h3>
                <p className="text-red-100">Toda a região metropolitana</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Taxa de Entrega</h3>
                <p className="text-red-100">Grátis acima de R$ 30</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - estilo iFood */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para pedir?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Monte sua massa perfeita e receba em casa em até 30 minutos
          </p>
          <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-lg px-8 py-4">
            <Link to="/menu">
              Fazer Pedido Agora
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}