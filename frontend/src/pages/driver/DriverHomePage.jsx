import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCar, FaMoneyBillWave, FaStar } from "react-icons/fa";

import DriverHeader from "../../components/driver/DriverHeader";
import OnlineToggle from "../../components/driver/OnlineToggle";
import DriverStatsCard from "../../components/driver/DriverStatsCard";
import RecentRideCard from "../../components/driver/RecentRideCard";

import { driverInfo, driverStats, recentRides } from "../../data/driverDashboardData";

import NewRideRequest from "./NewRideRequest";
import RideAccepted from "./RideAccepted";
import NavigationToPickup from "./NavigationToPickup";
import RiderProgressPage from "./RiderProgressPage";
import TripCompletionPage from "./TripCompletionPage";
import TripDetailsPage from "./TripDetailsPage";
import PaymentConfirmationPage from "./PaymentConfirmationPage";
import CustomerRatingPage from "./CustomerRatingPage";
import EarningsDashboard from "./EarningsDashboard";
import WalletDashboard from "./WalletDashboard";
import TripHistory from "./TripHistory";
import DriverStats from "./DriverStats";
import IncentivesBonuses from "./IncentivesBonuses";
import BankDetailsPayouts from "./BankDetailsPayouts";

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
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <DriverHeader driver={driverInfo} />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 p-4 md:p-6">
        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <OnlineToggle isOnline={isOnline} onToggle={handleToggle} />

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

          <div>
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
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">New Request</h2>
          <NewRideRequest />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Ride Accepted</h2>
          <RideAccepted />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Navigation</h2>
          <NavigationToPickup />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Rider Progress</h2>
          <RiderProgressPage />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Trip Completion</h2>
          <TripCompletionPage />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Trip Details</h2>
          <TripDetailsPage />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Payment Confirmation</h2>
          <PaymentConfirmationPage />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Customer Rating</h2>
          <CustomerRatingPage />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Earnings</h2>
          <EarningsDashboard />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Wallet</h2>
          <WalletDashboard />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Trip History</h2>
          <TripHistory />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Driver Stats</h2>
          <DriverStats />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Incentives</h2>
          <IncentivesBonuses />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg">
          <h2 className="text-xl font-bold">Payouts</h2>
          <BankDetailsPayouts />
        </section>
      </div>
    </div>
  );
}
