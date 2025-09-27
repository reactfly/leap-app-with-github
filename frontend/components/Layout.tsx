import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Fetuccine</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
              >
                Cardápio
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
              >
                Sobre
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
              >
                Contato
              </Link>
              <Button variant="outline" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </nav>

            <div className="md:hidden flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-orange-200 bg-white/95 backdrop-blur-sm">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-orange-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cardápio
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-orange-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-orange-50"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold">Fetuccine</span>
              </div>
              <p className="text-gray-400">
                Massas italianas autênticas, feitas frescas diariamente com os melhores ingredientes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
              <div className="space-y-2 text-gray-400">
                <p>Rua das Massas, 123</p>
                <p>Centro, São Paulo - SP</p>
                <p>Telefone: (11) 1234-5678</p>
                <p>Email: info@fetuccine.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Horários</h3>
              <div className="space-y-2 text-gray-400">
                <p>Segunda - Quinta: 11h - 22h</p>
                <p>Sexta - Sábado: 11h - 23h</p>
                <p>Domingo: 12h - 21h</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Restaurante Fetuccine. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
