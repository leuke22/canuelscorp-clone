import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

export const useUserAuth = create((set) => ({
  user: null,
  isLoading: false,

  // for email verification
  checkingAuth: true,
  userEmail: null,
  isUserAuth: false,

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
      console.log(res.data.email);
      set({ user: res.data, userEmail: res.data.email, isLoading: false });
      toast.success(res.data.message || "Signup successful!");
      return;
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred";
      toast.error(toastMessage);
      throw error;
    }
  },

  verifyOtp: async ({ email, otp }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/verifyOtp", { email, otp });
      set({ user: res.data, isUserAuth: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred";
      toast.error(toastMessage);
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, isLoading: false });
      toast.success(res.data.message || "Login successful!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred";
      toast.error(toastMessage);
      throw error;
    }
  },
}));
