import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCar, FaMoneyBillWave, FaStar } from "react-icons/fa";

import DriverHeader from "../../components/driver/DriverHeader";
import OnlineToggle from "../../components/driver/OnlineToggle";
import DriverStatsCard from "../../components/driver/DriverStatsCard";
import RecentRideCard from "../../components/driver/RecentRideCard";
import NavigationMap from "../../components/driver/NavigationMap";

import { driverInfo, driverStats, recentRides } from "../../data/driverDashboardData";

export default function DriverHomePage() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);

  const handleToggle = () => {
    const newState = !isOnline;
    setIsOnline(newState);

    if (newState) {
      setTimeout(() => {
        navigate("/driver/new-request");
      }, 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <DriverHeader driver={driverInfo} />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 p-4 md:p-6 pb-24">
        {/* Availability Toggle Section */}
        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <OnlineToggle isOnline={isOnline} onToggle={handleToggle} />
        </section>

        {!isOnline ? (
          /* OFFLINE DASHBOARD */
          <>
            <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
              <h3 className="text-lg font-bold text-white">Today's Overview</h3>

              <div className="grid grid-cols-3 gap-3">
                <DriverStatsCard
                  icon={<FaCar className="text-xl text-[#F5C518]" />}
                  value={driverStats.rides}
                  title="Rides"
                />
                <DriverStatsCard
                  icon={<FaMoneyBillWave className="text-xl text-[#4CAF50]" />}
                  value={`Rs. ${driverStats.earnings}`}
                  title="Earnings"
                />
                <DriverStatsCard
                  icon={<FaStar className="text-xl text-[#F5C518]" />}
                  value={driverStats.rating}
                  title="Rating"
                />
              </div>
            </section>

            <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
              <h3 className="mb-3 text-lg font-bold text-white">Recent Rides</h3>
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
            </section>
          </>
        ) : (
          /* ONLINE RADAR RADAR VIEW */
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-4 shadow-lg min-h-[420px] flex flex-col items-center justify-center">
            {/* Embedded interactive map in background */}
            <div className="absolute inset-0 opacity-25">
              <NavigationMap height="h-full" />
            </div>

            {/* Radar Animation overlay */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute w-full h-full rounded-full bg-[#4CAF50]/10 border border-[#4CAF50]/20 animate-ping" />
                <div className="absolute w-24 h-24 rounded-full bg-[#4CAF50]/15 border border-[#4CAF50]/30 animate-pulse" />
                <div className="w-16 h-16 rounded-full bg-[#4CAF50] flex items-center justify-center text-white shadow-[0_0_20px_rgba(76,175,80,0.5)]">
                  <FaCar className="text-2xl animate-bounce" />
                </div>
              </div>
              <div className="space-y-2 px-4">
                <h3 className="text-xl font-bold text-white tracking-wide">Searching for Rides...</h3>
                <p className="text-sm text-[#B0B0B0] max-w-sm">
                  You are now online. Keeping your GPS active and matching with nearby passenger bookings.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
