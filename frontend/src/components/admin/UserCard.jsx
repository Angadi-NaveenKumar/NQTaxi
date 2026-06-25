const INITIAL_COLORS = {
  purple: { bg: '#9C27B0', text: '#FFFFFF' },
  blue: { bg: '#2196F3', text: '#FFFFFF' },
  green: { bg: '#22C55E', text: '#0D0D0D' },
};

function UserAvatar({ avatar }) {
  if (avatar.type === 'photo') {
    return <img src={avatar.src} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" loading="lazy" />;
  }

  const colors = INITIAL_COLORS[avatar.variant] ?? INITIAL_COLORS.blue;

  return (
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-bold tracking-wide"
      style={{ background: colors.bg, color: colors.text }}
      aria-hidden="true"
    >
      {avatar.initials}
    </span>
  );
}

export default function UserCard({ user }) {
  return (
    <article className="relative flex min-h-[7.5rem] items-start gap-4 rounded-lg border border-white/[0.08] bg-bg-tertiary p-5 shadow-soft">
      <button
        type="button"
        className="absolute right-3 top-3.5 flex cursor-pointer flex-col gap-[3px] border-none bg-transparent p-1 opacity-50 hover:opacity-100"
        aria-label={`Options for ${user.name}`}
      >
        <span className="block h-[3px] w-[3px] rounded-full bg-text-secondary" />
        <span className="block h-[3px] w-[3px] rounded-full bg-text-secondary" />
        <span className="block h-[3px] w-[3px] rounded-full bg-text-secondary" />
      </button>

      <UserAvatar avatar={user.avatar} />

      <div className="min-w-0 flex-1 pt-0.5 pr-5">
        <h3 className="mb-0.5 text-[0.9375rem] font-bold leading-snug text-text-primary">{user.name}</h3>
        <p className="mb-2.5 text-[0.8125rem] text-text-secondary">@{user.handle}</p>
        <p className="m-0 text-sm font-bold text-text-primary">{user.role}</p>
      </div>
    </article>
  );
}
