import {
  Clock,
  Moon,
  Calendar,
  Gift,
  CloudRain,
  TrafficCone,
  Ticket,
  AlertTriangle,
  SlidersHorizontal,
} from 'lucide-react';

const RULE_ICONS = {
  clock: Clock,
  moon: Moon,
  calendar: Calendar,
  gift: Gift,
  'cloud-rain': CloudRain,
  traffic: TrafficCone,
  ticket: Ticket,
  alert: AlertTriangle,
};

function ToggleSwitch({ enabled, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        enabled ? 'bg-primary' : 'bg-white/15'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function DynamicPricingRules({ rules, onUpdate }) {
  return (
    <section
      className="rounded-2xl border border-white/[0.08] bg-surface shadow-card animate-slide-up"
      style={{ animationDelay: '200ms' }}
      aria-label="Dynamic pricing rules"
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-info/15 text-info">
            <SlidersHorizontal size={20} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">Dynamic Pricing Rules</h2>
            <p className="text-xs text-text-secondary">Configure surge & time-based pricing</p>
          </div>
        </div>
        <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
          {rules.filter((r) => r.enabled).length} active
        </span>
      </div>

      <div className="divide-y divide-white/[0.06]">
        {rules.map((rule) => {
          const Icon = RULE_ICONS[rule.icon] || Clock;

          return (
            <div
              key={rule.id}
              className={`p-5 transition-colors ${rule.enabled ? 'bg-white/[0.01]' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      rule.enabled ? 'bg-primary/15 text-primary' : 'bg-white/10 text-text-secondary'
                    }`}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{rule.label}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{rule.description}</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={rule.enabled}
                  onChange={(val) => onUpdate(rule.id, { enabled: val })}
                  label={`Toggle ${rule.label}`}
                />
              </div>

              {rule.enabled && (
                <div className="mt-4 pl-12">
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor={`multiplier-${rule.id}`}
                      className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                    >
                      Multiplier
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={`multiplier-${rule.id}`}
                        type="number"
                        min="1"
                        max="5"
                        step="0.05"
                        value={rule.multiplier}
                        onChange={(e) =>
                          onUpdate(rule.id, { multiplier: parseFloat(e.target.value) || 1 })
                        }
                        className="w-16 rounded-lg border border-white/[0.1] bg-bg-tertiary px-2 py-1 text-center text-xs font-bold tabular-nums text-primary focus:border-primary focus:outline-none"
                        aria-label={`${rule.label} multiplier value`}
                      />
                      <span className="text-xs font-semibold text-text-secondary">×</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.05"
                    value={rule.multiplier}
                    onChange={(e) =>
                      onUpdate(rule.id, { multiplier: parseFloat(e.target.value) })
                    }
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
                    aria-label={`${rule.label} multiplier slider`}
                  />
                  <div className="mt-1 flex justify-between text-[0.6rem] text-text-secondary">
                    <span>1.0×</span>
                    <span className="text-warning font-semibold">
                      +{Math.round((rule.multiplier - 1) * 100)}% surge
                    </span>
                    <span>3.0×</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
