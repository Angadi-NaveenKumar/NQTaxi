import { FaCarSide, FaTaxi } from 'react-icons/fa';
import { PageHeader } from '../components/Header';
import RouteSummary from '../components/RouteSummary';
import MapView from '../components/MapView';

const ICON_MAP = {
  mini: FaCarSide,
  auto: FaTaxi,
  sedan: FaCarSide,
  suv: FaCarSide,
};

export default function ConfirmRide({
  pickup,
  destination,
  ride,
  paymentMethod,
  onBack,
  onConfirmBooking,
}) {
  const Icon = ICON_MAP[ride?.icon] || FaCarSide;

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader title="Confirm Ride" onBack={onBack} />
      <main className="flex flex-1 flex-col space-y-4 px-4 pb-6">
        <RouteSummary pickup={pickup} destination={destination} showFavorite={false} />
        <MapView variant="confirm" showRoute />

        <div className="rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-input">
              <Icon className="text-xl text-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-foreground">{ride?.name}</h3>
              <p className="text-xs text-muted">{paymentMethod}</p>
            </div>
            <p className="text-lg font-extrabold text-primary">₹{ride?.price}</p>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-input pt-3 text-sm">
            <span className="text-muted">{ride?.distance} away</span>
            <span className="font-semibold text-foreground">{ride?.eta}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onConfirmBooking}
          className="w-full rounded-2xl bg-primary py-4 text-base font-bold text-primary-fg shadow-card-lg transition hover:bg-primary/90 active:scale-[0.98]"
        >
          Confirm Booking
        </button>
      </main>
    </div>
  );
}
