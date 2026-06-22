import React from 'react';
import { FileText } from 'lucide-react';

export default function TripDetails() {
  const tripDetails = {
    tripId: 'NQT-RD-48291',
    dateTime: '22 Jun 2026, 10:45 AM',
    customerName: 'Aarav Sharma',
    pickupAddress: 'Indiranagar Metro Station, Bengaluru',
    dropAddress: 'Manyata Tech Park, Nagavara',
    totalDistance: '12.4 km',
    duration: '34 min',
    paymentMode: 'UPI',
    driverEarnings: 'Rs. 252',
    customerRating: '4.8',
  };

  return (
    <div id="trip-details" className="space-y-4 scroll-mt-24">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <FileText size={24} className="text-primary" />
        Trip Details
      </h2>
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-lg">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ['Trip ID', tripDetails.tripId],
            ['Date and Time', tripDetails.dateTime],
            ['Customer Name', tripDetails.customerName],
            ['Pickup Address', tripDetails.pickupAddress],
            ['Drop Address', tripDetails.dropAddress],
            ['Total Distance', tripDetails.totalDistance],
            ['Duration', tripDetails.duration],
            ['Payment Mode', tripDetails.paymentMode],
            ['Driver Earnings', tripDetails.driverEarnings],
            ['Customer Rating', tripDetails.customerRating],
          ].map(([label, value]) => (
            <div key={label} className="bg-elevated p-4 rounded-2xl border border-border">
              <div className="text-xs text-muted uppercase tracking-wider">{label}</div>
              <div className="font-bold mt-1">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
