import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client';

export function usePastaTypes() {
  return useQuery({
    queryKey: ['pasta-types'],
    queryFn: () => client.getPastaTypes(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSauces() {
  return useQuery({
    queryKey: ['sauces'],
    queryFn: () => client.getSauces(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useIngredients(category?: string) {
  return useQuery({
    queryKey: ['ingredients', category],
    queryFn: () => client.getIngredients(category),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData: any) => client.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => client.getOrder(id),
    enabled: !!id,
  });
}
