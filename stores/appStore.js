import FontAwesome from "@expo/vector-icons/FontAwesome";
import { create } from "zustand";

const useAppStore = create((set) => ({
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),

  submittedPrompt: "",
  setSubmittedPrompt: (submittedPrompt) => set({ submittedPrompt }),

  status: "idle",
  setStatus: (status) => set({ status }),

  selectedStyle: {
    id: "none",
    label: "No Style",
    icon: <FontAwesome name="ban" size={40} color="white" />,
  },
  setSelectedStyle: (selectedStyle) => set({ selectedStyle }),
}));

export default useAppStore;
