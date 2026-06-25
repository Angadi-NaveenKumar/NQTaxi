
export const driverData = {
  id: 'DRV001',
  name: 'Rajesh Kumar',
  avatar: 'RK',
  rating: 4.8,
  totalReviews: 247,
};

export const earningsData = {
  today: 2850,
  weekly: 14250,
  monthly: 62400,
  pending: 3200,
  completedTrips: 12,
  todayTrend: 12.5,
  weeklyTrend: 8.2,
};

export const performanceData = {
  acceptanceRate: 94,
  completionRate: 98,
  cancellationRate: 2,
  customerRating: 4.8,
  responseTime: '1.2 min',
};

export const rideStats = {
  today: 12,
  thisWeek: 68,
  thisMonth: 294,
  distanceCovered: 456, // km
  hoursOnline: 8.5,
  fuelEfficiency: 18.5, // km/l
};

export const liveRideRequests = [
  {
    id: 'REQ001',
    pickup: 'MG Road, Bengaluru',
    drop: 'Kempegowda Airport',
    distance: '32 km',
    duration: '45 min',
    fare: 850,
    passengerRating: 4.9,
    rideType: 'Premium',
  },
  {
    id: 'REQ002',
    pickup: 'Indiranagar',
    drop: 'HSR Layout',
    distance: '8 km',
    duration: '20 min',
    fare: 280,
    passengerRating: 4.7,
    rideType: 'Auto',
  },
];

export const recentActivity = [
  {
    id: 'ACT001',
    type: 'ride-completed',
    title: 'Ride Completed',
    description: 'Trip to MG Road',
    amount: 240,
    time: '10:30 AM',
  },
  {
    id: 'ACT002',
    type: 'bonus-earned',
    title: 'Bonus Earned',
    description: 'Daily streak bonus',
    amount: 150,
    time: '10:00 AM',
  },
  {
    id: 'ACT003',
    type: 'ride-accepted',
    title: 'Ride Accepted',
    description: 'Trip to Indiranagar',
    amount: null,
    time: '09:45 AM',
  },
  {
    id: 'ACT004',
    type: 'payout-received',
    title: 'Payout Received',
    description: 'Weekly payout',
    amount: 14250,
    time: 'Yesterday',
  },
];

export const incentivesData = {
  dailyTarget: { current: 12, target: 15, bonus: 300 },
  weeklyTarget: { current: 68, target: 80, bonus: 1500 },
  currentBonus: 450,
  referralEarnings: 2500,
  achievements: [
    { id: 'ACH001', name: 'Rising Star', unlocked: true },
    { id: 'ACH002', name: 'Weekly Warrior', unlocked: true },
    { id: 'ACH003', name: 'Perfect 10', unlocked: false },
  ],
};

export const quickActions = [
  { id: 'my-trips', label: 'My Trips', icon: 'route' },
  { id: 'earnings', label: 'Earnings', icon: 'rupee' },
  { id: 'wallet', label: 'Wallet', icon: 'wallet' },
  { id: 'incentives', label: 'Incentives', icon: 'gift' },
  { id: 'vehicle', label: 'Vehicle', icon: 'truck' },
  { id: 'documents', label: 'Documents', icon: 'file' },
  { id: 'profile', label: 'Profile', icon: 'user' },
  { id: 'support', label: 'Support', icon: 'help' },
  { id: 'sos', label: 'SOS Safety', icon: 'shield' },
];

