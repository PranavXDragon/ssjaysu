import { useQuery, useMutation } from "@tanstack/react-query";
import { api, buildUrl, type InsertOrder } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { fallbackProducts } from "@/lib/products";

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      const res = await fetch(api.products.list.path);
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      try {
        const url = buildUrl(api.products.get.path, { id });
        const res = await fetch(url);
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("Failed to fetch product");
        return api.products.get.responses[200].parse(await res.json());
      } catch (error) {
        return fallbackProducts.find((item) => item.id === id) ?? null;
      }
    },
    enabled: !isNaN(id),
  });
}

export function useCreateOrder() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (order: InsertOrder) => {
      // Coerce numeric fields to strings/numbers as schema expects
      // The schema expects total as numeric string for decimal precision in DB, 
      // but input form might give number. Zod handles coercion if configured, 
      // but let's be safe and rely on the schema parsing in the route handler.
      
      const res = await fetch(api.orders.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create order");
      }
      
      return api.orders.create.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
