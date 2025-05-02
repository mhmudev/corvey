import { create } from "zustand";
import { TProductItem } from "../lib/types";

type ProductsStore = {
  errorMessage: string;
  products: TProductItem[];
  product: TProductItem | null;
  getSpecificProduct: (slug: string) => TProductItem | undefined;
  fetchProducts: () => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<void>;
  resetProduct: () => void;
};

export const useProductsStore = create<ProductsStore>((set, get) => ({
  errorMessage: "",
  products: [],
  product: null,
  getSpecificProduct: (slug: string) => {
    const state = get();
    return state.products.find((product) => product.slug === slug);
  },

  fetchProducts: async () => {
    try {
      const response = await fetch("http://192.168.1.6:5000/api/products");
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);

      set({ products: data });
    } catch (error) {
      set({ errorMessage: "Something Went Wrong" });
    }
  },

  fetchProductBySlug: async (slug: string) => {
    try {
      const response = await fetch(
        `http://192.168.1.6:5000/api/products/${slug}`
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      set({ product: data });
    } catch (error) {
      set({ errorMessage: "Something Went Wrong" });
    }
  },
  resetProduct: () => set({ product: null }),
}));
