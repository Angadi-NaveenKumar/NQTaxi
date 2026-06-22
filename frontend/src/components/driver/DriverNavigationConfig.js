
import {
  Home,
  Car,
  Route,
  IndianRupee,
  Grid3x3,
  Wallet,
  Gift,
  Truck,
  FileText,
  Navigation,
  CheckCircle,
  CreditCard,
  MessageSquare,
  HelpCircle,
  ShieldAlert,
  Settings,
  LogOut,
} from 'lucide-react';

export const bottomNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/driver' },
  { id: 'requests', label: 'Requests', icon: Car, path: '/driver/requests' },
  { id: 'trips', label: 'Trips', icon: Route, path: '/driver/trips' },
  { id: 'earnings', label: 'Earnings', icon: IndianRupee, path: '/driver/earnings' },
  { id: 'more', label: 'More', icon: Grid3x3, action: true },
];

export const moreMenuItems = {
  driverFeatures: [
    { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/driver/wallet' },
    { id: 'incentives', label: 'Incentives', icon: Gift, path: '/driver/incentives' },
    { id: 'vehicle', label: 'Vehicle', icon: Truck, path: '/driver/vehicle' },
    { id: 'documents', label: 'Documents', icon: FileText, path: '/driver/documents' },
  ],
  safetySupport: [
    { id: 'support', label: 'Support', icon: HelpCircle, path: '/driver/support' },
    { id: 'sos', label: 'SOS Safety', icon: ShieldAlert, path: '/driver/sos' },
  ],
  account: [
    { id: 'settings', label: 'Settings', icon: Settings, path: '/driver/settings' },
    { id: 'logout', label: 'Logout', icon: LogOut, action: true },
  ],
};

export const sidebarNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/driver' },
  { id: 'requests', label: 'Requests', icon: Car, path: '/driver/requests' },
  { id: 'trips', label: 'Trips', icon: Route, path: '/driver/trips' },
  { id: 'ride-in-progress', label: 'Ride InProgress', icon: Navigation, path: '/driver/dashboard#ride-in-progress' },
  { id: 'trip-completion', label: 'Trip Completion', icon: CheckCircle, path: '/driver/dashboard#trip-completion' },
  { id: 'payment-confirmation', label: 'Payment', icon: CreditCard, path: '/driver/dashboard#payment-confirmation' },
  { id: 'customer-rating', label: 'Customer Rating', icon: MessageSquare, path: '/driver/dashboard#customer-rating' },
  { id: 'trip-details', label: 'Trip Details', icon: FileText, path: '/driver/dashboard#trip-details' },
  { id: 'earnings', label: 'Earnings', icon: IndianRupee, path: '/driver/earnings' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/driver/wallet' },
  { id: 'incentives', label: 'Incentives', icon: Gift, path: '/driver/incentives' },
  { id: 'vehicle', label: 'Vehicle', icon: Truck, path: '/driver/vehicle' },
  { id: 'documents', label: 'Documents', icon: FileText, path: '/driver/documents' },
  { id: 'support', label: 'Support', icon: HelpCircle, path: '/driver/support' },
  { id: 'sos', label: 'SOS Safety', icon: ShieldAlert, path: '/driver/sos' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/driver/settings' },
];

