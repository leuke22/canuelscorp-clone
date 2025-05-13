import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

export const useUserAuth = create((set, get) => ({
  user: null,
  isLoading: false,
  checkingAuth: true,
  isUserFirstVisit: true,
  isAuthenticated: false,

  userEmail: null,
  isVerifiedOtpSuccess: false,

  userResetPassEmail: null,
  isResetPassOtpSuccess: false,

  isUpdateError: false,

  signup: async ({
    fullname,
    username,
    email,
    password,
    confirmPassword,
    phone,
  }) => {
    set({ isLoading: true });

    if (password !== confirmPassword) {
      set({ isLoading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", {
        fullname,
        username,
        email,
        password,
        phone,
      });
      set({
        user: res.data,
        userEmail: res.data.email,
        isAuthenticated: true,
        isLoading: false,
        isUserFirstVisit: false,
      });
      toast.success(res.data.message || "Signup successful!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in signup";
      toast.error(toastMessage);
      throw error;
    }
  },

  verifyOtp: async ({ email, otp }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/verifyOtp", { email, otp });
      set({
        user: res.data,
        isLoading: false,
        isUserFirstVisit: false,
        isAuthenticated: true,
        isVerifiedOtpSuccess: true,
      });
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in verification";
      toast.error(toastMessage);
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({
        user: res.data,
        userEmail: res.data.email,
        isAuthenticated: true,
        isLoading: false,
        isUserFirstVisit: false,
      });
      toast.success(res.data.message || "Login successful!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in login";
      toast.error(toastMessage);
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null, isLoading: false });
      toast.success("Logout successful!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in logout";
      toast.error(toastMessage);
      throw error;
    }
  },

  getProfile: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false, isAuthenticated: true });
    } catch (error) {
      set({ checkingAuth: false, user: null, isAuthenticated: false });
      if (error.response?.status !== 401) {
        console.error("Profile fetch error:", error);
      }
      throw error;
    }
  },

  sendVerificationOtp: async ({ email }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/sendVerification", { email });
      set({ userEmail: res.data.email, isLoading: false });
      toast.success(res.data.message || "OTP sent successfully!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in sending OTP";
      toast.error(toastMessage);
    }
  },

  updateUser: async (
    fullname,
    username,
    email,
    phone,
    currentPassword,
    newPassword,
    confirmNewPassword,
    address,
    profileImg
  ) => {
    set({ isLoading: true });

    if (newPassword !== confirmNewPassword) {
      set({ isLoading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/update", {
        username,
        fullname,
        email,
        currentPassword,
        newPassword,
        phone,
        address,
        profileImg,
      });
      set({ user: res.data, isLoading: false, isUpdateError: false });
      toast.success(res.data.message || "Update successful!");
    } catch (error) {
      set({ isLoading: false, isUpdateError: true });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in update";
      toast.error(toastMessage);
    }
  },

  requestResetPassword: async (email) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/resetPasswordOtp", { email });
      set({
        userResetPassEmail: res.data.email,
        isLoading: false,
      });
      toast.success(
        res.data.message || "Reset password OTP sent successfully!"
      );
      console.log(res.data);
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in sending reset password link";
      toast.error(toastMessage);
    }
  },

  resetPassword: async (email, resetOtp, newPassword, confirmNewPassword) => {
    set({ isLoading: true });

    if (newPassword !== confirmNewPassword) {
      set({ isLoading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/resetPassword", {
        email,
        resetOtp,
        newPassword,
        confirmNewPassword,
      });
      set({ isLoading: false, isResetPassOtpSuccess: true });
      toast.success(res.data.message || "Reset password successful!");
    } catch (error) {
      set({ isLoading: false, isResetPassOtpSuccess: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in reset password";
      toast.error(toastMessage);
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });
    try {
      const response = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserAuth.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
