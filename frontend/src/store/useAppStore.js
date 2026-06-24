import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Driver onboarding and status types
const DRIVER_STATUS = {
  OFFLINE: "OFFLINE",
  ONLINE: "ONLINE",
  BUSY: "BUSY",
};

const ONBOARDING_STEPS = {
  STEP_1_PROFILE_SETUP: "STEP_1_PROFILE_SETUP",
  STEP_2_DOCUMENT_VERIFICATION: "STEP_2_DOCUMENT_VERIFICATION",
  STEP_3_DASHBOARD_ACCESS: "STEP_3_DASHBOARD_ACCESS",
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
        onboardingStep: ONBOARDING_STEPS.STEP_1_PROFILE_SETUP,
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
          driver: {
            ...state.driver,
            profileCompleted: value,
            onboardingStep: value
              ? ONBOARDING_STEPS.STEP_2_DOCUMENT_VERIFICATION
              : ONBOARDING_STEPS.STEP_1_PROFILE_SETUP,
          },
        })),
      setDriverDocumentsCompleted: (value) =>
        set((state) => ({
          driver: {
            ...state.driver,
            documentsCompleted: value,
            onboardingStep: value
              ? ONBOARDING_STEPS.STEP_3_DASHBOARD_ACCESS
              : ONBOARDING_STEPS.STEP_2_DOCUMENT_VERIFICATION,
          },
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
            onboardingStep: ONBOARDING_STEPS.STEP_1_PROFILE_SETUP,
            status: DRIVER_STATUS.OFFLINE,
            hasActiveTrip: false,
            profile: {},
            documents: {},
          },
        }),
    }),
    {
      name: "nqtaxi-app-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ driver: state.driver, role: state.role }),
    }
  )
);

export { DRIVER_STATUS, ONBOARDING_STEPS };
