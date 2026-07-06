import { recentBookings } from '../../data/bookings';
import RecentBookingsTable from '../../components/admin/RecentBookingsTable';
import LiveTrackingCard from '../../components/admin/LiveTrackingCard';
import AdminLayout from '../../layouts/AdminLayout';
import Avatar from '../../components/admin/Avatar';

// Driver details with high quality Unsplash photos matching the mockup
const TOP_DRIVERS = [
  {
    rank: 1,
    name: 'Amit Verma',
    rating: 4.9,
    rides: 120,
    earnings: '₹ 18,750',
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80'
  },
  {
    rank: 2,
    name: 'Vikram Rao',
    rating: 4.8,
    rides: 110,
    earnings: '₹ 16,300',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  },
  {
    rank: 3,
    name: 'Sandeep Yadav',
    rating: 4.7,
    rides: 98,
    earnings: '₹ 14,250',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  {
    rank: 4,
    name: 'Manoj Kumar',
    rating: 4.6,
    rides: 85,
    earnings: '₹ 12,500',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80'
  },
  {
    rank: 5,
    name: 'Rohit Singh',
    rating: 4.6,
    rides: 80,
    earnings: '₹ 11,200',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

export default function DashboardView({ email, onLogout, onNavigate }) {
  // Booking stats matching mockup
  const totalBookings = 2568;
  const totalRevenue = '₹ 1,25,000';
  const activeDrivers = 368;
  const totalUsers = 12568;

  // Donut chart parameters
  const radius = 40;
  const circ = 2 * Math.PI * radius; // ~251.3
  const completedPercent = 64.2;
  const ongoingPercent = 25.3;
  const cancelledPercent = 10.5;

  return (
    <AdminLayout
      activePage="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      variant="dark"
    >
      <main className="min-h-screen min-w-0 flex-1 bg-[#0D0D0D] px-6 py-5 text-white">

        {/* KPI Stats Cards (4 Column Grid) */}
        <section className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Card 1: Total Bookings */}
          <article className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Bookings</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold tracking-tight">2,568</span>
                  <span className="text-[11px] font-bold text-[#4CAF50] flex items-center">
                    <span className="mr-0.5">▲</span>18.6%
                  </span>
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFB300]/10 text-[#FFB300] border border-[#FFB300]/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
            </div>
            {/* Sparkline chart SVG */}
            <div className="mt-4 h-8 w-full">
              <svg className="h-full w-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad-gold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFB300" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FFB300" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,20 Q15,10 30,18 T60,8 T90,15 L100,10 L100,25 L0,25 Z"
                  fill="url(#grad-gold)"
                />
                <path
                  d="M0,20 Q15,10 30,18 T60,8 T90,15 L100,10"
                  fill="none"
                  stroke="#FFB300"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </article>

          {/* Card 2: Total Revenue */}
          <article className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Revenue</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold tracking-tight">₹ 1,25,000</span>
                  <span className="text-[11px] font-bold text-[#4CAF50] flex items-center">
                    <span className="mr-0.5">▲</span>22.5%
                  </span>
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M6 12h.01M18 12h.01" />
                </svg>
              </div>
            </div>
            {/* Sparkline chart SVG */}
            <div className="mt-4 h-8 w-full">
              <svg className="h-full w-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad-green" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,22 Q20,22 40,8 T80,18 L100,10 L100,25 L0,25 Z"
                  fill="url(#grad-green)"
                />
                <path
                  d="M0,22 Q20,22 40,8 T80,18 L100,10"
                  fill="none"
                  stroke="#4CAF50"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </article>

          {/* Card 3: Active Drivers */}
          <article className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Active Drivers</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold tracking-tight">368</span>
                  <span className="text-[11px] font-bold text-[#4CAF50] flex items-center">
                    <span className="mr-0.5">▲</span>12.4%
                  </span>
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9C27B0]/10 text-[#9C27B0] border border-[#9C27B0]/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
            </div>
            {/* Sparkline chart SVG */}
            <div className="mt-4 h-8 w-full">
              <svg className="h-full w-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad-purple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#9C27B0" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,20 Q15,10 30,22 T70,8 T100,18 L100,25 L0,25 Z"
                  fill="url(#grad-purple)"
                />
                <path
                  d="M0,20 Q15,10 30,22 T70,8 T100,18"
                  fill="none"
                  stroke="#9C27B0"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </article>

          {/* Card 4: Total Users */}
          <article className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Users</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold tracking-tight">12,568</span>
                  <span className="text-[11px] font-bold text-[#4CAF50] flex items-center">
                    <span className="mr-0.5">▲</span>15.3%
                  </span>
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2196F3]/10 text-[#2196F3] border border-[#2196F3]/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5">
                  <path d="M17 21v-2a4 4 0 00-3-3.87M9 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
            </div>
            {/* Sparkline chart SVG */}
            <div className="mt-4 h-8 w-full">
              <svg className="h-full w-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad-blue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2196F3" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2196F3" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,18 Q25,24 50,10 T85,15 L100,6 L100,25 L0,25 Z"
                  fill="url(#grad-blue)"
                />
                <path
                  d="M0,18 Q25,24 50,10 T85,15 L100,6"
                  fill="none"
                  stroke="#2196F3"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </article>

        </section>

        {/* Row 2: Recent Bookings Table (7 cols) + Live Tracking (5 cols) */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 items-stretch mb-6">
          <div className="lg:col-span-7 flex flex-col justify-stretch">
            <RecentBookingsTable bookings={recentBookings} />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-stretch">
            <LiveTrackingCard />
          </div>
        </div>

        {/* Row 3: Earnings Overview (4 cols) + Top Drivers (4 cols) + Booking Status (4 cols) */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          
          {/* Earnings Overview Widget */}
          <article className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg">
            <header className="mb-2 flex items-center justify-between">
              <h2 className="text-md font-bold text-white">Earnings Overview</h2>
              <button
                type="button"
                className="cursor-pointer border-none bg-transparent p-0 text-xs font-semibold text-[#F5C518] hover:text-[#D4A80E] hover:underline"
              >
                View Report
              </button>
            </header>

            {/* Value & Growth indicator */}
            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-white">₹ 1,25,000</span>
              <span className="text-[11px] font-bold text-[#4CAF50] flex items-center">
                <span className="mr-0.5">▲</span>22.5%
              </span>
            </div>

            {/* Line Chart Area */}
            <div className="relative h-[180px] w-full pr-1">
              
              {/* Y Axis Grid Labels */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[9px] text-gray-500 font-medium">
                <span>₹ 1,50,000</span>
                <span>₹ 1,00,000</span>
                <span>₹ 50,000</span>
                <span className="translate-y-1">₹ 0</span>
              </div>

              {/* Chart Plot Wrapper */}
              <div className="ml-14 h-[155px] relative border-b border-l border-white/[0.05]">
                {/* Horizontal grid lines */}
                <div className="absolute inset-x-0 top-0 border-t border-white/[0.03] h-0" />
                <div className="absolute inset-x-0 top-[33%] border-t border-white/[0.03] h-0" />
                <div className="absolute inset-x-0 top-[66%] border-t border-white/[0.03] h-0" />

                {/* SVG Line Graph */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 240 155" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F5C518" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#F5C518" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Gradient Area Fill */}
                  {/* Coordinates mapping:
                      X intervals: 0, 40, 80, 120, 160, 200, 240
                      Y coordinates (max 155 height):
                      20 May: 110 (₹ 45k)
                      21 May: 75  (₹ 80k)
                      22 May: 88  (₹ 67k)
                      23 May: 62  (₹ 95k)   <-- Tooltip target
                      24 May: 98  (₹ 57k)
                      25 May: 45  (₹ 112k)
                      26 May: 25  (₹ 132k)
                  */}
                  <path
                    d="M 10 110 L 48 75 L 86 88 L 124 62 L 162 98 L 200 45 L 238 25 L 238 155 L 10 155 Z"
                    fill="url(#chart-area-grad)"
                  />

                  {/* Gold Line */}
                  <path
                    d="M 10 110 L 48 75 L 86 88 L 124 62 L 162 98 L 200 45 L 238 25"
                    fill="none"
                    stroke="#F5C518"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Interactive Dot Markers */}
                  <circle cx="10" cy="110" r="3.5" fill="#1A1A1A" stroke="#F5C518" strokeWidth="1.5" />
                  <circle cx="48" cy="75" r="3.5" fill="#1A1A1A" stroke="#F5C518" strokeWidth="1.5" />
                  <circle cx="86" cy="88" r="3.5" fill="#1A1A1A" stroke="#F5C518" strokeWidth="1.5" />
                  
                  {/* Tooltip Point (23 May) */}
                  <circle cx="124" cy="62" r="5" fill="#F5C518" stroke="#FFFFFF" strokeWidth="1.5" />
                  
                  <circle cx="162" cy="98" r="3.5" fill="#1A1A1A" stroke="#F5C518" strokeWidth="1.5" />
                  <circle cx="200" cy="45" r="3.5" fill="#1A1A1A" stroke="#F5C518" strokeWidth="1.5" />
                  <circle cx="238" cy="25" r="3.5" fill="#1A1A1A" stroke="#F5C518" strokeWidth="1.5" />
                </svg>

                {/* Tooltip Popup on top of 23 May */}
                <div 
                  className="absolute bottom-[98px] left-[78px] z-10 rounded-lg bg-[#242424] border border-white/[0.08] px-2 py-1 text-center shadow-md animate-fade-in"
                  style={{ minWidth: '70px' }}
                >
                  <span className="block text-[8px] font-semibold text-gray-500">23 May 2025</span>
                  <span className="block text-[10px] font-extrabold text-[#F5C518]">₹ 95,000</span>
                  {/* Tooltip arrow tail */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#242424] border-r border-b border-white/[0.08]" />
                </div>

              </div>

              {/* X Axis Labels */}
              <div className="ml-14 mt-1.5 flex justify-between text-[9px] text-gray-500 font-semibold">
                <span>20 May</span>
                <span>21 May</span>
                <span>22 May</span>
                <span>23 May</span>
                <span>24 May</span>
                <span>25 May</span>
                <span>26 May</span>
              </div>
            </div>
          </article>

          {/* Top Drivers Widget */}
          <article className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg flex flex-col">
            <header className="mb-4 flex items-center justify-between">
              <h2 className="text-md font-bold text-white">Top Drivers</h2>
              <button
                type="button"
                className="cursor-pointer border-none bg-transparent p-0 text-xs font-semibold text-[#F5C518] hover:text-[#D4A80E] hover:underline"
              >
                View All
              </button>
            </header>

            {/* Drivers Ranked List */}
            <div className="flex flex-1 flex-col justify-between gap-3">
              {TOP_DRIVERS.map((driver) => (
                <div key={driver.rank} className="flex items-center justify-between text-xs py-0.5 border-b border-white/[0.02] last:border-0 pb-1.5 last:pb-0">
                  <div className="flex items-center gap-2">
                    {/* Rank Badge */}
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[10px] font-bold text-gray-400">
                      {driver.rank}
                    </span>
                    {/* Avatar */}
                    <Avatar
                      label={driver.name.split(' ').map(n=>n[0]).join('')}
                      seed={driver.name}
                      src={driver.avatar}
                      className="h-7 w-7"
                    />
                    <div>
                      <span className="block font-bold text-white leading-tight">{driver.name}</span>
                      <div className="flex items-center text-[10px] text-gray-500 leading-none mt-0.5">
                        <span className="text-[#F5C518] mr-0.5">★</span>
                        <span className="text-gray-300 font-semibold">{driver.rating}</span>
                        <span className="mx-1.5 text-gray-600">|</span>
                        <span>{driver.rides} Rides</span>
                      </div>
                    </div>
                  </div>
                  {/* Earnings */}
                  <span className="font-extrabold text-white">{driver.earnings}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Booking Status Widget */}
          <article className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg flex flex-col">
            <header className="mb-6">
              <h2 className="text-md font-bold text-white">Booking Status</h2>
            </header>

            {/* Donut Chart & Legend layout */}
            <div className="flex flex-1 items-center justify-between gap-2.5">
              
              {/* Circular SVG Donut Chart */}
              <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Track Circle (Muted slate background) */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="11"
                  />
                  
                  {/* Completed Segment (Green) - 64.2% */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke="#4CAF50"
                    strokeWidth="11"
                    strokeDasharray={circ}
                    strokeDashoffset={0}
                    strokeLinecap="round"
                  />

                  {/* Ongoing Segment (Yellow) - 25.3% */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke="#FFB300"
                    strokeWidth="11"
                    strokeDasharray={circ}
                    strokeDashoffset={circ - (circ * completedPercent) / 100}
                    strokeLinecap="round"
                  />

                  {/* Cancelled Segment (Red) - 10.5% */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke="#F44336"
                    strokeWidth="11"
                    strokeDasharray={circ}
                    strokeDashoffset={circ - (circ * (completedPercent + ongoingPercent)) / 100}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center text inside Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-extrabold text-white leading-tight">2,568</span>
                  <span className="text-[9px] uppercase tracking-wide text-gray-500 font-bold">Total</span>
                </div>
              </div>

              {/* Status Legend (Right side list) */}
              <div className="flex flex-col gap-2.5 flex-1 pr-1">
                
                {/* Legend: Completed */}
                <div className="flex items-start gap-2 text-xs">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded bg-[#4CAF50]" />
                  <div>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase leading-none">Completed</span>
                    <span className="block font-bold text-white mt-0.5">1,650 <span className="text-[10px] font-medium text-gray-500">(64.2%)</span></span>
                  </div>
                </div>

                {/* Legend: Ongoing */}
                <div className="flex items-start gap-2 text-xs">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded bg-[#FFB300]" />
                  <div>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase leading-none">Ongoing</span>
                    <span className="block font-bold text-white mt-0.5">650 <span className="text-[10px] font-medium text-gray-500">(25.3%)</span></span>
                  </div>
                </div>

                {/* Legend: Cancelled */}
                <div className="flex items-start gap-2 text-xs">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded bg-[#F44336]" />
                  <div>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase leading-none">Cancelled</span>
                    <span className="block font-bold text-white mt-0.5">268 <span className="text-[10px] font-medium text-gray-500">(10.5%)</span></span>
                  </div>
                </div>

              </div>

            </div>
          </article>

        </div>

      </main>
    </AdminLayout>
  );
}
