export default function AdminTopbar({
  searchQuery,
  onSearchChange,
  profileName = 'Rebecca',
  profileAvatar,
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-4 pt-5 sm:px-8">
      <div className="order-2 flex w-full max-w-none flex-1 items-center gap-2.5 rounded-full border border-white/[0.08] bg-bg-secondary px-4 py-2.5 shadow-soft sm:order-1 sm:max-w-[280px] sm:w-auto">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-text-secondary"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3-3" />
        </svg>
        <input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search users"
          className="min-w-0 flex-1 border-none bg-transparent font-sans text-sm text-text-primary outline-none placeholder:text-text-secondary"
        />
      </div>

      <button
        type="button"
        className="order-1 flex cursor-pointer items-center gap-2 rounded-full border border-white/[0.08] bg-bg-secondary py-1.5 pl-1.5 pr-2 font-sans shadow-soft hover:border-primary/35 sm:order-2"
      >
        {profileAvatar ? (
          <img src={profileAvatar} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
            R
          </span>
        )}
        <span className="pr-0.5 text-sm font-semibold text-text-primary">{profileName}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className="mr-1 h-4 w-4 text-text-secondary"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </header>
  );
}
