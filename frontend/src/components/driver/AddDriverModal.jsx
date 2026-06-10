import React, { useState, useEffect } from "react";

const VEHICLE_TYPES = [
  { value: "sedan", label: "Sedan", icon: "🚗", basePrice: 8 },
  { value: "suv", label: "SUV", icon: "🚙", basePrice: 12 },
  { value: "hatchback", label: "Hatchback", icon: "🚘", basePrice: 7 },
  { value: "auto", label: "Auto Rickshaw", icon: "🛺", basePrice: 6 },
  { value: "bike", label: "Bike", icon: "🏍️", basePrice: 5 },
];

const AddDriverModal = ({ isOpen, onClose, onAddDriver, editingDriver = null }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    licenseNumber: "",
    licenseExpiry: "",
    vehicleType: "",
    vehicleNumber: "",
    vehicleModel: "",
    vehicleColor: "",
    experienceYears: "",
    status: "pending",
    rating: 0,
    totalRides: 0,
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    if (isOpen && editingDriver) {
      setFormData(editingDriver);
    } else if (isOpen && !editingDriver) {
      resetForm();
    }
  }, [isOpen, editingDriver]);

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      licenseNumber: "",
      licenseExpiry: "",
      vehicleType: "",
      vehicleNumber: "",
      vehicleModel: "",
      vehicleColor: "",
      experienceYears: "",
      status: "pending",
      rating: 0,
      totalRides: 0,
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
    });
    setErrors({});
    setActiveTab("personal");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "License number is required";
    } else if (formData.licenseNumber.length < 8) {
      newErrors.licenseNumber = "Enter a valid license number";
    }

    if (!formData.licenseExpiry) {
      newErrors.licenseExpiry = "License expiry date is required";
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = "Please select a vehicle type";
    }
    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required";
    }
    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = "Vehicle model is required";
    }

    if (formData.experienceYears && (formData.experienceYears < 0 || formData.experienceYears > 50)) {
      newErrors.experienceYears = "Experience must be between 0 and 50 years";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const driverData = {
        ...formData,
        id: editingDriver?.id || `DRV${Date.now()}`,
        createdAt: editingDriver?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        experienceYears: parseFloat(formData.experienceYears) || 0,
        rating: editingDriver?.rating || 0,
        totalRides: editingDriver?.totalRides || 0,
      };

      await onAddDriver(driverData);
      resetForm();
      onClose();
    } catch (error) {
      setErrors({ submit: error.message || "Failed to add driver. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const getSelectedVehicleIcon = () => {
    const vehicle = VEHICLE_TYPES.find(v => v.value === formData.vehicleType);
    return vehicle?.icon || "🚗";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={handleBackdropClick}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-6 py-4">
          <h2 className="text-xl font-bold text-text">
            {editingDriver ? "✏️ Edit Driver" : "👨‍✈️ Add New Driver"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-2 text-muted transition-colors hover:bg-elevated hover:text-danger" disabled={isSubmitting}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Tab Navigation */}
            <div className="mb-6 flex gap-2 border-b border-border">
              {[
                { id: "personal", label: "Personal Info", icon: "👤" },
                { id: "vehicle", label: "Vehicle Details", icon: "🚗" },
                { id: "documents", label: "Documents", icon: "📄" },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted hover:text-text"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <div className="space-y-4">
                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-text">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter driver's full name"
                    className={`w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${errors.fullName ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                  />
                  {errors.fullName && <span className="mt-1.5 text-xs text-danger">{errors.fullName}</span>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="mb-5">
                    <label className="mb-1.5 block text-sm font-medium text-text">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={`w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${errors.phone ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                    />
                    {errors.phone && <span className="mt-1.5 text-xs text-danger">{errors.phone}</span>}
                  </div>

                  <div className="mb-5">
                    <label className="mb-1.5 block text-sm font-medium text-text">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="driver@example.com"
                      className={`w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${errors.email ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                    />
                    {errors.email && <span className="mt-1.5 text-xs text-danger">{errors.email}</span>}
                  </div>
                </div>

                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-text">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Driver's residential address"
                    className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary min-h-[80px] resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="mb-5">
                    <label className="mb-1.5 block text-sm font-medium text-text">Emergency Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="Emergency contact person"
                      className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="mb-1.5 block text-sm font-medium text-text">Emergency Contact Number</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      placeholder="Emergency phone number"
                      className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-text">Years of Driving Experience</label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                    min="0"
                    max="50"
                    step="0.5"
                    className={`w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${errors.experienceYears ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                  />
                  {errors.experienceYears && <span className="mt-1.5 text-xs text-danger">{errors.experienceYears}</span>}
                </div>
              </div>
            )}

            {/* Vehicle Details Tab */}
            {activeTab === "vehicle" && (
              <div className="space-y-4">
                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-text">
                    Vehicle Type <span className="text-danger">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {VEHICLE_TYPES.map(vehicle => (
                      <button
                        key={vehicle.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, vehicleType: vehicle.value }))}
                        className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all ${
                          formData.vehicleType === vehicle.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-2xl">{vehicle.icon}</span>
                        <span className="text-xs font-medium">{vehicle.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.vehicleType && <span className="mt-1.5 text-xs text-danger">{errors.vehicleType}</span>}
                </div>

                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-text">
                    Vehicle Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="e.g., KA01 AB 1234"
                    className={`w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${errors.vehicleNumber ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                  />
                  {errors.vehicleNumber && <span className="mt-1.5 text-xs text-danger">{errors.vehicleNumber}</span>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="mb-5">
                    <label className="mb-1.5 block text-sm font-medium text-text">
                      Vehicle Model <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      placeholder="e.g., Swift Dzire"
                      className={`w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${errors.vehicleModel ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                    />
                    {errors.vehicleModel && <span className="mt-1.5 text-xs text-danger">{errors.vehicleModel}</span>}
                  </div>

                  <div className="mb-5">
                    <label className="mb-1.5 block text-sm font-medium text-text">Vehicle Color</label>
                    <input
                      type="text"
                      name="vehicleColor"
                      value={formData.vehicleColor}
                      onChange={handleChange}
                      placeholder="e.g., White"
                      className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-primary/5 p-4">
                  <p className="flex items-center gap-2 text-sm text-text">
                    <span className="text-xl">{getSelectedVehicleIcon()}</span>
                    <span>
                      {formData.vehicleType
                        ? `Selected: ${VEHICLE_TYPES.find(v => v.value === formData.vehicleType)?.label}`
                        : "Select a vehicle type above"}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === "documents" && (
              <div className="space-y-4">
                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-text">
                    Driving License Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="Enter DL number"
                    className={`w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${errors.licenseNumber ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                  />
                  {errors.licenseNumber && <span className="mt-1.5 text-xs text-danger">{errors.licenseNumber}</span>}
                </div>

                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-text">
                    License Expiry Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="licenseExpiry"
                    value={formData.licenseExpiry}
                    onChange={handleChange}
                    className={`w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${errors.licenseExpiry ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                  />
                  {errors.licenseExpiry && <span className="mt-1.5 text-xs text-danger">{errors.licenseExpiry}</span>}
                </div>

                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-text">Driver Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="pending">⏳ Pending Verification</option>
                    <option value="active">✅ Active</option>
                    <option value="inactive">❌ Inactive</option>
                    <option value="on-leave">🚫 On Leave</option>
                  </select>
                </div>

                <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4">
                  <p className="text-sm font-medium text-text">📋 Document Checklist</p>
                  <ul className="mt-2 space-y-1 text-xs text-muted">
                    <li>✓ Driving License (Front & Back)</li>
                    <li>✓ RC Book (Registration Certificate)</li>
                    <li>✓ Insurance Certificate</li>
                    <li>✓ Pollution Under Control (PUC)</li>
                    <li>✓ Aadhar Card / PAN Card</li>
                  </ul>
                  <p className="mt-3 text-xs text-info">
                    After adding driver, you can upload documents from the driver list.
                  </p>
                </div>
              </div>
            )}

            {errors.submit && (
              <div className="mt-4 rounded-xl bg-danger/10 p-3 text-center text-sm text-danger">
                {errors.submit}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 flex justify-end gap-3 border-t border-border bg-surface px-6 py-4">
            <button type="button" onClick={onClose} className="rounded-xl border border-border bg-surface px-6 py-2.5 font-medium text-text transition-all hover:border-primary hover:bg-elevated" disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-primary px-6 py-2.5 font-bold text-black transition-all hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
              {isSubmitting
                ? (editingDriver ? "Updating..." : "Adding Driver...")
                : (editingDriver ? "✏️ Update Driver" : "➕ Add Driver")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriverModal;