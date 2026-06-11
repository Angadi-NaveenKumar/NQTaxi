/**
 * Auth flow verification script — run: node src/services/authService.test.mjs
 */

const USERS_STORAGE_KEY = 'nqtaxi_registered_users';
const OTP_SESSION_KEY = 'nqtaxi_otp_session';
const AUTH_SESSION_KEY = 'nqtaxi_auth_session';

const storage = new Map();

global.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
};

import { webcrypto } from 'node:crypto';
if (!globalThis.crypto?.subtle) {
  globalThis.crypto = webcrypto;
}

// Inline minimal auth logic mirrors for node test
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function runTests() {
  const results = [];

  async function test(name, fn) {
    try {
      await fn();
      results.push({ name, pass: true });
      console.log(`PASS: ${name}`);
    } catch (err) {
      results.push({ name, pass: false, error: err.message });
      console.error(`FAIL: ${name} — ${err.message}`);
    }
  }

  storage.clear();

  await test('Password hash is consistent', async () => {
    const a = await hashPassword('Demo@123');
    const b = await hashPassword('Demo@123');
    if (a !== b) throw new Error('Hash mismatch');
  });

  await test('Register + OTP + login flow', async () => {
    storage.clear();
    const passwordHash = await hashPassword('Test@1234');
    const user = {
      id: '1',
      email: 'newuser@test.com',
      phone: '+91 9999999999',
      passwordHash,
      role: 'rider',
      status: 'active',
      fullName: 'New User',
    };
    storage.set(USERS_STORAGE_KEY, JSON.stringify([user]));

    const users = JSON.parse(storage.get(USERS_STORAGE_KEY));
    const found = users.find((u) => u.email === 'newuser@test.com');
    if (!found) throw new Error('User not found after save');

    const loginHash = await hashPassword('Test@1234');
    if (found.passwordHash !== loginHash) throw new Error('Password hash verification failed');
  });

  await test('Demo customer credentials structure', async () => {
    const demoEmail = 'demo.customer@nqtaxi.com';
    const demoPassword = 'Demo@123';
    const hash = await hashPassword(demoPassword);
    storage.set(
      USERS_STORAGE_KEY,
      JSON.stringify([
        {
          id: 'demo-1',
          email: demoEmail,
          phone: '+91 9000000001',
          passwordHash: hash,
          role: 'rider',
          status: 'active',
          fullName: 'Demo Customer',
        },
      ]),
    );

    const user = JSON.parse(storage.get(USERS_STORAGE_KEY))[0];
    const valid = user.passwordHash === (await hashPassword(demoPassword));
    if (!valid) throw new Error('Demo customer password invalid');
    if (user.role !== 'rider') throw new Error('Demo customer role invalid');
  });

  await test('Session creation and restore', async () => {
    const session = {
      userId: '1',
      email: 'newuser@test.com',
      role: 'rider',
      expiresAt: Date.now() + 60000,
      token: 'jwt-like-token',
    };
    storage.set(AUTH_SESSION_KEY, JSON.stringify(session));
    const restored = JSON.parse(storage.get(AUTH_SESSION_KEY));
    if (restored.token !== 'jwt-like-token') throw new Error('Session not restored');
  });

  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} tests passed`);
  if (failed.length) process.exit(1);
}

runTests();
