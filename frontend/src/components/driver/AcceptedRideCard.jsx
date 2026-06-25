import React from "react";
import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";

export default function AcceptedRideCard({
  pickup = "MG Road, Bengaluru",
  drop = "Kempegowda Airport",
  distance = "32 km",
  duration = "45 min",
  fare = 850,
}) {
  return (
    <div className="rounded-3xl bg-[#1A1A1A] p-5 border border-gray-800">
      <h3 className="text-white font-bold text-lg mb-4">Ride Details</h3>

      <div className="space-y-4">
        {/* Pickup Location */}
        <div className="flex gap-3">
          <FaMapMarkerAlt className="text-[#4CAF50] mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs text-[#B0B0B0]">Pickup</p>
            <p className="text-white font-medium">{pickup}</p>
          </div>
        </div>

        {/* Drop Location */}
        <div className="flex gap-3">
          <FaLocationArrow className="text-[#F44336] mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs text-[#B0B0B0]">Drop</p>
            <p className="text-white font-medium">{drop}</p>
          </div>
        </div>
      </div>

      {/* Ride Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-gray-800">
        <div>
          <p className="text-[#B0B0B0] text-xs">Distance</p>
          <p className="text-white font-semibold mt-0.5">{distance}</p>
        </div>

        <div>
          <p className="text-[#B0B0B0] text-xs">Duration</p>
          <p className="text-white font-semibold mt-0.5">{duration}</p>
        </div>

        <div>
          <p className="text-[#B0B0B0] text-xs">Fare</p>
          <p className="text-[#F5C518] font-bold mt-0.5">₹{fare}</p>
        </div>
      </div>
    </div>
  );
}
