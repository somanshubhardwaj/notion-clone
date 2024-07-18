import { create } from "zustand";
type CoverState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useCover = create<CoverState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
