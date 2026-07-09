import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";
import { CreditCard, Check, QrCode, Wallet, RefreshCw, CheckCircle, ExternalLink, RotateCcw } from 'lucide-react';

export default function PaymentConfirmation() {
  const navigate = useNavigate();

  // Active ride state initialized from the user booking flow
  const [currentRide, setCurrentRide] = useState({
    rideId: "RIDE001",
    fare: 250,
    customerName: "Rahul"
  });

  const driver = {
    id: "DR001",
    name: "Ramesh"
  };

  // State: 'GENERATE' | 'PAID'
  const [qrStep, setQrStep] = useState('GENERATE');
  const [loading, setLoading] = useState(false);
  const [qrTimestamp, setQrTimestamp] = useState(Date.now());
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [simulatePayStatus, setSimulatePayStatus] = useState('UNPAID');

  // Wallet state initialized from driver_wallet_balance
  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem("driver_wallet_balance");
    return saved ? parseFloat(saved) : 1240;
  });

  // On mount, load the active ride details from the live booking flow if available
  useEffect(() => {
    try {
      localStorage.removeItem("nqtaxi_payment_status_RIDE001");
      const stored = localStorage.getItem("nqtaxi_active_booking");
      if (stored) {
        const booking = JSON.parse(stored);
        if (booking) {
          const rideId = booking.id ? booking.id.substring(0, 8).toUpperCase() : `RIDE-${Math.floor(100 + Math.random() * 900)}`;
          setCurrentRide({
            rideId: rideId,
            fare: booking.price || 250,
            customerName: booking.customerName || "Rahul Sharma"
          });
          localStorage.removeItem(`nqtaxi_payment_status_${rideId}`);
        }
      }
    } catch (err) {
      console.error("Error reading active booking:", err);
    }
  }, []);

  // Reset payment status and update QR timestamp when the ride details change
  useEffect(() => {
    localStorage.removeItem(`nqtaxi_payment_status_${currentRide.rideId}`);
    setQrTimestamp(Date.now());
  }, [currentRide.rideId]);

  // Set up storage listeners and polling to detect payment success from the customer scan tab
  useEffect(() => {
    const rideId = currentRide.rideId;
    const paymentStatusKey = `nqtaxi_payment_status_${rideId}`;

    // Function to handle payment success when detected
    const processPaymentSuccess = () => {
      if (qrStep === 'PAID') return;
      
      setLoading(true);
      setShowSimulateModal(false); // Close simulation modal if open
      setTimeout(() => {
        setLoading(false);
        setQrStep('PAID');

        // Increment wallet balance
        const currentBalance = parseFloat(localStorage.getItem("driver_wallet_balance") || "1240");
        const newBalance = currentBalance + currentRide.fare;
        localStorage.setItem("driver_wallet_balance", newBalance.toString());
        setWallet(newBalance);

        // Add transaction entry
        const txList = JSON.parse(localStorage.getItem("driver_transactions") || "[]");
        const newTx = {
          id: `tx-${Date.now()}`,
          date: new Date().toISOString(),
          description: `Ride ID: #${rideId} (Dropoff: MG Road)`,
          type: "credit",
          category: "ride",
          amount: currentRide.fare,
          status: "completed"
        };
        txList.unshift(newTx);
        localStorage.setItem("driver_transactions", JSON.stringify(txList));

        // Clean up active booking so user can start a fresh ride
        localStorage.removeItem("nqtaxi_active_booking");
      }, 1000);
    };

    // Listen to changes in localStorage from other tabs
    const handleStorageChange = (e) => {
      if (e.key === paymentStatusKey && e.newValue === 'PAID') {
        processPaymentSuccess();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Polling backup (in case tabs share same window context where storage event might not fire)
    const interval = setInterval(() => {
      const status = localStorage.getItem(paymentStatusKey);
      if (status === 'PAID') {
        processPaymentSuccess();
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [currentRide.rideId, currentRide.fare, qrStep]);

  // Generate dynamic QR Code Link pointing to customer pay page
  // We Base64 encode the ride JSON so it fits cleanly in the URL query string
  const qrPayload = JSON.stringify({
    rideId: currentRide.rideId,
    driverId: driver.id,
    driverName: driver.name,
    amount: currentRide.fare,
    customerName: currentRide.customerName,
    time: qrTimestamp
  });

  const encodedPayload = btoa(qrPayload);
  const payUrl = `${window.location.origin}/customer/scan-pay?data=${encodedPayload}`;

  const handleOpenSimulateModal = () => {
    setSimulatePayStatus('UNPAID');
    setShowSimulateModal(true);
  };

  const handleSimulatePayment = () => {
    setSimulatePayStatus('PROCESSING');
    setTimeout(() => {
      setSimulatePayStatus('SUCCESS');
      localStorage.setItem(`nqtaxi_payment_status_${currentRide.rideId}`, 'PAID');
      
      // Auto close modal after showing success screen for a brief moment
      setTimeout(() => {
        setShowSimulateModal(false);
      }, 1000);
    }, 3500);
  };

  const handleResetWallet = () => {
    localStorage.setItem("driver_wallet_balance", "1240");
    setWallet(1240);
  };

  return (
    <div id="payment-confirmation" className="space-y-6 scroll-mt-24 max-w-xl mx-auto">
      {/* Main Flow Container */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card-lg relative overflow-hidden space-y-6">
        {loading && (
          <div className="absolute inset-0 bg-[#0D0D0D]/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold text-text-secondary">Verifying payment status...</span>
          </div>
        )}

        {/* Dynamic Payment State Section */}
        {qrStep === 'PAID' ? (
          /* Payment Success State */
          <div className="flex flex-col items-center justify-center py-6 space-y-6 animate-[zoomIn_0.4s_ease-out]">
            <div className="w-20 h-20 rounded-full bg-success/10 border border-success/30 flex items-center justify-center text-success shadow-[0_0_20px_rgba(76,175,80,0.15)]">
              <CheckCircle size={44} className="animate-[pulse_1.5s_infinite]" />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-black text-success">Payment Received!</h3>
              <p className="text-sm text-text-secondary">
                Amount of ₹{currentRide.fare} paid successfully by customer.
              </p>
            </div>

            <div className="w-full bg-surface-elevated border border-white/5 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Ride ID</span>
                <span className="font-bold text-white font-mono">{currentRide.rideId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Amount Credited</span>
                <span className="font-bold text-primary">₹{currentRide.fare}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Customer</span>
                <span className="font-bold text-white">{currentRide.customerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Wallet Status</span>
                <span className="font-semibold text-success flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                  Successfully Updated
                </span>
              </div>
            </div>

            <div className="w-full pt-2">
              <button
                onClick={() => navigate('/driver/dashboard')}
                className="w-full bg-primary text-primary-fg py-4 px-4 rounded-xl font-bold hover:bg-primary/95 transition-colors active:scale-95 flex items-center justify-center"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Display Dynamic QR Code Flow */
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Dynamic Payment QR</h3>
              <p className="text-xs text-text-secondary">Show this QR code to the customer to collect payment.</p>
            </div>

            {/* Trip details overview */}
            <div className="grid grid-cols-2 gap-3 bg-surface-elevated border border-white/5 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider">Ride ID</span>
                <div className="font-bold font-mono text-sm text-white">{currentRide.rideId}</div>
              </div>
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider">Customer</span>
                <div className="font-bold text-sm text-white">{currentRide.customerName}</div>
              </div>
              <div className="mt-2">
                <span className="text-[10px] text-text-secondary uppercase tracking-wider">Driver</span>
                <div className="font-bold text-sm text-white">{driver.name}</div>
              </div>
              <div className="mt-2">
                <span className="text-[10px] text-text-secondary uppercase tracking-wider">Fare Amount</span>
                <div className="font-black text-sm text-primary">₹{currentRide.fare}</div>
              </div>
            </div>

            {/* QR Code Container */}
            <div 
              onClick={handleOpenSimulateModal}
              title="Click to simulate scan"
              className="flex flex-col items-center justify-center py-4 bg-white rounded-3xl border-4 border-primary/20 shadow-inner p-6 space-y-4 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="bg-white p-2 rounded-xl">
                <QRCode
                  value={payUrl}
                  size={200}
                  level="H"
                />
              </div>
              <span className="text-[10px] text-zinc-500 font-mono tracking-tight bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200 text-center max-w-[280px] truncate">
                {currentRide.rideId} | ₹{currentRide.fare}
              </span>
            </div>

            {/* Instructions box */}
            <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-[#F5C518] uppercase tracking-wider">Simulating Customer Scan</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Clicking the button or scanning the QR code will open the **Customer Scan & Pay Screen** simulation directly on this page, representing what the passenger sees.
              </p>
              
              <button
                onClick={handleOpenSimulateModal}
                className="w-full bg-primary text-black py-3 px-4 rounded-xl font-bold hover:bg-primary-dark transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-card"
              >
                <QrCode size={16} />
                Simulate Customer Scan
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Simulation Modal */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md bg-surface border border-border rounded-3xl p-6 shadow-card-lg relative overflow-hidden space-y-6 animate-[zoomIn_0.2s_ease-out]">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

            {/* Brand header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-black flex items-center justify-center font-black text-sm">NQ</div>
                <div>
                  <h2 className="text-sm font-bold text-white">NQTaxi Payment</h2>
                  <p className="text-[10px] text-text-secondary">Customer Scan & Pay Simulator</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSimulateModal(false)}
                className="text-text-secondary hover:text-white transition-colors text-lg font-bold p-1"
                aria-label="Close simulator"
              >
                ✕
              </button>
            </div>

            {simulatePayStatus === 'SUCCESS' ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-6 animate-[zoomIn_0.2s_ease-out]">
                <div className="w-20 h-20 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success shadow-[0_0_20px_rgba(76,175,80,0.1)]">
                  <CheckCircle size={44} className="animate-pulse" />
                </div>
                
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-black text-white">Payment Successful</h3>
                  <p className="text-sm text-text-secondary">
                    Amount of ₹{currentRide.fare} paid to {driver.name}.
                  </p>
                </div>

                <div className="w-full bg-surface-elevated border border-white/5 rounded-2xl p-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Transaction ID</span>
                    <span className="font-mono text-white">TX-{qrTimestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Amount Paid</span>
                    <span className="font-bold text-primary">₹{currentRide.fare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Recipient</span>
                    <span className="font-medium text-white">{driver.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Ride ID</span>
                    <span className="font-mono text-white">{currentRide.rideId}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
                {/* Header description */}
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">Confirm & Pay</h3>
                  <p className="text-xs text-text-secondary">Please check trip details below before paying.</p>
                </div>

                {/* Ride details panel */}
                <div className="bg-surface-elevated border border-white/5 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <span className="font-bold text-xs">👤</span>
                    </div>
                    <div>
                      <div className="text-[10px] text-text-secondary uppercase tracking-wider">Driver</div>
                      <div className="font-bold text-sm text-white">{driver.name}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-text-secondary uppercase tracking-wider">Ride ID</span>
                      <div className="font-bold font-mono text-xs text-white">{currentRide.rideId}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-secondary uppercase tracking-wider">Customer</span>
                      <div className="font-bold text-xs text-white">{currentRide.customerName}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex justify-between items-center">
                    <span className="text-sm font-bold text-white">Total Trip Cost</span>
                    <span className="text-2xl font-black text-primary">₹{currentRide.fare}</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={handleSimulatePayment}
                  disabled={simulatePayStatus === 'PROCESSING'}
                  className="w-full bg-primary text-black py-4 px-4 rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-card disabled:opacity-50 disabled:pointer-events-none"
                >
                  {simulatePayStatus === 'PROCESSING' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      Authorize Payment (₹{currentRide.fare})
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
