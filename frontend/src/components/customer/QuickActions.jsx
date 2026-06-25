import {
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlinePlus,
  HiOutlineDotsHorizontal,
} from 'react-icons/hi';
import { SAVED_PLACES } from '../../data/locations';

const ACTIONS = [
  { id: 'home', label: 'Home', icon: HiOutlineHome, subtitle: SAVED_PLACES.home.address },
  { id: 'work', label: 'Work', icon: HiOutlineBriefcase, subtitle: SAVED_PLACES.work.address },
  { id: 'add', label: 'Add', icon: HiOutlinePlus, subtitle: null },
  { id: 'more', label: 'More', icon: HiOutlineDotsHorizontal, subtitle: null },
];

export default function QuickActions({ onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {ACTIONS.map(({ id, label, icon: Icon, subtitle }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect?.(id)}
          className="flex flex-col items-center gap-1.5 rounded-2xl bg-card p-3 shadow-card transition active:scale-95"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-input">
            <Icon className="text-xl text-foreground" />
          </div>
          <span className="text-[11px] font-semibold text-foreground">{label}</span>
          {subtitle && (
            <span className="max-w-full truncate text-[9px] text-muted">{subtitle}</span>
          )}
        </button>
      ))}
    </div>
  );
}
