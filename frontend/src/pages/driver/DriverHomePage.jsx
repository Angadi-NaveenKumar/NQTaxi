import RideInProgress from "../../components/driver/RiderProgress";
import TripCompletion from "../../components/driver/TripCompletion";
import TripDetails from "../../components/driver/TripDetails";
import PaymentConfirmation from "../../components/driver/PaymentConfirmation";
import CustomerRating from "../../components/driver/CustomerRating";

export default function DriverHomePage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-0">
        <RideInProgress />
        <TripCompletion />
        <TripDetails />
        <PaymentConfirmation />
        <CustomerRating />
      </div>
    </div>
  );
}
