import { useState } from 'react';

const inputClass =
  'w-full rounded-[0.625rem] border border-white/10 bg-[#242424] px-[0.9rem] py-[0.7rem] font-sans text-[0.9375rem] text-white outline-none transition-[border-color,box-shadow] placeholder:text-gray-500 focus:border-[#F5C518] focus:shadow-[0_0_0_3px_rgba(245,197,24,0.25)] disabled:cursor-not-allowed disabled:opacity-60';

export default function DriverLogin({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = {};
    const trimmed = email.trim();

    if (!trimmed) {
      next.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      next.email = 'Enter a valid email address.';
    }

    if (!password) {
      next.password = 'Password is required.';
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === 'driver@example.com' && password === 'driver123') {
        onSuccess();
      } else {
        setFormError('Invalid credentials. Use driver@example.com / driver123.');
      }
    }, 800);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D0D0D] p-6">
      <div
        className="pointer-events-none absolute -right-24 -top-32 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(245,197,24,0.15)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[420px] rounded-[1.25rem] border border-white/[0.08] bg-[#1A1A1A] p-8 pb-6 shadow-2xl backdrop-blur-xl">
        <header className="mb-7 text-center">
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[0.875rem] bg-[#F5C518] text-black"
            aria-hidden="true"
          >
            <span className="text-xl font-bold">🚕</span>
          </div>
          <h1 className="mb-1.5 text-2xl font-bold tracking-tight text-white">Driver Portal</h1>
          <p className="m-0 text-[0.9rem] text-gray-400">Sign in to access driver tools and trips</p>
        </header>

        <form className="flex flex-col gap-[1.1rem]" onSubmit={handleSubmit} noValidate>
          {formError && (
            <div
              className="rounded-[0.625rem] border border-[#F44336]/35 bg-[#F44336]/10 px-4 py-3 text-sm text-[#F44336]"
              role="alert"
            >
              {formError}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[0.8125rem] font-medium text-gray-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="driver@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              disabled={loading}
              className={inputClass}
            />
            {errors.email && (
              <span className="mt-1.5 block text-[0.8125rem] text-[#F44336]">
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-[0.8125rem] font-medium text-gray-400">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={Boolean(errors.password)}
                disabled={loading}
                className={`${inputClass} pr-16`}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border-none bg-transparent px-2 py-1.5 font-sans text-xs font-semibold text-gray-400 hover:text-white disabled:cursor-not-allowed"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <span className="mt-1.5 block text-[0.8125rem] text-[#F44336]">
                {errors.password}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
                className="h-4 w-4 accent-[#F5C518]"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-[0.625rem] border-none bg-[#F5C518] px-4 py-[0.8rem] font-sans text-[0.9375rem] font-bold text-black transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 hover:bg-[#D4A80E]"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <footer className="mt-6 border-t border-white/[0.08] pt-5 text-center text-[0.8125rem] text-gray-400">
          <p className="my-1">
            <strong className="text-gray-300">Driver Credentials</strong>
          </p>
          <p className="my-1">
            Email: <code className="rounded bg-[#242424] px-1.5 py-0.5 text-xs text-[#F5C518]">driver@example.com</code>{' '}
            · Password: <code className="rounded bg-[#242424] px-1.5 py-0.5 text-xs text-[#F5C518]">driver123</code>
          </p>
        </footer>
      </div>
    </div>
  );
}
