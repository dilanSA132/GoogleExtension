import create from 'zustand';

interface ButtonStore {
  selectedButton: string | null;
  isLoading: boolean; 
  setSelectedButton: (buttonName: string) => void;
  setIsLoading: (loading: boolean) => void; 
}

const useButtonStore = create<ButtonStore>((set) => ({
  selectedButton: null,
  isLoading: false, 
  setSelectedButton: (buttonName: string) => set({ selectedButton: buttonName }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }), 
}));

export default useButtonStore;
