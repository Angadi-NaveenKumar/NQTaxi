import { useState } from 'react';
import AdminSidebar from './AdminSidebar';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  support: 'Support & Help Center'
};

export default function AdminLayout({
  activePage,
  onNavigate,
  onLogout,
  variant: _variant = 'dark',
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden flex-col bg-[#0D0D0D] text-white md:flex-row font-sans">
      
      {/* Sidebar Drawer - Fixed static sidebar on desktop, drawer on mobile */}
      <AdminSidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
      />

      {/* Dark Overlay backdrop when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area - Scrolls independently of the static sidebar */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto h-full md:pl-60 bg-[#0D0D0D]">
        
        {/* Unified Top Header Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#0D0D0D] px-6 sticky top-0 z-20">
          {/* Left: Hamburger + Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex flex-col gap-1 p-2 hover:bg-white/5 rounded-lg transition-all"
              aria-label="Open Navigation Sidebar"
            >
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </button>
            <h1 className="text-sm md:text-base font-bold tracking-tight text-white">
              {PAGE_TITLES[activePage] || 'Admin Portal'}
            </h1>
          </div>

          {/* Right: Date Range, Notifications, Profile */}
          <div className="flex items-center gap-4">
            {/* Date Range Selector */}
            <button
              type="button"
              className="hidden sm:flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-[#1A1A1A] px-3.5 py-1.5 text-xs font-semibold text-gray-300 hover:border-white/20 transition-all"
            >
              <span>20 May 2025 - 26 May 2025</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5 text-gray-400">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </button>

            {/* Notification Bell with Orange/Yellow Badge */}
            <button
              type="button"
              className="relative p-2 rounded-lg border border-white/[0.08] bg-[#1A1A1A] hover:bg-white/5 transition-colors"
              aria-label="Notifications"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gray-300">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-[#FFB300]" />
            </button>

            {/* Administrator Profile Image */}
            <div className="flex items-center gap-2 border-l border-white/[0.08] pl-4">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
                alt="Administrator Avatar"
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
    </div>
  );
}
