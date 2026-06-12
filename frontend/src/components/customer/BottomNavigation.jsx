import {
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineCreditCard,
  HiOutlineUser,
} from 'react-icons/hi';

const TABS = [
  { id: 'home', label: 'Home', icon: HiOutlineHome },
  { id: 'bookings', label: 'Bookings', icon: HiOutlineClipboardList },
  { id: 'wallet', label: 'Wallet', icon: HiOutlineCreditCard },
  { id: 'profile', label: 'Profile', icon: HiOutlineUser },
];

export default function BottomNavigation({ active = 'home' }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-input bg-card px-2 pb-safe pt-2">
      <div className="grid grid-cols-4 gap-1">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              className="flex flex-col items-center gap-1 py-2"
            >
              <Icon className={`text-xl ${isActive ? 'text-primary' : 'text-muted'}`} />
              <span className={`text-[10px] font-semibold ${isActive ? 'text-primary' : 'text-muted'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
