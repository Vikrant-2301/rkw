'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

let cachedProducts: Product[] | null = null;
const listeners = new Set<() => void>();

export function mutateLiveProducts(newProducts: Product[]) {
  cachedProducts = newProducts;
  listeners.forEach(l => l());
}

export function useLiveProducts() {
  const [products, setProducts] = useState<Product[]>(cachedProducts || PRODUCTS);
  const [loading, setLoading] = useState(!cachedProducts);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && Array.isArray(data.products) && data.products.length > 0) {
        cachedProducts = data.products;
        setProducts(data.products);
        listeners.forEach(l => l());
      }
    } catch (err) {
      console.error('Failed to load live products:', err);
    }
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      if (cachedProducts) {
        setProducts(cachedProducts);
      }
    };
    listeners.add(handleUpdate);

    refresh().finally(() => setLoading(false));

    return () => {
      listeners.delete(handleUpdate);
    };
  }, [refresh]);

  return { products, loading, refresh };
}
