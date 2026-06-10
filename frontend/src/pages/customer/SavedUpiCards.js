import { createElement as h, useState } from "react";

// ========== STYLES ==========
const btnPrimary = "rounded-xl bg-primary px-6 py-2.5 font-bold text-text transition-all hover:bg-primary-dark";
const btnSecondary = "rounded-xl border-2 border-gray-200 bg-surface px-6 py-2.5 font-bold text-text transition-all hover:border-primary";
const cardClass = "rounded-2xl border border-gray-200 bg-surface p-5 shadow-sm";
const inputClass = "w-full rounded-xl border border-gray-200 bg-elevated px-4 py-3 text-text outline-none focus:border-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-text";

// ========== TOAST COMPONENT ==========
function Toast({ message }) {
  if (!message) return null;
  return h("div", { className: "fixed top-6 right-6 z-50 rounded-lg bg-success px-5 py-3 text-sm text-white shadow-lg" }, message);
}

// ========== PAYMENT DATA - ALL ZERO/EMPTY ==========
const INITIAL_UPI_LIST = [];      // Empty array - no UPIs
const INITIAL_CARDS_LIST = [];    // Empty array - no cards

function maskCard(number) {
  const digits = number.replace(/\D/g, "");
  return `•••• •••• •••• ${digits.slice(-4) || "0000"}`;
}

// ========== SAVED UPI & CARDS PAGE ==========
export default function SavedUpiCards() {
  const [view, setView] = useState("hub");
  const [upiList, setUpiList] = useState(INITIAL_UPI_LIST);
  const [cards, setCards] = useState(INITIAL_CARDS_LIST);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiName, setUpiName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardType, setCardType] = useState("Visa");

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
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

  const handleAddUpi = (e) => {
    e.preventDefault();
    if (!upiId.includes("@")) {
      notify("Enter a valid UPI ID.");
      return;
    }
    const isFirst = upiList.length === 0;
    setUpiList(list => [
      { id: `upi-${Date.now()}`, upiId: upiId.trim(), name: upiName.trim() || "My UPI", isDefault: isFirst },
      ...list.map(u => ({ ...u, isDefault: isFirst ? false : u.isDefault }))
    ]);
    setUpiId("");
    setUpiName("");
    setModal(null);
    notify("UPI saved.");
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 12) {
      notify("Enter a valid card number.");
      return;
    }
    const isFirst = cards.length === 0;
    setCards(list => [
      {
        id: `card-${Date.now()}`,
        last4: digits.slice(-4),
        masked: maskCard(digits),
        holder: cardName.trim() || "Card Holder",
        expiry: cardExpiry,
        type: cardType,
        isDefault: isFirst
      },
      ...list.map(c => ({ ...c, isDefault: isFirst ? false : c.isDefault }))
    ]);
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setModal(null);
    notify("Card saved.");
  };

  const tabBtn = (active) => [
    "rounded-xl border-2 px-4 py-2 text-sm font-bold transition-colors",
    active ? "border-primary bg-primary/20 text-text" : "border-gray-200 bg-surface text-muted hover:border-primary"
  ].join(" ");

  // UPI View
  if (view === "upi") {
    return h("div", { className: "relative mx-auto max-w-5xl" },
      h(Toast, { message: toast }),
      h("div", { className: "mb-6 flex flex-wrap items-center gap-3" },
        h("button", { type: "button", className: btnSecondary, onClick: () => setView("hub") }, "← Back"),
        h("button", { type: "button", className: tabBtn(true) }, "UPI"),
        h("button", { type: "button", className: tabBtn(false), onClick: () => setView("cards") }, "Cards")
      ),
      h("button", { type: "button", className: btnPrimary, onClick: () => setModal("upi") }, "+ Add UPI"),
      h("section", { className: `${cardClass} mt-6` },
        h("h2", { className: "mb-4 text-lg font-bold text-text" }, "Saved UPI"),
        upiList.length === 0
          ? h("p", { className: "text-center py-8 text-muted" }, "No UPI IDs saved yet. Add one to pay after rides.")
          : upiList.map(u =>
              h("div", { key: u.id, className: "flex justify-between items-center p-3 border rounded-lg mb-2" },
                h("div", null,
                  h("p", { className: "font-medium" }, u.upiId),
                  h("p", { className: "text-sm text-muted" }, u.name),
                  u.isDefault && h("span", { className: "text-xs bg-primary/20 px-2 rounded-full" }, "Default")
                ),
                h("div", null,
                  !u.isDefault && h("button", { onClick: () => setDefaultUpi(u.id), className: "text-info mr-2" }, "Set default"),
                  h("button", { onClick: () => removeUpi(u.id), className: "text-danger" }, "Remove")
                )
              )
            )
      ),
      modal === "upi" && h("div", { className: "fixed inset-0 z-40 flex items-center justify-center bg-black/60", onClick: () => setModal(null) },
        h("div", { className: "bg-surface p-6 rounded-xl max-w-md w-full", onClick: e => e.stopPropagation() },
          h("h3", { className: "text-xl font-bold mb-4" }, "Add UPI"),
          h("form", { onSubmit: handleAddUpi },
            h("input", { className: inputClass, placeholder: "username@upi", value: upiId, onChange: e => setUpiId(e.target.value), required: true }),
            h("input", { className: inputClass, placeholder: "Label (optional)", value: upiName, onChange: e => setUpiName(e.target.value) }),
            h("div", { className: "flex gap-3 mt-4" },
              h("button", { type: "button", className: btnSecondary, onClick: () => setModal(null) }, "Cancel"),
              h("button", { type: "submit", className: btnPrimary }, "Save")
            )
          )
        )
      )
    );
  }

  // Cards View
  if (view === "cards") {
    return h("div", { className: "relative mx-auto max-w-5xl" },
      h(Toast, { message: toast }),
      h("div", { className: "mb-6 flex flex-wrap items-center gap-3" },
        h("button", { type: "button", className: btnSecondary, onClick: () => setView("hub") }, "← Back"),
        h("button", { type: "button", className: tabBtn(false), onClick: () => setView("upi") }, "UPI"),
        h("button", { type: "button", className: tabBtn(true) }, "Cards")
      ),
      h("button", { type: "button", className: btnPrimary, onClick: () => setModal("card") }, "+ Add Card"),
      h("section", { className: `${cardClass} mt-6` },
        h("h2", { className: "mb-4 text-lg font-bold text-text" }, "Saved Cards"),
        cards.length === 0
          ? h("p", { className: "text-center py-8 text-muted" }, "No cards saved yet. Add a card to pay for rides.")
          : cards.map(c =>
              h("div", { key: c.id, className: "flex justify-between items-center p-3 border rounded-lg mb-2" },
                h("div", { className: "flex items-center gap-3" },
                  h("div", { className: "bg-primary/20 px-3 py-1 rounded" }, c.type),
                  h("div", null,
                    h("p", { className: "font-mono" }, c.masked),
                    h("p", { className: "text-sm text-muted" }, c.holder, " · Exp ", c.expiry),
                    c.isDefault && h("span", { className: "text-xs bg-primary/20 px-2 rounded-full" }, "Default")
                  )
                ),
                h("div", null,
                  !c.isDefault && h("button", { onClick: () => setDefaultCard(c.id), className: "text-info mr-2" }, "Set default"),
                  h("button", { onClick: () => removeCard(c.id), className: "text-danger" }, "Remove")
                )
              )
            )
      ),
      modal === "card" && h("div", { className: "fixed inset-0 z-40 flex items-center justify-center bg-black/60", onClick: () => setModal(null) },
        h("div", { className: "bg-surface p-6 rounded-xl max-w-md w-full", onClick: e => e.stopPropagation() },
          h("h3", { className: "text-xl font-bold mb-4" }, "Add Card"),
          h("form", { onSubmit: handleAddCard },
            h("input", { className: inputClass, placeholder: "Card number", value: cardNumber, onChange: e => setCardNumber(e.target.value), required: true }),
            h("input", { className: inputClass, placeholder: "Name on card", value: cardName, onChange: e => setCardName(e.target.value) }),
            h("div", { className: "flex gap-3 mb-4" },
              h("input", { className: inputClass, placeholder: "MM/YY", value: cardExpiry, onChange: e => setCardExpiry(e.target.value) }),
              h("select", { className: inputClass, value: cardType, onChange: e => setCardType(e.target.value) },
                h("option", null, "Visa"),
                h("option", null, "Mastercard"),
                h("option", null, "RuPay")
              )
            ),
            h("div", { className: "flex gap-3 mt-4" },
              h("button", { type: "button", className: btnSecondary, onClick: () => setModal(null) }, "Cancel"),
              h("button", { type: "submit", className: btnPrimary }, "Save")
            )
          )
        )
      )
    );
  }

  // Hub View (default)
  return h("div", { className: "relative mx-auto max-w-5xl" },
    h(Toast, { message: toast }),
    h("section", { className: `${cardClass} mb-6` },
      h("h2", { className: "mb-2 text-lg font-bold text-text" }, "Payment Methods"),
      h("p", { className: "text-sm text-muted" }, "Choose how you want to pay for your rides. All payments are secured with encryption.")
    ),
    h("div", { className: "grid gap-4 sm:grid-cols-2" },
      h("button", {
        type: "button",
        onClick: () => setView("upi"),
        className: "group rounded-2xl border-2 border-gray-200 bg-surface p-8 text-left hover:border-primary hover:bg-primary/10"
      },
        h("span", { className: "text-4xl" }, "📱"),
        h("h3", { className: "mt-4 text-xl font-extrabold text-text" }, "UPI Payments"),
        h("p", { className: "mt-2 text-sm text-muted" }, "Google Pay, PhonePe, Paytm & more. Pay instantly after every ride."),
        h("span", { className: "mt-4 inline-block text-sm font-bold text-info" }, "Open UPI →")
      ),
      h("button", {
        type: "button",
        onClick: () => setView("cards"),
        className: "group rounded-2xl border-2 border-gray-200 bg-surface p-8 text-left hover:border-primary hover:bg-primary/10"
      },
        h("span", { className: "text-4xl" }, "💳"),
        h("h3", { className: "mt-4 text-xl font-extrabold text-text" }, "Cards — Details & Pay"),
        h("p", { className: "mt-2 text-sm text-muted" }, "Save Visa, Mastercard or RuPay. Card details used for ride payments."),
        h("span", { className: "mt-4 inline-block text-sm font-bold text-info" }, "Open Cards →")
      )
    )
  );
}