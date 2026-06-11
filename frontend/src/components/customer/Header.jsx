import { HiOutlineArrowLeft } from 'react-icons/hi';

export function HomeHeader({ name = 'Rahul' }) {
  return (
    <header className="px-4 pb-2 pt-4">
      <h1 className="text-xl font-bold text-foreground">
        Hello, {name} 👋
      </h1>
    </header>
  );
}

export function PageHeader({ title, onBack }) {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 bg-surface px-4 py-3">
      <button
        type="button"
        aria-label="Go back"
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground transition hover:bg-input"
      >
        <HiOutlineArrowLeft className="text-xl" />
      </button>
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
    </header>
  );
}
