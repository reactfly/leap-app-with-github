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
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
          Bem-vindo ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Fetuccine</span>
        </h1>
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Crie seu prato de massa perfeito com nosso construtor interativo. Escolha sua massa, molho e ingredientes para uma refeição feita especialmente para você.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="xl:col-span-2 order-2 xl:order-1">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>
              <PastaBuilder />
            </Suspense>
          </ErrorBoundary>

          <div className="mt-8 sm:mt-10 lg:mt-12">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingSpinner />}>
                <MenuCategories />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        <div className="xl:col-span-1 order-1 xl:order-2">
          <div className="sticky top-20 sm:top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
