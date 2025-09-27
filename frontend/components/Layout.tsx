import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { IconWithCounter, ResponsiveIcon } from '@/components/ui/illustrative-icons';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Fetuccine</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-medium"
              >
                Início
              </Link>
              <Link
                to="/menu"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-medium"
              >
                Cardápio
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-medium"
              >
                Sobre
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-medium"
              >
                Contato
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <span className="text-red-500">📍</span>
                  <span>São Paulo, SP</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-500">⏰</span>
                  <span>25-30 min</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="relative bg-red-500 text-white hover:bg-red-600 border-red-500"
                onClick={() => setIsCartOpen(true)}
              >
                <span className="mr-2">🛒</span>
                <span className="hidden sm:inline">Carrinho</span>
              </Button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="relative bg-red-500 text-white hover:bg-red-600 border-red-500"
                onClick={() => setIsCartOpen(true)}
              >
                <span>🛒</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

            {isMenuOpen && (
              <div className="md:hidden py-3 border-t border-gray-200 bg-white">
                <nav className="flex flex-col space-y-2">
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-red-50 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Início
                  </Link>
                  <Link
                    to="/menu"
                    className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-red-50 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cardápio
                  </Link>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-red-50 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sobre
                  </Link>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-red-50 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contato
                  </Link>
                </nav>
              </div>
            )}
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold">Fetuccine</span>
              </div>
              <p className="text-gray-400 text-base mb-6 max-w-md">
                Massas italianas autênticas entregues na sua casa. 
                Tradição italiana com a conveniência do delivery moderno.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <MapPin className="w-4 h-4 mr-2" />
                  São Paulo, SP
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Clock className="w-4 h-4 mr-2" />
                  25-30 min
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Delivery</h3>
              <div className="space-y-2 text-gray-400">
                <p>Entregamos em toda a região</p>
                <p>Tempo médio: 25-30 minutos</p>
                <p>Delivery grátis acima de R$ 30</p>
                <p>WhatsApp: (11) 98765-4321</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Horários</h3>
              <div className="space-y-2 text-gray-400">
                <p>Segunda - Quinta: 11h - 22h</p>
                <p>Sexta - Sábado: 11h - 23h</p>
                <p>Domingo: 12h - 21h</p>
                <p>Delivery até 30 min antes</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Restaurante Fetuccine. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
