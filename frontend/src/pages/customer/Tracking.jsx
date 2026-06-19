import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Flag, Phone, MessageCircle, Star, Shield, User } from 'lucide-react';
import { Button, Card } from '../../components/ui';
import { useAppStore } from '../../store/useAppStore';

export default function Tracking() {
  const navigate = useNavigate();
  const { selectedPickup, selectedDrop } = useAppStore();

  return (
    <div className="h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-surface-secondary opacity-50">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, #242424 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        {/* Mock Route Line */}
        <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-primary/30 rounded-full">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-primary rounded-full shadow-[0_0_15px_rgba(245,197,24,0.5)]" />
        </div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 p-2 bg-primary rounded-full shadow-xl">
           <MapPin size={24} className="text-primary-foreground" />
        </div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 p-2 bg-surface-elevated border-2 border-primary rounded-full shadow-xl">
           <Flag size={24} className="text-primary" />
        </div>
      </div>

      {/* Top Header */}
      <div className="relative z-10 p-4 md:p-6 flex items-center justify-between bg-gradient-to-b from-background to-transparent">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-surface-secondary/80 backdrop-blur-md border border-white/5 rounded-2xl hover:bg-surface-secondary transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="bg-surface-secondary/80 backdrop-blur-md border border-white/5 px-6 py-2 rounded-2xl flex items-center gap-2">
          <Shield size={16} className="text-success" />
          <span className="text-xs font-bold uppercase tracking-widest">Secure Trip</span>
        </div>
      </div>

      {/* Bottom Sheet Info */}
      <div className="mt-auto relative z-10 p-4 md:p-6 animate-in slide-in-from-bottom duration-700">
        <div className="max-w-2xl mx-auto space-y-4">
          <Card className="shadow-2xl shadow-black/50 border-primary/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-white/5 flex items-center justify-center text-primary">
                  <User size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ramesh Kumar</h3>
                  <div className="flex items-center gap-1 text-primary">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold">4.9</span>
                    <span className="text-text-secondary font-normal text-xs ml-1">(1,240 rides)</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Arriving in</p>
                <p className="text-3xl font-extrabold text-primary">4 MIN</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-surface-elevated rounded-xl border border-white/5">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">Vehicle</p>
                <p className="font-bold">Toyota Innova</p>
                <p className="text-xs text-primary font-mono mt-1">KA 01 AB 1234</p>
              </div>
              <div className="p-4 bg-surface-elevated rounded-xl border border-white/5">
                <p className="text-[10px] text-text-secondary font-bold uppercase mb-1">OTP</p>
                <p className="text-2xl font-black tracking-[4px]">4592</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 py-4 bg-surface-elevated text-text-primary hover:bg-surface-elevated/80">
                <MessageCircle size={20} />
                Message
              </Button>
              <Button className="flex-1 py-4">
                <Phone size={20} />
                Call Driver
              </Button>
            </div>
          </Card>

          <Card className="bg-surface-secondary/80 backdrop-blur-md p-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex-1">
                <p className="text-text-secondary text-[10px] font-bold uppercase">Pickup</p>
                <p className="font-medium truncate">{selectedPickup}</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex-1">
                <p className="text-text-secondary text-[10px] font-bold uppercase">Destination</p>
                <p className="font-medium truncate">{selectedDrop}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

