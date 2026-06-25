import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (!identifier.trim()) {
      alert("Please enter your email or mobile number");
      return;
    }

    // API call later
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      alert("Please enter a valid OTP");
      return;
    }

    // OTP verification API later
    navigate(`/reset-password?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1A1A1A] p-6 rounded-3xl border border-gray-800">

        <h1 className="text-3xl font-bold text-white mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-400 mb-6">
          Enter your registered email address or mobile number.
        </p>

        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email Address or Mobile Number"
          className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-gray-700 text-white outline-none focus:border-[#F5C518]"
        />

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full mt-5 bg-[#F5C518] text-black font-semibold py-3 rounded-xl hover:opacity-90"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full mt-5 px-4 py-3 rounded-xl bg-[#0D0D0D] border border-gray-700 text-white outline-none focus:border-[#F5C518]"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full mt-5 bg-[#F5C518] text-black font-semibold py-3 rounded-xl hover:opacity-90"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;