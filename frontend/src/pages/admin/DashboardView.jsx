import { recentBookings } from '../../data/bookings';
import RecentBookingsTable from '../../components/admin/RecentBookingsTable';
import LiveTrackingCard from '../../components/admin/LiveTrackingCard';
import AdminLayout from '../../components/layout/AdminLayout';

export default function DashboardView({ email, onLogout, onNavigate }) {
  const completed = recentBookings.filter((b) => b.status === 'completed').length;
  const ongoing = recentBookings.filter((b) => b.status === 'ongoing').length;

  return (
    <AdminLayout
      activePage="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      variant="dark"
    >
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <header className="mb-8">
          <h1 className="mb-1 text-2xl text-text-primary">Dashboard</h1>
          <p className="m-0 text-[0.9rem] text-text-secondary">Welcome back, {email}</p>
        </header>

        <section className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
          <article className="rounded-xl border border-white/[0.08] bg-bg-secondary p-5">
            <span className="mb-2 block text-[0.8125rem] text-text-secondary">Total bookings</span>
            <strong className="text-[1.75rem] font-bold text-text-primary">{recentBookings.length}</strong>
          </article>
          <article className="rounded-xl border border-white/[0.08] bg-bg-secondary p-5">
            <span className="mb-2 block text-[0.8125rem] text-text-secondary">Completed</span>
            <strong className="text-[1.75rem] font-bold text-text-primary">{completed}</strong>
          </article>
          <article className="rounded-xl border border-white/[0.08] bg-bg-secondary p-5">
            <span className="mb-2 block text-[0.8125rem] text-text-secondary">Ongoing</span>
            <strong className="text-[1.75rem] font-bold text-warning">{ongoing}</strong>
          </article>
        </section>

        <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <RecentBookingsTable bookings={recentBookings} />
          <LiveTrackingCard />
        </div>
      </main>
    </AdminLayout>
  );
}
