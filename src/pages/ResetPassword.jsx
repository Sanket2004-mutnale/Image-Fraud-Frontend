import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import eyeIcon from "../assets/eye.png";

function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  // Get reset token sent from ForgotPassword.jsx
  const token = location.state?.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    // Check token
    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "https://image-fraud-detection-production.up.railway.app/api/auth/reset-password",
        {
          token: token,
          newPassword: password
        }
      );

      console.log("Reset password response:", response.data);

      setSuccess("Password reset successfully! Redirecting to login...");

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      console.error("Reset password error:", err);

      if (err.response) {

        setError(
          err.response.data?.message ||
          err.response.data ||
          "Password reset failed."
        );

      } else {

        setError(
          "Unable to connect to the backend."
        );
      }

    } finally {

      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}

        <h1 className="text-3xl font-bold text-center text-slate-900">
          Reset Password
        </h1>

        <p className="text-center text-slate-500 mt-3 leading-relaxed">
          Create a new password for your account.
        </p>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* New Password */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              New Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >

                <img
                  src={eyeIcon}
                  alt="Show password"
                  className="w-5 h-5"
                />

              </button>

            </div>

          </div>


          {/* Confirm Password */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >

                <img
                  src={eyeIcon}
                  alt="Show password"
                  className="w-5 h-5"
                />

              </button>

            </div>

          </div>


          {/* Error */}

          {error && (
            <div className="bg-red-50 border border-red-200
                            text-red-600 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}


          {/* Success */}

          {success && (
            <div className="bg-green-50 border border-green-200
                            text-green-600 rounded-lg p-3 text-sm">
              {success}
            </div>
          )}


          {/* Reset Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700
                       disabled:bg-gray-400
                       text-white font-semibold py-3 rounded-lg transition"
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"
            }
          </button>

        </form>


        {/* Back to Login */}

        <div className="text-center mt-6">

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Back to Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;