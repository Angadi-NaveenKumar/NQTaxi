import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, History, Bell, Wallet, User, Menu, X, Car, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: History, label: 'History', path: '/history' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-surface-secondary">
        <div className="flex items-center gap-2">
          <Car className="text-primary" size={24} />
          <h1 className="text-primary font-bold text-xl">NQTaxi</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Sidebar (Desktop) / Drawer (Mobile) */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-surface-secondary border-r border-white/5 transform transition-transform duration-300 md:relative md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center gap-3">
          <Car className="text-primary" size={32} />
          <h1 className="text-primary font-extrabold text-2xl hidden md:block">NQTaxi</h1>
        </div>
        
        <nav className="mt-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground font-bold" 
                    : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-white/5">
            <Link
              to="/sos"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-error/10 text-error font-bold hover:bg-error/20 transition-all"
            >
              <ShieldAlert size={20} />
              <span>Safety (SOS)</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-secondary border-t border-white/5 flex justify-around p-3 z-40">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1",
                isActive ? "text-primary" : "text-text-secondary"
              )}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Floating SOS Button */}
      <Link 
        to="/sos"
        className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-error rounded-full flex items-center justify-center shadow-2xl shadow-error/40 z-50 animate-pulse active:scale-90 transition-transform"
      >
        <ShieldAlert size={28} className="text-white" />
      </Link>
    </div>
  );
}
