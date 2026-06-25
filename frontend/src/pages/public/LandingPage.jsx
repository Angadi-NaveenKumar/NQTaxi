import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, MapPin, Shield, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui';
import { logout } from '../../services/authService';
import { useAppStore } from '../../store/useAppStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setAuthenticated, setRole } = useAppStore();

  const clearSession = () => {
    logout();
    localStorage.removeItem("nqtaxi_active_booking");
    setAuthenticated(false);
    setRole('rider');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg text-primary-foreground">
            <Car size={24} />
          </div>
          <span className="text-xl font-extrabold tracking-tight">NQTaxi</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clearSession}
            className="text-xs font-bold text-danger hover:text-red-400 transition-colors"
          >
            Clear Session (Test Only)
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-12 text-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              The Premium
              <br />
              <span className="text-primary">Ride-Hailing</span> Experience
            </h1>
            <p className="text-xl text-text-secondary max-w-lg mx-auto leading-relaxed">
              Book safe rides instantly with verified drivers, transparent fares, and secure payments — all in one app.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <Button className="w-full py-4 text-lg" onClick={() => navigate('/onboarding')}>
              Get Started <ArrowRight size={20} />
            </Button>
            <button
              onClick={() => navigate('/login')}
              className="py-3 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors"
            >
              Already have an account? Sign In
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-surface p-6 rounded-2xl border border-white/5">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Instant Booking</h3>
              <p className="text-sm text-text-secondary">
                Book your ride in seconds with intelligent pickup suggestions
              </p>
            </div>

            <div className="bg-surface p-6 rounded-2xl border border-white/5">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Trusted Drivers</h3>
              <p className="text-sm text-text-secondary">
                All drivers verified with ratings, documents & live tracking
              </p>
            </div>

            <div className="bg-surface p-6 rounded-2xl border border-white/5">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-info/10 text-info flex items-center justify-center">
                <Wallet size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
              <p className="text-sm text-text-secondary">
                Multiple payment options with industry-standard security
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

