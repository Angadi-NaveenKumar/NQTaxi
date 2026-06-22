import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";

import PassengerInfoCard from "../../components/driver/PassengerInfoCard";
import AcceptedRideCard from "../../components/driver/AcceptedRideCard";
import RideAcceptedActions from "../../components/driver/RideAcceptedActions";

export default function RideAccepted() {
  const navigate = useNavigate();

  // Mock ride request data (matching data from NewRideRequest)
  const rideDetails = {
    passengerName: "Rahul Sharma",
    passengerRating: 4.9,
    pickup: "MG Road, Bengaluru",
    drop: "Kempegowda Airport",
    distance: "32 km",
    duration: "45 min",
    fare: 850,
  };

  const handleCall = () => {
    alert(`Calling ${rideDetails.passengerName}...`);
  };

  const handleMessage = () => {
    alert(`Opening chat with ${rideDetails.passengerName}...`);
  };

  const handleStartNavigation = () => {
    navigate("/driver/navigation-pickup");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col justify-between p-4 pb-8 w-full">
      {/* Top Content Stack */}
      <div className="space-y-4 flex-1">
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => navigate("/driver/dashboard")} 
            className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-gray-800 hover:bg-[#242424] transition-colors"
          >
            <FaArrowLeft className="text-[#B0B0B0] text-sm" />
          </button>
          <h1 className="text-xl font-bold">Ride Accepted</h1>
        </div>

        {/* Acceptance Badge / Confirmation Banner */}
        <div className="bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-3xl p-5 flex items-center gap-4 animate-[fadeIn_0.5s_ease-out] w-full">
          <div className="w-12 h-12 rounded-full bg-[#4CAF50]/20 flex items-center justify-center text-[#4CAF50] text-2xl flex-shrink-0">
            <FaCheckCircle className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">Booking Confirmed</h3>
            <p className="text-[#B0B0B0] text-xs mt-0.5">Please navigate to the pickup location to collect the passenger.</p>
          </div>
        </div>

        {/* Content Cards in Single Column Stack */}
        <PassengerInfoCard 
          name={rideDetails.passengerName} 
          rating={rideDetails.passengerRating} 
        />

        <AcceptedRideCard 
          pickup={rideDetails.pickup}
          drop={rideDetails.drop}
          distance={rideDetails.distance}
          duration={rideDetails.duration}
          fare={rideDetails.fare}
        />
      </div>

      {/* Footer Actions */}
      <div className="mt-8 w-full">
        <RideAcceptedActions 
          onCall={handleCall}
          onMessage={handleMessage}
          onStartNavigation={handleStartNavigation}
        />
      </div>
    </div>
  );
}
