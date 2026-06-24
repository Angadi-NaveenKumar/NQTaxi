
import React from 'react';
import { Link } from 'react-router-dom';
import { moreMenuItems } from './NavigationConfig';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

export default function MoreDrawer({ isOpen, onClose, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 bg-surface border-t border-border rounded-t-3xl animate-slide-in-from-bottom max-h-[85vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-border rounded-full" />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-xl font-bold">More</h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-elevated hover:bg-border transition-colors">
            <X size={20} />
          </button>
        </div>
        {/* Menu Items */}
        <div className="px-6 py-4 space-y-6">
          {/* Driver Features */}
          <div>
            <h3 className="text-sm font-semibold text-muted mb-3">Driver Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {moreMenuItems.driverFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className="flex flex-col items-center justify-center p-4 bg-elevated rounded-2xl border border-border hover:border-primary/50 hover:bg-surface hover:shadow-glow transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
            </div>
          </div>
          {/* Safety & Support */}
          <div>
            <h3 className="text-sm font-semibold text-muted mb-3">Safety &amp; Support</h3>
            <div className="grid grid-cols-2 gap-3">
              {moreMenuItems.safetySupport.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className="flex flex-col items-center justify-center p-4 bg-elevated rounded-2xl border border-border hover:border-primary/50 hover:bg-surface hover:shadow-glow transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
            </div>
          </div>
          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-muted mb-3">Account</h3>
            <div className="space-y-3">
              {moreMenuItems.account.map((item) => {
              const Icon = item.icon;
              if (item.action) {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onLogout?.();
                    }}
                    className="w-full flex items-center gap-4 p-4 bg-elevated rounded-2xl border border-border hover:border-danger/50 text-danger hover:bg-danger/10 transition-all"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-danger/10 text-danger">
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              }
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 bg-elevated rounded-2xl border border-border hover:border-primary/50 hover:bg-surface hover:shadow-glow transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
            </div>
          </div>
        </div>
        <div className="h-6" />
      </div>
    </div>
  );
}

