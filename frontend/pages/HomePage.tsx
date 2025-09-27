import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Massas Italianas
              <span className="block text-orange-500">Entregues na Sua Casa</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Massas frescas, molhos artesanais e ingredientes premium. 
              Pedidos entregues em até 30 minutos na sua região.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4">
                <Link to="/menu">
                  Fazer Pedido Agora
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link to="/about">
                  Conhecer o Restaurante
                </Link>
              </Button>
            </div>

            {/* Delivery Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 mx-auto">
                  <Truck className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
                <p className="text-gray-600 text-sm">Pedidos entregues em até 30 minutos na sua região</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 mx-auto">
                  <MapPin className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cobertura Ampliada</h3>
                <p className="text-gray-600 text-sm">Entregamos em toda a região metropolitana</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 mx-auto">
                  <Star className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualidade Premium</h3>
                <p className="text-gray-600 text-sm">Massas frescas e ingredientes selecionados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Fetuccine?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tradição italiana com a conveniência do delivery moderno
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Preparo Rápido</h3>
              <p className="text-gray-600">Massas preparadas na hora com ingredientes frescos</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Delivery Especializado</h3>
              <p className="text-gray-600">Equipe treinada para entregar suas massas perfeitas</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Receitas Autênticas</h3>
              <p className="text-gray-600">Tradição italiana preservada em cada prato</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cobertura Total</h3>
              <p className="text-gray-600">Entregamos em toda a região metropolitana</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Pronto para pedir?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Monte sua massa perfeita e receba em casa em até 30 minutos
          </p>
          <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-orange-50 text-lg px-8 py-4">
            <Link to="/menu">
              Fazer Pedido Agora
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
