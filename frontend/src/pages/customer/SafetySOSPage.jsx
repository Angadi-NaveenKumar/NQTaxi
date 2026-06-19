import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Phone, MapPin, Share2, MessageSquare, AlertTriangle, ChevronLeft, ShieldCheck, User } from 'lucide-react';
import { Button, Card } from '@components/common/ui';

export default function SafetySOSPage() {
  const navigate = useNavigate();

  const emergencyContacts = [
    { name: 'John Doe (Brother)', phone: '+91 98765 43210', type: 'Primary' },
    { name: 'Jane Smith (Spouse)', phone: '+91 98765 43211', type: 'Secondary' },
  ];

  const emergencyServices = [
    { name: 'Police Assistance', phone: '100', icon: ShieldCheck },
    { name: 'Ambulance / Medical', phone: '102', icon: ShieldAlert },
    { name: 'Fire Department', phone: '101', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="p-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-xl z-50 border-b border-white/5">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-surface-secondary rounded-2xl hover:bg-surface-elevated transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-black uppercase tracking-[4px] text-error">Safety Center</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] font-bold text-success uppercase">Live Tracking Active</span>
          </div>
        </div>
        <div className="w-12" />
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
        <div className="text-center space-y-6 py-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-error/20 rounded-full animate-ping scale-150" />
            <div className="absolute inset-0 bg-error/10 rounded-full animate-pulse scale-125" />
            <button className="relative w-48 h-48 bg-error rounded-full flex flex-col items-center justify-center border-8 border-background shadow-xl hover:scale-95 transition-transform active:scale-90">
              <ShieldAlert size={64} className="text-white mb-2" />
              <span className="text-3xl font-black text-white">SOS</span>
            </button>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Emergency Assistance</h2>
            <p className="text-text-secondary max-w-xs mx-auto text-sm">
              Press and hold for 3 seconds to alert emergency services and contacts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="secondary" className="flex-col h-28 gap-3 border-error/10 hover:border-error/30">
            <div className="p-2 bg-error/10 text-error rounded-lg"><Phone size={20} /></div>
            <span className="text-xs font-bold">Call Police</span>
          </Button>
          <Button variant="secondary" className="flex-col h-28 gap-3 border-primary/10 hover:border-primary/30">
            <div className="p-2 bg-primary/10 text-primary rounded-lg"><Share2 size={20} /></div>
            <span className="text-xs font-bold">Share Location</span>
          </Button>
          <Button variant="secondary" className="flex-col h-28 gap-3 border-info/10 hover:border-info/30">
            <div className="p-2 bg-info/10 text-info rounded-lg"><MessageSquare size={20} /></div>
            <span className="text-xs font-bold">Text Help</span>
          </Button>
          <Button variant="secondary" className="flex-col h-28 gap-3 border-success/10 hover:border-success/30">
            <div className="p-2 bg-success/10 text-success rounded-lg"><ShieldCheck size={20} /></div>
            <span className="text-xs font-bold">I am Safe</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <User size={20} className="text-primary" />
                Trusted Contacts
              </h3>
              <button className="text-primary text-xs font-bold hover:underline">Manage</button>
            </div>
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <Card key={contact.name} className="flex items-center justify-between p-4 hover:bg-surface-elevated transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center text-text-secondary hover:text-primary transition-colors">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{contact.name}</p>
                      <p className="text-xs text-text-secondary">{contact.phone}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded uppercase">
                    {contact.type}
                  </span>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <MapPin size={20} className="text-primary" />
              Local Services
            </h3>
            <div className="space-y-3">
              {emergencyServices.map((service) => (
                <Card key={service.name} className="flex items-center justify-between p-4 hover:bg-surface-elevated transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
                      <service.icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{service.name}</p>
                      <p className="text-xs font-mono text-error font-bold">{service.phone}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="py-2 px-4 text-xs border-error/20 text-error hover:bg-error/10">Call</Button>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Card className="bg-surface-secondary/50 border-dashed border-white/10 p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-bold">Current Location Sharing</p>
            <p className="text-xs text-text-secondary">Your real-time coordinates are being sent to NQTaxi security team and trusted contacts.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:text-right">
              <p className="text-xs font-bold text-success uppercase">Active</p>
              <p className="text-[10px] text-text-secondary font-mono">12.9716° N, 77.5946° E</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center text-primary border border-white/5">
              <MapPin size={24} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
