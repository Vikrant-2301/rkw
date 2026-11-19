'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

let cachedProducts: Product[] | null = null;

export function useLiveProducts() {
  const [products, setProducts] = useState<Product[]>(cachedProducts || PRODUCTS);
  const [loading, setLoading] = useState(!cachedProducts);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success && Array.isArray(data.products) && data.products.length > 0) {
          cachedProducts = data.products;
          setProducts(data.products);
        }
      })
      .catch(err => {
        console.error('Failed to load live products:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading };
}
