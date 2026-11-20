'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { Tiro_Devanagari_Hindi } from 'next/font/google';

const deva = Tiro_Devanagari_Hindi({ subsets: ['devanagari', 'latin'], weight: '400' });

const C = {
    mustard: '#F2B705',
    mustardDeep: '#B98200',
    navy: '#0E2A47',
    navyDeep: '#08192B',
    paper: '#FBF3DC',
};

const MIN_MS = 2600; // minimum time the loader is shown
const MAX_MS = 6000; // never block the site longer than this
const EXIT_MS = 1000; // duration of the exit wipe
const SESSION_KEY = 'rkw-preloaded';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Phase = 'in' | 'out' | 'done';

/**
 * RKW preloader.
 * A drop of mustard oil falls into the badge, a ring fills like oil settling,
 * then a navy + mustard curtain lifts to reveal the site.
 * Shows once per browser session.
 */
export function Preloader() {
    const [phase, setPhase] = useState<Phase>('in');

    // Skip instantly if already seen this session (runs before first paint on the client)
    useIsoLayoutEffect(() => {
        try {
            if (sessionStorage.getItem(SESSION_KEY)) setPhase('done');
        } catch {
            /* storage blocked: just show the loader */
        }
    }, []);

    // Lock scroll while visible
    useEffect(() => {
        if (phase === 'done') return;
        const prev = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = prev;
        };
    }, [phase]);

    // Timing: wait for min duration AND page load, with a hard cap
    useEffect(() => {
        if (phase !== 'in') return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const minMs = reduced ? 500 : MIN_MS;
        const start = performance.now();
        let finished = false;
        let exitTimer: number | undefined;

        const finish = () => {
            if (finished) return;
            finished = true;
            const wait = Math.max(0, minMs - (performance.now() - start));
            exitTimer = window.setTimeout(() => {
                setPhase('out');
                try {
                    sessionStorage.setItem(SESSION_KEY, '1');
                } catch {
                    /* ignore */
                }
            }, wait);
        };

        if (document.readyState === 'complete') finish();
        else window.addEventListener('load', finish, { once: true });
        const cap = window.setTimeout(finish, MAX_MS);

        return () => {
            window.removeEventListener('load', finish);
            window.clearTimeout(cap);
            if (exitTimer) window.clearTimeout(exitTimer);
        };
    }, [phase]);

    // Unmount after the exit wipe
    useEffect(() => {
        if (phase !== 'out') return;
        const t = window.setTimeout(() => setPhase('done'), EXIT_MS + 150);
        return () => window.clearTimeout(t);
    }, [phase]);

    if (phase === 'done') return null;

    const out = phase === 'out';

    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading Ramesh Kolhu Wale"
            className={`rkw-pre ${out ? 'rkw-pre--out' : ''}`}
            style={{ pointerEvents: out ? 'none' : 'auto' }}
        >
            <style>{`
        .rkw-pre { position: fixed; inset: 0; z-index: 9999; }

        /* curtain layers */
        .rkw-pre__mustard,
        .rkw-pre__navy {
          position: absolute; inset: 0;
          border-radius: 0 0 50% 50% / 0 0 7vw 7vw;
          will-change: transform;
        }
        .rkw-pre__mustard { background: ${C.mustard}; }
        .rkw-pre__navy {
          background:
            radial-gradient(circle at 50% 45%, #15375C 0%, ${C.navy} 55%, ${C.navyDeep} 100%);
        }
        .rkw-pre--out .rkw-pre__navy    { animation: rkw-pre-lift ${EXIT_MS}ms cubic-bezier(.76,0,.24,1) forwards; }
        .rkw-pre--out .rkw-pre__mustard { animation: rkw-pre-lift ${EXIT_MS}ms cubic-bezier(.76,0,.24,1) .12s forwards; }
        .rkw-pre--out .rkw-pre__content { animation: rkw-pre-content-out .45s ease-in forwards; }
        @keyframes rkw-pre-lift { to { transform: translateY(-110%); } }
        @keyframes rkw-pre-content-out { to { opacity: 0; transform: translateY(-16px) scale(.96); } }

        /* content */
        .rkw-pre__content {
          position: absolute; inset: 0; z-index: 2;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1.75rem; padding: 1rem; color: ${C.paper};
        }
        .rkw-pre__stage { position: relative; width: 176px; height: 176px; }
        @media (min-width: 640px) { .rkw-pre__stage { width: 208px; height: 208px; } }

        /* falling oil drop */
        .rkw-pre__drop {
          position: absolute; left: 50%; top: 0; width: 18px; height: 26px; margin-left: -9px;
          transform: translateY(-38vh); opacity: 0;
          animation: rkw-pre-fall .8s cubic-bezier(.55,0,.9,.4) .15s forwards;
        }
        @keyframes rkw-pre-fall {
          0%   { transform: translateY(-38vh) scaleY(1.3); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; transform: translateY(72px) scaleY(1.15); }
          100% { opacity: 0; transform: translateY(88px) scale(.4); }
        }

        /* ripples where the drop lands */
        .rkw-pre__ripple {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid ${C.mustard}; opacity: 0; transform: scale(.5);
          animation: rkw-pre-ripple 1.5s cubic-bezier(.2,.6,.3,1) infinite;
        }
        .rkw-pre__ripple:nth-child(1) { animation-delay: .85s; }
        .rkw-pre__ripple:nth-child(2) { animation-delay: 1.25s; }
        @keyframes rkw-pre-ripple {
          0%   { opacity: .7; transform: scale(.55); }
          100% { opacity: 0;  transform: scale(1.35); }
        }

        /* badge */
        .rkw-pre__badge {
          position: absolute; inset: 22px; border-radius: 50%;
          background: ${C.paper}; border: 3px solid ${C.mustard};
          box-shadow: 0 0 0 6px rgba(242,183,5,.14), 0 18px 40px rgba(0,0,0,.35);
          overflow: hidden;
          transform: scale(.6); opacity: 0;
          animation: rkw-pre-pop .7s cubic-bezier(.2,1.3,.4,1) .75s forwards;
        }
        @keyframes rkw-pre-pop { to { transform: scale(1); opacity: 1; } }

        /* oil rising inside the badge */
        .rkw-pre__oil {
          position: absolute; left: -10%; right: -10%; bottom: 0; height: 100%;
          background: linear-gradient(180deg, #FFE07A 0%, ${C.mustard} 55%, #C98F00 100%);
          opacity: .35;
          transform: translateY(100%);
          animation: rkw-pre-rise 1.8s cubic-bezier(.45,.05,.2,1) .9s forwards;
        }
        .rkw-pre__oil::before {
          content: ''; position: absolute; left: -50%; top: -10px; width: 200%; height: 20px;
          background: inherit; border-radius: 50%;
          animation: rkw-pre-wave 2.2s ease-in-out infinite alternate;
        }
        @keyframes rkw-pre-rise { to { transform: translateY(8%); } }
        @keyframes rkw-pre-wave { from { transform: translateX(-6%); } to { transform: translateX(6%); } }

        .rkw-pre__logo { position: absolute; inset: 14%; }

        /* progress ring */
        .rkw-pre__ring { position: absolute; inset: 0; transform: rotate(-90deg); }
        .rkw-pre__ring-track { stroke: rgba(251,243,220,.14); }
        .rkw-pre__ring-bar {
          stroke: ${C.mustard}; stroke-linecap: round;
          stroke-dasharray: 477.5; stroke-dashoffset: 477.5;
          animation: rkw-pre-ring 1.9s cubic-bezier(.5,.1,.2,1) .8s forwards;
        }
        @keyframes rkw-pre-ring { to { stroke-dashoffset: 0; } }

        /* text */
        .rkw-pre__title, .rkw-pre__sub {
          opacity: 0; transform: translateY(14px);
          animation: rkw-pre-text .8s cubic-bezier(.2,.7,.2,1) forwards;
        }
        .rkw-pre__title { animation-delay: 1.1s; }
        .rkw-pre__sub   { animation-delay: 1.4s; }
        @keyframes rkw-pre-text { to { opacity: 1; transform: none; } }

        .rkw-pre__bar {
          width: 120px; height: 3px; border-radius: 999px; overflow: hidden;
          background: rgba(251,243,220,.16);
          opacity: 0; animation: rkw-pre-text .6s ease 1.5s forwards;
        }
        .rkw-pre__bar i {
          display: block; height: 100%; width: 100%; background: ${C.mustard};
          transform-origin: 0 50%; transform: scaleX(0);
          animation: rkw-pre-bar 1.3s cubic-bezier(.5,.1,.2,1) 1.5s forwards;
        }
        @keyframes rkw-pre-bar { to { transform: scaleX(1); } }

        @media (prefers-reduced-motion: reduce) {
          .rkw-pre__drop, .rkw-pre__ripple, .rkw-pre__oil::before { display: none; }
          .rkw-pre__badge, .rkw-pre__title, .rkw-pre__sub, .rkw-pre__bar {
            animation: rkw-pre-text .3s ease forwards; transform: none; animation-delay: 0s;
          }
          .rkw-pre__oil { animation: none; transform: translateY(8%); }
          .rkw-pre__ring-bar { animation: none; stroke-dashoffset: 0; }
          .rkw-pre__bar i { animation: none; transform: scaleX(1); }
          .rkw-pre--out .rkw-pre__navy,
          .rkw-pre--out .rkw-pre__mustard { animation: rkw-pre-fade .4s ease forwards; }
          @keyframes rkw-pre-fade { to { opacity: 0; } }
        }
      `}</style>

            <div className="rkw-pre__mustard" />
            <div className="rkw-pre__navy" />

            <div className="rkw-pre__content">
                <div className="rkw-pre__stage">
                    {/* falling drop */}
                    <svg className="rkw-pre__drop" viewBox="0 0 20 28" aria-hidden>
                        <path d="M10 0 C10 0 1 14 1 19 a9 9 0 0 0 18 0 C19 14 10 0 10 0 Z" fill={C.mustard} />
                    </svg>

                    {/* ripples */}
                    <span className="rkw-pre__ripple" aria-hidden />
                    <span className="rkw-pre__ripple" aria-hidden />

                    {/* progress ring */}
                    <svg className="rkw-pre__ring" viewBox="0 0 160 160" aria-hidden>
                        <circle className="rkw-pre__ring-track" cx="80" cy="80" r="76" fill="none" strokeWidth="2" />
                        <circle className="rkw-pre__ring-bar" cx="80" cy="80" r="76" fill="none" strokeWidth="3" />
                    </svg>

                    {/* badge with logo + rising oil */}
                    <div className="rkw-pre__badge">
                        <div className="rkw-pre__oil" />
                        <div className="rkw-pre__logo">
                            <Image
                                src="/logos/4.svg"
                                alt="Ramesh Kolhu Wale"
                                fill
                                priority
                                sizes="120px"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                    <p
                        className={`${deva.className} rkw-pre__title`}
                        style={{ fontSize: 'clamp(1.9rem, 6vw, 2.75rem)', lineHeight: 1.2, color: C.mustard }}
                    >
                        शुद्ध तेल और घी
                    </p>
                    <p
                        className="rkw-pre__sub text-xs font-bold uppercase"
                        style={{ letterSpacing: '0.28em', color: C.paper, opacity: 0.8 }}
                    >
                        Pressed while you watch
                    </p>
                </div>

                <div className="rkw-pre__bar" aria-hidden>
                    <i />
                </div>
            </div>
        </div>
    );
}

export default Preloader;