import React, { useState } from "react";

function Toast({ message }) {
  if (!message) return null;
  return <div className="fixed top-6 right-6 z-50 rounded-lg bg-success px-5 py-3 text-sm text-white shadow-lg">{message}</div>;
}

function maskCard(number) {
  const digits = number.replace(/\D/g, "");
  return `•••• •••• •••• ${digits.slice(-4) || "0000"}`;
}

export default function SavedUpiCards() {
  const [view, setView] = useState("hub");
  const [upiList, setUpiList] = useState([]);
  const [cards, setCards] = useState([]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiName, setUpiName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardType, setCardType] = useState("Visa");

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const setDefaultUpi = (id) => {
    setUpiList(list => list.map(u => ({ ...u, isDefault: u.id === id })));
    notify("Default UPI updated.");
  };

  const setDefaultCard = (id) => {
    setCards(list => list.map(c => ({ ...c, isDefault: c.id === id })));
    notify("Default card updated.");
  };

  const removeUpi = (id) => {
    setUpiList(list => list.filter(u => u.id !== id));
    notify("UPI removed.");
  };

  const removeCard = (id) => {
    setCards(list => list.filter(c => c.id !== id));
    notify("Card removed.");
  };

  const handleAddUpi = (e) => {
    e.preventDefault();
    if (!upiId.includes("@")) { notify("Enter a valid UPI ID."); return; }
    const isFirst = upiList.length === 0;
    setUpiList(list => [
      { id: `upi-${Date.now()}`, upiId: upiId.trim(), name: upiName.trim() || "My UPI", isDefault: isFirst },
      ...list.map(u => ({ ...u, isDefault: isFirst ? false : u.isDefault }))
    ]);
    setUpiId(""); setUpiName(""); setModal(null);
    notify("UPI saved.");
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 12) { notify("Enter a valid card number."); return; }
    const isFirst = cards.length === 0;
    setCards(list => [
      { id: `card-${Date.now()}`, last4: digits.slice(-4), masked: maskCard(digits), holder: cardName.trim() || "Card Holder", expiry: cardExpiry, type: cardType, isDefault: isFirst },
      ...list.map(c => ({ ...c, isDefault: isFirst ? false : c.isDefault }))
    ]);
    setCardNumber(""); setCardName(""); setCardExpiry(""); setModal(null);
    notify("Card saved.");
  };

  const tabBtn = (active) => [
    "rounded-xl border-2 px-4 py-2 text-sm font-bold transition-colors",
    active ? "border-primary bg-primary/20 text-text" : "border-border bg-surface text-muted hover:border-primary"
  ].join(" ");

  // UPI View
  if (view === "upi") {
    return (
      <div className="relative mx-auto max-w-5xl">
        <Toast message={toast} />
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button onClick={() => setView("hub")} className="rounded-xl border-2 border-border bg-surface px-6 py-2.5 font-bold text-text transition-all hover:border-primary">← Back</button>
          <button className={tabBtn(true)}>UPI</button>
          <button onClick={() => setView("cards")} className={tabBtn(false)}>Cards</button>
        </div>
        <button onClick={() => setModal("upi")} className="rounded-xl bg-primary px-6 py-2.5 font-bold text-black transition-all hover:bg-primary-dark">+ Add UPI</button>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm mt-6">
          <h2 className="mb-4 text-lg font-bold text-text">Saved UPI</h2>
          {upiList.length === 0 ? (
            <p className="text-center py-8 text-muted">No UPI IDs saved yet. Add one to pay after rides.</p>
          ) : (
            upiList.map(u => (
              <div key={u.id} className="flex justify-between items-center p-3 border border-border rounded-lg mb-2">
                <div>
                  <p className="font-medium text-text">{u.upiId}</p>
                  <p className="text-sm text-muted">{u.name}</p>
                  {u.isDefault && <span className="text-xs bg-primary/20 px-2 rounded-full text-primary">Default</span>}
                </div>
                <div>
                  {!u.isDefault && <button onClick={() => setDefaultUpi(u.id)} className="text-info mr-2">Set default</button>}
                  <button onClick={() => removeUpi(u.id)} className="text-danger">Remove</button>
                </div>
              </div>
            ))
          )}
        </section>

        {modal === "upi" && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60" onClick={() => setModal(null)}>
            <div className="bg-surface p-6 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-4 text-text">Add UPI</h3>
              <form onSubmit={handleAddUpi}>
                <input className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary mb-4"
                  placeholder="username@upi" value={upiId} onChange={e => setUpiId(e.target.value)} required />
                <input className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary mb-4"
                  placeholder="Label (optional)" value={upiName} onChange={e => setUpiName(e.target.value)} />
                <div className="flex gap-3">
                  <button type="button" onClick={() => setModal(null)} className="rounded-xl border-2 border-border bg-surface px-6 py-2.5 font-bold text-text hover:border-primary">Cancel</button>
                  <button type="submit" className="rounded-xl bg-primary px-6 py-2.5 font-bold text-black hover:bg-primary-dark">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Cards View
  if (view === "cards") {
    return (
      <div className="relative mx-auto max-w-5xl">
        <Toast message={toast} />
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button onClick={() => setView("hub")} className="rounded-xl border-2 border-border bg-surface px-6 py-2.5 font-bold text-text hover:border-primary">← Back</button>
          <button onClick={() => setView("upi")} className={tabBtn(false)}>UPI</button>
          <button className={tabBtn(true)}>Cards</button>
        </div>
        <button onClick={() => setModal("card")} className="rounded-xl bg-primary px-6 py-2.5 font-bold text-black hover:bg-primary-dark">+ Add Card</button>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm mt-6">
          <h2 className="mb-4 text-lg font-bold text-text">Saved Cards</h2>
          {cards.length === 0 ? (
            <p className="text-center py-8 text-muted">No cards saved yet. Add a card to pay for rides.</p>
          ) : (
            cards.map(c => (
              <div key={c.id} className="flex justify-between items-center p-3 border border-border rounded-lg mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 px-3 py-1 rounded text-primary">{c.type}</div>
                  <div>
                    <p className="font-mono text-text">{c.masked}</p>
                    <p className="text-sm text-muted">{c.holder} · Exp {c.expiry}</p>
                    {c.isDefault && <span className="text-xs bg-primary/20 px-2 rounded-full text-primary">Default</span>}
                  </div>
                </div>
                <div>
                  {!c.isDefault && <button onClick={() => setDefaultCard(c.id)} className="text-info mr-2">Set default</button>}
                  <button onClick={() => removeCard(c.id)} className="text-danger">Remove</button>
                </div>
              </div>
            ))
          )}
        </section>

        {modal === "card" && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60" onClick={() => setModal(null)}>
            <div className="bg-surface p-6 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-4 text-text">Add Card</h3>
              <form onSubmit={handleAddCard}>
                <input className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary mb-4"
                  placeholder="Card number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required />
                <input className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary mb-4"
                  placeholder="Name on card" value={cardName} onChange={e => setCardName(e.target.value)} />
                <div className="flex gap-3 mb-4">
                  <input className="flex-1 rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary"
                    placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} />
                  <select className="flex-1 rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary"
                    value={cardType} onChange={e => setCardType(e.target.value)}>
                    <option>Visa</option>
                    <option>Mastercard</option>
                    <option>RuPay</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setModal(null)} className="rounded-xl border-2 border-border bg-surface px-6 py-2.5 font-bold text-text hover:border-primary">Cancel</button>
                  <button type="submit" className="rounded-xl bg-primary px-6 py-2.5 font-bold text-black hover:bg-primary-dark">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Hub View (default)
  return (
    <div className="relative mx-auto max-w-5xl">
      <Toast message={toast} />
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm mb-6">
        <h2 className="mb-2 text-lg font-bold text-text">Payment Methods</h2>
        <p className="text-sm text-muted">Choose how you want to pay for your rides. All payments are secured with encryption.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <button onClick={() => setView("upi")}
          className="group rounded-2xl border-2 border-border bg-surface p-8 text-left hover:border-primary hover:bg-primary/10">
          <span className="text-4xl">📱</span>
          <h3 className="mt-4 text-xl font-extrabold text-text">UPI Payments</h3>
          <p className="mt-2 text-sm text-muted">Google Pay, PhonePe, Paytm & more. Pay instantly after every ride.</p>
          <span className="mt-4 inline-block text-sm font-bold text-info">Open UPI →</span>
        </button>

        <button onClick={() => setView("cards")}
          className="group rounded-2xl border-2 border-border bg-surface p-8 text-left hover:border-primary hover:bg-primary/10">
          <span className="text-4xl">💳</span>
          <h3 className="mt-4 text-xl font-extrabold text-text">Cards — Details & Pay</h3>
          <p className="mt-2 text-sm text-muted">Save Visa, Mastercard or RuPay. Card details used for ride payments.</p>
          <span className="mt-4 inline-block text-sm font-bold text-info">Open Cards →</span>
        </button>
      </div>
    </div>
  );
}