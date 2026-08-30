import React from 'react';
import { motion } from 'framer-motion';

const filters = ['All', 'High', 'Medium', 'Low', 'New', 'In Progress', 'Resolved', 'Cancelled'];

const TicketFilters = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <motion.button
          key={filter}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
            activeFilter === filter
              ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]'
          }`}
        >
          {filter}
        </motion.button>
      ))}
    </div>
  );
};
export default TicketFilters;