import { useAppStore } from '../store/useAppStore';
import { Button, Card } from '../components/ui';
import { User, Settings, Shield, LogOut, ChevronRight, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

export default function Profile() {
  const { role, setAuthenticated } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    navigate('/login');
  };

  const menuItems = [
    { icon: User, label: 'Personal Information', sub: 'Name, Email, Phone' },
    { icon: Shield, label: 'Security', sub: 'Password, 2FA, Biometrics' },
    { icon: Settings, label: 'Preferences', sub: 'Language, Theme, Units' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-surface-secondary border-4 border-primary/20 flex items-center justify-center text-primary relative">
          <User size={48} />
          <div className="absolute bottom-0 right-0 p-1.5 bg-success rounded-full border-2 border-background" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Shaik Abdul</h1>
          <p className="text-text-secondary flex items-center gap-2">
            <span className="capitalize px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-bold">{role}</span>
            • Joined June 2024
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="flex items-center gap-3 p-4">
          <div className="p-2 bg-surface-elevated rounded-lg text-text-secondary"><Mail size={18} /></div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Email Address</p>
            <p className="text-sm font-bold">shaik@example.com</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <div className="p-2 bg-surface-elevated rounded-lg text-text-secondary"><Phone size={18} /></div>
          <div>
            <p className="text-xs text-text-secondary font-medium">Phone Number</p>
            <p className="text-sm font-bold">+91 98765 43210</p>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {menuItems.map((item) => (
          <button key={item.label} className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-secondary border border-white/5 hover:bg-surface-elevated transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-surface-elevated rounded-lg text-text-secondary group-hover:text-primary transition-colors">
                <item.icon size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold">{item.label}</p>
                <p className="text-xs text-text-secondary">{item.sub}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-text-secondary" />
          </button>
        ))}
      </div>

      <Button variant="outline" className="w-full border-error/20 text-error hover:bg-error/10 hover:border-error/50" onClick={handleLogout}>
        <LogOut size={20} />
        Sign Out
      </Button>
    </div>
  );
}
