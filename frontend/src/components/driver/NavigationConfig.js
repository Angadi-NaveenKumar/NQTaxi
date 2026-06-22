import {
  FileText,
  Navigation,
  CheckCircle,
  CreditCard,
  MessageSquare,
  Star,
} from 'lucide-react';

export const bottomNavItems = [
  { id: 'ride-in-progress', label: 'Ride', icon: Navigation, path: '/driver/dashboard#ride-in-progress' },
  { id: 'trip-completion', label: 'Complete', icon: CheckCircle, path: '/driver/dashboard#trip-completion' },
  { id: 'trip-details', label: 'Details', icon: FileText, path: '/driver/dashboard#trip-details' },
  { id: 'payment-confirmation', label: 'Payment', icon: CreditCard, path: '/driver/dashboard#payment-confirmation' },
  { id: 'customer-rating', label: 'Rating', icon: Star, path: '/driver/dashboard#customer-rating' },
];

export const moreMenuItems = {
  driverFeatures: [],
  safetySupport: [],
  account: [],
};

export const sidebarNavItems = [
  { id: 'ride-in-progress', label: 'Rider Progress', icon: Navigation, path: '/driver/dashboard#ride-in-progress' },
  { id: 'trip-completion', label: 'Trip Completion', icon: CheckCircle, path: '/driver/dashboard#trip-completion' },
  { id: 'trip-details', label: 'Trip Details', icon: FileText, path: '/driver/dashboard#trip-details' },
  { id: 'payment-confirmation', label: 'Payment Confirmation', icon: CreditCard, path: '/driver/dashboard#payment-confirmation' },
  { id: 'customer-rating', label: 'Customer Rating', icon: MessageSquare, path: '/driver/dashboard#customer-rating' },
];
