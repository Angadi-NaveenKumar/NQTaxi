import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, User, Phone, Mail, Calendar, MapPin, Car, Shield, Save } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import DriverOnboardingProgress from '../../components/driver/DriverOnboardingProgress';

export default function DriverProfileSetup() {
  const navigate = useNavigate();
  const { driver, setDriverProfile, setDriverProfileCompleted } = useAppStore();

  const [formData, setFormData] = useState({
    fullName: driver.profile?.fullName || '',
    email: driver.profile?.email || '',
    dateOfBirth: driver.profile?.dateOfBirth || '',
    gender: driver.profile?.gender || '',
    address: driver.profile?.address || '',
    city: driver.profile?.city || '',
    state: driver.profile?.state || '',
    pincode: driver.profile?.pincode || '',
    drivingLicenseNumber: driver.profile?.drivingLicenseNumber || '',
    drivingExperience: driver.profile?.drivingExperience || '',
    emergencyContact: driver.profile?.emergencyContact || '',
    vehicleType: driver.profile?.vehicleType || '',
    vehicleBrand: driver.profile?.vehicleBrand || '',
    vehicleModel: driver.profile?.vehicleModel || '',
    vehicleNumber: driver.profile?.vehicleNumber || '',
    vehicleColor: driver.profile?.vehicleColor || '',
    driverPhoto: driver.profile?.driverPhoto || null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const fileURL = URL.createObjectURL(files[0]);
      setFormData((prev) => ({ ...prev, [name]: fileURL }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveDraft = () => {
    setDriverProfile(formData);
    alert('Draft saved successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDriverProfile(formData);
    setDriverProfileCompleted(true);
    setIsLoading(false);
    navigate('/driver/document-verification');
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur-sm flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">Profile Setup</h1>
        <button
          onClick={handleSaveDraft}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          <Save size={16} />
          Save Draft
        </button>
      </div>

      {/* Progress */}
      <DriverOnboardingProgress />

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 space-y-6">
        {/* Driver Photo Upload */}
        <div className="bg-surface p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <User size={20} />
            Profile Photo
          </h3>
          <div className="flex flex-col items-center gap-4">
            {formData.driverPhoto ? (
              <div className="relative">
                <img
                  src={formData.driverPhoto}
                  alt="Driver"
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, driverPhoto: null }))}
                  className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-border bg-elevated hover:border-primary/50 cursor-pointer transition-colors">
                <Upload size={32} className="text-text-secondary mb-2" />
                <span className="text-xs font-medium text-text-secondary">Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  name="driverPhoto"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-surface p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-semibold text-text mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-surface p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                rows="3"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Driver Information */}
        <div className="bg-surface p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <Shield size={20} />
            Driver Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Driving License Number</label>
              <input
                type="text"
                name="drivingLicenseNumber"
                value={formData.drivingLicenseNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Driving Experience (Years)</label>
              <input
                type="number"
                name="drivingExperience"
                value={formData.drivingExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary">Emergency Contact Number</label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-surface p-6 rounded-2xl border border-border">
          <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <Car size={20} />
            Vehicle Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              >
                <option value="">Select</option>
                <option value="auto">Auto</option>
                <option value="bike">Bike</option>
                <option value="car">Car</option>
                <option value="suv">SUV</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Vehicle Brand</label>
              <input
                type="text"
                name="vehicleBrand"
                value={formData.vehicleBrand}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Vehicle Model</label>
              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Vehicle Color</label>
              <input
                type="text"
                name="vehicleColor"
                value={formData.vehicleColor}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-elevated border border-border rounded-xl text-text focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
          </div>
        </div>
      </form>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border z-50">
        <button
          type="submit"
          form=""
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-primary text-background font-bold py-4 rounded-xl text-lg hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="animate-spin">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </span>
          ) : (
            <span>Continue to Documents</span>
          )}
        </button>
      </div>
    </div>
  );
}
