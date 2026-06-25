import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { moreMenuSections } from './NavigationConfig';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export default function MoreDrawer({ isOpen, onClose, onLogout }) {
  const location = useLocation();
  const Icon = ({ icon: IconComponent, ...props }) => <IconComponent {...props} />;

  if (!isOpen) return null;

  const handleItemClick = (item) => {
    if (item.action && item.id === 'logout') {
      onLogout();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer / Bottom Sheet */}
      <div className="relative w-full max-w-2xl bg-surface border-t border-border rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-border rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border/50">
          <h2 className="text-xl font-bold">More</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-elevated transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="max-h-[60vh] overflow-y-auto px-4 py-4">
          {moreMenuSections.map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="text-sm font-semibold text-text-secondary mb-3 px-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = item.path && location.pathname === item.path;
                  const ItemIcon = item.icon;
                  return item.path ? (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => handleItemClick(item)}
                      className={clsx(
                        'flex items-center gap-4 px-4 py-3 rounded-xl transition-all',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text hover:bg-elevated/60'
                      )}
                    >
                      <ItemIcon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={clsx(
                        'w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all',
                        item.id === 'logout'
                          ? 'text-danger hover:bg-red-500/10'
                          : 'text-text hover:bg-elevated/60'
                      )}
                    >
                      <ItemIcon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
