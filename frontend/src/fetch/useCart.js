import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

export const useCart = create((set, get) => ({
  cart: [],
  isLoading: false,
  itemCount: 0,

  isFetchLoading: false,

  addToCart: async (productId, quantity) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/cart/add", {
        productId,
        quantity: parseInt(quantity),
      });
      set({
        cart: res.data.cart,
        isLoading: false,
        itemCount: res.data.cart.items.length,
      });
      toast.success(res.data.message || "Product added to cart successfully!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An error occurred in adding product to cart";
      toast.error(toastMessage);
    }
  },

  getCartItems: async () => {
    set({ isFetchLoading: true });
    try {
      const res = await axios.get("/cart");
      set({
        cart: res.data.cart,
        itemCount: res.data.itemCount,
        isFetchLoading: false,
      });
    } catch (error) {
      set({ isFetchLoading: false });
      const toastMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An error occurred in getting cart items";
      toast.error(toastMessage);
    }
  },

  updateCartQuantity: async (productId, quantity) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/cart/update", {
        productId,
        quantity: parseInt(quantity),
      });
      set({
        cart: res.data.cart,
        isLoading: false,
      });
      toast.success("Cart updated successfully!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Error updating cart quantity";
      toast.error(toastMessage);
    }
  },

  deleteProductItem: async (productId) => {
    set({ isLoading: true });
    try {
      const res = await axios.delete(`/cart/delete/${productId}`);
      set({
        cart: res.data.cart,
        itemCount: res.data.cart.items.length,
        isLoading: false,
      });
      toast.success("Product removed from cart successfully!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Error deleting product from cart";
      toast.error(toastMessage);
    }
  },

  clearCart: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.delete("/cart/clear");
      set({
        cart: res.data.cart,
        itemCount: res.data.cart.items.length,
        isLoading: false,
      });
      toast.success("Cart cleared successfully!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Error clearing cart";
      toast.error(toastMessage);
    }
  },

  updateCartAddress: async (address, useDefaultAddress = false) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/cart/update-address", {
        ...address,
        useDefaultAddress,
      });
      set({
        cart: res.data.cart,
        isLoading: false,
      });
      toast.success("Shipping address updated successfully!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Error updating shipping address";
      toast.error(toastMessage);
    }
  },
}));
