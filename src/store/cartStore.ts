import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TCartItem } from "../lib/types";

type CartStore = {
  cart: TCartItem[];
  totalPrice: number;
  isOpen: boolean;
  couponErrorMessage: string;
  setCouponErrorMessage: (message: string) => void;

  setTotalPrice: (totalPrice: number) => void;
  addToCart: (product: TCartItem) => void;
  addQuantity: (cartItemID: string) => void;
  removeQuantity: (cartItemID: string) => void;
  removeFromCart: (cartItemId: string) => void;
  setIsOpen: (open: boolean) => void;
  validateCoupon: (coupon: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      totalPrice: 0,
      couponErrorMessage: "",
      setCouponErrorMessage: (message) => {
        set(() => ({ couponErrorMessage: message }));
      },

      setTotalPrice: (totalPrice) => set(() => ({ totalPrice: totalPrice })),
      addQuantity: (cartItemID) =>
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === cartItemID
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          return { cart: updatedCart };
        }),

      removeQuantity: (cartItemID) =>
        set((state) => {
          const updatedCart = state.cart
            .map((item) =>
              item.id === cartItemID
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0);
          return { cart: updatedCart };
        }),
      addToCart: (product) =>
        set((state) => {
          const existingProductId = state.cart.findIndex(
            (item) =>
              item.productId === product.productId &&
              item.color === product.color &&
              item.size === product.size
          );
          if (existingProductId !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingProductId].quantity += product.quantity;
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, product] };
          }
        }),
      removeFromCart: (cartItemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== cartItemId),
        })),
      clearCart: () =>
        set(() => ({
          cart: [],
        })),
      setIsOpen: (open) =>
        set(() => ({
          isOpen: open,
        })),
      validateCoupon: async (coupon) => {
        const response = await fetch(
          "https://corvey-backend-production.up.railway.app/api/coupons/validate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: coupon,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        set((state) => ({
          totalPrice:
            state.totalPrice - (state.totalPrice * data.discount) / 100,
        }));
      },
    }),

    {
      name: "cart-storage", // localStorage key
    }
  )
);
