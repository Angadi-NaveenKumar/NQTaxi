import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Input, Checkbox } from '../../components/ui';
import { User, Mail, Lock, Phone, ShieldCheck, Car, ChevronRight, CheckCircle2 } from 'lucide-react';
import { initiateRegistration } from '../../services/authService';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'rider',
    agreed: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return 0;
    let strength = 0;
    if (p.length > 7) strength += 25;
    if (/[A-Z]/.test(p)) strength += 25;
    if (/[0-9]/.test(p)) strength += 25;
    if (/[^A-Za-z0-9]/.test(p)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const result = await initiateRegistration(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      navigate('/otp-verification');
    } catch {
      setError('Unable to complete registration. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setError('');
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const email = `user.${provider.toLowerCase()}${Math.floor(100 + Math.random() * 900)}@example.com`;
      const phone = `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`;
      
      const newSocialData = {
        fullName: `${provider} User`,
        email: email,
        phone: phone,
        password: `SocialPass@${provider}123`,
        confirmPassword: `SocialPass@${provider}123`,
        role: formData.role,
        agreed: true
      };

      setFormData(newSocialData);

      const result = await initiateRegistration(newSocialData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      navigate('/otp-verification');
    } catch {
      setError(`Unable to complete registration with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary rounded-2xl text-primary-foreground shadow-lg shadow-primary/20">
            <Car size={32} />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight">Create Account</h1>
            <p className="text-text-secondary">Join NQTaxi for a premium mobility experience</p>
          </div>
        </div>

        <Card className="p-8 md:p-10 border-primary/10 shadow-2xl shadow-primary/5">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                icon={User}
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              <Input
                label="Mobile Number"
                icon={Phone}
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <Input
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary ml-1">Join as</label>
                <div className="flex gap-3">
                  {['rider', 'driver'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setFormData({...formData, role: r})}
                      className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                        formData.role === r 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'bg-surface-elevated border-white/5 text-text-secondary'
                      }`}
                    >
                      {r === 'rider' ? 'Customer' : 'Driver'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Input
                  label="Password"
                  icon={Lock}
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <div className="h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      strength <= 25 ? 'bg-error' : strength <= 50 ? 'bg-warning' : strength <= 75 ? 'bg-info' : 'bg-success'
                    }`}
                    style={{ width: `${strength}%` }}
                  />
                </div>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                  Password Strength: {strength <= 25 ? 'Weak' : strength <= 50 ? 'Fair' : strength <= 75 ? 'Good' : 'Strong'}
                </p>
              </div>
              <Input
                label="Confirm Password"
                icon={ShieldCheck}
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                error={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
              />
            </div>

            <div className="pt-2">
              <Checkbox 
                checked={formData.agreed}
                onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
                label={
                  <span className="text-xs">
                    I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </span>
                } 
              />
            </div>

            {error && (
              <p className="text-sm text-error font-medium text-center">{error}</p>
            )}

            <Button 
              type="submit" 
              className="w-full py-4 text-lg" 
              loading={loading}
              disabled={!formData.agreed || strength < 50}
            >
              Create My Account
              <ChevronRight size={20} />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-secondary px-4 text-text-secondary font-semibold">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialRegister('Google')}
              className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-surface-elevated text-sm font-bold text-text-primary hover:bg-surface-elevated/80 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.642 1.09 14.974 0 12 0 7.354 0 3.307 2.68 1.401 6.602l3.865 3.163z"
                />
                <path
                  fill="#34A853"
                  d="M16.04 15.345c-1.077.733-2.43 1.164-4.04 1.164-2.927 0-5.413-1.976-6.297-4.636L1.83 15.03A11.96 11.96 0 0 0 12 24c3.273 0 6.012-1.082 8.016-2.937l-3.976-3.718z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.273c0-.818-.073-1.609-.209-2.373H12v4.582h6.45c-.277 1.482-1.114 2.736-2.373 3.582l3.977 3.718c2.327-2.145 3.436-5.309 3.436-8.927z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.703 11.873a7.127 7.127 0 0 1 0-2.108L1.838 6.602a11.968 11.968 0 0 0 0 10.796l3.865-3.163v-.362z"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialRegister('Apple')}
              className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-surface-elevated text-sm font-bold text-text-primary hover:bg-surface-elevated/80 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z" />
              </svg>
              Apple
            </button>
          </div>
        </Card>

        <div className="text-center space-y-4">
          <p className="text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Sign In Instead
            </Link>
          </p>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
              <CheckCircle2 size={14} className="text-success" />
              Secure Data
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
              <CheckCircle2 size={14} className="text-success" />
              Instant Verification
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
