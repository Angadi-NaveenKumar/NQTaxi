import { useMemo, useState } from 'react';
import {
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Car,
  Bike,
  Truck,
  Plane,
  Map,
  Crown,
  Gem,
  Clock,
} from 'lucide-react';
import { formatCurrency } from '../../../data/fareSettings';

const PAGE_SIZE = 5;

const RIDE_ICONS = {
  Auto: Bike,
  Mini: Car,
  Sedan: Car,
  SUV: Truck,
  Premium: Crown,
  Luxury: Gem,
  Rental: Clock,
  Airport: Plane,
  Outstation: Map,
};

const RIDE_COLORS = {
  Auto: '#FF9800',
  Mini: '#2196F3',
  Sedan: '#4CAF50',
  SUV: '#9C27B0',
  Premium: '#F5C518',
  Luxury: '#E91E63',
  Rental: '#00BCD4',
  Airport: '#3F51B5',
  Outstation: '#795548',
};

const SORT_KEYS = [
  'rideType',
  'baseFare',
  'minFare',
  'perKm',
  'perMinute',
  'driverCommission',
  'status',
];

function SortIcon({ active, direction }) {
  if (!active) return <ChevronsUpDown size={14} className="opacity-40" />;
  return direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}

function StatusBadge({ status }) {
  const active = status === 'active';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
        active ? 'bg-success/15 text-success' : 'bg-white/10 text-text-secondary'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-success' : 'bg-text-secondary'}`}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}

function RideTypeCell({ rideType }) {
  const Icon = RIDE_ICONS[rideType] || Car;
  const color = RIDE_COLORS[rideType] || '#F5C518';

  return (
    <div className="flex items-center gap-3">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${color}22`, color }}
        aria-hidden="true"
      >
        <Icon size={16} />
      </span>
      <span className="font-semibold text-text-primary">{rideType}</span>
    </div>
  );
}

function RowActionsMenu({ onEdit, onDuplicate, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-text-secondary transition hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        aria-label="Row actions"
        aria-expanded={open}
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-label="Close actions menu"
          />
          <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-xl border border-white/[0.1] bg-surface-elevated py-1 shadow-panel">
            <button
              type="button"
              onClick={() => { onEdit(); setOpen(false); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-white/[0.06] hover:text-text-primary"
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              type="button"
              onClick={() => { onDuplicate(); setOpen(false); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-white/[0.06] hover:text-text-primary"
            >
              <Copy size={14} /> Duplicate
            </button>
            <button
              type="button"
              onClick={() => { onDelete(); setOpen(false); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-danger/10"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function FareDataGrid({
  fareTypes,
  onUpdate,
  onDelete,
  onDuplicate,
  onEdit,
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState('rideType');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const filtered = useMemo(() => {
    let list = [...fareTypes];
    const q = search.trim().toLowerCase();

    if (q) {
      list = list.filter((f) => f.rideType.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') {
      list = list.filter((f) => f.status === statusFilter);
    }

    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === 'asc' ? av - bv : bv - av;
    });

    return list;
  }, [fareTypes, search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleAll = () => {
    const pageIds = pageItems.map((f) => f.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((ids) => ids.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((ids) => [...new Set([...ids, ...pageIds])]);
    }
  };

  const toggleRow = (id) => {
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );
  };

  const columns = [
    { key: 'rideType', label: 'Ride Type', sortable: true },
    { key: 'baseFare', label: 'Base Fare', sortable: true },
    { key: 'minFare', label: 'Min Fare', sortable: true },
    { key: 'perKm', label: 'Per KM', sortable: true },
    { key: 'perMinute', label: 'Per Min', sortable: true },
    { key: 'waitingCharge', label: 'Waiting', sortable: false },
    { key: 'nightCharge', label: 'Night', sortable: false },
    { key: 'surge', label: 'Surge', sortable: false },
    { key: 'driverCommission', label: 'Driver %', sortable: true },
    { key: 'platformFee', label: 'Platform', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
  ];

  return (
    <section
      className="overflow-hidden rounded-2xl border border-white/[0.08] bg-surface shadow-card animate-slide-up"
      style={{ animationDelay: '120ms' }}
      aria-label="Fare settings data grid"
    >
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-white/[0.08] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search ride types…"
            className="w-full rounded-xl border border-white/[0.1] bg-bg-tertiary py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
            aria-label="Search fare types"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.length > 0 && (
            <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              {selectedIds.length} selected
            </span>
          )}
          <div className="flex items-center gap-1 rounded-xl border border-white/[0.1] bg-bg-tertiary p-1">
            {['all', 'active', 'inactive'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  statusFilter === s
                    ? 'bg-primary text-on-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-bg-tertiary px-3 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary"
            aria-label="Open filters"
          >
            <Filter size={14} />
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-surface-elevated">
            <tr className="border-b border-white/[0.08]">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={pageItems.length > 0 && pageItems.every((f) => selectedIds.includes(f.id))}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-white/20 accent-primary"
                  aria-label="Select all rows on this page"
                />
              </th>
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-3 text-left">
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary"
                    >
                      {col.label}
                      <SortIcon active={sortKey === col.key} direction={sortDir} />
                    </button>
                  ) : (
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      {col.label}
                    </span>
                  )}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((fare, idx) => (
              <tr
                key={fare.id}
                className={`border-b border-white/[0.04] transition-colors hover:bg-white/[0.03] ${
                  idx % 2 === 1 ? 'bg-white/[0.015]' : ''
                } ${selectedIds.includes(fare.id) ? 'bg-primary/[0.04]' : ''}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(fare.id)}
                    onChange={() => toggleRow(fare.id)}
                    className="h-4 w-4 rounded border-white/20 accent-primary"
                    aria-label={`Select ${fare.rideType}`}
                  />
                </td>
                <td className="px-3 py-3">
                  <RideTypeCell rideType={fare.rideType} />
                </td>
                <td className="px-3 py-3 tabular-nums text-text-primary">{formatCurrency(fare.baseFare)}</td>
                <td className="px-3 py-3 tabular-nums text-text-primary">{formatCurrency(fare.minFare)}</td>
                <td className="px-3 py-3 tabular-nums text-text-primary">{formatCurrency(fare.perKm)}</td>
                <td className="px-3 py-3 tabular-nums text-text-primary">{formatCurrency(fare.perMinute)}</td>
                <td className="px-3 py-3 tabular-nums text-text-secondary">{formatCurrency(fare.waitingCharge)}/min</td>
                <td className="px-3 py-3 tabular-nums text-text-secondary">{fare.nightCharge}×</td>
                <td className="px-3 py-3">
                  <span className="rounded-md bg-warning/15 px-2 py-0.5 text-xs font-semibold text-warning">
                    {fare.surge}×
                  </span>
                </td>
                <td className="px-3 py-3 tabular-nums text-success">{fare.driverCommission}%</td>
                <td className="px-3 py-3 tabular-nums text-info">{fare.platformFee}%</td>
                <td className="px-3 py-3">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdate(fare.id, {
                        status: fare.status === 'active' ? 'inactive' : 'active',
                      })
                    }
                    aria-label={`Toggle ${fare.rideType} status`}
                  >
                    <StatusBadge status={fare.status} />
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <RowActionsMenu
                    onEdit={() => onEdit(fare)}
                    onDuplicate={() => onDuplicate(fare.id)}
                    onDelete={() => onDelete(fare.id)}
                  />
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={13} className="px-4 py-12 text-center text-text-secondary">
                  No fare types match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-text-secondary">
          Showing {(currentPage - 1) * PAGE_SIZE + 1}–
          {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} ride types
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.1] text-text-secondary transition hover:bg-white/[0.06] disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
                p === currentPage
                  ? 'bg-primary text-on-primary'
                  : 'border border-white/[0.1] text-text-secondary hover:bg-white/[0.06]'
              }`}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.1] text-text-secondary transition hover:bg-white/[0.06] disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
