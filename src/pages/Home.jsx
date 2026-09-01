import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Ticket, 
  Shield, 
  Zap, 
  Star, 
  Users, 
  MessageSquare, 
  ArrowRight,
  CheckCircle,
  Clock
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Ticket,
      title: 'Smart Ticketing',
      desc: 'Create and manage support tickets with auto‑generated IDs and AI‑based priority detection.',
      color: 'text-teal-400',
    },
    {
      icon: Shield,
      title: 'Role‑Based Access',
      desc: 'Secure JWT authentication with separate dashboards for customers and admins.',
      color: 'text-blue-400',
    },
    {
      icon: Zap,
      title: 'Real‑time Updates',
      desc: 'Instant notifications via Socket.io when ticket status changes – no refresh needed.',
      color: 'text-yellow-400',
    },
    {
      icon: Star,
      title: 'Customer Ratings',
      desc: 'Rate your support experience with 1‑5 stars and leave feedback on resolved tickets.',
      color: 'text-purple-400',
    },
    {
      icon: Users,
      title: 'Admin Dashboard',
      desc: 'Full control over all tickets – filter, set priority, resolve, and view analytics.',
      color: 'text-pink-400',
    },
    {
      icon: MessageSquare,
      title: 'AI Suggestions',
      desc: 'Get smart suggestions while creating tickets to speed up the process.',
      color: 'text-indigo-400',
    },
  ];

  const stats = [
    { label: 'Tickets Resolved', value: '1.2K', icon: CheckCircle },
    { label: 'Happy Customers', value: '850+', icon: Users },
    { label: 'Average Rating', value: '4.8 ★', icon: Star },
    { label: 'Response Time', value: '< 2 hrs', icon: Clock },
  ];

  return (
    <div className="min-h-screen animated-bg">   {/* ✅ Same bg as Login/Signup */}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            >
              <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                SupportFlow
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
            >
              AI‑assisted customer support desk – seamless ticket management with real‑time collaboration.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              {user ? (
                <Link
                  to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-teal-500/30 transition-all duration-300 hover:scale-105"
                >
                  Go to Dashboard <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-xl shadow-lg hover:shadow-teal-500/30 transition-all duration-300 hover:scale-105"
                  >
                    Get Started <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] font-semibold rounded-xl hover:border-[var(--accent)] transition-all duration-300 hover:scale-105"
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex justify-center">
                    <Icon className="w-8 h-8 text-[var(--accent)]" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">Powerful Features</h2>
            <p className="mt-2 text-[var(--text-secondary)] max-w-2xl mx-auto">
              Everything you need to manage customer support efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="glass-card rounded-2xl p-6 border border-[var(--border-color)] hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300"
                >
                  <div className={`p-3 rounded-xl inline-block bg-[var(--bg-primary)] ${feature.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">{feature.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-10 border border-[var(--border-color)] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)]"
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">Ready to transform support?</h2>
            <p className="mt-2 text-[var(--text-secondary)] max-w-xl mx-auto">
              Join hundreds of teams using SupportFlow to deliver exceptional customer service.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {user ? (
                <Link
                  to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-xl shadow-lg hover:shadow-teal-500/30 transition-all duration-300 hover:scale-105"
                >
                  Go to Dashboard <ArrowRight size={18} />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-xl shadow-lg hover:shadow-teal-500/30 transition-all duration-300 hover:scale-105"
                >
                  Get Started Free <ArrowRight size={18} />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;