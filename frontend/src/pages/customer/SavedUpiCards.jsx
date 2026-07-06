import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
const GPayIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex-shrink-0 overflow-hidden">
    <img src="/gpay_logo.png" alt="Google Pay" className="w-8 h-8 object-contain" />
  </div>
);

const PhonePeIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex-shrink-0 overflow-hidden">
    <img src="/phonepe_logo.png" alt="PhonePe" className="w-8 h-8 object-contain" />
  </div>
);

const PatymIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex-shrink-0 overflow-hidden">
    <img src="/paytm_logo.png" alt="Patym" className="w-8 h-8 object-contain" />
  </div>
);

const GenericUpiIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex-shrink-0 overflow-hidden">
    <img src="/upi_logo.png" alt="UPI" className="w-8 h-8 object-contain" />
  </div>
);

const getAppIcon = (type) => {
  switch (type) {
    case "gpay":
      return <GPayIcon />;
    case "phonepe":
      return <PhonePeIcon />;
    case "patym":
      return <PatymIcon />;
    default:
      return <GenericUpiIcon />;
  }
};


function Toast({ message, type }) {
  if (!message) return null;
  const bgClass = type === "error" ? "bg-danger" : "bg-success";
  return <div className={`fixed top-6 right-6 z-50 rounded-lg ${bgClass} px-5 py-3 text-sm text-white shadow-lg`}>{message}</div>;
}

function maskCard(number) {
  const digits = number.replace(/\D/g, "");
  return `•••• •••• •••• ${digits.slice(-4) || "0000"}`;
}

export default function SavedUpiCards() {
  const navigate = useNavigate();
  const [view, setView] = useState("hub");
  const [upiList, setUpiList] = useState([
    { id: "upi-1", upiId: "9876543210@ybl", name: "PhonePe", appType: "phonepe", isDefault: true },
    { id: "upi-2", upiId: "john.doe@okaxis", name: "Google Pay", appType: "gpay", isDefault: false }
  ]);
  const [cards, setCards] = useState([]);
  const [selectedApp, setSelectedApp] = useState({ name: "", type: "", suffix: "" });
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");
  const [upiId, setUpiId] = useState("");
  const [upiName, setUpiName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardType, setCardType] = useState("Visa");

  const notify = (msg, type = "success") => { 
    setToast(msg); 
    setToastType(type); 
    setTimeout(() => { setToast(""); setToastType("success"); }, 3000); 
  };

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

  const handleSelectApp = (appName, appType, suffix) => {
    const schemes = {
      phonepe: "phonepe://",
      gpay: "gpay://",
      patym: "paytm://"
    };
    if (schemes[appType]) {
      setTimeout(() => {
        try {
          window.location.href = schemes[appType];
        } catch (e) {
          console.log("Could not open scheme:", e);
        }
      }, 50);
    }
    setSelectedApp({ name: appName, type: appType, suffix });
    setUpiId("");
    setUpiName("");
    setModal("upi");
  };

  const handleAddUpi = (e) => {
    e.preventDefault();
    let finalUpiId = upiId.trim();

    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (!upiRegex.test(finalUpiId)) {
      notify("Incorrect UPI ID. Please check and try again.", "error");
      return;
    }

    const parts = finalUpiId.split("@");
    const handle = parts[1].toLowerCase();

    if (selectedApp.type === "gpay") {
      const allowedGpay = ["okaxis", "okicici", "oksbi", "okhdfcbank"];
      if (!allowedGpay.includes(handle)) {
        notify("Incorrect UPI ID for Google Pay. Please check and try again.", "error");
        return;
      }
    } else if (selectedApp.type === "phonepe") {
      const allowedPhonepe = ["ybl", "ibl", "axl"];
      if (!allowedPhonepe.includes(handle)) {
        notify("Incorrect UPI ID for PhonePe. Please check and try again.", "error");
        return;
      }
    } else if (selectedApp.type === "patym") {
      const allowedPatym = ["patym"];
      if (!allowedPatym.includes(handle)) {
        notify("Incorrect UPI ID for Patym. Please check and try again.", "error");
        return;
      }
    }

    const isFirst = upiList.length === 0;
    setUpiList(list => [
      { 
        id: `upi-${Date.now()}`, 
        upiId: finalUpiId, 
        name: upiName.trim() || selectedApp.name, 
        appType: selectedApp.type, 
        isDefault: isFirst 
      },
      ...list.map(u => ({ ...u, isDefault: isFirst ? false : u.isDefault }))
    ]);
    setUpiId(""); 
    setUpiName(""); 
    setModal(null);
    notify(`${selectedApp.name} linked successfully.`);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 12) { notify("Enter a valid card number.", "error"); return; }
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
        <Toast message={toast} type={toastType} />
        
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setView("hub")}
            className="rounded-xl border-2 border-border bg-surface px-6 py-2.5 font-bold text-text transition-all hover:border-primary"
          >
            ← Back
          </button>
          <button className={tabBtn(true)}>UPI</button>
          <button onClick={() => setView("cards")} className={tabBtn(false)}>Cards</button>
        </div>

        {/* App Selector Grid */}
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm mb-6">
          <h2 className="mb-4 text-lg font-bold text-text">Choose UPI App to Link</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <button
              onClick={() => handleSelectApp("Google Pay", "gpay", "okaxis")}
              className="flex flex-col items-center justify-center p-5 rounded-xl border border-border bg-elevated hover:border-primary hover:bg-primary/5 transition-all text-center group"
            >
              <GPayIcon />
              <span className="font-bold text-sm text-text mt-3 group-hover:text-primary transition-colors">Google Pay</span>
              <span className="text-[10px] text-muted mt-1">@okaxis</span>
            </button>

            <button
              onClick={() => handleSelectApp("PhonePe", "phonepe", "ybl")}
              className="flex flex-col items-center justify-center p-5 rounded-xl border border-border bg-elevated hover:border-primary hover:bg-primary/5 transition-all text-center group"
            >
              <PhonePeIcon />
              <span className="font-bold text-sm text-text mt-3 group-hover:text-primary transition-colors">PhonePe</span>
              <span className="text-[10px] text-muted mt-1">@ybl</span>
            </button>

            <button
              onClick={() => handleSelectApp("Patym", "patym", "patym")}
              className="flex flex-col items-center justify-center p-5 rounded-xl border border-border bg-elevated hover:border-primary hover:bg-primary/5 transition-all text-center group"
            >
              <PatymIcon />
              <span className="font-bold text-sm text-text mt-3 group-hover:text-primary transition-colors">Patym</span>
              <span className="text-[10px] text-muted mt-1">@patym</span>
            </button>

            <button
              onClick={() => handleSelectApp("Other UPI", "other", "")}
              className="flex flex-col items-center justify-center p-5 rounded-xl border border-border bg-elevated hover:border-primary hover:bg-primary/5 transition-all text-center group"
            >
              <GenericUpiIcon />
              <span className="font-bold text-sm text-text mt-3 group-hover:text-primary transition-colors">Other UPI ID</span>
              <span className="text-[10px] text-muted mt-1">Any VPA ID</span>
            </button>
          </div>
        </section>

        {/* Saved UPI List */}
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-text">Saved UPI IDs</h2>
          {upiList.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-4xl block mb-3">📱</span>
              <p className="text-muted">No UPI IDs linked yet. Choose an app above to link one.</p>
            </div>
          ) : (
            upiList.map(u => (
              <div key={u.id} className="flex justify-between items-center p-4 border border-border rounded-xl mb-3 bg-surface-elevated/20 hover:bg-surface-elevated/40 transition-colors">
                <div className="flex items-center gap-4">
                  {getAppIcon(u.appType)}
                  <div>
                    <p className="font-bold text-text">{u.upiId}</p>
                    <p className="text-xs text-muted">{u.name}</p>
                    {u.isDefault && (
                      <span className="text-[10px] bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold uppercase mt-1 inline-block">
                        Default
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!u.isDefault && (
                    <button onClick={() => setDefaultUpi(u.id)} className="text-xs font-bold text-info hover:underline">
                      Set Default
                    </button>
                  )}
                  <button onClick={() => removeUpi(u.id)} className="text-xs font-bold text-danger hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Add UPI Modal */}
        {modal === "upi" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)}>
            <div className="bg-surface border border-border p-6 rounded-2xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-2">
                {getAppIcon(selectedApp.type)}
                <div>
                  <h3 className="text-xl font-bold text-text">Link {selectedApp.name}</h3>
                  <p className="text-xs text-muted">Securely link your UPI account</p>
                </div>
              </div>
              
              <form onSubmit={handleAddUpi} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    Enter Complete UPI ID (VPA)
                  </label>
                  <div className="flex rounded-xl border border-border bg-elevated overflow-hidden focus-within:border-primary">
                    <input
                      className="flex-1 bg-transparent px-4 py-3 text-text outline-none"
                      placeholder={selectedApp.suffix ? `e.g. username@${selectedApp.suffix}` : "e.g. username@bank"}
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {selectedApp.type !== "other" && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Account Nickname (Optional)</label>
                    <input
                      className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary"
                      placeholder="e.g. My GPay"
                      value={upiName}
                      onChange={e => setUpiName(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModal(null)}
                    className="flex-1 rounded-xl border-2 border-border bg-surface px-6 py-2.5 font-bold text-text hover:border-primary transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-primary px-6 py-2.5 font-bold text-black hover:bg-primary-dark transition-all"
                  >
                    Link App
                  </button>
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
        <Toast message={toast} type={toastType} />
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
      <Toast message={toast} type={toastType} />
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm mb-6">
        <h2 className="mb-3 text-2xl font-extrabold text-text">Payment Methods</h2>
        <p className="text-base text-muted leading-relaxed">
          Customers can pay for a ride using several payment methods, depending on what's available in their area:
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {/* Cash */}
        <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">💵</span>
              <h3 className="text-lg font-bold text-text">Cash</h3>
            </div>
            <p className="mt-3 text-sm text-muted">Pay the captain (driver) in cash after the ride ends.</p>
          </div>
          <div className="mt-5 text-xs font-semibold text-muted/50 uppercase tracking-wider">
            Available
          </div>
        </div>

        {/* UPI */}
        <button onClick={() => setView("upi")}
          className="group rounded-2xl border-2 border-border bg-surface p-6 text-left hover:border-primary hover:bg-primary/10 flex flex-col justify-between shadow-sm transition-all duration-300">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📱</span>
              <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">UPI</h3>
            </div>
            <p className="mt-3 text-sm text-muted">Pay using any UPI app such as Google Pay, PhonePe, Patym, or other UPI-enabled apps.</p>
          </div>
          <span className="mt-5 inline-block text-sm font-bold text-info group-hover:underline">Open UPI →</span>
        </button>

        {/* Debit/Credit Cards */}
        <button onClick={() => setView("cards")}
          className="group rounded-2xl border-2 border-border bg-surface p-6 text-left hover:border-primary hover:bg-primary/10 flex flex-col justify-between shadow-sm transition-all duration-300">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">💳</span>
              <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">Debit/Credit Cards</h3>
            </div>
            <p className="mt-3 text-sm text-muted">Add your card in the Rapido app and pay digitally.</p>
          </div>
          <span className="mt-5 inline-block text-sm font-bold text-info group-hover:underline">Open Cards →</span>
        </button>
      </div>
    </div>
  );
}