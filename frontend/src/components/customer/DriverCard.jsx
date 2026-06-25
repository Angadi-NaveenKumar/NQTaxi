import { FaPhoneAlt, FaStar } from 'react-icons/fa';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { DRIVER } from '../../data/drivers';

export default function DriverCard({ driver, onCall, onMessage, compact = false }) {
  const activeDriver = driver || DRIVER;
  const initials = activeDriver.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="rounded-2xl bg-card p-4 shadow-card-lg">
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-input text-lg font-bold text-foreground">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-foreground">{activeDriver.name}</h3>
          <div className="mt-0.5 flex items-center gap-1 text-sm font-semibold text-primary">
            <FaStar className="text-xs" />
            <span>{activeDriver.rating}</span>
          </div>
          {!compact && (
            <>
              <p className="mt-1 text-xs font-medium text-muted">{activeDriver.vehicle}</p>
              <p className="text-xs text-muted">{activeDriver.model || ''}</p>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCall}
            aria-label="Call driver"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-input text-foreground transition hover:bg-primary/20"
          >
            <FaPhoneAlt className="text-sm" />
          </button>
          <button
            type="button"
            onClick={onMessage}
            aria-label="Message driver"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-input text-foreground transition hover:bg-primary/20"
          >
            <HiOutlineChatAlt2 className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
