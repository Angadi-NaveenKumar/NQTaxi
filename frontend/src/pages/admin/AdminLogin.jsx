import { useState } from 'react';
import { mockLogin } from '../../services/auth/mockLogin';
import { saveSession } from '../../services/auth/session';

const inputClass =
  'w-full rounded-[0.625rem] border border-white/10 bg-bg-tertiary px-[0.9rem] py-[0.7rem] font-sans text-[0.9375rem] text-text-primary outline-none transition-[border-color,box-shadow] placeholder:text-text-secondary placeholder:opacity-70 focus:border-primary focus:shadow-[0_0_0_3px_rgba(245,197,24,0.25)] disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-danger/35';

export default function AdminLogin({ onSuccess }) {
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
    try {
      const session = await mockLogin(email, password);
      saveSession(session);
      onSuccess(session);
    } catch (err) {
      setFormError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary p-6">
      <div
        className="pointer-events-none absolute -right-24 -top-32 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(245,197,24,0.15)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[420px] rounded-[1.25rem] border border-white/[0.08] bg-bg-secondary p-8 pb-6 shadow-card backdrop-blur-xl">
        <header className="mb-7 text-center">
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[0.875rem] bg-primary text-on-primary"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M12 3L4 9v12h16V9l-8-6z" />
              <path d="M9 21v-6h6v6" />
            </svg>
          </div>
          <h1 className="mb-1.5 text-2xl font-bold tracking-tight text-text-primary">Admin Portal</h1>
          <p className="m-0 text-[0.9rem] text-text-secondary">Sign in to manage your dashboard</p>
        </header>

        <form className="flex flex-col gap-[1.1rem]" onSubmit={handleSubmit} noValidate>
          {formError && (
            <div
              className="rounded-[0.625rem] border border-danger/35 bg-danger/10 px-4 py-3 text-sm text-danger"
              role="alert"
            >
              {formError}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[0.8125rem] font-medium text-text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={loading}
              className={inputClass}
            />
            {errors.email && (
              <span id="email-error" className="mt-1.5 block text-[0.8125rem] text-danger">
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-[0.8125rem] font-medium text-text-secondary">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                disabled={loading}
                className={`${inputClass} pr-16`}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border-none bg-transparent px-2 py-1.5 font-sans text-xs font-semibold text-text-secondary hover:text-text-primary disabled:cursor-not-allowed"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="mt-1.5 block text-[0.8125rem] text-danger">
                {errors.password}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
                className="h-4 w-4 accent-primary"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="border-none bg-transparent p-0 font-sans text-sm font-medium text-info hover:text-primary hover:underline disabled:cursor-not-allowed"
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-[0.625rem] border-none bg-primary px-4 py-[0.8rem] font-sans text-[0.9375rem] font-semibold text-on-primary transition-[background,transform] hover:bg-primary-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary/25 border-t-on-primary"
                  aria-hidden="true"
                />
                Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <footer className="mt-6 border-t border-white/[0.08] pt-5 text-center text-[0.8125rem] text-text-secondary">
          <p className="my-1">
            <strong className="text-text-secondary">Demo credentials</strong>
          </p>
          <p className="my-1">
            Email: <code className="rounded bg-bg-tertiary px-1.5 py-0.5 text-xs text-primary">admin@example.com</code>{' '}
            · Password: <code className="rounded bg-bg-tertiary px-1.5 py-0.5 text-xs text-primary">admin123</code>
          </p>
        </footer>
      </div>
    </div>
  );
}
