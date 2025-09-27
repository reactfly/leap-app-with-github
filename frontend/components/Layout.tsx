import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="min-h-screen">
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">F</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-800">Fetuccine</span>
            </Link>

                   <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
                     <Link
                       to="/"
                       className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium text-sm lg:text-base"
                     >
                       Início
                     </Link>
                     <Link
                       to="/menu"
                       className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium text-sm lg:text-base"
                     >
                       Cardápio
                     </Link>
                     <Link
                       to="/about"
                       className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium text-sm lg:text-base"
                     >
                       Sobre
                     </Link>
                     <Link
                       to="/contact"
                       className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium text-sm lg:text-base"
                     >
                       Contato
                     </Link>
              <Button 
                variant="outline" 
                className="relative text-xs lg:text-sm px-2 lg:px-4"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Carrinho</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </nav>

            <div className="md:hidden flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="relative p-2"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
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
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

                 {isMenuOpen && (
                   <div className="md:hidden py-3 border-t border-orange-200 bg-white/95 backdrop-blur-sm">
                     <nav className="flex flex-col space-y-2">
                       <Link
                         to="/"
                         className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-orange-50 text-sm"
                         onClick={() => setIsMenuOpen(false)}
                       >
                         Início
                       </Link>
                       <Link
                         to="/menu"
                         className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-orange-50 text-sm"
                         onClick={() => setIsMenuOpen(false)}
                       >
                         Cardápio
                       </Link>
                       <Link
                         to="/about"
                         className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-orange-50 text-sm"
                         onClick={() => setIsMenuOpen(false)}
                       >
                         Sobre
                       </Link>
                       <Link
                         to="/contact"
                         className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-orange-50 text-sm"
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

      <footer className="bg-gray-900 text-white py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-lg">F</span>
                </div>
                <span className="text-lg sm:text-xl font-bold">Fetuccine</span>
              </div>
                     <p className="text-gray-400 text-sm sm:text-base">
                       Massas italianas autênticas entregues na sua casa. 
                       Tradição italiana com a conveniência do delivery moderno.
                     </p>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Delivery</h3>
              <div className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <p>Entregamos em toda a região</p>
                <p>Tempo médio: 25-30 minutos</p>
                <p>Delivery grátis acima de R$ 30</p>
                <p>WhatsApp: (11) 98765-4321</p>
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Horários de Funcionamento</h3>
              <div className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                <p>Segunda - Quinta: 11h - 22h</p>
                <p>Sexta - Sábado: 11h - 23h</p>
                <p>Domingo: 12h - 21h</p>
                <p>Delivery até 30 min antes do fechamento</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2024 Restaurante Fetuccine. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
