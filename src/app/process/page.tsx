import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Traditional Extraction Process | Ramesh Kolhu Wale',
  description: 'Discover how we cold-press our oils below 38°C in traditional cold-press units and churn authentic Bilona Ghee at Ramesh Kolhu Wale.',
  alternates: {
    canonical: '/process',
  },
};

export default function ProcessPage() {
  const oilSteps = [
    {
      num: '01',
      title: 'Seed Selection',
      desc: 'We source single-origin seeds directly from farmers — mustard from Rajasthan, coconut from Kerala, groundnut from Gujarat. Each batch is inspected for freshness before pressing.',
    },
    {
      num: '02',
      title: 'Sun Drying',
      desc: 'Seeds are spread and dried naturally for 2–3 days under the sun. This reduces moisture content and intensifies the natural flavour without any artificial heating.',
    },
    {
      num: '03',
      title: 'Cold Pressing',
      desc: 'The dried seeds are fed into our traditional cold-press ghanis rotating at 8–10 RPM. This slow speed keeps temperature below 38°C — the threshold above which nutrients begin to degrade.',
    },
    {
      num: '04',
      title: 'Natural Settling',
      desc: 'Raw pressed oil is left to settle naturally for 48–72 hours. The sediment sinks, the pure oil rises. We filter it once through cloth — no chemical clarification, no deodorisation.',
    },
    {
      num: '05',
      title: 'Lab Testing',
      desc: 'Every batch undergoes rigorous quality testing for standard purity parameters: free fatty acid levels, argemone contamination screen, and adulteration checks.',
    },
    {
      num: '06',
      title: 'Bottling',
      desc: 'Oil is filled into food-grade PET bottles or tins without any preservatives or additives. Sealed and labelled with the batch date so you always know when it was pressed.',
    },
  ];

  const gheeSteps = [
    { num: '01', title: 'Pure Milk Sourcing', desc: 'Fresh whole milk sourced from grass-fed desi cows or desi Murrah buffaloes. 100% natural, hormone-free, and ethically collected.' },
    { num: '02', title: 'Curd Setting', desc: 'Fresh milk is boiled gently, cooled to 40°C, and inoculated with live culture from the previous batch. Set overnight into thick curd.' },
    { num: '03', title: 'Hand Churning', desc: 'Curd is churned using a traditional bilona (hand churner) in a clay pot. The process takes 45–60 minutes per batch. No electric churners.' },
    { num: '04', title: 'Butter Separation', desc: 'The makkhan (butter) that rises to the top is carefully skimmed. The remaining buttermilk (chaach) retains all probiotics.' },
    { num: '05', title: 'Slow Heating', desc: 'Makkhan is heated slowly in a heavy-bottomed brass vessel over slow traditional earthen heat. This is a 2–3 hour process — no shortcuts with high heat.' },
  ];

  return (
    <div>
      <section className="bg-[#F2EEE5] py-20 sm:py-28 border-b border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-4 font-semibold">How We Make It</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1A16] font-normal leading-tight mb-6">
            The process behind every bottle
          </h1>
          <p className="text-[#5A5248] text-lg leading-relaxed max-w-2xl font-light">
            There are no shortcuts in our process. Cold-pressing yields less oil than chemical extraction. 
            Bilona churning takes more time than machine processing. We choose these methods because 
            nothing else preserves what matters.
          </p>
        </div>
      </section>

      {/* Oil process */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-3 font-semibold">Kacchi Ghani Method</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0E2A47] font-normal">Cold-Pressed Oil</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oilSteps.map(step => (
              <div key={step.num} className="space-y-4 p-6 rounded-2xl bg-white border border-[#E8E0D0] shadow-xs">
                <div className="text-5xl font-serif text-[#C8D7E6] font-bold leading-none">{step.num}</div>
                <h3 className="font-semibold text-lg text-[#1C1A16]">{step.title}</h3>
                <p className="text-sm text-[#5A5248] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ghee process */}
      <section className="py-20 sm:py-28 bg-[#F2EEE5] border-y border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-3 font-semibold">Bilona Method</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0E2A47] font-normal">Hand-Churned Ghee</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gheeSteps.map(step => (
              <div key={step.num} className="space-y-4 p-6 rounded-2xl bg-white border border-[#E8E0D0] shadow-xs">
                <div className="text-5xl font-serif text-[#D4C4A0] font-bold leading-none">{step.num}</div>
                <h3 className="font-semibold text-lg text-[#1C1A16]">{step.title}</h3>
                <p className="text-sm text-[#5A5248] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-[#0A1C30]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">Watch it happen live</h2>
          <p className="text-[#93B5D9] font-light">
            Visit our Units across Delhi NCR any day between 10:00 AM and 10:00 PM. See cold-press extraction in action 
            and taste the oil fresh from the press.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/stores" className="inline-flex items-center gap-2 px-8 py-4 bg-[#B8860B] hover:bg-[#D4A017] text-white font-medium rounded-full transition-colors shadow-md hover:scale-105">
              Find Nearest Store <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/lab-reports" className="inline-flex items-center gap-2 px-8 py-4 border border-[#1E4E80] text-[#93B5D9] hover:border-[#93B5D9] hover:text-white rounded-full transition-colors">
              View Lab Reports
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
