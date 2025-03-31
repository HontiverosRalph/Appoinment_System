import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { testConnection } from "../api"; 

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import AdminDashboard from "../pages/AdminDashboard";
import StaffDashboard from "../pages/StaffDashboard";
import PatientDashboard from "../pages/PatientDashboard";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const userRole = localStorage.getItem("userRole");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Role-based Routing */}
        <Route path="/admin-dashboard" element={isAuthenticated && userRole === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/staff-dashboard" element={isAuthenticated && userRole === "staff" ? <StaffDashboard /> : <Navigate to="/login" />} />
        <Route path="/patient-dashboard" element={isAuthenticated && userRole === "patient" ? <PatientDashboard /> : <Navigate to="/login" />} />

        {/* Redirect Google Auth */}
        <Route path="/google-auth" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
