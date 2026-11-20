'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { useLiveProducts } from '@/hooks/useLiveProducts';
import { ProductVolume } from '@/types';
import { useCart } from '@/context/CartContext';
import { FiArrowRight, FiPlus, FiMinus, FiCheck, FiShoppingBag, FiChevronRight, FiSlash, FiAlertCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { ProductCard } from '@/components/ProductCard';
import { SITE_CONFIG } from '@/config/site';

export function ProductDetailClient({ initialSlug }: { initialSlug?: string }) {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const slug = (initialSlug || params?.id) as string;
  const { products: liveProducts } = useLiveProducts();
  const product = liveProducts.find((p) => p.slug === slug || p.id === slug) || PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  const [selectedVolume, setSelectedVolume] = useState<ProductVolume>(
    product?.volumes.find((v) => v.size.startsWith('1L') && v.inStock !== false) ||
    product?.volumes.find((v) => v.inStock !== false) ||
    product?.volumes[0] ||
    { size: '1L (PET bottle)', price: 340, originalPrice: 420, packaging: 'PET bottle' }
  );

  // Sync selected volume when live products change
  useEffect(() => {
    if (product && Array.isArray(product.volumes) && product.volumes.length > 0) {
      setSelectedVolume((prev) => {
        const found = product.volumes.find((v) => v.size === prev.size);
        if (found) return found;
        const firstInStock = product.volumes.find((v) => v.inStock !== false);
        return firstInStock || product.volumes[0];
      });
    }
  }, [product]);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'extraction' | 'lab'>('benefits');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedMessage, setAddedMessage] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-5">
        <h1 className="font-serif text-3xl text-[#1C1A16] font-normal">Product Not Found</h1>
        <p className="text-[#8A7E6E]">This product may have been moved or is no longer available.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E2A47] text-white rounded-full font-semibold text-sm hover:bg-[#163A60] transition-colors"
        >
          Return to Shop <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Stock status checks
  const allVolumesOutOfStock =
    Array.isArray(product.volumes) &&
    product.volumes.length > 0 &&
    product.volumes.every((v) => v.inStock === false);

  const isProductOutOfStock = product.inStock === false || allVolumesOutOfStock;
  const isSelectedVolumeOutOfStock = isProductOutOfStock || selectedVolume?.inStock === false;

  const allImages = [product.image, ...(product.additionalImages || [])];
  const currentImage = allImages[activeImageIndex] || product.image;

  const handleAddToCart = () => {
    if (isSelectedVolumeOutOfStock) return;
    addToCart(product, selectedVolume, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    if (isSelectedVolumeOutOfStock) return;
    addToCart(product, selectedVolume, quantity);
    router.push('/checkout');
  };

  const discountPercent = Math.round(
    ((selectedVolume.originalPrice - selectedVolume.price) / selectedVolume.originalPrice) * 100
  );

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const tabs = [
    { id: 'benefits', label: 'Benefits' },
    { id: 'extraction', label: 'Extraction' },
    { id: 'lab', label: 'Lab Report' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#8A7E6E] mb-10" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#0E2A47] transition-colors">Home</Link>
        <FiChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-[#0E2A47] transition-colors">Shop</Link>
        <FiChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1C1A16] font-medium truncate">{product.name}</span>
      </nav>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-14 sm:mb-20">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#EBF2F8] shadow-sm">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#0E2A47] text-white text-xs font-semibold rounded-full shadow-md">
                {discountPercent}% off
              </span>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#0E2A47] shadow-xs'
                      : 'border-[#E8E0D0] opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
          {/* Quality note */}
          <div className="bg-[#EBF2F8] rounded-xl p-4 flex items-start gap-3 border border-[#163A60]/10">
            <FiCheck className="w-4 h-4 text-[#0E2A47] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#5A5248] leading-relaxed">
              Cold-pressed in traditional slow Kolhu. No chemical solvents, zero refinement, and 100% pure natural guarantee.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-7">
          {/* Rating + name */}
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <div className="flex text-[#B8860B]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-[#B8860B]' : 'text-[#D0C8B8]'}`}>★</span>
                ))}
              </div>
              <span className="text-xs text-[#8A7E6E] font-medium">{product.rating} ({product.reviewsCount} reviews)</span>
              {product.bestSeller && (
                <span className="px-2.5 py-0.5 bg-[#F2B705] text-[#0E2A47] text-[11px] font-bold rounded-full border border-[#D9A304] flex items-center gap-1 shadow-xs">
                  <span>🔥</span> Most Selling
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal leading-snug">
              {product.name}
            </h1>
            <p className="text-[#8A7E6E] text-sm mt-2 font-medium">{product.hindiName}</p>
          </div>

          {/* Special Offer Callout Banner */}
          {product.isSpecialOffer && (
            <div className="p-3.5 bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 border border-orange-300 rounded-2xl flex items-center justify-between gap-3 text-orange-950 shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  ⚡
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800 block">
                    Special Discount Offer
                  </span>
                  <p className="text-xs font-semibold text-orange-950">
                    {product.specialOffer || 'Special Promotional Discount Applied!'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-orange-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                Deal Active
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#0E2A47]">₹{selectedVolume.price}</span>
            {selectedVolume.originalPrice > selectedVolume.price && (
              <>
                <span className="text-[#A09585] line-through text-base">₹{selectedVolume.originalPrice}</span>
                <span className="text-xs font-semibold text-[#0E2A47] bg-[#EBF2F8] px-2.5 py-1 rounded-full">
                  Save ₹{selectedVolume.originalPrice - selectedVolume.price}
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-[#5A5248] leading-relaxed">{product.description}</p>

          {/* Out of Stock Warning Banners */}
          {isProductOutOfStock ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-800">
              <FiAlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Product Currently Out of Stock</p>
                <p className="text-xs text-red-700 mt-0.5">
                  This product is temporarily sold out online. Please visit our live Delhi NCR Units or message us on WhatsApp for fresh batch dates.
                </p>
              </div>
            </div>
          ) : isSelectedVolumeOutOfStock ? (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-900">
              <FiAlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs">Selected Size Out of Stock</p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  <strong>{selectedVolume.size}</strong> is currently out of stock. Please select another available size below or inquire on WhatsApp.
                </p>
              </div>
            </div>
          ) : null}

          {/* Volume picker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#8A7E6E] uppercase tracking-wider">Select size</p>
              {isSelectedVolumeOutOfStock && (
                <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                  Size Sold Out
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {product.volumes.map((vol) => {
                const isSelected = selectedVolume.size === vol.size;
                const isVolOutOfStock = isProductOutOfStock || vol.inStock === false;

                return (
                  <button
                    key={vol.size}
                    onClick={() => setSelectedVolume(vol)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? isVolOutOfStock
                          ? 'border-red-400 bg-red-50/60 shadow-xs'
                          : 'border-[#0E2A47] bg-[#EBF2F8] shadow-xs'
                        : isVolOutOfStock
                        ? 'border-red-200 bg-stone-50/70 hover:border-red-300'
                        : 'border-[#E8E0D0] hover:border-[#D0C8B8] bg-white'
                    }`}
                  >
                    {isVolOutOfStock && (
                      <span className="absolute top-1.5 right-1.5 text-[9px] font-bold text-red-600 bg-red-100/90 px-1.5 py-0.2 rounded-full uppercase tracking-tight">
                        Out of stock
                      </span>
                    )}
                    <p className={`text-xs font-semibold ${isVolOutOfStock ? 'text-stone-500' : 'text-[#1C1A16]'}`}>
                      {vol.size}
                    </p>
                    <p className={`text-sm font-bold mt-1 ${isVolOutOfStock ? 'text-stone-500' : 'text-[#0E2A47]'}`}>
                      ₹{vol.price}
                    </p>
                    <p className="text-[10px] text-[#8A7E6E] mt-0.5 truncate">{vol.packaging}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + CTAs */}
          <div className="space-y-3 pt-1">
            <div className="flex gap-3">
              <div
                className={`flex items-center border border-[#D0C8B8] rounded-full overflow-hidden h-12 bg-white ${
                  isSelectedVolumeOutOfStock ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isSelectedVolumeOutOfStock}
                  className="px-4 text-[#5A5248] hover:bg-[#EBF2F8] transition-colors h-full cursor-pointer disabled:cursor-not-allowed"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold text-[#1C1A16] min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isSelectedVolumeOutOfStock}
                  className="px-4 text-[#5A5248] hover:bg-[#EBF2F8] transition-colors h-full cursor-pointer disabled:cursor-not-allowed"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isSelectedVolumeOutOfStock}
                className={`flex-1 h-12 px-6 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                  isSelectedVolumeOutOfStock
                    ? 'bg-stone-300 text-stone-600 cursor-not-allowed shadow-none'
                    : addedMessage
                    ? 'bg-[#0E2A47] text-white cursor-pointer'
                    : 'bg-[#0E2A47] text-white hover:bg-[#163A60] cursor-pointer'
                }`}
              >
                {isSelectedVolumeOutOfStock ? (
                  <>
                    <FiSlash className="w-4 h-4 text-red-500" /> Out of Stock
                  </>
                ) : addedMessage ? (
                  <>
                    <FiCheck className="w-4 h-4 text-emerald-400" /> Added to Basket
                  </>
                ) : (
                  <>
                    <FiShoppingBag className="w-4 h-4" /> Add to Basket
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={isSelectedVolumeOutOfStock}
              className={`w-full h-12 px-6 rounded-full border-2 font-semibold text-sm transition-all ${
                isSelectedVolumeOutOfStock
                  ? 'border-stone-300 text-stone-400 bg-stone-100 cursor-not-allowed'
                  : 'border-[#0E2A47] text-[#0E2A47] hover:bg-[#0E2A47] hover:text-white cursor-pointer'
              }`}
            >
              {isSelectedVolumeOutOfStock ? 'Selected Size Unavailable' : 'Buy Now'}
            </button>

            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                isSelectedVolumeOutOfStock
                  ? `Hello Ramesh Kolhu Wale, when will ${product.name} (${selectedVolume.size}) be back in stock? Please notify me!`
                  : `Hello Ramesh Kolhu Wale, I want to order ${product.name} (${selectedVolume.size})`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <FaWhatsapp className="text-base" />
              <span>
                {isSelectedVolumeOutOfStock ? 'Inquire on WhatsApp about Stock' : 'Order via WhatsApp'}
              </span>
            </a>
          </div>

          {/* Quick trust */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E8E0D0] text-xs text-[#5A5248]">
            <div>
              <p className="font-semibold text-[#0E2A47]">Free delivery</p>
              <p>Delhi NCR on orders ₹799+</p>
            </div>
            <div>
              <p className="font-semibold text-[#0E2A47]">100% Pure Guarantee</p>
              <p>Traditional Kolhu Quality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12 sm:mb-20">
        <div className="border-b border-[#E8E0D0] flex gap-4 sm:gap-6 mb-6 sm:mb-8 overflow-x-auto rkw-no-bar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#0E2A47] text-[#0E2A47]'
                  : 'border-transparent text-[#8A7E6E] hover:text-[#1C1A16]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'benefits' && (
          <div className="space-y-5">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#5A5248] p-4 rounded-xl bg-white border border-[#E8E0D0]">
                  <FiCheck className="text-[#0E2A47] w-4 h-4 flex-shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
            {product.smokePoint && (
              <p className="text-sm text-[#5A5248] bg-[#EBF2F8] px-4 py-3 rounded-xl border border-[#163A60]/10">
                <strong>Smoke Point:</strong> {product.smokePoint}
              </p>
            )}
          </div>
        )}

        {activeTab === 'extraction' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Method', value: product.extractionDetails.method },
              { label: 'Temperature', value: product.extractionDetails.temperature },
              { label: 'RPM Speed', value: product.extractionDetails.rpm },
              { label: 'Seed Origin', value: product.extractionDetails.seedOrigin },
              { label: 'Cold-Press Mechanism', value: product.extractionDetails.pressType || 'Traditional Cold-Press Ghani' },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-white border border-[#E8E0D0]">
                <p className="text-xs text-[#8A7E6E] font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-[#0E2A47] mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'lab' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Purity Rating', value: product.labReportSummary.purity },
                { label: 'Adulteration Test', value: product.labReportSummary.adulteration },
                { label: 'Argemone Screen', value: product.labReportSummary.argemone },
                { label: 'Free Fatty Acid', value: product.labReportSummary.freeFattyAcid },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-white border border-[#E8E0D0] flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#8A7E6E] font-medium">{item.label}</p>
                    <p className="text-sm font-bold text-[#0E2A47] mt-0.5">{item.value}</p>
                  </div>
                  <FiCheck className="w-5 h-5 text-[#0E2A47]" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related: 2 columns on mobile, 4 on desktop */}
      <div className="space-y-6 sm:space-y-8">
        <h3 className="font-serif text-2xl text-[#1C1A16] font-normal">You may also like</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
