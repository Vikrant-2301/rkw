import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export const metadata = {
  title: 'About Us | Ramesh Kolhu Wale',
  description: 'The story of Ramesh Kolhu Wale — four generations of wood-pressed oil tradition in Delhi.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F2EEE5] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-4">Our Story</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1A16] font-normal leading-tight mb-6">
              A family tradition,<br />four generations deep
            </h1>
            <p className="text-[#5A5248] text-lg leading-relaxed">
              Ramesh Kolhu Wale began with a simple belief: that the best oil is pressed slowly, 
              with care, without chemicals — the way it has always been done.
            </p>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/hero.jpg"
                alt="Traditional ghani at the RKW workshop"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6 max-w-lg">
              <h2 className="font-serif text-3xl text-[#1C1A16] font-normal">The founding story</h2>
              <div className="space-y-4 text-[#5A5248] leading-relaxed">
                <p>
                  Ramesh ji started with a single wooden ghani in Pitampura, pressing mustard oil 
                  for the neighbourhood. The demand grew not because of marketing, but because people 
                  could taste the difference — the natural pungency of cold-pressed mustard, 
                  the rich colour, the absence of anything artificial.
                </p>
                <p>
                  Today, Ramesh Kolhu Wale operates multiple workshops across Delhi NCR, 
                  but the method remains unchanged. Every batch is pressed in the same 
                  traditional wooden ghanis, at the same slow speed, below the same 38°C threshold 
                  that preserves every nutrient and every drop of natural flavour.
                </p>
                <p>
                  We are FSSAI registered and NABL lab-tested. But more than certifications, 
                  our commitment is simple: you can walk into any of our workshops, any day, 
                  and watch your oil being pressed in front of you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 bg-[#F2EEE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-3">Our Principles</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'No shortcuts',
                desc: 'Cold-pressing is slower and yields less oil than solvent extraction. We choose it anyway, because the quality cannot be replicated by any other method.',
              },
              {
                title: 'Full transparency',
                desc: 'Our NABL lab reports are published and available to every customer. Visit any workshop and watch your oil being pressed. No hidden processes.',
              },
              {
                title: 'Respect for tradition',
                desc: 'The wooden ghani is a 2,000-year-old Indian technology. We use it not out of nostalgia, but because nothing modern has improved on it for cold-pressing.',
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-8 space-y-4">
                <h3 className="font-serif text-xl text-[#1C1A16] font-normal">{item.title}</h3>
                <p className="text-sm text-[#5A5248] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal">
            Come see for yourself
          </h2>
          <p className="text-[#8A7E6E]">
            Our workshops are open daily. Visit us in Pitampura and watch the oil being pressed 
            from seed to bottle in real time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1C3829] hover:bg-[#2A5240] text-white font-medium rounded-full transition-colors"
            >
              Get Directions <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#D0C8B8] text-[#4A4035] hover:border-[#1C3829] hover:text-[#1C3829] rounded-full transition-colors"
            >
              Shop Our Oils
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
