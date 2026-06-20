import React from 'react';
import { Power } from 'lucide-react';
import { useAppStore, DRIVER_STATUS } from '../../store/useAppStore';

export default function AvailabilityToggle() {
  const { driver, setDriverStatus } = useAppStore();

  const handleToggle = () => {
    if (driver.hasActiveTrip && driver.status === DRIVER_STATUS.BUSY) {
      alert('Please complete your active trip before going offline.');
      return;
    }

    if (driver.status === DRIVER_STATUS.OFFLINE) {
      setDriverStatus(DRIVER_STATUS.ONLINE);
    } else if (driver.status === DRIVER_STATUS.ONLINE) {
      setDriverStatus(DRIVER_STATUS.OFFLINE);
    }
  };

  const isOnline = driver.status === DRIVER_STATUS.ONLINE;
  const isBusy = driver.status === DRIVER_STATUS.BUSY;

  return (
    <button
      onClick={handleToggle}
      disabled={isBusy}
      className={`flex items-center justify-center gap-3 px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
        isBusy
          ? 'bg-warning text-background cursor-not-allowed'
          : isOnline
          ? 'bg-success text-background hover:bg-success/90'
          : 'bg-error text-background hover:bg-error/90'
      }`}
    >
      <Power size={20} />
      <span>
        {isBusy ? 'Trip In Progress' : isOnline ? 'Go Offline' : 'Go Online'}
      </span>
    </button>
  );
}
