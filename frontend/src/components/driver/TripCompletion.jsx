import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CheckCircle } from 'lucide-react';

export default function TripCompletion() {
  const navigate = useNavigate();
  const completedTrip = {
    totalDistance: '12.4 km',
    totalDuration: '34 min',
    fareAmount: 'Rs. 286',
  };

  return (
    <div id="trip-completion" className="space-y-4 scroll-mt-24">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <CheckCircle size={24} className="text-primary" />
        Trip Completion
      </h2>
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-lg space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted">Ride Status</div>
            <div className="text-xl font-bold text-success">Ride Completed</div>
          </div>
          <span className="px-3 py-1 rounded-full bg-success/10 text-success border border-success/30 text-xs font-bold">
            Completed
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-elevated p-4 rounded-2xl">
            <div className="text-xs text-muted">Distance</div>
            <div className="text-lg font-bold mt-1">{completedTrip.totalDistance}</div>
          </div>
          <div className="bg-elevated p-4 rounded-2xl">
            <div className="text-xs text-muted">Duration</div>
            <div className="text-lg font-bold mt-1">{completedTrip.totalDuration}</div>
          </div>
          <div className="bg-elevated p-4 rounded-2xl">
            <div className="text-xs text-muted">Fare</div>
            <div className="text-lg font-bold text-primary mt-1">{completedTrip.fareAmount}</div>
          </div>
        </div>
        <button
          onClick={() => navigate("/driver/payment-confirmation")}
          className="w-full bg-success text-white py-3 px-4 rounded-2xl font-bold hover:bg-success/80 transition-colors active:scale-95 flex items-center justify-center gap-2"
        >
          <Check size={18} />
          Finish Ride
        </button>
      </div>
    </div>
  );
}
