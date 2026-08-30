import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const SUGGESTIONS = [
  'Payment Refund Issue', 'Login Failure', 'Account Suspension', 'Slow Loading',
  'Error Message Displayed', 'Cannot Reset Password', 'Billing Discrepancy', 'Feature Request',
  'Security Concern', 'Performance Issue'
];
const categories = ['Billing', 'Technical', 'General Inquiry', 'Account'];
const priorities = ['Low', 'Medium', 'High'];
const statuses = ['New', 'In Progress', 'Resolved', 'Cancelled'];

const TicketForm = ({ ticket, onSubmit, onClose, isAdmin = false }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'General Inquiry', priority: 'Medium'
  });
  const [status, setStatus] = useState('New');
  const [resolutionNote, setResolutionNote] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState('');

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority || 'Medium',
      });
      setStatus(ticket.status);
      setResolutionNote(ticket.resolutionNote || '');
    }
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setActiveField(name);
    if (name === 'title' || name === 'description') {
      const filtered = SUGGESTIONS.filter(s => s.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered.slice(0, 5));
    } else setSuggestions([]);
  };

  const selectSuggestion = (s) => {
    setFormData({ ...formData, [activeField]: s });
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (ticket) {
      payload.status = status;
      if (status === 'Resolved') {
        if (!resolutionNote) {
          toast.error('Please enter a resolution note');
          return;
        }
        payload.resolutionNote = resolutionNote;
      }
      onSubmit(payload);
    } else {
      onSubmit(payload);
    }
  };

  const isLocked = ticket?.isResolvedPermanently;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-secondary)] rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[var(--border-color)] shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {ticket ? 'Edit Ticket' : 'Create New Ticket'}
          </h2>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="relative">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Title</label>
            <input
              type="text" name="title" value={formData.title} onChange={handleChange} required
              className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
            />
            {activeField === 'title' && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                {suggestions.map((s, idx) => (
                  <li key={idx} className="px-3 py-2 hover:bg-[var(--accent)] hover:text-white cursor-pointer text-sm text-[var(--text-primary)]" onClick={() => selectSuggestion(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Description */}
          <div className="relative">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Description</label>
            <textarea
              name="description" value={formData.description} onChange={handleChange} rows="3" required
              className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
            />
            {activeField === 'description' && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                {suggestions.map((s, idx) => (
                  <li key={idx} className="px-3 py-2 hover:bg-[var(--accent)] hover:text-white cursor-pointer text-sm text-[var(--text-primary)]" onClick={() => selectSuggestion(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange}
                className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={!isAdmin}
                className={`w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none ${!isAdmin ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* ✅ Admin Status & Resolution */}
          {ticket && isAdmin && (
            <>
              {isLocked ? (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2">
                  <CheckCircle size={18} /> This ticket is permanently Resolved / Completed 🔒
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Status</label>
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {status === 'Resolved' && (
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Resolution Note</label>
                      <textarea
                        value={resolutionNote}
                        onChange={e => setResolutionNote(e.target.value)}
                        rows="2"
                        required
                        placeholder="Describe how this issue was resolved..."
                        className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {ticket ? 'Update Ticket' : 'Create Ticket'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};
export default TicketForm;