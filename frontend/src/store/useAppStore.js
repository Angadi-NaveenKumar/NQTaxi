import { create } from 'zustand';

export const useAppStore = create((set) => ({
  isOnboarded: false,
  isAuthenticated: false,
  role: 'rider',
  selectedPickup: 'MG Road, Bengaluru',
  selectedDrop: 'Kempegowda Airport',
  walletBalance: 1240,
  unreadNotifications: 4,
  setOnboarded: (value) => set({ isOnboarded: value }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setRole: (role) => set({ role }),
  swapTrip: () =>
    set((state) => ({
      selectedPickup: state.selectedDrop,
      selectedDrop: state.selectedPickup,
    })),
}));
