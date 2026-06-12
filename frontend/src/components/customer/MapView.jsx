import { MdMyLocation } from 'react-icons/md';

export default function MapView({
  variant = 'default',
  showRoute = false,
  showDriver = false,
  showEmergency = false,
  onEmergency,
}) {
  const isFull = variant === 'full';
  const isConfirm = variant === 'confirm';

  return (
    <div
      className={`relative w-full overflow-hidden bg-card shadow-card ${
        isFull
          ? 'h-[calc(100vh-220px)] min-h-[320px] rounded-none'
          : isConfirm
            ? 'h-56 rounded-2xl'
            : 'h-52 rounded-2xl sm:h-64'
      }`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d="M0 80 Q120 60 200 90 T400 70"
          fill="none"
          stroke="#3a3a3a"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {showRoute && (
          <path
            d="M80 120 Q160 100 240 140 T380 110"
            fill="none"
            stroke={showDriver ? '#2196F3' : '#F5C518'}
            strokeWidth="4"
            strokeDasharray={showDriver ? '0' : '8 6'}
            strokeLinecap="round"
          />
        )}
      </svg>

      {showRoute && (
        <>
          <MapMarker position="top-[28%] left-[22%]" color="emerald" label="Pickup" />
          {showDriver && (
            <MapMarker position="top-[45%] left-[48%]" color="primary" label="Driver" pulse />
          )}
          <MapMarker position="top-[32%] right-[18%]" color="red" label="Drop" />
        </>
      )}

      {!showRoute && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute -inset-4 animate-ping rounded-full bg-primary/30" />
          <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-card bg-primary shadow-lg" />
        </div>
      )}

      {!isFull && (
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-card/90 px-2.5 py-1.5 text-xs font-medium text-foreground backdrop-blur">
          <MdMyLocation className="text-info" />
          Live map preview
        </div>
      )}

      {showEmergency && (
        <button
          type="button"
          onClick={onEmergency}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-danger px-3 py-2 text-xs font-bold text-white shadow-card"
        >
          Emergency
        </button>
      )}
    </div>
  );
}

function MapMarker({ position, color, label, pulse = false }) {
  const colorClass =
    color === 'emerald'
      ? 'bg-emerald-500'
      : color === 'red'
        ? 'bg-red-500'
        : 'bg-primary';

  return (
    <div className={`absolute ${position} flex flex-col items-center`}>
      {pulse && (
        <span className="absolute -inset-3 animate-ping rounded-full bg-primary/40" />
      )}
      <span className={`relative h-3.5 w-3.5 rounded-full border-2 border-card shadow-md ${colorClass}`} />
      <span className="mt-1 rounded bg-card/95 px-1.5 py-0.5 text-[9px] font-bold text-foreground shadow">
        {label}
      </span>
    </div>
  );
}
