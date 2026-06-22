import React from 'react';
import { CreditCard } from 'lucide-react';

export default function PaymentConfirmation() {
  const paymentSummary = {
    paymentMethod: 'UPI',
    totalFare: 'Rs. 286',
    platformFee: 'Rs. 34',
    driverEarnings: 'Rs. 252',
  };

  return (
    <div id="payment-confirmation" className="space-y-4 scroll-mt-24">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <CreditCard size={24} className="text-primary" />
        Payment Confirmation
      </h2>
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted">Payment Method</div>
            <div className="text-xl font-bold">{paymentSummary.paymentMethod}</div>
          </div>
          <span className="px-3 py-1 rounded-full bg-success/10 text-success border border-success/30 text-xs font-bold">
            Paid Successfully
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-elevated p-4 rounded-2xl">
            <span className="text-muted">Total Fare</span>
            <span className="font-bold">{paymentSummary.totalFare}</span>
          </div>
          <div className="flex items-center justify-between bg-elevated p-4 rounded-2xl">
            <span className="text-muted">Platform Fee</span>
            <span className="font-bold">{paymentSummary.platformFee}</span>
          </div>
          <div className="flex items-center justify-between bg-primary/10 p-4 rounded-2xl border border-primary/30">
            <span className="text-primary font-medium">Driver Earnings</span>
            <span className="font-bold text-primary">{paymentSummary.driverEarnings}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
