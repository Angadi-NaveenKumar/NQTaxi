const DEMO_EMAIL = 'admin@example.com';
const DEMO_PASSWORD = 'admin123';

export function mockLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();

      if (
        normalizedEmail === DEMO_EMAIL &&
        password === DEMO_PASSWORD
      ) {
        resolve({
          email: normalizedEmail,
          role: 'admin',
          loggedInAt: new Date().toISOString(),
        });
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 600);
  });
}
