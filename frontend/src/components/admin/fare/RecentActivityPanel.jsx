import {
  History,
  IndianRupee,
  Percent,
  Zap,
  Moon,
  ToggleLeft,
  Clock,
} from 'lucide-react';
import { formatRelativeTime } from '../../../data/fareSettings';

const TYPE_CONFIG = {
  fare: { icon: IndianRupee, color: 'text-primary', bg: 'bg-primary/15', ring: 'ring-primary/30' },
  commission: { icon: Percent, color: 'text-success', bg: 'bg-success/15', ring: 'ring-success/30' },
  surge: { icon: Zap, color: 'text-warning', bg: 'bg-warning/15', ring: 'ring-warning/30' },
  pricing: { icon: Moon, color: 'text-info', bg: 'bg-info/15', ring: 'ring-info/30' },
  status: { icon: ToggleLeft, color: 'text-text-secondary', bg: 'bg-white/10', ring: 'ring-white/20' },
};

export default function RecentActivityPanel({ activities }) {
  return (
    <section
      className="rounded-2xl border border-white/[0.08] bg-surface shadow-card animate-slide-up"
      style={{ animationDelay: '280ms' }}
      aria-label="Recent fare settings activity"
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-text-secondary">
            <History size={20} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">Recent Activity</h2>
            <p className="text-xs text-text-secondary">Latest pricing changes</p>
          </div>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-primary hover:text-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          View all
        </button>
      </div>

      <ol className="relative px-5 py-4" aria-label="Activity timeline">
        {activities.map((item, index) => {
          const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.fare;
          const Icon = cfg.icon;
          const isLast = index === activities.length - 1;

          return (
            <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className="absolute left-[17px] top-9 h-[calc(100%-12px)] w-px bg-white/[0.08]"
                  aria-hidden="true"
                />
              )}
              <div
                className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-2 ${cfg.bg} ${cfg.color} ${cfg.ring}`}
              >
                <Icon size={14} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-semibold text-text-primary">{item.action}</p>
                  <time
                    dateTime={item.timestamp}
                    className="flex shrink-0 items-center gap-1 text-[0.65rem] text-text-secondary"
                  >
                    <Clock size={10} aria-hidden="true" />
                    {formatRelativeTime(item.timestamp)}
                  </time>
                </div>
                <p className="mt-0.5 text-sm text-text-secondary">{item.detail}</p>
                <p className="mt-1 text-xs text-text-secondary/70">
                  by <span className="font-medium text-text-secondary">{item.user}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
