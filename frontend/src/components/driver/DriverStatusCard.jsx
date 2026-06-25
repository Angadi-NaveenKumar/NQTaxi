import React from 'react';
import { Car, Wifi, CheckCircle2 } from 'lucide-react';
import { useAppStore, DRIVER_STATUS } from '../../store/useAppStore';
import AvailabilityToggle from './AvailabilityToggle';

export default function DriverStatusCard() {
  const { driver } = useAppStore();

  const getStatusColor = () => {
    switch (driver.status) {
      case DRIVER_STATUS.ONLINE:
        return 'text-success';
      case DRIVER_STATUS.BUSY:
        return 'text-warning';
      case DRIVER_STATUS.OFFLINE:
      default:
        return 'text-error';
    }
  };

  const getStatusBg = () => {
    switch (driver.status) {
      case DRIVER_STATUS.ONLINE:
        return 'bg-success/20 border-success/50';
      case DRIVER_STATUS.BUSY:
        return 'bg-warning/20 border-warning/50';
      case DRIVER_STATUS.OFFLINE:
      default:
        return 'bg-error/20 border-error/50';
    }
  };

  return (
    <div className={`bg-surface rounded-2xl border p-6 ${getStatusBg()}`}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center">
            <svg className="w-7 h-7 text-primary" viewBox="0 0 44 30" fill="none">
              <rect x="3" y="12" width="38" height="14" rx="4" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
              <path d="M10 12 L14 6 H30 L34 12 Z" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text flex items-center gap-2">
              {driver.status === DRIVER_STATUS.ONLINE ? (
                <CheckCircle2 size={18} className="text-success" />
              ) : driver.status === DRIVER_STATUS.BUSY ? (
                <Wifi size={18} className="text-warning" />
              ) : (
                <Wifi size={18} className="text-error opacity-50" />
              )}
              {driver.status}
            </h3>
            <p className="text-sm text-text-secondary">GPS Status: Connected</p>
            <p className="text-sm text-text-secondary">Vehicle: Ready</p>
          </div>
        </div>
        <AvailabilityToggle />
      </div>
    </div>
  );
}
