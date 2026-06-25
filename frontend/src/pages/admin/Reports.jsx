import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from '../../layouts/AdminLayout';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0);
};

const formatDate = (iso) => {
  if (!iso) return "N/A";
  return new Date(iso).toLocaleDateString("en-IN");
};

const downloadCSV = (data, filename) => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(",")];
  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header] ?? "";
      const escaped = String(val).replace(/"/g, '""');
      return /[,\n"]/.test(escaped) ? `"${escaped}"` : escaped;
    });
    csvRows.push(values.join(","));
  }
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function Reports({ email = "admin@example.com", onLogout, onNavigate }) {
  const [reportType, setReportType] = useState("drivers");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReportData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay (optional)
      await new Promise((resolve) => setTimeout(resolve, 300));

      let rawData = [];
      if (reportType === "drivers") {
        rawData = JSON.parse(localStorage.getItem("nqTaxiDrivers") || "[]");
      } else if (reportType === "trips") {
        rawData = JSON.parse(localStorage.getItem("nqTaxiTrips") || "[]");
      } else if (reportType === "transactions") {
        rawData = JSON.parse(localStorage.getItem("nqTaxiTransactions") || "[]");
      }

      // Apply date filter if both dates are provided
      let filtered = [...rawData];
      if (startDate && endDate && rawData.length > 0) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        filtered = rawData.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= start && itemDate <= end;
        });
      }

      // Transform data for table display
      let reportData = [];
      if (reportType === "drivers") {
        reportData = filtered.map((d) => ({
          "Driver ID": d.id,
          "Full Name": d.fullName,
          Phone: d.phone,
          Email: d.email,
          "Vehicle Type": d.vehicleType,
          "Vehicle Number": d.vehicleNumber,
          "License Number": d.licenseNumber,
          "Experience (Years)": d.experienceYears,
          Status: d.status,
          Rating: d.rating || 0,
          "Total Rides": d.totalRides || 0,
          "Joined On": formatDate(d.createdAt),
        }));
      } else if (reportType === "trips") {
        reportData = filtered.map((t) => ({
          "Trip ID": t.id,
          Date: formatDate(t.date),
          Pickup: t.pickup,
          Dropoff: t.dropoff,
          "Distance (km)": t.distanceKm,
          "Duration (min)": t.durationMin,
          "Total Fare (₹)": t.total,
          Status: t.status || "Completed",
        }));
      } else if (reportType === "transactions") {
        reportData = filtered.map((tx) => ({
          "Transaction ID": tx.id,
          Date: formatDate(tx.date),
          Description: tx.description,
          Type: tx.type,
          Category: tx.category,
          "Amount (₹)": tx.amount,
          Status: tx.status,
        }));
      }

      setData(reportData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [reportType, startDate, endDate]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  const handleExport = () => {
    if (!data.length) {
      alert("No data to export. Please adjust filters.");
      return;
    }
    const filename = `${reportType}_report_${new Date().toISOString().slice(0, 19)}`;
    downloadCSV(data, filename);
  };

  return (
    <AdminLayout activePage="analytics" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="mx-auto max-w-7xl p-5 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">📊 Reports Exporter</h1>
          <p className="text-sm text-muted">Export driver, trip and transaction reports as CSV</p>
        </div>
        <button
          onClick={handleExport}
          disabled={loading || data.length === 0}
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-bold text-black transition-all hover:bg-primary-dark disabled:opacity-50"
        >
          📥 Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Report Type</label>
            <div className="flex gap-2">
              {["drivers", "trips", "transactions"].map((type) => (
                <button
                  key={type}
                  onClick={() => setReportType(type)}
                  className={`flex-1 rounded-xl border-2 px-3 py-2 text-sm font-medium capitalize transition-all ${
                    reportType === type
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border bg-elevated text-muted hover:border-primary/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-elevated px-4 py-2.5 text-text outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-elevated px-4 py-2.5 text-text outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-text">
          {reportType === "drivers" && "👨‍✈️ Driver Performance Report"}
          {reportType === "trips" && "🚕 Trip History Report"}
          {reportType === "transactions" && "💰 Wallet Transaction Report"}
        </h2>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}

        {error && <div className="rounded-lg bg-danger/10 p-4 text-center text-danger">{error}</div>}

        {!loading && !error && data.length === 0 && (
          <div className="py-12 text-center">
            <p className="mb-3 text-5xl">📭</p>
            <p className="text-muted">No data found for selected filters.</p>
            <p className="mt-2 text-xs text-muted">
              Try selecting a different report type or date range.
            </p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {Object.keys(data[0]).map((key) => (
                      <th key={key} className="px-3 py-2 text-left text-xs font-medium text-muted">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 20).map((row, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-elevated/30">
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-3 py-2 text-text">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.length > 20 && (
              <p className="mt-4 text-center text-xs text-muted">
                Showing first 20 of {data.length} rows. Export full report using the button above.
              </p>
            )}
          </>
        )}
      </div>
    </div>
    </AdminLayout>
  );
}