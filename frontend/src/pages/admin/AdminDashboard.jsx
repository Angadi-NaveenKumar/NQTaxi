import { useState } from 'react';
import DashboardView from './DashboardView';
import UsersDirectory from './UsersDirectory';
import FleetOverview from './FleetOverview';

const PAGES = new Set(['dashboard', 'users', 'fleet']);

export default function AdminDashboard({ email, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');

  const navigate = (pageId) => {
    if (PAGES.has(pageId)) {
      setActivePage(pageId);
    }
  };

  if (activePage === 'users') {
    return (
      <UsersDirectory
        email={email}
        onLogout={onLogout}
        onNavigate={navigate}
      />
    );
  }

  if (activePage === 'fleet') {
    return (
      <FleetOverview
        onLogout={onLogout}
        onNavigate={navigate}
      />
    );
  }

  return (
    <DashboardView
      email={email}
      onLogout={onLogout}
      onNavigate={navigate}
    />
  );
}
