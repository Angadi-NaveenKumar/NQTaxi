import React, { useState } from 'react';
import DriverHead from '../../components/driver/DriverHead';
import TripCard from '../../components/driver/TripCard';

export default function TripHistory() {
  const [activeTab, setActiveTab] = useState('daily');

  // Trip history list mock data
  const tripHistoryData = {
    daily: [
      { id: 'trip1', pickup: 'Connaught Place', drop: 'IGI Airport', fare: 160, paymentType: 'Cash', date: '20 May 2026', status: 'completed' },
      { id: 'trip2', pickup: 'Karol Bagh', drop: 'Noida Sector 62', fare: 210, paymentType: 'UPI', date: '20 May 2026', status: 'completed' },
      { id: 'trip3', pickup: 'Lajpat Nagar', drop: 'Gurgaon', fare: 320, paymentType: 'Cash', date: '19 May 2026', status: 'completed' },
      { id: 'trip4', pickup: 'India Gate', drop: 'Connaught Place', fare: 120, paymentType: 'UPI', date: '19 May 2026', status: 'completed' }
    ],
    weekly: [
      { id: 'trip5', pickup: 'Indiranagar', drop: 'Whitefield', fare: 450, paymentType: 'UPI', date: '18 May 2026', status: 'completed' },
      { id: 'trip6', pickup: 'Koramangala', drop: 'Electronic City', fare: 380, paymentType: 'Cash', date: '17 May 2026', status: 'completed' },
      { id: 'trip7', pickup: 'Malleshwaram', drop: 'Yeswanthpur', fare: 180, paymentType: 'UPI', date: '16 May 2026', status: 'completed' },
      { id: 'trip8', pickup: 'Jayanagar', drop: 'Hebbal', fare: 420, paymentType: 'Cash', date: '15 May 2026', status: 'completed' }
    ],
    monthly: [
      { id: 'trip9', pickup: 'MG Road', drop: 'Marathahalli', fare: 310, paymentType: 'UPI', date: '14 May 2026', status: 'completed' },
      { id: 'trip10', pickup: 'Silk Board', drop: 'Bannerghatta', fare: 290, paymentType: 'Cash', date: '12 May 2026', status: 'completed' },
      { id: 'trip11', pickup: 'Majestic', drop: 'Bangalore Palace', fare: 190, paymentType: 'UPI', date: '10 May 2026', status: 'completed' },
      { id: 'trip12', pickup: 'Yelahanka', drop: 'Bellandur', fare: 560, paymentType: 'Cash', date: '08 May 2026', status: 'completed' }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-text pb-24 md:pb-8 flex flex-col">
      {/* Navigation Header */}
      <DriverHead title="Trip History" />

      {/* Main Body */}
      <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full space-y-6">
        
        {/* Tab Controls */}
        <div className="flex bg-elevated/50 p-1.5 rounded-2xl border border-border/80 max-w-md mx-auto">
          {['daily', 'weekly', 'monthly'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-bold capitalize rounded-xl transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-black shadow-lg scale-[1.02]'
                  : 'text-muted hover:text-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Trip list items grouped by date header */}
        <div className="space-y-4 mt-6">
          {tripHistoryData[activeTab].map((trip) => (
            <TripCard
              key={trip.id}
              pickup={trip.pickup}
              drop={trip.drop}
              fare={trip.fare}
              paymentType={trip.paymentType}
              date={trip.date}
              status={trip.status}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
