import React from 'react';
import DriverHead from '../../components/driver/DriverHead';
import RideInProgress from '../../components/driver/RiderProgress';

export default function RiderProgressPage() {
  return (
    <div className="min-h-screen bg-background text-text pb-24 md:pb-8 flex flex-col">
      <DriverHead title="Rider Progress" />
      <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full">
        <RideInProgress />
      </main>
    </div>
  );
}
