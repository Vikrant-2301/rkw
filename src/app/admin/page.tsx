'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductVolume } from '@/types';
import {
  FiPackage,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiXCircle,
  FiSearch,
  FiRefreshCw,
  FiPhone,
  FiMail,
  FiMapPin,
  FiEdit,
  FiSave,
  FiExternalLink,
  FiCopy,
  FiCheck,
  FiLock,
  FiArrowRight,
  FiShield,
  FiFileText,
  FiTrash2,
  FiPlus,
  FiSlash,
  FiAlertCircle,
  FiGrid,
  FiList,
  FiImage,
  FiEye
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface OrderItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderRecord {
  _id?: string;
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  itemsSummary?: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  notes?: string;
  status: 'pending_confirmation' | 'confirmed' | 'out_for_delivery' | 'delivered' | 'cancelled';
  createdAt: string;
  dateFormatted?: string;
  googleSheetSynced?: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'sheets'>('orders');

  // Orders State
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [productSuccessMsg, setProductSuccessMsg] = useState('');
  const [productFilter, setProductFilter] = useState<'all' | 'in_stock' | 'out_of_stock' | 'partial' | 'bestseller' | 'special_offer'>('all');
  const [productSearch, setProductSearch] = useState('');
  const [productViewMode, setProductViewMode] = useState<'grid' | 'list'>('grid');
  const [quickStockUpdatingId, setQuickStockUpdatingId] = useState<string | null>(null);

  // Settings State
  const [googleWebhookUrl, setGoogleWebhookUrl] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [scriptTemplate, setScriptTemplate] = useState('');
  const [isTestingSheet, setIsTestingSheet] = useState(false);
  const [sheetTestResult, setSheetTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Check existing session
  useEffect(() => {
    const saved = localStorage.getItem('rkw_admin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
    const savedView = localStorage.getItem('rkw_admin_product_view');
    if (savedView === 'list' || savedView === 'grid') {
      setProductViewMode(savedView);
    }
  }, []);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('rkw_admin_auth', 'true');
        setPasscode('');
      } else {
        setAuthError(data.error || 'Authentication failed. Please check password.');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {}
    setIsAuthenticated(false);
    localStorage.removeItem('rkw_admin_auth');
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Phone',
      'Email',
      'Address',
      'City',
      'State',
      'Pincode',
      'Items Summary',
      'Subtotal',
      'Shipping Fee',
      'Total',
      'Status',
      'Notes',
    ];
    const rows = orders.map(o => [
      `"${o.orderId}"`,
      `"${o.dateFormatted || o.createdAt}"`,
      `"${o.customerName}"`,
      `"${o.phone}"`,
      `"${o.email || ''}"`,
      `"${(o.address || '').replace(/"/g, '""')}"`,
      `"${o.city}"`,
      `"${o.state}"`,
      `"${o.pincode}"`,
      `"${(o.itemsSummary || '').replace(/"/g, '""')}"`,
      o.subtotal,
      o.shippingFee,
      o.total,
      `"${o.status}"`,
      `"${(o.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RKW_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fetch Orders
  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const url = new URL('/api/orders', window.location.origin);
      if (orderFilter !== 'all') url.searchParams.set('status', orderFilter);
      if (orderSearch.trim()) url.searchParams.set('search', orderSearch.trim());

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  }, [orderFilter, orderSearch]);

  // Fetch Products
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  // Fetch Settings
  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success) {
        setGoogleWebhookUrl(data.googleSheet?.webhookUrl || '');
        setScriptTemplate(data.googleSheet?.scriptTemplate || '');
        setAdminEmail(data.emailConfig?.adminEmail || '');
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      fetchProducts();
      fetchSettings();
    }
  }, [isAuthenticated, fetchOrders, fetchProducts, fetchSettings]);

  // Update Order Status
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev =>
          prev.map(ord =>
            ord.orderId === orderId ? { ...ord, status: newStatus as OrderRecord['status'] } : ord
          )
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Quick toggle product stock (entire product)
  const handleToggleProductStock = async (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const newStock = !Boolean(product.inStock);
    setQuickStockUpdatingId(product.id);

    // Optimistic UI update
    setProducts(prev =>
      prev.map(p => (p.id === product.id ? { ...p, inStock: newStock } : p))
    );

    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          action: 'toggle_product_stock',
        }),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts(prev => prev.map(p => (p.id === data.product.id ? data.product : p)));
        setProductSuccessMsg(
          `✓ ${product.name} is now marked ${newStock ? 'IN STOCK' : 'OUT OF STOCK'}`
        );
        setTimeout(() => setProductSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to toggle product stock:', err);
      // Revert on error
      setProducts(prev =>
        prev.map(p => (p.id === product.id ? { ...p, inStock: !newStock } : p))
      );
    } finally {
      setQuickStockUpdatingId(null);
    }
  };

  // Quick toggle volume variant stock (e.g. 200ml)
  const handleToggleVolumeStock = async (product: Product, volumeSize: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const currentVol = product.volumes?.find(v => v.size === volumeSize);
    const newVolStock = currentVol?.inStock === false ? true : false;
    setQuickStockUpdatingId(`${product.id}-${volumeSize}`);

    // Optimistic UI update
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== product.id) return p;
        return {
          ...p,
          volumes: (p.volumes || []).map(v =>
            v.size === volumeSize ? { ...v, inStock: newVolStock } : v
          ),
        };
      })
    );

    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          action: 'toggle_volume_stock',
          volumeSize,
        }),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts(prev => prev.map(p => (p.id === data.product.id ? data.product : p)));
        setProductSuccessMsg(
          `✓ ${product.name} (${volumeSize}) is now marked ${newVolStock ? 'IN STOCK' : 'OUT OF STOCK'}`
        );
        setTimeout(() => setProductSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to toggle volume stock:', err);
      fetchProducts();
    } finally {
      setQuickStockUpdatingId(null);
    }
  };

  // Quick toggle Best Seller (Most Selling)
  const handleToggleBestSeller = async (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const newBestSeller = !Boolean(product.bestSeller);
    setProducts(prev =>
      prev.map(p => (p.id === product.id ? { ...p, bestSeller: newBestSeller } : p))
    );

    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          action: 'toggle_bestseller',
        }),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts(prev => prev.map(p => (p.id === data.product.id ? data.product : p)));
        setProductSuccessMsg(
          `✓ ${product.name} is now ${newBestSeller ? 'marked as MOST SELLING 🔥' : 'removed from Most Selling'}`
        );
        setTimeout(() => setProductSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to toggle bestseller:', err);
      fetchProducts();
    }
  };

  // Quick toggle Special Offer
  const handleToggleSpecialOffer = async (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const newOffer = !Boolean(product.isSpecialOffer);
    setProducts(prev =>
      prev.map(p => (p.id === product.id ? { ...p, isSpecialOffer: newOffer } : p))
    );

    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          action: 'toggle_special_offer',
        }),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts(prev => prev.map(p => (p.id === data.product.id ? data.product : p)));
        setProductSuccessMsg(
          `✓ ${product.name} special discount offer is now ${newOffer ? 'ACTIVATED ⚡' : 'DEACTIVATED'}`
        );
        setTimeout(() => setProductSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to toggle special offer:', err);
      fetchProducts();
    }
  };

  // Add volume variant to editing product
  const handleAddVolume = () => {
    if (!editingProduct) return;
    const newVol: ProductVolume = {
      size: '200ml (PET bottle)',
      price: 80,
      originalPrice: 100,
      packaging: 'PET bottle',
      inStock: true,
    };
    setEditingProduct({
      ...editingProduct,
      volumes: [...(editingProduct.volumes || []), newVol],
    });
  };

  // Delete volume variant from editing product
  const handleDeleteVolume = (idx: number) => {
    if (!editingProduct) return;
    if ((editingProduct.volumes || []).length <= 1) {
      alert('A product must have at least one quantity variant.');
      return;
    }
    const updated = editingProduct.volumes.filter((_, i) => i !== idx);
    setEditingProduct({ ...editingProduct, volumes: updated });
  };

  // Toggle stock of volume variant inside editing product modal
  const handleToggleModalVolumeStock = (idx: number) => {
    if (!editingProduct) return;
    const updated = [...(editingProduct.volumes || [])];
    const current = updated[idx].inStock !== false;
    updated[idx] = { ...updated[idx], inStock: !current };
    setEditingProduct({ ...editingProduct, volumes: updated });
  };

  // Filtered products for admin
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase().trim();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.hindiName?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.volumes || []).some(v => v.size.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Filter
      const hasAnyVolumeOut = (p.volumes || []).some(v => v.inStock === false);
      const isCompletelyOut = p.inStock === false || (p.volumes || []).every(v => v.inStock === false);

      if (productFilter === 'bestseller') {
        return Boolean(p.bestSeller);
      }
      if (productFilter === 'special_offer') {
        return Boolean(p.isSpecialOffer || p.specialOffer);
      }
      if (productFilter === 'in_stock') {
        return p.inStock !== false && !isCompletelyOut;
      }
      if (productFilter === 'out_of_stock') {
        return isCompletelyOut;
      }
      if (productFilter === 'partial') {
        return p.inStock !== false && hasAnyVolumeOut && !isCompletelyOut;
      }
      return true;
    });
  }, [products, productSearch, productFilter]);

  // Save Edited Product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsSavingProduct(true);
    setProductSuccessMsg('');

    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingProduct.id,
          name: editingProduct.name,
          hindiName: editingProduct.hindiName,
          category: editingProduct.category,
          shortDesc: editingProduct.shortDesc,
          description: editingProduct.description,
          image: editingProduct.image,
          price: Number(editingProduct.price),
          originalPrice: Number(editingProduct.originalPrice),
          inStock: Boolean(editingProduct.inStock),
          bestSeller: Boolean(editingProduct.bestSeller),
          isSpecialOffer: Boolean(editingProduct.isSpecialOffer),
          specialOffer: editingProduct.specialOffer || '',
          specialDiscountPercent: editingProduct.specialDiscountPercent ? Number(editingProduct.specialDiscountPercent) : undefined,
          volumes: editingProduct.volumes,
        }),
      });

      const data = await res.json();
      if (data.success && data.product) {
        setProducts(prev => prev.map(p => (p.id === data.product.id ? data.product : p)));
        setProductSuccessMsg(`✓ Saved pricing & stock for ${editingProduct.name}`);
        setTimeout(() => setEditingProduct(null), 1200);
      }
    } catch (err) {
      console.error('Failed to save product:', err);
    } finally {
      setIsSavingProduct(false);
    }
  };

  // Save Settings
  const handleSaveGoogleSheetUrl = async () => {
    setIsSavingSettings(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_google_sheet',
          googleSheetWebhookUrl: googleWebhookUrl,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Google Sheet Webhook URL saved successfully!');
      }
    } catch (err) {
      console.error('Failed to save sheet url:', err);
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Test Google Sheet
  const handleTestGoogleSheet = async () => {
    setIsTestingSheet(true);
    setSheetTestResult(null);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_google_sheet' }),
      });
      const data = await res.json();
      if (data.success) {
        setSheetTestResult({ success: true, message: data.message });
      } else {
        setSheetTestResult({ success: false, message: data.error || 'Failed to ping Google Sheet.' });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSheetTestResult({ success: false, message: msg });
    } finally {
      setIsTestingSheet(false);
    }
  };

  // Quick metrics
  const totalRevenue = orders.reduce((acc, ord) => acc + (ord.status !== 'cancelled' ? ord.total : 0), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending_confirmation').length;
  const confirmedCount = orders.filter(o => o.status === 'confirmed').length;

  // Unauthenticated screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F6F3EC] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-[#E8E0D0] space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0E2A47] text-[#F5E6B0] flex items-center justify-center mx-auto shadow-md">
            <FiLock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-serif text-[#0E2A47] font-bold">RKW Admin Control</h1>
            <p className="text-xs text-[#8A7E6E] mt-1">
              Ramesh Kolhu Wale · Store Manager &amp; Order Dashboard
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-semibold text-[#5A5248] uppercase tracking-wider mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter Admin Password"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#D0C8B8] focus:border-[#0E2A47] focus:outline-none text-[#1C1A16] text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-[#0E2A47] hover:bg-[#163A60] text-[#F5E6B0] font-semibold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoggingIn ? 'Verifying Password...' : 'Access Dashboard'}
            </button>
          </form>

          <p className="text-[11px] text-[#A89E90]">
            Protected internal interface for order fulfillment, price control, and Google Sheet sync.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F3EC] pb-24">
      {/* Top Admin Header */}
      <header className="bg-[#0E2A47] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#B8860B] text-white flex items-center justify-center font-bold text-sm">
              RKW
            </div>
            <div>
              <h1 className="font-serif font-bold text-base sm:text-lg tracking-wide text-[#F5E6B0]">
                RKW Admin Management
              </h1>
              <p className="text-[10px] text-[#CBD5E1]">
                Orders, Pricing Control &amp; Google Sheet Live Sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
            >
              <span>View Storefront</span>
              <FiExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 text-xs font-medium text-white transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 border-t border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#D4A017] text-[#F5E6B0]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <FiShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-[#B8860B] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {pendingOrdersCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-[#D4A017] text-[#F5E6B0]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <FiDollarSign className="w-4 h-4" />
            <span>Product Prices &amp; MRP</span>
          </button>
          <button
            onClick={() => setActiveTab('sheets')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'sheets'
                ? 'border-[#D4A017] text-[#F5E6B0]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <FiFileText className="w-4 h-4" />
            <span>Google Sheet Live Sync</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8E0D0] shadow-xs">
            <div className="flex items-center justify-between text-[#8A7E6E] text-xs font-medium">
              <span>Total Orders</span>
              <FiShoppingBag className="w-4 h-4 text-[#0E2A47]" />
            </div>
            <p className="text-2xl font-serif font-bold text-[#0E2A47] mt-2">{orders.length}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E0D0] shadow-xs">
            <div className="flex items-center justify-between text-[#8A7E6E] text-xs font-medium">
              <span>Pending Calls</span>
              <FiClock className="w-4 h-4 text-[#B8860B]" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-serif font-bold text-[#B8860B]">{pendingOrdersCount}</p>
              <span className="text-[11px] text-[#A89E90]">need confirmation</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E0D0] shadow-xs">
            <div className="flex items-center justify-between text-[#8A7E6E] text-xs font-medium">
              <span>Confirmed Orders</span>
              <FiCheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-serif font-bold text-emerald-700 mt-2">{confirmedCount}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E0D0] shadow-xs">
            <div className="flex items-center justify-between text-[#8A7E6E] text-xs font-medium">
              <span>Total Revenue</span>
              <FiDollarSign className="w-4 h-4 text-[#0E2A47]" />
            </div>
            <p className="text-2xl font-serif font-bold text-[#0E2A47] mt-2">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: ORDERS LIST                                      */}
        {/* ======================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search & Filter Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E0D0] shadow-xs flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3.5 top-3 text-[#8A7E6E]" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer Name, Phone..."
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D0C8B8] text-xs sm:text-sm focus:outline-none focus:border-[#0E2A47]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                {[
                  { id: 'all', label: 'All Orders' },
                  { id: 'pending_confirmation', label: 'Pending Call' },
                  { id: 'confirmed', label: 'Confirmed' },
                  { id: 'out_for_delivery', label: 'Out for Delivery' },
                  { id: 'delivered', label: 'Delivered' },
                  { id: 'cancelled', label: 'Cancelled' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setOrderFilter(opt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      orderFilter === opt.id
                        ? 'bg-[#0E2A47] text-white shadow-xs'
                        : 'bg-[#F2EEE5] text-[#5A5248] hover:bg-[#E8E0D0]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}

                <button
                  onClick={fetchOrders}
                  disabled={ordersLoading}
                  className="p-2 rounded-lg bg-[#FAF8F3] border border-[#D0C8B8] hover:bg-white text-[#5A5248] transition-colors cursor-pointer shrink-0"
                  title="Refresh Orders"
                >
                  <FiRefreshCw className={`w-4 h-4 ${ordersLoading ? 'animate-spin text-[#0E2A47]' : ''}`} />
                </button>

                <button
                  onClick={handleExportCSV}
                  disabled={orders.length === 0}
                  className="px-3 py-2 rounded-lg bg-[#0E2A47] hover:bg-[#163A60] text-[#F5E6B0] text-xs font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 shadow-xs"
                  title="Export orders to CSV"
                >
                  <FiFileText className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Export CSV</span>
                </button>
              </div>
            </div>

            {/* Orders Feed */}
            {ordersLoading && orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-[#8A7E6E] border border-[#E8E0D0]">
                <FiRefreshCw className="w-8 h-8 animate-spin mx-auto text-[#0E2A47] mb-3" />
                <p className="text-sm">Loading orders from MongoDB database...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-[#8A7E6E] border border-[#E8E0D0] space-y-2">
                <FiShoppingBag className="w-10 h-10 mx-auto text-[#C8BFA8]" />
                <h3 className="font-serif text-lg text-[#1C1A16]">No Orders Found</h3>
                <p className="text-xs">Orders placed through the checkout page will appear here immediately.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const isPending = order.status === 'pending_confirmation';
                  const isConfirmed = order.status === 'confirmed';
                  const isDelivered = order.status === 'delivered';
                  const isCancelled = order.status === 'cancelled';

                  return (
                    <div
                      key={order.orderId}
                      className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all shadow-xs ${
                        isPending
                          ? 'border-[#B8860B]/40 bg-[#FFFDF7]'
                          : isConfirmed
                          ? 'border-emerald-300'
                          : 'border-[#E8E0D0]'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E8E0D0] pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-mono font-bold text-sm sm:text-base text-[#0E2A47] bg-[#EBF2F8] px-2.5 py-0.5 rounded-md border border-[#C5D8EB]">
                              {order.orderId}
                            </span>
                            <span className="text-xs text-[#8A7E6E]">
                              {order.dateFormatted || new Date(order.createdAt).toLocaleString('en-IN')}
                            </span>
                            {order.googleSheetSynced && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                <FiCheck className="w-3 h-3" /> Google Sheet Synced
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs pt-0.5">
                            <span className="font-semibold text-[#1C1A16] text-sm">{order.customerName}</span>
                            <span className="text-[#8A7E6E]">·</span>
                            <span className="text-[#5A5248] uppercase tracking-wider font-semibold text-[11px]">
                              {order.paymentMethod === 'upi' ? 'UPI / QR' : 'Cash on Delivery'}
                            </span>
                          </div>
                        </div>

                        {/* Customer Quick Contact Actions */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <a
                            href={`tel:${order.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E2A47] hover:bg-[#163A60] text-white text-xs font-semibold shadow-xs transition-colors"
                          >
                            <FiPhone className="w-3.5 h-3.5" />
                            <span>Call: {order.phone}</span>
                          </a>

                          <a
                            href={`https://wa.me/91${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${order.customerName}, calling from Ramesh Kolhu Wale regarding your order #${order.orderId} (₹${order.total}).`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1ebf5b] text-white text-xs font-semibold shadow-xs transition-colors"
                          >
                            <FaWhatsapp className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          {/* Status Dropdown */}
                          <div className="relative">
                            <select
                              value={order.status}
                              disabled={updatingOrderId === order.orderId}
                              onChange={e => handleUpdateStatus(order.orderId, e.target.value)}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${
                                isPending
                                  ? 'bg-[#FDF4D8] text-[#8C6500] border-[#E8D080]'
                                  : isConfirmed
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : isDelivered
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : isCancelled
                                  ? 'bg-red-50 text-red-800 border-red-300'
                                  : 'bg-stone-100 text-stone-800 border-stone-300'
                              }`}
                            >
                              <option value="pending_confirmation">⏳ Pending Call Confirmation</option>
                              <option value="confirmed">✅ Confirmed (Called Customer)</option>
                              <option value="out_for_delivery">🚚 Out for Delivery</option>
                              <option value="delivered">📦 Delivered</option>
                              <option value="cancelled">❌ Cancelled</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Items & Address Details */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 text-xs">
                        {/* Ordered Items */}
                        <div className="lg:col-span-7 space-y-2">
                          <p className="font-semibold text-[#5A5248] uppercase tracking-wider text-[11px]">
                            Items Ordered ({order.items.length})
                          </p>
                          <div className="space-y-1.5 bg-[#FAF8F3] p-3 rounded-xl border border-[#E8E0D0]">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between items-center text-[#1C1A16]">
                                <div>
                                  <span className="font-semibold">{it.name}</span>
                                  <span className="text-[#8A7E6E] ml-2">({it.size}) × {it.quantity}</span>
                                </div>
                                <span className="font-bold text-[#0E2A47]">₹{it.price * it.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Customer Delivery Address & Total */}
                        <div className="lg:col-span-5 space-y-2">
                          <p className="font-semibold text-[#5A5248] uppercase tracking-wider text-[11px]">
                            Delivery Destination
                          </p>
                          <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E8E0D0] space-y-1 text-[#4A4035]">
                            <p className="font-medium text-[#1C1A16]">{order.address}</p>
                            <p>{order.city}, {order.state} - {order.pincode}</p>
                            {order.email && <p className="text-[#8A7E6E]">Email: {order.email}</p>}
                            {order.notes && (
                              <p className="text-[#B8860B] font-medium pt-1">
                                Note: &ldquo;{order.notes}&rdquo;
                              </p>
                            )}
                            <div className="pt-2 mt-2 border-t border-[#E8E0D0] flex justify-between font-bold text-sm text-[#0E2A47]">
                              <span>Grand Total:</span>
                              <span className="font-serif text-base">₹{order.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PRODUCTS, STOCK & QUANTITY CONTROL                */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Header with Search, View Mode Switcher, and Stock Filter Pills */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8E0D0] shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-wider bg-[#FAF8F3] px-2.5 py-0.5 rounded-full border border-[#E8E0D0]">
                      Inventory &amp; Pricing Management
                    </span>
                    <span className="text-[11px] text-[#8A7E6E]">
                      {products.length} Products Cataloged
                    </span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2A47] mt-1">
                    Product &amp; Quantity Stock Inventory
                  </h2>
                  <p className="text-xs text-[#8A7E6E] mt-0.5">
                    Mark entire products or individual quantities (e.g. 200ml out of stock, 1L in stock) on/off. Switch between Card and Table List views.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {/* View Mode Switcher: Cards vs Table List */}
                  <div className="flex items-center bg-[#FAF8F3] p-1 rounded-xl border border-[#D0C8B8]">
                    <button
                      type="button"
                      onClick={() => {
                        setProductViewMode('grid');
                        localStorage.setItem('rkw_admin_product_view', 'grid');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        productViewMode === 'grid'
                          ? 'bg-[#0E2A47] text-[#F5E6B0] shadow-xs'
                          : 'text-[#5A5248] hover:text-[#0E2A47]'
                      }`}
                      title="Card Grid View"
                    >
                      <FiGrid className="w-3.5 h-3.5" />
                      <span>Cards</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProductViewMode('list');
                        localStorage.setItem('rkw_admin_product_view', 'list');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        productViewMode === 'list'
                          ? 'bg-[#0E2A47] text-[#F5E6B0] shadow-xs'
                          : 'text-[#5A5248] hover:text-[#0E2A47]'
                      }`}
                      title="Professional Table List View"
                    >
                      <FiList className="w-3.5 h-3.5" />
                      <span>List View</span>
                    </button>
                  </div>

                  <button
                    onClick={fetchProducts}
                    disabled={productsLoading}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F3] border border-[#D0C8B8] hover:bg-white text-xs font-semibold text-[#0E2A47] cursor-pointer"
                  >
                    <FiRefreshCw className={`w-3.5 h-3.5 ${productsLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                </div>
              </div>

              {/* Search + Filter Chips */}
              <div className="pt-3 border-t border-[#E8E0D0] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7E6E]" />
                  <input
                    type="text"
                    placeholder="Search by name, category, or size (e.g. 200ml)..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D0C8B8] text-xs font-medium focus:border-[#0E2A47] focus:outline-none bg-[#FAF8F3]"
                  />
                  {productSearch && (
                    <button
                      onClick={() => setProductSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7E6E] hover:text-[#1C1A16] text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs">
                  {[
                    { id: 'all', label: `All Products (${products.length})` },
                    {
                      id: 'bestseller',
                      label: `🔥 Most Selling (${products.filter(p => p.bestSeller).length})`,
                    },
                    {
                      id: 'special_offer',
                      label: `⚡ Special Deals (${products.filter(p => p.isSpecialOffer || Boolean(p.specialOffer)).length})`,
                    },
                    {
                      id: 'in_stock',
                      label: `Fully In Stock (${
                        products.filter(
                          p =>
                            p.inStock !== false &&
                            (p.volumes || []).every(v => v.inStock !== false)
                        ).length
                      })`,
                    },
                    {
                      id: 'partial',
                      label: `Certain Sizes Out (${
                        products.filter(
                          p =>
                            p.inStock !== false &&
                            (p.volumes || []).some(v => v.inStock === false) &&
                            !(p.volumes || []).every(v => v.inStock === false)
                        ).length
                      })`,
                    },
                    {
                      id: 'out_of_stock',
                      label: `Out of Stock (${
                        products.filter(
                          p =>
                            p.inStock === false ||
                            (p.volumes || []).every(v => v.inStock === false)
                        ).length
                      })`,
                    },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setProductFilter(f.id as typeof productFilter)}
                      className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-colors cursor-pointer text-xs ${
                        productFilter === f.id
                          ? 'bg-[#0E2A47] text-white shadow-xs'
                          : 'bg-[#FAF8F3] hover:bg-stone-200 text-[#5A5248] border border-[#E8E0D0]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {productSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold animate-fadeIn flex items-center justify-between">
                <span>{productSuccessMsg}</span>
                <button onClick={() => setProductSuccessMsg('')} className="text-emerald-700 hover:text-emerald-900 font-bold ml-2">
                  ✕
                </button>
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW MODE 1: CARD GRID VIEW                              */}
            {/* ======================================================== */}
            {productViewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const discountPercent = Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  );

                  const hasAnyVolumeOut = (product.volumes || []).some(v => v.inStock === false);
                  const isAllVolumesOut =
                    (product.volumes || []).length > 0 &&
                    (product.volumes || []).every(v => v.inStock === false);
                  const isProductCompletelyOut = product.inStock === false || isAllVolumesOut;

                  return (
                    <div
                      key={product.id}
                      className={`bg-white rounded-2xl p-5 border shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all ${
                        isProductCompletelyOut
                          ? 'border-red-200 bg-red-50/20'
                          : hasAnyVolumeOut
                          ? 'border-amber-200'
                          : 'border-[#E8E0D0]'
                      }`}
                    >
                      <div className="space-y-3.5">
                        {/* Top Row: Thumbnail + Title + Quick Master Stock Switch */}
                        <div className="flex gap-3 items-start justify-between">
                          <div className="flex gap-3 items-center min-w-0">
                            <div className="relative w-14 h-14 rounded-xl bg-[#FAF8F3] border border-[#E8E0D0] overflow-hidden shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="56px"
                                className={`object-cover ${isProductCompletelyOut ? 'grayscale-[40%] opacity-80' : ''}`}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-wider block">
                                {product.category}
                              </span>
                              <h3 className="font-serif font-bold text-sm text-[#0E2A47] truncate">
                                {product.name}
                              </h3>
                              <p className="text-[11px] text-[#8A7E6E] truncate">{product.hindiName}</p>
                            </div>
                          </div>

                          {/* One-Click Master Stock Toggle Button */}
                          <button
                            onClick={e => handleToggleProductStock(product, e)}
                            title="Click to toggle entire product In Stock / Out of Stock"
                            className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-tight transition-all cursor-pointer shadow-xs border ${
                              product.inStock !== false
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200'
                            }`}
                          >
                            {quickStockUpdatingId === product.id ? (
                              'Updating…'
                            ) : product.inStock !== false ? (
                              '● Product IN STOCK'
                            ) : (
                              '✕ Product OUT OF STOCK'
                            )}
                          </button>
                        </div>

                        {/* Marketing & Promotion Quick Buttons */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          <button
                            type="button"
                            onClick={e => handleToggleBestSeller(product, e)}
                            title="Click to toggle whether this product is shown as 'Most Selling' to customers"
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                              product.bestSeller
                                ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200 shadow-xs'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            <span>🔥</span>
                            <span>{product.bestSeller ? 'Most Selling: ON' : 'Mark Most Selling'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={e => handleToggleSpecialOffer(product, e)}
                            title="Click to toggle Special Discount Offer on this product"
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                              product.isSpecialOffer
                                ? 'bg-orange-100 text-orange-900 border-orange-300 hover:bg-orange-200 shadow-xs'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            <span>⚡</span>
                            <span>
                              {product.isSpecialOffer
                                ? `Deal: ${product.specialOffer || 'Active'}`
                                : '+ Special Offer'}
                            </span>
                          </button>
                        </div>

                        {/* Pricing Tag */}
                        <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E8E0D0] flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[#8A7E6E] block text-[10px]">Base Selling Price</span>
                            <span className="font-serif font-bold text-[#0E2A47] text-base">₹{product.price}</span>
                          </div>
                          <div>
                            <span className="text-[#8A7E6E] block text-[10px]">Original MRP</span>
                            <span className="line-through text-[#8A7E6E] font-medium">₹{product.originalPrice}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-bold bg-[#EBF2F8] text-[#0E2A47] px-2 py-0.5 rounded-full">
                              {discountPercent}% OFF
                            </span>
                          </div>
                        </div>

                        {/* Quantities & Size-Specific Stock Status */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-[#8A7E6E]">
                              Available Quantities ({product.volumes?.length || 0})
                            </span>
                            <span className="text-[10px] text-[#8A7E6E]">Click size to toggle stock</span>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {product.volumes?.map(vol => {
                              const isVolInStock = product.inStock !== false && vol.inStock !== false;

                              return (
                                <button
                                  key={vol.size}
                                  onClick={e => handleToggleVolumeStock(product, vol.size, e)}
                                  title={`Click to toggle stock for ${vol.size} (Currently ${isVolInStock ? 'In Stock' : 'Out of Stock'})`}
                                  className={`group text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                                    isVolInStock
                                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                                      : 'bg-red-50 text-red-900 border-red-200 hover:bg-red-100 line-through'
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                      isVolInStock ? 'bg-emerald-500' : 'bg-red-500'
                                    }`}
                                  />
                                  <span className="font-semibold">{vol.size}</span>
                                  <span className="opacity-75">₹{vol.price}</span>
                                  {!isVolInStock && (
                                    <span className="text-[9px] font-bold uppercase tracking-tighter text-red-700 bg-red-100 px-1 rounded not-italic">
                                      Out
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Footer Row: Stock Summary Badge + Edit Details Modal Button */}
                      <div className="pt-3 border-t border-[#E8E0D0] flex items-center justify-between gap-2">
                        <div>
                          {isProductCompletelyOut ? (
                            <span className="text-[11px] font-bold text-red-700 flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-red-600" />
                              Entire Product Out of Stock
                            </span>
                          ) : hasAnyVolumeOut ? (
                            <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-amber-500" />
                              {(product.volumes || []).filter(v => v.inStock === false).length} size(s) Out of Stock
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-600" />
                              All {product.volumes?.length || 0} Sizes In Stock
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => setEditingProduct(product)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0E2A47] hover:bg-[#163A60] text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                        >
                          <FiEdit className="w-3 h-3 text-[#F5E6B0]" />
                          <span>Edit Details</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW MODE 2: PROFESSIONAL TABLE LIST VIEW               */}
            {/* ======================================================== */}
            {productViewMode === 'list' && (
              <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF8F3] border-b border-[#E8E0D0] text-[#5A5248] uppercase tracking-wider font-semibold text-[11px]">
                        <th className="py-3.5 px-4 font-bold text-[#0E2A47]">Product &amp; Hindi Name</th>
                        <th className="py-3.5 px-4 font-bold text-[#0E2A47]">Category</th>
                        <th className="py-3.5 px-4 font-bold text-[#0E2A47]">Base Price / MRP</th>
                        <th className="py-3.5 px-4 font-bold text-[#0E2A47]">Master Stock</th>
                        <th className="py-3.5 px-4 font-bold text-[#0E2A47]">Promotions &amp; Badges</th>
                        <th className="py-3.5 px-4 font-bold text-[#0E2A47]">Quantity Sizes Stock (Click to Toggle)</th>
                        <th className="py-3.5 px-4 text-right font-bold text-[#0E2A47]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E0D0]">
                      {filteredProducts.map(product => {
                        const discountPercent = Math.round(
                          ((product.originalPrice - product.price) / product.originalPrice) * 100
                        );
                        const hasAnyVolumeOut = (product.volumes || []).some(v => v.inStock === false);
                        const isAllVolumesOut =
                          (product.volumes || []).length > 0 &&
                          (product.volumes || []).every(v => v.inStock === false);
                        const isProductCompletelyOut = product.inStock === false || isAllVolumesOut;

                        return (
                          <tr
                            key={product.id}
                            className={`hover:bg-[#FAF8F3]/60 transition-colors ${
                              isProductCompletelyOut
                                ? 'bg-red-50/20'
                                : hasAnyVolumeOut
                                ? 'bg-amber-50/10'
                                : ''
                            }`}
                          >
                            {/* Product Info */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#E8E0D0] overflow-hidden shrink-0">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="48px"
                                    className={`object-cover ${isProductCompletelyOut ? 'grayscale-[40%] opacity-80' : ''}`}
                                  />
                                </div>
                                <div className="min-w-0 max-w-[220px]">
                                  <h4 className="font-serif font-bold text-sm text-[#0E2A47] truncate">
                                    {product.name}
                                  </h4>
                                  <p className="text-[11px] text-[#8A7E6E] truncate">{product.hindiName}</p>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-3.5 px-4">
                              <span className="inline-block text-[10px] font-bold text-[#B8860B] uppercase bg-[#FAF8F3] px-2.5 py-1 rounded-lg border border-[#E8E0D0] whitespace-nowrap">
                                {product.category}
                              </span>
                            </td>

                            {/* Price / MRP */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span className="font-serif font-bold text-[#0E2A47] text-sm">
                                  ₹{product.price}
                                </span>
                                <span className="line-through text-[#8A7E6E] text-[11px]">
                                  ₹{product.originalPrice}
                                </span>
                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                  {discountPercent}% OFF
                                </span>
                              </div>
                            </td>

                            {/* Master Stock */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <button
                                onClick={e => handleToggleProductStock(product, e)}
                                title="Click to toggle entire product In Stock / Out of Stock"
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-tight transition-all cursor-pointer border ${
                                  product.inStock !== false
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                                    : 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200'
                                }`}
                              >
                                {quickStockUpdatingId === product.id ? (
                                  'Updating…'
                                ) : product.inStock !== false ? (
                                  '● In Stock'
                                ) : (
                                  '✕ Out of Stock'
                                )}
                              </button>
                            </td>

                            {/* Promotions */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={e => handleToggleBestSeller(product, e)}
                                  title="Click to toggle Most Selling"
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                                    product.bestSeller
                                      ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                                      : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                                  }`}
                                >
                                  🔥 {product.bestSeller ? 'Most Selling' : 'Normal'}
                                </button>
                                <button
                                  type="button"
                                  onClick={e => handleToggleSpecialOffer(product, e)}
                                  title="Click to toggle Special Discount Offer"
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                                    product.isSpecialOffer
                                      ? 'bg-orange-100 text-orange-900 border-orange-300 hover:bg-orange-200'
                                      : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'
                                  }`}
                                >
                                  ⚡ {product.isSpecialOffer ? (product.specialOffer || 'Offer ON') : 'No Offer'}
                                </button>
                              </div>
                            </td>

                            {/* Quantity Sizes Stock Chips */}
                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap gap-1 max-w-sm">
                                {product.volumes?.map(vol => {
                                  const isVolInStock = product.inStock !== false && vol.inStock !== false;

                                  return (
                                    <button
                                      key={vol.size}
                                      onClick={e => handleToggleVolumeStock(product, vol.size, e)}
                                      title={`Click to toggle stock for ${vol.size} (Currently ${isVolInStock ? 'In Stock' : 'Out of Stock'})`}
                                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md border transition-all cursor-pointer flex items-center gap-1 ${
                                        isVolInStock
                                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                                          : 'bg-red-50 text-red-900 border-red-200 hover:bg-red-100 line-through'
                                      }`}
                                    >
                                      <span
                                        className={`w-1.5 h-1.5 rounded-full ${
                                          isVolInStock ? 'bg-emerald-500' : 'bg-red-500'
                                        }`}
                                      />
                                      <span>{vol.size}</span>
                                      <span className="opacity-75">₹{vol.price}</span>
                                      {!isVolInStock && (
                                        <span className="text-[8px] font-bold uppercase text-red-700 bg-red-100 px-0.5 rounded not-italic">
                                          OUT
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0E2A47] hover:bg-[#163A60] text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                              >
                                <FiEdit className="w-3 h-3 text-[#F5E6B0]" />
                                <span>Edit Details</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="bg-white p-12 text-center rounded-2xl border border-[#E8E0D0] max-w-md mx-auto">
                <FiPackage className="w-10 h-10 text-[#8A7E6E] mx-auto mb-3" />
                <h3 className="font-serif text-base font-bold text-[#0E2A47]">No Products Match</h3>
                <p className="text-xs text-[#8A7E6E] mt-1">
                  Try clearing your search query or changing the stock filter above.
                </p>
                <button
                  onClick={() => {
                    setProductSearch('');
                    setProductFilter('all');
                  }}
                  className="mt-4 px-4 py-2 bg-[#0E2A47] text-white rounded-xl text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* ======================================================== */}
            {/* DETAILED LANDSCAPE EDIT MODAL (NO SCROLL DESIGN)         */}
            {/* ======================================================== */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
                <div className="bg-white rounded-3xl max-w-6xl w-[96vw] max-h-[94vh] flex flex-col shadow-2xl border border-[#E8E0D0] overflow-hidden">
                  {/* Fixed Landscape Modal Header */}
                  <div className="shrink-0 px-6 py-3.5 border-b border-[#E8E0D0] flex items-center justify-between bg-[#FAF8F3]">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-xl bg-white border border-[#D0C8B8] overflow-hidden shrink-0 shadow-xs">
                        <Image
                          src={editingProduct.image}
                          alt={editingProduct.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-[#E8E0D0]">
                            Landscape Product &amp; Inventory Editor
                          </span>
                          <span className="text-[10px] font-semibold text-[#8A7E6E]">
                            ID: {editingProduct.id}
                          </span>
                        </div>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#0E2A47] leading-tight">
                          {editingProduct.name} <span className="font-normal text-xs text-[#8A7E6E] ml-1">({editingProduct.hindiName})</span>
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="p-1.5 text-[#8A7E6E] hover:text-[#0E2A47] rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
                    >
                      <FiXCircle className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Form Body - 3 Columns in Landscape */}
                  <form onSubmit={handleSaveProduct} className="flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="p-5 sm:p-6 overflow-y-auto lg:overflow-visible flex-1">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
                        
                        {/* COLUMN 1: PRODUCT IMAGE & IDENTITY (4 cols) */}
                        <div className="lg:col-span-4 bg-[#FAF8F3] p-4 rounded-2xl border border-[#E8E0D0] flex flex-col justify-between space-y-3">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-[#E8E0D0] pb-2">
                              <span className="font-serif font-bold text-xs text-[#0E2A47] uppercase tracking-wide flex items-center gap-1.5">
                                <FiImage className="w-3.5 h-3.5 text-[#B8860B]" />
                                <span>1. Product Media &amp; Identity</span>
                              </span>
                              <span className="text-[10px] text-[#8A7E6E]">Photo &amp; Names</span>
                            </div>

                            {/* Image Preview & URL Edit */}
                            <div className="bg-white p-3 rounded-xl border border-[#D0C8B8] space-y-2.5">
                              <div className="flex items-center gap-3">
                                <div className="relative w-16 h-16 rounded-xl bg-[#FAF8F3] border border-[#D0C8B8] overflow-hidden shrink-0 shadow-xs">
                                  <Image
                                    src={editingProduct.image}
                                    alt={editingProduct.name}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <label className="block text-[10px] font-bold text-[#5A5248] uppercase tracking-wider mb-1">
                                    Product Image URL
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={editingProduct.image}
                                    onChange={e =>
                                      setEditingProduct({ ...editingProduct, image: e.target.value })
                                    }
                                    placeholder="e.g. /images/products/mustard-oil.png"
                                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#D0C8B8] text-[11px] font-medium bg-[#FAF8F3] focus:border-[#0E2A47] focus:outline-none"
                                  />
                                </div>
                              </div>
                              <p className="text-[10px] text-[#8A7E6E]">
                                Displays on product cards, category catalogs, and detail pages.
                              </p>
                            </div>

                            {/* Product Name (English) */}
                            <div>
                              <label className="block text-[10px] font-bold text-[#5A5248] uppercase tracking-wider mb-1">
                                Product Title (English)
                              </label>
                              <input
                                type="text"
                                required
                                value={editingProduct.name}
                                onChange={e =>
                                  setEditingProduct({ ...editingProduct, name: e.target.value })
                                }
                                className="w-full px-3 py-1.5 rounded-xl border border-[#D0C8B8] text-xs font-bold text-[#1C1A16] bg-white focus:border-[#0E2A47] focus:outline-none"
                              />
                            </div>

                            {/* Hindi Name */}
                            <div>
                              <label className="block text-[10px] font-bold text-[#5A5248] uppercase tracking-wider mb-1">
                                Devanagari Hindi Name
                              </label>
                              <input
                                type="text"
                                value={editingProduct.hindiName || ''}
                                onChange={e =>
                                  setEditingProduct({ ...editingProduct, hindiName: e.target.value })
                                }
                                placeholder="e.g. पीली सरसों का शुद्ध तेल"
                                className="w-full px-3 py-1.5 rounded-xl border border-[#D0C8B8] text-xs font-medium text-[#1C1A16] bg-white focus:border-[#0E2A47] focus:outline-none"
                              />
                            </div>

                            {/* Category */}
                            <div>
                              <label className="block text-[10px] font-bold text-[#5A5248] uppercase tracking-wider mb-1">
                                Product Category
                              </label>
                              <select
                                value={editingProduct.category}
                                onChange={e =>
                                  setEditingProduct({ ...editingProduct, category: e.target.value as Product['category'] })
                                }
                                className="w-full px-3 py-1.5 rounded-xl border border-[#D0C8B8] text-xs font-semibold text-[#0E2A47] bg-white focus:border-[#0E2A47] focus:outline-none"
                              >
                                <option value="oil">Cold Pressed Oil (oil)</option>
                                <option value="bilona-ghee">A2 Bilona Desi Ghee (bilona-ghee)</option>
                                <option value="mustard-oils">Mustard Oils (mustard-oils)</option>
                                <option value="nut-seed-oils">Nut &amp; Seed Oils (nut-seed-oils)</option>
                                <option value="wellness-rogan">Wellness &amp; Rogan (wellness-rogan)</option>
                                <option value="combos">Combos &amp; Gift Packs (combos)</option>
                              </select>
                            </div>

                            {/* Short Tagline / Description */}
                            <div>
                              <label className="block text-[10px] font-bold text-[#5A5248] uppercase tracking-wider mb-1">
                                Short Tagline / Description
                              </label>
                              <textarea
                                rows={2}
                                value={editingProduct.shortDesc || ''}
                                onChange={e =>
                                  setEditingProduct({ ...editingProduct, shortDesc: e.target.value })
                                }
                                placeholder="Cold-pressed extraction from premium grade seeds..."
                                className="w-full px-3 py-1.5 rounded-xl border border-[#D0C8B8] text-xs font-normal text-[#1C1A16] bg-white focus:border-[#0E2A47] focus:outline-none resize-none"
                              />
                            </div>
                          </div>
                        </div>

                        {/* COLUMN 2: PRICING, MASTER STOCK & MARKETING (4 cols) */}
                        <div className="lg:col-span-4 bg-[#FAF8F3] p-4 rounded-2xl border border-[#E8E0D0] flex flex-col justify-between space-y-3">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-[#E8E0D0] pb-2">
                              <span className="font-serif font-bold text-xs text-[#0E2A47] uppercase tracking-wide flex items-center gap-1.5">
                                <FiDollarSign className="w-3.5 h-3.5 text-[#B8860B]" />
                                <span>2. Stock &amp; Pricing Control</span>
                              </span>
                              <span className="text-[10px] text-[#8A7E6E]">Master &amp; Offers</span>
                            </div>

                            {/* Master Product Availability Card */}
                            <div
                              className={`p-3.5 rounded-2xl border transition-all ${
                                editingProduct.inStock
                                  ? 'bg-emerald-50 border-emerald-300'
                                  : 'bg-red-50 border-red-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div>
                                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#5A5248] block">
                                    Overall Product Availability
                                  </span>
                                  <h5
                                    className={`font-bold text-xs sm:text-sm ${
                                      editingProduct.inStock ? 'text-emerald-950' : 'text-red-950'
                                    }`}
                                  >
                                    {editingProduct.inStock
                                      ? '● Entire Product IN STOCK'
                                      : '✕ Entire Product OUT OF STOCK'}
                                  </h5>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setEditingProduct({
                                      ...editingProduct,
                                      inStock: !editingProduct.inStock,
                                    })
                                  }
                                  className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 cursor-pointer shadow-xs border transition-colors ${
                                    editingProduct.inStock
                                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
                                      : 'bg-red-600 hover:bg-red-700 text-white border-red-700'
                                  }`}
                                >
                                  {editingProduct.inStock ? 'In Stock (Turn Off)' : 'Out of Stock (Turn On)'}
                                </button>
                              </div>
                              <p
                                className={`text-[10px] mt-1.5 ${
                                  editingProduct.inStock ? 'text-emerald-800' : 'text-red-800'
                                }`}
                              >
                                {editingProduct.inStock
                                  ? 'Active on storefront. Individual sizes below can still be marked out of stock.'
                                  : 'Disables all purchases and marks this product completely Out of Stock.'}
                              </p>
                            </div>

                            {/* Base Pricing Box */}
                            <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-[#D0C8B8]">
                              <div>
                                <label className="block text-[10px] font-bold text-[#5A5248] uppercase tracking-wider mb-1">
                                  Base Price (₹)
                                </label>
                                <input
                                  type="number"
                                  required
                                  value={editingProduct.price}
                                  onChange={e =>
                                    setEditingProduct({
                                      ...editingProduct,
                                      price: Number(e.target.value),
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#D0C8B8] focus:border-[#0E2A47] focus:outline-none text-[#1C1A16] font-bold text-sm bg-[#FAF8F3]"
                                />
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <label className="block text-[10px] font-bold text-[#5A5248] uppercase tracking-wider">
                                    Base MRP (₹)
                                  </label>
                                  <span className="text-[10px] font-bold text-emerald-700">
                                    {editingProduct.originalPrice > editingProduct.price
                                      ? `${Math.round(
                                          ((editingProduct.originalPrice - editingProduct.price) /
                                            editingProduct.originalPrice) *
                                            100
                                        )}% OFF`
                                      : 'No Off'}
                                  </span>
                                </div>
                                <input
                                  type="number"
                                  required
                                  value={editingProduct.originalPrice}
                                  onChange={e =>
                                    setEditingProduct({
                                      ...editingProduct,
                                      originalPrice: Number(e.target.value),
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#D0C8B8] focus:border-[#0E2A47] focus:outline-none text-[#1C1A16] font-bold text-sm bg-[#FAF8F3]"
                                />
                              </div>
                            </div>

                            {/* Most Selling / Best Seller Toggle */}
                            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#D0C8B8]">
                              <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-sm font-bold shrink-0">
                                  🔥
                                </span>
                                <div>
                                  <span className="font-bold text-xs text-[#0E2A47] block">
                                    Most Selling / Best Seller
                                  </span>
                                  <span className="text-[10px] text-[#8A7E6E] block">
                                    Highlights product to customers
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    bestSeller: !Boolean(editingProduct.bestSeller),
                                  })
                                }
                                className={`px-3 py-1 rounded-lg font-bold text-[11px] shrink-0 cursor-pointer border transition-colors ${
                                  editingProduct.bestSeller
                                    ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600'
                                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border-stone-300'
                                }`}
                              >
                                {editingProduct.bestSeller ? '🔥 Active' : 'Off'}
                              </button>
                            </div>

                            {/* Special Discount Offer Section */}
                            <div
                              className={`p-3 rounded-xl border transition-all space-y-2.5 ${
                                editingProduct.isSpecialOffer
                                  ? 'bg-orange-50/70 border-orange-300'
                                  : 'bg-white border-[#D0C8B8]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-900 flex items-center justify-center text-sm font-bold shrink-0">
                                    ⚡
                                  </span>
                                  <div>
                                    <span className="font-bold text-xs text-[#0E2A47] block">
                                      Special Discount Offer
                                    </span>
                                    <span className="text-[10px] text-[#8A7E6E] block">
                                      Adds deal badge &amp; banner
                                    </span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextState = !Boolean(editingProduct.isSpecialOffer);
                                    setEditingProduct({
                                      ...editingProduct,
                                      isSpecialOffer: nextState,
                                      specialOffer:
                                        nextState && !editingProduct.specialOffer
                                          ? 'Special 15% OFF'
                                          : editingProduct.specialOffer,
                                    });
                                  }}
                                  className={`px-3 py-1 rounded-lg font-bold text-[11px] shrink-0 cursor-pointer border transition-colors ${
                                    editingProduct.isSpecialOffer
                                      ? 'bg-orange-600 hover:bg-orange-700 text-white border-orange-700'
                                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border-stone-300'
                                  }`}
                                >
                                  {editingProduct.isSpecialOffer ? '⚡ Active' : 'Enable'}
                                </button>
                              </div>

                              {editingProduct.isSpecialOffer && (
                                <div className="pt-2 border-t border-orange-200 space-y-2">
                                  <input
                                    type="text"
                                    placeholder="Badge text (e.g. Special 15% OFF)"
                                    value={editingProduct.specialOffer || ''}
                                    onChange={e =>
                                      setEditingProduct({
                                        ...editingProduct,
                                        specialOffer: e.target.value,
                                      })
                                    }
                                    className="w-full px-2.5 py-1.5 rounded-lg border border-orange-300 focus:border-orange-600 focus:outline-none bg-white text-xs font-bold text-orange-950"
                                  />
                                  <div className="flex flex-wrap items-center gap-1">
                                    {[
                                      'Special 10% OFF',
                                      'Special 15% OFF',
                                      'Special 20% OFF',
                                      'Festive Special',
                                      'Super Saver',
                                    ].map(preset => (
                                      <button
                                        type="button"
                                        key={preset}
                                        onClick={() =>
                                          setEditingProduct({
                                            ...editingProduct,
                                            specialOffer: preset,
                                          })
                                        }
                                        className={`text-[9px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                                          editingProduct.specialOffer === preset
                                            ? 'bg-orange-600 text-white border-orange-600 font-bold'
                                            : 'bg-white hover:bg-orange-100 text-orange-900 border-orange-200'
                                        }`}
                                      >
                                        {preset}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* COLUMN 3: QUANTITY VARIANTS & SPECIFIC STOCKS (4 cols) */}
                        <div className="lg:col-span-4 bg-[#FAF8F3] p-4 rounded-2xl border border-[#E8E0D0] flex flex-col justify-between space-y-3">
                          <div className="space-y-3 flex-1 flex flex-col min-h-0">
                            <div className="flex items-center justify-between border-b border-[#E8E0D0] pb-2 shrink-0">
                              <div>
                                <span className="font-serif font-bold text-xs text-[#0E2A47] uppercase tracking-wide flex items-center gap-1.5">
                                  <FiPackage className="w-3.5 h-3.5 text-[#B8860B]" />
                                  <span>3. Quantities &amp; Sizes</span>
                                </span>
                                <span className="text-[10px] text-[#8A7E6E]">
                                  {editingProduct.volumes?.length || 0} Types Configured
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={handleAddVolume}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0E2A47] hover:bg-[#163A60] text-white text-[11px] font-semibold cursor-pointer shadow-xs"
                              >
                                <FiPlus className="w-3 h-3 text-[#F5E6B0]" />
                                <span>+ Add Size</span>
                              </button>
                            </div>

                            {/* Contained Scrollable List of Sizes */}
                            <div className="space-y-2 overflow-y-auto pr-1 flex-1 max-h-[38vh] lg:max-h-[360px]">
                              {editingProduct.volumes?.map((vol, idx) => {
                                const isVolInStock = vol.inStock !== false;

                                return (
                                  <div
                                    key={idx}
                                    className={`p-2.5 rounded-xl border transition-all space-y-2 ${
                                      isVolInStock
                                        ? 'bg-white border-[#D0C8B8]'
                                        : 'bg-red-50/50 border-red-200'
                                    }`}
                                  >
                                    {/* Line 1: Stock Status Button + Size Label + Delete */}
                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleToggleModalVolumeStock(idx)}
                                        title={`Click to mark this quantity ${isVolInStock ? 'Out of Stock' : 'In Stock'}`}
                                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] transition-colors cursor-pointer shrink-0 border ${
                                          isVolInStock
                                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
                                            : 'bg-red-600 hover:bg-red-700 text-white border-red-700'
                                        }`}
                                      >
                                        {isVolInStock ? '✓ In Stock' : '✕ Out'}
                                      </button>

                                      <input
                                        type="text"
                                        value={vol.size}
                                        onChange={e => {
                                          const updated = [...(editingProduct.volumes || [])];
                                          updated[idx] = { ...updated[idx], size: e.target.value };
                                          setEditingProduct({ ...editingProduct, volumes: updated });
                                        }}
                                        placeholder="Size name (e.g. 200ml (PET bottle))"
                                        className="flex-1 px-2 py-1 rounded-md border border-[#D0C8B8] text-xs font-semibold bg-[#FAF8F3]"
                                      />

                                      <button
                                        type="button"
                                        onClick={() => handleDeleteVolume(idx)}
                                        title="Delete this quantity variant"
                                        className="p-1 text-stone-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                                      >
                                        <FiTrash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>

                                    {/* Line 2: Price, MRP & Packaging */}
                                    <div className="grid grid-cols-3 gap-2 items-center text-[10px]">
                                      <div>
                                        <span className="text-[#8A7E6E] block font-medium">Price (₹)</span>
                                        <input
                                          type="number"
                                          value={vol.price}
                                          onChange={e => {
                                            const updated = [...(editingProduct.volumes || [])];
                                            updated[idx] = { ...updated[idx], price: Number(e.target.value) };
                                            setEditingProduct({ ...editingProduct, volumes: updated });
                                          }}
                                          className="w-full px-1.5 py-0.5 rounded border border-[#D0C8B8] text-xs font-bold bg-[#FAF8F3]"
                                        />
                                      </div>

                                      <div>
                                        <span className="text-[#8A7E6E] block font-medium">MRP (₹)</span>
                                        <input
                                          type="number"
                                          value={vol.originalPrice}
                                          onChange={e => {
                                            const updated = [...(editingProduct.volumes || [])];
                                            updated[idx] = { ...updated[idx], originalPrice: Number(e.target.value) };
                                            setEditingProduct({ ...editingProduct, volumes: updated });
                                          }}
                                          className="w-full px-1.5 py-0.5 rounded border border-[#D0C8B8] text-xs font-bold bg-[#FAF8F3]"
                                        />
                                      </div>

                                      <div>
                                        <span className="text-[#8A7E6E] block font-medium">Packaging</span>
                                        <input
                                          type="text"
                                          value={vol.packaging || ''}
                                          onChange={e => {
                                            const updated = [...(editingProduct.volumes || [])];
                                            updated[idx] = { ...updated[idx], packaging: e.target.value };
                                            setEditingProduct({ ...editingProduct, volumes: updated });
                                          }}
                                          placeholder="e.g. Glass Jar"
                                          className="w-full px-1.5 py-0.5 rounded border border-[#D0C8B8] text-xs font-medium bg-[#FAF8F3]"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Quantities Status Summary */}
                            <div className="pt-2 border-t border-[#E8E0D0] flex items-center justify-between text-[11px] font-semibold shrink-0">
                              <span className="text-[#5A5248]">Stock Summary:</span>
                              <div className="flex items-center gap-2">
                                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  {(editingProduct.volumes || []).filter(v => v.inStock !== false).length} In Stock
                                </span>
                                {(editingProduct.volumes || []).filter(v => v.inStock === false).length > 0 && (
                                  <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                                    {(editingProduct.volumes || []).filter(v => v.inStock === false).length} Out
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Fixed Landscape Modal Footer */}
                    <div className="shrink-0 px-6 py-3 border-t border-[#E8E0D0] bg-[#FAF8F3] flex items-center justify-between">
                      <div className="text-[11px] text-[#8A7E6E] hidden sm:block">
                        ⚡ Changes reflect instantly on the website storefront upon saving.
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="px-4 py-2.5 rounded-xl border border-[#D0C8B8] text-[#5A5248] font-semibold text-xs hover:bg-stone-200 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSavingProduct}
                          className="px-6 py-2.5 rounded-xl bg-[#0E2A47] hover:bg-[#163A60] text-[#F5E6B0] font-semibold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          <FiSave className="w-4 h-4" />
                          <span>{isSavingProduct ? 'Saving to Database...' : 'Save All Changes'}</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: GOOGLE SHEETS LIVE SYNC                          */}
        {/* ======================================================== */}
        {activeTab === 'sheets' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Sheet URL Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E0D0] shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-wider">
                  Live Spreadsheet Integration
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0E2A47]">
                  Google Sheet Auto-Sync Setup
                </h2>
                <p className="text-xs text-[#5A5248] leading-relaxed">
                  Every order placed on the website automatically appends a new row to your Google Sheet with the unique Order ID, customer name, phone, address, items, and total amount.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#1C1A16] uppercase tracking-wider">
                  Google Apps Script Web App URL
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                    value={googleWebhookUrl}
                    onChange={e => setGoogleWebhookUrl(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-[#D0C8B8] focus:border-[#0E2A47] focus:outline-none text-[#1C1A16] text-xs sm:text-sm font-mono"
                  />
                  <button
                    onClick={handleSaveGoogleSheetUrl}
                    disabled={isSavingSettings}
                    className="px-6 py-3 rounded-xl bg-[#0E2A47] hover:bg-[#163A60] text-[#F5E6B0] font-semibold text-xs shadow-sm transition-colors cursor-pointer shrink-0"
                  >
                    {isSavingSettings ? 'Saving...' : 'Save Webhook URL'}
                  </button>
                </div>
              </div>

              {/* Test Button */}
              <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#E8E0D0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="font-semibold text-xs text-[#1C1A16]">Verify Connection</h4>
                  <p className="text-[11px] text-[#8A7E6E]">
                    Sends a test order row directly to your Google Sheet to confirm synchronization.
                  </p>
                </div>
                <button
                  onClick={handleTestGoogleSheet}
                  disabled={isTestingSheet || !googleWebhookUrl}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
                    !googleWebhookUrl
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isTestingSheet ? 'Pinging Google Sheet...' : 'Test Google Sheet Connection'}
                </button>
              </div>

              {sheetTestResult && (
                <div
                  className={`p-4 rounded-xl text-xs font-semibold border ${
                    sheetTestResult.success
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}
                >
                  {sheetTestResult.message}
                </div>
              )}
            </div>

            {/* Step-by-Step Instructions & Copy Code */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E0D0] shadow-xs space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0E2A47]">
                  How to Connect Google Sheet in 60 Seconds
                </h3>
                <ol className="list-decimal list-inside text-xs text-[#5A5248] space-y-2 mt-3 leading-relaxed">
                  <li>Open Google Sheets and create a new blank spreadsheet (e.g. named &ldquo;RKW Orders&rdquo;).</li>
                  <li>Click on <strong>Extensions &gt; Apps Script</strong> in the top menu.</li>
                  <li>Delete any existing code, and paste the code snippet below.</li>
                  <li>Click <strong>Deploy &gt; New deployment</strong>.</li>
                  <li>Select type: <strong>Web app</strong>. Set &ldquo;Execute as&rdquo; to <strong>Me</strong> and &ldquo;Who has access&rdquo; to <strong>Anyone</strong>.</li>
                  <li>Click <strong>Deploy</strong>, grant permission, and paste the generated Web App URL into the box above!</li>
                </ol>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#5A5248] uppercase tracking-wider">
                    Ready-to-Use Google Apps Script Code
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(scriptTemplate);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-stone-100 border border-[#D0C8B8] text-xs font-semibold text-[#0E2A47] cursor-pointer"
                  >
                    {copiedCode ? <FiCheck className="text-emerald-600" /> : <FiCopy />}
                    <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-[#0E2A47] text-[#E2E8F0] text-[11px] font-mono overflow-x-auto max-h-64 leading-relaxed">
                  {scriptTemplate}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
