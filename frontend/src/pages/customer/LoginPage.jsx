import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppStore } from '@store/useAppStore';
import { Button, Card, Input, Checkbox } from '@components/common/ui';
import { User, ShieldCheck, Mail, Lock, Eye, EyeOff, Car } from 'lucide-react';
import { initiateLogin } from '@services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('rider');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setRole: setRoleStore, setAuthenticated } = useAppStore();
  const successMessage = location.state?.message;

  const handleLogin = async (e) => {
    console.log("Login button clicked");
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      console.log('Login attempt with:', { identifier: email, role });
      const result = await initiateLogin(email, password);
      alert("Reached after initiateLogin");

      console.log('Login result:', result);
      console.log("User:", result.user);
      if (!result.success) {
        setError(result.error);
        return;
      }
      const activeRole = result.user?.role || role;
      setRoleStore(activeRole);
      setAuthenticated(true);
      navigate('/home', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to sign in. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo & Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary rounded-2xl text-primary-foreground shadow-lg shadow-primary/20">
            <Car size={32} />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight">Welcome Back</h1>
            <p className="text-text-secondary">Sign in to your premium NQTaxi account</p>
          </div>
        </div>

        <Card className="p-8 space-y-6 border-primary/10 shadow-2xl shadow-primary/5">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'rider', label: 'Customer', icon: User },
              { id: 'driver', label: 'Driver', icon: ShieldCheck },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setRole(item.id)}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all ${
                  role === item.id
                    ? "bg-primary/10 border-primary text-primary font-bold"
                    : "bg-surface-elevated border-white/5 text-text-secondary hover:border-white/20"
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          {successMessage && (
            <div className="space-y-4">
              <p className="text-sm text-success font-medium text-center bg-success/10 border border-success/20 rounded-xl py-3 px-4">
                {successMessage}
              </p>
            </div>
          )}

          {/* /*<div className="p-4 bg-surface-elevated rounded-xl border border-white/5">
            <p className="text-xs font-bold text-text-secondary mb-2">Demo Credentials (Customer)</p>
            <p className="text-sm text-text-primary">Email: demo.customer@nqtaxi.com</p>
            <p className="text-sm text-text-primary">Password: Demo@123</p>
          </div> */}

          <form
  onSubmit={(e) => {
    console.log("FORM SUBMITTED");
    handleLogin(e);
  }}
  className="space-y-5"
>
            <Input
              label="Email or Mobile Number"
              icon={Mail}
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email ? 'This field is required' : ''}
            />

            <Input
              label="Password"
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              error={error && !password ? 'Password is required' : ''}
            />

            <div className="flex items-center justify-between">
              <Checkbox label="Remember me" />
              <Link to="/forgot-password" size="sm" className="text-sm font-bold text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

            {error && email && password && (
              <p className="text-sm text-error font-medium text-center">{error}</p>
            )}

            <Button
  type="button"
  className="w-full py-4 text-lg"
  onClick={handleLogin}
>
  Sign In
</Button>
            
    
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-secondary px-4 text-text-secondary font-bold">Or continue with</span>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="py-3">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 grayscale" />
              Google
            </Button>
            <Button variant="secondary" className="py-3">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z"/></svg>
              Apple
            </Button>
          </div> */}
        </Card>

        <p className="text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
