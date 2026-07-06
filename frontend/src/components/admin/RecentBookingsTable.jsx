import Avatar from './Avatar';

const PROFILE_PHOTOS = {
  'Rahul Sharma': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'Priya Singh': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'Arjun Mehta': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'Neha Kapoor': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
  'Karan Malhotra': 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  'Amit Verma': 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80',
  'Vikram Rao': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'Sandeep Y.': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  'Manoj Kumar': 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80',
  'Rohit Singh': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
};

const STATUS_BADGES = {
  completed: 'text-[#4CAF50] bg-[#4CAF50]/10 border border-[#4CAF50]/20',
  ongoing: 'text-[#FFB300] bg-[#FFB300]/10 border border-[#FFB300]/20',
  cancelled: 'text-[#F44336] bg-[#F44336]/10 border border-[#F44336]/20'
};

const STATUS_LABELS = {
  completed: 'Completed',
  ongoing: 'Ongoing',
  cancelled: 'Cancelled'
};

export default function RecentBookingsTable({ bookings }) {
  return (
    <section
      className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg"
      aria-labelledby="recent-bookings-title"
    >
      <header className="mb-5 flex items-center justify-between">
        <h2 id="recent-bookings-title" className="m-0 text-md font-bold tracking-tight text-white">
          Recent Bookings
        </h2>
        <button
          type="button"
          onClick={() => alert("Bookings detail log is under development.")}
          className="cursor-pointer border-none bg-transparent p-0 text-xs font-semibold text-[#F5C518] hover:text-[#D4A80E] hover:underline"
        >
          View All
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">Booking ID</th>
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">User</th>
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">Pickup - Drop</th>
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">Driver</th>
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">Fare</th>
              <th className="pb-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 font-medium text-gray-400">
                  {booking.id}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Avatar 
                      label={booking.user.avatar} 
                      seed={booking.user.name} 
                      src={PROFILE_PHOTOS[booking.user.name]} 
                      className="h-6 w-6" 
                    />
                    <span className="font-semibold text-white">{booking.user.name}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="font-medium text-white">{booking.pickup}</span>
                    <span className="text-[10px] text-gray-600">➔</span>
                    <span className="text-gray-400">{booking.drop}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Avatar 
                      label={booking.driver.avatar} 
                      seed={booking.driver.name} 
                      src={PROFILE_PHOTOS[booking.driver.name]} 
                      className="h-6 w-6" 
                    />
                    <span className="font-semibold text-white">{booking.driver.name}</span>
                  </div>
                </td>
                <td className="py-3 font-bold text-white">
                  ₹ {booking.fare}
                </td>
                <td className="py-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold ${STATUS_BADGES[booking.status]}`}>
                    {STATUS_LABELS[booking.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
