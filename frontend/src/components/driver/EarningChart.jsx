import React, { useState } from 'react';
import { clsx } from 'clsx';

export default function EarningChart({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // If no data provided, use default mock data representing the screenshot values
  const chartData = data || [
    { day: 'Mon', rideEarnings: 600, incentives: 100, tips: 50 },
    { day: 'Tue', rideEarnings: 750, incentives: 120, tips: 40 },
    { day: 'Wed', rideEarnings: 500, incentives: 80, tips: 30 },
    { day: 'Thu', rideEarnings: 700, incentives: 150, tips: 60 },
    { day: 'Fri', rideEarnings: 900, incentives: 250, tips: 100 }, // Stacked green + yellow
    { day: 'Sat', rideEarnings: 450, incentives: 60, tips: 40 },
    { day: 'Sun', rideEarnings: 1000, incentives: 300, tips: 120 } // Stacked green + yellow
  ];

  // Calculate maximum total to scale the height of the bars
  const maxTotal = Math.max(
    ...chartData.map(d => (d.rideEarnings || 0) + (d.incentives || 0) + (d.tips || 0)),
    1000
  );

  return (
    <div className="bg-surface border border-border rounded-3xl p-6 shadow-card relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">This Week</span>
          <h3 className="text-3xl font-extrabold text-text mt-1">
            ₹{chartData.reduce((acc, curr) => acc + (curr.rideEarnings || 0) + (curr.incentives || 0) + (curr.tips || 0), 0).toLocaleString('en-IN')}
          </h3>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-muted">Rides</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-muted">Incentives</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="text-muted">Tips</span>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="flex h-56 items-end justify-between gap-3 pt-6 pb-2 px-1 relative">
        {chartData.map((item, index) => {
          const ride = item.rideEarnings || 0;
          const inc = item.incentives || 0;
          const tip = item.tips || 0;
          const total = ride + inc + tip;

          const ridePercent = (ride / maxTotal) * 100;
          const incPercent = (inc / maxTotal) * 100;
          const tipPercent = (tip / maxTotal) * 100;
          const totalPercent = (total / maxTotal) * 100;

          const isHovered = hoveredIndex === index;

          return (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute bottom-full mb-3 z-30 bg-elevated border border-border p-3 rounded-2xl shadow-card-lg text-left min-w-[130px] animate-fade-in">
                  <div className="text-xs font-bold text-text mb-1.5 border-b border-border/50 pb-1 flex justify-between">
                    <span>{item.day} Breakdown</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between gap-4">
                      <span className="text-success font-medium">Rides:</span>
                      <span className="text-text font-bold">₹{ride}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-primary font-medium">Incentives:</span>
                      <span className="text-text font-bold">₹{inc}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-warning font-medium">Tips:</span>
                      <span className="text-text font-bold">₹{tip}</span>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-border/30 pt-1 font-bold">
                      <span className="text-text">Total:</span>
                      <span className="text-primary">₹{total}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bar */}
              <div className="w-4 md:w-5 h-44 rounded-full bg-elevated/65 overflow-hidden flex flex-col justify-end transition-all duration-300 group-hover:bg-elevated cursor-pointer shadow-inner">
                {/* Tips Stack */}
                {tip > 0 && (
                  <div
                    style={{ height: `${tipPercent}%` }}
                    className="w-full bg-warning transition-all duration-500 rounded-t-full"
                  />
                )}
                {/* Incentives Stack */}
                {inc > 0 && (
                  <div
                    style={{ height: `${incPercent}%` }}
                    className={clsx(
                      'w-full bg-primary transition-all duration-500',
                      tip === 0 && 'rounded-t-full'
                    )}
                  />
                )}
                {/* Ride Earnings Stack */}
                {ride > 0 && (
                  <div
                    style={{ height: `${ridePercent}%` }}
                    className={clsx(
                      'w-full bg-success transition-all duration-500',
                      inc === 0 && tip === 0 && 'rounded-t-full'
                    )}
                  />
                )}
              </div>

              {/* X Axis Label */}
              <span className={clsx(
                'mt-2.5 text-xs font-semibold transition-colors duration-300',
                isHovered ? 'text-primary' : 'text-muted'
              )}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
