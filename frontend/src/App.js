import { createElement as h } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

import Home from "./pages/customer/Home";
import WalletDashboard from "./pages/driver/WalletDashboard";
import ProfileSettings from "./pages/customer/ProfileSettings";
import RatingsReviews from "./pages/customer/RatingsReviews";
import SavedUpiCards from "./pages/customer/SavedUpiCards";
import TripCostSummary from "./pages/customer/TripCostSummary";
import DriverManagement from "./pages/admin/DriverManagement";

function NavLink({ to, children, icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return h(Link, {
    to,
    className: `flex flex-col items-center justify-center rounded-2xl px-4 py-3 transition-all duration-200 ${
      isActive
        ? "bg-primary/20 text-primary shadow-inner"
        : "bg-surface text-muted hover:bg-elevated hover:text-text"
    }`,
  },
    h("span", { className: "text-xl mb-1" }, icon),
    h("span", { className: "text-xs font-medium" }, children)
  );
}

// NQTAXI Logo Component
function NQTaxiLogo() {
  return h(Link, {
    to: "/",
    className: "flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
  },
    // Taxi icon
    h("svg", {
      className: "h-7 w-8 md:h-8 md:w-9",
      viewBox: "0 0 44 30",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
      h("rect", { x: "3", y: "12", width: "38", height: "14", rx: "4", fill: "#F5C518", stroke: "#1A1A1A", strokeWidth: "1.5" }),
      h("path", { d: "M10 12 L14 6 H30 L34 12 Z", fill: "#F5C518", stroke: "#1A1A1A", strokeWidth: "1.5" }),
      h("rect", { x: "16", y: "3", width: "12", height: "5", rx: "1.5", fill: "#1A1A1A" }),
      h("text", { x: "22", y: "7", textAnchor: "middle", fill: "#F5C518", fontSize: "3.5", fontWeight: "bold" }, "TX"),
      h("circle", { cx: "12", cy: "26", r: "3.5", fill: "#333" }),
      h("circle", { cx: "32", cy: "26", r: "3.5", fill: "#333" })
    ),
    // NQTAXI Text
    h("span", { className: "text-xl md:text-2xl font-bold tracking-tight", style: { color: "#F5C518" } }, "NQTAXI")
  );
}

function Layout({ children }) {
  return h("div", { className: "flex min-h-screen bg-background" },
    // Sidebar navigation
    h("aside", { className: "fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-surface/95 backdrop-blur-sm md:relative md:left-auto md:right-auto md:top-0 md:block md:w-24 md:border-r md:border-t-0 md:bg-surface/90 md:backdrop-blur-none" },
      h("nav", { className: "flex justify-around p-2 md:flex-col md:items-center md:justify-start md:gap-4 md:p-5" },
        h(NavLink, { to: "/", icon: "🏠" }, "Home"),
        h(NavLink, { to: "/wallet", icon: "💼" }, "Wallet"),
        h(NavLink, { to: "/profile", icon: "👤" }, "Profile"),
        h(NavLink, { to: "/reviews", icon: "⭐" }, "Reviews"),
        h(NavLink, { to: "/payments", icon: "💳" }, "Payments"),
        h(NavLink, { to: "/trips", icon: "🚕" }, "Trips"),
        h(NavLink, { to: "/drivers", icon: "👨‍✈️" }, "Drivers")
      )
    ),
    // Main content area with top bar
    h("div", { className: "flex-1" },
      // Top bar with logo (left) and profile icon (right)
      h("div", { className: "sticky top-0 z-20 border-b border-border bg-surface/95 px-4 py-2 backdrop-blur-sm md:px-6" },
        h("div", { className: "flex items-center justify-between" },
          // NQTAXI Logo on left
          h(NQTaxiLogo),
          // Profile icon on right
          h(Link, {
            to: "/profile",
            className: "flex h-10 w-10 items-center justify-center rounded-full bg-elevated transition-all hover:bg-primary/20 hover:scale-105 active:scale-95"
          }, h("span", { className: "text-lg" }, "👤"))
        )
      ),
      h("main", { className: "p-4 pb-20 md:p-6" }, children)
    )
  );
}

export default function App() {
  return h(BrowserRouter, null,
    h(Layout, null,
      h(Routes, null,
        h(Route, { path: "/", element: h(Home) }),
        h(Route, { path: "/wallet", element: h(WalletDashboard) }),
        h(Route, { path: "/profile", element: h(ProfileSettings) }),
        h(Route, { path: "/reviews", element: h(RatingsReviews) }),
        h(Route, { path: "/payments", element: h(SavedUpiCards) }),
        h(Route, { path: "/trips", element: h(TripCostSummary) }),
        h(Route, { path: "/drivers", element: h(DriverManagement) })
      )
    )
  );
}