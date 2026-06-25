import React from 'react';
import DriverHead from '../../components/driver/DriverHead';
import TripCompletion from '../../components/driver/TripCompletion';

export default function TripCompletionPage() {
  return (
    <div className="min-h-screen bg-background text-text pb-24 md:pb-8 flex flex-col">
      <DriverHead title="Trip Completion" />
      <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full">
        <TripCompletion />
      </main>
    </div>
  );
}
