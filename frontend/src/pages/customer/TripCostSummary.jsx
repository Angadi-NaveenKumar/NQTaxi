import React, { useState } from "react";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(amount);
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));
}

export default function TripCostSummary() {
  const [trips, setTrips] = useState([]);
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

  return (
    <div className="relative mx-auto max-w-5xl">
      {toast && <div className="fixed top-6 right-6 z-50 rounded-lg bg-success px-5 py-3 text-sm text-white shadow-lg">{toast}</div>}

      <button onClick={() => setModal(true)} className="rounded-xl bg-primary px-6 py-2.5 font-bold text-black transition-all hover:bg-primary-dark">+ Add Trip</button>

      <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 mt-4">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm text-muted">Total Trips</p>
          <p className="mt-2 text-xl font-bold text-text">{trips.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm text-muted">Total Spent</p>
          <p className="mt-2 text-xl font-bold text-text">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm text-muted">Avg Fare</p>
          <p className="mt-2 text-xl font-bold text-text">{formatCurrency(avgFare)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm text-muted">Distance</p>
          <p className="mt-2 text-xl font-bold text-text">{totalDistance.toFixed(1)} km</p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-text">Trip History & Cost Breakdown</h2>
        {trips.length === 0 ? (
          <p className="py-12 text-center text-muted">No trips yet. Add a trip to see cost summary.</p>
        ) : (
          <ul className="space-y-4">
            {trips.map(trip => {
              const open = expandedId === trip.id;
              const b = trip.breakdown;
              return (
                <li key={trip.id} className="rounded-lg border border-border bg-elevated/40 overflow-hidden">
                  <button onClick={() => setExpandedId(open ? null : trip.id)}
                    className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left hover:bg-elevated/80">
                    <div>
                      <p className="font-medium text-text">{trip.pickup} → {trip.dropoff}</p>
                      <p className="text-sm text-muted">{formatDate(trip.date)} · {trip.distanceKm} km · {trip.durationMin} min</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{formatCurrency(trip.total)}</p>
                      <span className="text-xs text-info">{open ? "Hide" : "Details"}</span>
                    </div>
                  </button>
                  {open && (
                    <div className="border-t border-border bg-surface/50 px-4 py-4">
                      <table className="w-full text-sm text-text/90">
                        <tbody>
                          <tr><td className="py-1">Base fare</td><td className="py-1 text-right">{formatCurrency(b.baseFare)}</td></tr>
                          <tr><td className="py-1">Distance fare</td><td className="py-1 text-right">{formatCurrency(b.distanceFare)}</td></tr>
                          <tr><td className="py-1">Time fare</td><td className="py-1 text-right">{formatCurrency(b.timeFare)}</td></tr>
                          <tr><td className="py-1">Surge</td><td className="py-1 text-right text-warning">+{formatCurrency(b.surge)}</td></tr>
                          <tr><td className="py-1">Tax (GST)</td><td className="py-1 text-right">{formatCurrency(b.tax)}</td></tr>
                          <tr><td className="py-1">Discount</td><td className="py-1 text-right text-success">-{formatCurrency(b.discount)}</td></tr>
                          <tr className="border-t border-border font-semibold text-text">
                            <td className="pt-2">Total</td><td className="pt-2 text-right text-primary">{formatCurrency(trip.total)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {modal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/60 p-5" onClick={() => setModal(false)}>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm my-8 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="mb-5 text-xl font-bold text-text">Add Trip — Cost Summary</h3>
            <form onSubmit={handleAddTrip}>
              <label className="mb-1.5 block text-sm font-medium text-text">Pickup</label>
              <input className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary mb-4"
                value={form.pickup} onChange={handleChange("pickup")} placeholder="Pickup location" required />
              
              <label className="mb-1.5 block text-sm font-medium text-text">Drop-off</label>
              <input className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary mb-4"
                value={form.dropoff} onChange={handleChange("dropoff")} placeholder="Drop-off location" required />
              
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text">Distance (km)</label>
                  <input type="number" min="0" step="0.1" className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary"
                    value={form.distanceKm} onChange={handleChange("distanceKm")} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text">Duration (min)</label>
                  <input type="number" min="0" className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary"
                    value={form.durationMin} onChange={handleChange("durationMin")} />
                </div>
              </div>
              
              <p className="mb-3 text-sm font-medium text-text/90">Fare breakdown (INR)</p>
              <div className="mb-4 grid grid-cols-2 gap-3">
                {["baseFare", "distanceFare", "timeFare", "surge", "tax", "discount"].map(key => (
                  <div key={key}>
                    <label className="mb-1 block text-xs text-muted">{key}</label>
                    <input type="number" min="0" step="0.01" className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary"
                      value={form[key]} onChange={handleChange(key)} />
                  </div>
                ))}
              </div>
              
              <p className="mb-4 text-right text-lg font-bold text-primary">Total: {formatCurrency(calcTotal(form))}</p>
              
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setModal(false)}
                  className="rounded-xl border-2 border-border bg-surface px-6 py-2.5 font-bold text-text hover:border-primary">Cancel</button>
                <button type="submit" className="rounded-xl bg-primary px-6 py-2.5 font-bold text-black hover:bg-primary-dark">Save Trip</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}