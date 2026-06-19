import { Plus, RotateCcw, Save, Sparkles } from 'lucide-react';

export default function FarePageHeader({
  hasChanges,
  isSaving,
  onAddFareType,
  onReset,
  onSave,
}) {
  return (
    <header className="sticky top-[57px] z-20 -mx-4 mb-8 border-b border-white/[0.06] bg-background/90 px-4 py-5 backdrop-blur-md md:-mx-8 md:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="animate-slide-up">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles size={12} aria-hidden="true" />
              Pricing Management
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
            Fare Settings
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-text-secondary md:text-base">
            Manage pricing rules, commissions, surcharges, and fare calculations.
          </p>
        </div>

        <div
          className="flex flex-wrap items-center gap-2 animate-slide-up"
          style={{ animationDelay: '80ms' }}
        >
          <button
            type="button"
            onClick={onAddFareType}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-surface-elevated px-4 py-2.5 text-sm font-semibold text-text-primary transition-all hover:border-primary/40 hover:bg-white/[0.06] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Plus size={16} aria-hidden="true" />
            Add Fare Type
          </button>
          <button
            type="button"
            onClick={onReset}
            disabled={!hasChanges || isSaving}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-transparent px-4 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-warning/40 hover:text-warning disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Reset Settings
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!hasChanges || isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-on-primary shadow-glow transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Save size={16} aria-hidden="true" />
            {isSaving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </header>
  );
}
