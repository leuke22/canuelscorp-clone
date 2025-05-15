import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

export const useProducts = create((set, get) => ({
  products: [],
  isLoading: false,

  isFetchLoading: false,

  isDeleteLoading: false,

  setProducts: (products) => set({ products }),

  createProducts: async (image, name, category, description) => {
    set({ isLoading: true });

    if (!image) {
      set({ isLoading: false });
      toast.error("Image is required");
      return;
    }

    if (!name || !description) {
      set({ isLoading: false });
      toast.error("Product name and description are required");
      return;
    }

    if (category) {
      if (
        category !== "Pork" &&
        category !== "Chicken" &&
        category !== "Beef"
      ) {
        set({ isLoading: false });
        toast.error("Invalid category");
        return;
      }
    }

    try {
      const res = await axios.post("/products/create", {
        image,
        name,
        category,
        description,
      });
      set((state) => ({
        products: [...state.products, res.data.product],
        isLoading: false,
      }));
      toast.success(res.data.message || "Product created successfully!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in creating product";
      toast.error(toastMessage);
    }
  },

  getProducts: async () => {
    set({ isFetchLoading: true });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.products, isFetchLoading: false });
    } catch (error) {
      set({ isFetchLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in fetching products";
      toast.error(toastMessage);
    }
  },

  updateProduct: async (id, image, name, category, description) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`/products/update/${id}`, {
        id,
        image,
        name,
        category,
        description,
      });
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? res.data.product : product
        ),
        isLoading: false,
      }));
      toast.success(res.data.message || "Product updated successfully!");
    } catch (error) {
      set({ isLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in updating product";
      toast.error(toastMessage);
    }
  },

  deleteProduct: async (ids) => {
    set({ isDeleteLoading: true });
    try {
      if (Array.isArray(ids)) {
        if (ids.length === 0) {
          set({ isDeleteLoading: false });
          return;
        }

        const res = await axios.post("/products/delete-multiple", { ids });

        set((state) => ({
          products: state.products.filter(
            (product) => !ids.includes(product._id)
          ),
          isDeleteLoading: false,
        }));

        toast.success(
          res.data.message || `${ids.length} products deleted successfully!`
        );
      } else {
        const res = await axios.delete(`/products/delete/${ids}`);

        set((state) => ({
          products: state.products.filter((product) => product._id !== ids),
          isDeleteLoading: false,
        }));

        toast.success(res.data.message || "Product deleted successfully!");
      }
    } catch (error) {
      set({ isDeleteLoading: false });
      const toastMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "An error occurred in deleting product";
      toast.error(toastMessage);
    }
  },

  getCategory: async (category) => {
    set({ isFetchLoading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.products, isFetchLoading: false });
    } catch (error) {
      set({ isFetchLoading: false });
      const toastMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred in fetching products";
      toast.error(toastMessage);
    }
  },
}));
