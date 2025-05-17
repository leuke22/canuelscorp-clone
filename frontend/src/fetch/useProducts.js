import { create } from "zustand";
import axios from "../utils/axios";
import { toast } from "react-hot-toast";

export const useProducts = create((set, get) => ({
  products: [],
  isLoading: false,

  isFetchLoading: false,
  productCount: 0,

  isDeleteLoading: false,

  bestSelling: [],
  isBestSellingLoading: false,

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
      set({
        products: res.data.products || [],
        productCount: res.data.count || 0,
        isFetchLoading: false,
      });
    } catch (error) {
      set({ isFetchLoading: false, products: [] });
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
      throw error;
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

  deleteProducts: async (productIds) => {
    set({ isLoading: true });
    try {
      const res = await axios.delete("/products", {
        data: { ids: productIds },
      });

      set((state) => ({
        products: state.products.filter(
          (product) => !productIds.includes(product._id)
        ),
        productCount: state.products.length,
        isLoading: false,
      }));

      toast.success(res.data.message);
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || "Failed to delete products");
      throw error;
    }
  },

  getCategory: async (category) => {
    set({ isFetchLoading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({
        products: res.data.products || [],
        productCount: res.data.count || 0,
        isFetchLoading: false,
      });
    } catch (error) {
      set({ isFetchLoading: false, products: [] });
      toast.error(
        error.response?.data?.message || "Failed to fetch category products"
      );
      throw error;
    }
  },

  getBestSelling: async () => {
    set({ isBestSellingLoading: true });
    try {
      const res = await axios.get("/products/best-selling");
      set({
        bestSelling: res.data.products || [],
        isBestSellingLoading: false,
      });
    } catch (error) {
      set({ isBestSellingLoading: false, bestSelling: [] });
      console.error("Error fetching best selling products:", error);
      throw error;
    }
  },
}));
