/**
 * Authentication service for NQTaxi.
 *
 * Connects the frontend auth pages to the Django backend auth endpoints.
 */

const OTP_SESSION_KEY = 'nqtaxi_otp_session';
const AUTH_SESSION_KEY = 'nqtaxi_auth_session';
const OTP_EXPIRY_MS = 5 * 60 * 1000;
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '');

const DEMO_USERS = [
  {
    email: 'demo.customer@nqtaxi.com',
    password: 'Demo@123',
    role: 'rider',
    fullName: 'Demo Customer',
    phone: '+919000000001',
  },
  {
    email: 'demo.driver@nqtaxi.com',
    password: 'Demo@123',
    role: 'driver',
    fullName: 'Demo Driver',
    phone: '+919000000002',
  },
];

let initialized = false;

export function isDevelopmentMode() {
  return import.meta.env.DEV === true;
}

export function getDevOtp() {
  if (!isDevelopmentMode()) return null;
  return import.meta.env.VITE_DEV_OTP || '123456';
}

function storageGet(key) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function storageRemove(key) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}

async function requestJson(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  return { response, data };
}

export function initializeAuthService() {
  if (initialized) return;
  initialized = true;
}

export function getOtpSession() {
  try {
    const data = storageGet(OTP_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function setOtpSession(session) {
  const saved = storageSet(OTP_SESSION_KEY, JSON.stringify(session));
  if (!saved) {
    throw new Error('Unable to start verification. Please enable browser storage and try again.');
  }
}

export function clearOtpSession() {
  storageRemove(OTP_SESSION_KEY);
}

export function createAuthSession(user) {
  const session = {
    userId: user.id || `${user.email || user.username || user.phone || 'user'}-${Date.now()}`,
    email: user.email,
    phone: user.phone,
    role: user.role || 'rider',
    fullName: user.fullName || user.username || user.email,
    accessToken: user.access,
    refreshToken: user.refresh,
    expiresAt: Date.now() + SESSION_EXPIRY_MS,
  };

  const saved = storageSet(AUTH_SESSION_KEY, JSON.stringify(session));
  if (!saved) {
    throw new Error('Unable to create session. Please enable browser storage and try again.');
  }

  return session;
}

export function getAuthSession() {
  try {
    const data = storageGet(AUTH_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  storageRemove(AUTH_SESSION_KEY);
}

export function restoreAuthSession() {
  const session = getAuthSession();
  if (!session || Date.now() > session.expiresAt) {
    clearAuthSession();
    return null;
  }

  return {
    session,
    user: {
      id: session.userId,
      email: session.email,
      phone: session.phone,
      role: session.role,
      fullName: session.fullName,
      access: session.accessToken,
      refresh: session.refreshToken,
    },
  };
}

export function logout() {
  clearAuthSession();
  clearOtpSession();
}

export function maskEmail(email) {
  if (!email || !email.includes('@')) return '***';
  const [local, domain] = email.split('@');
  const masked = local.length <= 2 ? `${local[0]}***` : `${local.slice(0, 2)}***`;
  return `${masked}@${domain}`;
}

export async function initiateRegistration(userData) {
  try {
    const payload = {
      username: userData.fullName?.trim() || userData.username || userData.email?.split('@')[0],
      email: userData.email.trim(),
      phone: userData.phone.trim(),
      role: userData.role || 'rider',
      password: userData.password,
    };

    const { response, data } = await requestJson('/register/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const message = data?.detail || data?.error || Object.values(data || {}).flat().join(' ') || 'Registration failed';
      return { success: false, error: message };
    }

    const session = {
      purpose: 'register',
      email: payload.email,
      phone: payload.phone,
      userData: payload,
      createdAt: Date.now(),
      expiresAt: Date.now() + OTP_EXPIRY_MS,
    };

    setOtpSession(session);

    await requestJson('/send-otp/', {
      method: 'POST',
      body: JSON.stringify({ phone: payload.phone }),
    });

    return { success: true, maskedContact: maskEmail(payload.email) };
  } catch {
    return { success: false, error: 'Unable to connect to the server. Please try again.' };
  }
}
export async function initiateLogin(identifier, password) {

  console.log("AUTH SERVICE LOGIN STARTED:", identifier);

  const normalizedIdentifier = (identifier || '').trim();
  const normalizedPassword = (password || '').trim();

  const demoUser = DEMO_USERS.find((user) => {
    const matchesEmail = user.email.toLowerCase() === normalizedIdentifier.toLowerCase();
    const matchesPhone = user.phone === normalizedIdentifier;
    return (matchesEmail || matchesPhone) && user.password === normalizedPassword;
  });

  if (demoUser) {
    const user = {
      id: `${demoUser.role}-${demoUser.email}`,
      email: demoUser.email,
      phone: demoUser.phone,
      role: demoUser.role,
      fullName: demoUser.fullName,
      access: 'demo-access-token',
      refresh: 'demo-refresh-token',
    };

    createAuthSession(user);
    localStorage.setItem('access', user.access);
    localStorage.setItem('refresh', user.refresh);

    return { success: true, user };
  }

 try {
  const payload = {
    username: normalizedIdentifier,
    email: normalizedIdentifier,
    phone: normalizedIdentifier,
    password: normalizedPassword,
  };

  console.log("Calling login API");

  const { response, data } = await requestJson('/login/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  console.log("Login response:", data);

  if (!response.ok) {
    return {
      success: false,
      error: data?.detail || data?.error || 'Login failed',
    };
  }

    const accessToken = data.access;
    const refreshToken = data.refresh;

    if (!accessToken) {
      return { success: false, error: 'No access token returned by the server.' };
    }

    localStorage.setItem('access', accessToken);
    localStorage.setItem('refresh', refreshToken);

    const meResponse = await requestJson('/me/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!meResponse.response.ok) {
      return { success: false, error: 'Unable to load your account profile.' };
    }

    const user = {
      ...meResponse.data,
      access: accessToken,
      refresh: refreshToken,
    };

    createAuthSession(user);

    return {
      success: true,
      user,
    };
  } catch {
    return {
      success: false,
      error: 'Unable to connect to the server.',
    };
  }
}

export async function verifyOtp(code) {
  const session = getOtpSession();
  if (!session) {
    return { success: false, error: 'Verification session not found. Please start again.' };
  }

  if (Date.now() > session.expiresAt) {
    clearOtpSession();
    return { success: false, error: 'Verification code has expired. Please request a new one.' };
  }

  try {
    const { response, data } = await requestJson('/verify-otp/', {
      method: 'POST',
      body: JSON.stringify({ phone: session.phone, otp: code }),
    });

    if (!response.ok) {
      return { success: false, error: data?.error || 'Invalid verification code. Please try again.' };
    }

    clearOtpSession();
    return { success: true, message: data?.message || 'Phone verified successfully.' };
  } catch {
    return { success: false, error: 'Unable to verify code right now. Please try again.' };
  }
}

export async function resendOtp() {
  const session = getOtpSession();
  if (!session) {
    return { success: false, error: 'Verification session not found. Please start again.' };
  }

  try {
    const { response, data } = await requestJson('/send-otp/', {
      method: 'POST',
      body: JSON.stringify({ phone: session.phone }),
    });

    if (!response.ok) {
      return { success: false, error: data?.error || 'Unable to resend the code.' };
    }

    session.createdAt = Date.now();
    session.expiresAt = Date.now() + OTP_EXPIRY_MS;
    setOtpSession(session);

    return { success: true };
  } catch {
    return { success: false, error: 'Unable to resend the code. Please try again.' };
  }
}
