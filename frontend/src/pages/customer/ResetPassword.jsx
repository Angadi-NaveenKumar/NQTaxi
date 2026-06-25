import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // API call later

    alert("Password reset successful");

    if (role === "admin") {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1A1A1A] p-6 rounded-3xl border border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-2">
          Reset Password
        </h1>

        <p className="text-gray-400 mb-6">
          Create a new password for your account.
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-gray-700 text-white outline-none focus:border-[#F5C518]"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mt-4 px-4 py-3 rounded-xl bg-[#0D0D0D] border border-gray-700 text-white outline-none focus:border-[#F5C518]"
        />

        <button
          onClick={handleResetPassword}
          className="w-full mt-6 bg-[#F5C518] text-black font-semibold py-3 rounded-xl hover:opacity-90"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;