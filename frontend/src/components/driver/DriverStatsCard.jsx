export default function DriverStatsCard({
  icon,
  value,
  title,
}) {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-4 text-center">
      <div className="flex justify-center mb-2">
        {icon}
      </div>

      <p className="text-2xl font-bold text-white">
        {value}
      </p>

      <p className="text-xs text-[#B0B0B0]">
        {title}
      </p>
    </div>
  );
}