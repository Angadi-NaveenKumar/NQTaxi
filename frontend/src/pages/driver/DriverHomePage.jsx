import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  Car,
  FileText,
  HelpCircle,
  Gift,
  Upload,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ShieldCheck,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { FaCar, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { useAppStore, DRIVER_STATUS } from '../../store/useAppStore';
import { logout } from '../../services/authService';
import DriverLayout from '../../layouts/DriverLayout';

// Components from develop
import DriverHeader from '../../components/driver/DriverHeader';
import OnlineToggle from '../../components/driver/OnlineToggle';
import DriverStatsCard from '../../components/driver/DriverStatsCard';
import RecentRideCard from '../../components/driver/RecentRideCard';
import NavigationMap from '../../components/driver/NavigationMap';

// Data from develop
import { driverInfo, driverStats, recentRides } from '../../data/driverDashboardData';

// Active ride components (fallback/hash compatibility)
import RideInProgress from '../../components/driver/RiderProgress';
import TripCompletion from '../../components/driver/TripCompletion';
import TripDetails from '../../components/driver/TripDetails';
import PaymentConfirmation from '../../components/driver/PaymentConfirmation';
import CustomerRating from '../../components/driver/CustomerRating';

const INPUT_CLASS =
  'w-full rounded-xl border border-white/10 bg-[#242424] px-4 py-3 font-sans text-sm text-white outline-none transition-[border-color,box-shadow] placeholder:text-gray-500 focus:border-[#F5C518] focus:shadow-[0_0_0_3px_rgba(245,197,24,0.25)] disabled:cursor-not-allowed disabled:opacity-60';

export default function DriverHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthenticated, setRole, resetDriverState, driver, setDriverStatus } = useAppStore();

  // Tab State reactively derived from URL hash, defaulting to 'dashboard'
  const activePage = location.hash ? location.hash.replace('#', '') : 'dashboard';

  // Online Toggler State (retrieved from global store to persist across page navigations/unmounts)
  const isOnline = driver.status === DRIVER_STATUS.ONLINE;

  useEffect(() => {
    if (!isOnline) return;

    const checkActiveBooking = (bookingString) => {
      try {
        const booking = bookingString ? JSON.parse(bookingString) : null;
        if (booking && booking.status === "pending") {
          // Play simulated notification sound or prompt if desired, then navigate
          navigate("/driver/new-request");
        }
      } catch (err) {
        console.error("Error reading active booking", err);
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === "nqtaxi_active_booking") {
        checkActiveBooking(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Initial check when toggled online
    checkActiveBooking(localStorage.getItem("nqtaxi_active_booking"));

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isOnline, navigate]);

  const handleToggle = () => {
    const nextStatus = isOnline ? DRIVER_STATUS.OFFLINE : DRIVER_STATUS.ONLINE;
    setDriverStatus(nextStatus);
  };

  // Success Banner State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // --- Sub-States ---
  // 1. Profile State
  const [profileForm, setProfileForm] = useState({
    fullName: 'Amit Verma',
    email: 'driver@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1992-08-14',
    gender: 'Male',
    address: 'Flat 402, Sector 15',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    drivingLicenseNumber: 'DL-1420180098432',
    drivingExperience: '6',
    emergencyContact: '+91 99887 76655',
    driverPhoto: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80'
  });
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // 2. Vehicle State
  const [vehicleForm, setVehicleForm] = useState({
    brand: 'Maruti Suzuki',
    model: 'Ertiga',
    plateNumber: 'UP-16-AT-9988',
    color: 'Metallic Silver',
    vehicleType: 'Prime SUV',
    status: 'Verified & Active'
  });
  const [isVehicleEditing, setIsVehicleEditing] = useState(false);

  // 3. Documents State
  const [documentsList, setDocumentsList] = useState([
    { id: 'aadhaar', name: 'Aadhaar Card', type: 'Identity', status: 'Approved', updated: '14 May 2026' },
    { id: 'pan', name: 'PAN Card', type: 'Identity', status: 'Approved', updated: '14 May 2026' },
    { id: 'drivingLicense', name: 'Driving License', type: 'Driver License', status: 'Approved', updated: '15 May 2026' },
    { id: 'rcBook', name: 'Registration Certificate (RC Book)', type: 'Vehicle Registration', status: 'Approved', updated: '16 May 2026' },
    { id: 'insurance', name: 'Vehicle Insurance Certificate', type: 'Vehicle Policy', status: 'Approved', updated: '16 May 2026' },
    { id: 'puc', name: 'Pollution Under Control (PUC)', type: 'Vehicle Fitness', status: 'Under Review', updated: '20 May 2026' }
  ]);

  // 4. Support State
  const [supportTicket, setSupportTicket] = useState({
    category: 'Payment Issues',
    subject: '',
    description: ''
  });
  const [faqOpen, setFaqOpen] = useState({});

  // 5. Referral State
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // --- Handlers ---
  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsProfileEditing(false);
    showToast('Driver Profile updated successfully!');
  };

  const handleVehicleSave = (e) => {
    e.preventDefault();
    setIsVehicleEditing(false);
    showToast('Vehicle Information updated successfully!');
  };

  const handleDocUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentsList(prev =>
        prev.map(doc =>
          doc.id === id
            ? { ...doc, status: 'Under Review', updated: 'Just now' }
            : doc
        )
      );
      showToast(`Uploaded new document for ${documentsList.find(d => d.id === id).name}!`);
    }
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportTicket.subject || !supportTicket.description) {
      alert('Please fill out all fields.');
      return;
    }
    setSupportTicket({ category: 'Payment Issues', subject: '', description: '' });
    showToast('Support ticket raised! Our team will contact you in 24 hours.');
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText('NQDRV500');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText('https://nqtaxi.com/invite/NQDRV500');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <DriverLayout activePage={activePage}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#F5C518]/30 bg-[#1A1A1A] px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5C518]/20 text-[#F5C518]">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <p className="text-sm font-semibold text-white">{toastMessage}</p>
        </div>
      )}

      {/* Main Tab Render Switcher */}
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* --- DEFAULT DASHBOARD OVERVIEW --- */}
        {activePage === 'dashboard' && (
          <div className="space-y-6">
            <DriverHeader driver={driverInfo} />
            <div className="flex flex-col gap-6 p-1 md:p-2">
              <section className="space-y-4 rounded-3xl border border-white/10 bg-[#1A1A1A] p-6 shadow-lg">
                <OnlineToggle isOnline={isOnline} onToggle={handleToggle} />
              </section>

              {!isOnline ? (
                <>
                  <section className="space-y-4 rounded-3xl border border-white/10 bg-[#1A1A1A] p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-white">Today's Overview</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <DriverStatsCard
                        icon={<FaCar className="text-xl text-[#F5C518]" />}
                        value={driverStats.rides}
                        title="Rides"
                      />
                      <DriverStatsCard
                        icon={<FaMoneyBillWave className="text-xl text-[#4CAF50]" />}
                        value={`Rs. ${driverStats.earnings}`}
                        title="Earnings"
                      />
                      <DriverStatsCard
                        icon={<FaStar className="text-xl text-[#F5C518]" />}
                        value={driverStats.rating}
                        title="Rating"
                      />
                    </div>
                  </section>

                  <section className="space-y-4 rounded-3xl border border-white/10 bg-[#1A1A1A] p-6 shadow-lg">
                    <h3 className="mb-3 text-lg font-bold text-white">Recent Rides</h3>
                    <div className="space-y-3">
                      {recentRides.map((ride) => (
                        <RecentRideCard
                          key={ride.id}
                          customer={ride.customer}
                          pickup={ride.pickup}
                          fare={ride.fare}
                        />
                      ))}
                    </div>
                  </section>
                </>
              ) : (
                /* ONLINE RADAR RADAR VIEW */
                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1A1A1A] p-4 shadow-lg min-h-[420px] flex flex-col items-center justify-center">
                  {/* Embedded interactive map in background */}
                  <div className="absolute inset-0 opacity-25">
                    <NavigationMap height="h-full" />
                  </div>

                  {/* Radar Animation overlay */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute w-full h-full rounded-full bg-[#4CAF50]/10 border border-[#4CAF50]/20 animate-ping" />
                      <div className="absolute w-24 h-24 rounded-full bg-[#4CAF50]/15 border border-[#4CAF50]/30 animate-pulse" />
                      <div className="w-16 h-16 rounded-full bg-[#4CAF50] flex items-center justify-center text-white shadow-[0_0_20px_rgba(76,175,80,0.5)]">
                        <FaCar className="text-2xl animate-bounce" />
                      </div>
                    </div>
                    <div className="space-y-2 px-4">
                      <h3 className="text-xl font-bold text-white tracking-wide">Searching for Rides...</h3>
                      <p className="text-sm text-[#B0B0B0] max-w-sm">
                        You are now online. Keeping your GPS active and matching with nearby passenger bookings.
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        )}

        {/* --- PROFILE TABS --- */}
        {activePage === 'profile' && (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Profile Overview Card */}
            <article className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-6 shadow-lg flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={profileForm.driverPhoto}
                  alt="Driver Amit Verma"
                  className="h-28 w-28 rounded-full border-4 border-[#F5C518] object-cover"
                />
                <label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F5C518] text-black shadow-md hover:bg-[#D4A80E] transition-all">
                  <Upload className="h-4.5 w-4.5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfileForm(prev => ({ ...prev, driverPhoto: URL.createObjectURL(file) }));
                        showToast('Profile photo updated.');
                      }
                    }}
                  />
                </label>
              </div>

              <h2 className="text-lg font-bold text-white">{profileForm.fullName}</h2>
              <span className="mt-1 rounded-full bg-[#4CAF50]/15 px-3 py-1 text-xs font-bold text-[#4CAF50] border border-[#4CAF50]/20">
                ACTIVE & VERIFIED
              </span>

              {/* Stats Block */}
              <div className="mt-6 w-full grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Overall Rating</span>
                  <div className="mt-1 text-xl font-black text-white flex items-center justify-center gap-1">
                    <span className="text-[#F5C518]">★</span> 4.8
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Rides</span>
                  <div className="mt-1 text-xl font-black text-white">248</div>
                </div>
              </div>

              <div className="mt-4 w-full bg-[#242424] rounded-xl p-4 text-left border border-white/[0.05]">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#F5C518]" />
                  <span>License Verified</span>
                </div>
                <p className="mt-1 text-sm font-mono text-gray-200">{profileForm.drivingLicenseNumber}</p>
              </div>
            </article>

            {/* Profile Info Form */}
            <article className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-6 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <User className="h-4.5 w-4.5 text-[#F5C518]" />
                  Personal Information
                </h3>
                <button
                  type="button"
                  onClick={() => setIsProfileEditing(!isProfileEditing)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isProfileEditing
                      ? 'bg-[#F44336] text-white'
                      : 'bg-[#F5C518]/10 text-[#F5C518] hover:bg-[#F5C518]/25'
                  }`}
                >
                  {isProfileEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">Full Name</label>
                    <input
                      type="text"
                      disabled={!isProfileEditing}
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">Email Address</label>
                    <input
                      type="email"
                      disabled={!isProfileEditing}
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">Phone Number</label>
                    <input
                      type="text"
                      disabled={!isProfileEditing}
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">Date of Birth</label>
                    <input
                      type="date"
                      disabled={!isProfileEditing}
                      value={profileForm.dateOfBirth}
                      onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">Gender</label>
                    <select
                      disabled={!isProfileEditing}
                      value={profileForm.gender}
                      onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                      className={INPUT_CLASS}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">Driving Experience (Years)</label>
                    <input
                      type="number"
                      disabled={!isProfileEditing}
                      value={profileForm.drivingExperience}
                      onChange={(e) => setProfileForm({ ...profileForm, drivingExperience: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-4 mt-4">
                  <h4 className="mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Address Details</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="sm:col-span-3">
                      <label className="mb-1.5 block text-xs font-semibold text-gray-400">Residential Address</label>
                      <input
                        type="text"
                        disabled={!isProfileEditing}
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-400">City</label>
                      <input
                        type="text"
                        disabled={!isProfileEditing}
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-400">State</label>
                      <input
                        type="text"
                        disabled={!isProfileEditing}
                        value={profileForm.state}
                        onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-400">Pincode</label>
                      <input
                        type="text"
                        disabled={!isProfileEditing}
                        value={profileForm.pincode}
                        onChange={(e) => setProfileForm({ ...profileForm, pincode: e.target.value })}
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-4 mt-4">
                  <h4 className="mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Emergency Contact</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-400">Emergency Mobile</label>
                      <input
                        type="text"
                        disabled={!isProfileEditing}
                        value={profileForm.emergencyContact}
                        onChange={(e) => setProfileForm({ ...profileForm, emergencyContact: e.target.value })}
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                </div>

                {isProfileEditing && (
                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-none bg-[#F5C518] px-4 py-3 font-sans text-sm font-bold text-black transition-all hover:bg-[#D4A80E]"
                  >
                    Save Changes
                  </button>
                )}
              </form>
            </article>
          </section>
        )}

        {/* --- VEHICLE INFORMATION --- */}
        {activePage === 'vehicle' && (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Vehicle Registration Summary Card */}
            <article className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-6 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5C518]/10 text-[#F5C518] border border-[#F5C518]/20">
                  <Car className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Registered Cab</h3>
                <p className="mt-1 text-sm text-gray-400">Details of your active commercial service vehicle.</p>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Registration Number</span>
                    <p className="mt-0.5 text-base font-mono font-bold text-white">{vehicleForm.plateNumber}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Vehicle Class</span>
                    <p className="mt-0.5 text-sm font-semibold text-white">{vehicleForm.vehicleType}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Status Badge</span>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#4CAF50]" />
                      <span className="text-xs font-bold text-[#4CAF50]">{vehicleForm.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/[0.08] pt-4">
                <span className="text-[10px] text-gray-500 block">Registration Authority</span>
                <span className="text-xs text-gray-300 font-semibold">Gautam Budh Nagar RTO, Noida</span>
              </div>
            </article>

            {/* Vehicle Update Form */}
            <article className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-6 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Car className="h-4.5 w-4.5 text-[#F5C518]" />
                  Vehicle Details
                </h3>
                <button
                  type="button"
                  onClick={() => setIsVehicleEditing(!isVehicleEditing)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isVehicleEditing
                      ? 'bg-[#F44336] text-white'
                      : 'bg-[#F5C518]/10 text-[#F5C518] hover:bg-[#F5C518]/25'
                  }`}
                >
                  {isVehicleEditing ? 'Cancel Edit' : 'Edit Vehicle'}
                </button>
              </div>

              <form onSubmit={handleVehicleSave} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">Vehicle Brand / Make</label>
                    <input
                      type="text"
                      disabled={!isVehicleEditing}
                      value={vehicleForm.brand}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, brand: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">Model Name</label>
                    <input
                      type="text"
                      disabled={!isVehicleEditing}
                      value={vehicleForm.model}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">License Plate Number</label>
                    <input
                      type="text"
                      disabled={!isVehicleEditing}
                      value={vehicleForm.plateNumber}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, plateNumber: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">Vehicle Color</label>
                    <input
                      type="text"
                      disabled={!isVehicleEditing}
                      value={vehicleForm.color}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, color: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-400">Vehicle Ride Class Category</label>
                    <select
                      disabled={!isVehicleEditing}
                      value={vehicleForm.vehicleType}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, vehicleType: e.target.value })}
                      className={INPUT_CLASS}
                    >
                      <option value="Prime SUV">Prime SUV (Ertiga/Innova)</option>
                      <option value="Sedan">Sedan (Dzire/Etios)</option>
                      <option value="Hatchback">Hatchback (WagonR/Tiago)</option>
                      <option value="Auto">Auto Rickshaw</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-[#242424] p-4 text-xs text-gray-400 flex items-start gap-3 border border-white/[0.04]">
                  <Info className="h-4.5 w-4.5 text-[#F5C518] shrink-0 mt-0.5" />
                  <p>
                    Updating your license plate number or brand will require verification checks. The vehicle status might set to <strong>Under Review</strong> temporarily while verification is complete.
                  </p>
                </div>

                {isVehicleEditing && (
                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-none bg-[#F5C518] px-4 py-3 font-sans text-sm font-bold text-black transition-all hover:bg-[#D4A80E]"
                  >
                    Update Vehicle Details
                  </button>
                )}
              </form>
            </article>
          </section>
        )}

        {/* --- DOCUMENTS MANAGEMENT --- */}
        {activePage === 'documents' && (
          <section className="space-y-6">
            <header className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-[#F5C518]" />
                  Uploaded Verification Documents
                </h3>
                <p className="mt-0.5 text-xs text-gray-400">Keep your vehicle, identity, and permit certifications up to date.</p>
              </div>
              <span className="rounded-full bg-[#F5C518]/10 border border-[#F5C518]/25 px-4 py-1 text-xs font-semibold text-[#F5C518]">
                5 / 6 Approved
              </span>
            </header>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {documentsList.map((doc) => {
                const isApproved = doc.status === 'Approved';
                return (
                  <article key={doc.id} className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-5 shadow-lg flex flex-col justify-between gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{doc.name}</h4>
                        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{doc.type}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {isApproved ? (
                          <span className="rounded-full bg-[#4CAF50]/15 border border-[#4CAF50]/20 px-2 py-0.5 text-[10px] font-bold text-[#4CAF50] flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Approved
                          </span>
                        ) : (
                          <span className="rounded-full bg-[#FF9800]/15 border border-[#FF9800]/20 px-2 py-0.5 text-[10px] font-bold text-[#FF9800] flex items-center gap-1 animate-pulse">
                            <AlertCircle className="h-3 w-3" /> Under Review
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 mt-2">
                      <span className="text-xs text-gray-500">Updated: {doc.updated}</span>
                      
                      <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-[#242424] px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white hover:border-[#F5C518]/30 transition-colors">
                        <Upload className="h-3.5 w-3.5" />
                        <span>Replace File</span>
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) => handleDocUpload(doc.id, e)}
                        />
                      </label>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* --- SUPPORT & HELP CENTER --- */}
        {activePage === 'support' && (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* FAQ Panel */}
            <article className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-6 shadow-lg">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-6">
                <HelpCircle className="h-4.5 w-4.5 text-[#F5C518]" />
                Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                {[
                  {
                    q: 'How do I check my weekly earnings payouts?',
                    a: 'Weekly payments are processed directly to your registered bank account every Monday. You can check detailed summaries and payout stats in the portal payouts tab.'
                  },
                  {
                    q: 'What should I do in case of an emergency/accident?',
                    a: 'Use the prominent SOS action available in your device driver dashboard interface. This instantly shares your location coordinates with emergency rescue and system supervisors.'
                  },
                  {
                    q: 'How do I submit updated vehicle pollution papers?',
                    a: 'Navigate to the Documents Management tab, find the Pollution Under Control (PUC) card, click Replace File, and upload a clear picture or PDF of the fresh certificate.'
                  },
                  {
                    q: 'Can I refer other taxi drivers to NQTaxi?',
                    a: 'Yes, copy your custom referral promo link from the Refer & Earn tab. You will earn bonus credits once they signup and complete the initial rides.'
                  }
                ].map((item, index) => {
                  const isOpen = faqOpen[index];
                  return (
                    <div key={index} className="border-b border-white/[0.06] pb-3 last:border-none">
                      <button
                        type="button"
                        onClick={() => setFaqOpen({ ...faqOpen, [index]: !isOpen })}
                        className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold text-gray-200 hover:text-white"
                      >
                        <span>{item.q}</span>
                        {isOpen ? <ChevronUp className="h-4 w-4 text-[#F5C518]" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                      </button>
                      {isOpen && (
                        <p className="mt-2 text-xs leading-relaxed text-gray-400">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>

            {/* Raise a Support Ticket Form */}
            <article className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-6 shadow-lg">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-6">
                <Mail className="h-4.5 w-4.5 text-[#F5C518]" />
                Submit a Support Ticket
              </h3>

              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-400">Issue Category</label>
                  <select
                    value={supportTicket.category}
                    onChange={(e) => setSupportTicket({ ...supportTicket, category: e.target.value })}
                    className={INPUT_CLASS}
                  >
                    <option value="Payment Issues">Payment & Payout Issues</option>
                    <option value="App Technical Issue">App Technical Bug / Fault</option>
                    <option value="Ride Dispute">Passenger Ride Dispute</option>
                    <option value="Customer Behavior">Report Customer Misbehavior</option>
                    <option value="Other">Other General Query</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-400">Ticket Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Briefly state the issue..."
                    value={supportTicket.subject}
                    onChange={(e) => setSupportTicket({ ...supportTicket, subject: e.target.value })}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-400">Describe details</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide specific details about dates, trip IDs, or issues..."
                    value={supportTicket.description}
                    onChange={(e) => setSupportTicket({ ...supportTicket, description: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#242424] px-4 py-3 font-sans text-sm text-white outline-none transition-[border-color,box-shadow] placeholder:text-gray-500 focus:border-[#F5C518] focus:shadow-[0_0_0_3px_rgba(245,197,24,0.25)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl border-none bg-[#F5C518] px-4 py-3 font-sans text-sm font-bold text-black transition-all hover:bg-[#D4A80E]"
                >
                  Submit Support Ticket
                </button>
              </form>
            </article>
          </section>
        )}

        {/* --- REFER & EARN --- */}
        {activePage === 'referral' && (
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Green Referral Banner (Rapido-style) */}
              <article className="lg:col-span-2 relative overflow-hidden rounded-[24px] bg-[#1E5E52] min-h-[190px] flex flex-row items-stretch justify-between shadow-lg">
                {/* Megaphone Illustration on Left */}
                <div className="w-[45%] flex items-end justify-start pl-4 select-none relative overflow-hidden">
                  <svg viewBox="0 0 200 150" className="w-full h-full max-h-[170px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* The white bottom curve representing her pants/ground */}
                    <path d="M -10,150 Q 50,115 110,135 Q 135,145 160,150 Z" fill="white" />
                    
                    {/* Hair back */}
                    <path d="M 32,85 C 20,95 18,120 22,130 C 25,120 28,100 35,90 Z" fill="#1F2937" />

                    {/* Body / Shirt */}
                    <path d="M 38,105 C 32,115 30,135 34,145 C 50,145 78,140 85,130 C 80,120 75,108 65,105 Z" fill="#3B82F6" />
                    
                    {/* Neck */}
                    <path d="M 48,98 Q 50,105 52,106 Q 55,105 54,98 Z" fill="#FBCFE8" />

                    {/* Face */}
                    <path d="M 46,78 C 42,88 56,92 58,84 C 60,78 50,72 46,78 Z" fill="#FBCFE8" />
                    
                    {/* Hair front */}
                    <path d="M 44,78 C 48,72 58,74 54,82 C 50,80 46,80 44,78 Z" fill="#1F2937" />
                    <path d="M 44,78 C 38,82 34,92 30,112 C 34,96 38,88 44,78 Z" fill="#1F2937" />

                    {/* Shouting mouth */}
                    <path d="M 52,83 Q 55,85 52,86 Z" fill="#E11D48" />

                    {/* Arm raising megaphone */}
                    <path d="M 58,110 L 72,82 C 74,78 78,78 76,82 L 64,112 Z" fill="#3B82F6" />
                    {/* Hand */}
                    <circle cx="73" cy="80" r="4" fill="#FBCFE8" />

                    {/* Megaphone */}
                    <path d="M 72,82 L 68,92 L 72,92 L 74,84 Z" fill="#EF4444" /> {/* handle */}
                    <path d="M 70,80 L 78,72 L 82,76 L 74,84 Z" fill="#ECEFF1" /> {/* body */}
                    <path d="M 76,74 L 98,52 C 101,50 105,54 103,57 L 82,78 Z" fill="#EF4444" /> {/* cone */}
                    <ellipse cx="101" cy="55" rx="3.5" ry="8" fill="#DC2626" transform="rotate(32 101 55)" /> {/* rim */}

                    {/* Sound waves */}
                    <path d="M 112,46 C 118,48 120,53 117,58" stroke="#E0F2F1" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 118,40 C 126,44 128,53 122,61" stroke="#E0F2F1" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 124,34 C 134,39 136,53 127,64" stroke="#E0F2F1" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                  </svg>
                </div>

                {/* Right Text & Code Pill (aligned right) */}
                <div className="w-[55%] flex flex-col justify-center items-end pr-6 py-5 text-white text-right z-10 select-none">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight leading-snug">
                    Invite other drivers to try <br />
                    <span className="text-white font-extrabold text-lg sm:text-xl md:text-2xl">NQTaxi</span>
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-white/80 max-w-[220px]">
                    Earn ₹ 1,000 for every driver who signs up and completes 20 rides.
                  </p>

                  <div className="mt-4 flex items-center justify-between bg-black/25 border border-white/10 rounded-xl px-4 py-2 hover:bg-black/35 transition-all">
                    <span className="text-xs sm:text-sm font-bold font-mono tracking-wider text-white mr-3">NQDRV500</span>
                    <button
                      type="button"
                      onClick={copyReferralCode}
                      className="p-1 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors flex items-center justify-center"
                      aria-label="Copy Promo Code"
                    >
                      {copiedCode ? (
                        <Check className="h-4 w-4 text-[#4CAF50]" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </article>

              {/* Total Referral Earned card (takes 1 col) */}
              <article className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#1A1A1A] p-6 shadow-lg flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/20">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Referral Earned</span>
                    <div className="mt-1 text-3xl font-black text-[#4CAF50]">₹ 3,500</div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] space-y-2">
                  <span className="text-[10px] text-gray-500 block">Unique Registration URL</span>
                  <div className="flex items-center justify-between bg-[#242424] rounded-xl p-3 border border-white/[0.04]">
                    <span className="text-xs text-gray-300 truncate max-w-[150px]">nqtaxi.com/invite/NQDRV500</span>
                    <button
                      type="button"
                      onClick={copyReferralLink}
                      className="p-1.5 rounded bg-[#1A1A1A] border border-white/10 hover:bg-[#1A1A1A]/80 text-gray-300 hover:text-[#F5C518] transition-colors"
                      aria-label="Copy invite link"
                    >
                      {copiedLink ? <Check className="h-4 w-4 text-[#4CAF50]" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </article>
            </div>

            {/* Referrals Stats Table/Overview */}
            <article className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A] p-6 shadow-lg">
              <h4 className="text-sm font-bold text-white mb-4">Successful Referrals</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-gray-500">
                      <th className="py-2.5">Driver Invited</th>
                      <th className="py-2.5">Registered Date</th>
                      <th className="py-2.5">Progress status</th>
                      <th className="py-2.5 text-right">Earning status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="py-3 font-semibold text-white">Rahul Deshmukh</td>
                      <td className="py-3">12 May 2026</td>
                      <td className="py-3">20/20 rides completed</td>
                      <td className="py-3 text-right text-[#4CAF50] font-semibold">+ ₹ 1,000</td>
                    </tr>
                    <tr className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="py-3 font-semibold text-white">Sanjay Dutt</td>
                      <td className="py-3">18 May 2026</td>
                      <td className="py-3">20/20 rides completed</td>
                      <td className="py-3 text-right text-[#4CAF50] font-semibold">+ ₹ 1,000</td>
                    </tr>
                    <tr className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="py-3 font-semibold text-white">Vikram Rathore</td>
                      <td className="py-3">22 May 2026</td>
                      <td className="py-3">12/20 rides completed</td>
                      <td className="py-3 text-right text-gray-500">In Progress</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        )}

        {/* --- ACTIVE RIDE TABS (COMPATIBILITY / FALLBACK) --- */}
        {activePage === 'ride-in-progress' && <RideInProgress />}
        {activePage === 'trip-completion' && <TripCompletion />}
        {activePage === 'trip-details' && <TripDetails />}
        {activePage === 'payment-confirmation' && <PaymentConfirmation />}
        {activePage === 'customer-rating' && <CustomerRating />}
      </div>
    </DriverLayout>
  );
}
