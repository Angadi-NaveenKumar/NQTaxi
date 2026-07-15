import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/customer/Header";

export default function Insurance({
  rideData,
  setRideData,
}) {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(rideData.insurancePlan ||"");

  const handleContinue = () => {
    if (!selectedPlan) {
      alert("Please select an insurance plan.");
      return;
    }

    const startDate = new Date();
    const expiryDate = new Date();

    if (selectedPlan === "monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    setRideData((prev) => ({
      ...prev,
      insurance: true,
      insurancePlan: selectedPlan,
      insuranceStartDate: startDate.toISOString(),
      insuranceExpiryDate: expiryDate.toISOString(),
    }));

    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <PageHeader
        title="Trip Insurance"
        onBack={() => navigate(-1)}
      />

      <main className="px-4 py-4 space-y-5">

        {/* Header */}
        <div className="bg-surface rounded-2xl shadow-card border border-border p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-2xl text-primary-fg">
              🛡️
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Trip Insurance
              </h2>

              <p className="text-text-secondary text-sm">
                Protect yourself during every ride
              </p>
            </div>
          </div>
        </div>

        {/* Choose Plan */}
        <div className="bg-surface rounded-2xl shadow-card border border-border p-5">
          <h2 className="text-lg font-bold mb-4">
            Choose Insurance Plan
          </h2>

          <div className="space-y-4">

            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`w-full p-4 rounded-2xl border text-left ${
                selectedPlan === "monthly"
                  ? "border-primary bg-primary/10"
                  : "border-border"
              }`}
            >
              <h3 className="font-bold">
                1 Month Plan
              </h3>

              <p className="text-sm text-text-secondary mt-1">
                Insurance coverage for one month.
              </p>

              <p className="font-bold text-primary mt-2">
                ₹99 / Month
              </p>
            </button>

            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`w-full p-4 rounded-2xl border text-left ${
                selectedPlan === "yearly"
                  ? "border-primary bg-primary/10"
                  : "border-border"
              }`}
            >
              <h3 className="font-bold">
                1 Year Plan
              </h3>

              <p className="text-sm text-text-secondary mt-1">
                Insurance coverage for one year.
              </p>

              <p className="font-bold text-primary mt-2">
                ₹999 / Year
              </p>
            </button>

          </div>
        </div>

        {/* Policy Details */}
        {selectedPlan && (
          <>
            <div className="bg-surface rounded-2xl shadow-card border border-border p-5">
              <h2 className="text-lg font-bold mb-4">
                Policy Details
              </h2>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Policy Number</span>
                  <span className="font-semibold">
                    INS2026001
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Insurance Partner</span>
                  <span className="font-semibold">
                    ACKO Insurance
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Coverage Amount</span>
                  <span className="font-semibold text-green-600">
                    ₹5,00,000
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Plan</span>
                  <span className="font-semibold">
                    {selectedPlan === "monthly"
                      ? "1 Month Plan"
                      : "1 Year Plan"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-green-600 font-semibold">
                    Active
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Expiry Date</span>
                  <span className="font-semibold">
                 {selectedPlan ? (() => { const date = new Date();

      if (selectedPlan === "monthly") {
        date.setMonth(date.getMonth() + 1);
      } else {
        date.setFullYear(date.getFullYear() + 1);
      }

      return date.toLocaleDateString(); })()
         : "-"}
                  </span>
                </div>

              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="rounded-2xl bg-primary py-4 font-bold text-primary-fg shadow-card">
                📄 View Policy
              </button>

              <button className="rounded-2xl bg-danger py-4 font-bold text-white shadow-card">
                🚨 Claim Insurance
              </button>
            </div>
          </>
        )}

        {/* Coverage */}
        <div className="bg-surface rounded-2xl shadow-card border border-border p-5">
          <h2 className="text-lg font-bold mb-5">
            Coverage Includes
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-input rounded-2xl p-4 text-center">
              <div className="text-4xl">🚑</div>
              <h3 className="font-bold mt-2">
                Accident Cover
              </h3>
            </div>

            <div className="bg-input rounded-2xl p-4 text-center">
              <div className="text-4xl">🏥</div>
              <h3 className="font-bold mt-2">
                Medical Expenses
              </h3>
            </div>

            <div className="bg-input rounded-2xl p-4 text-center">
              <div className="text-4xl">🛡️</div>
              <h3 className="font-bold mt-2">
                Third Party
              </h3>
            </div>

            <div className="bg-input rounded-2xl p-4 text-center">
              <div className="text-4xl">📞</div>
              <h3 className="font-bold mt-2">
                24×7 Support
              </h3>
            </div>

          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full rounded-2xl bg-primary py-4 font-bold text-primary-fg shadow-card"
        >
          Continue
        </button>

      </main>
    </div>
  );
}