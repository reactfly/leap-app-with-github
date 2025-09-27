import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Layout from './components/Layout';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import { CartProvider } from './context/CartContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark">
            <Layout>
              <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
              </Routes>
            </Layout>
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}
