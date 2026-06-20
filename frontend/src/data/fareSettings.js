export const RIDE_TYPE_ICONS = {
  Auto: 'auto',
  Mini: 'mini',
  Sedan: 'sedan',
  SUV: 'suv',
  Premium: 'premium',
  Luxury: 'luxury',
  Rental: 'rental',
  Airport: 'airport',
  Outstation: 'outstation',
};

export const INITIAL_FARE_TYPES = [
  { id: 1, rideType: 'Auto', baseFare: 30, minFare: 50, perKm: 12, perMinute: 1.5, waitingCharge: 2, nightCharge: 1.25, surge: 1.0, driverCommission: 80, platformFee: 20, status: 'active' },
  { id: 2, rideType: 'Mini', baseFare: 40, minFare: 60, perKm: 14, perMinute: 2, waitingCharge: 2.5, nightCharge: 1.3, surge: 1.0, driverCommission: 78, platformFee: 22, status: 'active' },
  { id: 3, rideType: 'Sedan', baseFare: 50, minFare: 80, perKm: 16, perMinute: 2.5, waitingCharge: 3, nightCharge: 1.35, surge: 1.2, driverCommission: 75, platformFee: 25, status: 'active' },
  { id: 4, rideType: 'SUV', baseFare: 70, minFare: 120, perKm: 20, perMinute: 3, waitingCharge: 4, nightCharge: 1.4, surge: 1.3, driverCommission: 72, platformFee: 28, status: 'active' },
  { id: 5, rideType: 'Premium', baseFare: 100, minFare: 180, perKm: 28, perMinute: 4, waitingCharge: 5, nightCharge: 1.5, surge: 1.5, driverCommission: 70, platformFee: 30, status: 'active' },
  { id: 6, rideType: 'Luxury', baseFare: 150, minFare: 250, perKm: 35, perMinute: 5, waitingCharge: 6, nightCharge: 1.6, surge: 1.8, driverCommission: 68, platformFee: 32, status: 'active' },
  { id: 7, rideType: 'Rental', baseFare: 500, minFare: 500, perKm: 10, perMinute: 0, waitingCharge: 0, nightCharge: 1.2, surge: 1.0, driverCommission: 85, platformFee: 15, status: 'active' },
  { id: 8, rideType: 'Airport', baseFare: 80, minFare: 150, perKm: 18, perMinute: 2.5, waitingCharge: 3.5, nightCharge: 1.45, surge: 1.4, driverCommission: 74, platformFee: 26, status: 'active' },
  { id: 9, rideType: 'Outstation', baseFare: 200, minFare: 400, perKm: 15, perMinute: 0, waitingCharge: 0, nightCharge: 1.3, surge: 1.1, driverCommission: 82, platformFee: 18, status: 'inactive' },
];

export const INITIAL_PRICING_RULES = [
  { id: 'peak-hour', label: 'Peak Hour Pricing', description: 'Apply surge during rush hours (8–10 AM, 6–9 PM)', enabled: true, multiplier: 1.4, icon: 'clock' },
  { id: 'night', label: 'Night Pricing', description: 'Higher rates between 10 PM – 6 AM', enabled: true, multiplier: 1.35, icon: 'moon' },
  { id: 'weekend', label: 'Weekend Pricing', description: 'Weekend demand-based pricing', enabled: true, multiplier: 1.2, icon: 'calendar' },
  { id: 'holiday', label: 'Holiday Pricing', description: 'Special rates on public holidays', enabled: false, multiplier: 1.5, icon: 'gift' },
  { id: 'rain', label: 'Rain Surge', description: 'Weather-triggered surge pricing', enabled: true, multiplier: 1.3, icon: 'cloud-rain' },
  { id: 'traffic', label: 'Traffic Surge', description: 'High congestion area multiplier', enabled: true, multiplier: 1.25, icon: 'traffic' },
  { id: 'event', label: 'Event Surge', description: 'Stadium, concert & event zones', enabled: false, multiplier: 1.6, icon: 'ticket' },
  { id: 'emergency', label: 'Emergency Surge', description: 'Manual override for critical demand', enabled: false, multiplier: 2.0, icon: 'alert' },
];

export const INITIAL_COMMISSION = {
  driverCommission: 75,
  platformFee: 25,
  referralBonus: 5,
  partnerCommission: 10,
  enabled: true,
};

export const INITIAL_ACTIVITY = [
  { id: 1, action: 'Updated Sedan Fare', detail: 'Base fare changed from ₹45 to ₹50', user: 'Admin', timestamp: '2026-06-15T09:42:00Z', type: 'fare' },
  { id: 2, action: 'Changed Commission Settings', detail: 'Platform fee adjusted to 25%', user: 'Admin', timestamp: '2026-06-15T08:15:00Z', type: 'commission' },
  { id: 3, action: 'Modified Peak Hour Surge', detail: 'Multiplier set to 1.4×', user: 'Ops Manager', timestamp: '2026-06-14T18:30:00Z', type: 'surge' },
  { id: 4, action: 'Updated Night Pricing', detail: 'Night charge enabled at 1.35×', user: 'Admin', timestamp: '2026-06-14T14:20:00Z', type: 'pricing' },
  { id: 5, action: 'Added Airport Fare Type', detail: 'New airport transfer pricing configured', user: 'Admin', timestamp: '2026-06-13T11:00:00Z', type: 'fare' },
  { id: 6, action: 'Disabled Outstation Rates', detail: 'Temporarily paused outstation bookings', user: 'Ops Manager', timestamp: '2026-06-12T16:45:00Z', type: 'status' },
];

export const FARE_STATS = {
  totalRideTypes: 9,
  activeRules: 5,
  avgCommission: 75.6,
  lastUpdated: '2026-06-15T09:42:00Z',
};

export const TAX_RATE = 0.05;

export function calculateFare(fareType, distance, duration, surgeMultiplier, commission) {
  const base = fareType.baseFare;
  const distanceFare = distance * fareType.perKm;
  const timeFare = duration * fareType.perMinute;
  let subtotal = base + distanceFare + timeFare;
  subtotal = Math.max(subtotal, fareType.minFare);

  const surgeAmount = subtotal * (surgeMultiplier - 1);
  const totalBeforeTax = subtotal + surgeAmount;
  const tax = totalBeforeTax * TAX_RATE;
  const platformFeeAmount = totalBeforeTax * (commission.platformFee / 100);
  const driverEarnings = totalBeforeTax - platformFeeAmount;
  const totalAmount = totalBeforeTax + tax;

  return {
    estimatedFare: subtotal,
    surgeAmount,
    tax,
    platformFee: platformFeeAmount,
    driverEarnings,
    totalAmount,
  };
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatRelativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
