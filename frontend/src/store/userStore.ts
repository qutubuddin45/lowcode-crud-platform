import { create } from "zustand";

interface UserState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: localStorage.getItem("token"),
  setToken: (token) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    set({ token });
  },
}));
