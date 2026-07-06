import React from 'react';

const NAV_ITEMS = [
  { id: 'profile', label: 'Driver Profile Management', icon: 'driver' },
  { id: 'vehicle', label: 'Vehicle Information', icon: 'car' },
  { id: 'documents', label: 'Documents Management', icon: 'file' },
  { id: 'support', label: 'Support & Help Center', icon: 'help' },
  { id: 'referral', label: 'Refer & Earn', icon: 'gift' }
];

function NavIcon({ name }) {
  switch (name) {
    case 'driver':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4.5 w-4.5">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      );
    case 'car':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4.5 w-4.5">
          <rect x="2" y="9" width="20" height="8" rx="2" />
          <path d="M17 9l-2-4H9L7 9" />
          <circle cx="6" cy="17" r="1.5" />
          <circle cx="18" cy="17" r="1.5" />
        </svg>
      );
    case 'file':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4.5 w-4.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case 'help':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4.5 w-4.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
        </svg>
      );
    case 'gift':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4.5 w-4.5">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DriverSidebar({ activePage, onNavigate, isOpen, onClose, onLogout }) {
  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-[#1A1A1A] text-white">
      {/* Upper Area */}
      <div>
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/[0.08] px-6">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🚕</span>
            <span className="text-lg font-black tracking-wider text-white">
              NQ<span className="text-[#F5C518]">Taxi</span> <span className="text-xs text-gray-400 font-bold ml-1 uppercase">Driver</span>
            </span>
          </div>
          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-white/5 md:hidden"
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-gray-400">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="mt-6 flex flex-col gap-1 px-3" aria-label="Driver navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  if (onClose) onClose();
                }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-[#F5C518]/10 text-[#F5C518] shadow-sm'
                    : 'text-gray-400 hover:bg-white/[0.03] hover:text-white'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={isActive ? 'text-[#F5C518]' : 'text-gray-400'}>
                  <NavIcon name={item.icon} />
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area (Logout button inside sidebar) */}
      <div className="border-t border-white/[0.08] p-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-xs font-semibold text-gray-300 hover:border-[#F44336]/30 hover:bg-[#F44336]/5 hover:text-[#F44336] transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Static on the left, independent of layout scrolling) */}
      <aside className="hidden h-screen w-60 shrink-0 border-r border-white/[0.08] bg-[#1A1A1A] md:block">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-in Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 transform bg-[#1A1A1A] transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
