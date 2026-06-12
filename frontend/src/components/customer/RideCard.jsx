import { FaCarSide, FaTaxi } from 'react-icons/fa';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';

const ICON_MAP = {
  mini: FaCarSide,
  auto: FaTaxi,
  sedan: FaCarSide,
  suv: FaCarSide,
};

export default function RideCard({ ride, selected, onSelect }) {
  const Icon = ICON_MAP[ride.icon] || FaCarSide;

  return (
    <button
      type="button"
      onClick={() => onSelect(ride.id)}
      className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition-all ${
        selected
          ? 'border-primary bg-input shadow-glow'
          : 'border-transparent bg-card shadow-card'
      }`}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
          selected ? 'bg-primary text-primary-fg' : 'bg-input text-foreground'
        }`}
      >
        <Icon className="text-2xl" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-foreground">{ride.name}</h3>
        <p className="text-xs text-muted">{ride.eta} away</p>
      </div>
      <p className="flex items-center text-base font-extrabold text-primary">
        <HiOutlineCurrencyRupee className="text-sm" />
        {ride.price}
      </p>
    </button>
  );
}
