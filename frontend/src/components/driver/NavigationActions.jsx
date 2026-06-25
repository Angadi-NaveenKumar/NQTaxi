import React from "react";
import { FaPhone, FaCommentAlt, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

export default function NavigationActions({
  onCall,
  onMessage,
  onCancel,
  onReachedPickup,
}) {
  return (
    <div className="space-y-4">
      {/* Secondary Actions Row: Call, Message, Cancel */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onCall}
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-[#1A1A1A] border border-gray-800 text-white font-medium hover:bg-[#242424] transition-colors"
        >
          <FaPhone className="text-[#2196F3] text-lg" />
          <span className="text-xs">Call</span>
        </button>

        <button
          onClick={onMessage}
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-[#1A1A1A] border border-gray-800 text-white font-medium hover:bg-[#242424] transition-colors"
        >
          <FaCommentAlt className="text-[#4CAF50] text-lg" />
          <span className="text-xs">Message</span>
        </button>

        <button
          onClick={onCancel}
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-[#F44336]/10 border border-[#F44336]/20 text-[#F44336] font-medium hover:bg-[#F44336]/20 transition-colors"
        >
          <FaTimesCircle className="text-[#F44336] text-lg" />
          <span className="text-xs">Cancel</span>
        </button>
      </div>

      {/* Primary Action (Reached Pickup) */}
      <button
        onClick={onReachedPickup}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#F5C518] hover:bg-[#e0b415] text-[#0D0D0D] font-bold text-lg transition-colors shadow-lg shadow-[#F5C518]/10"
      >
        <FaCheckCircle className="text-lg" />
        <span>Reached Pickup</span>
      </button>
    </div>
  );
}
