import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { bottomNavItems, moreMenuSections } from './NavigationConfig';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SidebarNavigation({ onLogout }) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const allNavItems = [
    ...bottomNavItems.filter((item) => !item.action),
    ...moreMenuSections.flatMap((section) => section.items),
  ];

  const uniqueItems = [];
  const seenPaths = new Set();
  const seenIds = new Set();

  for (const item of allNavItems) {
    if (item.action && item.id === 'logout') continue;
    if (item.path && item.path !== '#') {
      if (seenPaths.has(item.path)) continue;
      seenPaths.add(item.path);
    }
    if (seenIds.has(item.id)) continue;
    seenIds.add(item.id);
    uniqueItems.push(item);
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 hidden md:flex flex-col bg-surface border-r border-border transition-all duration-300">
      <div
        className={clsx(
          'flex flex-col h-full transition-all duration-300',
          isExpanded ? 'w-64' : 'w-20'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-border/50">
          {isExpanded && (
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 44 30" fill="none">
                <rect x="3" y="12" width="38" height="14" rx="4" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
                <path d="M10 12 L14 6 H30 L34 12 Z" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
              </svg>
              <span className="text-xl font-bold text-primary">NQTaxi</span>
            </div>
          )}
          {!isExpanded && (
            <div className="flex items-center justify-center w-full">
              <svg className="w-10 h-9" viewBox="0 0 44 30" fill="none">
                <rect x="3" y="12" width="38" height="14" rx="4" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
                <path d="M10 12 L14 6 H30 L34 12 Z" fill="#F5C518" stroke="#1A1A1A" strokeWidth="1.5" />
              </svg>
            </div>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-elevated transition-colors"
          >
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <div className="space-y-1">
            {uniqueItems.map((item) => {
              if (item.action && item.id === 'logout') return null;
              const isActive = item.path && location.pathname === item.path;
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path || '#'}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-3 rounded-xl transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted hover:text-text hover:bg-elevated/60'
                  )}
                >
                  <ItemIcon size={20} />
                  {isExpanded && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-border/50">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-danger hover:bg-red-500/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {isExpanded && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
