import { useState } from "react";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../assets/eye.png";
import api from "../Services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

 const handleLogin = async (e) => {

  e.preventDefault();

  setError("");

  try {

    const response = await api.post(
      "/api/auth/login",
      {
        email: email,
        password: password
      }
    );

    console.log("Login response:", response.data);

    const token = response.data;

    localStorage.setItem("token", token);

    navigate("/dashboard");

  } catch (error) {

    console.error("Login error:", error);

    if (error.response) {

      setError(
        error.response.data?.message ||
        "Invalid email or password"
      );

    } else {

      setError(
        "Unable to connect to server"
      );

    }
  }
};

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-slate-900">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Login to continue your image analysis
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

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
      placeholder="Enter your password"
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

          {/* Login */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700
                       text-white font-semibold py-3 rounded-lg
                       transition"
          >
            Login
          </button>

        </form>
        {error && (
  <p className="mt-3 text-center text-red-600 text-sm font-semibold">
    {error}
  </p>
)}
<div className="flex items-center justify-between mt-3">

  {/* Forgot Password - Left */}
  <button
    type="button"
    onClick={() => navigate("/forgot-password")}
    className="text-sm text-blue-600 font-semibold hover:underline"
  >
    Forgot Password?
  </button>

  {/* Sign Up - Right */}
  <p className="text-sm text-slate-600">
    Don't have an account?
    <button
      type="button"
      onClick={() => navigate("/register")}
      className="ml-1 text-blue-600 font-semibold hover:underline"
    >
      Sign Up
    </button>
  </p>

</div>

      </div>

    </div>
  );
}

export default Login;