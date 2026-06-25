import React, { useState, useMemo } from "react";

// Star Rating Component
function StarRating({ value, onChange, readOnly = false, size = "md" }) {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-3xl" };
  return (
    <div className={`flex gap-1 ${sizes[size]}`}>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className={readOnly ? "cursor-default" : "transition-transform hover:scale-110"}
        >
          <span className={star <= value ? "text-primary" : "text-border"}>★</span>
        </button>
      ))}
    </div>
  );
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));
}

function Toast({ message }) {
  if (!message) return null;
  return <div className="fixed top-6 right-6 z-50 rounded-lg bg-success px-5 py-3 text-sm text-white shadow-lg">{message}</div>;
}

export default function RatingsReviews() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [role, setRole] = useState("passenger");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0];
    reviews.forEach((r) => { counts[r.rating] = (counts[r.rating] || 0) + 1; });
    const max = Math.max(...counts.slice(1), 1);
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars, count: counts[stars] || 0, pct: ((counts[stars] || 0) / max) * 100,
    }));
  }, [reviews]);

  const filtered = useMemo(() => {
    if (filter === "all") return reviews;
    return reviews.filter(r => r.role === filter);
  }, [reviews, filter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) { notify("Please write a review comment."); return; }
    setReviews(prev => [{
      id: `rev-${Date.now()}`,
      date: new Date().toISOString(),
      rating,
      title: title.trim() || "Trip review",
      comment: comment.trim(),
      role,
      author: role === "driver" ? "Driver" : "Passenger"
    }, ...prev]);
    setRating(5); setTitle(""); setComment("");
    notify("Review submitted. Thank you!");
  };

  const removeReview = (id) => { setReviews(prev => prev.filter(r => r.id !== id)); notify("Review removed."); };

  return (
    <div className="relative mx-auto max-w-5xl">
      <Toast message={toast} />

      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm mb-6">
        <h2 className="mb-2 text-lg font-bold text-text">Reviews & Ratings</h2>
        <p className="text-sm text-muted leading-relaxed">
          See what passengers and drivers say about NQTaxi. Honest feedback helps us improve ride quality,
          driver behaviour, and app experience. Drivers with higher ratings get more trip requests.
        </p>
      </section>

      <section className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-sm text-muted uppercase tracking-wide">Overall Rating</p>
          <p className="mt-2 text-5xl font-bold text-primary">{avgRating || "0"}</p>
          <StarRating value={Math.round(avgRating) || 0} readOnly={true} size="lg" />
          <p className="mt-2 text-muted">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h3 className="mb-4 font-semibold text-text">Rating distribution</h3>
          {reviews.length === 0 ? (
            <p className="text-muted text-sm">No ratings yet. Be the first to review!</p>
          ) : (
            <ul className="space-y-2">
              {distribution.map(d => (
                <li key={d.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-8 text-muted">{d.stars} ★</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-elevated">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="w-6 text-right text-muted">{d.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm mb-6">
        <h2 className="mb-2 text-lg font-bold text-text">Customer Feedback</h2>
        <p className="mb-4 text-sm text-muted">
          Tell us about your ride experience. Rate your trip and leave a comment below.
        </p>
        <form onSubmit={handleSubmit}>
          <label className="mb-1.5 block text-sm font-medium text-text">Your rating</label>
          <div className="mb-4"><StarRating value={rating} onChange={setRating} /></div>

          <label className="mb-1.5 block text-sm font-medium text-text">I am a</label>
          <div className="mb-4 flex gap-3">
            {["passenger", "driver"].map(r => (
              <button key={r} type="button" onClick={() => setRole(r)}
                className={`rounded-lg border px-4 py-2 text-sm capitalize ${role === r ? "border-primary text-primary" : "border-border text-muted"}`}>
                {r}
              </button>
            ))}
          </div>

          <label className="mb-1.5 block text-sm font-medium text-text">Title</label>
          <input className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary mb-4"
            placeholder="Great ride!" value={title} onChange={e => setTitle(e.target.value)} />

          <label className="mb-1.5 block text-sm font-medium text-text">Comment</label>
          <textarea className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary mb-4 min-h-[100px] resize-y"
            placeholder="Share your experience..." value={comment} onChange={e => setComment(e.target.value)} required />

          <button type="submit" className="rounded-xl bg-primary px-6 py-2.5 font-bold text-black transition-all hover:bg-primary-dark">
            Submit Feedback
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-text">Reviews</h2>
          <div className="flex gap-2">
            {["all", "passenger", "driver"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-lg border px-3 py-1.5 text-sm capitalize ${filter === f ? "border-info text-info" : "border-border text-muted"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-muted">No reviews yet. Submit your first review above!</p>
        ) : (
          <ul className="space-y-4">
            {filtered.map(r => (
              <li key={r.id} className="rounded-lg border border-border bg-elevated/40 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <StarRating value={r.rating} readOnly={true} size="sm" />
                      <span className="rounded-full bg-elevated px-2 py-0.5 text-xs capitalize text-muted">{r.role}</span>
                    </div>
                    <h4 className="mt-2 font-medium text-text">{r.title}</h4>
                    <p className="mt-1 text-sm text-text/90">{r.comment}</p>
                    <p className="mt-2 text-xs text-muted">{r.author} · {formatDate(r.date)}</p>
                  </div>
                  <button onClick={() => removeReview(r.id)} className="text-sm text-danger hover:underline">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}