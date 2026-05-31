import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import API from '../api/axios.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Axios POST call to backend forgot-password API
      const response = await API.post('/forgot-password', { email });
      setSuccess(response.data.message || 'Password reset link sent to email!');
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40 hover:border-white/20 transition-all duration-300">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.4)] mb-4 mx-auto">
          <Send size={26} />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
          Forgot Password?
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Enter your email to receive a secure reset link
        </p>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl p-3 mb-6 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl p-3 mb-6 text-sm flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-teal-500 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:opacity-95 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:transform-none cursor-pointer"
        >
          {loading ? 'Sending link...' : 'Send Reset Link'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        <Link to="/login" className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold hover:underline">
          <ArrowLeft size={14} /> Back to Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;







