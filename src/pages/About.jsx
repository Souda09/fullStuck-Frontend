import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Star, Clock, Headphones, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    { icon: Shield, title: 'JWT Authentication', desc: 'Secure role‑based access for customers and admins.' },
    { icon: Zap, title: 'Real‑time Updates', desc: 'Live notifications via Socket.io on ticket status changes.' },
    { icon: Users, title: 'Role Management', desc: 'Separate dashboards for customers and support agents.' },
    { icon: Star, title: 'Customer Ratings', desc: 'Rate resolved tickets with 1‑5 stars and feedback.' },
    { icon: Clock, title: 'Auto Ticket ID', desc: 'Auto‑generated unique ticket IDs for easy tracking.' },
    { icon: Headphones, title: 'AI Assistance', desc: 'AI‑based priority detection and smart suggestions.' },
  ];

  const stats = [
    { value: '1.2K+', label: 'Tickets Resolved' },
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '24/7', label: 'Support Available' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        <div className="relative bg-[var(--bg-secondary)] rounded-3xl shadow-2xl border border-[var(--border-color)] overflow-hidden">
          {/* Premium gradient header bar */}
          <div className="h-2 w-full bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400" />

          <div className="p-6 sm:p-10 lg:p-14">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
            >
              <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-[var(--accent)]/30 shadow-lg">
                <Shield size={36} className="text-[var(--accent)]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
                  About SupportFlow
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                  AI‑assisted customer support desk for modern teams
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base mb-10 max-w-3xl"
            >
              SupportFlow is a modern customer support platform built for the hackathon. 
              It empowers customers to submit tickets, track progress, and rate their support experience, 
              while admins can manage tickets, set priorities, and resolve issues efficiently with real‑time collaboration.
            </motion.p>

            {/* Stats Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="glass-card rounded-2xl p-5 text-center border border-[var(--border-color)] hover:shadow-lg transition-shadow"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-[var(--accent)]">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent)]/50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    <feature.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA & Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[var(--border-color)]"
            >
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <span className="inline-block animate-pulse"></span>
                Built with ❤️ for the hackathon.
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
                >
                  Home <ArrowRight size={16} />
                </Link>
                <a
                  href="#"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:support@supportflow.com"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
                >
                  Email
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;