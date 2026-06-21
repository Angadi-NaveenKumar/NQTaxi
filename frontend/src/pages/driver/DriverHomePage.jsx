import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCar,
  FaStar,
  FaMoneyBillWave,
} from "react-icons/fa";

import DriverHeader from "../../components/driver/DriverHeader";
import OnlineToggle from "../../components/driver/OnlineToggle";
import DriverStatsCard from "../../components/driver/DriverStatsCard";
import RecentRideCard from "../../components/driver/RecentRideCard";

import {
  driverInfo,
  driverStats,
  recentRides,
} from "../../data/driverDashboardData";

export default function DriverHomePage() {
  const navigate = useNavigate();

  const [isOnline, setIsOnline] = useState(false);

  const handleToggle = () => {
    const newState = !isOnline;

    setIsOnline(newState);

    if (newState) {
      setTimeout(() => {
        navigate("/driver/new-request");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <DriverHeader driver={driverInfo} />

      <div className="p-4">
        <OnlineToggle
          isOnline={isOnline}
          onToggle={handleToggle}
        />

        <h3 className="mb-3 text-lg font-bold text-white">
          Today's Overview
        </h3>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <DriverStatsCard
            icon={
              <FaCar className="text-xl text-[#F5C518]" />
            }
            value={driverStats.rides}
            title="Rides"
          />

          <DriverStatsCard
            icon={
              <FaMoneyBillWave className="text-xl text-[#4CAF50]" />
            }
            value={`₹${driverStats.earnings}`}
            title="Earnings"
          />

          <DriverStatsCard
            icon={
              <FaStar className="text-xl text-[#F5C518]" />
            }
            value={driverStats.rating}
            title="Rating"
          />
        </div>

        <h3 className="mb-3 text-lg font-bold text-white">
          Recent Rides
        </h3>

        <div className="space-y-3">
          {recentRides.map((ride) => (
            <RecentRideCard
              key={ride.id}
              customer={ride.customer}
              pickup={ride.pickup}
              fare={ride.fare}
            />
          ))}
        </div>
      </div>
    </div>
  );
}