'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiEye, FiCalendar, FiCheckCircle, FiClock, FiMapPin, FiPhone, FiVideo, FiX } from 'react-icons/fi';

export const LiveExtractionBanner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    visitType: 'in-person',
    oilType: 'Yellow Mustard Oil'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto" id="live-extraction">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#041f17] via-[#062e22] to-[#0a4231] text-white shadow-2xl border border-emerald-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-amber-300 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Ramesh Kolhu Wale Open Workshop Transparency
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                आँखों के सामने ताजा निष्कर्षण, <br />
                <span className="text-amber-400 font-serif italic">हर बूँद में अटूट विश्वास</span>
              </h2>
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed pt-2">
                Don&apos;t just take claims of purity on paper. Walk straight into our Ramesh Kolhu Wale workshop, choose your raw seeds from organic sacks, watch our traditional wooden pestle slowly press the seeds at 14 RPM under 38°C, and receive pure oil bottled warm in front of your eyes.
              </p>
            </div>

            {/* 3 Pillars of Live Trust */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
                <FiEye className="text-amber-400 w-6 h-6 mb-2" />
                <h4 className="font-bold text-sm text-white">100% Visible</h4>
                <p className="text-xs text-stone-400 mt-1">Zero hidden blending rooms or secret factory pipelines.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
                <FiClock className="text-amber-400 w-6 h-6 mb-2" />
                <h4 className="font-bold text-sm text-white">Fresh Every Day</h4>
                <p className="text-xs text-stone-400 mt-1">Pressing runs daily 8:00 AM – 8:30 PM in Delhi NCR.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
                <FiMapPin className="text-amber-400 w-6 h-6 mb-2" />
                <h4 className="font-bold text-sm text-white">RKW Workshops</h4>
                <p className="text-xs text-stone-400 mt-1">Pitampura, Janakpuri, Lajpat Nagar &amp; Noida.</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setModalOpen(true);
                  setBooked(false);
                }}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-900 font-extrabold text-sm shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
              >
                <FiCalendar className="text-base group-hover:scale-110 transition-transform" />
                <span>Book Live Workshop Visit</span>
              </button>

              <a
                href="https://wa.me/919811254321?text=Hello%20Ramesh%20Kolhu%20Wale,%20I%20would%20like%20to%20request%20a%20Live%20Video%20Call%20oil%20extraction%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-xs transition-all flex items-center gap-2"
              >
                <FiVideo className="text-amber-400" />
                <span>Request Live Video Call Packaging</span>
              </a>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40">
              <Image
                src="/images/process_live.jpg"
                alt="Ramesh Kolhu Wale Live Cold Pressing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-amber-300 font-bold text-xs uppercase tracking-wider block mb-1">
                    Live At Pitampura Workshop
                  </span>
                  <p className="text-white text-sm font-semibold">
                    &ldquo;Watching the dark mustard seed froth and turn into aromatic golden nectar right before my eyes was a memorable experience.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-stone-900 shadow-2xl relative animate-fadeIn border border-emerald-900/20">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-500"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5" />
            </button>

            {booked ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <FiCheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 font-serif">Visit Confirmed!</h3>
                <p className="text-sm text-stone-600 max-w-xs mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our workshop master at Ramesh Kolhu Wale will contact you on <strong>{formData.phone}</strong> with location directions.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 bg-emerald-800 text-white rounded-full font-bold text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Transparent Production
                  </span>
                  <h3 className="text-2xl font-black text-stone-900 mt-2 font-serif">
                    Schedule Your Workshop Visit
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Bring your family or children to experience authentic Lakdi Ki Ghani cold extraction live.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98112 54321"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                        Oil of Interest
                      </label>
                      <select
                        value={formData.oilType}
                        onChange={(e) => setFormData({ ...formData, oilType: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800 bg-white"
                      >
                        <option>Yellow Mustard Oil</option>
                        <option>Black Mustard Oil</option>
                        <option>A2 Gir Cow Bilona Ghee</option>
                        <option>Badam Rogan</option>
                        <option>Virgin Coconut Oil</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Visit Format
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, visitType: 'in-person' })}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          formData.visitType === 'in-person'
                            ? 'bg-emerald-100 border-emerald-600 text-emerald-950 shadow-2xs'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}
                      >
                        In-Person Workshop
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, visitType: 'video' })}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          formData.visitType === 'video'
                            ? 'bg-emerald-100 border-emerald-600 text-emerald-950 shadow-2xs'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}
                      >
                        Live Video Call
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-amber-200 font-bold text-sm shadow-lg transition-all"
                  >
                    Confirm Appointment
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
