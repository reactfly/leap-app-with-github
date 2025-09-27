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
                Menu
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
              <Button variant="outline" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
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
                  Menu
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-orange-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-orange-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
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
                Authentic Italian pasta, made fresh daily with the finest ingredients.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>123 Pasta Street</p>
                <p>Little Italy, NY 10012</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@fetuccine.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <div className="space-y-2 text-gray-400">
                <p>Monday - Thursday: 11am - 10pm</p>
                <p>Friday - Saturday: 11am - 11pm</p>
                <p>Sunday: 12pm - 9pm</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fetuccine Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
