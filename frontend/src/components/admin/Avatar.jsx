const PALETTES = [
  ['#2196F3', '#242424'],
  ['#F5C518', '#242424'],
  ['#F59E0B', '#242424'],
  ['#22C55E', '#242424'],
  ['#9C27B0', '#242424'],
  ['#00BCD4', '#242424'],
];

function paletteFor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTES[Math.abs(hash) % PALETTES.length];
}

export default function Avatar({ label, seed = label, src, className = "h-8 w-8" }) {
  if (src) {
    return (
      <img
        src={src}
        alt={label}
        className={`${className} shrink-0 rounded-full border-2 border-white/[0.12] object-cover`}
        aria-hidden="true"
      />
    );
  }

  const [from, to] = paletteFor(seed);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-white/[0.12] text-[0.625rem] font-bold tracking-wide text-text-primary ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}
