import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import loginBg from "../assets/images/bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signin",
        { email, password, rememberMe: remember },
        { withCredentials: true }
      );

      if (response.data.success) {
        const { token, role } = response.data;
        localStorage.setItem("auth", JSON.stringify(token));
        localStorage.setItem("userRole", role);

        if (remember) {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({ email, password })
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }

        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "staff") {
          navigate("/staff-dashboard");
        } else {
          navigate("/patient-dashboard");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Authentication Handler
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/auth/google",
        { withCredentials: true }
      );

      if (response.data.success) {
        const { token, role } = response.data;
        localStorage.setItem("auth", JSON.stringify(token));
        localStorage.setItem("userRole", role);

        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "staff") {
          navigate("/staff-dashboard");
        } else {
          navigate("/patient-dashboard");
        }
      }
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 h-full items-center justify-center shadow-lg">
        <img src={loginBg} alt="Login Illustration" className="w-full h-full object-cover" />
      </div>
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
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 md:p-4 border rounded-lg bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
              required
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white shadow-md focus:ring-4 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
              >
                {showPassword ? (
                  <AiOutlineEye size={22} />
                ) : (
                  <AiOutlineEyeInvisible size={22} />
                )}
              </button>
            </div>

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
              <button
                type="button"
                className="text-blue-600 hover:underline transition duration-200"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 md:p-4 rounded-lg font-semibold shadow-lg hover:bg-blue-700 hover:scale-[1.03] transition duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="flex items-center my-6 md:my-8 w-full">
            <div className="w-full border-t shadow-md"></div>
            <span className="px-3 md:px-4 text-gray-500">OR</span>
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
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold hover:underline transition duration-200"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
