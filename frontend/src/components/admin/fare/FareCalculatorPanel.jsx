import { useMemo } from 'react';
import { Calculator, Zap, Receipt, Building2, User, IndianRupee } from 'lucide-react';
import { calculateFare, formatCurrency } from '../../../data/fareSettings';

function BreakdownRow({ label, value, highlight, icon: Icon }) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${
        highlight ? 'bg-primary/10 border border-primary/20' : 'bg-white/[0.03]'
      }`}
    >
      <span className="flex items-center gap-2 text-sm text-text-secondary">
        {Icon && <Icon size={14} className={highlight ? 'text-primary' : 'text-text-secondary'} />}
        {label}
      </span>
      <span
        className={`text-sm font-semibold tabular-nums ${
          highlight ? 'text-primary' : 'text-text-primary'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function FareCalculatorPanel({
  fareTypes,
  commission,
  selectedRideType,
  onRideTypeChange,
  distance,
  onDistanceChange,
  duration,
  onDurationChange,
  surgeMultiplier,
  onSurgeChange,
}) {
  const fareType = useMemo(
    () => fareTypes.find((f) => f.rideType === selectedRideType) || fareTypes[0],
    [fareTypes, selectedRideType]
  );

  const result = useMemo(() => {
    if (!fareType) return null;
    return calculateFare(
      fareType,
      parseFloat(distance) || 0,
      parseFloat(duration) || 0,
      parseFloat(surgeMultiplier) || 1,
      commission
    );
  }, [fareType, distance, duration, surgeMultiplier, commission]);

  return (
    <aside
      className="rounded-2xl border border-white/[0.08] bg-surface shadow-card animate-slide-up lg:sticky lg:top-36 lg:self-start"
      style={{ animationDelay: '160ms' }}
      aria-label="Fare calculator preview"
    >
      <div className="border-b border-white/[0.08] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Calculator size={20} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">Fare Calculator</h2>
            <p className="text-xs text-text-secondary">Live fare preview</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <label htmlFor="calc-ride-type" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Ride Type
          </label>
          <select
            id="calc-ride-type"
            value={selectedRideType}
            onChange={(e) => onRideTypeChange(e.target.value)}
            className="w-full rounded-xl border border-white/[0.1] bg-bg-tertiary px-3 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
          >
            {fareTypes.map((f) => (
              <option key={f.id} value={f.rideType}>
                {f.rideType}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="calc-distance" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Distance (km)
            </label>
            <input
              id="calc-distance"
              type="number"
              min="0"
              step="0.1"
              value={distance}
              onChange={(e) => onDistanceChange(e.target.value)}
              className="w-full rounded-xl border border-white/[0.1] bg-bg-tertiary px-3 py-2.5 text-sm tabular-nums text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
          <div>
            <label htmlFor="calc-duration" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Duration (min)
            </label>
            <input
              id="calc-duration"
              type="number"
              min="0"
              step="1"
              value={duration}
              onChange={(e) => onDurationChange(e.target.value)}
              className="w-full rounded-xl border border-white/[0.1] bg-bg-tertiary px-3 py-2.5 text-sm tabular-nums text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="calc-surge" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Surge Multiplier
            </label>
            <span className="rounded-md bg-warning/15 px-2 py-0.5 text-xs font-bold text-warning">
              {parseFloat(surgeMultiplier || 1).toFixed(1)}×
            </span>
          </div>
          <input
            id="calc-surge"
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={surgeMultiplier}
            onChange={(e) => onSurgeChange(e.target.value)}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={parseFloat(surgeMultiplier)}
          />
          <div className="mt-1 flex justify-between text-[0.65rem] text-text-secondary">
            <span>1.0×</span>
            <span>3.0×</span>
          </div>
        </div>

        {result && (
          <div className="space-y-2 border-t border-white/[0.08] pt-4">
            <BreakdownRow label="Estimated Fare" value={formatCurrency(result.estimatedFare)} icon={IndianRupee} />
            {result.surgeAmount > 0 && (
              <BreakdownRow label="Surge Amount" value={`+${formatCurrency(result.surgeAmount)}`} icon={Zap} />
            )}
            <BreakdownRow label="Tax (GST 5%)" value={formatCurrency(result.tax)} icon={Receipt} />
            <BreakdownRow label="Platform Fee" value={formatCurrency(result.platformFee)} icon={Building2} />
            <BreakdownRow label="Driver Earnings" value={formatCurrency(result.driverEarnings)} icon={User} />
            <BreakdownRow
              label="Total Amount"
              value={formatCurrency(result.totalAmount)}
              highlight
              icon={Calculator}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
