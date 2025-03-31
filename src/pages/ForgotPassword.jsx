import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestForgotPassword, verifyForgotPassword } from "../api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import forgotBg from "../assets/images/bg.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [providedCode, setProvidedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle sending verification code
  const handleResetRequest = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await requestForgotPassword(email);
      if (response.success) {
        setMessage("A verification code has been sent to your email.");
        setStep(2);
      } else {
        setError(response.message || "Failed to send verification code.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  // Handle verifying code and resetting password
  const handleVerifyCodeAndReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    try {
      const response = await verifyForgotPassword(email, providedCode, newPassword);
  
      if (response.success) {
        setMessage("Password has been reset successfully. Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(response.message || "Failed to reset password.");
      }
    } catch (error) {
      // ❌ Prevent redirect when there's a validation error
      setError(error.message || "Something went wrong. Please check your input.");
    }
  };
  
  

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 h-full items-center justify-center shadow-lg">
        <img
          src={forgotBg}
          alt="Forgot Password"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-8 md:px-16 shadow-2xl border border-gray-200 h-screen">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
            {step === 1 ? "Forgot Password?" : "Reset Password"}
          </h2>
          {message && (
            <p className="text-green-600 bg-green-100 p-3 rounded-lg text-center shadow">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center shadow">
              {error}
            </p>
          )}
          {step === 1 ? (
            <form onSubmit={handleResetRequest} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white shadow-md focus:ring-4 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700"
              >
                Send Verification Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCodeAndReset} className="space-y-4">
              <input
                type="text"
                placeholder="Enter verification code"
                value={providedCode}
                onChange={(e) => setProvidedCode(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white shadow-md focus:ring-4 focus:ring-blue-500"
                required
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-white shadow-md focus:ring-4 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)} // Properly toggles state
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? (
                    <AiOutlineEye size={22} />
                  ) : (
                    <AiOutlineEyeInvisible size={22} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700"
              >
                Reset Password
              </button>
            </form>
          )}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
