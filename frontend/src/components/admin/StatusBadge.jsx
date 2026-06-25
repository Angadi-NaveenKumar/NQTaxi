const LABELS = {
  completed: 'Completed',
  ongoing: 'Ongoing',
  cancelled: 'Cancelled',
};

const STATUS_STYLES = {
  completed: 'text-success bg-success/15 border-success/35',
  ongoing: 'text-warning bg-warning/15 border-warning/35',
  cancelled: 'text-danger bg-danger/10 border-danger/35',
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${STATUS_STYLES[status] ?? 'text-text-secondary bg-white/5 border-white/10'}`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
