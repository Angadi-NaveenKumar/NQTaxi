import Avatar from './Avatar';
import StatusBadge from './StatusBadge';

export default function RecentBookingsTable({ bookings }) {
  return (
    <section
      className="min-w-0 rounded-2xl border border-white/[0.08] bg-bg-secondary px-6 pb-2 pt-5"
      aria-labelledby="recent-bookings-title"
    >
      <header className="mb-5 flex items-center justify-between">
        <h2 id="recent-bookings-title" className="m-0 text-lg font-bold tracking-tight text-text-primary">
          Recent Bookings
        </h2>
        <button
          type="button"
          className="cursor-pointer border-none bg-transparent p-0 font-sans text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
        >
          View All
        </button>
      </header>

      <div className="-mx-1 overflow-x-auto pb-3">
        <table className="w-full min-w-[720px] border-collapse text-[0.8125rem] max-[900px]:min-w-[720px]">
          <thead>
            <tr>
              {['Booking ID', 'User', 'Pickup - Drop', 'Driver', 'Fare', 'Status'].map((heading) => (
                <th
                  key={heading}
                  className="whitespace-nowrap px-3 pb-3.5 text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-text-secondary"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-white/[0.04]">
                <td className="whitespace-nowrap border-t border-white/[0.08] px-3 py-3.5 font-medium text-text-primary">
                  {booking.id}
                </td>
                <td className="border-t border-white/[0.08] px-3 py-3.5 align-middle">
                  <div className="flex items-center gap-2.5 whitespace-nowrap">
                    <Avatar label={booking.user.avatar} seed={booking.user.name} />
                    <span className="font-medium text-text-primary">{booking.user.name}</span>
                  </div>
                </td>
                <td className="border-t border-white/[0.08] px-3 py-3.5 align-middle">
                  <div className="flex min-w-36 flex-col gap-0.5">
                    <span className="leading-snug text-text-secondary">{booking.pickup}</span>
                    <span className="text-xs leading-none text-text-secondary opacity-70" aria-hidden="true">
                      →
                    </span>
                    <span className="leading-snug text-text-secondary">{booking.drop}</span>
                  </div>
                </td>
                <td className="border-t border-white/[0.08] px-3 py-3.5 align-middle">
                  <div className="flex items-center gap-2.5 whitespace-nowrap">
                    <Avatar label={booking.driver.avatar} seed={booking.driver.name} />
                    <span className="font-medium text-text-primary">{booking.driver.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap border-t border-white/[0.08] px-3 py-3.5 font-semibold text-text-primary">
                  ₹ {booking.fare}
                </td>
                <td className="border-t border-white/[0.08] px-3 py-3.5 align-middle">
                  <StatusBadge status={booking.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
