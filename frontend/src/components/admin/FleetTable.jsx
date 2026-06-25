import { useMemo, useState } from 'react';
import { COLUMN_OPTIONS } from '../../data/vehicles';
import VehicleStatusBadge from './VehicleStatusBadge';

const AVATAR_COLORS = {
  van: '#2196F3',
  truck: '#F5C518',
  suv: '#F59E0B',
  car: '#9C27B0',
};

const PAGE_SIZE = 5;

const iconBtnClass =
  'flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-bg-secondary font-sans text-base text-text-secondary hover:border-white/[0.12] hover:bg-bg-tertiary';

function VehicleAvatar({ type }) {
  return (
    <span
      className="h-8 w-8 shrink-0 rounded-full"
      style={{ background: AVATAR_COLORS[type] ?? '#B3B3B3' }}
      aria-hidden="true"
    />
  );
}

export default function FleetTable({
  vehicles,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onFilterOpen,
  selectedIds,
  onSelectionChange,
}) {
  const [page, setPage] = useState(1);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(() =>
    Object.fromEntries(COLUMN_OPTIONS.map((c) => [c.key, c.default]))
  );

  const filtered = useMemo(() => {
    let list = vehicles;
    const q = searchQuery.trim().toLowerCase();

    if (q) {
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.group.toLowerCase().includes(q) ||
          v.type.toLowerCase().includes(q) ||
          v.licensePlate.toLowerCase().includes(q) ||
          v.operator.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      list = list.filter((v) => v.status === statusFilter);
    }

    return list;
  }, [vehicles, searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const allPageSelected =
    pageItems.length > 0 && pageItems.every((v) => selectedIds.includes(v.id));

  const toggleAll = () => {
    if (allPageSelected) {
      onSelectionChange(selectedIds.filter((id) => !pageItems.some((v) => v.id === id)));
    } else {
      const ids = new Set([...selectedIds, ...pageItems.map((v) => v.id)]);
      onSelectionChange([...ids]);
    }
  };

  const toggleOne = (id) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((x) => x !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderCell = (vehicle, key) => {
    switch (key) {
      case 'name':
        return (
          <div className="flex items-center gap-2.5 font-semibold text-text-primary">
            <VehicleAvatar type={vehicle.avatar} />
            <span>{vehicle.name}</span>
          </div>
        );
      case 'status':
        return <VehicleStatusBadge status={vehicle.status} />;
      case 'type':
        return vehicle.type;
      case 'group':
        return vehicle.group;
      case 'operator':
        return vehicle.operator;
      case 'make':
        return vehicle.make;
      case 'model':
        return vehicle.model;
      case 'year':
        return vehicle.year;
      case 'licensePlate':
        return vehicle.licensePlate;
      default:
        return null;
    }
  };

  const activeColumns = COLUMN_OPTIONS.filter((c) => visibleColumns[c.key]);

  return (
    <div className="min-w-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <button type="button" className={iconBtnClass} aria-label="More options">
            ⋯
          </button>
          <div className="flex min-w-[180px] items-center gap-2 rounded-lg border border-white/[0.08] bg-bg-secondary px-3.5 py-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-text-secondary">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" />
            </svg>
            <input
              type="search"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setPage(1);
              }}
              className="min-w-0 flex-1 border-none bg-transparent font-sans text-[0.8125rem] text-text-primary outline-none placeholder:text-text-secondary"
            />
          </div>
          <button type="button" className={iconBtnClass} aria-label="Add operator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6" />
            </svg>
          </button>
          <button type="button" className={iconBtnClass} aria-label="Export">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M12 3v12M8 11l4 4 4-4M4 21h16" />
            </svg>
          </button>
          <button type="button" className={iconBtnClass} aria-label="Delete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
            </svg>
          </button>
          <select
            className="cursor-pointer rounded-lg border border-white/[0.08] bg-bg-secondary py-2 pl-3 pr-8 font-sans text-[0.8125rem] text-text-primary"
            value={statusFilter}
            onChange={(e) => {
              onStatusFilterChange(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by status"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="in-service">In Service</option>
            <option value="need-repair">Need Repair</option>
          </select>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/[0.08] bg-bg-secondary px-4 py-2 font-sans text-[0.8125rem] font-medium text-text-primary hover:bg-bg-tertiary"
            onClick={onFilterOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-4 w-4">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filter
          </button>
          <button
            type="button"
            className="cursor-pointer whitespace-nowrap rounded-lg border-none bg-primary px-4 py-2 font-sans text-[0.8125rem] font-semibold text-on-primary hover:bg-primary-hover"
          >
            + New Vehicle
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-bg-tertiary shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.8125rem]">
            <thead>
              <tr>
                <th className="w-10 bg-bg-secondary px-4 py-3.5 text-left">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={toggleAll}
                    aria-label="Select all on page"
                    className="h-4 w-4 cursor-pointer accent-primary"
                  />
                </th>
                {activeColumns.map((col) => (
                  <th
                    key={col.key}
                    className="whitespace-nowrap bg-bg-secondary px-4 py-3.5 text-left font-semibold text-text-secondary"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {col.label}
                      <span className="text-[0.65rem] opacity-50" aria-hidden="true">
                        ↕
                      </span>
                    </span>
                  </th>
                ))}
                <th className="w-12 bg-bg-secondary px-4 py-3.5 text-right">
                  <div className="relative inline-block">
                    <button
                      type="button"
                      className="cursor-pointer border-none bg-transparent px-2 py-1 text-base text-text-secondary"
                      onClick={() => setColumnsOpen((v) => !v)}
                      aria-label="Manage columns"
                      aria-expanded={columnsOpen}
                    >
                      ⊞
                    </button>
                    {columnsOpen && (
                      <div
                        className="absolute right-0 top-full z-10 mt-1.5 min-w-[200px] rounded-lg border border-white/[0.08] bg-bg-secondary p-3 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                        role="dialog"
                        aria-label="Manage columns"
                      >
                        <p className="mb-2.5 text-[0.8125rem] font-bold text-text-primary">Manage columns</p>
                        {COLUMN_OPTIONS.map((col) => (
                          <label
                            key={col.key}
                            className="flex cursor-pointer items-center gap-2 py-1.5 text-[0.8125rem] text-text-secondary"
                          >
                            <input
                              type="checkbox"
                              checked={visibleColumns[col.key]}
                              onChange={() => toggleColumn(col.key)}
                              className="accent-primary"
                            />
                            {col.label}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-white/[0.04]">
                  <td className="border-b border-white/[0.08] px-4 py-3.5 align-middle">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(vehicle.id)}
                      onChange={() => toggleOne(vehicle.id)}
                      aria-label={`Select ${vehicle.name}`}
                      className="h-4 w-4 cursor-pointer accent-primary"
                    />
                  </td>
                  {activeColumns.map((col) => (
                    <td key={col.key} className="border-b border-white/[0.08] px-4 py-3.5 align-middle text-text-primary">
                      {renderCell(vehicle, col.key)}
                    </td>
                  ))}
                  <td className="border-b border-white/[0.08] px-4 py-3.5 text-right align-middle">
                    <button
                      type="button"
                      className="cursor-pointer border-none bg-transparent px-2 py-1 text-base leading-none text-text-secondary"
                      aria-label="Row actions"
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex items-center justify-between border-t border-white/[0.08] bg-bg-secondary px-4 py-3.5">
          <span className="text-[0.8125rem] font-semibold text-text-primary">
            {selectedIds.length} Selected
          </span>
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => p - 1)}
              aria-label="Previous page"
              className="min-w-8 cursor-pointer rounded-md border border-white/[0.08] bg-bg-tertiary px-1.5 py-1 font-sans text-[0.8125rem] text-text-secondary hover:bg-white/[0.04] hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`min-w-8 cursor-pointer rounded-md border px-1.5 py-1 font-sans text-[0.8125rem] disabled:cursor-not-allowed ${
                  n === currentPage
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-white/[0.08] bg-bg-tertiary text-text-secondary hover:bg-white/[0.04] hover:text-text-primary'
                }`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Next page"
              className="min-w-8 cursor-pointer rounded-md border border-white/[0.08] bg-bg-tertiary px-1.5 py-1 font-sans text-[0.8125rem] text-text-secondary hover:bg-white/[0.04] hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>
          </nav>
        </footer>
      </div>
    </div>
  );
}
