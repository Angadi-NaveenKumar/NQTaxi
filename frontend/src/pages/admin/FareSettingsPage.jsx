import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AdminLayout from '../../layouts/AdminLayout';
import FarePageHeader from '../../components/admin/fare/FarePageHeader';
import FareStatsOverview from '../../components/admin/fare/FareStatsOverview';
import FareDataGrid from '../../components/admin/fare/FareDataGrid';
import FareCalculatorPanel from '../../components/admin/fare/FareCalculatorPanel';
import DynamicPricingRules from '../../components/admin/fare/DynamicPricingRules';
import CommissionSettingsCard from '../../components/admin/fare/CommissionSettingsCard';
import RecentActivityPanel from '../../components/admin/fare/RecentActivityPanel';
import FareEditModal from '../../components/admin/fare/FareEditModal';
import {
  INITIAL_FARE_TYPES,
  INITIAL_PRICING_RULES,
  INITIAL_COMMISSION,
  INITIAL_ACTIVITY,
  FARE_STATS,
} from '../../data/fareSettings';

const STORAGE_KEY = 'nqTaxiFareSettings';

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    /* use defaults */
  }
  return {
    fareTypes: INITIAL_FARE_TYPES,
    pricingRules: INITIAL_PRICING_RULES,
    commission: INITIAL_COMMISSION,
    activity: INITIAL_ACTIVITY,
    lastUpdated: FARE_STATS.lastUpdated,
  };
}

function computeStats(fareTypes, pricingRules, commission) {
  const activeRules = pricingRules.filter((r) => r.enabled).length;
  const avgCommission =
    fareTypes.reduce((sum, f) => sum + f.driverCommission, 0) / (fareTypes.length || 1);

  return {
    totalRideTypes: fareTypes.length,
    activeRules,
    avgCommission: Math.round(avgCommission * 10) / 10,
    lastUpdated: new Date().toISOString(),
  };
}

export default function FareSettingsPage({ email = 'admin@example.com', onLogout, onNavigate }) {
  const [initial] = useState(loadSettings);
  const [fareTypes, setFareTypes] = useState(initial.fareTypes);
  const [pricingRules, setPricingRules] = useState(initial.pricingRules);
  const [commission, setCommission] = useState(initial.commission);
  const [activity, setActivity] = useState(initial.activity);
  const [stats, setStats] = useState(() =>
    computeStats(initial.fareTypes, initial.pricingRules, initial.commission)
  );

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [editModal, setEditModal] = useState(null);
  const [isNewFare, setIsNewFare] = useState(false);

  const [calcRideType, setCalcRideType] = useState(fareTypes[0]?.rideType || 'Auto');
  const [calcDistance, setCalcDistance] = useState('8');
  const [calcDuration, setCalcDuration] = useState('22');
  const [calcSurge, setCalcSurge] = useState('1.2');

  const snapshot = useMemo(
    () => JSON.stringify({ fareTypes, pricingRules, commission }),
    [fareTypes, pricingRules, commission]
  );
  const initialSnapshot = useRef(JSON.stringify({
    fareTypes: initial.fareTypes,
    pricingRules: initial.pricingRules,
    commission: initial.commission,
  }));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setHasChanges(snapshot !== initialSnapshot.current);
  }, [snapshot]);

  const addActivity = useCallback((action, detail, type = 'fare') => {
    setActivity((prev) => [
      {
        id: Date.now(),
        action,
        detail,
        user: 'Admin',
        timestamp: new Date().toISOString(),
        type,
      },
      ...prev.slice(0, 9),
    ]);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));

    const newStats = computeStats(fareTypes, pricingRules, commission);
    const payload = {
      fareTypes,
      pricingRules,
      commission,
      activity,
      lastUpdated: newStats.lastUpdated,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setStats(newStats);
    initialSnapshot.current = snapshot;
    setHasChanges(false);
    setIsSaving(false);
    addActivity('Saved Fare Settings', 'All pricing configurations updated successfully', 'status');
    toast.success('Fare settings saved successfully');
  };

  const handleReset = () => {
    if (!window.confirm('Reset all unsaved changes?')) return;
    const saved = loadSettings();
    setFareTypes(saved.fareTypes);
    setPricingRules(saved.pricingRules);
    setCommission(saved.commission);
    toast('Settings reset to last saved state', { icon: '↩️' });
  };

  const handleUpdateFare = (id, patch) => {
    setFareTypes((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...patch } : f))
    );
    if (patch.status) {
      const fare = fareTypes.find((f) => f.id === id);
      addActivity(
        `Toggled ${fare?.rideType} Status`,
        `Status changed to ${patch.status}`,
        'status'
      );
    }
  };

  const handleDeleteFare = (id) => {
    const fare = fareTypes.find((f) => f.id === id);
    if (!window.confirm(`Delete ${fare?.rideType} fare type?`)) return;
    setFareTypes((prev) => prev.filter((f) => f.id !== id));
    addActivity(`Deleted ${fare?.rideType}`, 'Fare type removed from configuration', 'fare');
    toast.error(`${fare?.rideType} fare type deleted`);
  };

  const handleDuplicateFare = (id) => {
    const fare = fareTypes.find((f) => f.id === id);
    if (!fare) return;
    const copy = {
      ...fare,
      id: Date.now(),
      rideType: `${fare.rideType} Copy`,
      status: 'inactive',
    };
    setFareTypes((prev) => [...prev, copy]);
    addActivity(`Duplicated ${fare.rideType}`, `Created copy: ${copy.rideType}`, 'fare');
    toast.success('Fare type duplicated');
  };

  const handleEditFare = (fare) => {
    setEditModal(fare);
    setIsNewFare(false);
  };

  const handleAddFareType = () => {
    setEditModal({
      rideType: '',
      baseFare: 50,
      minFare: 80,
      perKm: 15,
      perMinute: 2,
      waitingCharge: 2,
      nightCharge: 1.3,
      surge: 1.0,
      driverCommission: 75,
      platformFee: 25,
      status: 'active',
    });
    setIsNewFare(true);
  };

  const handleModalSave = (data) => {
    if (isNewFare) {
      const newFare = { ...data, id: Date.now() };
      setFareTypes((prev) => [...prev, newFare]);
      addActivity(`Added ${data.rideType}`, 'New fare type configured', 'fare');
      toast.success(`${data.rideType} fare type added`);
    } else {
      setFareTypes((prev) =>
        prev.map((f) => (f.id === editModal.id ? { ...f, ...data } : f))
      );
      addActivity(`Updated ${data.rideType} Fare`, 'Fare configuration modified', 'fare');
      toast.success(`${data.rideType} updated`);
    }
    setEditModal(null);
  };

  const handlePricingRuleUpdate = (id, patch) => {
    setPricingRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
    );
    const rule = pricingRules.find((r) => r.id === id);
    if (patch.enabled !== undefined) {
      addActivity(
        `${patch.enabled ? 'Enabled' : 'Disabled'} ${rule?.label}`,
        patch.enabled ? 'Pricing rule activated' : 'Pricing rule deactivated',
        'surge'
      );
    }
  };

  const handleCommissionUpdate = (patch) => {
    setCommission((prev) => ({ ...prev, ...patch }));
    if (patch.driverCommission !== undefined || patch.platformFee !== undefined) {
      addActivity('Changed Commission Settings', 'Revenue split updated', 'commission');
    }
  };

  return (
    <AdminLayout activePage="settings" onNavigate={onNavigate} onLogout={onLogout}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />

      <main className="min-w-0 flex-1 animate-fade-in p-4 md:p-8">
        <FarePageHeader
          hasChanges={hasChanges}
          isSaving={isSaving}
          onAddFareType={handleAddFareType}
          onReset={handleReset}
          onSave={handleSave}
        />

        <FareStatsOverview stats={stats} loading={loading} />

        {/* Grid + Calculator */}
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <FareDataGrid
              fareTypes={fareTypes}
              onUpdate={handleUpdateFare}
              onDelete={handleDeleteFare}
              onDuplicate={handleDuplicateFare}
              onEdit={handleEditFare}
            />
          </div>
          <FareCalculatorPanel
            fareTypes={fareTypes}
            commission={commission}
            selectedRideType={calcRideType}
            onRideTypeChange={setCalcRideType}
            distance={calcDistance}
            onDistanceChange={setCalcDistance}
            duration={calcDuration}
            onDurationChange={setCalcDuration}
            surgeMultiplier={calcSurge}
            onSurgeChange={setCalcSurge}
          />
        </div>

        {/* Pricing Rules + Commission */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DynamicPricingRules rules={pricingRules} onUpdate={handlePricingRuleUpdate} />
          <CommissionSettingsCard commission={commission} onUpdate={handleCommissionUpdate} />
        </div>

        {/* Activity Feed */}
        <RecentActivityPanel activities={activity} />
      </main>

      {editModal && (
        <FareEditModal
          fare={editModal}
          isNew={isNewFare}
          onSave={handleModalSave}
          onClose={() => setEditModal(null)}
        />
      )}
    </AdminLayout>
  );
}
