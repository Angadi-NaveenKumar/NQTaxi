import { useState } from 'react';
import { PageHeader } from '../components/Header';
import RouteSummary from '../components/RouteSummary';
import RideCard from '../components/RideCard';
import PaymentRow from '../components/PaymentRow';
import { RIDE_TYPES } from '../data/rides';

export default function RideOptions({
  pickup,
  destination,
  onBack,
  onConfirm,
  paymentMethod,
  onPaymentChange,
}) {
  const [selectedRideId, setSelectedRideId] = useState('auto');
  const selected = RIDE_TYPES.find((r) => r.id === selectedRideId);

  return (
    <div className="flex min-h-screen flex-col pb-6">
      <PageHeader title="Ride Options" onBack={onBack} />
      <main className="flex flex-1 flex-col space-y-4 px-4">
        <RouteSummary pickup={pickup} destination={destination} />

        <div className="space-y-2.5">
          <h2 className="text-sm font-bold text-foreground">Choose a ride</h2>
          {RIDE_TYPES.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              selected={selectedRideId === ride.id}
              onSelect={setSelectedRideId}
            />
          ))}
        </div>

        <div className="mt-auto space-y-3 pt-4">
          <PaymentRow value={paymentMethod} onChange={onPaymentChange} />
          <button
            type="button"
            onClick={() => onConfirm(selected)}
            className="w-full rounded-2xl bg-primary py-4 text-base font-bold text-primary-fg shadow-card-lg transition hover:bg-primary/90 active:scale-[0.98]"
          >
            Confirm {selected?.name}
          </button>
        </div>
      </main>
    </div>
  );
}
