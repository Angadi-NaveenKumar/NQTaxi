import { HiOutlineHeart } from 'react-icons/hi';

export default function RouteSummary({ pickup, destination, showFavorite = true }) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-card">
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center pt-1">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="my-1 h-10 w-0.5 bg-muted/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-sm font-semibold text-foreground">{pickup}</p>
          <p className="text-sm font-semibold text-foreground">{destination}</p>
        </div>
        {showFavorite && (
          <button
            type="button"
            aria-label="Add to favorites"
            className="shrink-0 text-muted transition hover:text-primary"
          >
            <HiOutlineHeart className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
}
