// import { useNavigate } from "react-router-dom";

// const StaffDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     localStorage.removeItem("userRole");
//     navigate("/login");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>
//       <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
//         Logout
//       </button>
//     </div>
//   );
// };

// export default StaffDashboard;



import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarPlus } from "react-icons/fa";

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-5 shadow-md">
        <h1 className="text-2xl font-bold mb-5">Doctor's Side</h1>
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-semibold">Test Doctor</p>
              <p className="text-sm text-gray-500">doctor@edoc.com</p>
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="w-full bg-red-500 text-white py-2 rounded mb-4">
          Log out
        </button>
        <ul className="space-y-4">
          <li><button className="text-blue-600 font-semibold">Dashboard</button></li>
          <li><button>My Appointments</button></li>
          <li><button>My Sessions</button></li>
          <li><button>My Patients</button></li>
          <li><button>Settings</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6 bg-white p-6 rounded shadow-md">
          <h2 className="font-bold text-xl">Welcome!</h2>
          <p className="text-lg font-semibold">Test Doctor.</p>
          <p className="text-gray-500">Thanks for joining with us. We are always trying to get you a complete service. You can view your daily schedule, reach patients' appointments at home!</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">View My Appointments</button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white shadow rounded flex items-center space-x-3">
            <FaUserMd className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-semibold">1</p>
              <p className="text-sm text-gray-500">All Doctors</p>
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded flex items-center space-x-3">
            <FaUsers className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-semibold">2</p>
              <p className="text-sm text-gray-500">All Patients</p>
            </div>
          </div>
          <div className="p-4 bg-white shadow rounded flex items-center space-x-3">
            <FaCalendarPlus className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-semibold">1</p>
              <p className="text-sm text-gray-500">New Booking</p>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-semibold text-lg mb-2">Your Upcoming Sessions until Next Week</h2>
          <p className="text-sm text-gray-500 mb-4">No scheduled sessions found.</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;