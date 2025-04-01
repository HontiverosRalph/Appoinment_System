// import { useNavigate } from "react-router-dom";

// const PatientDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     localStorage.removeItem("userRole");
//     navigate("/login");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-4">Patient Dashboard</h1>
//       <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
//         Logout
//       </button>
//     </div>
//   );
// };

// export default PatientDashboard;

import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUserInjured, FaCalendarCheck, FaClock } from "react-icons/fa";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userRole");
    navigate("/login");
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
            <li className="p-2 bg-blue-100 rounded-md">🏠 Home</li>
            <li className="p-2 mt-2 hover:bg-blue-50 cursor-pointer">👨‍⚕️ All Doctors</li>
            <li className="p-2 mt-2 hover:bg-blue-50 cursor-pointer">📅 Scheduled Sessions</li>
            <li className="p-2 mt-2 hover:bg-blue-50 cursor-pointer">📖 My Bookings</li>
            <li className="p-2 mt-2 hover:bg-blue-50 cursor-pointer">⚙️ Settings</li>
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Home</h1>
          <div className="bg-white p-3 rounded-md shadow text-gray-600 flex items-center">
            📅 <span className="ml-2">Today's Date: 2022-06-03</span>
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
              <p className="text-lg font-bold">1</p>
              <p className="text-gray-600">All Doctors</p>
            </div>
            <FaUserMd className="text-blue-500 text-2xl" />
          </div>
          <div className="bg-white p-5 rounded-md shadow-md flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">2</p>
              <p className="text-gray-600">All Patients</p>
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
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">Test Session</td>
                  <td className="p-2">Test Doctor</td>
                  <td className="p-2">2050-01-01 18:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
