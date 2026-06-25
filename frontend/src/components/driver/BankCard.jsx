import React from 'react';
import { CreditCard, Landmark, ArrowUpRight, ShieldCheck, Edit2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function BankCard({
  accountHolder,
  bankName,
  accountNumber,
  ifsc,
  availableBalance,
  pendingBalance,
  lastPayout,
  onEditClick,
  onWithdrawClick
}) {
  // Format bank account number to show masked version e.g. •••• •••• 1234
  const formatAccountNumber = (num) => {
    if (!num) return '•••• •••• ••••';
    const cleanNum = num.toString().replace(/\s/g, '');
    const lastFour = cleanNum.slice(-4);
    return `•••• •••• •••• ${lastFour}`;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 w-full">
      {/* 1. Sleek Virtual Bank Card */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-border/80 rounded-3xl p-6 shadow-card-lg relative overflow-hidden flex flex-col justify-between min-h-[220px] group hover:border-primary/45 transition-all duration-300">
        {/* Abstract card layout elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-info/5 rounded-full blur-2xl" />

        {/* Card Top: Bank Name and Icon */}
        <div className="flex justify-between items-start z-10">
          <div className="flex items-center gap-2">
            <Landmark size={22} className="text-primary" />
            <span className="font-bold text-sm tracking-wide text-text uppercase">{bankName || 'Partner Bank'}</span>
          </div>
          <button 
            onClick={onEditClick}
            className="w-8 h-8 rounded-full bg-elevated hover:bg-primary/20 text-muted hover:text-primary flex items-center justify-center transition-all duration-300 active:scale-95"
            title="Edit Bank Details"
          >
            <Edit2 size={14} />
          </button>
        </div>

        {/* Card Middle: Chip Icon & Account Number */}
        <div className="my-6 z-10">
          {/* Virtual Sim/Chip */}
          <div className="w-9 h-7 bg-amber-400/20 rounded-md mb-3 border border-amber-400/40 relative overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-amber-400/30" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-amber-400/30" />
          </div>
          
          <div className="text-xl font-mono tracking-widest text-text">
            {formatAccountNumber(accountNumber)}
          </div>
        </div>

        {/* Card Bottom: Holder Name and IFSC */}
        <div className="flex justify-between items-end z-10">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-muted font-bold block">Account Holder</span>
            <span className="text-sm font-semibold text-text uppercase">{accountHolder || 'Rajesh Kumar'}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-muted font-bold block">IFSC Code</span>
            <span className="text-sm font-mono font-semibold text-text">{ifsc || 'SBIN0001234'}</span>
          </div>
        </div>
      </div>

      {/* 2. Payout Details Card */}
      <div className="bg-surface border border-border rounded-3xl p-6 shadow-card flex flex-col justify-between min-h-[220px]">
        {/* Balances */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Available Balance</span>
              <h2 className="text-3xl font-extrabold text-primary tracking-tight mt-1">
                ₹{availableBalance?.toLocaleString('en-IN') || '0.00'}
              </h2>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-success bg-success/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <ShieldCheck size={12} />
              <span>Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-border/40 pt-4">
            <div>
              <span className="text-xs text-muted font-medium">Pending Payouts</span>
              <p className="text-base font-bold text-text mt-0.5">
                ₹{pendingBalance?.toLocaleString('en-IN') || '0.00'}
              </p>
            </div>
            <div>
              <span className="text-xs text-muted font-medium">Last Payout</span>
              <p className="text-base font-bold text-muted mt-0.5">
                ₹{lastPayout?.toLocaleString('en-IN') || '0.00'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={onWithdrawClick}
            disabled={!availableBalance || availableBalance <= 0}
            className={clsx(
              'w-full py-3.5 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98]',
              (!availableBalance || availableBalance <= 0)
                ? 'bg-elevated text-muted border border-border cursor-not-allowed'
                : 'bg-primary text-black hover:bg-primary-dark shadow-lg'
            )}
          >
            <span>Request Withdrawal</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
