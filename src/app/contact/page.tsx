'use client';

import React, { useState } from 'react';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiCheckCircle, 
  FiSend, 
  FiMessageSquare 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    subject: 'General Inquiry'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const workshopLocations = [
    {
      title: 'Central Master Workshop & Store',
      area: 'Pitampura, North-West Delhi',
      address: 'Plot 18, Block B, Main Commercial Market, Pitampura, New Delhi 110034',
      phone: '+91 98112 54321',
      timings: '8:00 AM – 8:30 PM (7 Days Open)',
      featured: true
    },
    {
      title: 'West Delhi Workshop & Delivery Hub',
      area: 'Janakpuri, West Delhi',
      address: 'Shop 4, District Centre Commercial Complex, Janakpuri, New Delhi 110058',
      phone: '+91 98112 54322',
      timings: '8:30 AM – 8:00 PM (7 Days Open)',
      featured: false
    },
    {
      title: 'South Delhi Store',
      area: 'Lajpat Nagar, South Delhi',
      address: 'Shop 12, Central Market, Lajpat Nagar II, New Delhi 110024',
      phone: '+91 98112 54323',
      timings: '9:00 AM – 8:30 PM (Closed Tuesday)',
      featured: false
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#031d15] via-[#062e22] to-[#083a2b] text-white p-8 sm:p-12 shadow-xl border border-emerald-700/50 text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
          Open Workshop Policy
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif mt-2">
          Visit Us or Get in Touch
        </h1>
        <p className="text-xl text-amber-300 font-bold font-sans mt-2">
          आँखों के सामने ताजा निष्कर्षण, हर बूँद में विश्वास
        </p>
        <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto mt-3">
          We welcome you to visit any Ramesh Kolhu Wale workshop in Delhi NCR to witness live wooden ghani extraction or place customized bulk orders.
        </p>
      </div>

      {/* Workshop Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workshopLocations.map((loc) => (
          <div
            key={loc.title}
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
              loc.featured
                ? 'bg-emerald-50/50 border-emerald-400/80 shadow-md ring-1 ring-emerald-400'
                : 'bg-white border-stone-200 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="space-y-3">
              {loc.featured && (
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-950 bg-amber-400 px-2.5 py-0.5 rounded-full">
                  Primary Workshop
                </span>
              )}
              <h3 className="text-lg font-bold text-stone-900 font-serif">{loc.title}</h3>
              <p className="text-xs text-emerald-800 font-bold">{loc.area}</p>

              <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <p className="flex items-start gap-2">
                  <FiMapPin className="text-amber-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{loc.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-emerald-700 w-4 h-4 flex-shrink-0" />
                  <a href={`tel:${loc.phone}`} className="hover:text-emerald-800 font-semibold">
                    {loc.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <FiClock className="text-amber-600 w-4 h-4 flex-shrink-0" />
                  <span>{loc.timings}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100">
              <a
                href={`https://wa.me/919811254321?text=Hello%20Ramesh%20Kolhu%20Wale,%20I%20want%20to%20visit%20${encodeURIComponent(
                  loc.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition-colors"
              >
                <FaWhatsapp className="text-sm" />
                <span>Directions on WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form & Direct Support Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-serif">Customer Care &amp; Support</h3>
            <p className="text-xs text-stone-500 mt-1">
              Have questions regarding delivery, bulk marriage gifting, or our extraction process? Reach Ramesh Ji’s team directly.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <FiPhone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-400 block font-semibold">Toll-Free Helpline</span>
                <a href="tel:9811254321" className="font-extrabold text-stone-900 hover:text-emerald-800 text-sm">
                  +91 98112 54321 / 011-45678901
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-green-50 border border-green-200">
              <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                <FaWhatsapp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-green-800 block font-semibold">Instant WhatsApp Desk</span>
                <a
                  href="https://wa.me/919811254321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-extrabold text-green-950 hover:underline text-sm"
                >
                  +91 98112 54321 (Chat Now)
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                <FiMail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-400 block font-semibold">Official Email</span>
                <span className="font-bold text-stone-900 text-sm">care@rameshkolhuwale.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send Message Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <FiCheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 font-serif">Message Received!</h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                Thank you, <strong>{formData.name}</strong>. Ramesh Kolhu Wale customer support will reach out to you within 2 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">Send Us a Direct Message</h3>
                <p className="text-xs text-stone-500 mt-1">We respond to every single family inquiry personally.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98112 54321"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800 bg-white"
                >
                  <option>General Inquiry</option>
                  <option>Workshop Visit Booking</option>
                  <option>Bulk Marriage / Gifting Order</option>
                  <option>Ayurvedic Clinic Supply</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can Ramesh Kolhu Wale assist your family today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-amber-200 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <FiSend />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
