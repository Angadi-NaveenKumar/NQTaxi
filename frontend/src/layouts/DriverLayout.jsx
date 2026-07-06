import { useState } from 'react';

const PAGE_TITLES = {
  profile: 'Driver Profile Management',
  vehicle: 'Vehicle Information',
  documents: 'Documents Management',
  support: 'Support & Help Center',
  referral: 'Refer & Earn',
  'ride-in-progress': 'Rider Progress',
  'trip-completion': 'Trip Completion',
  'trip-details': 'Trip Details',
  'payment-confirmation': 'Payment Confirmation',
  'customer-rating': 'Customer Rating'
};

export default function DriverLayout({
  activePage,
  children,
}) {
  return (
    <div className="flex flex-col flex-1 min-w-0 bg-[#0D0D0D]">
      {/* Unified Top Header Bar */}
      <header className="hidden md:flex h-16 shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#0D0D0D] px-6 sticky top-0 z-20">
        {/* Left: Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-sm md:text-base font-bold tracking-tight text-white">
            {PAGE_TITLES[activePage] || 'Driver Portal'}
          </h1>
        </div>

        {/* Right: Date, Notifications, Profile Avatar */}
        <div className="flex items-center gap-4">
          {/* Date Indicator */}
          <span className="hidden sm:inline-block text-xs font-semibold text-gray-400">
            Active Session
          </span>

          {/* Notification Bell */}
          <button
            type="button"
            className="relative p-2 rounded-lg border border-white/[0.08] bg-[#1A1A1A] hover:bg-white/5 transition-colors"
            aria-label="Notifications"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gray-300">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-[#F5C518]" />
          </button>

          {/* Driver Profile Photo */}
          <div className="flex items-center gap-2 border-l border-white/[0.08] pl-4">
            <img
              src="https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80"
              alt="Driver Avatar"
              className="h-8 w-8 rounded-full border border-white/[0.12] object-cover"
            />
          </div>
        </div>
      </header>

      {/* Page children contents */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}

