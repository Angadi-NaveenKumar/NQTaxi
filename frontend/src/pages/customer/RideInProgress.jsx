import MapView from '../../components/customer/MapView';
import DriverCard from '../../components/customer/DriverCard';
import TripStats from '../../components/customer/TripStats';

export default function RideInProgress({ ride, driverDetails, onCall, onMessage, onEndRide }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <MapView
        variant="full"
        showRoute
        showDriver
        showEmergency
        onEmergency={() => window.alert('Emergency services contacted!')}
      />

      <div className="absolute bottom-0 left-0 right-0 z-10 space-y-3 p-4">
        <div className="rounded-2xl bg-card p-4 shadow-card-lg">
          <DriverCard driver={driverDetails} onCall={onCall} onMessage={onMessage} compact />
          <TripStats
            distance={ride?.distance || '12.5 km'}
            duration={ride?.duration || '24 min'}
            fare={ride?.price}
          />
        </div>

        <button
          type="button"
          onClick={onEndRide}
          className="w-full rounded-2xl bg-primary py-4 text-base font-bold text-primary-fg shadow-card-lg transition hover:bg-primary/90 active:scale-[0.98]"
        >
          End Ride
        </button>
      </div>
    </div>
  );
}
