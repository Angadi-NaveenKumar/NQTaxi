import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@components/common/ui';
import { ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import {
  getOtpSession,
  maskEmail,
  verifyOtp,
  resendOtp,
  isDevelopmentMode,
  getDevOtp,
} from '@services/authService';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [maskedContact, setMaskedContact] = useState('***');
  const inputs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const session = getOtpSession();
    if (!session || session.purpose !== 'register') {
      navigate('/login', {
        replace: true,
        state: { message: null },
      });
      return;
    }
    setMaskedContact(maskEmail(session.email));
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    console.log('OTP verification attempt with code:', code);
    if (code.length < 6) return;

    setLoading(true);
    setError('');
    try {
      const result = await verifyOtp(code);
      console.log('OTP verification result:', result);
      if (!result.success) {
        setError(result.error);
        return;
      }

      navigate('/login', {
        replace: true,
        state: {
          message: 'Account created successfully! Please sign in with your credentials.',
        },
      });
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('Verification failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    setError('');
    try {
      const result = await resendOtp();
      if (!result.success) {
        setError(result.error);
        return;
      }
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } catch {
      setError('Unable to resend code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Login</span>
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-4 bg-info/10 text-info rounded-2xl mb-4">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Verify Identity</h1>
          <p className="text-text-secondary">
            We sent a 6-digit code to <span className="text-text-primary font-bold">{maskedContact}</span>.
            Enter it below to finish sign-up.
          </p>
        </div>

        <Card className="p-8 space-y-8 border-primary/10">
          <div className="flex justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 bg-surface-elevated border border-white/5 rounded-xl text-center text-2xl font-black text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-error font-medium text-center">{error}</p>
          )}

          <div className="space-y-4">
            <Button 
              className="w-full py-4 text-lg" 
              onClick={handleVerify}
              loading={loading}
              disabled={otp.some(d => !d)}
            >
              Verify Code
            </Button>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-text-secondary">
                  Resend code in <span className="text-primary font-bold">{timer}s</span>
                </p>
              ) : (
                <button 
                  onClick={handleResend}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  <RefreshCw size={14} />
                  Resend Code Now
                </button>
              )}
            </div>
          </div>
        </Card>

        {isDevelopmentMode() && (
          <div className="bg-info/10 p-4 rounded-xl border border-info/20 text-center">
            <p className="text-xs text-text-secondary">
              Development mode: use OTP <span className="text-info font-bold">{getDevOtp()}</span>
            </p>
            <p className="mt-2 text-[11px] text-text-secondary">
              If you registered from the API directly, the backend also returns the OTP in the response body.
            </p>
          </div>
        )}

        <div className="bg-surface-secondary/50 p-4 rounded-xl border border-white/5 flex items-center gap-3">
          <div className="p-2 bg-warning/10 text-warning rounded-lg">
            <ShieldCheck size={20} />
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Protect your account. Never share your verification code with anyone, including NQTaxi staff.
          </p>
        </div>
      </div>
    </div>
  );
}
