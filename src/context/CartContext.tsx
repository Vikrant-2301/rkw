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

const defaultCartContext: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  subtotal: 0,
  discount: 0,
  couponCode: '',
  applyCoupon: () => ({ success: false, message: 'Cart not ready' }),
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
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load cart from localStorage after mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('rkw_cart');
      if (savedCart) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const addToCart = (product: Product, volume: ProductVolume, quantity: number = 1) => {
    // Prevent adding out of stock items
    if (product.inStock === false || volume.inStock === false) {
      return;
    }

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
    try {
      localStorage.removeItem('rkw_cart');
      localStorage.removeItem('rkw_coupon');
    } catch {
      // ignore
    }
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'RKW10' || cleanCode === 'PURE10') {
      setCouponCode(cleanCode);
      setDiscountPercent(10);
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'RAMESHKOLHU') {
      setCouponCode(cleanCode);
      setDiscountPercent(15);
      return { success: true, message: 'Special 15% discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code' };
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.selectedVolume.price * item.quantity,
    0
  );

  const discount = Math.round((subtotal * discountPercent) / 100);
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
  return useContext(CartContext);
};
