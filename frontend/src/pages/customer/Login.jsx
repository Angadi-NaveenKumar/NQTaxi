// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAppStore } from '../../store/useAppStore';
// import { Button, Card, Checkbox, Input } from '../../components/ui';
// import { Car, Eye, EyeOff, Lock, Mail, MapPin } from 'lucide-react';
// import { initiateLogin } from '../../services/authService';

// const DEMO_CREDENTIALS = {
//   email: 'demo.customer@nqtaxi.com',
//   password: 'Demo@123',
// };

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const { setRole, setAuthenticated, setDriverOtpVerified } = useAppStore();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email.trim() || !password.trim()) {
//       setError('Please enter email and password.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await initiateLogin(email, password);
//       if (result.success) {
//         const userRole = result.user.role;
//         setRole(userRole);
//         setAuthenticated(true);
//         setLoading(false);
//         if (userRole === 'driver') {
//           setDriverOtpVerified(true);
//           navigate('/driver/dashboard', { replace: true });
//         } else if (userRole === 'admin') {
//           navigate('/admin', { replace: true });
//         } else {
//           navigate('/', { replace: true });
//         }
//       } else {
//         setError(result.error);
//         setLoading(false);
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black p-4 text-white md:p-8">
//       <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[28px] bg-[#050505] shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:min-h-[calc(100vh-4rem)] md:grid-cols-[0.95fr_1.05fr]">
//         <section className="relative flex min-h-[360px] flex-col justify-between overflow-hidden bg-[#07111f] p-8 text-white md:p-12">
//           <div className="absolute inset-0 opacity-40">
//             <div className="absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(180deg,transparent,#020712)]" />
//             <div className="absolute bottom-16 left-10 h-32 w-6 rounded-t-full bg-white/10" />
//             <div className="absolute bottom-16 left-24 h-48 w-8 rounded-t-full bg-white/10" />
//             <div className="absolute bottom-16 left-40 h-28 w-7 rounded-t-full bg-white/10" />
//             <div className="absolute bottom-16 right-20 h-44 w-8 rounded-t-full bg-white/10" />
//             <div className="absolute bottom-16 right-36 h-28 w-6 rounded-t-full bg-white/10" />
//           </div>

//           <div className="relative z-10 flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-black">
//               <MapPin size={28} fill="currentColor" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-black leading-none tracking-normal">
//                 NQ<span className="text-primary">TAXI</span>
//               </h1>
//               <p className="mt-1 text-sm text-white/70">Safe Rides, Anytime</p>
//             </div>
//           </div>

//           <div className="relative z-10 max-w-sm">
//             <p className="mb-4 h-1 w-14 rounded-full bg-primary" />
//             <h2 className="text-4xl font-black leading-tight tracking-normal md:text-5xl">
//               Ride Easy.
//               <br />
//               Ride Safe.
//               <br />
//               Ride <span className="text-primary">NQTAXI</span>
//             </h2>
//             <p className="mt-5 text-base leading-7 text-white/75">
//               Book rides instantly, track in real-time and reach your destination safely.
//             </p>
//           </div>

//           <div className="relative z-10">
//             <div className="relative h-32 max-w-md">
//               <div className="absolute bottom-5 left-10 h-16 w-56 rounded-[28px] bg-primary shadow-[0_16px_40px_rgba(245,197,24,0.3)]" />
//               <div className="absolute bottom-16 left-24 h-12 w-28 rounded-t-[28px] bg-primary" />
//               <Car className="absolute bottom-8 left-24 h-20 w-40 text-black" strokeWidth={1.5} />
//               <div className="absolute bottom-2 left-20 h-12 w-12 rounded-full border-8 border-[#07111f] bg-[#111827]" />
//               <div className="absolute bottom-2 left-56 h-12 w-12 rounded-full border-8 border-[#07111f] bg-[#111827]" />
//             </div>
//           </div>
//         </section>

//         <section className="flex items-center justify-center bg-black p-6 md:p-12">
//           <div className="w-full max-w-md">
//             <div className="mb-8">
//               <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-black shadow-[0_14px_30px_rgba(245,197,24,0.35)]">
//                 <MapPin size={30} fill="currentColor" />
//               </div>
//               <h2 className="text-3xl font-black tracking-normal text-white">Welcome Back</h2>
//               <p className="mt-2 text-sm text-white/65">Login to continue to NQTAXI</p>
//             </div>

//             <Card className="border-white/10 bg-[#0f0f0f] p-0 shadow-none">
//               <form onSubmit={handleLogin} className="space-y-5">
//                 <Input
//                   label="Email"
//                   icon={Mail}
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   error={error && !email.trim() ? 'Email is required' : ''}
//                 />

//                 <Input
//                   label="Password"
//                   icon={Lock}
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   suffix={
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((value) => !value)}
//                       className="text-white/60 hover:text-white"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   }
//                   error={error && !password.trim() ? 'Password is required' : ''}
//                 />

//                 <div className="flex items-center justify-between">
//                   <Checkbox label="Remember me" />
//                   {/* <Link to="/forgot-password" className="text-sm font-bold text-primary hover:text-white">
//                     Forgot Password?
//                   </Link> */}
//                   <Link to="/forgot-password?role=customer" className="text-sm font-bold text-primary hover:text-white">
//                     Forgot Password?
//                   </Link>
//                 </div>

//                 {error && email.trim() && password.trim() && (
//                   <p className="rounded-xl bg-danger/10 px-4 py-3 text-center text-sm font-semibold text-danger">
//                     {error}
//                   </p>
//                 )}

//                 <Button type="submit" className="w-full rounded-xl py-4 text-base" loading={loading}>
//                   Login
//                 </Button>
//               </form>
//             </Card>

//             <div className="mt-5 rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white/65">
//               <p className="mb-2 font-bold text-white">Demo credentials</p>
//               <p>
//                 Email:{' '}
//                 <code className="rounded bg-black px-1.5 py-0.5 text-xs font-bold text-primary">
//                   {DEMO_CREDENTIALS.email}
//                 </code>
//               </p>
//               <p className="mt-1">
//                 Password:{' '}
//                 <code className="rounded bg-black px-1.5 py-0.5 text-xs font-bold text-primary">
//                   {DEMO_CREDENTIALS.password}
//                 </code>
//               </p>
//             </div>

//             <p className="mt-8 text-center text-sm text-white/65">
//               New User?{' '}
//               <Link to="/register" className="font-bold text-primary hover:text-white">
//                 Register Here
//               </Link>
//             </p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Button, Card, Checkbox, Input } from '../../components/ui';
import { Car, Eye, EyeOff, Lock, Mail, MapPin } from 'lucide-react';
import { initiateLogin } from '../../services/authService';

const DEMO_CREDENTIALS = {
  email: 'demo.customer@nqtaxi.com',
  password: 'Demo@123',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { 
    setRole, 
    setAuthenticated, 
    setDriverOtpVerified, 
    setDriverProfileCompleted, 
    setDriverDocumentsCompleted,
    setDriverProfile
  } = useAppStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await initiateLogin(email, password);
      if (result.success) {
        const userRole = result.user.role;
        setRole(userRole);
        setAuthenticated(true);
        setLoading(false);
        if (userRole === 'driver') {
          // Generate a default/fallback UPI ID automatically for the driver
          const nameKey = (result.user.fullName || 'Demo Driver').toLowerCase().replace(/[^a-z0-9]/g, '');
          const generatedUpi = `${nameKey}@okaxis`;
          
          setDriverProfile({
            fullName: result.user.fullName || 'Demo Driver',
            email: result.user.email || 'demo.driver@nqtaxi.com',
            phone: result.user.phone || '+91 9000000002',
            upiId: generatedUpi,
          });

          setDriverOtpVerified(true);
          setDriverProfileCompleted(true);
          setDriverDocumentsCompleted(true);
          navigate('/driver/dashboard', { replace: true });
        } else if (userRole === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        setError(result.error);
        setLoading(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const result = await initiateLogin(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
      if (result.success) {
        const userRole = result.user.role;
        setRole(userRole);
        setAuthenticated(true);
        setLoading(false);
        navigate('/', { replace: true });
      } else {
        setError(result.error);
        setLoading(false);
      }
    } catch (err) {
      setError(`Unable to sign in with ${provider}. Please try again.`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 text-white md:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[28px] bg-[#050505] shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:min-h-[calc(100vh-4rem)] md:grid-cols-[0.95fr_1.05fr]">
        <section className="relative flex min-h-[360px] flex-col justify-between overflow-hidden bg-[#07111f] p-8 text-white md:p-12">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(180deg,transparent,#020712)]" />
            <div className="absolute bottom-16 left-10 h-32 w-6 rounded-t-full bg-white/10" />
            <div className="absolute bottom-16 left-24 h-48 w-8 rounded-t-full bg-white/10" />
            <div className="absolute bottom-16 left-40 h-28 w-7 rounded-t-full bg-white/10" />
            <div className="absolute bottom-16 right-20 h-44 w-8 rounded-t-full bg-white/10" />
            <div className="absolute bottom-16 right-36 h-28 w-6 rounded-t-full bg-white/10" />
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-black">
              <MapPin size={28} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-3xl font-black leading-none tracking-normal">
                NQ<span className="text-primary">TAXI</span>
              </h1>
              <p className="mt-1 text-sm text-white/70">Safe Rides, Anytime</p>
            </div>
          </div>

          <div className="relative z-10 max-w-sm">
            <p className="mb-4 h-1 w-14 rounded-full bg-primary" />
            <h2 className="text-4xl font-black leading-tight tracking-normal md:text-5xl">
              Ride Easy.
              <br />
              Ride Safe.
              <br />
              Ride <span className="text-primary">NQTAXI</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              Book rides instantly, track in real-time and reach your destination safely.
            </p>
          </div>

          <div className="relative z-10">
            <div className="relative h-32 max-w-md">
              <div className="absolute bottom-5 left-10 h-16 w-56 rounded-[28px] bg-primary shadow-[0_16px_40px_rgba(245,197,24,0.3)]" />
              <div className="absolute bottom-16 left-24 h-12 w-28 rounded-t-[28px] bg-primary" />
              <Car className="absolute bottom-8 left-24 h-20 w-40 text-black" strokeWidth={1.5} />
              <div className="absolute bottom-2 left-20 h-12 w-12 rounded-full border-8 border-[#07111f] bg-[#111827]" />
              <div className="absolute bottom-2 left-56 h-12 w-12 rounded-full border-8 border-[#07111f] bg-[#111827]" />
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-black p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-black shadow-[0_14px_30px_rgba(245,197,24,0.35)]">
                <MapPin size={30} fill="currentColor" />
              </div>
              <h2 className="text-3xl font-black tracking-normal text-white">Welcome Back</h2>
              <p className="mt-2 text-sm text-white/65">Login to continue to NQTAXI</p>
            </div>

            <Card className="border-white/10 bg-[#0f0f0f] p-0 shadow-none">
              <form onSubmit={handleLogin} className="space-y-5">
                <Input
                  label="Email"
                  icon={Mail}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error && !email.trim() ? 'Email is required' : ''}
                />

                <Input
                  label="Password"
                  icon={Lock}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  error={error && !password.trim() ? 'Password is required' : ''}
                />

                <div className="flex items-center justify-between">
                  <Checkbox label="Remember me" />
                  <Link to="/forgot-password?role=customer" className="text-sm font-bold text-primary hover:text-white">
                    Forgot Password?
                  </Link>
                </div>

                {error && email.trim() && password.trim() && (
                  <p className="rounded-xl bg-danger/10 px-4 py-3 text-center text-sm font-semibold text-danger">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full rounded-xl py-4 text-base" loading={loading}>
                  Login
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0f0f0f] px-4 text-text-secondary font-bold">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSocialLogin('Google')}
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
                  onClick={() => handleSocialLogin('Apple')}
                  className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-surface-elevated text-sm font-bold text-text-primary hover:bg-surface-elevated/80 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z" />
                  </svg>
                  Apple
                </button>
              </div>
            </Card>

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white/65">
              <p className="mb-2 font-bold text-white">Demo credentials</p>
              <p>
                Email:{' '}
                <code className="rounded bg-black px-1.5 py-0.5 text-xs font-bold text-primary">
                  {DEMO_CREDENTIALS.email}
                </code>
              </p>
              <p className="mt-1">
                Password:{' '}
                <code className="rounded bg-black px-1.5 py-0.5 text-xs font-bold text-primary">
                  {DEMO_CREDENTIALS.password}
                </code>
              </p>
            </div>

            <p className="mt-8 text-center text-sm text-white/65">
              New User?{' '}
              <Link to="/register" className="font-bold text-primary hover:text-white">
                Register Here
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}