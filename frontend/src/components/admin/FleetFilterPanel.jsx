import { useState } from 'react';

const STATUS_OPTIONS = ['Active', 'In Service', 'Need Repair'];
const TYPE_OPTIONS = ['Truck', 'Van', 'SUV', 'Car'];
const GROUP_OPTIONS = ['Delivery', 'Logistics', 'Management', 'Field Ops'];
const ACCORDION_SECTIONS = ['Make / Brand', 'Model', 'Year', 'License Plate', 'VIN'];

function ToggleGroup({ options, selected, onChange }) {
  const toggle = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`cursor-pointer rounded-full border px-3 py-1.5 font-sans text-xs font-medium transition-colors ${
            selected.includes(opt)
              ? 'border-primary/35 bg-primary/15 text-primary'
              : 'border-white/[0.08] bg-bg-tertiary text-text-secondary hover:border-white/[0.12]'
          }`}
          onClick={() => toggle(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function FleetFilterPanel({
  open,
  onClose,
  filters,
  onFiltersChange,
  onSave,
  onClear,
}) {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (name) => {
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  if (!open) return null;

  return (
    <aside
      className="flex w-full shrink-0 flex-col border-b border-white/[0.08] bg-bg-secondary max-[899px]:fixed max-[899px]:inset-y-0 max-[899px]:left-[4.5rem] max-[899px]:z-30 max-[899px]:w-[280px] max-[899px]:border-b-0 max-[899px]:border-r max-[899px]:shadow-[4px_0_24px_rgba(0,0,0,0.45)] min-[900px]:w-[280px] min-[900px]:min-h-full min-[900px]:border-b-0 min-[900px]:border-r"
      aria-label="Filters"
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 pb-3 pt-5">
        <h2 className="m-0 text-base font-bold text-text-primary">Filter</h2>
        <button
          type="button"
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-xl leading-none text-text-secondary hover:bg-white/[0.04]"
          onClick={onClose}
          aria-label="Close filters"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-3">
        <section className="mb-5">
          <h3 className="mb-2.5 text-[0.8125rem] font-semibold text-text-primary">Status</h3>
          <ToggleGroup
            options={STATUS_OPTIONS}
            selected={filters.status}
            onChange={(status) => onFiltersChange({ ...filters, status })}
          />
        </section>

        <section className="mb-5">
          <h3 className="mb-2.5 text-[0.8125rem] font-semibold text-text-primary">Type</h3>
          <ToggleGroup
            options={TYPE_OPTIONS}
            selected={filters.type}
            onChange={(type) => onFiltersChange({ ...filters, type })}
          />
        </section>

        <section className="mb-5">
          <h3 className="mb-2.5 text-[0.8125rem] font-semibold text-text-primary">Group</h3>
          <ToggleGroup
            options={GROUP_OPTIONS}
            selected={filters.group}
            onChange={(group) => onFiltersChange({ ...filters, group })}
          />
        </section>

        <section className="mb-5">
          <h3 className="mb-2.5 text-[0.8125rem] font-semibold text-text-primary">Operator</h3>
          <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-bg-tertiary px-3 py-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-text-secondary"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" />
            </svg>
            <input
              type="search"
              placeholder="Search operator"
              value={filters.operator}
              onChange={(e) => onFiltersChange({ ...filters, operator: e.target.value })}
              className="min-w-0 flex-1 border-none bg-transparent font-sans text-[0.8125rem] text-text-primary outline-none placeholder:text-text-secondary"
            />
          </div>
        </section>

        {ACCORDION_SECTIONS.map((label) => (
          <section key={label} className="border-b border-white/[0.08]">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent py-3.5 text-left font-sans text-[0.8125rem] font-medium text-text-secondary"
              onClick={() => toggleSection(label)}
              aria-expanded={Boolean(openSections[label])}
            >
              {label}
              <span className="text-text-secondary">{openSections[label] ? '▴' : '▾'}</span>
            </button>
            {openSections[label] && (
              <input
                type="text"
                className="mb-3 w-full rounded-lg border border-white/[0.08] bg-bg-tertiary px-3 py-2 font-sans text-[0.8125rem] text-text-primary outline-none"
                placeholder={`Filter by ${label}`}
              />
            )}
          </section>
        ))}
      </div>

      <div className="flex gap-2.5 border-t border-white/[0.08] px-5 pb-5 pt-4">
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-lg border-none bg-primary px-4 py-2.5 font-sans text-sm font-semibold text-on-primary hover:bg-primary-hover"
          onClick={onSave}
        >
          Save
        </button>
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-lg border border-white/[0.08] bg-bg-tertiary px-4 py-2.5 font-sans text-sm font-semibold text-text-primary hover:bg-white/[0.04]"
          onClick={onClear}
        >
          Clear All
        </button>
      </div>
    </aside>
  );
}
