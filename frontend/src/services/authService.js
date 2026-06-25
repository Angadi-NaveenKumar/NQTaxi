/**
 * Authentication service for NQTaxi.
 *
 * Development: demo accounts, demo OTP, localStorage user store.
 * Production: OTP gated behind future SMS/API integration.
 */

const USERS_STORAGE_KEY = 'nqtaxi_registered_users';
const OTP_SESSION_KEY = 'nqtaxi_otp_session';
const AUTH_SESSION_KEY = 'nqtaxi_auth_session';
const OTP_EXPIRY_MS = 5 * 60 * 1000;
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

const DEMO_ACCOUNTS = [
  {
    email: 'demo.customer@nqtaxi.com',
    password: 'Demo@123',
    role: 'rider',
    fullName: 'Demo Customer',
    phone: '+91 9000000001',
    otp: '5729',
  },
  {
    email: 'demo.driver@nqtaxi.com',
    password: 'Demo@123',
    role: 'driver',
    fullName: 'Demo Driver',
    phone: '+91 9000000002',
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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function storageGet(key) {
  try {
    if (key === USERS_STORAGE_KEY) {
      return localStorage.getItem(key);
    }
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    if (key === USERS_STORAGE_KEY) {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
    return true;
  } catch {
    return false;
  }
}

function storageRemove(key) {
  try {
    if (key === USERS_STORAGE_KEY) {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  } catch {
    // ignore
  }
}

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyPassword(password, user) {
  if (!user) return false;
  const hash = await hashPassword(password);
  if (user.passwordHash) return user.passwordHash === hash;
  if (user.password) return user.password === password;
  return false;
}

function normalizeEmail(email) {
  return email?.toLowerCase().trim() || '';
}

function normalizePhone(phone) {
  return phone?.replace(/\s/g, '').trim() || '';
}

function getUsers() {
  try {
    const data = storageGet(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  const saved = storageSet(USERS_STORAGE_KEY, JSON.stringify(users));
  if (!saved) {
    throw new Error('Unable to save account data. Please enable browser storage and try again.');
  }
}

function findUserByIdentifier(identifier) {
  const users = getUsers();
  const emailKey = normalizeEmail(identifier);
  const phoneKey = normalizePhone(identifier);

  return users.find((user) => {
    if (user.status && user.status !== 'active') return false;
    if (user.isVerified === false) return false;
    if (user.email === emailKey) return true;
    if (normalizePhone(user.phone) === phoneKey) return true;
    return false;
  });
}

async function buildUserRecord({ fullName, email, phone, password, role, otp }) {
  return {
    id: typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(),
    fullName: fullName.trim(),
    email: normalizeEmail(email),
    phone: phone.trim(),
    passwordHash: await hashPassword(password),
    role,
    status: 'active',
    isVerified: true,
    createdAt: Date.now(),
    otp: role === 'rider' ? (otp || Math.floor(1000 + Math.random() * 9000).toString()) : undefined,
  };
}

async function seedDemoAccounts() {
  if (!isDevelopmentMode()) return;

  const users = getUsers();
  let changed = false;

  for (const demo of DEMO_ACCOUNTS) {
    const exists = users.some((u) => u.email === demo.email);
    if (exists) continue;

    const record = await buildUserRecord(demo);
    users.push(record);
    changed = true;
  }

  if (changed) saveUsers(users);
}

async function migrateLegacyUsers() {
  const users = getUsers();
  let changed = false;

  for (const user of users) {
    if (user.password && !user.passwordHash) {
      user.passwordHash = await hashPassword(user.password);
      delete user.password;
      changed = true;
    }
    if (!user.status) {
      user.status = 'active';
      changed = true;
    }
    if (user.isVerified === undefined) {
      user.isVerified = true;
      changed = true;
    }
    if (user.role === 'rider' && !user.otp) {
      user.otp = user.email === 'demo.customer@nqtaxi.com' ? '5729' : Math.floor(1000 + Math.random() * 9000).toString();
      changed = true;
    }
  }

  if (changed) saveUsers(users);
}

export function initializeAuthService() {
  if (initialized) return;
  initialized = true;
  seedDemoAccounts().catch(() => {});
  migrateLegacyUsers().catch(() => {});
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
    userId: user.id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    expiresAt: Date.now() + SESSION_EXPIRY_MS,
    token: typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${user.id}-${Date.now()}`,
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

  const user = getUsers().find(
    (u) => u.id === session.userId && u.status === 'active',
  );

  if (!user) {
    clearAuthSession();
    return null;
  }

  return { session, user };
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

export function checkDuplicateAccount(email, phone) {
  const users = getUsers();
  const normalizedEmail = normalizeEmail(email);
  const normalizedPhone = phone?.trim();

  if (users.some((u) => u.email === normalizedEmail)) {
    return {
      duplicate: true,
      message: 'An account with this email already exists. Please sign in instead.',
    };
  }
  if (users.some((u) => u.phone === normalizedPhone)) {
    return {
      duplicate: true,
      message: 'An account with this phone number already exists.',
    };
  }
  return { duplicate: false };
}

export async function initiateRegistration(userData) {
  await delay(500);

  const duplicate = checkDuplicateAccount(userData.email, userData.phone);
  if (duplicate.duplicate) {
    return { success: false, error: duplicate.message };
  }

  const session = {
    purpose: 'register',
    email: normalizeEmail(userData.email),
    phone: userData.phone.trim(),
    userData: {
      fullName: userData.fullName.trim(),
      email: normalizeEmail(userData.email),
      phone: userData.phone.trim(),
      password: userData.password,
      role: userData.role,
    },
    createdAt: Date.now(),
    expiresAt: Date.now() + OTP_EXPIRY_MS,
  };

  setOtpSession(session);

  return { success: true, maskedContact: maskEmail(session.email) };
}

export async function initiateLogin(identifier, password) {
  await delay(500);

  const user = findUserByIdentifier(identifier);
  if (!user) {
    return { success: false, error: 'Invalid email or password. Please try again.' };
  }

  if (user.status !== 'active') {
    return { success: false, error: 'Your account is not active. Please contact support.' };
  }

  const validPassword = await verifyPassword(password, user);
  if (!validPassword) {
    return { success: false, error: 'Invalid email or password. Please try again.' };
  }

  createAuthSession(user);

  return { success: true, user };
}

export async function verifyOtp(code) {
  await delay(800);

  const session = getOtpSession();
  if (!session) {
    return { success: false, error: 'Verification session not found. Please start again.' };
  }

  if (Date.now() > session.expiresAt) {
    clearOtpSession();
    return { success: false, error: 'Verification code has expired. Please request a new one.' };
  }

  if (isDevelopmentMode()) {
    const devOtp = getDevOtp();
    if (code !== devOtp) {
      return { success: false, error: 'Invalid verification code. Please check and try again.' };
    }
  } else {
    return {
      success: false,
      error: 'SMS verification is temporarily unavailable. Please try again later.',
    };
  }

  if (session.purpose === 'register') {
    const duplicate = checkDuplicateAccount(session.userData.email, session.userData.phone);
    if (duplicate.duplicate) {
      clearOtpSession();
      return { success: false, error: duplicate.message };
    }

    const newUser = await buildUserRecord(session.userData);
    const users = getUsers();
    users.push(newUser);
    saveUsers(users);

    const savedUser = getUsers().find((u) => u.email === newUser.email);
    if (!savedUser || savedUser.passwordHash !== newUser.passwordHash) {
      return {
        success: false,
        error: 'Account could not be saved. Please enable browser storage and try again.',
      };
    }

    clearOtpSession();
    return { success: true, purpose: 'register', user: savedUser };
  }

  clearOtpSession();
  return { success: false, error: 'Invalid verification session. Please register again.' };
}

export async function resendOtp() {
  await delay(500);

  const session = getOtpSession();
  if (!session) {
    return { success: false, error: 'Verification session not found. Please start again.' };
  }

  session.createdAt = Date.now();
  session.expiresAt = Date.now() + OTP_EXPIRY_MS;
  setOtpSession(session);

  return { success: true };
}
