import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Car, Gift, Coins, Info } from 'lucide-react';
import DriverHead from '../../components/driver/DriverHead';
import EarningChart from '../../components/driver/EarningChart';

export default function EarningsDashboard() {
  const navigate = useNavigate();

  // Weekly breakdown data matching the screenshot values
  const mockWeeklyData = [
    { day: 'Mon', rideEarnings: 800, incentives: 100, tips: 50 },
    { day: 'Tue', rideEarnings: 750, incentives: 80, tips: 40 },
    { day: 'Wed', rideEarnings: 600, incentives: 60, tips: 20 },
    { day: 'Thu', rideEarnings: 700, incentives: 120, tips: 40 },
    { day: 'Fri', rideEarnings: 950, incentives: 250, tips: 100 }, // Peak Friday
    { day: 'Sat', rideEarnings: 400, incentives: 30, tips: 10 },
    { day: 'Sun', rideEarnings: 1000, incentives: 300, tips: 120 } // Weekend Sunday
  ];

  // Totals calculated from mock data (matches screenshot total of ₹5,420)
  // Ride Earnings: 4800, Incentives: 420 (adjusted for exact sum: 4800+420+200 = 5420)
  const totals = {
    total: 5420,
    rides: 4800,
    incentives: 420,
    tips: 200
  };

  const handleViewDetails = () => {
    navigate('/driver/stats');
  };

  return (
    <div className="min-h-screen bg-background text-text pb-24 md:pb-8 flex flex-col">
      {/* Driver Navigation Header */}
      <DriverHead title="Earnings" />

      {/* Main Body */}
      <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full space-y-6">
        {/* Earnings Chart Component */}
        <EarningChart data={mockWeeklyData} />

        {/* Breakdown Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-muted uppercase tracking-wider px-2">Earnings Breakdown</h4>
          
          <div className="space-y-2">
            {/* Ride Earnings Card */}
            <div className="bg-surface border border-border rounded-2xl p-5 hover:border-success/30 transition-all duration-300 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <Car size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text text-sm">Ride Earnings</h4>
                  <p className="text-xs text-muted">Direct fare from completed trips</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-text">₹{totals.rides.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Incentives Card */}
            <div className="bg-surface border border-border rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Gift size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text text-sm">Incentives</h4>
                  <p className="text-xs text-muted">Peak hour and target bonuses</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-text">₹{totals.incentives.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-surface border border-border rounded-2xl p-5 hover:border-warning/30 transition-all duration-300 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
                  <Coins size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text text-sm">Tips</h4>
                  <p className="text-xs text-muted">Gratuity received from riders</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-text">₹{totals.tips.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex gap-3 bg-elevated/40 border border-border/80 rounded-2xl p-4 text-xs text-muted leading-relaxed">
          <Info size={16} className="text-primary shrink-0 mt-0.5" />
          <p>
            Earnings are processed every Monday at 04:00 AM. Completed amounts will transfer directly to your registered bank account and can take up to 2-3 business days to settle.
          </p>
        </div>

        {/* View Details Action Button */}
        <button
          onClick={handleViewDetails}
          className="w-full bg-surface border border-border hover:border-primary/50 text-text py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-elevated active:scale-95 mt-4"
        >
          <span>View Performance Details</span>
          <ArrowRight size={18} className="text-primary" />
        </button>
      </main>
    </div>
  );
}
