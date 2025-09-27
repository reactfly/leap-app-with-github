import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PastaBuilder from '../components/PastaBuilder';
import MenuCategories from '../components/MenuCategories';
import CartSummary from '../components/CartSummary';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Algo deu errado</h2>
      <p className="text-gray-600">{error.message}</p>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Bem-vindo ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Fetuccine</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Crie seu prato de massa perfeito com nosso construtor interativo. Escolha sua massa, molho e ingredientes para uma refeição feita especialmente para você.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>
              <PastaBuilder />
            </Suspense>
          </ErrorBoundary>

          <div className="mt-12">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingSpinner />}>
                <MenuCategories />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
