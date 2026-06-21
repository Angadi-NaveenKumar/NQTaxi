
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
  HelpCircle,
  ShieldAlert,
  Settings,
  LogOut,
} from 'lucide-react';

export const bottomNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/driver/dashboard' },
  { id: 'requests', label: 'Requests', icon: Car, path: '/driver/new-request' },
  { id: 'trips', label: 'Trips', icon: Route, path: '#' },
  { id: 'earnings', label: 'Earnings', icon: IndianRupee, path: '#' },
  { id: 'more', label: 'More', icon: Grid3x3, action: true },
];

export const moreMenuItems = {
  driverFeatures: [
    { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/driver/wallet' },
    { id: 'incentives', label: 'Incentives', icon: Gift, path: '#' },
    { id: 'vehicle', label: 'Vehicle', icon: Truck, path: '#' },
    { id: 'documents', label: 'Documents', icon: FileText, path: '/driver/document-verification' },
  ],
  safetySupport: [
    { id: 'support', label: 'Support', icon: HelpCircle, path: '#' },
    { id: 'sos', label: 'SOS Safety', icon: ShieldAlert, path: '#' },
  ],
  account: [
    { id: 'settings', label: 'Settings', icon: Settings, path: '#' },
    { id: 'logout', label: 'Logout', icon: LogOut, action: true },
  ],
};

export const sidebarNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/driver/dashboard' },
  { id: 'requests', label: 'Requests', icon: Car, path: '/driver/new-request' },
  { id: 'trips', label: 'Trips', icon: Route, path: '#' },
  { id: 'earnings', label: 'Earnings', icon: IndianRupee, path: '#' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/driver/wallet' },
  { id: 'incentives', label: 'Incentives', icon: Gift, path: '#' },
  { id: 'vehicle', label: 'Vehicle', icon: Truck, path: '#' },
  { id: 'documents', label: 'Documents', icon: FileText, path: '/driver/document-verification' },
  { id: 'support', label: 'Support', icon: HelpCircle, path: '#' },
  { id: 'sos', label: 'SOS Safety', icon: ShieldAlert, path: '#' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '#' },
];

