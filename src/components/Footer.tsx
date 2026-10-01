'use client';

import React from 'react';
import Link from 'next/link';
import { RKWLogo } from './RKWLogo';
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiClock, 
  FiShield, 
  FiCheckCircle, 
  FiTruck, 
  FiHeart 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-[#031c14] text-stone-300 pt-16 pb-10 border-t-4 border-amber-500 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 4 Feature Banner Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-emerald-900/60">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#06291e]/80 border border-emerald-800/40">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                <FiCheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">आँखों के सामने ताजा निष्कर्षण</h4>
                <p className="text-xs text-emerald-200/80 mt-0.5">Live extraction before your eyes</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#06291e]/80 border border-emerald-800/40">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                <FiShield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">100% Purity Guarantee</h4>
                <p className="text-xs text-emerald-200/80 mt-0.5">NABL tested &amp; certified oils</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#06291e]/80 border border-emerald-800/40">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center flex-shrink-0">
                <FiTruck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Free Delivery on ₹799</h4>
                <p className="text-xs text-emerald-200/80 mt-0.5">Same-day dispatch in Delhi NCR</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#06291e]/80 border border-emerald-800/40">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                <FiHeart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Vedic 5-Step Bilona</h4>
                <p className="text-xs text-emerald-200/80 mt-0.5">Clay pot hand-churned Gir cow ghee</p>
              </div>
            </div>
          </div>

          {/* Main Footer Links Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-emerald-900/60">
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <RKWLogo size="md" theme="light" />
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-sm mt-3">
                <strong>Ramesh Kolhu Wale (RKW)</strong> preserves the sacred Indian heritage of Lakdi Ki Ghani (wood-pressed oils) and clay-pot Vedic Bilona cow ghee. We stand against chemically solvent-extracted, refined factory oils to bring real health back to your family dining table.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-emerald-300">
                <span className="px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50">
                  ★ FSSAI Registered
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50">
                  ★ NABL Lab Tested
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50">
                  ★ 100% Chemical-Free
                </span>
              </div>
            </div>

            {/* Col 2: Pure Products */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider font-serif border-l-2 border-amber-400 pl-2">
                Pure Ghani Oils
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                <li>
                  <Link href="/product/yellow-mustard-oil" className="hover:text-amber-300 transition-colors">
                    Yellow Mustard Oil (पीली सरसों)
                  </Link>
                </li>
                <li>
                  <Link href="/product/black-mustard-oil" className="hover:text-amber-300 transition-colors">
                    Black Mustard Oil (काली सरसों)
                  </Link>
                </li>
                <li>
                  <Link href="/product/wood-pressed-coconut-oil" className="hover:text-amber-300 transition-colors">
                    Virgin Coconut Oil (कच्ची घानी नारियल)
                  </Link>
                </li>
                <li>
                  <Link href="/product/wood-pressed-groundnut-oil" className="hover:text-amber-300 transition-colors">
                    Groundnut Oil (मूंगफली तेल)
                  </Link>
                </li>
                <li>
                  <Link href="/product/wood-pressed-white-sesame-oil" className="hover:text-amber-300 transition-colors">
                    White Sesame Oil (तिल का तेल)
                  </Link>
                </li>
                <li>
                  <Link href="/product/pure-badam-rogan-almond-oil" className="hover:text-amber-300 transition-colors">
                    Pure Badam Rogan (बादाम रोगन)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Desi Ghee & Heritage */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider font-serif border-l-2 border-amber-400 pl-2">
                Vedic Bilona Ghee
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                <li>
                  <Link href="/product/vedic-a2-bilona-gir-cow-ghee" className="hover:text-amber-300 transition-colors">
                    A2 Gir Cow Bilona Ghee
                  </Link>
                </li>
                <li>
                  <Link href="/product/pure-buffalo-bilona-desi-ghee" className="hover:text-amber-300 transition-colors">
                    Murrah Buffalo Bilona Ghee
                  </Link>
                </li>
                <li>
                  <Link href="/product/rkw-heritage-wellness-duo" className="hover:text-amber-300 transition-colors">
                    RKW Heritage Wellness Duo
                  </Link>
                </li>
                <li>
                  <Link href="/process" className="hover:text-amber-300 transition-colors">
                    The 5-Samskara Bilona Process
                  </Link>
                </li>
                <li>
                  <Link href="/lab-reports" className="hover:text-amber-300 transition-colors">
                    NABL Lab Test Certificates
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-amber-300 transition-colors">
                    About Ramesh Kolhu Wale
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Workshops & Contact */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider font-serif border-l-2 border-amber-400 pl-2">
                Visit &amp; Contact
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <FiMapPin className="text-amber-400 w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>RKW Central Workshop:</strong><br />
                    Plot 18, Block B, Main Market, Pitampura, New Delhi 110034
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FiPhone className="text-amber-400 w-4 h-4 flex-shrink-0" />
                  <a href="tel:9811254321" className="hover:text-amber-300 font-semibold">
                    +91 98112 54321
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaWhatsapp className="text-green-400 w-4 h-4 flex-shrink-0" />
                  <a
                    href="https://wa.me/919811254321"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-300 font-semibold"
                  >
                    +91 98112 54321 (WhatsApp Support)
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FiMail className="text-amber-400 w-4 h-4 flex-shrink-0" />
                  <span>care@rameshkolhuwale.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiClock className="text-amber-400 w-4 h-4 flex-shrink-0" />
                  <span>Daily 8:00 AM – 8:30 PM (Live Ghani)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Guarantee */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>
              &copy; {new Date().getFullYear()} <strong>Ramesh Kolhu Wale (RKW)</strong>. All Rights Reserved. Traditional Lakdi Ki Ghani &amp; Vedic Bilona Ghee.
            </p>
            <div className="flex items-center gap-4 text-stone-400">
              <Link href="/about" className="hover:text-amber-300 transition-colors">
                Our Story
              </Link>
              <span>•</span>
              <Link href="/process" className="hover:text-amber-300 transition-colors">
                Cold Press Standard
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-amber-300 transition-colors">
                Locate Workshop
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
