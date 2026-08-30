// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { User, Mail, Lock, Shield, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
// import API from '../api/axios.js'; // Hamara custom Axios instance setup

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user'); // Default role 'user' hai
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       // 🚀 AXIOS CALL: Pure, neat aur clear single line registration post API call
//       const response = await API.post('/register', { name, email, password, role });
      
//       // Axios response body data fetch karna
//       const data = response.data;

//       setSuccess('Account created successfully! Redirecting to login...');
//       console.log('📝 [AUTH SYSTEM] New Account Registered Successfully:', data.user);
      
//       // Signup successful hone par 2 seconds ke baad automatically user ko login page par redirect karna
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);

//     } catch (err) {
//       // Axios ke standard backend error messages ko read karna
//       const errMsg = err.response?.data?.message || err.message || 'Registration failed';
//       setError(errMsg);
//       console.error('❌ Registration Error:', errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40 hover:border-white/20 transition-all duration-300">
//       <div className="text-center mb-8">
//         <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.4)] mb-4 mx-auto animate-bounce">
//           <UserPlus size={26} />
//         </div>
//         <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
//           Create Account
//         </h2>
//         <p className="text-sm text-slate-400 mt-1">
//           Register as a standard User or Admin
//         </p>
//       </div>

//       {error && (
//         <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl p-3 mb-6 text-sm flex items-center gap-2">
//           <AlertCircle size={16} />
//           <span>{error}</span>
//         </div>
//       )}

//       {success && (
//         <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl p-3 mb-6 text-sm flex items-center gap-2">
//           <CheckCircle2 size={16} />
//           <span>{success}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Full Name Field */}
//         <div className="space-y-2">
//           <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
//             <User size={12} /> Full Name
//           </label>
//           <div className="relative">
//             <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input
//               type="text"
//               placeholder="John Doe"
//               className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         {/* Email Address Field */}
//         <div className="space-y-2">
//           <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
//             <Mail size={12} /> Email Address
//           </label>
//           <div className="relative">
//             <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input
//               type="email"
//               placeholder="john@example.com"
//               className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         {/* Password Field */}
//         <div className="space-y-2">
//           <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
//             <Lock size={12} /> Password
//           </label>
//           <div className="relative">
//             <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input
//               type="password"
//               placeholder="••••••••"
//               className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         {/* Choose System Role */}
//         <div className="space-y-2">
//           <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
//             <Shield size={12} /> Choose Role
//           </label>
//           <div className="relative">
//             <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 appearance-none cursor-pointer"
//             >
//               <option value="user" className="bg-slate-900 text-white">👤 User (Standard Access)</option>
//               <option value="admin" className="bg-slate-900 text-white">🛡️ Admin (Dashboard Control)</option>
//             </select>
//             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
//               ▼
//             </div>
//           </div>
//         </div>

//         {/* Submit Register Form */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-gradient-to-r from-indigo-500 to-teal-500 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:opacity-95 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:transform-none cursor-pointer"
//         >
//           {loading ? 'Creating Account...' : 'Sign Up'}
//         </button>
//       </form>

//       <p className="text-center text-sm text-slate-400 mt-6">
//         Already have an account?{' '}
//         <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline">
//           Login here
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ThemeToggle from '../components/ThemeToggle';

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      login(res.data.user, res.data.token);
      navigate('/customer/dashboard');
      toast.success('Account created!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      <div className="bg-[var(--bg-secondary)] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[var(--border-color)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">SupportFlow</h1>
          <ThemeToggle />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
            className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
            className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
          <input type="password" placeholder="Password (min 6)" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required minLength="6"
            className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none" />
          <button type="submit" className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-3 rounded-lg transition">Sign Up</button>
        </form>
        <p className="text-center mt-4 text-[var(--text-secondary)] text-sm">Already have an account? <Link to="/login" className="text-[var(--accent)] hover:underline">Login</Link></p>
      </div>
    </div>
  );
};
export default Signup;