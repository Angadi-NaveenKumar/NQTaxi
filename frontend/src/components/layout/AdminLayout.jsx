import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Car,
  IndianRupee,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  MapPin,
  HeadphonesIcon,
  Wallet,
  Tag,
  UserPlus,
  ClipboardList,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { id: 'bookings', label: 'Bookings', icon: ClipboardList, path: '/admin/bookings' },
  { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
  { id: 'fleet', label: 'Fleet', icon: Car, path: '/admin/vehicles' },
  { id: 'drivers', label: 'Drivers', icon: UserPlus, path: '/admin/drivers' },
  { id: 'fare', label: 'Fare Settings', icon: IndianRupee, path: '/admin/fare' },
  { id: 'earnings', label: 'Earnings', icon: BarChart3, path: '/admin/earnings' },
  { id: 'payouts', label: 'Payouts', icon: Wallet, path: '/admin/payouts' },
  { id: 'promos', label: 'Promo Codes', icon: Tag, path: '/admin/promos' },
  { id: 'live-map', label: 'Live Map', icon: MapPin, path: '/admin/live-map' },
  { id: 'reports', label: 'Reports', icon: FileText, path: '/admin/reports' },
  { id: 'support', label: 'Support', icon: HeadphonesIcon, path: '/admin/support' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
];

function NavItem({ item, active, collapsed, onNavigate }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        active
          ? 'bg-primary/15 text-primary shadow-glow'
          : 'text-text-secondary hover:bg-white/[0.06] hover:text-text-primary'
      }`}
    >
      <Icon
        size={18}
        className={`shrink-0 transition-colors ${active ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}`}
        aria-hidden="true"
      />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {active && !collapsed && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
      )}
    </Link>
  );
}

export default function AdminLayout({
  activePage,
  children,
  onLogout,
  variant = 'dark',
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const resolvedActive =
    activePage ||
    NAV_ITEMS.find((item) => location.pathname.startsWith(item.path))?.id ||
    'dashboard';

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate('/admin/login');
    }
  };

  const closeMobile = () => setSidebarOpen(false);

  const sidebarContent = (
    <>
      <div className={`flex items-center gap-3 border-b border-white/[0.08] px-4 py-5 ${collapsed ? 'justify-center' : ''}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-glow">
          <Car size={20} className="text-on-primary" aria-hidden="true" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-base font-bold tracking-tight text-text-primary">NQTaxi</p>
            <p className="truncate text-[0.7rem] font-medium uppercase tracking-widest text-text-secondary">
              Admin Console
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={resolvedActive === item.id}
            collapsed={collapsed}
            onNavigate={closeMobile}
          />
        ))}
      </nav>

      <div className="border-t border-white/[0.08] p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-all hover:bg-danger/10 hover:text-danger focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
        >
          <LogOut size={18} aria-hidden="true" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div
      className={`flex min-h-screen ${
        variant === 'light' ? 'bg-bg-primary' : 'bg-background'
      }`}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeMobile}
          aria-label="Close navigation menu"
        />
      )}

      {/* Sidebar — desktop */}
      <aside
        className={`hidden shrink-0 flex-col border-r border-white/[0.08] bg-surface transition-all duration-300 md:flex ${
          collapsed ? 'w-[72px]' : 'w-64'
        }`}
        aria-label="Sidebar"
      >
        {sidebarContent}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="mx-3 mb-3 flex items-center justify-center rounded-lg border border-white/[0.08] py-2 text-text-secondary transition hover:bg-white/[0.06] hover:text-text-primary"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            size={16}
            className={`transition-transform ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </aside>

      {/* Sidebar — mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/[0.08] bg-surface transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile sidebar"
      >
        <div className="flex items-center justify-end px-3 pt-3">
          <button
            type="button"
            onClick={closeMobile}
            className="rounded-lg p-2 text-text-secondary hover:bg-white/[0.06] hover:text-text-primary"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        {sidebarContent}
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-white/[0.08] bg-background/80 px-4 py-3 backdrop-blur-md md:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-text-secondary hover:bg-white/[0.06] hover:text-text-primary md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-text-primary">Admin User</p>
              <p className="text-xs text-text-secondary">admin@nqtaxi.com</p>
            </div>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary"
              aria-hidden="true"
            >
              A
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
}
