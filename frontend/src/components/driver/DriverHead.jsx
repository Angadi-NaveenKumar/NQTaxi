import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, IndianRupee, BarChart2, History, Gift, Wallet } from 'lucide-react';
import { clsx } from 'clsx';

const subNavItems = [
  { id: 'earnings', label: 'Earnings', icon: IndianRupee, path: '/driver/earnings' },
  { id: 'stats', label: 'Stats', icon: BarChart2, path: '/driver/stats' },
  { id: 'history', label: 'History', icon: History, path: '/driver/history' },
  { id: 'incentives', label: 'Incentives', icon: Gift, path: '/driver/incentives' },
  { id: 'payouts', label: 'Payouts', icon: Wallet, path: '/driver/payouts' }
];

export default function DriverHeader({ title }) {
  const location = useLocation();

  return (
    <div className="bg-surface/95 backdrop-blur-xl border-b border-border sticky top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Top bar: Back and Title */}
        <div className="flex items-center gap-4 px-4 py-4 md:px-8 border-b border-border/50">
          <Link
            to="/driver/dashboard"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-elevated hover:bg-border transition-all active:scale-95 text-text"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-text">{title}</h1>
        </div>

        {/* Sub Navigation Tabs */}
        <nav className="flex overflow-x-auto scrollbar-none px-4 md:px-8 py-2 gap-2">
          {subNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 border duration-300',
                  isActive
                    ? 'bg-primary/10 border-primary/30 text-primary shadow-glow'
                    : 'bg-elevated/40 border-transparent text-muted hover:text-text hover:bg-elevated'
                )}
              >
                <Icon size={16} className={clsx('transition-transform duration-300', isActive && 'scale-110')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
