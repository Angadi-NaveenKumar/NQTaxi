import { HiOutlineCash, HiOutlineCreditCard } from 'react-icons/hi';
import { MdAccountBalanceWallet } from 'react-icons/md';

const METHODS = [
  { id: 'Cash', label: 'Cash', icon: HiOutlineCash },
  { id: 'UPI', label: 'UPI', icon: HiOutlineCreditCard },
  { id: 'Wallet', label: 'Wallet', icon: MdAccountBalanceWallet },
];

export default function PaymentRow({ value = 'Cash', onChange }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-card">
      {METHODS.map(({ id, label, icon: Icon }, index) => (
        <span key={id} className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange?.(id)}
            className={`flex items-center gap-1.5 text-sm font-semibold transition ${
              value === id ? 'text-primary' : 'text-muted'
            }`}
          >
            <Icon className="text-base" />
            {label}
          </button>
          {index < METHODS.length - 1 && (
            <span className="text-muted/40">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
