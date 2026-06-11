export default function TripStats({ distance, duration, fare }) {
  const stats = [
    { label: 'Distance', value: distance },
    { label: 'Duration', value: duration },
    { label: 'Fare', value: `₹${fare}` },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 border-t border-input pt-4">
      {stats.map(({ label, value }) => (
        <div key={label} className="text-center">
          <p className="text-sm font-bold text-foreground">{value}</p>
          <p className="mt-0.5 text-[10px] font-medium text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
