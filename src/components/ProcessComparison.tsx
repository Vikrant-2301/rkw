'use client';

import React from 'react';
import { FiCheck, FiX, FiInfo } from 'react-icons/fi';

export const ProcessComparison: React.FC = () => {
  const comparisonData = [
    {
      parameter: 'Extraction Temperature',
      traditional: 'Under 38°C (Zero friction heat, true cold-press)',
      refined: '200°C – 250°C (High thermal degradation)',
      verdict: true,
    },
    {
      parameter: 'Chemical Solvents',
      traditional: 'Zero chemicals. Mechanical pressure only.',
      refined: 'Petroleum Hexane used to leach out last drop',
      verdict: true,
    },
    {
      parameter: 'Bleaching & Deodorizing',
      traditional: 'Natural settling & cotton cloth filtration only',
      refined: 'Treated with caustic soda, acid & artificial clays',
      verdict: true,
    },
    {
      parameter: 'Nutrient & Antioxidant Content',
      traditional: '100% natural Vitamin E, Omega-3/6, Polyphenols intact',
      refined: 'Stripped bare. Synthetic chemicals added back',
      verdict: true,
    },
    {
      parameter: 'Aroma & Taste',
      traditional: 'Appetizing, pungent natural aroma of raw seeds',
      refined: 'Flat, odorless, plastic-like texture',
      verdict: true,
    },
    {
      parameter: 'Viscosity & Digestive Absorption',
      traditional: 'Light, non-sticky, easily digestible, zero acidity',
      refined: 'Heavily processed, causes acid reflux & lipid buildup',
      verdict: true,
    },
    {
      parameter: 'Production Transparency',
      traditional: '100% open — pressed before your eyes at RKW workshops',
      refined: 'Secret mega-factories, hidden behind corporate gates',
      verdict: true,
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto" id="comparison">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          The Health Truth Exposed
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          Why Your Body Deserves Ramesh Kolhu Wale
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          See the undeniable contrast between authentic wooden Ghani extraction and mass-produced industrial refined packets.
        </p>
      </div>

      <div className="rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="py-4 px-6 text-xs font-black uppercase text-stone-500 bg-stone-50/80 w-1/3">
                  Parameter
                </th>
                <th className="py-4 px-6 text-sm font-bold uppercase text-white bg-gradient-to-r from-emerald-800 to-emerald-900 w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Ramesh Kolhu Wale (RKW)</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase text-stone-600 bg-stone-100 w-1/3">
                  Commercial Refined Packets
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
              {comparisonData.map((row, idx) => (
                <tr
                  key={row.parameter}
                  className={`hover:bg-emerald-50/30 transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                  }`}
                >
                  <td className="py-4 px-6 font-bold text-stone-800 flex items-center gap-2">
                    <FiInfo className="text-stone-400 w-3.5 h-3.5 flex-shrink-0" />
                    <span>{row.parameter}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-950 bg-emerald-50/50">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiCheck className="w-3.5 h-3.5 font-bold" />
                      </div>
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-stone-500">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiX className="w-3.5 h-3.5 font-bold" />
                      </div>
                      <span>{row.refined}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
