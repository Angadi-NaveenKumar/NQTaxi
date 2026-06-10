import { useMemo, useState } from 'react';
import { fleetMetrics, fleetVehicles } from '../../data/vehicles';
import AdminLayout from '../../components/layout/AdminLayout';
import FleetFilterPanel from '../../components/admin/FleetFilterPanel';
import FleetTable from '../../components/admin/FleetTable';

const EMPTY_FILTERS = {
  status: [],
  type: [],
  group: [],
  operator: '',
};

function normalizeStatus(label) {
  const map = {
    Active: 'active',
    'In Service': 'in-service',
    'Need Repair': 'need-repair',
  };
  return map[label];
}

function matchesFilters(vehicle, filters) {
  if (filters.status.length > 0) {
    const statuses = filters.status.map(normalizeStatus);
    if (!statuses.includes(vehicle.status)) return false;
  }
  if (filters.type.length > 0 && !filters.type.includes(vehicle.type)) return false;
  if (filters.group.length > 0 && !filters.group.includes(vehicle.group)) return false;
  if (filters.operator.trim()) {
    const q = filters.operator.trim().toLowerCase();
    if (!vehicle.operator.toLowerCase().includes(q)) return false;
  }
  return true;
}

export default function FleetOverview({ onLogout, onNavigate }) {
  const [filterOpen, setFilterOpen] = useState(true);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');
  const [selectedIds, setSelectedIds] = useState([1, 2, 3]);

  const vehicles = useMemo(
    () => fleetVehicles.filter((v) => matchesFilters(v, appliedFilters)),
    [appliedFilters]
  );

  const metrics = [
    { label: 'Total Vehicle', value: fleetMetrics.total },
    { label: 'Active', value: fleetMetrics.active },
    { label: 'In Service', value: fleetMetrics.inService },
    { label: 'Need Repair', value: fleetMetrics.needRepair },
    { label: 'Assigned', value: fleetMetrics.assigned },
    { label: 'Unassigned', value: fleetMetrics.unassigned },
  ];

  return (
    <AdminLayout
      activePage="fleet"
      onNavigate={onNavigate}
      onLogout={onLogout}
      variant="light"
    >
      <div className="flex min-h-screen flex-1 flex-col bg-bg-primary md:flex-row">
        <FleetFilterPanel
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          filters={filters}
          onFiltersChange={setFilters}
          onSave={() => setAppliedFilters(filters)}
          onClear={() => {
            setFilters(EMPTY_FILTERS);
            setAppliedFilters(EMPTY_FILTERS);
          }}
        />

        <div className="min-w-0 flex-1 overflow-y-auto px-4 pb-8 pt-6 md:px-7">
          <header className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="mb-1.5 text-[1.375rem] font-bold text-text-primary">Fleet Overview</h1>
              <p className="m-0 max-w-md text-sm text-text-secondary">
                A quick summary of all vehicles and their current status.
              </p>
            </div>
            <div className="flex items-center gap-2 text-lg font-bold text-primary">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.15rem] w-[1.15rem]">
                  <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                </svg>
              </span>
              Fleet
            </div>
          </header>

          <section
            className="mb-5 flex flex-col flex-wrap items-stretch gap-0 rounded-xl border border-white/[0.08] bg-bg-secondary py-4 shadow-soft min-[900px]:flex-row"
            aria-label="Fleet metrics"
          >
            {metrics.map((m, i) => (
              <div key={m.label} className="flex min-w-[120px] flex-1 items-center">
                {i > 0 && (
                  <span
                    className="mx-0 h-px w-full shrink-0 bg-white/[0.08] min-[900px]:mx-0 min-[900px]:h-10 min-[900px]:w-px"
                    aria-hidden="true"
                  />
                )}
                <div className="flex-1 px-5 py-2 text-center">
                  <span className="mb-1 block text-xs text-text-secondary">{m.label}</span>
                  <strong className="text-xl font-bold text-text-primary">{m.value}</strong>
                </div>
              </div>
            ))}
          </section>

          <FleetTable
            vehicles={vehicles}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onFilterOpen={() => setFilterOpen(true)}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
