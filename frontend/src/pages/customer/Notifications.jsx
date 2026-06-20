import { Card } from '../../components/ui';
import { Bell, Gift, ShieldAlert, Star } from 'lucide-react';

const notifications = [
  { id: 1, title: 'Ride Completed', desc: 'How was your trip with Ramesh? Rate now!', icon: Star, color: 'text-primary' },
  { id: 2, title: 'New Promo Code', desc: 'Use code LUXURY to get 30% off on your next ride.', icon: Gift, color: 'text-success' },
  { id: 3, title: 'Security Alert', desc: 'Your account was logged in from a new device.', icon: ShieldAlert, color: 'text-error' },
];

export default function Notifications() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <button className="text-primary text-sm font-bold hover:underline">Mark all as read</button>
      </div>
      <div className="space-y-4">
        {notifications.map((n) => (
          <Card key={n.id} className="flex gap-4 items-start">
            <div className={`p-3 bg-surface-elevated rounded-xl ${n.color}`}>
              <n.icon size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{n.title}</h3>
              <p className="text-text-secondary text-sm mt-1">{n.desc}</p>
            </div>
            <span className="text-[10px] text-text-secondary uppercase font-bold">2h ago</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
