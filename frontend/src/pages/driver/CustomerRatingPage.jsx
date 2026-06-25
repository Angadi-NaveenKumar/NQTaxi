import React from 'react';
import DriverHead from '../../components/driver/DriverHead';
import CustomerRating from '../../components/driver/CustomerRating';

export default function CustomerRatingPage() {
  return (
    <div className="min-h-screen bg-background text-text pb-24 md:pb-8 flex flex-col">
      <DriverHead title="Customer Rating" />
      <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full">
        <CustomerRating />
      </main>
    </div>
  );
}
