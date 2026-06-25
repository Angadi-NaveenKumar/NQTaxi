import { useNavigate } from "react-router-dom";

import RideRequestMap from "../../components/driver/RideRequestMap";
import RideRequestCard from "../../components/driver/RideRequestCard";
import RideRequestActions from "../../components/driver/RideRequestActions";

export default function NewRideRequest() {
  const navigate = useNavigate();

  const request = {
    pickup: "MG Road, Bengaluru",
    drop: "Kempegowda Airport",
    distance: "32 km",
    duration: "45 min",
    fare: 850,
    passengerRating: 4.9,
    rideType: "Premium",
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
          onAccept={() =>
            navigate("/driver/ride-accepted")
          }
          onDecline={() =>
            navigate("/driver/dashboard")
          }
        />
      </div>
    </div>
  );
}