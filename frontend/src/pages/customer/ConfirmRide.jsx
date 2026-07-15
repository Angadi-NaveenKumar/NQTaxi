import { FaCarSide, FaTaxi } from 'react-icons/fa';
import { PageHeader } from '../../components/customer/Header';
import RouteSummary from '../../components/customer/RouteSummary';
import MapView from '../../components/customer/MapView';

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
  insurance,
  insurancePlan,
  onSelectInsurance,
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

        {/* Ride Details Card */}
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

        {/* Trip Insurance Selection Card */}
        <div 
          onClick={onSelectInsurance}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-card hover:border-primary/50 transition-all duration-300 cursor-pointer"
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                🛡️
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  Trip Insurance
                  {insurance && (
                    <span className="inline-flex items-center rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success border border-success/30">
                      Active
                    </span>
                  )}
                </h3>
                <p className="text-xs text-muted truncate">
                  {insurance 
                    ? `Covered under ${insurancePlan === 'monthly' ? '1 Month' : '1 Year'} Plan (ACKO Insurance)`
                    : "Protect yourself against accidents and medical expenses from ₹99"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
              <span>{insurance ? "Change" : "Add Plan"}</span>
              <span className="text-base">&rarr;</span>
            </div>
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
