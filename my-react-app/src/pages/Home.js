import { createElement as h, useState } from "react";

// ========== TAXI ICON COMPONENT ==========
function TaxiIcon({ className = "h-12 w-14 md:h-14 md:w-16" }) {
  return h("svg", { className, viewBox: "0 0 44 30", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    h("rect", { x: "3", y: "12", width: "38", height: "14", rx: "4", fill: "#FFCE00", stroke: "#1A1A1A", strokeWidth: "1.5" }),
    h("path", { d: "M10 12 L14 6 H30 L34 12 Z", fill: "#FFCE00", stroke: "#1A1A1A", strokeWidth: "1.5" }),
    h("rect", { x: "16", y: "3", width: "12", height: "5", rx: "1.5", fill: "#1A1A1A" }),
    h("text", { x: "22", y: "7", textAnchor: "middle", fill: "#FFCE00", fontSize: "3.5", fontWeight: "bold" }, "TAXI"),
    h("circle", { cx: "12", cy: "26", r: "3.5", fill: "#333" }),
    h("circle", { cx: "32", cy: "26", r: "3.5", fill: "#333" })
  );
}

// ========== HOME PAGE ==========
export default function Home() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  return h("div", { className: "relative min-h-screen" },
    // Background map effect
    h("div", { className: "absolute inset-0 bg-gradient-to-b from-map/60 via-[#e8f5e9] to-background" },
      h("div", { className: "absolute inset-0 opacity-30 home-map-grid" }),
      h("div", { className: "absolute left-1/2 top-1/3 -translate-x-1/2" },
        h("div", { className: "h-4 w-4 rounded-full bg-primary shadow-lg ring-4 ring-primary/40" })
      )
    ),

    // Main booking form - positioned at bottom
    h("div", { className: "absolute bottom-0 left-0 right-0 z-20 pl-20 md:pl-28" },
      h("div", { className: "mx-3 mb-4 rounded-t-3xl rounded-b-2xl bg-surface p-5 shadow-2xl md:mx-auto md:mb-6 md:max-w-lg" },
        // Logo and title
        h("div", { className: "flex items-center justify-center gap-3 mb-6" },
          h(TaxiIcon),
          h("span", { className: "text-2xl font-bold text-text" }, "NQTaxi")
        ),
        h("h2", { className: "mb-4 text-lg font-bold text-text text-center" }, "Where do you want to go?"),

        // Pickup input
        h("div", { className: "mb-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-elevated px-4 py-3" },
          h("span", { className: "h-3 w-3 shrink-0 rounded-full bg-success" }),
          h("input", {
            type: "text",
            placeholder: "Pickup location",
            value: pickup,
            onChange: (e) => setPickup(e.target.value),
            className: "w-full bg-transparent text-text outline-none placeholder:text-muted"
          })
        ),

        // Drop input
        h("div", { className: "mb-5 flex items-center gap-3 rounded-xl border border-gray-200 bg-elevated px-4 py-3" },
          h("span", { className: "h-3 w-3 shrink-0 rounded-sm bg-danger" }),
          h("input", {
            type: "text",
            placeholder: "Drop location",
            value: drop,
            onChange: (e) => setDrop(e.target.value),
            className: "w-full bg-transparent text-text outline-none placeholder:text-muted"
          })
        ),

        // Book ride button
        h("button", {
          type: "button",
          className: "w-full rounded-xl bg-primary py-4 text-base font-extrabold text-text shadow-md transition-colors hover:bg-primary-dark active:scale-[0.98]",
          onClick: () => {
            if (pickup && drop) {
              alert(`Booking ride from ${pickup} to ${drop}`);
            } else {
              alert("Please enter both pickup and drop locations");
            }
          }
        }, "Book Ride"),

        // Instruction text
        h("p", { className: "mt-3 text-center text-xs text-muted" },
          "Tap modules on the left → Wallet, UPI, Trips & Reviews"
        )
      )
    )
  );
}