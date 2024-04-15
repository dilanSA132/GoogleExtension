import create from 'zustand';

interface ButtonStore {
  selectedButton: string | null;
  setSelectedButton: (buttonName: string) => void;
}

const useButtonStore = create<ButtonStore>((set) => ({
  selectedButton: null,
  setSelectedButton: (buttonName: string) => set({ selectedButton: buttonName }),
}));

export default useButtonStore;
