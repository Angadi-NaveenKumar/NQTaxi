import AdminSidebar from './AdminSidebar';

export default function AdminLayout({
  activePage,
  onNavigate,
  onLogout,
  variant: _variant = 'dark',
  children,
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-bg-primary text-text-primary md:flex-row">
      <AdminSidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      <button
        type="button"
        className="fixed bottom-5 right-5 z-20 cursor-pointer rounded-full border border-white/[0.08] bg-bg-secondary px-3.5 py-2 font-sans text-xs font-semibold text-text-secondary shadow-soft hover:border-primary/35 hover:text-primary"
        onClick={onLogout}
        title="Log out"
        aria-label="Log out"
      >
       Log Out
      </button>
    </div>
  );
}
