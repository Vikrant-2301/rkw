'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { ProductVolume } from '@/types';
import { useCart } from '@/context/CartContext';
import { FiArrowRight, FiPlus, FiMinus, FiCheck, FiShoppingBag, FiChevronRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { ProductCard } from '@/components/ProductCard';
import { SITE_CONFIG } from '@/config/site';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const slug = params?.id as string;
  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  const [selectedVolume, setSelectedVolume] = useState<ProductVolume>(
    product?.volumes[0] || { size: '1 Liter', price: 360, originalPrice: 450, packaging: 'Bottle' }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'nutrition' | 'extraction' | 'lab'>('benefits');
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

  const allImages = [product.image, ...(product.additionalImages || [])];
  const currentImage = allImages[activeImageIndex] || product.image;

  const handleAddToCart = () => {
    addToCart(product, selectedVolume, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVolume, quantity);
    router.push('/checkout');
  };

  const discountPercent = Math.round(
    ((selectedVolume.originalPrice - selectedVolume.price) / selectedVolume.originalPrice) * 100
  );

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const tabs = [
    { id: 'benefits', label: 'Benefits' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'extraction', label: 'Extraction' },
    { id: 'lab', label: 'Lab Report' },
  ];

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [`https://www.rameshkolhuwale.com${product.image}`],
    "description": product.description,
    "sku": `RKW-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "Ramesh Kolhu Wale"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.rameshkolhuwale.com/product/${product.slug}`,
      "priceCurrency": "INR",
      "price": selectedVolume.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Ramesh Kolhu Wale"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewsCount
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#8A7E6E] mb-10">
        <Link href="/" className="hover:text-[#0E2A47] transition-colors">Home</Link>
        <FiChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-[#0E2A47] transition-colors">Shop</Link>
        <FiChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1C1A16] font-medium truncate">{product.name}</span>
      </nav>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
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
              Cold-pressed below 38°C in traditional slow Kolhu. No chemical solvents, zero refinement, and Agmark standard 100% pure guarantee.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-7">
          {/* Rating + name */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-[#B8860B]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-[#B8860B]' : 'text-[#D0C8B8]'}`}>★</span>
                ))}
              </div>
              <span className="text-xs text-[#8A7E6E] font-medium">{product.rating} ({product.reviewsCount} reviews)</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal leading-snug">
              {product.name}
            </h1>
            <p className="text-[#8A7E6E] text-sm mt-2 font-medium">{product.hindiName}</p>
          </div>

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

          {/* Volume picker */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[#8A7E6E] uppercase tracking-wider">Select size</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {product.volumes.map((vol) => {
                const isSelected = selectedVolume.size === vol.size;
                return (
                  <button
                    key={vol.size}
                    onClick={() => setSelectedVolume(vol)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0E2A47] bg-[#EBF2F8] shadow-xs'
                        : 'border-[#E8E0D0] hover:border-[#D0C8B8] bg-white'
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#1C1A16]">{vol.size}</p>
                    <p className="text-sm font-bold text-[#0E2A47] mt-1">₹{vol.price}</p>
                    <p className="text-[10px] text-[#8A7E6E] mt-0.5 truncate">{vol.packaging}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + CTAs */}
          <div className="space-y-3 pt-1">
            <div className="flex gap-3">
              <div className="flex items-center border border-[#D0C8B8] rounded-full overflow-hidden h-12 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 text-[#5A5248] hover:bg-[#EBF2F8] transition-colors h-full cursor-pointer"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold text-[#1C1A16] min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 text-[#5A5248] hover:bg-[#EBF2F8] transition-colors h-full cursor-pointer"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-12 px-6 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  addedMessage
                    ? 'bg-[#0E2A47] text-white'
                    : 'bg-[#0E2A47] text-white hover:bg-[#163A60]'
                }`}
              >
                {addedMessage ? <><FiCheck className="w-4 h-4 text-emerald-400" /> Added to Basket</> : <><FiShoppingBag className="w-4 h-4" /> Add to Basket</>}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full h-12 px-6 rounded-full border-2 border-[#0E2A47] text-[#0E2A47] font-semibold text-sm hover:bg-[#0E2A47] hover:text-white transition-all cursor-pointer"
            >
              Buy Now
            </button>

            <a
              href={`https://wa.me/91${SITE_CONFIG.contact.whatsappRaw}?text=Hello%20Ramesh%20Kolhu%20Wale%2C%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(${selectedVolume.size})`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <FaWhatsapp className="text-base" /> Order via WhatsApp
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
              <p>Agmark R.B.O. Quality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-20">
        <div className="border-b border-[#E8E0D0] flex gap-6 mb-8 overflow-x-auto">
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

        {activeTab === 'nutrition' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(product.nutritionalInfo).map(([key, val]) => (
                <div key={key} className="p-4 rounded-xl bg-white border border-[#E8E0D0]">
                  <p className="text-xs text-[#8A7E6E] capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-sm font-bold text-[#0E2A47] mt-1">{val}</p>
                </div>
              ))}
            </div>
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
            <Link href="/lab-reports" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E2A47] hover:text-[#B8860B] transition-colors">
              View full lab reports <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Related */}
      <div className="space-y-8">
        <h3 className="font-serif text-2xl text-[#1C1A16] font-normal">You may also like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
