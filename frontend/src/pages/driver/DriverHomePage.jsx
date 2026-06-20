
import React, { useState, useEffect } from 'react';
import {
  Bell,
  User,
  Settings,
  Star,
  CheckCircle,
  Check,
  X,
  Route,
  IndianRupee,
  Clock,
  Car,
  Zap,
  TrendingUp,
  Award,
  Activity,
  FileText,
  Wallet,
  HelpCircle,
  ShieldAlert,
  Truck,
  Gift,
} from 'lucide-react';
import BottomNavigation from '../../components/driver/BottomNavigation';
import MoreDrawer from '../../components/driver/MoreDrawer';
import SidebarNavigation from '../../components/driver/SidebarNavigation';
import DriverStatusCard from '../../components/driver/DriverStatusCard';
import {
  driverData,
  earningsData,
  performanceData,
  rideStats,
  liveRideRequests,
  recentActivity,
  incentivesData,
  quickActions,
} from '../../data/driverData';

export default function DriverHomePage() {
  const [showMore, setShowMore] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-background text-text flex">
      {/* Sidebar for Desktop */}
      <SidebarNavigation />
      {/* Main Content */}
      <div className="flex-1 pb-24 md:pb-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-border px-4 py-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-fg flex items-center justify-center text-xl font-bold shadow-glow">
                {driverData.avatar}
              </div>
              <div>
                <p className="text-sm text-muted">{getGreeting()}</p>
                <h1 className="text-xl font-bold">{driverData.name}</h1>
                <p className="text-xs text-muted mt-0.5">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-elevated hover:bg-border transition-colors">
                <Bell size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-elevated hover:bg-border transition-colors">
                <User size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-elevated hover:bg-border transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>
        {/* Main Body */}
        <main className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
          {/* Driver Status Card */}
          <DriverStatusCard />
          {/* Earnings Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <IndianRupee size={24} className="text-primary" />
              Earnings Overview
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Today's Earnings */}
              <div className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-glow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted text-sm font-medium">Today</span>
                  <span className="text-success text-xs flex items-center gap-1">
                    <TrendingUp size={12} />
                    +{earningsData.todayTrend}%
                  </span>
                </div>
                <div className="text-3xl font-bold text-text">₹{earningsData.today.toLocaleString()}</div>
                <div className="text-muted text-xs mt-1">{earningsData.completedTrips} trips</div>
              </div>
              {/* Weekly Earnings */}
              <div className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-glow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted text-sm font-medium">This Week</span>
                  <span className="text-success text-xs flex items-center gap-1">
                    <TrendingUp size={12} />
                    +{earningsData.weeklyTrend}%
                  </span>
                </div>
                <div className="text-3xl font-bold text-text">₹{earningsData.weekly.toLocaleString()}</div>
                <div className="text-muted text-xs mt-1">68 trips</div>
              </div>
              {/* Monthly Earnings */}
              <div className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-glow">
                <div className="text-muted text-sm font-medium mb-2">This Month</div>
                <div className="text-3xl font-bold text-text">₹{earningsData.monthly.toLocaleString()}</div>
                <div className="text-muted text-xs mt-1">294 trips</div>
              </div>
              {/* Pending Payout */}
              <div className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-glow">
                <div className="text-muted text-sm font-medium mb-2">Pending Payout</div>
                <div className="text-3xl font-bold text-primary">₹{earningsData.pending.toLocaleString()}</div>
                <div className="text-muted text-xs mt-1">Processing</div>
              </div>
              {/* Rating */}
              <div className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-glow">
                <div className="text-muted text-sm font-medium mb-2">Rating</div>
                <div className="text-3xl font-bold text-text flex items-center gap-1">
                  <Star size={20} className="text-primary fill-primary" />
                  {driverData.rating}
                </div>
                <div className="text-muted text-xs mt-1">{driverData.totalReviews} reviews</div>
              </div>
            </div>
          </div>
          {/* Live Ride Requests */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Car size={24} className="text-primary" />
              Live Ride Requests ({liveRideRequests.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {liveRideRequests.map((req) => (
                <div key={req.id} className="bg-surface p-6 rounded-3xl border border-border hover:border-primary/50 transition-all hover:shadow-glow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">{req.rideType}</span>
                        <span className="flex items-center gap-1 text-sm text-muted">
                          <Star size={14} className="text-primary fill-primary" />
                          {req.passengerRating}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-primary">₹{req.fare}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-text font-medium">
                        <Route size={16} />
                        {req.distance}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted">
                        <Clock size={16} />
                        {req.duration}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-success mt-2 shrink-0" />
                      <div>
                        <div className="text-xs text-muted uppercase tracking-wider">Pickup</div>
                        <div className="text-sm font-medium">{req.pickup}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-danger mt-2 shrink-0" />
                      <div>
                        <div className="text-xs text-muted uppercase tracking-wider">Drop</div>
                        <div className="text-sm font-medium">{req.drop}</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-success text-white py-3 px-4 rounded-2xl font-bold hover:bg-success/80 transition-colors active:scale-95 flex items-center justify-center gap-2">
                      <Check size={18} />
                      Accept
                    </button>
                    <button className="bg-elevated text-muted border border-border py-3 px-4 rounded-2xl font-bold hover:bg-border hover:text-text transition-colors active:scale-95 flex items-center justify-center gap-2">
                      <X size={18} />
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap size={24} className="text-primary" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
              {quickActions.map((action) => {
                let Icon;
                switch (action.icon) {
                  case 'route':
                    Icon = Route;
                    break;
                  case 'rupee':
                    Icon = IndianRupee;
                    break;
                  case 'wallet':
                    Icon = Wallet;
                    break;
                  case 'gift':
                    Icon = Gift;
                    break;
                  case 'truck':
                    Icon = Truck;
                    break;
                  case 'file':
                    Icon = FileText;
                    break;
                  case 'user':
                    Icon = User;
                    break;
                  case 'help':
                    Icon = HelpCircle;
                    break;
                  case 'shield':
                    Icon = ShieldAlert;
                    break;
                  default:
                    Icon = Zap;
                }
                return (
                  <button
                    key={action.id}
                    className="flex flex-col items-center justify-center p-4 bg-surface rounded-2xl border border-border hover:border-primary/50 hover:bg-elevated hover:shadow-glow transition-all active:scale-95"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                      <Icon size={24} />
                    </div>
                    <span className="text-xs font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Two Column Section: Performance & Stats */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Driver Performance */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Award size={24} className="text-primary" />
                Driver Performance
              </h2>
              <div className="bg-surface p-6 rounded-3xl border border-border">
                <div className="grid grid-cols-2 gap-5">
                  <div className="text-center p-4 bg-elevated rounded-2xl">
                    <div className="text-3xl font-bold text-success">{performanceData.acceptanceRate}%</div>
                    <div className="text-sm text-muted mt-1">Acceptance</div>
                  </div>
                  <div className="text-center p-4 bg-elevated rounded-2xl">
                    <div className="text-3xl font-bold text-success">{performanceData.completionRate}%</div>
                    <div className="text-sm text-muted mt-1">Completion</div>
                  </div>
                  <div className="text-center p-4 bg-elevated rounded-2xl">
                    <div className="text-3xl font-bold text-danger">{performanceData.cancellationRate}%</div>
                    <div className="text-sm text-muted mt-1">Cancellation</div>
                  </div>
                  <div className="text-center p-4 bg-elevated rounded-2xl">
                    <div className="text-3xl font-bold text-text">{performanceData.responseTime}</div>
                    <div className="text-sm text-muted mt-1">Response</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Ride Statistics */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Activity size={24} className="text-primary" />
                Ride Statistics
              </h2>
              <div className="bg-surface p-6 rounded-3xl border border-border">
                <div className="grid grid-cols-2 gap-5">
                  <div className="p-4 bg-elevated rounded-2xl">
                    <div className="text-2xl font-bold text-primary">{rideStats.today}</div>
                    <div className="text-sm text-muted">Trips Today</div>
                  </div>
                  <div className="p-4 bg-elevated rounded-2xl">
                    <div className="text-2xl font-bold text-primary">{rideStats.thisWeek}</div>
                    <div className="text-sm text-muted">This Week</div>
                  </div>
                  <div className="p-4 bg-elevated rounded-2xl">
                    <div className="text-2xl font-bold text-primary">{rideStats.thisMonth}</div>
                    <div className="text-sm text-muted">This Month</div>
                  </div>
                  <div className="p-4 bg-elevated rounded-2xl">
                    <div className="text-2xl font-bold text-primary">{rideStats.distanceCovered} km</div>
                    <div className="text-sm text-muted">Distance</div>
                  </div>
                  <div className="p-4 bg-elevated rounded-2xl">
                    <div className="text-2xl font-bold text-primary">{rideStats.hoursOnline}h</div>
                    <div className="text-sm text-muted">Hours Online</div>
                  </div>
                  <div className="p-4 bg-elevated rounded-2xl">
                    <div className="text-2xl font-bold text-primary">{rideStats.fuelEfficiency} km/l</div>
                    <div className="text-sm text-muted">Fuel Eff.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Two Column Section: Recent Activity & Incentives */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Activity size={24} className="text-primary" />
                Recent Activity
              </h2>
              <div className="bg-surface p-6 rounded-3xl border border-border">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        activity.type === 'ride-completed' ? 'bg-success/10 text-success' :
                        activity.type === 'bonus-earned' ? 'bg-primary/10 text-primary' :
                        activity.type === 'ride-accepted' ? 'bg-info/10 text-info' :
                        'bg-elevated text-muted'
                      }`}>
                        {activity.type === 'ride-completed' && <CheckCircle size={20} />}
                        {activity.type === 'bonus-earned' && <Gift size={20} />}
                        {activity.type === 'ride-accepted' && <Car size={20} />}
                        {activity.type === 'payout-received' && <Wallet size={20} />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted">{activity.description}</div>
                      </div>
                      <div className="text-right">
                        {activity.amount && (
                          <div className={`font-bold ${activity.amount > 0 ? 'text-success' : 'text-text'}`}>
                            +₹{activity.amount.toLocaleString()}
                          </div>
                        )}
                        <div className="text-xs text-muted">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Incentives & Rewards */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Gift size={24} className="text-primary" />
                Incentives &amp; Rewards
              </h2>
              <div className="bg-surface p-6 rounded-3xl border border-border space-y-6">
                {/* Daily Target */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Daily Target</span>
                    <span className="text-primary font-bold">{incentivesData.dailyTarget.current}/{incentivesData.dailyTarget.target} trips</span>
                  </div>
                  <div className="w-full bg-elevated rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-700"
                      style={{ width: `${(incentivesData.dailyTarget.current / incentivesData.dailyTarget.target) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-muted mt-1">Bonus: ₹{incentivesData.dailyTarget.bonus}</div>
                </div>
                {/* Weekly Target */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Weekly Target</span>
                    <span className="text-primary font-bold">{incentivesData.weeklyTarget.current}/{incentivesData.weeklyTarget.target} trips</span>
                  </div>
                  <div className="w-full bg-elevated rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-700"
                      style={{ width: `${(incentivesData.weeklyTarget.current / incentivesData.weeklyTarget.target) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-muted mt-1">Bonus: ₹{incentivesData.weeklyTarget.bonus}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-elevated p-4 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-primary">₹{incentivesData.currentBonus}</div>
                    <div className="text-sm text-muted">Current Bonus</div>
                  </div>
                  <div className="bg-elevated p-4 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-primary">₹{incentivesData.referralEarnings}</div>
                    <div className="text-sm text-muted">Referral Earnings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden">
        <BottomNavigation activeItem="dashboard" onMoreClick={() => setShowMore(true)} />
      </div>
      {/* More Drawer */}
      <MoreDrawer isOpen={showMore} onClose={() => setShowMore(false)} />
    </div>
  );
}

