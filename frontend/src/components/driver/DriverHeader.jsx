export default function DriverHeader({ driver }) {
  return (
    <div className="bg-[#1A1A1A] p-4 border-b border-gray-800">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[#242424] flex items-center justify-center">
          <span className="font-bold text-white">
            {driver.name.charAt(0)}
          </span>
        </div>

        <div className="flex-1">
          <h2 className="font-bold text-lg text-white">
            Welcome, {driver.name} 👋
          </h2>

          <p className="text-sm text-[#B0B0B0]">
            {driver.vehicle}
          </p>
        </div>
      </div>
    </div>
  );
}