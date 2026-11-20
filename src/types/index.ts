export interface ProductVolume {
  size: string;
  price: number;
  originalPrice: number;
  packaging: string;
  inStock?: boolean;
}

export interface Product {
  id: string;
  name: string;
  hindiName: string;
  slug: string;
  category: 'oil' | 'bilona-ghee' | 'all' | 'mustard-oils' | 'nut-seed-oils' | 'wellness-rogan' | 'combos';
  shortDesc: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured: boolean;
  bestSeller: boolean;
  specialOffer?: string;
  isSpecialOffer?: boolean;
  specialDiscountPercent?: number;
  image: string;
  bottleImage?: string;
  showcaseImage?: string;
  additionalImages?: string[];
  volumes: ProductVolume[];
  benefits: string[];
  processHighlight: string;
  smokePoint?: string;
  nutritionalInfo: {
    energy: string;
    fat: string;
    saturatedFat: string;
    mufa: string;
    pufa: string;
    cholesterol: string;
    vitamins: string;
  };
  extractionDetails: {
    method: string;
    temperature: string;
    rpm: string;
    seedOrigin: string;
    pressType?: string;
    machineType?: string;
  };
  labReportSummary: {
    purity: string;
    adulteration: string;
    argemone: string;
    freeFattyAcid: string;
  };
}

export interface CartItem {
  product: Product;
  selectedVolume: ProductVolume;
  quantity: number;
}

export interface CustomerOrder {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryType: 'standard' | 'delhi-express';
  paymentMethod: 'upi' | 'cod' | 'card';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'Confirmed' | 'Processing' | 'Shipped';
}

export interface CouponUsageRecord {
  orderId: string;
  customerName: string;
  phone: string;
  discountAmount: number;
  usedAt: string;
}

export interface Coupon {
  _id?: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscountCap?: number | null;
  expiryDate?: string | null;
  usageLimit?: number | null;
  usageCount: number;
  isActive: boolean;
  usedBy?: CouponUsageRecord[];
  createdAt: string;
  updatedAt?: string;
}
