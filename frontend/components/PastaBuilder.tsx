import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import backend from '~backend/client';
import type { PastaType } from '~backend/menu/list_pasta_types';
import type { Sauce } from '~backend/menu/list_sauces';
import type { Ingredient } from '~backend/menu/list_ingredients';
import { useCart } from '../context/CartContext';
import { useToast } from '@/components/ui/use-toast';

export default function PastaBuilder() {
  const [step, setStep] = useState(1);
  const [selectedPasta, setSelectedPasta] = useState<PastaType | null>(null);
  const [selectedSauce, setSelectedSauce] = useState<Sauce | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data: pastaTypes, isLoading: loadingPasta } = useQuery({
    queryKey: ['pasta-types'],
    queryFn: () => backend.menu.listPastaTypes(),
  });

  const { data: sauces, isLoading: loadingSauces } = useQuery({
    queryKey: ['sauces'],
    queryFn: () => backend.menu.listSauces(),
  });

  const { data: ingredients, isLoading: loadingIngredients } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => backend.menu.listIngredients({ category: undefined }),
  });

  const handleIngredientToggle = (ingredient: Ingredient) => {
    setSelectedIngredients(prev => {
      const isSelected = prev.some(i => i.id === ingredient.id);
      if (isSelected) {
        return prev.filter(i => i.id !== ingredient.id);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const addToCart = () => {
    if (!selectedPasta || !selectedSauce) return;
    
    addItem({
      pasta_type: selectedPasta,
      sauce: selectedSauce,
      ingredients: selectedIngredients,
      quantity: 1,
    });

    toast({
      title: "Added to cart!",
      description: `${selectedPasta.name} with ${selectedSauce.name} sauce`,
    });

    // Reset builder
    setStep(1);
    setSelectedPasta(null);
    setSelectedSauce(null);
    setSelectedIngredients([]);
  };

  const totalPrice = (selectedPasta?.price || 0) + (selectedSauce?.price || 0) + 
    selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);

  const steps = [
    { number: 1, title: 'Choose Pasta', completed: !!selectedPasta },
    { number: 2, title: 'Choose Sauce', completed: !!selectedSauce },
    { number: 3, title: 'Add Ingredients', completed: step >= 3 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Build Your Perfect Pasta</CardTitle>
        
        <div className="flex justify-between items-center mt-6">
          {steps.map((stepItem, index) => (
            <React.Fragment key={stepItem.number}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step >= stepItem.number 
                      ? 'bg-orange-500 text-white' 
                      : stepItem.completed 
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {stepItem.number}
                </div>
                <span className={`text-xs mt-1 ${step >= stepItem.number ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
                  {stepItem.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose your pasta type</h3>
            {loadingPasta ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastaTypes?.pasta_types.map((pasta) => (
                  <div
                    key={pasta.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedPasta?.id === pasta.id 
                        ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => setSelectedPasta(pasta)}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-lg">{pasta.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{pasta.description}</p>
                      <p className="text-orange-500 font-bold mt-2">${pasta.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedPasta && (
              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)} className="bg-orange-500 hover:bg-orange-600">
                  Next: Choose Sauce
                </Button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Choose your sauce</h3>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            </div>
            {loadingSauces ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sauces?.sauces.map((sauce) => (
                  <div
                    key={sauce.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedSauce?.id === sauce.id 
                        ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => setSelectedSauce(sauce)}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-lg">{sauce.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{sauce.description}</p>
                      <p className="text-orange-500 font-bold mt-2">${sauce.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedSauce && (
              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(3)} className="bg-orange-500 hover:bg-orange-600">
                  Next: Add Ingredients
                </Button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add ingredients (optional)</h3>
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
            </div>
            
            {loadingIngredients ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : (
              <>
                {['protein', 'vegetable', 'cheese'].map((category) => {
                  const categoryIngredients = ingredients?.ingredients.filter(ing => ing.category === category) || [];
                  return (
                    <div key={category}>
                      <h4 className="font-medium text-gray-700 mb-3 capitalize">{category}s</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {categoryIngredients.map((ingredient) => (
                          <div
                            key={ingredient.id}
                            className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                              selectedIngredients.some(i => i.id === ingredient.id)
                                ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-200' 
                                : 'border-gray-200 hover:border-orange-300'
                            }`}
                            onClick={() => handleIngredientToggle(ingredient)}
                          >
                            <div className="text-center">
                              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                                selectedIngredients.some(i => i.id === ingredient.id)
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-200 text-gray-500'
                              }`}>
                                <Plus className="w-4 h-4" />
                              </div>
                              <h5 className="font-medium text-sm">{ingredient.name}</h5>
                              <p className="text-orange-500 font-bold text-sm">${ingredient.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            <div className="border-t pt-6 mt-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-semibold text-lg">Your Pasta</h4>
                  <p className="text-gray-600">
                    {selectedPasta?.name} with {selectedSauce?.name}
                    {selectedIngredients.length > 0 && (
                      <span> + {selectedIngredients.length} ingredient{selectedIngredients.length !== 1 ? 's' : ''}</span>
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-500">${totalPrice.toFixed(2)}</p>
                  <Button onClick={addToCart} className="mt-2 bg-orange-500 hover:bg-orange-600">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
