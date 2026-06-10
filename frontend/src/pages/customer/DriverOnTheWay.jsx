import { FaCheck } from 'react-icons/fa';
import MapView from '../components/MapView';
import DriverCard from '../components/DriverCard';

export default function DriverOnTheWay({ onCall, onMessage, onShare, onCancel }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <MapView variant="full" showRoute showDriver />

      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full bg-success px-4 py-2 shadow-card">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
            <FaCheck className="text-xs text-white" />
          </span>
          <span className="text-sm font-semibold text-white">Your driver is on the way</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 space-y-3 p-4">
        <DriverCard onCall={onCall} onMessage={onMessage} />
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onShare}
            className="rounded-2xl border-2 border-input bg-card py-3.5 text-sm font-bold text-foreground transition hover:bg-input active:scale-[0.98]"
          >
            Share Details
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border-2 border-danger bg-card py-3.5 text-sm font-bold text-danger transition hover:bg-danger/10 active:scale-[0.98]"
          >
            Cancel Ride
          </button>
        </div>
      </div>
    </div>
  );
}
