import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

export const useUserInquire = create((set) => ({
  userInquires: [],
  isLoading: false,

  isFetchLoading: false,

  userInquire: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/userinquire", {
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        message: formData.message,
      });
      set({ userInquires: res.data, isLoading: false });
      toast.success("Inquiry submitted successfully!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response?.data?.error || "Failed to submit inquiry";
      toast.error(toastMessage);
      throw error;
    }
  },

  getUserInquires: async () => {
    set({ isFetchLoading: true });
    try {
      const res = await axios.get("/userinquire/get");
      set({
        userInquires: res.data.inquiries || [],
        isFetchLoading: false,
      });
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      set({ isFetchLoading: false, userInquires: [] });
      toast.error(error.response?.data?.message || "Failed to fetch inquiries");
    }
  },

  deleteUserInquire: async (ids) => {
    set({ isLoading: true });
    try {
      const res = await axios.delete("/userinquire/delete", {
        data: { ids: Array.isArray(ids) ? ids : [ids] },
      });

      set((state) => ({
        userInquires: state.userInquires.filter(
          (inquiry) => !ids.includes(inquiry._id)
        ),
        isLoading: false,
      }));

      toast.success(res.data.message || "Inquiries deleted successfully!");
    } catch (error) {
      set({ isLoading: false });
      const errorMessage =
        error.response?.data?.error || "Failed to delete inquiries";
      toast.error(errorMessage);
      throw error;
    }
  },
}));
