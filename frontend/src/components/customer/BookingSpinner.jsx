import { useEffect } from 'react';
import { FaTaxi } from 'react-icons/fa';

export default function BookingSpinner({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface/95 px-6 animate-fade-in">
      <div className="relative mb-8">
        <div className="h-24 w-24 animate-spin rounded-full border-4 border-warning/20 border-t-warning" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warning shadow-lg">
            <FaTaxi className="text-2xl text-primary-fg" />
          </div>
        </div>
      </div>

      <h2 className="text-center text-xl font-bold text-foreground sm:text-2xl">
        Searching for nearby drivers...
      </h2>
      <p className="mt-2 max-w-xs text-center text-sm text-muted">
        Finding the best driver near your pickup location
      </p>

      <div className="mt-10 flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-pulse rounded-full bg-warning"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
