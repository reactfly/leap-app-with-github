import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import backend from '~backend/client';
import { useCart } from '../context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import type { PastaType } from '~backend/menu/list_pasta_types';
import type { Sauce } from '~backend/menu/list_sauces';
import type { Ingredient } from '~backend/menu/list_ingredients';

export default function MenuCategories() {
  const [openCategories, setOpenCategories] = useState<string[]>(['pasta']);
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data: pastaTypes } = useQuery({
    queryKey: ['pasta-types'],
    queryFn: () => backend.menu.listPastaTypes(),
  });

  const { data: sauces } = useQuery({
    queryKey: ['sauces'],
    queryFn: () => backend.menu.listSauces(),
  });

  const { data: ingredients } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => backend.menu.listIngredients({}),
  });

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const addQuickOrder = (pasta: PastaType, sauce: Sauce) => {
    addItem({
      pasta_type: pasta,
      sauce: sauce,
      ingredients: [],
      quantity: 1,
    });

    toast({
      title: "Added to cart!",
      description: `${pasta.name} with ${sauce.name} sauce`,
    });
  };

  const categories = [
    {
      id: 'pasta',
      title: 'Pasta Types',
      items: pastaTypes?.pasta_types || [],
      type: 'pasta' as const,
    },
    {
      id: 'sauces',
      title: 'Sauces',
      items: sauces?.sauces || [],
      type: 'sauce' as const,
    },
    {
      id: 'proteins',
      title: 'Proteins',
      items: ingredients?.ingredients.filter(i => i.category === 'protein') || [],
      type: 'ingredient' as const,
    },
    {
      id: 'vegetables',
      title: 'Vegetables',
      items: ingredients?.ingredients.filter(i => i.category === 'vegetable') || [],
      type: 'ingredient' as const,
    },
    {
      id: 'cheese',
      title: 'Cheese',
      items: ingredients?.ingredients.filter(i => i.category === 'cheese') || [],
      type: 'ingredient' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Our Menu</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <Collapsible 
              open={openCategories.includes(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <CardTitle className="flex items-center justify-between">
                    <span>{category.title}</span>
                    {openCategories.includes(category.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {category.items.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          )}
                          <p className="text-orange-500 font-bold mt-2">${item.price.toFixed(2)}</p>
                        </div>
                        
                        {category.type === 'pasta' && sauces?.sauces && (
                          <div className="ml-4 space-y-2">
                            {sauces.sauces.slice(0, 2).map((sauce) => (
                              <Button
                                key={sauce.id}
                                size="sm"
                                variant="outline"
                                onClick={() => addQuickOrder(item, sauce)}
                                className="text-xs"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                + {sauce.name}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
}
