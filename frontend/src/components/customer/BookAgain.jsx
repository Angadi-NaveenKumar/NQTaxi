import { RECENT_TRIPS } from '../data/locations';

export default function BookAgain({ onSelectTrip }) {
  return (
    <div className="space-y-2">
      <h2 className="text-base font-bold text-foreground">Book Again</h2>
      <div className="space-y-2.5">
        {RECENT_TRIPS.map((trip) => (
          <button
            key={trip.id}
            type="button"
            onClick={() => onSelectTrip(trip)}
            className="flex w-full items-start gap-3 rounded-2xl bg-card p-4 text-left shadow-card transition active:scale-[0.99]"
          >
            <div className="flex flex-col items-center pt-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="my-1 h-8 w-0.5 bg-muted/30" />
              <span className="h-2 w-2 rounded-full bg-red-500" />
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <p className="truncate text-sm font-semibold text-foreground">{trip.pickup}</p>
              <p className="truncate text-sm font-semibold text-foreground">{trip.destination}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
