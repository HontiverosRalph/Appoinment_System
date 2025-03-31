import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { testConnection } from "../api"; // Import API test function

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import AdminDashboard from "../pages/AdminDashboard";

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  useEffect(() => {
    testConnection(); // Call API when component loads
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
