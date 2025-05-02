import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
