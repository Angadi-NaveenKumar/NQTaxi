import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCompass, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

import NavigationMap from "../../components/driver/NavigationMap";
import PickupStatusCard from "../../components/driver/PickupStatusCard";
import NavigationActions from "../../components/driver/NavigationActions";

export default function NavigationToPickup() {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showArrivedModal, setShowArrivedModal] = useState(false);

  const passengerDetails = {
    name: "Rahul Sharma",
    rating: 4.9,
    eta: "4 min",
    distance: "1.2 km",
  };

  const handleCall = () => {
    alert(`Calling ${passengerDetails.name}...`);
  };

  const handleMessage = () => {
    alert(`Opening chat with ${passengerDetails.name}...`);
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    alert("Ride cancelled successfully.");
    navigate("/driver/dashboard");
  };

  const handleReachedPickup = () => {
    setShowArrivedModal(true);
  };

  const handleArrivedConfirm = () => {
    setShowArrivedModal(false);
    navigate("/driver/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col lg:flex-row relative w-full max-w-7xl mx-auto lg:p-6 lg:gap-6">
      
      {/* Map Panel: Takes full height on desktop, 60% viewport height on mobile */}
      <div className="relative flex-1 flex flex-col lg:h-[80vh] lg:rounded-[32px] overflow-hidden">
        {/* Map View */}
        <NavigationMap height="h-[60vh] lg:h-full" />
      </div>

      {/* Control Panel: Under map on mobile, right sidebar on desktop */}
      <div className="bg-[#0D0D0D] border-t border-gray-900 lg:border lg:border-gray-800 px-4 py-5 rounded-t-[32px] lg:rounded-[32px] -mt-6 lg:mt-0 z-10 space-y-5 shadow-2xl lg:w-96 lg:h-[80vh] flex-shrink-0 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Status Indicator */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5C518] animate-ping" />
              <span className="text-[#F5C518] font-bold text-xs uppercase tracking-wider">Navigating to Passenger</span>
            </div>
            <span className="text-[#B0B0B0] text-xs">GPS Connected</span>
          </div>

          {/* Pickup Status Card */}
          <PickupStatusCard
            passengerName={passengerDetails.name}
            passengerRating={passengerDetails.rating}
            eta={passengerDetails.eta}
            distance={passengerDetails.distance}
          />
        </div>

        {/* Action Panel */}
        <div className="pt-2">
          <NavigationActions
            onCall={handleCall}
            onMessage={handleMessage}
            onCancel={() => setShowCancelModal(true)}
            onReachedPickup={handleReachedPickup}
          />
        </div>
      </div>

      {/* Custom Confirmation Modal: Cancel Ride */}
      {showCancelModal && (
        <div className="absolute inset-0 bg-[#000000]/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm rounded-[32px]">
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-3xl p-6 w-full max-w-xs text-center space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="w-12 h-12 rounded-full bg-[#F44336]/20 flex items-center justify-center text-[#F44336] text-2xl mx-auto">
              <FaTrashAlt />
            </div>
            <div className="space-y-1">
              <h3 className="text-white font-bold text-lg">Cancel this ride?</h3>
              <p className="text-[#B0B0B0] text-xs">Cancelling too many rides can lower your acceptance score.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="py-2.5 rounded-xl bg-[#242424] border border-gray-800 text-white font-semibold text-sm hover:bg-gray-800 transition-colors"
              >
                No, Keep
              </button>
              <button
                onClick={handleCancelConfirm}
                className="py-2.5 rounded-xl bg-[#F44336] text-white font-bold text-sm hover:bg-[#d32f2f] transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal: Reached Pickup / Arrived */}
      {showArrivedModal && (
        <div className="absolute inset-0 bg-[#000000]/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm rounded-[32px]">
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-3xl p-6 w-full max-w-xs text-center space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="w-12 h-12 rounded-full bg-[#4CAF50]/20 flex items-center justify-center text-[#4CAF50] text-2xl mx-auto">
              <FaCheckCircle className="animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold text-xl">You have arrived!</h3>
              <div className="text-[#B0B0B0] text-sm space-y-2 font-medium">
                <p>Passenger has been notified.</p>
                <p>Please wait for the passenger to board.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
