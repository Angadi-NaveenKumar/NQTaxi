import React from "react";
import { FaUser, FaStar, FaClock, FaRoute } from "react-icons/fa";

export default function PickupStatusCard({
  passengerName = "Rahul Sharma",
  passengerRating = 4.9,
  eta = "4 min",
  distance = "1.2 km",
}) {
  return (
    <div className="rounded-3xl bg-[#1A1A1A] p-5 border border-gray-800 shadow-xl">
      {/* Header Info: ETA & Distance */}
      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-800 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#242424] flex items-center justify-center border border-gray-700">
            <FaClock className="text-[#F5C518] text-lg" />
          </div>
          <div>
            <p className="text-[10px] text-[#B0B0B0] uppercase tracking-wider font-semibold">ETA to pickup</p>
            <p className="text-white font-bold text-lg leading-tight">{eta}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#242424] flex items-center justify-center border border-gray-700">
            <FaRoute className="text-[#2196F3] text-lg" />
          </div>
          <div>
            <p className="text-[10px] text-[#B0B0B0] uppercase tracking-wider font-semibold">Distance</p>
            <p className="text-white font-bold text-lg leading-tight">{distance}</p>
          </div>
        </div>
      </div>

      {/* Passenger Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#242424] flex items-center justify-center border border-gray-700">
            <FaUser className="text-[#B0B0B0] text-lg" />
          </div>
          <div>
            <p className="text-[10px] text-[#B0B0B0]">Passenger Info</p>
            <h4 className="text-white font-bold text-base leading-tight">{passengerName}</h4>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#242424] py-1 px-3 rounded-full border border-gray-800">
          <FaStar className="text-[#F5C518] text-xs" />
          <span className="text-white text-xs font-semibold">{passengerRating}</span>
        </div>
      </div>
    </div>
  );
}
