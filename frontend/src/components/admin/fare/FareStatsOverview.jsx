import {
  Car,
  TrendingUp,
  TrendingDown,
  Percent,
  Clock,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { formatRelativeTime } from '../../../data/fareSettings';

const STAT_CONFIG = [
  {
    key: 'totalRideTypes',
    label: 'Total Ride Types',
    icon: Car,
    trend: '+2',
    trendUp: true,
    color: 'from-primary/20 to-primary/5',
    iconBg: 'bg-primary/15 text-primary',
  },
  {
    key: 'activeRules',
    label: 'Active Pricing Rules',
    icon: ShieldCheck,
    trend: '+1',
    trendUp: true,
    color: 'from-success/20 to-success/5',
    iconBg: 'bg-success/15 text-success',
  },
  {
    key: 'avgCommission',
    label: 'Average Commission',
    icon: Percent,
    trend: '-0.5%',
    trendUp: false,
    suffix: '%',
    color: 'from-info/20 to-info/5',
    iconBg: 'bg-info/15 text-info',
  },
  {
    key: 'lastUpdated',
    label: 'Last Updated',
    icon: Clock,
    trend: 'Live',
    trendUp: true,
    isDate: true,
    color: 'from-warning/20 to-warning/5',
    iconBg: 'bg-warning/15 text-warning',
  },
];

function StatSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/[0.08] bg-surface p-5">
      <div className="mb-4 h-10 w-10 rounded-xl bg-white/10" />
      <div className="mb-2 h-3 w-24 rounded bg-white/10" />
      <div className="h-7 w-16 rounded bg-white/10" />
    </div>
  );
}

export default function FareStatsOverview({ stats, loading = false }) {
  if (loading) {
    return (
      <section
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Fare statistics loading"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </section>
    );
  }

  return (
    <section
      className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-label="Fare statistics overview"
    >
      {STAT_CONFIG.map((cfg, index) => {
        const Icon = cfg.icon;
        const raw = stats[cfg.key];
        const value = cfg.isDate
          ? formatRelativeTime(raw)
          : cfg.suffix
            ? `${raw}${cfg.suffix}`
            : raw;

        return (
          <article
            key={cfg.key}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/80 p-5 shadow-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-card-lg animate-slide-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 ${cfg.color}`}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="mb-4 flex items-start justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${cfg.iconBg}`}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${
                    cfg.trendUp
                      ? 'bg-success/15 text-success'
                      : 'bg-danger/15 text-danger'
                  }`}
                >
                  {cfg.trendUp ? (
                    <TrendingUp size={10} aria-hidden="true" />
                  ) : (
                    <TrendingDown size={10} aria-hidden="true" />
                  )}
                  {cfg.trend}
                </span>
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                {cfg.label}
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-text-primary">{value}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export function FareStatsCompact({ stats }) {
  return (
    <div className="flex flex-wrap gap-3">
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-elevated px-3 py-1.5 text-xs text-text-secondary">
        <Layers size={12} className="text-primary" />
        {stats.totalRideTypes} ride types
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-elevated px-3 py-1.5 text-xs text-text-secondary">
        <ShieldCheck size={12} className="text-success" />
        {stats.activeRules} active rules
      </span>
    </div>
  );
}
