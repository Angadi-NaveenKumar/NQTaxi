import {
  Home,
  TrendingUp,
  Wallet,
  Award,
  History,
  CreditCard,
  FileText,
  User,
  ShieldAlert,
  LogOut,
  BellRing,
  Navigation,
  CheckCircle,
  Star,
  Car,
  HelpCircle,
  Gift,
  Grid3x3,
} from 'lucide-react';

export const bottomNavItems = [
  { id: 'dashboard', label: 'Home', icon: Home, path: '/driver/dashboard' },
  { id: 'earnings', label: 'Earnings', icon: TrendingUp, path: '/driver/earnings' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/driver/wallet' },
  { id: 'history', label: 'History', icon: History, path: '/driver/history' },
  { id: 'more', label: 'More', icon: Grid3x3, action: true },
];

export const overviewNavItems = [
  { id: 'dashboard', label: 'Home', icon: Home, path: '/driver/dashboard' },
  { id: 'earnings', label: 'Earnings', icon: TrendingUp, path: '/driver/earnings' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/driver/wallet' },
  { id: 'history', label: 'Trip History', icon: History, path: '/driver/history' },
  { id: 'stats', label: 'Driver Stats', icon: Star, path: '/driver/stats' },
  { id: 'incentives', label: 'Incentives', icon: Award, path: '/driver/incentives' },
  { id: 'payouts', label: 'Payouts', icon: CreditCard, path: '/driver/payouts' },
];

export const activeTripNavItems = [
  { id: 'new-request', label: 'New Request', icon: BellRing, path: '/driver/new-request' },
  { id: 'ride-accepted', label: 'Ride Accepted', icon: CheckCircle, path: '/driver/ride-accepted' },
  { id: 'navigation-pickup', label: 'Navigation', icon: Navigation, path: '/driver/navigation-pickup' },
  { id: 'rider-progress', label: 'Rider Progress', icon: Navigation, path: '/driver/rider-progress' },
  { id: 'trip-completion', label: 'Trip Completion', icon: CheckCircle, path: '/driver/trip-completion' },
  { id: 'trip-details', label: 'Trip Details', icon: FileText, path: '/driver/trip-details' },
  { id: 'payment-confirmation', label: 'Payment Confirmation', icon: CreditCard, path: '/driver/payment-confirmation' },
  { id: 'customer-rating', label: 'Customer Rating', icon: Star, path: '/driver/customer-rating' },
];

export const accountNavItems = [
  { id: 'profile', label: 'Driver Profile Management', icon: User, path: '/driver/dashboard#profile' },
  { id: 'vehicle', label: 'Vehicle Information', icon: Car, path: '/driver/dashboard#vehicle' },
  { id: 'documents', label: 'Documents Management', icon: FileText, path: '/driver/dashboard#documents' },
  { id: 'support', label: 'Support & Help Center', icon: HelpCircle, path: '/driver/dashboard#support' },
  { id: 'referral', label: 'Refer & Earn', icon: Gift, path: '/driver/dashboard#referral' },
];

export const moreMenuItems = {
  driverFeatures: [
    { id: 'profile', label: 'Profile', icon: User, path: '/driver/dashboard#profile' },
    { id: 'vehicle', label: 'Vehicle Info', icon: Car, path: '/driver/dashboard#vehicle' },
    { id: 'documents', label: 'Documents', icon: FileText, path: '/driver/dashboard#documents' },
    { id: 'new-request', label: 'New Request', icon: BellRing, path: '/driver/new-request' },
    { id: 'ride-accepted', label: 'Accepted Ride', icon: CheckCircle, path: '/driver/ride-accepted' },
    { id: 'navigation-pickup', label: 'Navigation', icon: Navigation, path: '/driver/navigation-pickup' },
    { id: 'rider-progress', label: 'Rider Progress', icon: Navigation, path: '/driver/rider-progress' },
    { id: 'trip-completion', label: 'Trip Completion', icon: CheckCircle, path: '/driver/trip-completion' },
    { id: 'trip-details', label: 'Trip Details', icon: FileText, path: '/driver/trip-details' },
    { id: 'payment-confirmation', label: 'Payment Confirmation', icon: CreditCard, path: '/driver/payment-confirmation' },
    { id: 'customer-rating', label: 'Customer Rating', icon: Star, path: '/driver/customer-rating' },
    { id: 'stats', label: 'Stats', icon: Star, path: '/driver/stats' },
    { id: 'incentives', label: 'Incentives', icon: Award, path: '/driver/incentives' },
    { id: 'payouts', label: 'Payouts', icon: CreditCard, path: '/driver/payouts' },
  ],
  safetySupport: [
    { id: 'support', label: 'Support', icon: HelpCircle, path: '/driver/dashboard#support' },
    { id: 'referral', label: 'Refer & Earn', icon: Gift, path: '/driver/dashboard#referral' },
    { id: 'sos', label: 'SOS Safety', icon: ShieldAlert, path: '/customer/sos' },
  ],
  account: [
    { id: 'profile-setup', label: 'Profile Setup', icon: User, path: '/driver/profile-setup' },
    { id: 'document-verification', label: 'Documents', icon: FileText, path: '/driver/document-verification' },
    { id: 'logout', label: 'Log Out', icon: LogOut, path: '#', action: true },
  ],
};

export const sidebarNavItems = overviewNavItems;
