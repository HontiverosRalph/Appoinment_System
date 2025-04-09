import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUserInjured, FaCalendarCheck, FaClock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { signout } from "../api"; // Assuming signout function is available in your api.js

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [todayDate, setTodayDate] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [appointments, setAppointments] = useState([]); // Placeholder for dynamic data

  useEffect(() => {
    // Get the user's role from localStorage and check if they are authenticated
    const role = localStorage.getItem("userRole");
    const auth = localStorage.getItem("auth");

    if (!auth || role !== "patient") {
      // If not authenticated or not a patient, redirect to login
      navigate("/login");
    } else {
      setUserRole(role);
    }

    // Get today's date for display
    const date = new Date();
    setTodayDate(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD

    // Fetch dynamic data (appointments) here, for now we use placeholder
    // Example: setAppointments(fetchedAppointments);
  }, [navigate]);

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
      <aside className="w-64 bg-white p-5 shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full mb-3"></div>
          <h2 className="text-lg font-semibold">Test Patient</h2>
          <p className="text-sm text-gray-500">patient@edoc.com</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600"
          >
            Log out
          </button>
        </div>
        <nav className="mt-5">
          <ul>
            <li 
              className="p-2 bg-blue-100 rounded-md cursor-pointer"
              onClick={() => navigate("/patient-dashboard")}
            >
              🏠 Home
            </li>
            <li 
              className="p-2 mt-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => navigate("/doctors")}
            >
              👨‍⚕️ All Doctors
            </li>
            <li 
              className="p-2 mt-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => navigate("/sessions")}
            >
              📅 Scheduled Sessions
            </li>
            <li 
              className="p-2 mt-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => navigate("/my-bookings")}
            >
              📖 My Bookings
            </li>
            <li 
              className="p-2 mt-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              ⚙️ Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Home</h1>
          <div className="bg-white p-3 rounded-md shadow text-gray-600 flex items-center">
            📅 <span className="ml-2">Today's Date: {todayDate}</span>
          </div>
        </div>
        
        <div className="bg-blue-100 p-6 rounded-md mt-5 flex items-center">
          <div>
            <h2 className="text-xl font-bold">Welcome!</h2>
            <p className="text-gray-600">
              Haven't any idea about doctors? No problem, jump to "All Doctors" or "Sessions"
              to track your past and future appointment history.
            </p>
            <div className="mt-3 flex items-center bg-white p-2 rounded-md shadow-md">
              <input
                type="text"
                placeholder="Search Doctor and We will Find The Session Available"
                className="flex-1 p-2 outline-none"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
            </div>
          </div>
        </div>
        
        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-4 mt-5">
          <div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">{appointments.length}</p>
              <p className="text-gray-600">All Doctors</p>
            </div>
            <FaUserMd className="text-blue-500 text-2xl" />
          </div>
          <div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">{appointments.length}</p>
              <p className="text-gray-600">My Appointments</p>
            </div>
            <FaUserInjured className="text-blue-500 text-2xl" />
          </div>
          <div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">1</p>
              <p className="text-gray-600">New Booking</p>
            </div>
            <FaCalendarCheck className="text-blue-500 text-2xl" />
          </div>
          <div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">0</p>
              <p className="text-gray-600">Today Sessions</p>
            </div>
            <FaClock className="text-blue-500 text-2xl" />
          </div>
        </div>

        {/* Upcoming Booking Table */}
        <div className="mt-5">
          <h2 className="text-lg font-bold">Your Upcoming Booking</h2>
          <div className="bg-white p-5 rounded-md shadow-md mt-3">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Appoint. Number</th>
                  <th className="p-2 text-left">Session Title</th>
                  <th className="p-2 text-left">Doctor</th>
                  <th className="p-2 text-left">Scheduled Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4">No upcoming bookings</td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="p-2">{appointment.appointmentNumber}</td>
                      <td className="p-2">{appointment.sessionTitle}</td>
                      <td className="p-2">{appointment.doctor}</td>
                      <td className="p-2">{appointment.scheduledTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
