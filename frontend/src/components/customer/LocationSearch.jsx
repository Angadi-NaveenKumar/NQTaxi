import { useState, useRef, useEffect, useCallback } from 'react';
import { HiOutlineSearch, HiOutlineHeart } from 'react-icons/hi';
import { LOCATION_SUGGESTIONS } from '../../data/locations';

function filterLocations(query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return LOCATION_SUGGESTIONS.filter((loc) => loc.toLowerCase().includes(q));
}

function LocationField({
  id,
  label,
  placeholder,
  value,
  dotColor,
  trailingIcon,
  inputRef,
  onChange,
  onFocusField,
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`} />
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocusField}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted"
        />
        {trailingIcon}
      </div>
    </div>
  );
}

export default function LocationSearch({
  pickup,
  destination,
  onPickupChange,
  onDestinationChange,
  onBothSelected,
}) {
  const containerRef = useRef(null);
  const destinationInputRef = useRef(null);
  const [activeField, setActiveField] = useState(null);
  const [filteredPickup, setFilteredPickup] = useState([]);
  const [filteredDestination, setFilteredDestination] = useState([]);

  const handlePickupInput = useCallback(
    (text) => {
      onPickupChange(text);
      setActiveField('pickup');
      setFilteredPickup(filterLocations(text));
    },
    [onPickupChange]
  );

  const handleDestinationInput = useCallback(
    (text) => {
      onDestinationChange(text);
      setActiveField('destination');
      setFilteredDestination(filterLocations(text));
    },
    [onDestinationChange]
  );

  const selectPickup = useCallback(
    (location) => {
      onPickupChange(location);
      setFilteredPickup([]);
      setActiveField(null);

      requestAnimationFrame(() => {
        destinationInputRef.current?.focus();
        setActiveField('destination');
        setFilteredDestination(filterLocations(destination));
      });
    },
    [onPickupChange, destination]
  );

  const selectDestination = useCallback(
    (location) => {
      onDestinationChange(location);
      setFilteredDestination([]);
      setActiveField(null);

      if (pickup && pickup.trim()) {
        onBothSelected?.(pickup, location);
      }
    },
    [onDestinationChange, onBothSelected, pickup]
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveField(null);
        setFilteredPickup([]);
        setFilteredDestination([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const cardActive =
    activeField === 'pickup'
      ? filteredPickup.length > 0
      : activeField === 'destination'
        ? filteredDestination.length > 0
        : false;

  const currentSuggestions = activeField === 'pickup' ? filteredPickup : filteredDestination;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-foreground">Where are you going?</h2>

      <div
        ref={containerRef}
        className={`overflow-hidden rounded-2xl bg-card shadow-card transition ${
          cardActive ? 'ring-2 ring-primary shadow-glow' : ''
        }`}
      >
        <LocationField
          id="pickup"
          label="Pickup Location"
          placeholder="Enter pickup location"
          value={pickup}
          dotColor="bg-emerald-500"
          inputRef={null}
          onChange={handlePickupInput}
          onFocusField={() => {
            setActiveField('pickup');
            setFilteredPickup(filterLocations(pickup));
          }}
        />

        <div className="mx-4 border-t border-input" />

        <LocationField
          id="destination"
          label="Destination"
          placeholder="Where are you going?"
          value={destination}
          dotColor="bg-red-500"
          inputRef={destinationInputRef}
          onChange={handleDestinationInput}
          onFocusField={() => {
            setActiveField('destination');
            setFilteredDestination(filterLocations(destination));
          }}
          trailingIcon={
            <button
              type="button"
              aria-label="Add to favorites"
              tabIndex={-1}
              className="shrink-0 text-muted transition hover:text-primary"
            >
              <HiOutlineHeart className="text-xl" />
            </button>
          }
        />
      </div>

      {activeField && currentSuggestions.length > 0 && (
        <ul
          className="rounded-2xl border border-input bg-card py-1 shadow-card-lg animate-fade-in max-h-48 overflow-y-auto"
          role="listbox"
        >
          {currentSuggestions.map((location) => (
            <li key={location} role="option" aria-selected={(activeField === 'pickup' ? pickup : destination) === location}>
              <button
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  if (activeField === 'pickup') {
                    selectPickup(location);
                  } else {
                    selectDestination(location);
                  }
                }}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm text-foreground transition hover:bg-input active:bg-input"
              >
                <HiOutlineSearch className="shrink-0 text-muted" />
                <span className="font-medium">{location}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}