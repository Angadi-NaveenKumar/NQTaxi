import Avatar from './Avatar';

export default function LiveTrackingCard() {
  return (
    <section
      className="flex min-h-full flex-col rounded-2xl border border-white/[0.08] bg-bg-secondary p-5"
      aria-labelledby="live-tracking-title"
    >
      <h2 id="live-tracking-title" className="mb-4 text-lg font-bold text-text-primary">
        Live Tracking
      </h2>

      <div
        className="relative mb-4 min-h-[220px] flex-1 overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-bg-tertiary to-bg-primary"
        role="img"
        aria-label="Map preview"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:28px_28px] opacity-60"
          aria-hidden="true"
        />

        {/* SVG Road Network */}
        <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
          <path d="M0 60 Q120 40 200 70 T400 50" fill="none" stroke="#2a2a2a" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 0 L120 300" fill="none" stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round" />
          <path d="M250 0 L200 300" fill="none" stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round" />
          
          {/* Active Animated Route */}
          <path
            d="M50 80 Q140 60 210 110"
            fill="none"
            stroke="#F5C518"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50 80 Q140 60 210 110"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
            className="animate-[dash_15s_linear_infinite]"
          />
        </svg>

        {/* Pulse Indicators */}
        <span
          className="absolute left-[48px] top-[74px] h-2.5 w-2.5 rounded-full bg-[#F5C518] shadow-[0_0_8px_rgba(245,197,24,0.5)]"
          aria-hidden="true"
        />
        <span
          className="absolute left-[206px] top-[104px] h-2.5 w-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]"
          aria-hidden="true"
        />

        <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -1000;
            }
          }
        `}</style>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-bg-tertiary px-4 py-3.5">
        <Avatar label="AV" seed="Amit Verma live" />
        <div className="min-w-0 flex-1">
          <strong className="mb-0.5 block text-sm text-text-primary">Amit Verma</strong>
          <span className="text-xs text-text-secondary">En route · #NQ123458</span>
        </div>
        <span className="h-2 w-2 animate-pulse rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.35)]" aria-label="Live" />
      </div>
    </section>
  );
}
