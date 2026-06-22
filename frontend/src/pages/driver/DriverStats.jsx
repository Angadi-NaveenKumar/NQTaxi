import React, { useState } from 'react';
import { Route, IndianRupee, Star, Clock } from 'lucide-react';
import DriverHead from '../../components/driver/DriverHead';
import StatCard from '../../components/driver/StatCard';

export default function DriverStats() {
  const [activeTab, setActiveTab] = useState('daily');

  // Multi-tab statistics mock data
  const statsData = {
    daily: [
      { id: 'trips', title: 'Total Trips', value: '12', icon: Route, trend: '+2', trendType: 'success', subtext: 'trips completed today' },
      { id: 'earnings', title: 'Total Earnings', value: '₹2,850', icon: IndianRupee, trend: '+12.5%', trendType: 'success', subtext: 'vs yesterday' },
      { id: 'rating', title: 'Average Rating', value: '4.9', icon: Star, trend: '+0.1', trendType: 'success', subtext: '4.9 ★ based on today\'s feedback' },
      { id: 'hours', title: 'Online Hours', value: '8.5h', icon: Clock, trend: '+1.5h', trendType: 'success', subtext: 'hours spent active today' }
    ],
    weekly: [
      { id: 'trips', title: 'Total Trips', value: '68', icon: Route, trend: '+5', trendType: 'success', subtext: 'trips completed this week' },
      { id: 'earnings', title: 'Total Earnings', value: '₹14,250', icon: IndianRupee, trend: '+8.2%', trendType: 'success', subtext: 'vs last week' },
      { id: 'rating', title: 'Average Rating', value: '4.8', icon: Star, trend: 'Stable', trendType: 'neutral', subtext: '4.8 ★ last 7 days' },
      { id: 'hours', title: 'Online Hours', value: '52.4h', icon: Clock, trend: '+4.2h', trendType: 'success', subtext: 'hours spent active this week' }
    ],
    monthly: [
      { id: 'trips', title: 'Total Trips', value: '294', icon: Route, trend: '+24', trendType: 'success', subtext: 'trips completed this month' },
      { id: 'earnings', title: 'Total Earnings', value: '₹62,400', icon: IndianRupee, trend: '+14.3%', trendType: 'success', subtext: 'vs last month' },
      { id: 'rating', title: 'Average Rating', value: '4.8', icon: Star, trend: 'Stable', trendType: 'neutral', subtext: '4.8 ★ last 30 days' },
      { id: 'hours', title: 'Online Hours', value: '215h', icon: Clock, trend: '+12.8h', trendType: 'success', subtext: 'hours spent active this month' }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-text pb-24 md:pb-8 flex flex-col">
      {/* Navigation Header */}
      <DriverHead title="Performance Stats" />

      {/* Main Body */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">
        
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

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {statsData[activeTab].map((card) => (
            <StatCard
              key={card.id}
              title={card.title}
              value={card.value}
              icon={card.icon}
              trend={card.trend}
              trendType={card.trendType}
              subtext={card.subtext}
            />
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-surface border border-border rounded-3xl p-6 mt-4">
          <h4 className="text-lg font-bold text-text mb-2">Performance Insights</h4>
          <p className="text-sm text-muted leading-relaxed">
            Your acceptance rate is currently at <span className="text-success font-bold">94%</span> and cancellation rate is <span className="text-danger font-bold">2%</span>. Maintaining these excellent numbers ensures you qualify for peak hour bonuses and referral payouts!
          </p>
        </div>
      </main>
    </div>
  );
}
