import { FaCarSide } from 'react-icons/fa';

export default function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-4 shadow-card">
      <div className="relative z-10 max-w-[55%]">
        <p className="text-2xl font-extrabold text-primary-fg">20% OFF</p>
        <p className="mt-1 text-sm font-semibold text-primary-fg/80">On your first 3 rides</p>
      </div>
      <div className="absolute bottom-2 right-2 flex h-20 w-28 items-center justify-center">
        <FaCarSide className="text-6xl text-primary-fg/30" />
      </div>
    </div>
  );
}
