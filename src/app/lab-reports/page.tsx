'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FiFileText, 
  FiCheckCircle, 
  FiShield, 
  FiDownload, 
  FiArrowRight,
  FiPrinter 
} from 'react-icons/fi';

export default function LabReportsPage() {
  const [selectedBatch, setSelectedBatch] = useState('batch-current');

  const testParameters = [
    { parameter: 'Argemone Oil Test (TLC Method)', standard: 'Absent / Negative', result: 'NEGATIVE', status: 'Passed' },
    { parameter: 'Mineral Oil / Liquid Paraffin', standard: 'Negative (Holdt Test)', result: 'ABSENT', status: 'Passed' },
    { parameter: 'Free Fatty Acids (% as Oleic)', standard: 'Max 1.50%', result: '0.38%', status: 'Passed' },
    { parameter: 'Peroxide Value (meq O2/kg)', standard: 'Max 10.0', result: '1.42', status: 'Passed' },
    { parameter: 'Moisture and Insoluble Impurities', standard: 'Max 0.25%', result: '0.04%', status: 'Passed' },
    { parameter: 'Heavy Metals (Lead, Arsenic, Cadmium)', standard: 'Below Permissible Limits', result: 'NOT DETECTED', status: 'Passed' },
    { parameter: 'Hexane / Chemical Solvent Residue', standard: '0.00 ppm (Zero)', result: 'ZERO (0.00 ppm)', status: 'Passed' },
    { parameter: 'A2 Beta-Casein Protein (For Ghee)', standard: 'A2 Allele Verified', result: '100% A2 GIR COW', status: 'Passed' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#031d15] via-[#062e22] to-[#083a2b] text-white p-8 sm:p-12 shadow-xl border border-emerald-700/50 text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-800">
          NABL Accredited &amp; FSSAI Certified
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif mt-2">
          Laboratory Purity Reports
        </h1>
        <p className="text-xl text-amber-300 font-bold font-sans mt-2">
          शुद्धता और स्वाद, हर बूँद में विश्वास
        </p>
        <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto mt-3">
          Every batch of oil pressed and ghee churned at Ramesh Kolhu Wale undergoes rigorous independent third-party laboratory analysis.
        </p>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <FiShield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-sm font-serif">FSSAI Certified</h4>
            <p className="text-xs text-stone-500 font-mono mt-0.5">Lic No. 13324001000845</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <FiFileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-sm font-serif">NABL Lab Tested</h4>
            <p className="text-xs text-stone-500 mt-0.5">ISO/IEC 17025 accredited labs</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <FiCheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-sm font-serif">0% Chemical Residue</h4>
            <p className="text-xs text-stone-500 mt-0.5">Zero argemone, zero mineral oil</p>
          </div>
        </div>
      </div>

      {/* Main Certificate / Report Sheet */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden">
        {/* Report Header */}
        <div className="p-6 sm:p-8 bg-stone-50 border-b border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded">
              Official Quality Assurance Certificate
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1 font-serif">
              Master Chemical &amp; Fatty Acid Purity Certificate
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Sample: Ramesh Kolhu Wale Virgin Wood-Pressed Yellow Mustard Oil &amp; Vedic A2 Ghee
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <FiPrinter className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
          </div>
        </div>

        {/* Certificate Metadata */}
        <div className="p-6 bg-stone-100/60 border-b border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-stone-400 block font-semibold">Report Reference:</span>
            <span className="font-bold text-stone-800 font-mono">RKW/QC/2026/0942</span>
          </div>
          <div>
            <span className="text-stone-400 block font-semibold">Batch Number:</span>
            <span className="font-bold text-stone-800 font-mono">RKW-GHA-26B</span>
          </div>
          <div>
            <span className="text-stone-400 block font-semibold">Testing Date:</span>
            <span className="font-bold text-stone-800">Fresh Tested Monthly</span>
          </div>
          <div>
            <span className="text-stone-400 block font-semibold">Overall Verdict:</span>
            <span className="font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
              100% PURE (PASSED)
            </span>
          </div>
        </div>

        {/* Report Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase text-[11px] font-bold">
              <tr>
                <th className="py-3 px-6">Quality Parameter</th>
                <th className="py-3 px-6">FSSAI / Codex Standard</th>
                <th className="py-3 px-6">RKW Batch Observation</th>
                <th className="py-3 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {testParameters.map((t, idx) => (
                <tr key={idx} className="hover:bg-emerald-50/20">
                  <td className="py-3.5 px-6 font-semibold text-stone-800">
                    {t.parameter}
                  </td>
                  <td className="py-3.5 px-6 text-stone-500">
                    {t.standard}
                  </td>
                  <td className="py-3.5 px-6 font-mono font-bold text-stone-900">
                    {t.result}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="inline-flex items-center gap-1 font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200 text-xs">
                      <FiCheckCircle className="w-3 h-3" />
                      <span>{t.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Guarantee */}
        <div className="p-6 bg-emerald-50/60 border-t border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <FiShield className="text-emerald-800 w-8 h-8 flex-shrink-0" />
            <div>
              <p className="font-bold text-emerald-950 font-serif">
                Open Testing Guarantee by Ramesh Kolhu Wale
              </p>
              <p className="text-stone-600 mt-0.5">
                We invite you to send any sample of our oil to any certified laboratory. If any adulterant or solvent is found, we pay 10x money back.
              </p>
            </div>
          </div>
          <Link
            href="/shop"
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold whitespace-nowrap"
          >
            Order Certified Pure Batch
          </Link>
        </div>
      </div>
    </div>
  );
}
