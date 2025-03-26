import { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotBg from "../assets/images/bg.jpg"; // Adjust path if necessary

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [providedCode, setProvidedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetRequest = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email) {
      const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit code
      setGeneratedCode(code);
      setMessage(`A verification code has been sent to your email: ${code}`); // Simulate email send
      setStep(2);
      setError("");
    } else {
      setError("No account found with this email.");
      setMessage("");
    }
  };

  const handleVerifyCodeAndReset = (e) => {
    e.preventDefault();
    if (providedCode !== generatedCode) {
      setError("Invalid verification code.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    user.password = newPassword;
    localStorage.setItem("user", JSON.stringify(user));
    setMessage("Your password has been successfully reset.");
    setTimeout(() => navigate("/login"), 3000);
  };

  return (
    <div className="flex h-screen">
      {/* Left Image Section (Hidden on Mobile) */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center shadow-lg">
        <img src={forgotBg} alt="Forgot Password Illustration" className="w-full h-full object-cover" />
      </div>

      {/* Forgot Password Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-8 md:px-16 shadow-2xl border border-gray-200 h-screen">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
            {step === 1 ? "Forgot Password?" : "Reset Password"}
          </h2>
          
          {message && <p className="text-green-600 bg-green-100 p-3 rounded-lg text-center shadow">{message}</p>}
          {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center shadow">{error}</p>}
          
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
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700">
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
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white shadow-md focus:ring-4 focus:ring-blue-500"
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700">
                Reset Password
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button onClick={() => navigate("/login")} className="text-blue-600 font-semibold hover:underline">
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;