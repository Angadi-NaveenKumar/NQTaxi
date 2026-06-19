import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const FIELDS = [
  { key: 'rideType', label: 'Ride Type', type: 'text' },
  { key: 'baseFare', label: 'Base Fare (₹)', type: 'number', min: 0 },
  { key: 'minFare', label: 'Min Fare (₹)', type: 'number', min: 0 },
  { key: 'perKm', label: 'Per KM (₹)', type: 'number', min: 0, step: 0.5 },
  { key: 'perMinute', label: 'Per Minute (₹)', type: 'number', min: 0, step: 0.5 },
  { key: 'waitingCharge', label: 'Waiting Charge (₹/min)', type: 'number', min: 0, step: 0.5 },
  { key: 'nightCharge', label: 'Night Multiplier', type: 'number', min: 1, max: 3, step: 0.05 },
  { key: 'surge', label: 'Default Surge', type: 'number', min: 1, max: 5, step: 0.1 },
  { key: 'driverCommission', label: 'Driver Commission (%)', type: 'number', min: 0, max: 100 },
  { key: 'platformFee', label: 'Platform Fee (%)', type: 'number', min: 0, max: 100 },
];

export default function FareEditModal({ fare, isNew, onSave, onClose }) {
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {};
    for (const field of FIELDS) {
      const val = form.get(field.key);
      data[field.key] =
        field.type === 'number' ? parseFloat(val) || 0 : val;
    }
    data.status = form.get('status') || 'active';
    onSave(data);
  };

  if (!fare) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fare-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-lg animate-slide-up rounded-2xl border border-white/[0.1] bg-surface shadow-card-lg"
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
          <h2 id="fare-modal-title" className="text-lg font-bold text-text-primary">
            {isNew ? 'Add Fare Type' : `Edit ${fare.rideType}`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-text-secondary hover:bg-white/[0.06] hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FIELDS.map((field, i) => (
              <div key={field.key} className={field.key === 'rideType' ? 'sm:col-span-2' : ''}>
                <label
                  htmlFor={`field-${field.key}`}
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary"
                >
                  {field.label}
                </label>
                <input
                  ref={i === 0 ? firstInputRef : undefined}
                  id={`field-${field.key}`}
                  name={field.key}
                  type={field.type}
                  defaultValue={fare[field.key] ?? ''}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  required={field.key === 'rideType'}
                  className="w-full rounded-xl border border-white/[0.1] bg-bg-tertiary px-3 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
            ))}

            <div className="sm:col-span-2">
              <label
                htmlFor="field-status"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-secondary"
              >
                Status
              </label>
              <select
                id="field-status"
                name="status"
                defaultValue={fare.status || 'active'}
                className="w-full rounded-xl border border-white/[0.1] bg-bg-tertiary px-3 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/[0.12] px-5 py-2.5 text-sm font-semibold text-text-secondary hover:bg-white/[0.06]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-on-primary hover:bg-primary-hover active:scale-[0.98]"
            >
              {isNew ? 'Add Fare Type' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
