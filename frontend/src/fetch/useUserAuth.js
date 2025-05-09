import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

export const useUserAuth = create((set) => ({
  user: null,
  isLoading: false,
  checkingAuth: true,
  isAuthenticated: false,
  userEmail: null,

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
      console.log(res.data);
      set({
        user: res.data,
        userEmail: res.data.email,
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success(res.data.message || "Signup successful!");
      return;
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
      set({ user: res.data, isAuthenticated: true, isLoading: false });
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
      set({ user: res.data, isAuthenticated: true, isLoading: false });
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
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
      if (!error.response || error.response.status !== 401) {
        const toastMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "An error occurred in getting profile";
        toast.error(toastMessage);
      }
      throw error;
    }
  },

  sendVerificationOtp: async ({ email }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/sendVerification", { email });
      set({ userEmail: res.data.email, isUserAuth: true, isLoading: false });
      toast.success(res.data.message || "OTP sent successfully!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in sending OTP";
      toast.error(toastMessage);
      throw error;
    }
  },
}));
