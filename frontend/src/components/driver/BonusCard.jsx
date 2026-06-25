import React from 'react';
import { Gift, Award, CheckCircle, Clock } from 'lucide-react';
import { clsx } from 'clsx';

export default function BonusCard({ title, amount, currentProgress, targetProgress, status, description }) {
  const percentage = Math.min(Math.round((currentProgress / targetProgress) * 100), 100);
  const isCompleted = currentProgress >= targetProgress || status?.toLowerCase() === 'completed';

  return (
    <div className="bg-surface p-6 rounded-3xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Background Glow on Hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
      
      <div>
        {/* Header: Icon, Status */}
        <div className="flex items-center justify-between mb-4">
          <div className={clsx(
            'w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300',
            isCompleted ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
          )}>
            {isCompleted ? <Award size={24} /> : <Gift size={24} />}
          </div>
          
          <span className={clsx(
            'px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider',
            isCompleted ? 'bg-success/15 text-success' : 
            status?.toLowerCase() === 'active' ? 'bg-primary/15 text-primary animate-pulse' : 
            'bg-muted/15 text-muted'
          )}>
            {isCompleted ? 'Completed' : status || 'Active'}
          </span>
        </div>

        {/* Title & Amount */}
        <h4 className="text-lg font-bold text-text mb-1 leading-snug">{title}</h4>
        {description && <p className="text-xs text-muted mb-4 font-medium">{description}</p>}
        
        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="text-3xl font-extrabold text-primary">₹{amount}</span>
          <span className="text-xs text-muted font-bold uppercase tracking-wider">Bonus</span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-2.5 text-sm font-semibold">
          <span className="text-muted">Target Progress</span>
          <span className="text-text">{currentProgress} / {targetProgress} Trips</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-elevated rounded-full h-3 overflow-hidden border border-border/50">
          <div
            style={{ width: `${percentage}%` }}
            className={clsx(
              'h-full rounded-full transition-all duration-1000 ease-out',
              isCompleted ? 'bg-gradient-to-r from-success to-emerald-400' : 'bg-gradient-to-r from-primary to-yellow-400'
            )}
          />
        </div>
        
        <div className="flex items-center gap-1.5 mt-2.5 text-xs text-muted font-medium">
          {isCompleted ? (
            <>
              <CheckCircle size={14} className="text-success" />
              <span className="text-success font-bold">Reward ready to cash out!</span>
            </>
          ) : (
            <>
              <Clock size={14} className="text-primary" />
              <span>{targetProgress - currentProgress} more trips to unlock bonus</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
