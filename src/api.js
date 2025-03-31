import axios from "axios";

// Base API Configuration
const API = axios.create({
  baseURL: "http://localhost:8000/api", // Update for production
  withCredentials: true, // Enables session cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// 🛠️ Error Handling Helper
const handleError = (error, defaultMessage) => {
  console.error("API Error:", error.response || error);

  // 🛑 Prevent clearing tokens unless explicitly an authentication issue
  if (error.response?.status === 401 && error.response.data?.message.includes("Unauthorized")) {
    console.warn("Auth issue detected. Redirecting to login...");
    localStorage.removeItem("authToken"); // 🔥 Remove ONLY on auth errors
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // 🔴 Redirect on auth failure
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
export const signin = async ({ email, password, rememberMe }) => {
  try {
    const response = await API.post("/auth/signin", {
      email,
      password,
      rememberMe,
    });

    if (response.data.success) {
      const { token, role } = response.data;

      localStorage.setItem("auth", "true");
      localStorage.setItem("userRole", role);

      if (rememberMe) {
        localStorage.setItem("authToken", token);
      } else {
        sessionStorage.setItem("authToken", token);
      }
    }

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
    
    if (response.data.success) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("userRole", response.data.role);
    }
    
    return response.data;
  } catch (error) {
    return handleError(error, "Google login failed.");
  }
};

// 🔴 Logout API
export const signout = async () => {
  try {
    await API.post("/auth/signout");
    localStorage.clear();
    sessionStorage.clear();
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

// 🟠 Token Refresh Logic
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

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

        // ❌ The issue: It redirects to login on *any* error (even validation errors)
        if (error.response?.data?.message.includes("Unauthorized")) {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);



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
