import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import backend from '~backend/client';

export function usePastaTypes() {
  return useQuery({
    queryKey: ['pasta-types'],
    queryFn: () => backend.menu.listPastaTypes(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSauces() {
  return useQuery({
    queryKey: ['sauces'],
    queryFn: () => backend.menu.listSauces(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useIngredients(category?: string) {
  return useQuery({
    queryKey: ['ingredients', category],
    queryFn: () => backend.menu.listIngredients({ category }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData: any) => backend.orders.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => backend.orders.getOrder({ id }),
    enabled: !!id,
  });
}
