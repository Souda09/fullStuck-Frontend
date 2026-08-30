import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, CheckCircle, Clock, AlertTriangle, Star } from 'lucide-react';

const AnalyticsWidgets = ({ stats }) => {
  const items = [
    { label: 'Total', value: stats?.total || 0, icon: Ticket, color: 'text-blue-400' },
    { label: 'Resolved', value: stats?.resolved || 0, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Pending', value: stats?.pending || 0, icon: Clock, color: 'text-yellow-400' },
    { label: 'High Priority', value: stats?.highPriority || 0, icon: AlertTriangle, color: 'text-red-400' },
    { label: 'Avg Rating', value: stats?.averageRating ? stats.averageRating.toFixed(1) : '—', icon: Star, color: 'text-yellow-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card rounded-2xl p-4 border bg-gradient-to-br from-[var(--bg-secondary)]/50 to-transparent transition-all hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">{item.label}</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{item.value}</p>
            </div>
            <div className={`p-2 rounded-full bg-[var(--bg-primary)]/50 backdrop-blur-sm ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
export default AnalyticsWidgets;