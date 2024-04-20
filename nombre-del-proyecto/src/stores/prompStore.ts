import create from 'zustand';

interface PromptStore {
  promptDescription: string;
  setPromptDescription: (description: string) => void;
}
const usePromptStore = create<PromptStore>((set) => ({
  promptDescription: '', 
  setPromptDescription: (description) => set({ promptDescription: description }),
}));

export default usePromptStore;
