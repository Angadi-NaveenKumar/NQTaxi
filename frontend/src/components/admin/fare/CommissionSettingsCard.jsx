import { HandCoins, Percent, Gift, Users, Power } from 'lucide-react';

const FIELDS = [
  {
    key: 'driverCommission',
    label: 'Driver Commission',
    icon: HandCoins,
    color: 'text-success',
    bg: 'bg-success/15',
    suffix: '%',
    max: 100,
  },
  {
    key: 'platformFee',
    label: 'Platform Fee',
    icon: Percent,
    color: 'text-info',
    bg: 'bg-info/15',
    suffix: '%',
    max: 100,
  },
  {
    key: 'referralBonus',
    label: 'Referral Bonus',
    icon: Gift,
    color: 'text-warning',
    bg: 'bg-warning/15',
    suffix: '%',
    max: 50,
  },
  {
    key: 'partnerCommission',
    label: 'Partner Commission',
    icon: Users,
    color: 'text-primary',
    bg: 'bg-primary/15',
    suffix: '%',
    max: 50,
  },
];

function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="Toggle commission settings"
      onClick={() => onChange(!enabled)}
      className={`relative h-7 w-12 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        enabled ? 'bg-success' : 'bg-white/15'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function CommissionSettingsCard({ commission, onUpdate }) {
  return (
    <section
      className="rounded-2xl border border-white/[0.08] bg-surface shadow-card animate-slide-up"
      style={{ animationDelay: '240ms' }}
      aria-label="Driver commission settings"
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/15 text-success">
            <HandCoins size={20} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">Commission Settings</h2>
            <p className="text-xs text-text-secondary">Revenue split configuration</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Power size={14} className={commission.enabled ? 'text-success' : 'text-text-secondary'} />
          <ToggleSwitch
            enabled={commission.enabled}
            onChange={(val) => onUpdate({ enabled: val })}
          />
        </div>
      </div>

      <div className="space-y-4 p-5">
        {FIELDS.map((field) => {
          const Icon = field.icon;
          const value = commission[field.key];

          return (
            <div key={field.key}>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor={`commission-${field.key}`}
                  className="flex items-center gap-2 text-sm font-medium text-text-primary"
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${field.bg}`}>
                    <Icon size={14} className={field.color} aria-hidden="true" />
                  </span>
                  {field.label}
                </label>
                <span className={`text-sm font-bold tabular-nums ${field.color}`}>
                  {value}{field.suffix}
                </span>
              </div>
              <input
                id={`commission-${field.key}`}
                type="range"
                min="0"
                max={field.max}
                step="1"
                value={value}
                disabled={!commission.enabled}
                onChange={(e) => onUpdate({ [field.key]: parseInt(e.target.value, 10) })}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary disabled:opacity-40"
                aria-valuemin={0}
                aria-valuemax={field.max}
                aria-valuenow={value}
              />
            </div>
          );
        })}

        {/* Split visualization */}
        <div className="mt-2 rounded-xl border border-white/[0.08] bg-bg-tertiary p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Revenue Split Preview
          </p>
          <div className="flex h-3 overflow-hidden rounded-full">
            <div
              className="bg-success transition-all duration-300"
              style={{ width: `${commission.driverCommission}%` }}
              title={`Driver: ${commission.driverCommission}%`}
            />
            <div
              className="bg-info transition-all duration-300"
              style={{ width: `${commission.platformFee}%` }}
              title={`Platform: ${commission.platformFee}%`}
            />
          </div>
          <div className="mt-2 flex justify-between text-[0.65rem] text-text-secondary">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-success" /> Driver {commission.driverCommission}%
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-info" /> Platform {commission.platformFee}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
