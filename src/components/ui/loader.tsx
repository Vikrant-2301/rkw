import React, { useId } from 'react';

const C = {
    mustard: '#F2B705',
    mustardDeep: '#B98200',
    navy: '#0E2A47',
    paper: '#FBF3DC',
};

export type LoaderProps = {
    /** sm = buttons / inline, md = cards & sections, lg = full pages. Or a pixel number. */
    size?: 'sm' | 'md' | 'lg' | number;
    /** Optional text under the spinner, e.g. "Loading products…" */
    label?: string;
    /** 'dark' for light backgrounds (default), 'light' for navy / dark backgrounds. */
    tone?: 'dark' | 'light';
    /** Centre in the whole viewport on a paper background (use in app/loading.tsx). */
    fullscreen?: boolean;
    /** Fill the parent (parent must be position: relative) with a soft overlay. */
    overlay?: boolean;
    className?: string;
};

const SIZES = { sm: 20, md: 44, lg: 72 } as const;

/**
 * RKW loader: a mustard arc circles the ring (the ghani turning)
 * while an oil drop gently fills and settles in the centre.
 * Pure CSS, works in server components, client components, and loading.tsx.
 */
export function Loader({
    size = 'md',
    label,
    tone = 'dark',
    fullscreen = false,
    overlay = false,
    className = '',
}: LoaderProps) {
    const rawId = useId();
    const id = rawId.replace(/:/g, '');
    const oilGradientId = `rkw-ld-oil-${id}`;
    const clipId = `rkw-ld-clip-${id}`;

    const px = typeof size === 'number' ? size : SIZES[size];
    const track = tone === 'dark' ? 'rgba(14,42,71,.14)' : 'rgba(251,243,220,.2)';
    const text = tone === 'dark' ? C.navy : C.paper;

    const spinner = (
        <div
            role="status"
            aria-live="polite"
            className={`rkw-ld inline-flex flex-col items-center select-none ${className}`}
            style={{ gap: Math.max(8, px * 0.22) }}
        >
            <svg viewBox="0 0 48 48" width={px} height={px} aria-hidden="true" style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id={oilGradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFE07A" />
                        <stop offset="100%" stopColor={C.mustard} />
                    </linearGradient>
                    <clipPath id={clipId}>
                        <path d="M24 12 C24 12 15.5 22.5 15.5 28.5 a8.5 8.5 0 0 0 17 0 C32.5 22.5 24 12 24 12 Z" />
                    </clipPath>
                </defs>

                {/* ring track */}
                <circle cx="24" cy="24" r="21" fill="none" stroke={track} strokeWidth="3" />
                
                {/* rotating mustard arc */}
                <g className="rkw-ld__spin">
                    <circle
                        cx="24"
                        cy="24"
                        r="21"
                        fill="none"
                        stroke={C.mustard}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="34 98"
                    />
                </g>

                {/* drop outline + rising pure oil */}
                <path
                    d="M24 12 C24 12 15.5 22.5 15.5 28.5 a8.5 8.5 0 0 0 17 0 C32.5 22.5 24 12 24 12 Z"
                    fill={tone === 'dark' ? 'rgba(14,42,71,.08)' : 'rgba(251,243,220,.1)'}
                />
                <g clipPath={`url(#${clipId})`}>
                    <rect className="rkw-ld__fill" x="10" y="12" width="28" height="26" fill={`url(#${oilGradientId})`} />
                </g>
            </svg>

            {label ? (
                <span
                    style={{
                        color: text,
                        fontSize: px >= 44 ? 13 : 12,
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        opacity: 0.9,
                    }}
                >
                    {label}
                </span>
            ) : (
                <span className="sr-only">Loading</span>
            )}

            <style>{`
        .rkw-ld__spin { transform-origin: 24px 24px; animation: rkw-ld-spin 1.1s cubic-bezier(.55,.1,.35,.9) infinite; }
        .rkw-ld__fill { animation: rkw-ld-fill 1.8s cubic-bezier(.45,.05,.3,1) infinite; }
        @keyframes rkw-ld-spin { to { transform: rotate(360deg); } }
        @keyframes rkw-ld-fill {
          0%   { transform: translateY(26px); }
          55%  { transform: translateY(5px); }
          80%  { transform: translateY(5px); }
          100% { transform: translateY(26px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rkw-ld__spin { animation-duration: 3s; }
          .rkw-ld__fill { animation: none; transform: translateY(10px); }
        }
      `}</style>
        </div>
    );

    if (fullscreen) {
        return (
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: tone === 'dark' ? C.paper : C.navy,
                }}
            >
                {spinner}
            </div>
        );
    }

    if (overlay) {
        return (
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: tone === 'dark' ? 'rgba(251,243,220,.75)' : 'rgba(14,42,71,.7)',
                    backdropFilter: 'blur(2px)',
                    borderRadius: 'inherit',
                }}
            >
                {spinner}
            </div>
        );
    }

    return spinner;
}

/** Centred block for sections, e.g. while a product grid or admin table loads. */
export function SectionLoader({ label = 'Loading…', minHeight = 240, tone = 'dark' }: { label?: string; minHeight?: number; tone?: 'dark' | 'light' }) {
    return (
        <div className="flex items-center justify-center p-6" style={{ minHeight }}>
            <Loader size="md" label={label} tone={tone} />
        </div>
    );
}

export default Loader;
