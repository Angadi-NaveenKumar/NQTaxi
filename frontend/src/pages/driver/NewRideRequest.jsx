import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { driverInfo } from "../../data/driverDashboardData";

import RideRequestMap from "../../components/driver/RideRequestMap";
import RideRequestCard from "../../components/driver/RideRequestCard";
import RideRequestActions from "../../components/driver/RideRequestActions";

export default function NewRideRequest() {
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    pickup: "MG Road, Bengaluru",
    drop: "Kempegowda Airport",
    distance: "32 km",
    duration: "45 min",
    fare: 850,
    passengerRating: 4.9,
    rideType: "Premium",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nqtaxi_active_booking");
      if (stored) {
        const booking = JSON.parse(stored);
        if (booking && booking.status === "pending") {
          setRequest({
            pickup: booking.pickup || "MG Road, Bengaluru",
            drop: booking.destination || "Kempegowda Airport",
            distance: booking.selectedRide?.distance || "12.5 km",
            duration: booking.selectedRide?.eta || "15 min",
            fare: booking.price || 186,
            passengerRating: 4.8,
            rideType: booking.selectedRide?.name || "Auto",
          });
        }
      }
    } catch (err) {
      console.error("Error reading active booking", err);
    }
  }, []);

  const handleAccept = () => {
    try {
      const stored = localStorage.getItem("nqtaxi_active_booking");
      if (stored) {
        const booking = JSON.parse(stored);
        booking.status = "accepted";
        booking.driverDetails = {
          name: driverInfo.name || "Rajesh Kumar",
          rating: driverInfo.rating || 4.8,
          vehicle: driverInfo.vehicle || "TS09AB1234 - Swift Dzire",
          phone: "+91 9876543210",
        };
        localStorage.setItem("nqtaxi_active_booking", JSON.stringify(booking));
      }
    } catch (err) {
      console.error("Error accepting booking", err);
    }
    navigate("/driver/ride-accepted");
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] p-4">
      <h1 className="mb-4 text-2xl font-bold text-white">
        Ride Request
      </h1>

      <div className="space-y-4">
        <RideRequestMap />

        <RideRequestCard
          request={request}
        />

        <RideRequestActions
          onAccept={handleAccept}
          onDecline={() => navigate("/driver/dashboard")}
        />
      </div>
    </div>
  );
}