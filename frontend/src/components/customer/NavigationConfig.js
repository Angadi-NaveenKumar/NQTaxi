import {
  Home,
  Route,
  MapPin,
  Wallet,
  Grid3x3,
  User,
  CreditCard,
  History,
  Star,
  Bell,
  HelpCircle,
  ShieldAlert,
  Settings,
  LogOut,
} from 'lucide-react';

// Bottom Navigation Items
export const bottomNavItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/customer/dashboard' },
  { id: 'trips', label: 'Trips', icon: Route, path: '/customer/history' },
  { id: 'track', label: 'Track Ride', icon: MapPin, path: '/customer/tracking' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/customer/wallet' },
  { id: 'more', label: 'More', icon: Grid3x3, action: true },
];

// More Menu Sections & Items
export const moreMenuSections = [
  {
    id: 'account',
    title: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: User, path: '/customer/profile' },
      { id: 'payments', label: 'Payments', icon: CreditCard, path: '/customer/payments' },
    ],
  },
  {
    id: 'activity',
    title: 'Activity',
    items: [
      { id: 'history', label: 'Ride History', icon: History, path: '/customer/history' },
      { id: 'reviews', label: 'Reviews & Ratings', icon: Star, path: '/customer/ratings' },
    ],
  },
  {
    id: 'notifications-safety',
    title: 'Notifications & Safety',
    items: [
      { id: 'alerts', label: 'Alerts', icon: Bell, path: '/customer/notifications' },
      { id: 'support', label: 'Support Center', icon: HelpCircle, path: '#' }, // Add support route later
      { id: 'sos', label: 'SOS Safety', icon: ShieldAlert, path: '/customer/sos' },
    ],
  },
  {
    id: 'preferences',
    title: 'Preferences',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings, path: '/customer/profile-settings' },
      { id: 'logout', label: 'Logout', icon: LogOut, action: true },
    ],
  },
];
