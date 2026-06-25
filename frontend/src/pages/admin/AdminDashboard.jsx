import { useState } from 'react';
import DashboardView from './DashboardView';
import UsersDirectory from './UsersDirectory';
import FleetOverview from './FleetOverview';
import Reports from './Reports';
import SupportInboxPage from './SupportInboxPage';
import FareSettingsPage from './FareSettingsPage';
import BookingsTablePage from './BookingsTablePage';

const PAGES = new Set([
  'dashboard',
  'users',
  'fleet',
  'analytics',
  'mail',
  'settings',
  'calendar',
]);

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

  if (activePage === 'analytics') {
    return (
      <Reports
        email={email}
        onLogout={onLogout}
        onNavigate={navigate}
      />
    );
  }

  if (activePage === 'mail') {
    return (
      <SupportInboxPage
        email={email}
        onLogout={onLogout}
        onNavigate={navigate}
      />
    );
  }

  if (activePage === 'settings') {
    return (
      <FareSettingsPage
        email={email}
        onLogout={onLogout}
        onNavigate={navigate}
      />
    );
  }

  if (activePage === 'calendar') {
    return (
      <BookingsTablePage
        email={email}
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
