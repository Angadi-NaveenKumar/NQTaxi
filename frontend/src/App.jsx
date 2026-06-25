import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import LandingPage from './pages/public/LandingPage';
import Onboarding from './pages/customer/Onboarding';
import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import OTPVerification from './pages/customer/OTPVerification';

import ForgotPassword from "./pages/customer/ForgotPassword";
import ResetPassword from "./pages/customer/ResetPassword";

// New Customer Nav Components
import BottomNavigation from './components/customer/BottomNavigation';
import MoreDrawer from './components/customer/MoreDrawer';
import SidebarNavigation from './components/customer/SidebarNavigation';

// Driver Nav Components
import DriverBottomNavigation from './components/driver/BottomNavigation';
import DriverMoreDrawer from './components/driver/MoreDrawer';
import DriverSidebarNavigation from './components/driver/SidebarNavigation';

// Customer Pages
import Homemapbase from './pages/customer/Homemapbase';
import RideOptions from './pages/customer/RideOptions';
import ConfirmRide from './pages/customer/ConfirmRide';
import DriverOnTheWay from './pages/customer/DriverOnTheWay';
import RideInProgress from './pages/customer/RideInProgress';
import History from './pages/customer/History';
import Notifications from './pages/customer/Notifications';
import Profile from './pages/customer/Profile';
import SOS from './pages/customer/SOS';
import Tracking from './pages/customer/Tracking';
import Wallet from './pages/customer/Wallet';
import ProfileSettings from './pages/customer/ProfileSettings';
import RatingsReviews from './pages/customer/RatingsReviews';
import SavedUpiCards from './pages/customer/SavedUpiCards';
import TripCostSummary from './pages/customer/TripCostSummary';

// Driver Pages
import WalletDashboard from './pages/driver/WalletDashboard';
import DriverProfileSetup from './pages/driver/DriverProfileSetup';
import DocumentVerification from './pages/driver/DocumentVerification';
import DriverHomePage from './pages/driver/DriverHomePage';
import EarningsDashboard from './pages/driver/EarningsDashboard';
import DriverStats from './pages/driver/DriverStats';
import TripHistory from './pages/driver/TripHistory';
import IncentivesBonuses from './pages/driver/IncentivesBonuses';
import BankDetailsPayouts from './pages/driver/BankDetailsPayouts';
import NewRideRequest from "./pages/driver/NewRideRequest";
import RideAccepted from "./pages/driver/RideAccepted";
import NavigationToPickup from "./pages/driver/NavigationToPickup";
import RiderProgressPage from "./pages/driver/RiderProgressPage";
import TripCompletionPage from "./pages/driver/TripCompletionPage";
import TripDetailsPage from "./pages/driver/TripDetailsPage";
import PaymentConfirmationPage from "./pages/driver/PaymentConfirmationPage";
import CustomerRatingPage from "./pages/driver/CustomerRatingPage";


// Admin Pages
import DriverManagement from './pages/admin/DriverManagement';
import Reports from './pages/admin/Reports';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import DashboardView from './pages/admin/DashboardView';
import FleetOverview from './pages/admin/FleetOverview';
import UsersDirectory from './pages/admin/UsersDirectory';
import FareSettingsPage from './pages/admin/FareSettingsPage';
import SupportInboxPage from './pages/admin/SupportInboxPage';
import BookingsTablePage from './pages/admin/BookingsTablePage';

// Components
import BookingSpinner from './components/customer/BookingSpinner';
import { initializeAuthService, logout, restoreAuthSession } from './services/authService';
import { useAppStore, ONBOARDING_STEPS } from './store/useAppStore';

const sampleRide = {
  id: "auto",
  name: "Auto",
  icon: "auto",
  price: 186,
  eta: "3 min",
  time: "28 min",
  seats: 3,
};

function App() {
  const [authReady, setAuthReady] = useState(false);
  const { isAuthenticated, setAuthenticated, role, setRole, resetDriverState } = useAppStore();
  const [step, setStep] = useState("home");
  const [rideData, setRideData] = useState({
    pickup: "",
    destination: "",
    selectedRide: sampleRide,
    paymentMethod: "Cash",
  });

  useEffect(() => {
    initializeAuthService();
    const sessionData = restoreAuthSession();
    if (sessionData) {
      setAuthenticated(true);
      setRole(sessionData.session.role);
    } else {
      setAuthenticated(false);
    }
    setAuthReady(true);
  }, [setAuthenticated, setRole]);

  const navigateToRideOptions = (pickup, destination) => {
    setRideData((current) => ({ ...current, pickup, destination }));
    setStep("rideOptions");
  };

  const onConfirmRide = (selectedRide) => {
    setRideData((current) => ({ ...current, selectedRide }));
    setStep("confirm");
  };

  const onBookingConfirmed = () => {
    setStep("spinner");
    setTimeout(() => setStep("driverOnWay"), 3000);
  };

  const onRatingSubmitted = () => {
    setStep("home");
    setRideData({ pickup: "", destination: "", selectedRide: sampleRide, paymentMethod: "Cash" });
  };

  const renderMainContent = () => {
    if (step === "home") {
      return (
        <Homemapbase
          pickup={rideData.pickup}
          destination={rideData.destination}
          onPickupChange={(val) => setRideData((current) => ({ ...current, pickup: val }))}
          onDestinationChange={(val) => setRideData((current) => ({ ...current, destination: val }))}
          onNavigateToRideOptions={navigateToRideOptions}
        />
      );
    }

    if (step === "rideOptions") {
      return (
        <RideOptions
          pickup={rideData.pickup}
          destination={rideData.destination}
          paymentMethod={rideData.paymentMethod}
          onPaymentChange={(method) => setRideData((current) => ({ ...current, paymentMethod: method }))}
          onBack={() => setStep("home")}
          onConfirm={onConfirmRide}
        />
      );
    }

    if (step === "confirm") {
      return (
        <ConfirmRide
          pickup={rideData.pickup}
          destination={rideData.destination}
          ride={rideData.selectedRide}
          paymentMethod={rideData.paymentMethod}
          onBack={() => setStep("rideOptions")}
          onConfirmBooking={onBookingConfirmed}
        />
      );
    }

    if (step === "spinner") return <BookingSpinner onComplete={() => {}} />;

    if (step === "driverOnWay") {
      return (
        <DriverOnTheWay
          onCall={() => alert("Calling driver...")}
          onMessage={() => alert("Messaging driver...")}
          onShare={() => alert("Sharing ride details...")}
          onCancel={() => setStep("home")}
          onRideStarted={() => setStep("inProgress")}
        />
      );
    }

    if (step === "inProgress") {
      return (
        <RideInProgress
          ride={rideData.selectedRide}
          onCall={() => alert("Calling driver...")}
          onMessage={() => alert("Messaging...")}
          onEndRide={() => setStep("rating")}
        />
      );
    }

    if (step === "rating") return <RatingComplete onSubmit={onRatingSubmitted} />;

    return null;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute isAuthenticated={isAuthenticated} role={role}><LandingPage /></PublicRoute>} />
        <Route path="/onboarding" element={<PublicRoute isAuthenticated={isAuthenticated} role={role}><Onboarding /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute isAuthenticated={isAuthenticated} role={role}><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute isAuthenticated={isAuthenticated} role={role}><Register /></PublicRoute>} />
        <Route path="/otp-verification" element={<PublicRoute isAuthenticated={isAuthenticated} role={role}><OTPVerification /></PublicRoute>} />

        <Route path="/admin/login" element={<AdminLoginRoute />} />



        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Customer Routes */}
        <Route path="/customer/dashboard" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout>{renderMainContent()}</Layout></ProtectedRoute>} />
        <Route path="/customer/ride-options" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><RideOptionsRoute rideData={rideData} setRideData={setRideData} /></Layout></ProtectedRoute>} />
        <Route path="/customer/confirm-ride" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><ConfirmRideRoute rideData={rideData} /></Layout></ProtectedRoute>} />
        <Route path="/customer/booking" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><BookingSpinner onComplete={() => {}} /></Layout></ProtectedRoute>} />
        <Route path="/customer/driver-on-the-way" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><DriverOnTheWayRoute /></Layout></ProtectedRoute>} />
        <Route path="/customer/ride-in-progress" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><RideInProgressRoute ride={rideData.selectedRide} /></Layout></ProtectedRoute>} />
        <Route path="/customer/rating" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><RatingComplete onSubmit={onRatingSubmitted} /></Layout></ProtectedRoute>} />
        <Route path="/customer/history" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><History /></Layout></ProtectedRoute>} />
        <Route path="/customer/notifications" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><Notifications /></Layout></ProtectedRoute>} />
        <Route path="/customer/sos" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><SOS /></Layout></ProtectedRoute>} />
        <Route path="/customer/tracking" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Tracking /></ProtectedRoute>} />
        <Route path="/customer/profile" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/customer/wallet" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><Wallet /></Layout></ProtectedRoute>} />
        <Route path="/customer/profile-settings" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><ProfileSettings /></Layout></ProtectedRoute>} />
        <Route path="/customer/ratings" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><RatingsReviews /></Layout></ProtectedRoute>} />
        <Route path="/customer/payments" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><SavedUpiCards /></Layout></ProtectedRoute>} />
        <Route path="/customer/trips" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><TripCostSummary /></Layout></ProtectedRoute>} />
        <Route path="/customer/drivers" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><DriverManagement /></Layout></ProtectedRoute>} />
        <Route path="/customer/reports" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="rider"><Layout><Reports /></Layout></ProtectedRoute>} />

        {/* Driver Routes */}
        <Route path="/driver/profile-setup" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverProfileGuard><DriverProfileSetup /></DriverProfileGuard></ProtectedRoute>} />
        <Route path="/driver/document-verification" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverDocumentGuard><DocumentVerification /></DriverDocumentGuard></ProtectedRoute>} />
        <Route path="/driver/dashboard" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><DriverHomePage /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/new-request" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><NewRideRequest /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/ride-accepted" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><RideAccepted /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/navigation-pickup" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><NavigationToPickup /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/wallet" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><WalletDashboard /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/earnings" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><EarningsDashboard /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/stats" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><DriverStats /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/history" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><TripHistory /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/incentives" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><IncentivesBonuses /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/payouts" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><BankDetailsPayouts /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/rider-progress" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><RiderProgressPage /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/trip-completion" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><TripCompletionPage /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/trip-details" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><TripDetailsPage /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/payment-confirmation" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><PaymentConfirmationPage /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />
        <Route path="/driver/customer-rating" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="driver"><DriverWorkflowGuard><DriverLayout><CustomerRatingPage /></DriverLayout></DriverWorkflowGuard></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="admin"><AdminDashboardRoute /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="admin"><DashboardViewRoute /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="admin"><UsersDirectoryRoute /></ProtectedRoute>} />
        <Route path="/admin/fleet" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="admin"><FleetOverviewRoute /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="admin"><AnalyticsRoute /></ProtectedRoute>} />
        <Route path="/admin/mail" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="admin"><MailRoute /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="admin"><SettingsRoute /></ProtectedRoute>} />
        <Route path="/admin/calendar" element={<ProtectedRoute authReady={authReady} isAuthenticated={isAuthenticated} role={role} allowedRole="admin"><CalendarRoute /></ProtectedRoute>} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );

}

function getDriverRedirectPath(driver) {
  if (!driver.isOtpVerified) {
    return "/otp-verification";
  }
  if (!driver.profileCompleted || driver.onboardingStep === ONBOARDING_STEPS.STEP_1_PROFILE_SETUP) {
    return "/driver/profile-setup";
  }
  if (!driver.documentsCompleted || driver.onboardingStep === ONBOARDING_STEPS.STEP_2_DOCUMENT_VERIFICATION) {
    return "/driver/document-verification";
  }
  return "/driver/dashboard";
}

function ProtectedRoute({ authReady, isAuthenticated, role, allowedRole, children }) {
  const location = useLocation();
  const { driver } = useAppStore();

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-text">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Role-based redirection
  if (allowedRole === "rider" && role !== "rider") {
    return <Navigate to={role === "driver" ? getDriverRedirectPath(driver) : "/admin"} replace />;
  }
  if (allowedRole === "driver" && role !== "driver") {
    return <Navigate to={role === "rider" ? "/customer/dashboard" : "/admin"} replace />;
  }
  if (allowedRole === "admin" && role !== "admin") {
    return <Navigate to={role === "rider" ? "/customer/dashboard" : getDriverRedirectPath(driver)} replace />;
  }

  return children;
}

function PublicRoute({ isAuthenticated, role, children }) {
  const { driver } = useAppStore();

  if (isAuthenticated) {
    if (role === "driver") {
      return <Navigate to={getDriverRedirectPath(driver)} replace />;
    } else if (role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/customer/dashboard" replace />;
    }
  }

  return children;
}

function DriverProfileGuard({ children }) {
  const { driver } = useAppStore();
  const redirectPath = getDriverRedirectPath(driver);

  if (redirectPath === "/otp-verification") {
    return <Navigate to="/otp-verification" replace />;
  }

  return children;
}

function DriverDocumentGuard({ children }) {
  const { driver } = useAppStore();
  const redirectPath = getDriverRedirectPath(driver);

  if (redirectPath === "/otp-verification" || redirectPath === "/driver/profile-setup") {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

function DriverWorkflowGuard({ children }) {
  const { driver } = useAppStore();
  const redirectPath = getDriverRedirectPath(driver);
  
  if (redirectPath !== "/driver/dashboard") {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

function RideOptionsRoute({ rideData, setRideData }) {
  const navigate = useNavigate();

  return (
    <RideOptions
      pickup={rideData.pickup || "MG Road, Bengaluru"}
      destination={rideData.destination || "Kempegowda Airport"}
      paymentMethod={rideData.paymentMethod}
      onPaymentChange={(method) => setRideData((current) => ({ ...current, paymentMethod: method }))}
      onBack={() => navigate("/customer/dashboard")}
      onConfirm={(selectedRide) => {
        setRideData((current) => ({ ...current, selectedRide }));
        navigate("/customer/confirm-ride");
      }}
    />
  );
}

function ConfirmRideRoute({ rideData }) {
  const navigate = useNavigate();

  return (
    <ConfirmRide
      pickup={rideData.pickup || "MG Road, Bengaluru"}
      destination={rideData.destination || "Kempegowda Airport"}
      ride={rideData.selectedRide || sampleRide}
      paymentMethod={rideData.paymentMethod}
      onBack={() => navigate("/customer/ride-options")}
      onConfirmBooking={() => navigate("/customer/driver-on-the-way")}
    />
  );
}

function DriverOnTheWayRoute() {
  const navigate = useNavigate();

  return (
    <DriverOnTheWay
      onCall={() => alert("Calling driver...")}
      onMessage={() => alert("Messaging driver...")}
      onShare={() => alert("Sharing ride details...")}
      onCancel={() => navigate("/customer/dashboard")}
    />
  );
}

function RideInProgressRoute({ ride }) {
  const navigate = useNavigate();

  return (
    <RideInProgress
      ride={ride || sampleRide}
      onCall={() => alert("Calling driver...")}
      onMessage={() => alert("Messaging...")}
      onEndRide={() => navigate("/customer/rating")}
    />
  );
}

function AdminLoginRoute() {
  const navigate = useNavigate();
  const { setAuthenticated, setRole } = useAppStore();

  return (
    <AdminLogin
      onSuccess={() => {
        setAuthenticated(true);
        setRole("admin");
        navigate("/admin", { replace: true });
      }}
    />
  );
}

function AdminDashboardRoute() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAppStore();

  return (
    <AdminDashboard
      email="admin@nqtaxi.com"
      onLogout={() => {
        logout();
        setAuthenticated(false);
        navigate("/admin/login", { replace: true });
      }}
    />
  );
}

function DashboardViewRoute() {
  const navigate = useAdminNavigate();
  return <DashboardView email="admin@nqtaxi.com" onLogout={() => navigate("/admin/login")} onNavigate={navigate} />;
}

function UsersDirectoryRoute() {
  const navigate = useAdminNavigate();
  return <UsersDirectory email="admin@nqtaxi.com" onLogout={() => navigate("/admin/login")} onNavigate={navigate} />;
}

function FleetOverviewRoute() {
  const navigate = useAdminNavigate();
  return <FleetOverview onLogout={() => navigate("/admin/login")} onNavigate={navigate} />;
}

function AnalyticsRoute() {
  const navigate = useAdminNavigate();
  return <Reports email="admin@nqtaxi.com" onLogout={() => navigate("/admin/login")} onNavigate={navigate} />;
}

function MailRoute() {
  const navigate = useAdminNavigate();
  return <SupportInboxPage email="admin@nqtaxi.com" onLogout={() => navigate("/admin/login")} onNavigate={navigate} />;
}

function SettingsRoute() {
  const navigate = useAdminNavigate();
  return <FareSettingsPage email="admin@nqtaxi.com" onLogout={() => navigate("/admin/login")} onNavigate={navigate} />;
}

function CalendarRoute() {
  const navigate = useAdminNavigate();
  return <BookingsTablePage email="admin@nqtaxi.com" onLogout={() => navigate("/admin/login")} onNavigate={navigate} />;
}

function useAdminNavigate() {
  const navigate = useNavigate();
  return (pageId) => {
    const routes = {
      dashboard: "/admin/dashboard",
      users: "/admin/users",
      fleet: "/admin/fleet",
      analytics: "/admin/analytics",
      mail: "/admin/mail",
      settings: "/admin/settings",
      calendar: "/admin/calendar",
    };
    navigate(routes[pageId] || "/admin");
  };
}

function DriverLayout({ children }) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const { setAuthenticated, setRole, resetDriverState } = useAppStore();

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setRole('rider');
    resetDriverState();
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col md:flex-row text-white">
      {/* Sidebar (Tablet/Desktop) */}
      <DriverSidebarNavigation onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-40 border-b border-gray-800 bg-[#1A1A1A]/95 px-4 py-3 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 44 30" fill="none">
              <rect x="3" y="12" width="38" height="14" rx="4" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
              <path d="M10 12 L14 6 H30 L34 12 Z" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
            </svg>
            <span className="text-xl font-bold text-primary">NQTaxi</span>
          </div>
          <span className="text-xs text-muted">Driver Portal</span>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-0 pb-24 md:pb-6 md:p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden">
        <DriverBottomNavigation onMoreClick={() => setIsMoreMenuOpen(true)} />
      </div>

      {/* More Menu Drawer */}
      <DriverMoreDrawer
        isOpen={isMoreMenuOpen}
        onClose={() => setIsMoreMenuOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}

function Layout({ children }) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const { setAuthenticated, setRole, resetDriverState } = useAppStore();

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setRole('rider');
    resetDriverState();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar (Tablet/Desktop) */}
      <SidebarNavigation onLogout={handleLogout} />

      {/* Main Content */}
      <div className="md:pl-64 transition-all duration-300">
        {/* Top Header (Tablet/Desktop) */}
        <div className="hidden md:flex sticky top-0 z-40 border-b border-border bg-surface/95 px-6 py-3 backdrop-blur-sm">
          <Link to="/customer/profile" className="flex ml-auto h-10 w-10 items-center justify-center rounded-full bg-elevated hover:bg-primary/20">
            <span className="text-lg">U</span>
          </Link>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-40 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 44 30" fill="none">
              <rect x="3" y="12" width="38" height="14" rx="4" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
              <path d="M10 12 L14 6 H30 L34 12 Z" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
            </svg>
            <span className="text-xl font-bold text-primary">NQTaxi</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 pb-24 md:p-6">{children}</main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden">
        <BottomNavigation onMoreClick={() => setIsMoreMenuOpen(true)} />
      </div>

      {/* More Menu Drawer */}
      <MoreDrawer
        isOpen={isMoreMenuOpen}
        onClose={() => setIsMoreMenuOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}

function RatingComplete({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-20 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur-sm">
        <h1 className="text-lg font-bold">Rate your ride</h1>
      </div>
      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-text">How was your trip?</h2>
        <div className="my-6 flex gap-2 text-4xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
              <span className={star <= rating ? "text-primary" : "text-border"}>*</span>
            </button>
          ))}
        </div>
        <textarea
          className="w-full rounded-xl border border-border bg-elevated p-4 text-text"
          rows="3"
          placeholder="Share your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={() => onSubmit({ rating, comment })}
          className="mt-6 w-full rounded-2xl bg-primary py-4 font-bold text-black"
        >
          Submit &amp; Finish
        </button>
      </main>
    </div>
  );
}

export default App;
