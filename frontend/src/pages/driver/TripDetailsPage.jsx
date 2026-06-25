import React from 'react';
import DriverHead from '../../components/driver/DriverHead';
import TripDetails from '../../components/driver/TripDetails';

export default function TripDetailsPage() {
  return (
    <div className="min-h-screen bg-background text-text pb-24 md:pb-8 flex flex-col">
      <DriverHead title="Trip Details" />
      <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full">
        <TripDetails />
      </main>
    </div>
  );
}
