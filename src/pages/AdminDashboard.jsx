import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarPlus, FaCalendarDay } from "react-icons/fa";
import { useState, useEffect } from "react";
import { signout } from "../api"; // Assuming signout function is available in your api.js

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setTodayDate(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
  }, []);

  const handleLogout = async () => {
    try {
      await signout(); // Call the signout API function to logout from the backend
      localStorage.removeItem("auth");
      localStorage.removeItem("userRole");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-5 shadow-md">
        <h1 className="text-2xl font-bold mb-5">Admin's Side</h1>
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-semibold">Administrator</p>
              <p className="text-sm text-gray-500">admin@edoc.com</p>
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="w-full bg-red-500 text-white py-2 rounded mb-4">
          Log out
        </button>
        <ul className="space-y-4">
          <li><button onClick={() => navigate("/admin-dashboard")} className="text-blue-600 font-semibold">Dashboard</button></li>
          <li><button onClick={() => navigate("/doctors")} className="text-blue-600">Doctors</button></li>
          <li><button onClick={() => navigate("/schedule")} className="text-blue-600">Schedule</button></li>
          <li><button onClick={() => navigate("/appointments")} className="text-blue-600">Appointment</button></li>
          <li><button onClick={() => navigate("/patients")} className="text-blue-600">Patients</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <input 
            type="text" 
            placeholder="Search Doctor name or Email" 
            className="border p-2 rounded w-1/2"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
          <p className="text-gray-500">Today's Date: {todayDate}</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white shadow rounded flex items-center space-x-3">
            <FaUserMd className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-semibold">1</p>
              <p className="text-sm text-gray-500">Doctors</p>
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded flex items-center space-x-3">
            <FaUsers className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-semibold">2</p>
              <p className="text-sm text-gray-500">Patients</p>
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded flex items-center space-x-3">
            <FaCalendarPlus className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-semibold">1</p>
              <p className="text-sm text-gray-500">New Booking</p>
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded flex items-center space-x-3">
            <FaCalendarDay className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-semibold">0</p>
              <p className="text-sm text-gray-500">Today Sessions</p>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments & Sessions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold text-lg mb-2">Upcoming Appointments until Next Friday</h2>
            <p className="text-sm text-gray-500 mb-4">Here's quick access to upcoming appointments until 7 days. More details available in @Appointment section.</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded">Show all Appointments</button>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold text-lg mb-2">Upcoming Sessions until Next Friday</h2>
            <p className="text-sm text-gray-500 mb-4">Here's quick access to upcoming sessions scheduled within 7 days. More features available in @Schedule section.</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded">Show all Sessions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
