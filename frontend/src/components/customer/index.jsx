import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Button({ className, variant = 'primary', loading = false, ...props }) {
  const variants = {
    primary: 'bg-primary text-primary-foreground font-bold hover:opacity-90 active:scale-[0.98]',
    secondary: 'bg-surface-elevated text-text-primary font-semibold hover:bg-surface-elevated/80 active:scale-[0.98]',
    outline: 'border border-primary/20 text-primary hover:bg-primary/10',
    ghost: 'hover:bg-white/5 text-text-secondary hover:text-text-primary',
    danger: 'bg-error text-white font-bold hover:bg-error/90 active:scale-[0.98]',
  };

  return (
    <button
      disabled={loading}
      className={cn(
        'px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : props.children}
    </button>
  );
}

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'bg-surface-secondary border border-white/5 rounded-2xl p-6',
        className
      )}
      {...props}
    />
  );
}

export function Input({ className, label, error, icon: Icon, suffix, ...props }) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-text-secondary flex items-center gap-2 ml-1">
          {Icon && <Icon size={14} />}
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          className={cn(
            'w-full bg-surface-elevated border border-white/5 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-secondary',
            error && 'border-error/50 focus:ring-error/50',
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-error font-medium ml-1">{error}</p>}
    </div>
  );
}

export function Checkbox({ label, className, ...props }) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group", className)}>
      <div className="relative">
        <input type="checkbox" className="sr-only peer" {...props} />
        <div className="w-5 h-5 rounded border border-white/10 bg-surface-elevated peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-primary-foreground scale-0 peer-checked:scale-100 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      {label && <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{label}</span>}
    </label>
  );
}
