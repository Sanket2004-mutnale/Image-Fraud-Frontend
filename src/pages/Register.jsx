import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import eyeIcon from "../assets/eye.png";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    try {

      setLoading(true);

      const response = await axios.post(
        "https://image-fraud-detection-production.up.railway.app/api/auth/register",
        {
          name: name,
          email: email,
          password: password
        }
      );

      console.log("Register response:", response.data);

      setSuccess("Registration successful! Redirecting to login...");

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      console.error("Registration error:", err);

      if (err.response) {

        setError(
          err.response.data?.message ||
          err.response.data ||
          "Registration failed."
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

        <h1 className="text-3xl font-bold text-center text-slate-900">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Create your account to start image verification
        </p>


        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-5"
        >

          {/* Name */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Email */}

          <div>

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

          </div>


          {/* Password */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
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


          {/* Register Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700
                       disabled:bg-gray-400
                       text-white font-semibold py-3 rounded-lg transition"
          >

            {loading
              ? "Creating Account..."
              : "Create Account"
            }

          </button>

        </form>


        {/* Login */}

        <p className="text-center text-sm text-slate-600 mt-6">

          Already have an account?

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="ml-1 text-blue-600 font-semibold hover:underline"
          >
            Login
          </button>

        </p>

      </div>

    </div>
  );
}

export default Register;
