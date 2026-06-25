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
  const { setRole, setAuthenticated, setDriverOtpVerified } = useAppStore();

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
          setDriverOtpVerified(true);
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