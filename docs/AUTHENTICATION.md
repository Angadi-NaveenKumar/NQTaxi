# Authentication Flow

## Technology Context

See project root `README.md` for stack overview. Auth is client-side via `src/services/authService.js` with `localStorage` persistence.

## Workflow

### Registration (OTP required)

```
Register → OTP verification → Account verified & active → Login page
```

1. User submits registration form.
2. OTP session is created (SMS in production; demo OTP in development).
3. User verifies OTP on `/otp-verification`.
4. Account is saved with `status: 'active'` and `isVerified: true`.
5. User is redirected to login.

### Login (no OTP)

```
Login → Credential validation → Session created → Dashboard
```

1. User enters email/mobile and password.
2. Credentials are validated against verified, active accounts.
3. Auth session is created immediately.
4. User is redirected to the dashboard.

OTP is **not** used during login. Verified users sign in directly.

## Development Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Customer | demo.customer@nqtaxi.com | Demo@123 |
| Driver | demo.driver@nqtaxi.com | Demo@123 |

Registration OTP in dev: `123456` (see `VITE_DEV_OTP` in `.env.development`).

## Role Handling

- Registration stores role as `rider` (Customer) or `driver` (Driver).
- Login uses the role from the registered account record.
- Login screen role selector remains visible; stored account role takes precedence on sign-in.

## Session

- Key: `nqtaxi_auth_session`
- Restored on app load in `src/main.jsx`
- Cleared on logout from Profile
