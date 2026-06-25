import { FaMotorcycle } from "react-icons/fa";

export default function RecentRideCard({
  customer,
  pickup,
  fare,
}) {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[#242424] flex items-center justify-center">
          <FaMotorcycle className="text-[#F5C518]" />
        </div>

        <div>
          <p className="font-semibold text-white">
            {customer}
          </p>

          <p className="text-sm text-[#B0B0B0]">
            {pickup}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-[#F5C518]">
          {fare}
        </p>

        <p className="text-xs text-[#B0B0B0]">
          Trip
        </p>
      </div>
    </div>
  );
}