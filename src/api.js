import axios from "axios";

// Base API Configuration
const API = axios.create({
  baseURL: "http://localhost:8000/api", // Update for production
  withCredentials: true, // Ensures cookies are sent with each request
  headers: {
    "Content-Type": "application/json",
  },
});

// 🛠️ Error Handling Helper
const handleError = (error, defaultMessage) => {
  console.error("API Error:", error.response || error);

  if (
    error.response?.status === 401 &&
    error.response.data?.message.includes("Unauthorized")
  ) {
    console.warn("Auth issue detected. Redirecting to login...");
    window.location.href = "/login"; // Redirecting to login if unauthorized
  }

  return error.response?.data || { success: false, message: defaultMessage };
};

// 🟢 Signup API
export const signup = async ({ email, password, confirmPassword }) => {
  try {
    const response = await API.post("/auth/signup", {
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    return handleError(error, "Signup failed. Please check your details.");
  }
};

// 🟢 Login API
export const signin = async ({ email, password }) => {
  try {
    const response = await API.post("/auth/signin", {
      email,
      password,
    });

    // The login API typically sends back the session cookie automatically
    return response.data;
  } catch (error) {
    return handleError(error, "Signin failed. Please check your credentials.");
  }
};

// 🟢 Fetch User Profile (Including Google OAuth Users)
export const getUserProfile = async () => {
  try {
    const response = await API.get("/users/profile");
    return response.data;
  } catch (error) {
    return handleError(error, "Profile fetch failed. Please try again.");
  }
};

// 🟢 Google OAuth: Fetch Authenticated User
export const getGoogleUser = async () => {
  try {
    const response = await API.get("/auth/google/success");
    return response.data;
  } catch (error) {
    return handleError(error, "Google login failed.");
  }
};

// 🔴 Logout API
export const signout = async () => {
  try {
    await API.post("/auth/signout"); // Logs out the user on the server-side (removes session cookie)
    localStorage.removeItem("auth"); // Optional: clear local storage if needed
    localStorage.removeItem("userRole"); // Optional: clear role
  } catch (error) {
    console.error("Logout failed", error);
  }
};

// 🟢 Forgot Password: Request Verification Code
export const requestForgotPassword = async (email) => {
  try {
    const response = await API.patch("/auth/send-forgot-password-code", { email });
    return response.data;
  } catch (error) {
    return handleError(error, "Failed to send verification code.");
  }
};

// 🟢 Forgot Password: Verify Code & Reset Password
export const verifyForgotPassword = async (email, providedCode, newPassword) => {
  try {
    const response = await API.patch("/auth/verify-forgot-password-code", {
      email,
      providedCode,
      newPassword,
    });
    return response.data;
  } catch (error) {
    return handleError(error, "Failed to reset password. Please try again.");
  }
};

// 🟢 Test Backend Connection
export const testConnection = async () => {
  try {
    const response = await API.get("/test");
    console.log("✅ Backend is connected:", response.data);
  } catch (error) {
    console.error("❌ Cannot connect to backend:", error);
  }
};

export default API;
