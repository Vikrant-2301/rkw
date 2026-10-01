'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { ProductVolume } from '@/types';
import { useCart } from '@/context/CartContext';
import { 
  FiStar, 
  FiShoppingBag, 
  FiCheckCircle, 
  FiTruck, 
  FiShield, 
  FiArrowRight, 
  FiPlus, 
  FiMinus, 
  FiAward, 
  FiChevronRight,
  FiCheck 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { ProductCard } from '@/components/ProductCard';

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
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-stone-900 font-serif">Product Not Found</h1>
        <p className="text-stone-500">The product you are looking for might have been moved or updated.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-800 text-white rounded-xl font-bold"
        >
          <span>Return to Shop</span>
          <FiArrowRight />
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-10 pb-16 space-y-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 bg-white py-2 px-4 rounded-xl border border-stone-200/90 shadow-2xs">
          <Link href="/" className="hover:text-emerald-800 transition-colors">
            Home
          </Link>
          <FiChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/shop" className="hover:text-emerald-800 transition-colors">
            Shop
          </Link>
          <FiChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-emerald-800 font-bold truncate max-w-[200px] sm:max-w-md">
            {product.name}
          </span>
        </div>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-md">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-600 text-white shadow-md">
                {discountPercent}% OFF
              </span>
            )}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#062e22] text-amber-300 shadow-md border border-amber-400/40">
              {product.category === 'bilona-ghee' ? 'Vedic Bilona Churn' : 'Lakdi Ki Ghani'}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden relative border-2 transition-all flex-shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-emerald-600 scale-102 shadow-md'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Live Extraction Assurance */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-900 flex items-center justify-center flex-shrink-0">
              <FiCheckCircle className="w-5 h-5 text-emerald-900" />
            </div>
            <div className="text-xs">
              <h5 className="font-bold text-emerald-950 font-serif">
                आँखों के सामने ताजा निष्कर्षण, हर बूँद में विश्वास
              </h5>
              <p className="text-emerald-800/80 mt-0.5">
                Every batch pressed fresh in Delhi NCR at under 38°C without friction heat or chemical solvents.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Purchasing */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Reviews Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-700">{product.rating} / 5.0</span>
              <span className="text-xs text-stone-400">({product.reviewsCount} verified reviews)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 leading-tight font-serif">
              {product.name}
            </h1>
            <p className="text-base sm:text-lg text-emerald-800 font-bold mt-1 font-sans">
              {product.hindiName}
            </p>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold text-stone-900">
              ₹{selectedVolume.price}
            </span>
            {selectedVolume.originalPrice > selectedVolume.price && (
              <span className="text-base text-stone-400 line-through">
                ₹{selectedVolume.originalPrice}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md ml-auto">
              Save ₹{selectedVolume.originalPrice - selectedVolume.price}
            </span>
          </div>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Size / Volume Picker */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-stone-800">
                Select Size &amp; Packaging:
              </label>
              <span className="text-xs text-emerald-800 font-semibold">
                Selected: {selectedVolume.size}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {product.volumes.map((vol) => {
                const isSelected = selectedVolume.size === vol.size;
                return (
                  <button
                    key={vol.size}
                    type="button"
                    onClick={() => setSelectedVolume(vol)}
                    className={`min-h-[84px] p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-400'
                        : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-extrabold text-xs text-stone-900">{vol.size}</span>
                      {isSelected && (
                        <FiCheck className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                      )}
                    </div>
                    <div className="my-1">
                      <span className="text-sm text-emerald-800 font-extrabold">₹{vol.price}</span>
                    </div>
                    <span className="text-[10px] leading-tight text-stone-500 block truncate" title={vol.packaging}>
                      {vol.packaging}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between border border-stone-300 rounded-xl px-4 py-2.5 bg-stone-50 w-full sm:w-36 h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-stone-600 hover:text-stone-900"
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-stone-600 hover:text-stone-900"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Basket */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-12 px-6 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                  addedMessage
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-800 hover:bg-emerald-900 text-amber-200 hover:text-white'
                }`}
              >
                {addedMessage ? (
                  <>
                    <FiCheck className="w-4 h-4" />
                    <span>Added to Basket</span>
                  </>
                ) : (
                  <>
                    <FiShoppingBag className="w-4 h-4 text-amber-300" />
                    <span>Add to Basket</span>
                  </>
                )}
              </button>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center"
              >
                Buy Now
              </button>
            </div>

            {/* WhatsApp Direct Order Button */}
            <a
              href={`https://wa.me/919811254321?text=Hello%20Ramesh%20Kolhu%20Wale,%20I%20want%20to%20order%20${encodeURIComponent(
                product.name
              )}%20(${selectedVolume.size})`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <FaWhatsapp className="text-base" />
              <span>Order via WhatsApp Direct</span>
            </a>
          </div>

          {/* Delivery & Purity Highlights */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200 text-xs text-stone-700">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
              <FiTruck className="text-emerald-700 w-5 h-5 flex-shrink-0" />
              <div>
                <span className="font-bold block text-stone-900">Delhi NCR Express</span>
                <span className="text-[11px] text-stone-500">Free delivery over ₹799</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
              <FiShield className="text-emerald-700 w-5 h-5 flex-shrink-0" />
              <div>
                <span className="font-bold block text-stone-900">NABL Lab Certified</span>
                <span className="text-[11px] text-stone-500">100% Zero chemical guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Tabs: Benefits, Nutrition, Extraction & Lab Report */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap border-b border-stone-200 gap-2 sm:gap-4 pb-2">
          {[
            { id: 'benefits', label: 'Health & Ayurvedic Benefits' },
            { id: 'nutrition', label: 'Nutritional Profile' },
            { id: 'extraction', label: 'Wood-Press Engineering' },
            { id: 'lab', label: 'Purity Certificate' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-emerald-700 text-emerald-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Benefits */}
        {activeTab === 'benefits' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-stone-900 font-serif">Key Health Benefits</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <FiCheckCircle className="text-emerald-700 w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {product.smokePoint && (
              <p className="text-xs text-stone-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
                <strong>Smoke Point:</strong> {product.smokePoint}
              </p>
            )}
          </div>
        )}

        {/* Tab 2: Nutrition */}
        {activeTab === 'nutrition' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-stone-900 font-serif">Nutritional Value (Per 100g)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(product.nutritionalInfo).map(([key, val]) => (
                <div key={key} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 block capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-sm font-extrabold text-stone-900 mt-1 block">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Extraction Details */}
        {activeTab === 'extraction' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-stone-900 font-serif">Artisanal Extraction Standards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-400 block font-semibold">Method</span>
                <span className="text-sm font-bold text-stone-800 mt-1 block">{product.extractionDetails.method}</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-400 block font-semibold">Temperature Control</span>
                <span className="text-sm font-bold text-emerald-800 mt-1 block">{product.extractionDetails.temperature}</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-400 block font-semibold">RPM Speed</span>
                <span className="text-sm font-bold text-stone-800 mt-1 block">{product.extractionDetails.rpm}</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-400 block font-semibold">Seed Sourcing Origin</span>
                <span className="text-sm font-bold text-stone-800 mt-1 block">{product.extractionDetails.seedOrigin}</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs text-stone-400 block font-semibold">Pestle &amp; Mortar Wood</span>
                <span className="text-sm font-bold text-stone-800 mt-1 block">{product.extractionDetails.woodType}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Lab Report */}
        {activeTab === 'lab' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-stone-900 font-serif">NABL Certified Laboratory Analysis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-medium">Purity Rating</span>
                  <p className="text-sm font-extrabold text-green-900 mt-0.5">{product.labReportSummary.purity}</p>
                </div>
                <FiCheckCircle className="text-green-700 w-6 h-6" />
              </div>

              <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-medium">Chemical Adulteration Test</span>
                  <p className="text-sm font-extrabold text-green-900 mt-0.5">{product.labReportSummary.adulteration}</p>
                </div>
                <FiCheckCircle className="text-green-700 w-6 h-6" />
              </div>

              <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-medium">Argemone Oil Screen (TLC)</span>
                  <p className="text-sm font-extrabold text-green-900 mt-0.5">{product.labReportSummary.argemone}</p>
                </div>
                <FiCheckCircle className="text-green-700 w-6 h-6" />
              </div>

              <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-medium">Free Fatty Acid (FFA)</span>
                  <p className="text-sm font-extrabold text-green-900 mt-0.5">{product.labReportSummary.freeFattyAcid}</p>
                </div>
                <FiCheckCircle className="text-green-700 w-6 h-6" />
              </div>
            </div>
            <Link
              href="/lab-reports"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 mt-2"
            >
              <span>Download Full Certificate of Analysis</span>
              <FiArrowRight />
            </Link>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="space-y-6 pt-6">
        <h3 className="text-2xl font-black text-stone-900 font-serif">You May Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
