import { create } from "zustand";

interface NewsletterState {
  emailInput: string;
  errorMessage: string;
  successMessage: string;
  isLoading: boolean;
  setEmailInput: (email: string) => void;
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
  setIsLoading: (loading: boolean) => void;
  resetMessages: () => void;
}

export const useNewsletterStore = create<NewsletterState>((set) => ({
  emailInput: "",
  errorMessage: "",
  successMessage: "",
  isLoading: false,
  setEmailInput: (email) => set({ emailInput: email }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  setSuccessMessage: (message) => set({ successMessage: message }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  resetMessages: () => set({ errorMessage: "", successMessage: "" }),
}));
