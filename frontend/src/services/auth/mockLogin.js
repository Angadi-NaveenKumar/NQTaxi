
export async function mockLogin(email, password) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (email === 'admin@example.com' && password === 'admin123') {
    return {
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin'
      },
      token: 'mock-jwt-token'
    };
  }
  
  throw new Error('Invalid credentials');
}
