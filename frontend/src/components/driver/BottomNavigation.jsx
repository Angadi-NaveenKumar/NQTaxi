
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { bottomNavItems } from './NavigationConfig';
import { clsx } from 'clsx';

export default function BottomNavigation({ activeItem, onMoreClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/98 backdrop-blur-xl border-t border-border pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {bottomNavItems.map((item) => {
          const [itemPath, itemHash] = item.path?.split('#') || [];
          const isActive = activeItem === item.id || (
            itemHash
              ? location.pathname === itemPath && location.hash === `#${itemHash}`
              : item.path && location.pathname === item.path
          );
          const Icon = item.icon;

          if (item.action) {
            return (
              <button
                key={item.id}
                onClick={onMoreClick}
                className={clsx(
                  'flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300',
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted hover:text-text hover:bg-elevated/50'
                )}
                aria-label={item.label}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon
                    size={24}
                    className={clsx(
                      'transition-all duration-300',
                      isActive ? 'scale-110' : 'scale-100'
                    )}
                  />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </div>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={(event) => {
                if (!itemHash || location.pathname !== itemPath) return;

                event.preventDefault();
                navigate(item.path);
                setTimeout(() => {
                  document.getElementById(itemHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 0);
              }}
              className={clsx(
                'flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300',
                isActive
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted hover:text-text hover:bg-elevated/50'
              )}
              aria-label={item.label}
            >
              <div className="flex flex-col items-center gap-1">
                <div className={clsx(
                  'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300',
                  isActive && 'bg-primary text-primary-fg'
                )}>
                  <Icon
                    size={isActive ? 22 : 24}
                    className={clsx(
                      'transition-all duration-300',
                      isActive ? 'scale-110' : 'scale-100'
                    )}
                  />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

