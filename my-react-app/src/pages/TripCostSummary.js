import { createElement as h, useState } from "react";

// ========== UTILITIES ==========
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(amount);
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));
}

// ========== STYLES ==========
const btnPrimary = "rounded-xl bg-primary px-6 py-2.5 font-bold text-text transition-all hover:bg-primary-dark";
const btnSecondary = "rounded-xl border-2 border-gray-200 bg-surface px-6 py-2.5 font-bold text-text transition-all hover:border-primary";
const cardClass = "rounded-2xl border border-gray-200 bg-surface p-5 shadow-sm";
const inputClass = "w-full rounded-xl border border-gray-200 bg-elevated px-4 py-3 text-text outline-none focus:border-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-text";

// ========== TRIP DATA - ALL ZERO/EMPTY ==========
const INITIAL_TRIPS = [];     // Empty trips array

// ========== TRIP COST SUMMARY PAGE ==========
export default function TripCostSummary() {
  const [trips, setTrips] = useState(INITIAL_TRIPS);
  const [expandedId, setExpandedId] = useState(null);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    pickup: "", dropoff: "", distanceKm: "", durationMin: "",
    baseFare: "", distanceFare: "", timeFare: "", surge: "0", tax: "0", discount: "0"
  });
  const [toast, setToast] = useState("");

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const calcTotal = (f) => {
    const n = (v) => parseFloat(v) || 0;
    return n(f.baseFare) + n(f.distanceFare) + n(f.timeFare) + n(f.surge) - n(f.discount) + n(f.tax);
  };

  const handleAddTrip = (e) => {
    e.preventDefault();
    if (!form.pickup.trim() || !form.dropoff.trim()) { notify("Enter pickup and drop-off locations."); return; }
    const total = calcTotal(form);
    if (total <= 0) { notify("Total fare must be greater than zero."); return; }
    const n = (v) => parseFloat(v) || 0;
    setTrips(prev => [{
      id: `trip-${Date.now()}`,
      date: new Date().toISOString(),
      pickup: form.pickup,
      dropoff: form.dropoff,
      distanceKm: n(form.distanceKm),
      durationMin: n(form.durationMin),
      breakdown: {
        baseFare: n(form.baseFare),
        distanceFare: n(form.distanceFare),
        timeFare: n(form.timeFare),
        surge: n(form.surge),
        tax: n(form.tax),
        discount: n(form.discount)
      },
      total,
      status: "completed"
    }, ...prev]);
    setForm({ pickup: "", dropoff: "", distanceKm: "", durationMin: "", baseFare: "", distanceFare: "", timeFare: "", surge: "0", tax: "0", discount: "0" });
    setModal(false);
    notify("Trip added to summary.");
  };

  const handleChange = (field) => (e) => { setForm(f => ({ ...f, [field]: e.target.value })); };

  const totalSpent = trips.reduce((s, t) => s + t.total, 0);
  const totalDistance = trips.reduce((s, t) => s + t.distanceKm, 0);
  const avgFare = trips.length > 0 ? totalSpent / trips.length : 0;

  return h("div", { className: "relative mx-auto max-w-5xl" },
    toast && h("div", { className: "fixed top-6 right-6 z-50 rounded-lg bg-success px-5 py-3 text-sm text-white shadow-lg" }, toast),

    h("button", { type: "button", className: btnPrimary, onClick: () => setModal(true) }, "+ Add Trip"),

    h("section", { className: "mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 mt-4" },
      h("div", { className: cardClass }, h("p", { className: "text-sm text-muted" }, "Total Trips"), h("p", { className: "mt-2 text-xl font-bold text-text" }, trips.length)),
      h("div", { className: cardClass }, h("p", { className: "text-sm text-muted" }, "Total Spent"), h("p", { className: "mt-2 text-xl font-bold text-text" }, formatCurrency(totalSpent))),
      h("div", { className: cardClass }, h("p", { className: "text-sm text-muted" }, "Avg Fare"), h("p", { className: "mt-2 text-xl font-bold text-text" }, formatCurrency(avgFare))),
      h("div", { className: cardClass }, h("p", { className: "text-sm text-muted" }, "Distance"), h("p", { className: "mt-2 text-xl font-bold text-text" }, `${totalDistance.toFixed(1)} km`))
    ),

    h("section", { className: cardClass },
      h("h2", { className: "mb-4 text-lg font-bold text-text" }, "Trip History & Cost Breakdown"),
      trips.length === 0
        ? h("p", { className: "py-12 text-center text-muted" }, "No trips yet. Add a trip to see cost summary.")
        : h("ul", { className: "space-y-4" }, trips.map(trip => {
            const open = expandedId === trip.id;
            const b = trip.breakdown;
            return h("li", { key: trip.id, className: "rounded-lg border border-gray-200 bg-elevated/40 overflow-hidden" },
              h("button", { type: "button", className: "flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left hover:bg-elevated/80", onClick: () => setExpandedId(open ? null : trip.id) },
                h("div", null, h("p", { className: "font-medium text-text" }, trip.pickup, " → ", trip.dropoff), h("p", { className: "text-sm text-muted" }, formatDate(trip.date), " · ", trip.distanceKm, " km · ", trip.durationMin, " min")),
                h("div", { className: "text-right" }, h("p", { className: "text-lg font-bold text-primary" }, formatCurrency(trip.total)), h("span", { className: "text-xs text-info" }, open ? "Hide" : "Details"))
              ),
              open && h("div", { className: "border-t border-gray-200 bg-surface/50 px-4 py-4" },
                h("table", { className: "w-full text-sm text-text/90" }, h("tbody", null,
                  h("tr", null, h("td", { className: "py-1" }, "Base fare"), h("td", { className: "py-1 text-right" }, formatCurrency(b.baseFare))),
                  h("tr", null, h("td", { className: "py-1" }, "Distance fare"), h("td", { className: "py-1 text-right" }, formatCurrency(b.distanceFare))),
                  h("tr", null, h("td", { className: "py-1" }, "Time fare"), h("td", { className: "py-1 text-right" }, formatCurrency(b.timeFare))),
                  h("tr", null, h("td", { className: "py-1" }, "Surge"), h("td", { className: "py-1 text-right text-warning" }, "+", formatCurrency(b.surge))),
                  h("tr", null, h("td", { className: "py-1" }, "Tax (GST)"), h("td", { className: "py-1 text-right" }, formatCurrency(b.tax))),
                  h("tr", null, h("td", { className: "py-1" }, "Discount"), h("td", { className: "py-1 text-right text-success" }, "-", formatCurrency(b.discount))),
                  h("tr", { className: "border-t border-gray-200 font-semibold text-text" }, h("td", { className: "pt-2" }, "Total"), h("td", { className: "pt-2 text-right text-primary" }, formatCurrency(trip.total)))
                ))
              )
            );
          })
        )
    ),

    modal && h("div", { className: "fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/60 p-5", onClick: () => setModal(false) },
      h("div", { className: `${cardClass} my-8 w-full max-w-lg max-h-[90vh] overflow-y-auto`, onClick: e => e.stopPropagation() },
        h("h3", { className: "mb-5 text-xl font-bold text-text" }, "Add Trip — Cost Summary"),
        h("form", { onSubmit: handleAddTrip },
          h("label", { className: labelClass }, "Pickup"), h("input", { className: inputClass, value: form.pickup, onChange: handleChange("pickup"), placeholder: "Pickup location", required: true }),
          h("label", { className: labelClass }, "Drop-off"), h("input", { className: inputClass, value: form.dropoff, onChange: handleChange("dropoff"), placeholder: "Drop-off location", required: true }),
          h("div", { className: "mb-4 grid grid-cols-2 gap-4" },
            h("div", null, h("label", { className: labelClass }, "Distance (km)"), h("input", { type: "number", min: "0", step: "0.1", className: inputClass, value: form.distanceKm, onChange: handleChange("distanceKm") })),
            h("div", null, h("label", { className: labelClass }, "Duration (min)"), h("input", { type: "number", min: "0", className: inputClass, value: form.durationMin, onChange: handleChange("durationMin") }))
          ),
          h("p", { className: "mb-3 text-sm font-medium text-text/90" }, "Fare breakdown (INR)"),
          h("div", { className: "mb-4 grid grid-cols-2 gap-3" },
            ["baseFare", "distanceFare", "timeFare", "surge", "tax", "discount"].map(key =>
              h("div", { key: key }, h("label", { className: "mb-1 block text-xs text-muted" }, key), h("input", { type: "number", min: "0", step: "0.01", className: inputClass, value: form[key], onChange: handleChange(key) }))
            )
          ),
          h("p", { className: "mb-4 text-right text-lg font-bold text-primary" }, "Total: ", formatCurrency(calcTotal(form))),
          h("div", { className: "flex justify-end gap-3" },
            h("button", { type: "button", className: btnSecondary, onClick: () => setModal(false) }, "Cancel"),
            h("button", { type: "submit", className: btnPrimary }, "Save Trip")
          )
        )
      )
    )
  );
}