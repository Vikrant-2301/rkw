import React from 'react';
import Link from 'next/link';
import { FiShield, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { PRODUCTS } from '@/data/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quality & Purity Standards | Ramesh Kolhu Wale',
  description: 'View authentic laboratory purity standards for our cold-pressed oils and pure Bilona ghee. 100% pure, Agmark standards tested for every single batch.',
  alternates: {
    canonical: '/lab-reports',
  },
};

export default function LabReportsPage() {
  const testParameters = [
    { name: 'Purity & Grade', description: 'Verifies 100% single-oil composition with no blending or cheap fillers' },
    { name: 'Free Fatty Acid (FFA)', description: 'Measures low acidity, ensuring maximum oil freshness and zero rancidity' },
    { name: 'Argemone Screen (TLC)', description: 'Certifies zero toxic argemone mexicana contamination' },
    { name: 'Chemical Adulteration', description: 'Broad screen ensuring zero synthetic additives, mineral oils, or chemical solvents' },
    { name: 'Natural Moisture Content', description: 'Confirms natural solar drying without water dilution' },
    { name: 'Specific Gravity', description: 'Scientifically validates genuine seed density and authentic slow cold-press extraction' },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-[#F2EEE5] py-20 sm:py-28 border-b border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-4 font-semibold">Transparency &amp; Trust</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1A16] font-normal leading-tight mb-6">
              Quality &amp; Purity Reports
            </h1>
            <p className="text-[#5A5248] leading-relaxed text-lg font-light">
              Every single batch is tested for standard purity parameters before it reaches your kitchen. 
              We share these parameters openly because true purity must be provable, not just promised.
            </p>
          </div>
        </div>
      </section>

      {/* What we test */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-[#0E2A47] font-semibold mb-2">What we test for</h2>
            <p className="text-[#8A7E6E] text-sm">Six critical chemical and biological purity parameters, every batch, every product.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testParameters.map(param => (
              <div key={param.name} className="bg-white rounded-xl p-6 flex gap-4 border border-[#E8E0D0] shadow-xs">
                <FiCheckCircle className="w-5 h-5 text-[#0E2A47] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1C1A16] text-sm">{param.name}</h3>
                  <p className="text-xs text-[#8A7E6E] mt-1 leading-relaxed">{param.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-product summary */}
      <section className="py-20 sm:py-28 bg-[#F2EEE5] border-y border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-[#0E2A47] font-semibold">Test parameters by product</h2>
          </div>
          <div className="space-y-4">
            {PRODUCTS.filter(p => p.labReportSummary).map(product => (
              <div key={product.id} className="bg-white rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 border border-[#E8E0D0] shadow-xs">
                <div className="flex-1">
                  <Link href={`/product/${product.slug}`} className="font-semibold text-[#1C1A16] hover:text-[#0E2A47] transition-colors">
                    {product.name}
                  </Link>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {[
                      { label: 'Purity', value: product.labReportSummary?.purity },
                      { label: 'Adulteration', value: product.labReportSummary?.adulteration },
                      { label: 'Argemone', value: product.labReportSummary?.argemone },
                    ].filter(item => item.value).map(item => (
                      <div key={item.label} className="flex items-center gap-1.5 text-xs">
                        <FiCheckCircle className="w-3.5 h-3.5 text-[#0E2A47]" />
                        <span className="text-[#8A7E6E]">{item.label}:</span>
                        <span className="text-[#1C1A16] font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EBF2F8] text-xs text-[#0E2A47] font-semibold rounded-full border border-[#163A60]/10">
                    <FiShield className="w-3.5 h-3.5" />
                    100% Pure Guarantee
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#8A7E6E]">
            Full batch purity summaries and Agmark standards data are available on request. Contact our quality team on WhatsApp or email care@rameshkolhuwale.com.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="font-serif text-2xl text-[#1C1A16] font-normal">Questions about our purity standards?</h2>
          <p className="text-sm text-[#8A7E6E]">We share complete batch purity details on request. Contact us via WhatsApp.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0E2A47] hover:bg-[#163A60] text-white font-semibold rounded-full transition-colors shadow-sm hover:scale-105"
          >
            Contact Us <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
