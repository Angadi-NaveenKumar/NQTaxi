import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';

export default function StatCard({ title, value, icon: Icon, trend, trendType, subtext }) {
  return (
    <div className="bg-surface p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group">
      <div className="flex items-start justify-between mb-4">
        <span className="text-muted text-sm font-medium tracking-wide">{title}</span>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-elevated text-muted group-hover:text-primary group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300">
            <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
        )}
      </div>
      
      <div className="text-3xl font-bold text-text tracking-tight mb-2">
        {value}
      </div>
      
      {(trend || subtext) && (
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {trend !== undefined && (
            <span
              className={clsx(
                'text-xs font-semibold flex items-center gap-0.5 px-2 py-0.5 rounded-full',
                trendType === 'success' ? 'bg-success/10 text-success' : 
                trendType === 'danger' ? 'bg-danger/10 text-danger' : 
                'bg-elevated text-muted'
              )}
            >
              {trendType === 'success' ? <TrendingUp size={12} /> : trendType === 'danger' ? <TrendingDown size={12} /> : null}
              {trend}
            </span>
          )}
          {subtext && <span className="text-xs text-muted font-medium">{subtext}</span>}
        </div>
      )}
    </div>
  );
}
