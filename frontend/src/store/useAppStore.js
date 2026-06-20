import { create } from "zustand";
import { persist } from "zustand/middleware";

// Driver onboarding and status types
const DRIVER_STATUS = {
  OFFLINE: "OFFLINE",
  ONLINE: "ONLINE",
  BUSY: "BUSY",
};

export const useAppStore = create(
  persist(
    (set) => ({
      // Existing state
      isOnboarded: false,
      isAuthenticated: false,
      role: "rider",
      selectedPickup: "MG Road, Bengaluru",
      selectedDrop: "Kempegowda Airport",
      walletBalance: 1240,
      unreadNotifications: 4,

      // New driver-specific state
      driver: {
        isOtpVerified: false,
        profileCompleted: false,
        documentsCompleted: false,
        status: DRIVER_STATUS.OFFLINE,
        hasActiveTrip: false,
        profile: {},
        documents: {},
      },

      // Existing setters
      setOnboarded: (value) => set({ isOnboarded: value }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setRole: (role) => set({ role }),
      swapTrip: () =>
        set((state) => ({
          selectedPickup: state.selectedDrop,
          selectedDrop: state.selectedPickup,
        })),

      // New driver-specific setters
      setDriverOtpVerified: (value) =>
        set((state) => ({ driver: { ...state.driver, isOtpVerified: value } })),
      setDriverProfileCompleted: (value) =>
        set((state) => ({
          driver: { ...state.driver, profileCompleted: value },
        })),
      setDriverDocumentsCompleted: (value) =>
        set((state) => ({
          driver: { ...state.driver, documentsCompleted: value },
        })),
      setDriverStatus: (status) =>
        set((state) => ({ driver: { ...state.driver, status } })),
      setDriverHasActiveTrip: (hasActiveTrip) =>
        set((state) => ({ driver: { ...state.driver, hasActiveTrip } })),
      setDriverProfile: (profile) =>
        set((state) => ({ driver: { ...state.driver, profile } })),
      setDriverDocuments: (documents) =>
        set((state) => ({ driver: { ...state.driver, documents } })),
      resetDriverState: () =>
        set({
          driver: {
            isOtpVerified: false,
            profileCompleted: false,
            documentsCompleted: false,
            status: DRIVER_STATUS.OFFLINE,
            hasActiveTrip: false,
            profile: {},
            documents: {},
          },
        }),
    }),
    {
      name: "nqtaxi-app-store",
      partialize: (state) => ({ driver: state.driver, role: state.role }),
    }
  )
);

export { DRIVER_STATUS };
