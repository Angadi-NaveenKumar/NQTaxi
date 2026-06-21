import React from "react";
import { FaUser, FaStar } from "react-icons/fa";

export default function PassengerInfoCard({ name = "Rahul Sharma", rating = 4.9 }) {
  return (
    <div className="rounded-3xl bg-[#1A1A1A] p-4 border border-gray-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#242424] flex items-center justify-center border border-gray-700">
          <FaUser className="text-[#B0B0B0] text-xl" />
        </div>
        <div>
          <p className="text-xs text-[#B0B0B0]">Passenger</p>
          <h4 className="text-white font-bold text-base">{name}</h4>
        </div>
      </div>
      <div className="flex items-center gap-1 bg-[#242424] py-1.5 px-3 rounded-full border border-gray-800">
        <FaStar className="text-[#F5C518] text-sm" />
        <span className="text-white text-sm font-semibold">{rating}</span>
      </div>
    </div>
  );
}
