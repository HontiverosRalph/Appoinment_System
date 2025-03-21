import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import loginBg from "../assets/images/bg.jpg"; // Adjust path if needed

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.username === username && user.password === password) {
      localStorage.setItem("auth", "true");
      if (remember) {
        localStorage.setItem("rememberedUser", JSON.stringify({ username, password }));
      } else {
        localStorage.removeItem("rememberedUser");
      }
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="flex h-screen">
      {/* Image Section (Hidden on Mobile, Visible on Desktop) */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center shadow-lg">
        <img
          src={loginBg} 
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login Form Section (Fully Centered on Mobile) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-8 md:px-16 shadow-2xl border border-gray-200 h-screen">
        <div className="w-full max-w-sm">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 md:mb-8 text-gray-900 text-center md:text-left">
            SIGN IN
          </h2>

          {error && (
            <p className="text-red-600 text-md md:text-lg w-full text-center bg-red-100 p-3 md:p-4 rounded-lg shadow">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-4 md:space-y-6">
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 md:p-4 text-md md:text-lg border rounded-lg bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 md:p-4 text-md md:text-lg border rounded-lg bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
              required
            />
            <div className="flex items-center justify-between text-gray-700 text-md md:text-lg">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="mr-2 accent-blue-600 w-4 h-4 md:w-5 md:h-5"
                />
                Remember me
              </label>
              <button className="text-blue-600 hover:underline transition duration-200 text-md md:text-lg">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 md:p-4 rounded-lg text-lg md:text-xl font-semibold shadow-lg hover:bg-blue-700 hover:scale-[1.03] transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-6 md:my-8 w-full">
            <div className="w-full border-t shadow-md"></div>
            <span className="px-3 md:px-4 text-gray-500 text-md md:text-lg">OR</span>
            <div className="w-full border-t shadow-md"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border p-3 md:p-4 rounded-lg bg-white text-lg md:text-xl font-semibold shadow-lg hover:bg-gray-100 hover:scale-[1.03] transition duration-300"
          >
            <FcGoogle className="mr-3 md:mr-4 text-2xl md:text-3xl" /> Continue with Google
          </button>

          <p className="text-gray-700 text-md md:text-lg mt-6 md:mt-8 text-center">
            Don't have an account?{" "}
            <button className="text-blue-600 font-semibold hover:underline transition duration-200">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
