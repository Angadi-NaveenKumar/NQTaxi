import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { overviewNavItems, activeTripNavItems, accountNavItems } from './NavigationConfig';
import { clsx } from 'clsx';
import { LogOut } from 'lucide-react';

export default function SidebarNavigation({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const renderNavItem = (item) => {
    const [itemPath, itemHash] = item.path.split('#');
    const isActive = itemHash
      ? location.pathname === itemPath && location.hash === `#${itemHash}`
      : location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link
        key={item.id}
        to={item.path}
        onClick={(event) => {
          if (!itemHash || location.pathname !== itemPath) return;

          event.preventDefault();
          navigate(item.path);
          setTimeout(() => {
            document.getElementById(itemHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 0);
        }}
        className={clsx(
          'flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group text-sm',
          isActive
            ? 'bg-primary/20 text-primary border border-primary/30 shadow-glow font-bold'
            : 'text-muted hover:text-text hover:bg-elevated hover:border-border border border-transparent font-medium'
        )}
      >
        <Icon
          size={20}
          className={clsx(
            'transition-all duration-300',
            isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'
          )}
        />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="hidden md:flex md:flex-col md:w-72 bg-surface border-r border-border h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <svg className="h-10 w-11" viewBox="0 0 44 30" fill="none">
            <rect x="3" y="12" width="38" height="14" rx="4" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
            <path d="M10 12 L14 6 H30 L34 12 Z" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
            <rect x="16" y="3" width="12" height="5" rx="1.5" fill="#1A1A1A" />
            <text x="22" y="7" textAnchor="middle" fill="#F5C518" fontSize="3.5" fontWeight="bold">TX</text>
            <circle cx="12" cy="26" r="3.5" fill="#333" />
            <circle cx="32" cy="26" r="3.5" fill="#333" />
          </svg>
          <span className="text-2xl font-bold tracking-tight text-primary">NQTAXI</span>
        </div>
        <p className="text-xs text-muted mt-2">Driver Portal</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Overview & Earnings Section */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider px-4">
            Overview &amp; Earnings
          </div>
          <div className="space-y-1">
            {overviewNavItems.map(renderNavItem)}
          </div>
        </div>

        {/* Active Ride Section */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider px-4">
            Active Ride Flow
          </div>
          <div className="space-y-1">
            {activeTripNavItems.map(renderNavItem)}
          </div>
        </div>

        {/* Account & Settings Section */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-muted uppercase tracking-wider px-4">
            Account &amp; Settings
          </div>
          <div className="space-y-1">
            {accountNavItems.map(renderNavItem)}
          </div>
        </div>
      </nav>

      {/* Log Out button at the bottom */}
      {onLogout && (
        <div className="p-4 border-t border-border">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-4 px-4 py-3 rounded-2xl text-danger hover:bg-danger/10 transition-all font-medium text-sm"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </aside>
  );
}
