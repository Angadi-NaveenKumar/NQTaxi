import { createElement as h, useState, useMemo } from "react";

// ========== UTILITIES ==========
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(amount);
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

// ========== STYLES ==========
const btnPrimary = "rounded-lg bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary/90";
const btnSecondary = "rounded-lg border border-gray-200 bg-surface px-6 py-3 font-semibold text-text transition-colors hover:border-primary";
const cardClass = "rounded-2xl border border-gray-200 bg-surface p-5 shadow-sm";
const inputClass = "mb-5 w-full rounded-lg border border-gray-200 bg-elevated px-3 py-3 text-text outline-none focus:border-primary";

// ========== WALLET DATA - ALL ZERO ==========
const INITIAL_BALANCE = 0;           // Zero balance
const INITIAL_PENDING = 0;           // Zero pending
const INITIAL_TRANSACTIONS = [];     // Empty transactions
const WEEKLY_EARNINGS = [            // All zero earnings
  { day: "Mon", amount: 0 },
  { day: "Tue", amount: 0 },
  { day: "Wed", amount: 0 },
  { day: "Thu", amount: 0 },
  { day: "Fri", amount: 0 },
  { day: "Sat", amount: 0 },
  { day: "Sun", amount: 0 },
];

// ========== WALLET DASHBOARD PAGE ==========
export default function WalletDashboard() {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [pending, setPending] = useState(INITIAL_PENDING);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
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
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      description: "Wallet top-up",
      type: "credit",
      category: "topup",
      amount,
      status: "completed"
    }, ...prev]);
    setAmountInput("");
    setModal(null);
    showMessage(`₹${amount.toFixed(2)} added to your wallet.`);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput);
    if (!amount || amount <= 0) { showMessage("Enter a valid amount."); return; }
    if (amount > balance) { showMessage("Insufficient balance."); return; }
    setBalance(b => b - amount);
    setTransactions(prev => [{
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      description: "Withdrawal to bank",
      type: "debit",
      category: "withdrawal",
      amount,
      status: "completed"
    }, ...prev]);
    setAmountInput("");
    setModal(null);
    showMessage(`₹${amount.toFixed(2)} withdrawn successfully.`);
  };

  const settlePending = () => {
    if (pending <= 0) return;
    setBalance(b => b + pending);
    setPending(0);
    setTransactions(prev => prev.map(t => t.status === "pending" ? { ...t, status: "completed" } : t));
    showMessage("Pending earnings have been added to your balance.");
  };

  function badgeClass(kind) {
    const map = { credit: "bg-success/20 text-success", debit: "bg-danger/20 text-danger", completed: "bg-info/20 text-info", pending: "bg-warning/20 text-warning" };
    return `inline-block rounded-full px-2.5 py-1 text-xs capitalize ${map[kind] ?? "bg-elevated text-muted"}`;
  }

  // Calculate stats from transactions
  const totalEarned = transactions.filter(t => t.type === "credit" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0);
  const weekTotal = WEEKLY_EARNINGS.reduce((sum, d) => sum + d.amount, 0);
  const rideCount = transactions.filter(t => t.category === "ride").length;

  return h("div", { className: "relative mx-auto max-w-5xl" },
    message && h("div", { className: "fixed top-6 right-6 z-50 rounded-lg bg-success px-5 py-3 text-sm text-text shadow-lg" }, message),

    h("section", { className: `${cardClass} mb-6` },
      h("h2", { className: "mb-2 text-lg font-bold text-text" }, "NQTaxi Wallet"),
      h("p", { className: "text-sm text-muted leading-relaxed" }, "Your wallet holds ride earnings, bonuses and refunds. Drivers receive payouts here after each trip. Add funds for faster checkout or withdraw to your bank anytime."),
      h("ul", { className: "grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4 mt-4" },
        h("li", { className: "rounded-lg bg-primary/15 px-3 py-2 font-medium text-text" }, "💰 Instant balance view"),
        h("li", { className: "rounded-lg bg-primary/15 px-3 py-2 font-medium text-text" }, "📊 Weekly earnings chart"),
        h("li", { className: "rounded-lg bg-primary/15 px-3 py-2 font-medium text-text" }, "⬆️ Add funds anytime"),
        h("li", { className: "rounded-lg bg-primary/15 px-3 py-2 font-medium text-text" }, "⬇️ Withdraw to bank")
      )
    ),

    h("section", { className: "mb-6 flex flex-wrap items-center justify-between gap-6 rounded-2xl border-2 border-primary bg-gradient-to-br from-elevated to-surface p-7" },
      h("div", null,
        h("span", { className: "text-xs font-medium tracking-wider text-muted uppercase" }, "Available Balance"),
        h("h1", { className: "mt-2 text-4xl font-bold text-primary md:text-5xl" }, formatCurrency(balance)),
        h("p", { className: "mt-2 flex flex-wrap items-center gap-3 text-text/90" }, "Pending: ", formatCurrency(pending),
          pending > 0 && h("button", { type: "button", onClick: settlePending, className: "rounded-md border border-info px-3 py-1 text-sm text-info hover:bg-info/10" }, "Settle")
        )
      ),
      h("div", { className: "flex w-full gap-3 sm:w-auto" },
        h("button", { type: "button", className: `flex-1 sm:flex-none ${btnPrimary}`, onClick: () => { setAmountInput(""); setModal("add"); } }, "Add Funds"),
        h("button", { type: "button", className: `flex-1 sm:flex-none ${btnSecondary}`, onClick: () => { setAmountInput(""); setModal("withdraw"); } }, "Withdraw")
      )
    ),

    h("section", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3" },
      h("div", { className: "rounded-xl border-2 border-gray-200 bg-surface p-5" }, h("span", { className: "text-sm text-muted" }, "Total Earned"), h("p", { className: "mt-2 text-xl font-bold text-text" }, formatCurrency(totalEarned))),
      h("div", { className: "rounded-xl border-2 border-gray-200 bg-surface p-5" }, h("span", { className: "text-sm text-muted" }, "This Week"), h("p", { className: "mt-2 text-xl font-bold text-text" }, formatCurrency(weekTotal))),
      h("div", { className: "rounded-xl border-2 border-gray-200 bg-surface p-5" }, h("span", { className: "text-sm text-muted" }, "Rides"), h("p", { className: "mt-2 text-xl font-bold text-text" }, rideCount))
    ),

    h("section", { className: "mb-6 rounded-xl border-2 border-gray-200 bg-surface p-6" },
      h("h2", { className: "mb-5 text-lg font-bold text-text" }, "Weekly Earnings"),
      h("div", { className: "flex h-40 items-end justify-between gap-2" },
        WEEKLY_EARNINGS.map(item =>
          h("div", { key: item.day, className: "flex flex-1 flex-col items-center" },
            h("div", { className: "flex h-28 w-full max-w-12 items-end justify-center" },
              h("div", { className: "w-full min-h-1 rounded-t-md bg-gradient-to-t from-primary to-primary/60", style: { height: `${(item.amount / maxWeekly) * 100}%` } })
            ),
            h("span", { className: "mt-2 text-xs text-muted" }, item.day)
          )
        )
      )
    ),

    h("section", { className: "rounded-xl border-2 border-gray-200 bg-surface p-6" },
      h("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-4" },
        h("h2", { className: "text-lg font-bold text-text" }, "Transaction History"),
        h("div", { className: "flex flex-wrap gap-2" },
          ["all", "credit", "debit", "pending"].map(f =>
            h("button", { key: f, type: "button", onClick: () => setFilter(f), className: ["rounded-lg border px-3.5 py-2 text-sm capitalize transition-colors", filter === f ? "border-info text-info" : "border-gray-200 bg-elevated text-muted hover:border-info"].join(" ") }, f)
          )
        )
      ),
      h("div", { className: "overflow-x-auto" },
        h("table", { className: "w-full min-w-[600px] border-collapse text-left text-sm" },
          h("thead", null, h("tr", { className: "border-b border-gray-200 text-xs text-muted uppercase" },
            h("th", { className: "py-3 pr-3" }, "Date"),
            h("th", { className: "py-3 pr-3" }, "Description"),
            h("th", { className: "py-3 pr-3" }, "Type"),
            h("th", { className: "py-3 pr-3" }, "Status"),
            h("th", { className: "py-3" }, "Amount")
          )),
          h("tbody", null,
            filteredTransactions.length === 0
              ? h("tr", null, h("td", { colSpan: 5, className: "py-10 text-center text-muted" }, "No transactions yet. Add funds to get started."))
              : filteredTransactions.map(tx =>
                  h("tr", { key: tx.id, className: "border-b border-elevated text-text/90" },
                    h("td", { className: "py-3.5 pr-3" }, formatDate(tx.date)),
                    h("td", { className: "py-3.5 pr-3" }, tx.description),
                    h("td", { className: "py-3.5 pr-3" }, h("span", { className: badgeClass(tx.type) }, tx.type)),
                    h("td", { className: "py-3.5 pr-3" }, h("span", { className: badgeClass(tx.status) }, tx.status)),
                    h("td", { className: `py-3.5 font-semibold ${tx.type === "credit" ? "text-success" : "text-danger"}` }, tx.type === "credit" ? "+" : "-", formatCurrency(tx.amount))
                  )
                )
          )
        )
      )
    ),

    modal && h("div", { className: "fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-5", onClick: () => setModal(null) },
      h("div", { className: "w-full max-w-md rounded-xl border-2 border-gray-200 bg-surface p-7", onClick: e => e.stopPropagation() },
        h("h3", { className: "mb-5 text-xl font-bold text-text" }, modal === "add" ? "Add Funds" : "Withdraw Funds"),
        h("form", { onSubmit: modal === "add" ? handleAddFunds : handleWithdraw },
          h("label", { className: "mb-2 block text-sm text-muted" }, "Amount (INR)"),
          h("input", { type: "number", min: "1", step: "0.01", placeholder: "0.00", value: amountInput, onChange: e => setAmountInput(e.target.value), className: inputClass, required: true }),
          h("div", { className: "flex justify-end gap-3" },
            h("button", { type: "button", className: btnSecondary, onClick: () => setModal(null) }, "Cancel"),
            h("button", { type: "submit", className: btnPrimary }, modal === "add" ? "Add" : "Withdraw")
          )
        )
      )
    )
  );
}