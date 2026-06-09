import { createElement as h, useState, useMemo } from "react";

// ========== STAR RATING COMPONENT ==========
function StarRating({ value, onChange, readOnly = false, size = "md" }) {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-3xl" };
  return h("div", { className: `flex gap-1 ${sizes[size]}` }, [1, 2, 3, 4, 5].map(star =>
    h("button", { key: star, type: "button", disabled: readOnly, onClick: () => onChange?.(star), className: readOnly ? "cursor-default" : "transition-transform hover:scale-110" },
      h("span", { className: star <= value ? "text-primary" : "text-border" }, "★")
    )
  ));
}

// ========== UTILITIES ==========
function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));
}

// ========== STYLES ==========
const btnPrimary = "rounded-xl bg-primary px-6 py-2.5 font-bold text-text transition-all hover:bg-primary-dark";
const cardClass = "rounded-2xl border border-gray-200 bg-surface p-5 shadow-sm";
const inputClass = "w-full rounded-xl border border-gray-200 bg-elevated px-4 py-3 text-text outline-none focus:border-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-text";

// ========== TOAST COMPONENT ==========
function Toast({ message }) {
  if (!message) return null;
  return h("div", { className: "fixed top-6 right-6 z-50 rounded-lg bg-success px-5 py-3 text-sm text-white shadow-lg" }, message);
}

// ========== REVIEWS DATA - ALL ZERO/EMPTY ==========
const INITIAL_REVIEWS = [];           // Empty reviews array

// ========== RATINGS & REVIEWS PAGE ==========
export default function RatingsReviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
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

  return h("div", { className: "relative mx-auto max-w-5xl" },
    h(Toast, { message: toast }),

    h("section", { className: `${cardClass} mb-6` },
      h("h2", { className: "mb-2 text-lg font-bold text-text" }, "Reviews & Ratings"),
      h("p", { className: "text-sm text-muted leading-relaxed" }, "See what passengers and drivers say about NQTaxi. Honest feedback helps us improve ride quality, driver behaviour, and app experience. Drivers with higher ratings get more trip requests. Share your own review after every completed ride.")
    ),

    h("section", { className: "mb-6 grid gap-6 lg:grid-cols-2" },
      h("div", { className: `${cardClass} flex flex-col items-center justify-center text-center` },
        h("p", { className: "text-sm text-muted uppercase tracking-wide" }, "Overall Rating"),
        h("p", { className: "mt-2 text-5xl font-bold text-primary" }, avgRating || "0"),
        h(StarRating, { value: Math.round(avgRating) || 0, readOnly: true, size: "lg" }),
        h("p", { className: "mt-2 text-muted" }, reviews.length, " review", reviews.length !== 1 ? "s" : "")
      ),
      h("div", { className: cardClass },
        h("h3", { className: "mb-4 font-semibold text-text" }, "Rating distribution"),
        reviews.length === 0
          ? h("p", { className: "text-muted text-sm" }, "No ratings yet. Be the first to review!")
          : h("ul", { className: "space-y-2" }, distribution.map(d =>
              h("li", { key: d.stars, className: "flex items-center gap-3 text-sm" },
                h("span", { className: "w-8 text-muted" }, d.stars, " ★"),
                h("div", { className: "h-2 flex-1 overflow-hidden rounded-full bg-elevated" },
                  h("div", { className: "h-full rounded-full bg-primary", style: { width: `${d.pct}%` } })
                ),
                h("span", { className: "w-6 text-right text-muted" }, d.count)
              )
            ))
      )
    ),

    h("section", { className: `${cardClass} mb-6` },
      h("h2", { className: "mb-2 text-lg font-bold text-text" }, "Customer Feedback"),
      h("p", { className: "mb-4 text-sm text-muted" }, "Tell us about your ride experience. Your feedback helps drivers improve and helps other passengers choose the best service. Rate your trip and leave a comment below."),
      h("form", { onSubmit: handleSubmit },
        h("label", { className: labelClass }, "Your rating"),
        h("div", { className: "mb-4" }, h(StarRating, { value: rating, onChange: setRating })),
        h("label", { className: labelClass }, "I am a"),
        h("div", { className: "mb-4 flex gap-3" },
          ["passenger", "driver"].map(r =>
            h("button", { key: r, type: "button", onClick: () => setRole(r), className: ["rounded-lg border px-4 py-2 text-sm capitalize", role === r ? "border-primary text-primary" : "border-gray-200 text-muted"].join(" ") }, r)
          )
        ),
        h("label", { className: labelClass }, "Title"),
        h("input", { className: `${inputClass} mb-4`, placeholder: "Great ride!", value: title, onChange: e => setTitle(e.target.value) }),
        h("label", { className: labelClass }, "Comment"),
        h("textarea", { className: `${inputClass} mb-4 min-h-[100px] resize-y`, placeholder: "Share your experience...", value: comment, onChange: e => setComment(e.target.value), required: true }),
        h("button", { type: "submit", className: btnPrimary }, "Submit Feedback")
      )
    ),

    h("section", { className: cardClass },
      h("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3" },
        h("h2", { className: "text-lg font-bold text-text" }, "Reviews"),
        h("div", { className: "flex gap-2" },
          ["all", "passenger", "driver"].map(f =>
            h("button", { key: f, type: "button", onClick: () => setFilter(f), className: ["rounded-lg border px-3 py-1.5 text-sm capitalize", filter === f ? "border-info text-info" : "border-gray-200 text-muted"].join(" ") }, f)
          )
        )
      ),
      filtered.length === 0
        ? h("p", { className: "py-10 text-center text-muted" }, "No reviews yet. Submit your first review above!")
        : h("ul", { className: "space-y-4" }, filtered.map(r =>
            h("li", { key: r.id, className: "rounded-lg border border-gray-200 bg-elevated/40 p-4" },
              h("div", { className: "flex flex-wrap items-start justify-between gap-2" },
                h("div", null,
                  h("div", { className: "flex items-center gap-2" },
                    h(StarRating, { value: r.rating, readOnly: true, size: "sm" }),
                    h("span", { className: "rounded-full bg-elevated px-2 py-0.5 text-xs capitalize text-muted" }, r.role)
                  ),
                  h("h4", { className: "mt-2 font-medium text-text" }, r.title),
                  h("p", { className: "mt-1 text-sm text-text/90" }, r.comment),
                  h("p", { className: "mt-2 text-xs text-muted" }, r.author, " · ", formatDate(r.date))
                ),
                h("button", { type: "button", className: "text-sm text-danger hover:underline", onClick: () => removeReview(r.id) }, "Delete")
              )
            )
          ))
    )
  );
}