import React, { useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';

export default function CustomerRating() {
  const [customerRating, setCustomerRating] = useState(0);
  const [customerFeedback, setCustomerFeedback] = useState('');
  const customerName = 'Aarav Sharma';

  return (
    <div id="customer-rating" className="space-y-4 scroll-mt-24">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Star size={24} className="text-primary" />
        Customer Rating
      </h2>
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-lg space-y-5">
        <div>
          <div className="text-sm text-muted mb-3">Rate {customerName}</div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setCustomerRating(rating)}
                className="w-11 h-11 rounded-full bg-elevated border border-border hover:border-primary/60 transition-colors flex items-center justify-center active:scale-95"
                aria-label={`Rate customer ${rating} star${rating > 1 ? 's' : ''}`}
              >
                <Star
                  size={22}
                  className={rating <= customerRating ? 'text-primary fill-primary' : 'text-muted'}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted mb-2">Driver Feedback</div>
          <textarea
            value={customerFeedback}
            onChange={(event) => setCustomerFeedback(event.target.value)}
            rows={4}
            placeholder="Write feedback about the customer"
            className="w-full resize-none bg-elevated border border-border rounded-2xl p-4 text-text placeholder:text-muted focus:outline-none focus:border-primary/60"
          />
        </div>
        <button className="w-full bg-primary text-primary-fg py-3 px-4 rounded-2xl font-bold hover:bg-primary/90 transition-colors active:scale-95 flex items-center justify-center gap-2">
          <MessageSquare size={18} />
          Submit Rating
        </button>
      </div>
    </div>
  );
}
