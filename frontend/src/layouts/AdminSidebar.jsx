const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'analytics', label: 'Analytics', icon: 'chart' },
  { id: 'fleet', label: 'Fleet', icon: 'truck' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'mail', label: 'Mail', icon: 'mail' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
];

function NavIcon({ name }) {
  switch (name) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M4 19V5M10 19V9M16 19v-4M22 19V3" />
        </svg>
      );
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v11M14 18H2M14 18h2a2 2 0 002-2v-3h3l-2-4h-5v9zM18 18h2v-3h-2v3zM6 18a2 2 0 100-4 2 2 0 000 4zM18 18a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M4 4h16v16H4zM4 4l8 8 8-8" />
        </svg>
      );
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    default:
      return null;
  }
}

const navItemBase =
  'flex h-10 w-10 items-center justify-center rounded-lg border-none bg-transparent text-text-secondary transition-[background,color]';

export default function AdminSidebar({ activePage, onNavigate }) {
  return (
    <aside
      className="flex w-full shrink-0 flex-row items-center justify-center gap-6 border-b border-white/[0.08] bg-bg-secondary px-3 py-3 md:w-[4.5rem] md:h-screen md:sticky md:top-0 md:flex-col md:border-b-0 md:border-r md:py-5"
      aria-label="Main navigation"
    >
      <button type="button" className="hidden flex-col gap-0.5 p-1.5 md:flex" aria-label="Menu">
        <span className="block h-0.5 w-[1.1rem] rounded-sm bg-text-secondary" />
        <span className="block h-0.5 w-[1.1rem] rounded-sm bg-text-secondary" />
        <span className="block h-0.5 w-[1.1rem] rounded-sm bg-text-secondary" />
      </button>

      <nav className="flex flex-1 flex-row flex-wrap items-center justify-center gap-1.5 md:flex-col">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          const Tag = item.disabled ? 'span' : 'button';

          return (
            <Tag
              key={item.id}
              type={item.disabled ? undefined : 'button'}
              className={`${navItemBase} ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : item.disabled
                    ? 'cursor-default opacity-45'
                    : 'cursor-pointer hover:bg-white/[0.04] hover:text-text-primary'
              }`}
              onClick={item.disabled ? undefined : () => onNavigate(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              title={item.label}
            >
              <NavIcon name={item.icon} />
            </Tag>
          );
        })}
      </nav>
    </aside>
  );
}
AdminSidebar.jsx
