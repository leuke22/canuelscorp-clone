import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

export const useUserAuth = create((set) => ({
  user: null,
  isLoading: false,
  checkingAuth: true,
  isUserFirstVisit: true,
  isAuthenticated: false,
  userEmail: null,
  isVerifiedOtpSuccess: false,

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
}));
