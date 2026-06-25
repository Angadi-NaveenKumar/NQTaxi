import React from 'react';
import { MapPin, Navigation, Calendar, CreditCard } from 'lucide-react';
import { clsx } from 'clsx';

export default function TripCard({ pickup, drop, fare, paymentType, date, status }) {
  // Determine dot colors based on status/index (matches screenshot: green, red, blue, orange)
  const getTimelineColors = () => {
    if (status === 'completed') return { start: 'bg-success', end: 'bg-primary' };
    if (status === 'cancelled') return { start: 'bg-muted', end: 'bg-danger' };
    
    // Default colors matching the screenshot
    const hash = (pickup.length + drop.length) % 4;
    if (hash === 0) return { start: 'bg-success', end: 'bg-primary' };
    if (hash === 1) return { start: 'bg-danger', end: 'bg-warning' };
    if (hash === 2) return { start: 'bg-info', end: 'bg-success' };
    return { start: 'bg-warning', end: 'bg-danger' };
  };

  const colors = getTimelineColors();

  return (
    <div className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow flex justify-between items-center gap-4">
      {/* Route Timeline */}
      <div className="flex items-start gap-4 flex-1">
        {/* Visual timeline line */}
        <div className="flex flex-col items-center self-stretch py-1.5 shrink-0">
          <span className={clsx('w-3 h-3 rounded-full', colors.start)} />
          <span className="w-0.5 flex-1 bg-border/80 my-1 min-h-[20px]" />
          <span className={clsx('w-3 h-3 rounded-full', colors.end)} />
        </div>

        {/* Addresses */}
        <div className="space-y-2">
          {/* Date Label inside card */}
          {date && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-primary uppercase tracking-wider">
              <Calendar size={12} />
              <span>{date}</span>
            </div>
          )}
          
          <div>
            <span className="text-[10px] uppercase text-muted tracking-wider block font-bold">Pickup</span>
            <p className="text-sm font-semibold text-text leading-tight">{pickup}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-muted tracking-wider block font-bold">Drop-off</span>
            <p className="text-sm font-semibold text-muted leading-tight">{drop}</p>
          </div>
        </div>
      </div>

      {/* Fare and Payment Method */}
      <div className="text-right shrink-0 flex flex-col justify-between self-stretch py-1">
        <div>
          <span className="text-2xl font-black text-text tracking-tight">
            ₹{fare}
          </span>
          <span className="text-[10px] uppercase text-muted tracking-wider block font-bold mt-1">Fare</span>
        </div>
        
        <div className="mt-auto">
          <span className={clsx(
            'inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider',
            paymentType?.toLowerCase() === 'cash' ? 'bg-success/15 text-success' : 'bg-info/15 text-info'
          )}>
            {paymentType}
          </span>
        </div>
      </div>
    </div>
  );
}
