import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Clock, Flag, MapPin, Navigation, Phone, ShieldCheck } from 'lucide-react';

export default function RideInProgress() {
  const navigate = useNavigate();
  const [enteredOtp, setEnteredOtp] = useState("");
  const [expectedOtp, setExpectedOtp] = useState("5729");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTrip, setActiveTrip] = useState({
    customerName: 'Demo Customer',
    customerPhone: '+91 9000000001',
    pickupLocation: 'MG Road, Bengaluru',
    dropLocation: 'Kempegowda Airport',
    distanceRemaining: '32 km',
    eta: '45 min',
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nqtaxi_active_booking");
      if (stored) {
        const booking = JSON.parse(stored);
        if (booking) {
          setActiveTrip({
            customerName: booking.customerName || "Demo Customer",
            customerPhone: booking.customerPhone || "+91 9000000001",
            pickupLocation: booking.pickup || "MG Road, Bengaluru",
            dropLocation: booking.destination || "Kempegowda Airport",
            distanceRemaining: booking.selectedRide?.distance || "32 km",
            eta: booking.selectedRide?.eta || "45 min",
          });
          if (booking.otp) {
            setExpectedOtp(booking.otp);
          }
        }
      }
    } catch (err) {
      console.error("Error reading active trip details", err);
    }
  }, []);

  const handleStartRide = () => {
    if (enteredOtp === expectedOtp) {
      // Navigate first to avoid localStorage write triggering storage events
      // that could cause DriverWorkflowGuard to re-evaluate before navigation.
      navigate("/driver/trip-completion");
      // Update booking status after navigation has been initiated
      setTimeout(() => {
        try {
          const stored = localStorage.getItem("nqtaxi_active_booking");
          if (stored) {
            const booking = JSON.parse(stored);
            booking.status = "in_progress";
            localStorage.setItem("nqtaxi_active_booking", JSON.stringify(booking));
          }
        } catch (err) {
          console.error("Error starting ride", err);
        }
      }, 0);
    } else {
      setErrorMsg("Invalid OTP. Please check with passenger and try again.");
    }
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

            <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-[#F5C518]/20 space-y-3">
              <div className="flex items-center gap-2 text-[#F5C518] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={16} />
                OTP Verification Required
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="text"
                  maxLength="4"
                  placeholder="Enter 4-Digit OTP"
                  value={enteredOtp}
                  onChange={(e) => {
                    setErrorMsg("");
                    setEnteredOtp(e.target.value.replace(/\D/g, ""));
                  }}
                  className="w-full sm:w-48 bg-background border border-gray-800 focus:border-primary text-foreground px-4 py-2 rounded-xl text-center font-bold tracking-[0.3em] text-lg outline-none transition"
                />
                {errorMsg && (
                  <p className="text-[#F44336] text-xs font-semibold">{errorMsg}</p>
                )}
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
              onClick={handleStartRide}
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
