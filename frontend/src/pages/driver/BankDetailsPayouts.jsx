import React, { useState } from 'react';
import DriverHead from '../../components/driver/DriverHead';
import BankCard from '../../components/driver/BankCard';
import { ShieldCheck, Info, X, Check } from 'lucide-react';

export default function BankDetailsPayouts() {
  const [bankDetails, setBankDetails] = useState({
    accountHolder: 'Rajesh Kumar',
    bankName: 'State Bank of India',
    accountNumber: '30245678901',
    ifsc: 'SBIN0001234'
  });

  const [payouts, setPayouts] = useState({
    available: 3200,
    pending: 1500,
    lastPayout: 14250
  });

  const [modalType, setModalType] = useState(null); // 'edit' | 'withdraw' | null
  const [formDetails, setFormDetails] = useState({ ...bankDetails });
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formDetails.accountHolder || !formDetails.bankName || !formDetails.accountNumber || !formDetails.ifsc) {
      showNotification('Please fill in all details.', 'danger');
      return;
    }
    setBankDetails({ ...formDetails });
    setModalType(null);
    showNotification('Bank details updated successfully!');
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      showNotification('Please enter a valid amount.', 'danger');
      return;
    }
    if (amount > payouts.available) {
      showNotification('Insufficient available balance.', 'danger');
      return;
    }

    setPayouts(prev => ({
      ...prev,
      available: prev.available - amount,
      pending: prev.pending + amount
    }));
    setWithdrawAmount('');
    setModalType(null);
    showNotification(`Withdrawal request of ₹${amount} submitted!`);
  };

  return (
    <div className="min-h-screen bg-background text-text pb-24 md:pb-8 flex flex-col relative">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 rounded-2xl border px-5 py-4 flex items-center gap-3 shadow-card-lg animate-slide-in ${
          notification.type === 'danger' 
            ? 'bg-danger/10 border-danger text-danger' 
            : 'bg-success/10 border-success text-success'
        }`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${notification.type === 'danger' ? 'bg-danger/20' : 'bg-success/20'}`}>
            {notification.type === 'danger' ? <X size={14} /> : <Check size={14} />}
          </div>
          <span className="text-sm font-bold">{notification.msg}</span>
        </div>
      )}

      {/* Navigation Header */}
      <DriverHead title="Bank Details &amp; Payouts" />

      {/* Main Body */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">
        <div className="flex gap-3 bg-primary/5 border border-primary/20 rounded-2xl p-4 text-xs text-muted leading-relaxed">
          <ShieldCheck size={18} className="text-primary shrink-0" />
          <p>
            Your account safety is our priority. Bank details updates require verification and may freeze withdrawal requests for 24 hours. Payouts are routed directly to the verified account shown.
          </p>
        </div>

        {/* Bank & Payout Information */}
        <BankCard
          accountHolder={bankDetails.accountHolder}
          bankName={bankDetails.bankName}
          accountNumber={bankDetails.accountNumber}
          ifsc={bankDetails.ifsc}
          availableBalance={payouts.available}
          pendingBalance={payouts.pending}
          lastPayout={payouts.lastPayout}
          onEditClick={() => {
            setFormDetails({ ...bankDetails });
            setModalType('edit');
          }}
          onWithdrawClick={() => {
            setWithdrawAmount(payouts.available.toString());
            setModalType('withdraw');
          }}
        />

        {/* FAQ Section */}
        <div className="bg-surface border border-border rounded-3xl p-6">
          <h4 className="text-lg font-bold text-text mb-4">Frequently Asked Questions</h4>
          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-bold text-text mb-1">When do I receive my payouts?</h5>
              <p className="text-xs text-muted">Weekly automatic settlements are processed on Mondays at 4:00 AM. Manual withdrawal requests are usually credited within 2-4 hours.</p>
            </div>
            <div className="border-t border-border/50 pt-3">
              <h5 className="text-sm font-bold text-text mb-1">Are there any transaction fees?</h5>
              <p className="text-xs text-muted">NQTaxi does not charge any fees for withdrawing balance to your verified bank account.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-surface border border-border rounded-3xl p-6 shadow-card-lg relative">
            <button 
              onClick={() => setModalType(null)} 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-elevated hover:bg-border text-muted hover:text-text flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>

            {modalType === 'edit' ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-text mb-2">Edit Bank Details</h3>
                
                <div>
                  <label className="text-xs text-muted font-bold uppercase tracking-wider block mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    required
                    value={formDetails.accountHolder}
                    onChange={(e) => setFormDetails(prev => ({ ...prev, accountHolder: e.target.value }))}
                    className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-text focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted font-bold uppercase tracking-wider block mb-1">Bank Name</label>
                  <input
                    type="text"
                    required
                    value={formDetails.bankName}
                    onChange={(e) => setFormDetails(prev => ({ ...prev, bankName: e.target.value }))}
                    className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-text focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted font-bold uppercase tracking-wider block mb-1">Account Number</label>
                  <input
                    type="text"
                    required
                    value={formDetails.accountNumber}
                    onChange={(e) => setFormDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                    className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-text font-mono focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted font-bold uppercase tracking-wider block mb-1">IFSC Code</label>
                  <input
                    type="text"
                    required
                    value={formDetails.ifsc}
                    onChange={(e) => setFormDetails(prev => ({ ...prev, ifsc: e.target.value.toUpperCase() }))}
                    className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-text font-mono focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="flex-1 bg-elevated hover:bg-border text-text font-bold py-3 rounded-xl border border-border transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-black font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-text mb-2">Request Withdrawal</h3>
                <p className="text-xs text-muted">Funds will be deposited to your verified account ending in <strong>{bankDetails.accountNumber.slice(-4)}</strong>.</p>
                
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex justify-between items-center my-2">
                  <span className="text-xs text-muted font-bold">Max Available</span>
                  <span className="text-base font-bold text-primary">₹{payouts.available.toLocaleString('en-IN')}</span>
                </div>

                <div>
                  <label className="text-xs text-muted font-bold uppercase tracking-wider block mb-1">Withdrawal Amount (₹)</label>
                  <input
                    type="number"
                    min="100"
                    max={payouts.available}
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-text font-bold focus:border-primary focus:outline-none"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="flex-1 bg-elevated hover:bg-border text-text font-bold py-3 rounded-xl border border-border transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-black font-bold py-3 rounded-xl transition-colors text-sm"
                  >
                    Confirm &amp; Send
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
