import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";
import { useCart } from "./useCart";

export const useOrder = create((set, get) => ({
  orders: [],
  isLoading: false,

  isFetchLoading: false,

  orderItemCount: 0,

  placeOrder: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/orders/place-order");
      set({ isLoading: false });
      return res.data;
    } catch (error) {
      set({ isLoading: false });
      const errorMessage =
        error.response?.data?.message || "Failed to place order";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  getOrders: async () => {
    set({ isFetchLoading: true });
    try {
      const res = await axios.get("/orders");
      set({
        orders: Array.isArray(res.data.order) ? res.data.order : [],
        orderItemCount: res.data.count || 0,
        isFetchLoading: false,
      });
    } catch (error) {
      set({ isFetchLoading: false, orders: [] });
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId, newStatus) => {
    set({ isLoading: true });
    try {
      const res = await axios.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ),
        isLoading: false,
      }));
      toast.success("Order status updated successfully");
      return res.data.order;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.error || "Error updating order status");
      throw error;
    }
  },

  deleteOrders: async (orderIds) => {
    set({ isLoading: true });
    try {
      await Promise.all(orderIds.map((id) => axios.delete(`/orders/${id}`)));

      set((state) => ({
        orders: state.orders.filter((order) => !orderIds.includes(order._id)),
        isLoading: false,
      }));

      toast.success(`${orderIds.length} order(s) deleted successfully`);
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.error || "Error deleting orders");
      throw error;
    }
  },
}));
