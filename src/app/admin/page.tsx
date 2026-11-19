'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  FiFileText
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
          price: Number(editingProduct.price),
          originalPrice: Number(editingProduct.originalPrice),
          inStock: Boolean(editingProduct.inStock),
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
        {/* TAB 2: PRODUCTS & PRICE CONTROL                          */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E0D0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0E2A47]">All Products Pricing &amp; MRP</h2>
                <p className="text-xs text-[#8A7E6E] mt-0.5">
                  Update selling price, original MRP, or stock availability. Changes reflect in real time.
                </p>
              </div>

              <button
                onClick={fetchProducts}
                disabled={productsLoading}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF8F3] border border-[#D0C8B8] hover:bg-white text-xs font-semibold text-[#0E2A47] cursor-pointer"
              >
                <FiRefreshCw className={`w-3.5 h-3.5 ${productsLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Catalog</span>
              </button>
            </div>

            {productSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold animate-fadeIn">
                {productSuccessMsg}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => {
                const discountPercent = Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                );

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl p-5 border border-[#E8E0D0] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="space-y-3">
                      <div className="flex gap-3 items-center">
                        <div className="relative w-16 h-16 rounded-xl bg-[#FAF8F3] border border-[#E8E0D0] overflow-hidden shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-wider">
                            {product.category}
                          </span>
                          <h3 className="font-serif font-bold text-sm text-[#0E2A47] truncate">
                            {product.name}
                          </h3>
                          <p className="text-[11px] text-[#8A7E6E] truncate">{product.hindiName}</p>
                        </div>
                      </div>

                      {/* Pricing Tag */}
                      <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E8E0D0] flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[#8A7E6E] block text-[10px]">Current Selling Price</span>
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

                      {/* Volumes List */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8A7E6E]">
                          Available Volumes ({product.volumes?.length || 0})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.volumes?.slice(0, 4).map(vol => (
                            <span
                              key={vol.size}
                              className="text-[10px] font-medium bg-[#F2EEE5] text-[#5A5248] px-2 py-0.5 rounded-md"
                            >
                              {vol.size}: ₹{vol.price}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E8E0D0] flex items-center justify-between">
                      <span
                        className={`text-[11px] font-semibold flex items-center gap-1.5 ${
                          product.inStock ? 'text-emerald-700' : 'text-red-600'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-600' : 'bg-red-600'}`} />
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>

                      <button
                        onClick={() => setEditingProduct(product)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0E2A47] hover:bg-[#163A60] text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                      >
                        <FiEdit className="w-3 h-3" />
                        <span>Edit Prices</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal: Edit Product Pricing */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8E0D0]">
                  <div className="flex justify-between items-start border-b border-[#E8E0D0] pb-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-wider">
                        Price &amp; MRP Editor
                      </span>
                      <h3 className="font-serif font-bold text-lg text-[#0E2A47]">{editingProduct.name}</h3>
                    </div>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="p-1.5 text-[#8A7E6E] hover:text-[#0E2A47] rounded-full hover:bg-stone-100 cursor-pointer"
                    >
                      <FiXCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-5 text-xs">
                    {/* Base Price & MRP */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-[#5A5248] uppercase tracking-wider mb-1.5">
                          Base Selling Price (₹)
                        </label>
                        <input
                          type="number"
                          required
                          value={editingProduct.price}
                          onChange={e =>
                            setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] focus:border-[#0E2A47] focus:outline-none text-[#1C1A16] font-semibold text-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-[#5A5248] uppercase tracking-wider mb-1.5">
                          Base MRP / Original Price (₹)
                        </label>
                        <input
                          type="number"
                          required
                          value={editingProduct.originalPrice}
                          onChange={e =>
                            setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] focus:border-[#0E2A47] focus:outline-none text-[#1C1A16] font-semibold text-sm"
                        />
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-3 p-3 bg-[#FAF8F3] rounded-xl border border-[#E8E0D0]">
                      <input
                        type="checkbox"
                        id="inStockCheck"
                        checked={editingProduct.inStock}
                        onChange={e =>
                          setEditingProduct({ ...editingProduct, inStock: e.target.checked })
                        }
                        className="w-4 h-4 text-[#0E2A47] rounded-sm focus:ring-[#0E2A47]"
                      />
                      <label htmlFor="inStockCheck" className="text-xs font-semibold text-[#1C1A16] cursor-pointer">
                        Product is In Stock &amp; Available for Ordering
                      </label>
                    </div>

                    {/* Volume Variant Pricing */}
                    <div className="space-y-3">
                      <label className="block font-semibold text-[#5A5248] uppercase tracking-wider">
                        Volume Variant Prices (e.g. 500ml, 1L, 2L, 5L, 15kg)
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {editingProduct.volumes?.map((vol, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8E0D0]"
                          >
                            <span className="font-semibold text-[#1C1A16] w-32 truncate">{vol.size}</span>
                            <div className="flex-1">
                              <span className="text-[10px] text-[#8A7E6E] block">Price (₹)</span>
                              <input
                                type="number"
                                value={vol.price}
                                onChange={e => {
                                  const updated = [...editingProduct.volumes];
                                  updated[idx] = { ...updated[idx], price: Number(e.target.value) };
                                  setEditingProduct({ ...editingProduct, volumes: updated });
                                }}
                                className="w-full px-2 py-1 rounded-md border border-[#D0C8B8] text-xs font-semibold"
                              />
                            </div>
                            <div className="flex-1">
                              <span className="text-[10px] text-[#8A7E6E] block">MRP (₹)</span>
                              <input
                                type="number"
                                value={vol.originalPrice}
                                onChange={e => {
                                  const updated = [...editingProduct.volumes];
                                  updated[idx] = { ...updated[idx], originalPrice: Number(e.target.value) };
                                  setEditingProduct({ ...editingProduct, volumes: updated });
                                }}
                                className="w-full px-2 py-1 rounded-md border border-[#D0C8B8] text-xs font-semibold"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-[#E8E0D0]">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="flex-1 py-3 rounded-xl border border-[#D0C8B8] text-[#5A5248] font-semibold text-xs hover:bg-[#FAF8F3] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingProduct}
                        className="flex-1 py-3 rounded-xl bg-[#0E2A47] hover:bg-[#163A60] text-[#F5E6B0] font-semibold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <FiSave className="w-4 h-4" />
                        <span>{isSavingProduct ? 'Saving to Database...' : 'Save Changes'}</span>
                      </button>
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
