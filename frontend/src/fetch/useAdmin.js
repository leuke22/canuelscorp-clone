import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

export const useAdmin = create((set) => ({
  users: [],
  isLoading: false,
  isFetchLoading: false,
  userCount: 0,

  getUsers: async (roleFilter = "All") => {
    set({ isFetchLoading: true });
    try {
      const res = await axios.get(
        `/admin/users${roleFilter !== "All" ? `?role=${roleFilter}` : ""}`
      );

      set({
        users: res.data.users || [],
        userCount: res.data.count || 0,
        isFetchLoading: false,
      });

      if (res.data.message && res.data.users.length === 0) {
        toast.success(res.data.message);
      }
    } catch (error) {
      set({ isFetchLoading: false, users: [] });
      if (error.response?.status !== 403) {
        console.error("Error fetching users:", error);
        toast.error(error.response?.data?.message || "No users found");
      }
      throw error;
    }
  },

  deleteUsers: async (userIds) => {
    set({ isLoading: true });
    try {
      const res = await axios.delete("/admin/users", { data: { userIds } });

      set((state) => ({
        users: state.users.filter((user) => !userIds.includes(user._id)),
        userCount: state.users.length,
        isLoading: false,
      }));

      toast.success(res.data.message);
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || "Failed to delete users");
      throw error;
    }
  },

  updateUserRole: async (userId, newRole) => {
    set({ isLoading: true });
    try {
      const res = await axios.patch("/admin/users/role", {
        userId,
        newRole,
      });

      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        ),
        isLoading: false,
      }));

      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      set({ isLoading: false });
      toast.error(
        error.response?.data?.message || "Failed to update user role"
      );
      throw error;
    }
  },
}));
