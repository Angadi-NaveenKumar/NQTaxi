import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Input, Checkbox } from '../components/ui';
import { User, Mail, Lock, Phone, ShieldCheck, Car, ChevronRight, CheckCircle2 } from 'lucide-react';
import { initiateRegistration } from '../services/authService';

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
