import Avatar from './Avatar';

const AMIT_VERMA_AVATAR = 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80';

export default function LiveTrackingCard() {
  return (
    <section
      className="flex min-h-full flex-col rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg"
      aria-labelledby="live-tracking-title"
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 id="live-tracking-title" className="text-md font-bold text-white">
          Live Tracking
        </h2>
        <button
          type="button"
          className="cursor-pointer border-none bg-transparent p-0 text-xs font-semibold text-[#F5C518] hover:text-[#D4A80E] hover:underline"
        >
          View All
        </button>
      </header>

      {/* Map Container */}
      <div
        className="relative mb-4 min-h-[260px] flex-1 overflow-hidden rounded-xl border border-white/[0.08] bg-[#242424]"
        role="img"
        aria-label="Map preview"
      >
        {/* Custom SVG Map Grid & Roads */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          {/* Map Grid Pattern */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Road Network Lines (Dark Slate) */}
          <path d="M-20,100 L400,100" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
          <path d="M50,-20 L50,300" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
          <path d="M150,-20 Q120,80 280,180 T400,200" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
          <path d="M-20,220 L300,220" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />

          {/* Specific route path matching the mockup: Connaught Place -> Noida Sector 15 */}
          {/* Yellow Highlight Route */}
          <path
            d="M 68 62 Q 90 98 120 100 T 260 178"
            stroke="#F5C518"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="animate-pulse"
          />

          {/* Animated Route Dash Overlay */}
          <path
            d="M 68 62 Q 90 98 120 100 T 260 178"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
            className="animate-[dash_15s_linear_infinite]"
          />

          {/* Map Labels */}
          <text x="75" y="45" fill="rgba(255,255,255,0.3)" fontSize="8" fontWeight="500">Connaught Place</text>
          <text x="32" y="132" fill="rgba(255,255,255,0.2)" fontSize="8">Janpath</text>
          <text x="62" y="210" fill="rgba(255,255,255,0.2)" fontSize="8">India Gate</text>
          <text x="210" y="210" fill="rgba(255,255,255,0.2)" fontSize="8">Pragati Maidan</text>
          <text x="265" y="112" fill="rgba(255,255,255,0.2)" fontSize="8">Akshardham</text>
          <text x="272" y="182" fill="rgba(255,255,255,0.3)" fontSize="8" fontWeight="500">Noida Sector 15</text>

          {/* Green Pickup Pin (Connaught Place) */}
          <g transform="translate(68, 62)">
            <circle r="6" fill="#10B981" fillOpacity="0.2" />
            <circle r="4" fill="#10B981" />
            {/* Pin head */}
            <path d="M0 -3 L0 -12" stroke="#10B981" strokeWidth="1.5" />
            <circle cx="0" cy="-12" r="3" fill="#10B981" />
          </g>

          {/* Red Destination Pin (Noida Sector 15) */}
          <g transform="translate(260, 178)">
            <circle r="6" fill="#EF4444" fillOpacity="0.2" />
            <circle r="4" fill="#EF4444" />
            {/* Pin head */}
            <path d="M0 -3 L0 -12" stroke="#EF4444" strokeWidth="1.5" />
            <circle cx="0" cy="-12" r="3" fill="#EF4444" />
          </g>

          {/* Yellow Taxi Car Icon on Route */}
          {/* Placed at middle-ish Q coordinates (approx x=135, y=110) */}
          <g transform="translate(142, 112) rotate(22)">
            {/* Car body shadow */}
            <rect x="-8" y="-5" width="16" height="10" rx="2" fill="rgba(0,0,0,0.5)" />
            {/* Yellow car body */}
            <rect x="-7" y="-4" width="14" height="8" rx="1.5" fill="#F5C518" />
            {/* Car roof */}
            <rect x="-3" y="-3" width="7" height="6" rx="1" fill="#000000" />
            {/* Windshield */}
            <path d="M-2 -3 L-4 -1 L-4 1 L-2 3 Z" fill="rgba(255,255,255,0.4)" />
            {/* Headlights */}
            <circle cx="6" cy="-2" r="0.75" fill="#FFFFFF" />
            <circle cx="6" cy="2" r="0.75" fill="#FFFFFF" />
          </g>
        </svg>

        <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -1000;
            }
          }
        `}</style>

      </div>

      {/* Driver Status Panel */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#242424] px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar 
            label="AV" 
            seed="Amit Verma live" 
            src={AMIT_VERMA_AVATAR}
            className="h-10 w-10" 
          />
          <div>
            <div className="flex items-center gap-1.5">
              <strong className="block text-sm text-white">Amit Verma</strong>
              <div className="flex items-center text-[11px] text-[#F5C518]">
                <span className="mr-0.5">★</span>
                <span>4.8</span>
              </div>
            </div>
            <span className="text-[11px] text-gray-500">Swift Dzire - HR 26 AB 1234</span>
          </div>
        </div>

        <div className="text-right border-l border-white/[0.08] pl-4">
          <span className="block text-[10px] uppercase font-bold text-[#F5C518]">Ongoing Ride</span>
          <span className="text-xs font-medium text-white">Connaught Place ➔ Noida Sec 16</span>
        </div>
      </div>
    </section>
  );
}
