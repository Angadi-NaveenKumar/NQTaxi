import React from "react";
import { FaPhone, FaCommentAlt, FaLocationArrow } from "react-icons/fa";

export default function RideAcceptedActions({
  onCall,
  onMessage,
  onStartNavigation,
}) {
  return (
    <div className="space-y-4">
      {/* Secondary Actions (Call & Message) */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onCall}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#1A1A1A] border border-gray-800 text-white font-medium hover:bg-[#242424] transition-colors"
        >
          <FaPhone className="text-[#2196F3]" />
          <span>Call</span>
        </button>

        <button
          onClick={onMessage}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#1A1A1A] border border-gray-800 text-white font-medium hover:bg-[#242424] transition-colors"
        >
          <FaCommentAlt className="text-[#4CAF50]" />
          <span>Message</span>
        </button>
      </div>

      {/* Primary Action (Start Navigation) */}
      <button
        onClick={onStartNavigation}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#F5C518] hover:bg-[#e0b415] text-[#0D0D0D] font-bold text-lg transition-colors shadow-lg shadow-[#F5C518]/10"
      >
        <FaLocationArrow className="transform rotate-45" />
        <span>Start Navigation</span>
      </button>
    </div>
  );
}
