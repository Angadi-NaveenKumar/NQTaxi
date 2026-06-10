import React, { useState, useEffect } from "react";
import AddDriverModal from "../../components/driver/AddDriverModal";

const DriverManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    const savedDrivers = localStorage.getItem("nqTaxiDrivers");
    if (savedDrivers) {
      setDrivers(JSON.parse(savedDrivers));
    } else {
      const sampleDrivers = [
        {
          id: "DRV001",
          fullName: "Rajesh Kumar",
          phone: "9876543210",
          email: "rajesh@example.com",
          licenseNumber: "DL123456789",
          licenseExpiry: "2025-12-31",
          vehicleType: "sedan",
          vehicleNumber: "KA01 AB 1234",
          vehicleModel: "Swift Dzire",
          vehicleColor: "White",
          experienceYears: 5,
          status: "active",
          rating: 4.8,
          totalRides: 1250,
          createdAt: "2024-01-15T10:00:00Z",
        },
        {
          id: "DRV002",
          fullName: "Priya Singh",
          phone: "8765432109",
          email: "priya@example.com",
          licenseNumber: "DL987654321",
          licenseExpiry: "2026-06-30",
          vehicleType: "suv",
          vehicleNumber: "KA02 CD 5678",
          vehicleModel: "Toyota Innova",
          vehicleColor: "Black",
          experienceYears: 8,
          status: "active",
          rating: 4.9,
          totalRides: 2100,
          createdAt: "2023-08-20T10:00:00Z",
        },
      ];
      setDrivers(sampleDrivers);
      localStorage.setItem("nqTaxiDrivers", JSON.stringify(sampleDrivers));
    }
  }, []);

  const handleAddDriver = async (driverData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let updatedDrivers;
        if (editingDriver) {
          updatedDrivers = drivers.map(d =>
            d.id === editingDriver.id ? { ...driverData, id: editingDriver.id } : d
          );
        } else {
          updatedDrivers = [driverData, ...drivers];
        }
        setDrivers(updatedDrivers);
        localStorage.setItem("nqTaxiDrivers", JSON.stringify(updatedDrivers));
        setEditingDriver(null);
        resolve(driverData);
      }, 500);
    });
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setIsModalOpen(true);
  };

  const handleDeleteDriver = (driverId) => {
    if (window.confirm("Are you sure you want to remove this driver?")) {
      const updatedDrivers = drivers.filter(d => d.id !== driverId);
      setDrivers(updatedDrivers);
      localStorage.setItem("nqTaxiDrivers", JSON.stringify(updatedDrivers));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDriver(null);
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          driver.phone.includes(searchTerm) ||
                          driver.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-success/20 text-success",
      inactive: "bg-danger/20 text-danger",
      pending: "bg-warning/20 text-warning",
      "on-leave": "bg-info/20 text-info",
    };
    return `inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${styles[status] || styles.pending}`;
  };

  const getVehicleIcon = (type) => {
    const icons = {
      sedan: "🚗", suv: "🚙", hatchback: "🚘", auto: "🛺", bike: "🏍️",
    };
    return icons[type] || "🚗";
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Driver Management</h1>
          <p className="text-sm text-muted">Manage all drivers, verify documents, and track performance</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="rounded-xl bg-primary px-6 py-2.5 font-bold text-black transition-all hover:bg-primary-dark">
          + Add New Driver
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm text-muted">Total Drivers</p>
          <p className="mt-1 text-2xl font-bold text-text">{drivers.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm text-muted">Active Drivers</p>
          <p className="mt-1 text-2xl font-bold text-success">
            {drivers.filter(d => d.status === "active").length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm text-muted">Pending Verification</p>
          <p className="mt-1 text-2xl font-bold text-warning">
            {drivers.filter(d => d.status === "pending").length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <p className="text-sm text-muted">Avg Rating</p>
          <p className="mt-1 text-2xl font-bold text-primary">
            {(drivers.reduce((sum, d) => sum + (d.rating || 0), 0) / drivers.length || 0).toFixed(1)}⭐
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, phone, or vehicle number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-border bg-elevated px-4 py-2.5 text-text outline-none focus:border-primary md:w-80"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">🔍</span>
        </div>
        <div className="flex gap-2">
          {["all", "active", "pending", "inactive", "on-leave"].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1.5 text-sm capitalize transition-colors ${
                statusFilter === status
                  ? "bg-primary text-black"
                  : "bg-elevated text-muted hover:bg-primary/20"
              }`}
            >
              {status.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Drivers List */}
      <div className="space-y-4">
        {filteredDrivers.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-12 text-center">
            <p className="text-6xl mb-4">👨‍✈️</p>
            <p className="text-muted">No drivers found</p>
            <button onClick={() => setIsModalOpen(true)} className="rounded-xl bg-primary px-6 py-2.5 font-bold text-black transition-all hover:bg-primary-dark mt-4">
              Add Your First Driver
            </button>
          </div>
        ) : (
          filteredDrivers.map(driver => (
            <div key={driver.id} className="rounded-2xl border border-border bg-surface p-5 transition-all hover:shadow-md">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Driver Info */}
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-2xl">
                    {getVehicleIcon(driver.vehicleType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-text">{driver.fullName}</h3>
                      <span className={getStatusBadge(driver.status)}>{driver.status}</span>
                      {driver.rating > 0 && (
                        <span className="flex items-center gap-1 text-sm">
                          <span className="text-primary">★</span> {driver.rating}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                      <p className="text-muted">📞 {driver.phone}</p>
                      <p className="text-muted">🚗 {driver.vehicleNumber}</p>
                      <p className="text-muted">📋 {driver.vehicleModel}</p>
                      <p className="text-muted">🎂 {driver.experienceYears || 0} years exp</p>
                    </div>
                    {driver.totalRides > 0 && (
                      <p className="mt-2 text-xs text-info">📊 {driver.totalRides} rides completed</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditDriver(driver)}
                    className="rounded-lg border border-border px-3 py-1.5 text-sm text-text transition-colors hover:border-primary"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDriver(driver.id)}
                    className="rounded-lg border border-danger/30 px-3 py-1.5 text-sm text-danger transition-colors hover:bg-danger/10"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <AddDriverModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddDriver={handleAddDriver}
        editingDriver={editingDriver}
      />
    </div>
  );
};

export default DriverManagement;