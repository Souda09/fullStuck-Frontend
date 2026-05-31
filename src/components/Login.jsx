import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Session management context
import API from '../api/axios'; // Hamara custom Axios setup

const Login = () => {
  const { login: saveSession } = useContext(AuthContext); // Session save function
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 🚀 AXIOS CALL
      const response = await API.post('/login', { email, password });
      
      const data = response.data;

      // 1. Context aur LocalStorage mein save karein
      saveSession(data.user, data.token);

      // 2. 🔴 Inspect Console (F12) mein detail se credentials display karna
      console.log('%c🔑 [AUTH SYSTEM] Login Successful!', 'color: #00ff88; font-weight: bold; font-size: 14px;');
      console.log(`👤 User Name: ${data.user.name}`);
      console.log(`📧 Email Address: ${data.user.email}`);
      console.log(`🛡️ Assigned Role: ${data.user.role.toUpperCase()}`);
      console.log('💾 Tokens & User Data successfully saved in LocalStorage.');

      // 3. Admin ya User role ke mutabiq automatic redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Login failed';
      setError(errMsg);
      console.error('❌ Login Error:', errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40 hover:border-white/20 transition-all duration-300 mx-4">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.4)] mb-4 mx-auto animate-pulse">
          <LogIn size={26} />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Login to access your secure dashboard
        </p>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl p-3 mb-6 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Address Field */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Mail size={12} /> Email Address
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Lock size={12} /> Password
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 pl-11 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-teal-500 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:opacity-95 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:transform-none cursor-pointer"
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        Don't have an account?{' '}
        <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;