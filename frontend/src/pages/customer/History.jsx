import { Card } from '../components/ui';
import { Clock, MapPin, ChevronRight } from 'lucide-react';

const rides = [
  { id: 1, date: 'Today, 2:30 PM', from: 'Indiranagar', to: 'Koramangala', fare: '₹240', status: 'Completed' },
  { id: 2, date: 'Yesterday, 9:15 AM', from: 'Whitefield', to: 'MG Road', fare: '₹450', status: 'Completed' },
  { id: 3, date: '2 Jun, 6:45 PM', from: 'HSR Layout', to: 'Airport', fare: '₹890', status: 'Cancelled', isError: true },
];

export default function History() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <h1 className="text-3xl font-bold">Ride History</h1>
      <div className="space-y-4">
        {rides.map((ride) => (
          <Card key={ride.id} className="hover:bg-surface-elevated transition-colors cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface-elevated rounded-xl text-text-secondary group-hover:text-primary transition-colors">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-bold">{ride.date}</p>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin size={12} />
                    <span>{ride.from}</span>
                    <ChevronRight size={12} />
                    <span>{ride.to}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{ride.fare}</p>
                <p className={`text-xs font-bold ${ride.isError ? 'text-error' : 'text-success'}`}>
                  {ride.status}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
