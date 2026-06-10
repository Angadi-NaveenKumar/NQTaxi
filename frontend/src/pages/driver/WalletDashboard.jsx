import React, { useState, useMemo } from "react";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(amount);
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

const WEEKLY_EARNINGS = [
  { day: "Mon", amount: 0 }, { day: "Tue", amount: 0 }, { day: "Wed", amount: 0 },
  { day: "Thu", amount: 0 }, { day: "Fri", amount: 0 }, { day: "Sat", amount: 0 }, { day: "Sun", amount: 0 },
];

export default function WalletDashboard() {
  const [balance, setBalance] = useState(0);
  const [pending, setPending] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [amountInput, setAmountInput] = useState("");
  const [message, setMessage] = useState("");

  const maxWeekly = Math.max(...WEEKLY_EARNINGS.map(d => d.amount), 1);

  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;
    if (filter === "pending") return transactions.filter(t => t.status === "pending");
    return transactions.filter(t => t.type === filter);
  }, [transactions, filter]);

  const showMessage = (text) => { setMessage(text); setTimeout(() => setMessage(""), 3000); };

  const handleAddFunds = (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput);
    if (!amount || amount <= 0) { showMessage("Enter a valid amount."); return; }
    setBalance(b => b + amount);
    setTransactions(prev => [{
      id: `tx-${Date.now()}`, date: new Date().toISOString(), description: "Wallet top-up",
      type: "credit", category: "topup", amount, status: "completed"
    }, ...prev]);
    setAmountInput(""); setModal(null);
    showMessage(`${formatCurrency(amount)} added to your wallet.`);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput);
    if (!amount || amount <= 0) { showMessage("Enter a valid amount."); return; }
    if (amount > balance) { showMessage("Insufficient balance."); return; }
    setBalance(b => b - amount);
    setTransactions(prev => [{
      id: `tx-${Date.now()}`, date: new Date().toISOString(), description: "Withdrawal to bank",
      type: "debit", category: "withdrawal", amount, status: "completed"
    }, ...prev]);
    setAmountInput(""); setModal(null);
    showMessage(`${formatCurrency(amount)} withdrawn successfully.`);
  };

  const badgeClass = (kind) => {
    const map = { credit: "bg-success/20 text-success", debit: "bg-danger/20 text-danger", completed: "bg-info/20 text-info", pending: "bg-warning/20 text-warning" };
    return `inline-block rounded-full px-2.5 py-1 text-xs capitalize ${map[kind] ?? "bg-elevated text-muted"}`;
  };

  const totalEarned = transactions.filter(t => t.type === "credit" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0);
  const weekTotal = WEEKLY_EARNINGS.reduce((sum, d) => sum + d.amount, 0);
  const rideCount = transactions.filter(t => t.category === "ride").length;

  return (
    <div className="relative mx-auto max-w-5xl">
      {message && <div className="fixed top-6 right-6 z-50 rounded-lg bg-success px-5 py-3 text-sm text-white shadow-lg">{message}</div>}

      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm mb-6">
        <h2 className="mb-2 text-lg font-bold text-text">NQTaxi Wallet</h2>
        <p className="text-sm text-muted leading-relaxed">
          Your wallet holds ride earnings, bonuses and refunds. Add funds for faster checkout or withdraw to your bank anytime.
        </p>
      </section>

      <section className="mb-6 flex flex-wrap items-center justify-between gap-6 rounded-2xl border-2 border-primary bg-gradient-to-br from-elevated to-surface p-7">
        <div>
          <span className="text-xs font-medium tracking-wider text-muted uppercase">Available Balance</span>
          <h1 className="mt-2 text-4xl font-bold text-primary md:text-5xl">{formatCurrency(balance)}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-3 text-text/90">
            Pending: {formatCurrency(pending)}
            {pending > 0 && <button onClick={() => { setBalance(b => b + pending); setPending(0); }} className="rounded-md border border-info px-3 py-1 text-sm text-info hover:bg-info/10">Settle</button>}
          </p>
        </div>
        <div className="flex w-full gap-3 sm:w-auto">
          <button onClick={() => { setAmountInput(""); setModal("add"); }} className="flex-1 sm:flex-none rounded-lg bg-primary px-6 py-3 font-semibold text-black transition-colors hover:bg-primary-dark">Add Funds</button>
          <button onClick={() => { setAmountInput(""); setModal("withdraw"); }} className="flex-1 sm:flex-none rounded-lg border border-border bg-surface px-6 py-3 font-semibold text-text transition-colors hover:border-primary">Withdraw</button>
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-border bg-surface p-5">
          <span className="text-sm text-muted">Total Earned</span>
          <p className="mt-2 text-xl font-bold text-text">{formatCurrency(totalEarned)}</p>
        </div>
        <div className="rounded-xl border-2 border-border bg-surface p-5">
          <span className="text-sm text-muted">This Week</span>
          <p className="mt-2 text-xl font-bold text-text">{formatCurrency(weekTotal)}</p>
        </div>
        <div className="rounded-xl border-2 border-border bg-surface p-5">
          <span className="text-sm text-muted">Rides</span>
          <p className="mt-2 text-xl font-bold text-text">{rideCount}</p>
        </div>
      </section>

      <section className="mb-6 rounded-xl border-2 border-border bg-surface p-6">
        <h2 className="mb-5 text-lg font-bold text-text">Weekly Earnings</h2>
        <div className="flex h-40 items-end justify-between gap-2">
          {WEEKLY_EARNINGS.map(item => (
            <div key={item.day} className="flex flex-1 flex-col items-center">
              <div className="flex h-28 w-full max-w-12 items-end justify-center">
                <div className="w-full min-h-1 rounded-t-md bg-gradient-to-t from-primary to-primary/60" style={{ height: `${(item.amount / maxWeekly) * 100}%` }} />
              </div>
              <span className="mt-2 text-xs text-muted">{item.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border-2 border-border bg-surface p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-text">Transaction History</h2>
          <div className="flex flex-wrap gap-2">
            {["all", "credit", "debit", "pending"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-lg border px-3.5 py-2 text-sm capitalize transition-colors ${filter === f ? "border-info text-info" : "border-border bg-elevated text-muted hover:border-info"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted uppercase">
                <th className="py-3 pr-3">Date</th><th className="py-3 pr-3">Description</th>
                <th className="py-3 pr-3">Type</th><th className="py-3 pr-3">Status</th><th className="py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr><td colSpan="5" className="py-10 text-center text-muted">No transactions yet. Add funds to get started.</td></tr>
              ) : (
                filteredTransactions.map(tx => (
                  <tr key={tx.id} className="border-b border-elevated text-text/90">
                    <td className="py-3.5 pr-3">{formatDate(tx.date)}</td>
                    <td className="py-3.5 pr-3">{tx.description}</td>
                    <td className="py-3.5 pr-3"><span className={badgeClass(tx.type)}>{tx.type}</span></td>
                    <td className="py-3.5 pr-3"><span className={badgeClass(tx.status)}>{tx.status}</span></td>
                    <td className={`py-3.5 font-semibold ${tx.type === "credit" ? "text-success" : "text-danger"}`}>
                      {tx.type === "credit" ? "+" : "-"}{formatCurrency(tx.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {modal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-5" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-xl border-2 border-border bg-surface p-7" onClick={e => e.stopPropagation()}>
            <h3 className="mb-5 text-xl font-bold text-text">{modal === "add" ? "Add Funds" : "Withdraw Funds"}</h3>
            <form onSubmit={modal === "add" ? handleAddFunds : handleWithdraw}>
              <label className="mb-2 block text-sm text-muted">Amount (INR)</label>
              <input type="number" min="1" step="0.01" placeholder="0.00" value={amountInput}
                onChange={e => setAmountInput(e.target.value)} className="mb-5 w-full rounded-lg border border-border bg-elevated px-3 py-3 text-text outline-none focus:border-primary" required />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setModal(null)} className="rounded-lg border border-border bg-surface px-6 py-3 font-semibold text-text hover:border-primary">Cancel</button>
                <button type="submit" className="rounded-lg bg-primary px-6 py-3 font-semibold text-black hover:bg-primary-dark">{modal === "add" ? "Add" : "Withdraw"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}