import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Check, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '../context/CartContext';
import backend from '~backend/client';

interface MonteSeuMacarraoProps {
  onClose: () => void;
}

type Step = 'pasta' | 'sauce' | 'ingredients' | 'review';

export default function MonteSeuMacarrao({ onClose }: MonteSeuMacarraoProps) {
  const [currentStep, setCurrentStep] = useState<Step>('pasta');
  const [selectedPasta, setSelectedPasta] = useState<any>(null);
  const [selectedSauce, setSelectedSauce] = useState<any>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();

  const { data: pastaTypes, isLoading: pastaTypesLoading } = useQuery({
    queryKey: ['pastaTypes'],
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

  const handleIngredientToggle = (ingredient: any) => {
    setSelectedIngredients(prev => {
      const isSelected = prev.find(item => item.id === ingredient.id);
      if (isSelected) {
        return prev.filter(item => item.id !== ingredient.id);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const handleNext = () => {
    if (currentStep === 'pasta' && selectedPasta) {
      setCurrentStep('sauce');
    } else if (currentStep === 'sauce' && selectedSauce) {
      setCurrentStep('ingredients');
    } else if (currentStep === 'ingredients') {
      setCurrentStep('review');
    }
  };

  const handleBack = () => {
    if (currentStep === 'sauce') {
      setCurrentStep('pasta');
    } else if (currentStep === 'ingredients') {
      setCurrentStep('sauce');
    } else if (currentStep === 'review') {
      setCurrentStep('ingredients');
    }
  };

  const handleAddToCart = () => {
    if (selectedPasta && selectedSauce) {
      addToCart({
        pasta_type: selectedPasta,
        sauce: selectedSauce,
        ingredients: selectedIngredients,
        quantity: quantity
      });
      onClose();
    }
  };

  const getTotalPrice = () => {
    if (!selectedPasta || !selectedSauce) return 0;
    
    const pastaPrice = selectedPasta.price;
    const saucePrice = selectedSauce.price;
    const ingredientsPrice = selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);
    
    return (pastaPrice + saucePrice + ingredientsPrice) * quantity;
  };

  const canProceed = () => {
    if (currentStep === 'pasta') return selectedPasta;
    if (currentStep === 'sauce') return selectedSauce;
    if (currentStep === 'ingredients') return true;
    return false;
  };

  if (pastaTypesLoading || saucesLoading || ingredientsLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Carregando opções...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Monte seu Macarrão</h2>
        <p className="text-gray-600">Crie sua combinação perfeita passo a passo</p>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mt-6 space-x-4">
          {[
            { key: 'pasta', label: '1. Massa', icon: '🍝' },
            { key: 'sauce', label: '2. Molho', icon: '🍅' },
            { key: 'ingredients', label: '3. Ingredientes', icon: '🥬' },
            { key: 'review', label: '4. Revisar', icon: '✅' }
          ].map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep === step.key 
                  ? 'bg-red-500 border-red-500 text-white' 
                  : ['pasta', 'sauce', 'ingredients', 'review'].indexOf(currentStep) > index
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 text-gray-500'
              }`}>
                {['pasta', 'sauce', 'ingredients', 'review'].indexOf(currentStep) > index ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep === step.key ? 'text-red-500' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
              {index < 3 && (
                <div className="w-8 h-0.5 bg-gray-300 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 'pasta' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Escolha seu tipo de massa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastaTypes?.map((pasta) => (
                <Card 
                  key={pasta.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedPasta?.id === pasta.id 
                      ? 'ring-2 ring-red-500 bg-red-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPasta(pasta)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{pasta.name}</CardTitle>
                    <p className="text-sm text-gray-600">{pasta.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-red-500">R$ {pasta.price.toFixed(2)}</span>
                      {selectedPasta?.id === pasta.id && (
                        <Check className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'sauce' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Escolha seu molho</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sauces?.map((sauce) => (
                <Card 
                  key={sauce.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedSauce?.id === sauce.id 
                      ? 'ring-2 ring-red-500 bg-red-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedSauce(sauce)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{sauce.name}</CardTitle>
                    <p className="text-sm text-gray-600">{sauce.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-red-500">R$ {sauce.price.toFixed(2)}</span>
                      {selectedSauce?.id === sauce.id && (
                        <Check className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'ingredients' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Adicionar ingredientes (opcional)</h3>
            
            {/* Proteínas */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Proteínas</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ingredients?.filter(ing => ing.category === 'protein').map((ingredient) => (
                  <Card 
                    key={ingredient.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedIngredients.find(ing => ing.id === ingredient.id)
                        ? 'ring-2 ring-red-500 bg-red-50' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleIngredientToggle(ingredient)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h5 className="font-medium text-sm mb-2">{ingredient.name}</h5>
                        <p className="text-red-500 font-bold">R$ {ingredient.price.toFixed(2)}</p>
                        {ingredient.popular && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Vegetais */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Vegetais</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ingredients?.filter(ing => ing.category === 'vegetable').map((ingredient) => (
                  <Card 
                    key={ingredient.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedIngredients.find(ing => ing.id === ingredient.id)
                        ? 'ring-2 ring-red-500 bg-red-50' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleIngredientToggle(ingredient)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h5 className="font-medium text-sm mb-2">{ingredient.name}</h5>
                        <p className="text-red-500 font-bold">R$ {ingredient.price.toFixed(2)}</p>
                        {ingredient.popular && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Queijos */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Queijos</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ingredients?.filter(ing => ing.category === 'cheese').map((ingredient) => (
                  <Card 
                    key={ingredient.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedIngredients.find(ing => ing.id === ingredient.id)
                        ? 'ring-2 ring-red-500 bg-red-50' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleIngredientToggle(ingredient)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h5 className="font-medium text-sm mb-2">{ingredient.name}</h5>
                        <p className="text-red-500 font-bold">R$ {ingredient.price.toFixed(2)}</p>
                        {ingredient.popular && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 'review' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Revisar seu pedido</h3>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Sua Massa Personalizada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{selectedPasta?.name}</span>
                  <span className="text-red-500 font-bold">R$ {selectedPasta?.price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium">Molho {selectedSauce?.name}</span>
                  <span className="text-red-500 font-bold">R$ {selectedSauce?.price.toFixed(2)}</span>
                </div>
                
                {selectedIngredients.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2">Ingredientes adicionais:</h5>
                    {selectedIngredients.map((ingredient) => (
                      <div key={ingredient.id} className="flex justify-between items-center ml-4">
                        <span className="text-sm">{ingredient.name}</span>
                        <span className="text-sm text-red-500">R$ {ingredient.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Quantidade:</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-red-500">R$ {getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={currentStep === 'pasta' ? onClose : handleBack}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 'pasta' ? 'Cancelar' : 'Voltar'}
        </Button>
        
        {currentStep !== 'review' ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center bg-red-500 hover:bg-red-600"
          >
            Continuar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="flex items-center bg-green-500 hover:bg-green-600"
          >
            Adicionar ao Carrinho
            <Plus className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
