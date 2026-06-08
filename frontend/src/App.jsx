import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// ── Public pages ──────────────────────────────────────────────
import LandingPage          from '@pages/public/LandingPage'

// ── Customer pages ────────────────────────────────────────────
import WelcomePage          from '@pages/customer/WelcomePage'
import LoginPage            from '@pages/customer/LoginPage'
import OTPVerificationPage  from '@pages/customer/OTPVerificationPage'
import RegisterPage         from '@pages/customer/RegisterPage'
import HomeDashboardPage    from '@pages/customer/HomeDashboardPage'
import RideTypeSelectorPage from '@pages/customer/RideTypeSelectorPage'
import ConfirmBookingPage   from '@pages/customer/ConfirmBookingPage'
import LiveTrackingPage     from '@pages/customer/LiveTrackingPage'
import ProfileSettingsPage  from '@pages/customer/ProfileSettingsPage'
import WalletPage           from '@pages/customer/WalletPage'
import PaymentMethodsPage   from '@pages/customer/PaymentMethodsPage'
import TripSummaryPage      from '@pages/customer/TripSummaryPage'
import RatingReviewPage     from '@pages/customer/RatingReviewPage'
import SafetySOSPage        from '@pages/customer/SafetySOSPage'

// ── Admin pages ───────────────────────────────────────────────
import AdminLoginPage       from '@pages/admin/AdminLoginPage'
import DashboardPage        from '@pages/admin/DashboardPage'
import BookingsTablePage    from '@pages/admin/BookingsTablePage'
import UsersDirectoryPage   from '@pages/admin/UsersDirectoryPage'
import VehicleRegistryPage  from '@pages/admin/VehicleRegistryPage'
import DriversGridPage      from '@pages/admin/DriversGridPage'
import AddDriverPage        from '@pages/admin/AddDriverPage'
import AdminSettingsPage    from '@pages/admin/AdminSettingsPage'
import FareSettingsPage     from '@pages/admin/FareSettingsPage'
import EarningsChartsPage   from '@pages/admin/EarningsChartsPage'
import ReportsExporterPage  from '@pages/admin/ReportsExporterPage'
import PayoutsPage          from '@pages/admin/PayoutsPage'
import PromoCodesPage       from '@pages/admin/PromoCodesPage'
import SupportInboxPage     from '@pages/admin/SupportInboxPage'
import SupportChatPage      from '@pages/admin/SupportChatPage'
import LiveMapPage          from '@pages/admin/LiveMapPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"               element={<LandingPage />} />

        {/* Customer Auth */}
        <Route path="/welcome"        element={<WelcomePage />} />
        <Route path="/login"          element={<LoginPage />} />
        <Route path="/otp"            element={<OTPVerificationPage />} />
        <Route path="/register"       element={<RegisterPage />} />

        {/* Customer App */}
        <Route path="/home"           element={<HomeDashboardPage />} />
        <Route path="/ride-type"      element={<RideTypeSelectorPage />} />
        <Route path="/confirm-booking" element={<ConfirmBookingPage />} />
        <Route path="/tracking"       element={<LiveTrackingPage />} />
        <Route path="/profile"        element={<ProfileSettingsPage />} />
        <Route path="/wallet"         element={<WalletPage />} />
        <Route path="/payments"       element={<PaymentMethodsPage />} />
        <Route path="/trip-summary"   element={<TripSummaryPage />} />
        <Route path="/rating"         element={<RatingReviewPage />} />
        <Route path="/safety"         element={<SafetySOSPage />} />

        {/* Admin */}
        <Route path="/admin"          element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login"    element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/bookings" element={<BookingsTablePage />} />
        <Route path="/admin/users"    element={<UsersDirectoryPage />} />
        <Route path="/admin/vehicles" element={<VehicleRegistryPage />} />
        <Route path="/admin/drivers"  element={<DriversGridPage />} />
        <Route path="/admin/drivers/add" element={<AddDriverPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
        <Route path="/admin/fare"     element={<FareSettingsPage />} />
        <Route path="/admin/earnings" element={<EarningsChartsPage />} />
        <Route path="/admin/reports"  element={<ReportsExporterPage />} />
        <Route path="/admin/payouts"  element={<PayoutsPage />} />
        <Route path="/admin/promos"   element={<PromoCodesPage />} />
        <Route path="/admin/support"  element={<SupportInboxPage />} />
        <Route path="/admin/support/chat" element={<SupportChatPage />} />
        <Route path="/admin/live-map" element={<LiveMapPage />} />

        {/* 404 fallback */}
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
