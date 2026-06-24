import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Clock, Flag, MapPin, Navigation, Phone } from 'lucide-react';

export default function RideInProgress() {
  const navigate = useNavigate();
  const activeTrip = {
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98765 43210',
    pickupLocation: 'Indiranagar Metro Station, Bengaluru',
    dropLocation: 'Manyata Tech Park, Nagavara',
    distanceRemaining: '7.8 km',
    eta: '18 min',
  };

  return (
    <div id="ride-in-progress" className="space-y-4 scroll-mt-24">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Navigation size={24} className="text-primary" />
        Ride In Progress
      </h2>
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-lg">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-success/10 text-success border border-success/30 text-xs font-bold">
                In Progress
              </span>
              <span className="text-sm text-muted">Distance remaining: {activeTrip.distanceRemaining}</span>
              <span className="text-sm text-muted">ETA: {activeTrip.eta}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-elevated p-4 rounded-2xl border border-border">
                <div className="text-xs text-muted uppercase tracking-wider mb-1">Customer</div>
                <div className="font-bold text-lg">{activeTrip.customerName}</div>
                <div className="flex items-center gap-2 text-sm text-muted mt-2">
                  <Phone size={15} className="text-primary" />
                  {activeTrip.customerPhone}
                </div>
              </div>
              <div className="bg-elevated p-4 rounded-2xl border border-border">
                <div className="text-xs text-muted uppercase tracking-wider mb-1">Ride Status</div>
                <div className="font-bold text-lg text-success">Active Trip</div>
                <div className="flex items-center gap-2 text-sm text-muted mt-2">
                  <Clock size={15} className="text-primary" />
                  Reach drop in {activeTrip.eta}
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-elevated p-4 rounded-2xl border border-border">
                <div className="w-9 h-9 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider">Pickup Location</div>
                  <div className="font-medium mt-1">{activeTrip.pickupLocation}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-elevated p-4 rounded-2xl border border-border">
                <div className="w-9 h-9 rounded-full bg-danger/10 text-danger flex items-center justify-center shrink-0">
                  <Flag size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-wider">Drop Location</div>
                  <div className="font-medium mt-1">{activeTrip.dropLocation}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:w-56">
            <button
              onClick={() => navigate("/driver/trip-completion")}
              className="bg-primary text-primary-fg py-3 px-4 rounded-2xl font-bold hover:bg-primary/90 transition-colors active:scale-95 flex items-center justify-center gap-2"
            >
              <Car size={18} />
              Start Ride
            </button>
            <button className="bg-elevated text-text border border-border py-3 px-4 rounded-2xl font-bold hover:border-primary/50 hover:bg-border transition-colors active:scale-95 flex items-center justify-center gap-2">
              <Navigation size={18} />
              Open Navigation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
