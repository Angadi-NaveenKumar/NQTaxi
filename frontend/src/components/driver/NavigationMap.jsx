import React from "react";
import { FaMapMarkerAlt, FaLocationArrow, FaCompass } from "react-icons/fa";

export default function NavigationMap({ height = "h-96" }) {
  return (
    <div className={`relative ${height} w-full rounded-3xl bg-[#1A1A1A] overflow-hidden border border-gray-800 shadow-inner`}>
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* SVG Map Route Visualizer */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
        {/* Subtle secondary routes (gray paths) */}
        <path
          d="M 50,150 Q 150,100 250,220 T 350,300"
          fill="none"
          stroke="#2E2E2E"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 100,50 L 300,350"
          fill="none"
          stroke="#2E2E2E"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 30,320 C 120,380 200,280 320,100"
          fill="none"
          stroke="#2E2E2E"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Primary Route Path (Vibrant Gradient Line) */}
        <path
          d="M 80,300 C 150,280 180,180 240,150 S 300,100 320,80"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(245,197,24,0.3)]"
        />

        {/* Dash overlay to show movement animation */}
        <path
          d="M 80,300 C 150,280 180,180 240,150 S 300,100 320,80"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="8 8"
          strokeLinecap="round"
          className="animate-[dash_30s_linear_infinite]"
        />

        {/* Define Gradients */}
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2196F3" />
            <stop offset="60%" stopColor="#F5C518" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>
        </defs>

        {/* Driver Current Location (Starting Dot) */}
        <circle cx="80" cy="300" r="12" fill="#2196F3" fillOpacity="0.2" className="animate-ping" />
        <circle cx="80" cy="300" r="6" fill="#2196F3" stroke="#FFFFFF" strokeWidth="2" />

        {/* Moving Car / Position Indicator */}
        <g className="animate-[moveAlongPath_12s_ease-in-out_infinite]" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          {/* Animated pulsing ring */}
          <circle cx="210" cy="180" r="16" fill="#F5C518" fillOpacity="0.15" className="animate-pulse" />
          <circle cx="210" cy="180" r="6" fill="#F5C518" stroke="#FFFFFF" strokeWidth="2" />
        </g>

        {/* Destination Location (Pickup Pin) */}
        <g transform="translate(320, 80) scale(1)">
          {/* Pulsing radius */}
          <circle cx="0" cy="0" r="18" fill="#4CAF50" fillOpacity="0.2" className="animate-ping" />
        </g>
      </svg>

      {/* Destination Pin Icon Element */}
      <div className="absolute top-[52px] left-[308px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="bg-[#4CAF50] text-white p-1.5 rounded-full border border-white shadow-lg animate-bounce">
          <FaMapMarkerAlt className="text-sm" />
        </div>
      </div>

      {/* Driver Icon Element (Start) */}
      <div className="absolute bottom-[80px] left-[68px] -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
        <div className="bg-[#2196F3] text-white p-1 rounded-full border border-white shadow-lg">
          <FaLocationArrow className="text-xs transform rotate-45" />
        </div>
      </div>

      {/* Floating UI Elements */}
      {/* Compass / Directions HUD */}
      <div className="absolute top-4 left-4 bg-[#1A1A1A]/95 backdrop-blur-md border border-gray-800 rounded-2xl p-3 flex items-center gap-3 shadow-xl">
        <div className="w-10 h-10 rounded-full bg-[#242424] flex items-center justify-center border border-gray-700 animate-spin-slow">
          <FaCompass className="text-[#F5C518] text-xl" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Head North-East</p>
          <p className="text-[#B0B0B0] text-xs">on MG Road towards Trinity Circle</p>
        </div>
      </div>

      {/* Speedometer HUD */}
      <div className="absolute top-4 right-4 bg-[#1A1A1A]/95 backdrop-blur-md border border-gray-800 rounded-2xl px-4 py-2 flex flex-col items-center shadow-xl">
        <span className="text-[#F5C518] font-bold text-lg leading-tight">45</span>
        <span className="text-[#B0B0B0] text-[9px] uppercase tracking-wider font-semibold">km/h</span>
      </div>

      {/* Map styling helper animations inside style block */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
