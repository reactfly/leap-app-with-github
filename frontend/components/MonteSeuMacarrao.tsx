import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Check, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { ResponsiveIcon } from '@/components/ui/illustrative-icons';
import { useCart } from '../context/CartContext';
import client from '../client';

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
  
  const { addItem } = useCart();

  const { data: pastaTypes, isLoading: pastaTypesLoading } = useQuery({
    queryKey: ['pastaTypes'],
    queryFn: () => client.getPastaTypes(),
  });

  const { data: sauces, isLoading: saucesLoading } = useQuery({
    queryKey: ['sauces'],
    queryFn: () => client.getSauces(),
  });

  const { data: ingredients, isLoading: ingredientsLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => client.getIngredients(),
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
      addItem({
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
        <div className="flex items-center justify-center mt-6 space-x-2 md:space-x-4">
          {[
            { key: 'pasta', label: '1. Massa', icon: '🍝', description: 'Escolha o tipo' },
            { key: 'sauce', label: '2. Molho', icon: '🍅', description: 'Selecione o sabor' },
            { key: 'ingredients', label: '3. Ingredientes', icon: '🥬', description: 'Adicione extras' },
            { key: 'review', label: '4. Revisar', icon: '✅', description: 'Confirme o pedido' }
          ].map((step, index) => {
            const stepIndex = ['pasta', 'sauce', 'ingredients', 'review'].indexOf(currentStep);
            const isCompleted = stepIndex > index;
            const isCurrent = currentStep === step.key;
            const isAccessible = stepIndex >= index;
            
            return (
            <div key={step.key} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    isCurrent
                      ? 'bg-red-500 border-red-500 text-white shadow-lg scale-110' 
                      : isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                        : isAccessible
                          ? 'border-red-300 text-red-500 bg-red-50'
                          : 'border-gray-300 text-gray-500 bg-gray-100'
              }`}>
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                ) : (
                      <span className="text-lg font-bold">{index + 1}</span>
                )}
              </div>
                  <div className="text-center mt-2">
                    <span className={`text-sm font-medium block ${
                      isCurrent ? 'text-red-500' : isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
                    <span className={`text-xs ${
                      isCurrent ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </span>
                  </div>
                </div>
              {index < 3 && (
                  <div className={`w-8 h-0.5 mx-2 md:mx-4 transition-colors duration-300 ${
                    isCompleted ? 'bg-green-400' : 'bg-gray-300'
                  }`} />
              )}
            </div>
            );
          })}
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Escolha seu molho</h3>
            <p className="text-gray-600 mb-6">Selecione o molho que combina melhor com sua massa</p>
            
            {/* Resumo da escolha atual */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Sua escolha até agora:</h4>
              <div className="flex items-center space-x-4 text-sm">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  {selectedPasta?.name}
                </span>
                <span className="text-gray-400">+</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  {selectedSauce?.name || 'Escolha um molho'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sauces?.map((sauce) => (
                <Card 
                  key={sauce.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedSauce?.id === sauce.id 
                      ? 'ring-2 ring-red-500 bg-red-50 border-red-200' 
                      : 'hover:shadow-lg hover:border-red-300'
                  }`}
                  onClick={() => setSelectedSauce(sauce)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{sauce.name}</CardTitle>
                      {selectedSauce?.id === sauce.id && (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{sauce.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-red-500">R$ {sauce.price.toFixed(2)}</span>
                      <div className="flex items-center space-x-2">
                        {sauce.name === 'Alfredo' && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Cremoso</span>}
                        {sauce.name === 'Arrabbiata' && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Picante</span>}
                        {sauce.name === 'Carbonara' && <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Clássico</span>}
                        {sauce.name === 'Marinara' && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Tradicional</span>}
                        {sauce.name === 'Pesto' && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Fresco</span>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dicas de combinação */}
            {selectedPasta && selectedSauce && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Dica de combinação:</h4>
                <p className="text-sm text-blue-800">
                  {selectedPasta.name} com {selectedSauce.name} é uma combinação perfeita! 
                  {selectedPasta.name === 'Fettuccine' && selectedSauce.name === 'Alfredo' && ' A massa larga segura bem o molho cremoso.'}
                  {selectedPasta.name === 'Espaguete' && selectedSauce.name === 'Marinara' && ' A massa fina combina perfeitamente com o molho de tomate.'}
                  {selectedPasta.name === 'Penne' && selectedSauce.name === 'Arrabbiata' && ' A massa tubular é ideal para molhos encorpados.'}
                </p>
              </div>
            )}
          </div>
        )}

        {currentStep === 'ingredients' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Adicionar ingredientes (opcional)</h3>
            <p className="text-gray-600 mb-6">Escolha os ingredientes que deseja adicionar à sua massa</p>
            
            {/* Resumo da escolha atual */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Sua escolha até agora:</h4>
              <div className="flex items-center space-x-4 text-sm">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  {selectedPasta?.name}
                </span>
                <span className="text-gray-400">+</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  {selectedSauce?.name}
                </span>
                {selectedIngredients.length > 0 && (
                  <>
                    <span className="text-gray-400">+</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {selectedIngredients.length} ingrediente{selectedIngredients.length !== 1 ? 's' : ''}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {/* Proteínas */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="mr-3 text-red-500 text-2xl">🥩</span>
                <h4 className="text-lg font-semibold text-gray-900">Proteínas</h4>
                <Badge variant="outline" className="ml-2 text-xs">
                  {ingredients?.filter(ing => ing.category === 'protein').length} opções
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ingredients?.filter(ing => ing.category === 'protein').map((ingredient) => (
                  <Card 
                    key={ingredient.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedIngredients.find(ing => ing.id === ingredient.id)
                        ? 'ring-2 ring-red-500 bg-red-50 border-red-200' 
                        : 'hover:shadow-lg hover:border-red-300'
                    }`}
                    onClick={() => handleIngredientToggle(ingredient)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          selectedIngredients.find(ing => ing.id === ingredient.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {selectedIngredients.find(ing => ing.id === ingredient.id) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                        <h5 className="font-medium text-sm mb-1">{ingredient.name}</h5>
                        <p className="text-red-500 font-bold text-sm">R$ {ingredient.price.toFixed(2)}</p>
                        {ingredient.popular && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            ⭐ Popular
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
              <div className="flex items-center mb-4">
                <span className="mr-3 text-green-500 text-2xl">🥬</span>
                <h4 className="text-lg font-semibold text-gray-900">Vegetais</h4>
                <Badge variant="outline" className="ml-2 text-xs">
                  {ingredients?.filter(ing => ing.category === 'vegetable').length} opções
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ingredients?.filter(ing => ing.category === 'vegetable').map((ingredient) => (
                  <Card 
                    key={ingredient.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedIngredients.find(ing => ing.id === ingredient.id)
                        ? 'ring-2 ring-red-500 bg-red-50 border-red-200' 
                        : 'hover:shadow-lg hover:border-red-300'
                    }`}
                    onClick={() => handleIngredientToggle(ingredient)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          selectedIngredients.find(ing => ing.id === ingredient.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {selectedIngredients.find(ing => ing.id === ingredient.id) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                        <h5 className="font-medium text-sm mb-1">{ingredient.name}</h5>
                        <p className="text-red-500 font-bold text-sm">R$ {ingredient.price.toFixed(2)}</p>
                        {ingredient.popular && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            ⭐ Popular
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
              <div className="flex items-center mb-4">
                <span className="mr-3 text-yellow-500 text-2xl">🧀</span>
                <h4 className="text-lg font-semibold text-gray-900">Queijos</h4>
                <Badge variant="outline" className="ml-2 text-xs">
                  {ingredients?.filter(ing => ing.category === 'cheese').length} opções
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ingredients?.filter(ing => ing.category === 'cheese').map((ingredient) => (
                  <Card 
                    key={ingredient.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedIngredients.find(ing => ing.id === ingredient.id)
                        ? 'ring-2 ring-red-500 bg-red-50 border-red-200' 
                        : 'hover:shadow-lg hover:border-red-300'
                    }`}
                    onClick={() => handleIngredientToggle(ingredient)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          selectedIngredients.find(ing => ing.id === ingredient.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {selectedIngredients.find(ing => ing.id === ingredient.id) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                        <h5 className="font-medium text-sm mb-1">{ingredient.name}</h5>
                        <p className="text-red-500 font-bold text-sm">R$ {ingredient.price.toFixed(2)}</p>
                        {ingredient.popular && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            ⭐ Popular
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Resumo dos ingredientes selecionados */}
            {selectedIngredients.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-900 mb-2">Ingredientes selecionados:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map((ingredient) => (
                    <Badge key={ingredient.id} variant="secondary" className="bg-green-100 text-green-800">
                      {ingredient.name} (+R$ {ingredient.price.toFixed(2)})
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-green-700 mt-2">
                  Total dos ingredientes: R$ {selectedIngredients.reduce((sum, ing) => sum + ing.price, 0).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        )}

        {currentStep === 'review' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Revisar seu pedido</h3>
            <p className="text-gray-600 mb-6">Confira todos os detalhes antes de adicionar ao carrinho</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resumo do pedido */}
            <Card className="mb-6">
                <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                  <CardTitle className="text-xl flex items-center">
                    <span className="mr-2">🍝</span>
                    Sua Massa Personalizada
                  </CardTitle>
              </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-lg">{selectedPasta?.name}</span>
                      <p className="text-sm text-gray-600">{selectedPasta?.description}</p>
                    </div>
                    <span className="text-red-500 font-bold text-lg">R$ {selectedPasta?.price.toFixed(2)}</span>
                </div>
                
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <span className="font-medium text-lg">Molho {selectedSauce?.name}</span>
                      <p className="text-sm text-gray-600">{selectedSauce?.description}</p>
                    </div>
                    <span className="text-orange-500 font-bold text-lg">R$ {selectedSauce?.price.toFixed(2)}</span>
                </div>
                
                {selectedIngredients.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <h5 className="font-medium mb-3 text-green-800">Ingredientes adicionais:</h5>
                      <div className="space-y-2">
                    {selectedIngredients.map((ingredient) => (
                          <div key={ingredient.id} className="flex justify-between items-center">
                        <span className="text-sm">{ingredient.name}</span>
                            <span className="text-sm text-green-600 font-medium">+R$ {ingredient.price.toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="border-t border-green-200 pt-2 mt-2">
                          <div className="flex justify-between items-center font-medium text-green-800">
                            <span>Subtotal ingredientes:</span>
                            <span>R$ {selectedIngredients.reduce((sum, ing) => sum + ing.price, 0).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                  </div>
                )}
                </CardContent>
              </Card>

              {/* Controles e total */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quantidade e Total</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Quantidade:</span>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-10 h-10"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center text-xl font-bold">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Massa + Molho:</span>
                        <span>R$ {((selectedPasta?.price || 0) + (selectedSauce?.price || 0)).toFixed(2)}</span>
                      </div>
                      {selectedIngredients.length > 0 && (
                        <div className="flex justify-between">
                          <span>Ingredientes:</span>
                          <span>R$ {selectedIngredients.reduce((sum, ing) => sum + ing.price, 0).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Quantidade:</span>
                        <span>x{quantity}</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total:</span>
                    <span className="text-red-500">R$ {getTotalPrice().toFixed(2)}</span>
                  </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">✨ Sua combinação:</h4>
                    <p className="text-sm text-blue-800">
                      {selectedPasta?.name} com molho {selectedSauce?.name}
                      {selectedIngredients.length > 0 && (
                        <span> + {selectedIngredients.length} ingrediente{selectedIngredients.length !== 1 ? 's' : ''} extras</span>
                      )}
                    </p>
                </div>
              </CardContent>
            </Card>
            </div>
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
