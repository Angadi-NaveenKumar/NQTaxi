import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const INITIAL_TRIPS = [
  {
    id: '#NQ123458',
    rider: 'Arjun Mehta',
    driver: 'Sandeep Y.',
    pickup: 'Karol Bagh',
    drop: 'Dwarka',
    fare: 430,
    status: 'ongoing',
    time: '11:30 AM',
    date: '2026-06-24'
  },
  {
    id: '#NQ123459',
    rider: 'Neha Kapoor',
    driver: 'Manoj Kumar',
    pickup: 'Saket',
    drop: 'Noida City',
    fare: 610,
    status: 'ongoing',
    time: '02:15 PM',
    date: '2026-06-24'
  },
  {
    id: '#NQ123461',
    rider: 'Priya Singh',
    driver: 'Vikram Rao',
    pickup: 'Gurgaon',
    drop: 'IGI Airport',
    fare: 750,
    status: 'scheduled',
    time: '09:00 AM',
    date: '2026-06-25'
  },
  {
    id: '#NQ123462',
    rider: 'Rahul Sharma',
    driver: 'Amit Verma',
    pickup: 'Connaught Place',
    drop: 'Noida Sector 62',
    fare: 520,
    status: 'scheduled',
    time: '06:30 PM',
    date: '2026-06-26'
  },
  {
    id: '#NQ123463',
    rider: 'Siddharth Roy',
    driver: 'Rohit Singh',
    pickup: 'Lajpat Nagar',
    drop: 'Vasant Kunj',
    fare: 310,
    status: 'scheduled',
    time: '04:00 PM',
    date: '2026-06-28'
  }
];

export default function BookingsTablePage({ email = 'admin@example.com', onLogout, onNavigate }) {
  // Use fixed date context representing June 2026
  const [currentYear] = useState(2026);
  const [currentMonth] = useState(5); // 0-indexed, so 5 is June
  const [selectedDate, setSelectedDate] = useState('2026-06-24');
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('nqTaxiScheduledTrips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({
    rider: '',
    driver: '',
    pickup: '',
    drop: '',
    fare: '',
    time: '12:00 PM',
    date: '2026-06-24'
  });

  useEffect(() => {
    localStorage.setItem('nqTaxiScheduledTrips', JSON.stringify(trips));
  }, [trips]);

  // Generate calendar days for June 2026
  const monthName = 'June 2026';
  const daysInMonth = 30;
  const firstDayIndex = 1; // June 1st, 2026 is a Monday (1)

  const calendarCells = [];
  // Empty slots for days of previous month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  // Days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  const getFullDateString = (dayNum) => {
    if (!dayNum) return '';
    const paddedDay = String(dayNum).padStart(2, '0');
    return `2026-06-${paddedDay}`;
  };

  const tripsForSelectedDate = trips.filter(t => t.date === selectedDate);

  const handleCreateTrip = (e) => {
    e.preventDefault();
    if (!newTrip.rider || !newTrip.pickup || !newTrip.drop || !newTrip.fare) {
      alert("Please fill all required fields");
      return;
    }

    const createdTrip = {
      id: `#NQ${Math.floor(100000 + Math.random() * 900000)}`,
      rider: newTrip.rider,
      driver: newTrip.driver || 'Auto Allocated',
      pickup: newTrip.pickup,
      drop: newTrip.drop,
      fare: parseFloat(newTrip.fare),
      status: 'scheduled',
      time: newTrip.time,
      date: newTrip.date
    };

    setTrips(prev => [...prev, createdTrip]);
    setIsModalOpen(false);
    setNewTrip({
      rider: '',
      driver: '',
      pickup: '',
      drop: '',
      fare: '',
      time: '12:00 PM',
      date: selectedDate
    });
  };

  const handleCancelTrip = (id) => {
    if (window.confirm("Are you sure you want to cancel this scheduled ride?")) {
      setTrips(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <AdminLayout activePage="calendar" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="flex h-[calc(100vh-6rem)] min-h-0 flex-col px-4 pb-4 pt-5 sm:px-8 overflow-y-auto">
        
        {/* Header */}
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide text-primary">Ride Scheduler</h1>
            <p className="text-xs text-text-secondary">Schedule new bookings and view dispatch rosters</p>
          </div>
          <button
            onClick={() => {
              setNewTrip(prev => ({ ...prev, date: selectedDate }));
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-black border-none transition-all hover:bg-primary-dark cursor-pointer shadow-glow"
          >
            + Schedule New Ride
          </button>
        </header>

        {/* Content Box */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start flex-1 min-h-0">
          
          {/* Calendar Widget */}
          <div className="lg:col-span-2 rounded-xl border border-white/[0.08] bg-bg-secondary p-5 shadow-panel">
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h2 className="text-base font-bold text-text-primary">{monthName}</h2>
              <span className="text-xs text-text-secondary">Roster Calendar</span>
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-text-secondary mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-1.5">
              {calendarCells.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-14 bg-transparent rounded-lg" />;
                }

                const dateStr = getFullDateString(day);
                const isSelected = dateStr === selectedDate;
                const dailyTrips = trips.filter(t => t.date === dateStr);
                const hasTrips = dailyTrips.length > 0;

                return (
                  <button
                    key={`day-${day}`}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`h-14 rounded-lg flex flex-col items-center justify-between p-1.5 transition-all border cursor-pointer relative ${
                      isSelected
                        ? 'bg-primary/10 border-primary text-primary font-bold'
                        : 'bg-bg-primary/40 border-white/[0.03] text-text-primary hover:border-white/20'
                    }`}
                  >
                    <span className="text-[11px] self-start leading-none">{day}</span>
                    
                    {/* Visual markers */}
                    {hasTrips && (
                      <div className="flex gap-0.5 justify-center w-full pb-1">
                        {dailyTrips.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className={`h-1.5 w-1.5 rounded-full ${
                              t.status === 'ongoing' ? 'bg-warning animate-pulse' : 'bg-primary'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trips Schedule Feed */}
          <div className="rounded-xl border border-white/[0.08] bg-bg-secondary p-5 shadow-panel h-full flex flex-col min-h-0">
            <h2 className="text-base font-bold text-text-primary mb-4 pb-3 border-b border-white/[0.08] flex items-center justify-between shrink-0">
              <span>Bookings on {selectedDate}</span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary font-bold">
                {tripsForSelectedDate.length}
              </span>
            </h2>

            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
              {tripsForSelectedDate.length === 0 ? (
                <div className="py-12 text-center text-text-secondary">
                  <p className="text-3xl mb-2">🗓️</p>
                  <p className="text-xs">No rides scheduled for this date.</p>
                </div>
              ) : (
                tripsForSelectedDate.map(t => (
                  <div key={t.id} className="p-4 rounded-xl border border-white/[0.05] bg-bg-primary/20 hover:border-white/10 transition flex flex-col gap-3 relative">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-xs text-text-secondary">{t.id} · {t.time}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        t.status === 'ongoing' 
                          ? 'bg-warning/20 text-warning border border-warning/30 animate-pulse' 
                          : 'bg-primary/20 text-primary border border-primary/30'
                      }`}>
                        {t.status}
                      </span>
                    </div>

                    <div className="text-xs text-text-primary space-y-1">
                      <div className="flex items-center gap-1.5"><span className="text-[10px] text-primary">🟢</span> <span className="truncate">{t.pickup}</span></div>
                      <div className="flex items-center gap-1.5"><span className="text-[10px] text-danger">🔴</span> <span className="truncate">{t.drop}</span></div>
                    </div>

                    <div className="flex justify-between items-center w-full border-t border-white/[0.04] pt-2.5 text-xs">
                      <div className="text-text-secondary">
                        <p>Rider: <span className="text-text-primary font-semibold">{t.rider}</span></p>
                        <p>Driver: <span className="text-text-primary font-semibold">{t.driver}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-text-primary">₹{t.fare}</p>
                        {t.status === 'scheduled' && (
                          <button
                            onClick={() => handleCancelTrip(t.id)}
                            className="text-[10px] text-danger font-semibold bg-transparent border-none p-0 cursor-pointer hover:underline mt-1"
                          >
                            Cancel Ride
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Modal schedule ride */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-[480px] rounded-2xl border border-white/[0.08] bg-bg-secondary p-6 shadow-card">
              <header className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3">
                <h3 className="text-lg font-bold text-text-primary">Schedule Booking</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border-none bg-transparent p-1 text-text-secondary hover:bg-white/[0.06] hover:text-text-primary cursor-pointer text-lg font-bold"
                >
                  ✕
                </button>
              </header>

              <form onSubmit={handleCreateTrip} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-secondary">Rider Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newTrip.rider}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, rider: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-secondary">Driver Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Amit Verma"
                    value={newTrip.driver}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, driver: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-text-secondary">Date *</label>
                    <input
                      type="date"
                      required
                      value={newTrip.date}
                      onChange={(e) => setNewTrip(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-text-secondary">Time *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 09:30 AM"
                      value={newTrip.time}
                      onChange={(e) => setNewTrip(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-secondary">Pickup Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Connaught Place, New Delhi"
                    value={newTrip.pickup}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, pickup: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-secondary">Destination Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IGI Airport Terminal 3"
                    value={newTrip.drop}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, drop: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-secondary">Fare (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 450"
                    value={newTrip.fare}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, fare: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary/50"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-semibold text-text-secondary hover:bg-white/[0.06] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-primary px-5 py-2.5 font-bold text-black border-none hover:bg-primary-dark cursor-pointer shadow-glow"
                  >
                    Schedule Trip
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
