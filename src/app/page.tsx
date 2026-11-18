import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { StoreLocatorSection } from '@/components/StoreLocatorSection';
import { SITE_CONFIG } from '@/config/site';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);
  const displayProducts = featuredProducts.length >= 3 ? featuredProducts : PRODUCTS.slice(0, 4);

  return (
    <main className="overflow-hidden">
      <section className="relative min-h-[690px] lg:min-h-[790px] bg-[#173C31] text-[#F5F1E8]">
        <div className="absolute inset-0">
          <Image src="/images/hero.jpg" alt="Traditional oil extraction at Ramesh Kolhu Wale" fill priority sizes="100vw" className="object-cover object-center opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102B23] via-[#102B23]/85 to-[#102B23]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102B23]/70 via-transparent to-[#102B23]/10" />
        </div>
        <div className="relative z-10 rkw-shell flex min-h-[690px] lg:min-h-[790px] items-end pb-20 pt-28 lg:items-center lg:pb-16">
          <div className="max-w-[760px] rkw-reveal">
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[.28em] text-[#E8B58C]">Ramesh Kolhu Wale · Since 1981 · Delhi NCR</p>
            <h1 className="rkw-display max-w-[760px] text-[clamp(4rem,9vw,8.6rem)] text-[#F5F1E8]">
              Good food<br />begins <em className="font-normal text-[#D99A6B]">at the source.</em>
            </h1>
            <p className="mt-8 max-w-[450px] text-sm leading-7 text-white/75 sm:text-base">
              Traditional cold-pressed oils and Bilona ghee, made with care and brought fresh from our Delhi NCR units to your kitchen.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/shop" className="inline-flex items-center gap-5 bg-[#E7B18A] px-7 py-4 text-[11px] font-bold uppercase tracking-[.16em] text-[#173C31] transition hover:bg-[#F5F1E8]">
                Explore the collection <span className="text-lg">↗</span>
              </Link>
              <Link href="/process" className="border-b border-white/50 pb-2 text-[11px] font-bold uppercase tracking-[.16em] text-white transition hover:border-[#E7B18A] hover:text-[#E7B18A]">
                See how we make it
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 right-0 hidden items-center gap-4 text-[9px] uppercase tracking-[.2em] text-white/70 md:flex">
            <span className="h-px w-12 bg-white/50" /> A little slower. A lot more considered.
          </div>
        </div>
        <div className="absolute right-[7%] top-[18%] hidden h-40 w-40 rounded-full border border-white/20 lg:block" />
        <div className="absolute right-[10%] top-[21%] hidden h-28 w-28 rounded-full border border-white/20 lg:block" />
      </section>

      <section className="border-b border-[#D9D0C0] bg-[#EAE2D3] py-5">
        <div className="rkw-shell grid grid-cols-2 gap-y-5 md:grid-cols-4 md:gap-8">
          {[
            ['01', 'Traditional extraction', 'Slow cold-press methods'],
            ['02', 'Made in our units', 'Delhi NCR · open all 7 days'],
            ['03', 'Quality standards', 'Agmark R.B.O. quality'],
            ['04', 'Doorstep delivery', 'Free above ₹799 in Delhi NCR'],
          ].map(([n,title,sub]) => <div key={n} className="flex items-start gap-4">
            <span className="font-serif text-sm italic text-[#B66B3D]">{n}</span>
            <div><p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#202A22]">{title}</p><p className="mt-1 text-[11px] text-[#817767]">{sub}</p></div>
          </div>)}
        </div>
      </section>

      <section className="rkw-section">
        <div className="rkw-shell">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div><p className="rkw-eyebrow">The RKW collection</p><h2 className="rkw-display mt-5 text-5xl text-[#202A22] sm:text-6xl">Everyday essentials.<br/><em>Made with intention.</em></h2></div>
            <Link href="/shop" className="rkw-link">Shop all products</Link>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {displayProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#173C31] text-[#F5F1E8]">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[440px] lg:min-h-[660px]">
            <Image src="/images/process_live.jpg" alt="Live traditional kolhu oil pressing" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute bottom-7 left-7 border border-white/40 bg-[#102B23]/70 px-5 py-3 text-[9px] uppercase tracking-[.2em] backdrop-blur-sm">A view from our units</div>
          </div>
          <div className="flex items-center px-8 py-20 sm:px-14 lg:px-20">
            <div className="max-w-xl">
              <p className="rkw-eyebrow !text-[#E7B18A]">A process you can see</p>
              <h2 className="rkw-display mt-6 text-5xl leading-[1.04] sm:text-6xl">Not made in a hurry.<br/><em>Never made a mystery.</em></h2>
              <p className="mt-7 max-w-md text-sm leading-7 text-white/70">Visit one of our units and see the traditional extraction process in person. From the raw seeds to the bottle, we believe the way food is made should never be hidden.</p>
              <Link href="/process" className="mt-9 inline-flex border-b border-[#E7B18A] pb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#E7B18A]">Explore our process ↗</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rkw-section bg-[#EAE2D3]">
        <div className="rkw-shell">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="rkw-eyebrow">The way we work</p><h2 className="rkw-display mt-5 text-5xl text-[#202A22] sm:text-6xl">A little more<br/><em>care in every step.</em></h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#817767]">A considered process, shaped by traditional methods and a belief in doing the essentials well.</p></div>
            <div className="grid gap-8 sm:grid-cols-2">
              {[
                ['01','Choose well','Seeds are selected and checked before they enter the press.'],
                ['02','Prepare naturally','Seeds are sun-dried to prepare them for extraction.'],
                ['03','Press slowly','Traditional cold-press ghanis work at a slow rotation.'],
                ['04','Let it settle','Oil is allowed to settle naturally before bottling.'],
              ].map(([n,t,d])=><div key={n} className="border-t border-[#BDB3A1] pt-5"><span className="font-serif text-2xl italic text-[#B66B3D]">{n}</span><h3 className="mt-4 font-serif text-2xl text-[#202A22]">{t}</h3><p className="mt-2 max-w-xs text-xs leading-6 text-[#817767]">{d}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="rkw-section">
        <div className="rkw-shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden bg-[#EAE2D3]">
            <Image src="/images/bilona_tradition.jpg" alt="Traditional Bilona ghee preparation" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="max-w-lg">
            <p className="rkw-eyebrow">Our story · Est. 1981</p>
            <h2 className="rkw-display mt-5 text-5xl text-[#202A22] sm:text-6xl">Rooted in a<br/><em>way of making.</em></h2>
            <p className="mt-6 text-sm leading-7 text-[#817767]">Ramesh Kolhu Wale began with a simple belief: good oil deserves time, care and honest methods. Today, that belief continues across our Delhi NCR units.</p>
            <Link href="/about" className="rkw-link mt-8">Get to know RKW</Link>
          </div>
        </div>
      </section>

      <StoreLocatorSection id="find-store" />

      <section className="bg-[#B66B3D] py-20 text-[#FFF8EF]">
        <div className="rkw-shell flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-white/70">Bring RKW home</p><h2 className="rkw-display mt-4 text-5xl sm:text-6xl">Your kitchen, our<br/><em>everyday craft.</em></h2><p className="mt-5 max-w-lg text-sm leading-7 text-white/80">Order directly from RKW. Free home delivery across Delhi NCR on orders above ₹799.</p></div>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="bg-[#F5F1E8] px-7 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-[#173C31] transition hover:bg-white">Shop collection ↗</Link>
            <Link href="/stores" className="border border-white/60 px-7 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-white transition hover:bg-white/10">Find a unit</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
