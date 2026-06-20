import { HomeHeader } from '../../components/customer/Header';
import LocationSearch from '../../components/customer/LocationSearch';
import QuickActions from '../../components/customer/QuickActions';
import PromoBanner from '../../components/customer/PromoBanner';
import BookAgain from '../../components/customer/BookAgain';
import BottomNavigation from '../../components/customer/BottomNavigation';
import { SAVED_PLACES, RECENT_TRIPS } from '../../data/locations';

export default function Home({
  pickup,
  destination,
  onPickupChange,
  onDestinationChange,
  onNavigateToRideOptions,
}) {
  const handleQuickAction = (id) => {
    if (id === 'home') {
      const dest = SAVED_PLACES.home.address;
      onDestinationChange(dest);
      if (pickup && pickup.trim()) {
        onNavigateToRideOptions(pickup, dest);
      }
    } else if (id === 'work') {
      const dest = SAVED_PLACES.work.address;
      onDestinationChange(dest);
      if (pickup && pickup.trim()) {
        onNavigateToRideOptions(pickup, dest);
      }
    }
  };

  const handleBothSelected = (pickupVal, destinationVal) => {
    if (pickupVal && destinationVal) {
      onNavigateToRideOptions(pickupVal, destinationVal);
    }
  };

  const handleBookAgain = (trip) => {
    onPickupChange(trip.pickup);
    onDestinationChange(trip.destination);
    onNavigateToRideOptions(trip.pickup, trip.destination);
  };

  const locationsReady = pickup && pickup.trim() && destination && destination.trim();

  return (
    <div className="pb-24">
      <HomeHeader />
      <main className="space-y-4 px-4">
        <LocationSearch
          pickup={pickup || ''}
          destination={destination || ''}
          onPickupChange={onPickupChange}
          onDestinationChange={onDestinationChange}
          onBothSelected={handleBothSelected}
        />

        <QuickActions onSelect={handleQuickAction} />
        <PromoBanner />
        <BookAgain onSelectTrip={handleBookAgain} recentTrips={RECENT_TRIPS} />

        {locationsReady && (
          <button
            type="button"
            onClick={() => onNavigateToRideOptions(pickup, destination)}
            className="w-full rounded-2xl bg-primary py-4 text-base font-bold text-primary-fg shadow-card-lg transition hover:bg-primary-hover active:scale-[0.98]"
          >
            Find Rides
          </button>
        )}
      </main>
      <BottomNavigation active="home" />
    </div>
  );
}