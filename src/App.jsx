import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/DashBoard";
import DocumentDetails from "./pages/DocumentDetails";
import History from "./pages/History";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* Application */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/document/:id"
          element={<DocumentDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;