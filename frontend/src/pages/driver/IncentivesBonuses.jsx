import React from 'react';
import DriverHead from '../../components/driver/DriverHead';
import BonusCard from '../../components/driver/BonusCard';

export default function IncentivesBonuses() {
  const activeIncentives = [
    {
      id: 'weekly',
      title: 'Weekly Target Bonus',
      amount: 1500,
      currentProgress: 68,
      targetProgress: 80,
      status: 'Active',
      description: 'Complete 80 trips in Bengaluru area before Sunday midnight.'
    },
    {
      id: 'peak',
      title: 'Peak Hour Bonus',
      amount: 300,
      currentProgress: 8,
      targetProgress: 10,
      status: 'Active',
      description: 'Complete 10 trips during morning peak hours (08:00 AM - 11:00 AM).'
    },
    {
      id: 'referral',
      title: 'Referral Bonus',
      amount: 2500,
      currentProgress: 2,
      targetProgress: 2,
      status: 'Completed',
      description: 'Invite new drivers. Bonus unlocked when they complete 10 trips.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text pb-24 md:pb-8 flex flex-col">
      {/* Navigation Header */}
      <DriverHead title="Incentives &amp; Bonuses" />

      {/* Main Body */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="text-center max-w-xl mx-auto mb-2">
          <h3 className="text-xl font-bold text-text mb-1">Boost Your Earnings</h3>
          <p className="text-sm text-muted">Complete targets during the week to unlock additional payouts directly added to your wallet balance.</p>
        </div>

        {/* Bonus Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {activeIncentives.map((bonus) => (
            <BonusCard
              key={bonus.id}
              title={bonus.title}
              amount={bonus.amount}
              currentProgress={bonus.currentProgress}
              targetProgress={bonus.targetProgress}
              status={bonus.status}
              description={bonus.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
