import React from 'react';
import Link from 'next/link';
import { FiShield, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { PRODUCTS } from '@/data/products';

export const metadata = {
  title: 'Lab Reports | Ramesh Kolhu Wale',
  description: 'NABL-certified laboratory test results for all our oils and ghee.',
};

export default function LabReportsPage() {
  const testParameters = [
    { name: 'Purity', description: 'Verifies 100% single-oil composition with no blending' },
    { name: 'Free Fatty Acid (FFA)', description: 'Measures oil freshness and rancidity indicators' },
    { name: 'Argemone Screen (TLC)', description: 'Tests for toxic argemone mexicana contamination' },
    { name: 'Chemical Adulteration', description: 'Broad screen for synthetic additives and solvents' },
    { name: 'Moisture Content', description: 'Verifies proper drying and no water dilution' },
    { name: 'Specific Gravity', description: 'Confirms genuine variety and cold-press extraction' },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-[#F2EEE5] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-4">Transparency</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1A16] font-normal leading-tight mb-6">
              NABL Lab Reports
            </h1>
            <p className="text-[#5A5248] leading-relaxed text-lg">
              Every batch is tested at NABL-accredited laboratories before it reaches you. 
              We share these results openly because purity should be provable, not just promised.
            </p>
          </div>
        </div>
      </section>

      {/* What we test */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-[#1C1A16] font-normal mb-2">What we test for</h2>
            <p className="text-[#8A7E6E] text-sm">Six parameters, every batch, every product.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testParameters.map(param => (
              <div key={param.name} className="bg-[#F2EEE5] rounded-xl p-6 flex gap-4">
                <FiCheckCircle className="w-5 h-5 text-[#1C3829] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#1C1A16] text-sm">{param.name}</h3>
                  <p className="text-xs text-[#8A7E6E] mt-1 leading-relaxed">{param.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-product summary */}
      <section className="py-20 sm:py-28 bg-[#F2EEE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-[#1C1A16] font-normal">Test results by product</h2>
          </div>
          <div className="space-y-4">
            {PRODUCTS.filter(p => p.labReportSummary).map(product => (
              <div key={product.id} className="bg-white rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <Link href={`/product/${product.slug}`} className="font-medium text-[#1C1A16] hover:text-[#1C3829] transition-colors">
                    {product.name}
                  </Link>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {[
                      { label: 'Purity', value: product.labReportSummary?.purity },
                      { label: 'Adulteration', value: product.labReportSummary?.adulteration },
                      { label: 'Argemone', value: product.labReportSummary?.argemone },
                    ].filter(item => item.value).map(item => (
                      <div key={item.label} className="flex items-center gap-1.5 text-xs">
                        <FiCheckCircle className="w-3.5 h-3.5 text-[#1C3829]" />
                        <span className="text-[#8A7E6E]">{item.label}:</span>
                        <span className="text-[#1C1A16] font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EDE8DF] text-xs text-[#1C3829] font-medium rounded-full">
                    <FiShield className="w-3.5 h-3.5" />
                    NABL Certified
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#8A7E6E]">
            Full certificates available on request. Contact us on WhatsApp or email care@rameshkolhuwale.com.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="font-serif text-2xl text-[#1C1A16] font-normal">Want the full certificate?</h2>
          <p className="text-sm text-[#8A7E6E]">We share complete NABL reports on request. Contact us via WhatsApp.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1C3829] hover:bg-[#2A5240] text-white font-medium rounded-full transition-colors"
          >
            Contact Us <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
