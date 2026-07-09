import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CreditCard, CheckCircle2, ShieldCheck, User, Car, ArrowRight } from 'lucide-react';

export default function CustomerScanPay() {
  const [searchParams] = useSearchParams();
  const [rideData, setRideData] = useState(null);
  const [payStatus, setPayStatus] = useState('UNPAID'); // 'UNPAID' | 'PROCESSING' | 'SUCCESS'
  const [error, setError] = useState('');

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (!dataParam) {
      setError('No ride data found. Please scan a valid NQTaxi driver QR code.');
      return;
    }

    try {
      // Decode Base64 payload containing ride information
      const decodedJson = atob(dataParam);
      const data = JSON.parse(decodedJson);
      setRideData(data);
    } catch (err) {
      console.error('Error decoding QR data:', err);
      setError('Invalid or corrupt QR code scanned. Please try again.');
    }
  }, [searchParams]);

  const handlePay = () => {
    if (!rideData) return;
    setPayStatus('PROCESSING');
    
    // Simulate API/Bank network latency
    setTimeout(() => {
      setPayStatus('SUCCESS');
      
      // Update payment status in localStorage, which will be detected by the driver page
      localStorage.setItem(`nqtaxi_payment_status_${rideData.rideId}`, 'PAID');
    }, 1500);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background text-text flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-surface p-6 rounded-3xl border border-danger/20 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center mx-auto text-xl font-bold">!</div>
          <h3 className="text-lg font-bold text-white">Scan Error</h3>
          <p className="text-sm text-text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  if (!rideData) {
    return (
      <div className="min-h-screen bg-background text-text flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-3xl p-6 shadow-card-lg relative overflow-hidden space-y-6">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

        {/* Brand header */}
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary text-black flex items-center justify-center font-black">NQ</div>
          <div>
            <h2 className="text-sm font-bold text-white">NQTaxi Payment</h2>
            <p className="text-[10px] text-text-secondary">Secure Digital Settlement</p>
          </div>
        </div>

        {payStatus === 'SUCCESS' ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-6 animate-[zoomIn_0.3s_ease-out]">
            <div className="w-20 h-20 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success shadow-[0_0_20px_rgba(76,175,80,0.1)]">
              <CheckCircle2 size={44} className="animate-[pulse_2s_infinite]" />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-black text-white">Payment Successful</h3>
              <p className="text-sm text-text-secondary">
                Amount of ₹{rideData.amount} paid to {rideData.driverName}.
              </p>
            </div>

            <div className="w-full bg-surface-elevated border border-white/5 rounded-2xl p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Transaction ID</span>
                <span className="font-mono text-white">TX-{rideData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Amount Paid</span>
                <span className="font-bold text-primary">₹{rideData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Recipient</span>
                <span className="font-medium text-white">{rideData.driverName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Ride ID</span>
                <span className="font-mono text-white">{rideData.rideId}</span>
              </div>
            </div>

            <div className="text-xs text-center text-text-secondary flex items-center justify-center gap-1.5 bg-success/5 border border-success/15 py-2 px-4 rounded-xl w-full">
              <ShieldCheck size={14} className="text-success" />
              This window can now be closed safely.
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header description */}
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Confirm & Pay</h3>
              <p className="text-xs text-text-secondary">Please check trip details below before paying.</p>
            </div>

            {/* Ride details panel */}
            <div className="bg-surface-elevated border border-white/5 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <User size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-text-secondary uppercase tracking-wider">Driver</div>
                  <div className="font-bold text-sm text-white">{rideData.driverName}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider">Ride ID</span>
                  <div className="font-bold font-mono text-xs text-white">{rideData.rideId}</div>
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider">Customer</span>
                  <div className="font-bold text-xs text-white">{rideData.customerName}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/50 flex justify-between items-center">
                <span className="text-sm font-bold text-white">Total Trip Cost</span>
                <span className="text-2xl font-black text-primary">₹{rideData.amount}</span>
              </div>
            </div>

            {/* Action buttons */}
            <button
              onClick={handlePay}
              disabled={payStatus === 'PROCESSING'}
              className="w-full bg-primary text-black py-4 px-4 rounded-xl font-bold hover:bg-primary-dark transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-card disabled:opacity-50 disabled:pointer-events-none"
            >
              {payStatus === 'PROCESSING' ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard size={18} />
                  Authorize Payment (₹{rideData.amount})
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
