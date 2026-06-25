const LABELS = {
  active: 'Active',
  'in-service': 'In Service',
  'need-repair': 'Need Repair',
};

const STATUS_STYLES = {
  active: 'text-success bg-success/15 border-success/35',
  'in-service': 'text-warning bg-warning/15 border-warning/35',
  'need-repair': 'text-danger bg-danger/10 border-danger/35',
};

export default function VehicleStatusBadge({ status }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status] ?? 'text-text-secondary bg-white/5 border-white/10'}`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
