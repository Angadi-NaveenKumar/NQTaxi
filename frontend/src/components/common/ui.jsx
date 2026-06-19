
export function Button({ children, loading, disabled, className = '', ...props }) {
  return (
    <button
      className={`rounded-xl bg-primary px-4 py-2 text-primary-foreground font-bold transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`rounded-xl bg-card p-4 shadow-card ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Input({ label, icon: Icon, suffix, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-foreground mb-1">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`w-full rounded-xl bg-input px-4 py-3 text-foreground placeholder:text-muted outline-none focus:ring-2 focus:ring-primary ${Icon ? 'pl-10' : ''} ${suffix ? 'pr-10' : ''} ${error ? 'border border-danger' : ''}`}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </div>
  );
}

export function Checkbox({ label, className = '', ...props }) {
  return (
    <label className={`flex items-center gap-2 text-sm text-foreground ${className}`}>
      <input type="checkbox" className="rounded" {...props} />
      {label}
    </label>
  );
}
