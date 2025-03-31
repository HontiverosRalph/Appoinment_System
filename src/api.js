import axios from "axios";

// Base API Configuration
const API = axios.create({
  baseURL: "http://localhost:8000/api", // Adjust for production
  withCredentials: true, // Enable session cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// 🛠️ Error Handling Helper
const handleError = (error, defaultMessage) => {
  console.error("API Error:", error.response || error);
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
export const signin = async ({ email, password, rememberMe }) => {
  try {
    const response = await API.post("/auth/signin", {
      email,
      password,
      rememberMe,
    });

    if (response.data.token) {
      if (rememberMe) {
        localStorage.setItem("authToken", response.data.token); // Persistent login
      } else {
        sessionStorage.setItem("authToken", response.data.token); // Temporary session login
      }
    }

    return response.data;
  } catch (error) {
    return handleError(error, "Signin failed. Please check your credentials.");
  }
};

// 🔴 Logout API
export const signout = async () => {
  try {
    await API.post("/auth/signout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

// 🟢 Fetch User Profile
export const getUserProfile = async () => {
  try {
    const response = await API.get("/users/profile");
    return response.data;
  } catch (error) {
    return handleError(error, "Profile fetch failed. Please try again.");
  }
};

// 🟢 Admin: Get all users
export const getAllUsers = async () => {
  try {
    const response = await API.get("/users/all");
    return response.data;
  } catch (error) {
    return handleError(error, "Failed to fetch users. Contact support.");
  }
};

// 🟢 Forgot Password: Request Verification Code
export const requestForgotPassword = async (email) => {
  try {
    const response = await API.patch("/auth/send-forgot-password-code", {
      email,
    }); // Fixed route
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to send verification code.",
    };
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

// 🟠 Token Refresh Logic
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ❌ Only redirect to login if authentication fails (not validation errors)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // ❌ Only redirect if the error is due to authentication
        if (error.response?.data?.message.includes("Unauthorized")) {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);




export default API;
