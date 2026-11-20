'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  shippingFee: number;
  total: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const defaultCartContext: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  subtotal: 0,
  discount: 0,
  couponCode: '',
  applyCoupon: async () => ({ success: false, message: 'Cart not ready' }),
  removeCoupon: () => {},
  shippingFee: 0,
  total: 0,
  totalItems: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
};

const CartContext = createContext<CartContextType>(defaultCartContext);

const FREE_SHIPPING_THRESHOLD = 799;
const STANDARD_SHIPPING = 100;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [fixedDiscount, setFixedDiscount] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load cart and coupon from localStorage after mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('rkw_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('rkw_coupon');
      if (savedCoupon) {
        setCouponCode(savedCoupon);
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

  // Save coupon to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        if (couponCode) {
          localStorage.setItem('rkw_coupon', couponCode);
        } else {
          localStorage.removeItem('rkw_coupon');
        }
      } catch {
        // ignore
      }
    }
  }, [couponCode, isLoaded]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.selectedVolume.price * item.quantity,
    0
  );

  // Dynamic apply coupon function connected to MongoDB
  const applyCoupon = useCallback(async (code: string): Promise<{ success: boolean; message: string }> => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setCouponCode('');
      setDiscountPercent(0);
      setFixedDiscount(0);
      try {
        localStorage.removeItem('rkw_coupon');
      } catch {}
      return { success: false, message: 'Please enter a coupon code' };
    }

    try {
      const res = await fetch('/api/coupons/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode, subtotal }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setCouponCode(data.code);
        if (data.discountType === 'percentage') {
          setDiscountPercent(data.discountValue);
          setFixedDiscount(0);
        } else {
          setDiscountPercent(0);
          setFixedDiscount(data.discountAmount);
        }
        try {
          localStorage.setItem('rkw_coupon', data.code);
        } catch {}
        return { success: true, message: data.message };
      } else {
        setCouponCode('');
        setDiscountPercent(0);
        setFixedDiscount(0);
        try {
          localStorage.removeItem('rkw_coupon');
        } catch {}
        return { success: false, message: data.message || 'Invalid coupon code' };
      }
    } catch {
      return { success: false, message: 'Could not validate coupon. Please try again.' };
    }
  }, [subtotal]);

  const removeCoupon = useCallback(() => {
    setCouponCode('');
    setDiscountPercent(0);
    setFixedDiscount(0);
    try {
      localStorage.removeItem('rkw_coupon');
    } catch {}
  }, []);

  // Re-validate coupon when subtotal changes
  useEffect(() => {
    if (couponCode && subtotal > 0 && isLoaded) {
      fetch('/api/coupons/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, subtotal }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            if (data.discountType === 'percentage') {
              setDiscountPercent(data.discountValue);
              setFixedDiscount(0);
            } else {
              setDiscountPercent(0);
              setFixedDiscount(data.discountAmount);
            }
          } else {
            removeCoupon();
          }
        })
        .catch(() => {});
    } else if (subtotal === 0) {
      setDiscountPercent(0);
      setFixedDiscount(0);
    }
  }, [subtotal, couponCode, isLoaded, removeCoupon]);

  const addToCart = (product: Product, volume: ProductVolume, quantity: number = 1) => {
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
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedVolume.size === volumeSize)
      )
    );
  };

  const updateQuantity = (productId: string, volumeSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, volumeSize);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.selectedVolume.size === volumeSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
    setFixedDiscount(0);
    try {
      localStorage.removeItem('rkw_cart');
      localStorage.removeItem('rkw_coupon');
    } catch {
      // ignore
    }
  };

  const discount = fixedDiscount > 0
    ? fixedDiscount
    : Math.round((subtotal * discountPercent) / 100);

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING;
  const total = Math.max(0, subtotal - discount + shippingFee);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
        removeCoupon,
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

export const useCart = () => useContext(CartContext);
