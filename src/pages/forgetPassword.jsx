import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        {
          email: email
        }
      );

      console.log("Forgot password response:", response.data);

      /*
       * Backend currently returns the reset token.
       * We temporarily pass the token to ResetPassword page.
       */
      const token = response.data;

      setSuccess("Reset link generated successfully!");

      setTimeout(() => {

        navigate("/reset-password", {
          state: {
            token: token
          }
        });

      }, 1000);

    } catch (err) {

      console.error("Forgot password error:", err);

      if (err.response) {

        setError(
          err.response.data?.message ||
          err.response.data ||
          "Unable to process your request."
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
          Forgot Password?
        </h1>

        <p className="text-center text-slate-500 mt-3 leading-relaxed">
          Enter your registered email address and we'll help you reset
          your password.
        </p>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          {/* Error */}

          {error && (
            <div className="bg-red-50 border border-red-200
                            text-red-600 rounded-lg p-3 text-sm mt-4">
              {error}
            </div>
          )}


          {/* Success */}

          {success && (
            <div className="bg-green-50 border border-green-200
                            text-green-600 rounded-lg p-3 text-sm mt-4">
              {success}
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700
                       disabled:bg-gray-400
                       text-white font-semibold py-3 rounded-lg transition"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"
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

export default ForgotPassword;