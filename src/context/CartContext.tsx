'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVolume, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, volume: ProductVolume, quantity?: number) => void;
  removeFromCart: (productId: string, volumeSize: string) => void;
  updateQuantity: (productId: string, volumeSize: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  shippingFee: number;
  total: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 799;
const STANDARD_SHIPPING = 80;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('rkw_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('rkw_coupon');
      if (savedCoupon === 'RKW10' || savedCoupon === 'PURE10') {
        setCouponCode(savedCoupon);
        setDiscountPercent(10);
      } else if (savedCoupon === 'RAMESHKOLHU') {
        setCouponCode(savedCoupon);
        setDiscountPercent(15);
      }
    } catch {
      // ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('rkw_cart', JSON.stringify(cart));
      } catch {
        // ignore
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, volume: ProductVolume, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVolume.size === volume.size
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, selectedVolume: volume, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, volumeSize: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVolume.size === volumeSize)
      )
    );
  };

  const updateQuantity = (productId: string, volumeSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, volumeSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVolume.size === volumeSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('rkw_cart');
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'RKW10' || cleanCode === 'PURE10') {
      setCouponCode(cleanCode);
      setDiscountPercent(10);
      try {
        localStorage.setItem('rkw_coupon', cleanCode);
      } catch {}
      return { success: true, message: 'Coupon applied! 10% discount added.' };
    } else if (cleanCode === 'RAMESHKOLHU') {
      setCouponCode(cleanCode);
      setDiscountPercent(15);
      try {
        localStorage.setItem('rkw_coupon', cleanCode);
      } catch {}
      return { success: true, message: 'Welcome offer! 15% discount applied.' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try RKW10' };
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.selectedVolume.price * item.quantity,
    0
  );

  const discount = Math.round((subtotal * discountPercent) / 100);

  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;

  const total = Math.max(0, subtotal - discount + shippingFee);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        couponCode,
        applyCoupon,
        shippingFee,
        total,
        totalItems,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
