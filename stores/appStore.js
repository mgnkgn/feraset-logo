import { create } from "zustand";

const useAppStore = create((set) => ({
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),

  submittedPrompt: "",
  setSubmittedPrompt: (submittedPrompt) => set({ submittedPrompt }),

  status: "idle",
  setStatus: (status) => set({ status }),

  selectedStyle: null,
  setSelectedStyle: (selectedStyle) => set({ selectedStyle }),
}));

export default useAppStore;
