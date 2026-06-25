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
  Grid3x3,
} from 'lucide-react';

export const bottomNavItems = [
  { id: 'dashboard', label: 'Home', icon: Home, path: '/driver/dashboard' },
  { id: 'earnings', label: 'Earnings', icon: TrendingUp, path: '/driver/earnings' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/driver/wallet' },
  { id: 'history', label: 'History', icon: History, path: '/driver/history' },
  { id: 'more', label: 'More', icon: Grid3x3, action: true },
];

export const moreMenuItems = {
  driverFeatures: [
    { id: 'stats', label: 'Stats', icon: Star, path: '/driver/stats' },
    { id: 'incentives', label: 'Incentives', icon: Award, path: '/driver/incentives' },
    { id: 'payouts', label: 'Payouts', icon: CreditCard, path: '/driver/payouts' },
  ],
  safetySupport: [
    { id: 'sos', label: 'SOS Safety', icon: ShieldAlert, path: '/customer/sos' },
  ],
  account: [
    { id: 'profile-setup', label: 'Profile Setup', icon: User, path: '/driver/profile-setup' },
    { id: 'document-verification', label: 'Documents', icon: FileText, path: '/driver/document-verification' },
    { id: 'logout', label: 'Logout', icon: LogOut, action: true },
  ],
};

export const sidebarNavItems = [
  { id: 'dashboard', label: 'Home', icon: Home, path: '/driver/dashboard' },
  { id: 'earnings', label: 'Earnings', icon: TrendingUp, path: '/driver/earnings' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/driver/wallet' },
  { id: 'history', label: 'Trip History', icon: History, path: '/driver/history' },
  { id: 'stats', label: 'Driver Stats', icon: Star, path: '/driver/stats' },
  { id: 'incentives', label: 'Incentives', icon: Award, path: '/driver/incentives' },
  { id: 'payouts', label: 'Payouts', icon: CreditCard, path: '/driver/payouts' },
];
