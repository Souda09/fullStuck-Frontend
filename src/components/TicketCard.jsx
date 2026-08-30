import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle, CheckCircle, Star, User, Trash2, Edit } from 'lucide-react';
import axios from '../api/axiosConfig';
import toast from 'react-hot-toast';

const statusColors = {
  New: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'In Progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Resolved: 'bg-green-500/20 text-green-300 border-green-500/30',
  Cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const TicketCard = ({ ticket, onEdit, onDelete, isAdmin }) => {
  const { ticketId, title, description, status, priority, category, createdAt, customer, rating, feedback, isResolvedPermanently } = ticket;
  const [ratingValue, setRatingValue] = useState(rating || 0);
  const [feedbackText, setFeedbackText] = useState(feedback || '');
  const [submitted, setSubmitted] = useState(!!rating);

  const handleRatingSubmit = async () => {
    if (ratingValue === 0) return toast.error('Please select a rating');
    try {
      await axios.post(`/api/tickets/${ticket._id}/rating`, { rating: ratingValue, feedback: feedbackText });
      toast.success('Thank you for your feedback! ⭐');
      setSubmitted(true);
    } catch (err) {
      toast.error('Failed to submit rating');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, type: 'spring' }}
      className="glass-card rounded-2xl p-4 transition-all hover:shadow-lg hover:shadow-teal-500/10"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-[var(--text-primary)] line-clamp-1">{title}</h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">{description}</p>
        </div>
        <span className="text-xs font-mono bg-[var(--bg-primary)] px-2 py-0.5 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]">{ticketId}</span>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${statusColors[status]}`}>
          {status}
          {isResolvedPermanently && ' 🔒'}
        </span>
        <span className={`flex items-center gap-0.5 text-xs font-medium ${priority === 'High' ? 'text-red-400' : priority === 'Medium' ? 'text-yellow-400' : 'text-gray-400'}`}>
          <AlertCircle size={14} /> {priority}
        </span>
        <span className="text-xs bg-[var(--bg-primary)] px-2 py-0.5 rounded-full text-[var(--text-secondary)] border border-[var(--border-color)]">{category}</span>
        <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1 ml-auto">
          <Calendar size={12} /> {new Date(createdAt).toLocaleDateString('en-GB')}
        </span>
      </div>

      {/* Customer (admin view) */}
      {isAdmin && customer && (
        <div className="mt-2 flex items-center gap-1 text-xs text-[var(--text-secondary)] bg-[var(--bg-primary)] p-1 rounded-lg">
          <User size={12} /> <span className="font-medium">{customer.name}</span> ({customer.email})
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-[var(--border-color)]">
        {/* ✅ Edit – for admin or customer */}
        <button
          onClick={() => onEdit(ticket)}
          className="flex items-center gap-1 text-xs bg-[var(--accent)] text-white px-3 py-1 rounded-full hover:bg-[var(--accent-hover)] transition shadow-sm"
        >
          <Edit size={12} /> {isAdmin ? 'Manage' : 'Edit'}
        </button>

        {/* ✅ Admin Delete */}
        {isAdmin && (
          <button
            onClick={() => onDelete(ticket._id)}
            className="flex items-center gap-1 text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full hover:bg-red-500/30 transition"
          >
            <Trash2 size={12} /> Delete
          </button>
        )}

        {/* Customer Delete (if allowed) */}
        {!isAdmin && (status === 'New' || status === 'Cancelled') && (
          <button
            onClick={() => onDelete(ticket._id)}
            className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full hover:bg-red-500/30 transition"
          >
            Delete
          </button>
        )}
      </div>

      {/* ✅ Rating – Only for customer when ticket is Resolved and not rated yet */}
      {!isAdmin && status === 'Resolved' && !submitted && (
        <div className="mt-3 p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)]">
          <p className="text-sm font-medium text-[var(--text-secondary)]">How was your support experience? Rate us:</p>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRatingValue(star)} className="focus:outline-none transition-transform hover:scale-110">
                <Star size={24} className={star <= ratingValue ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'} />
              </button>
            ))}
          </div>
          <textarea
            placeholder="Additional feedback (optional)"
            value={feedbackText}
            onChange={e => setFeedbackText(e.target.value)}
            className="w-full p-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
            rows="2"
          />
          <button
            onClick={handleRatingSubmit}
            className="mt-2 bg-[var(--accent)] text-white px-4 py-1.5 rounded-lg text-sm hover:bg-[var(--accent-hover)] transition"
          >
            Submit Rating ⭐
          </button>
        </div>
      )}
      {submitted && (
        <div className="mt-3 text-sm text-green-400 flex items-center gap-1">
          <CheckCircle size={16} /> Rated {ratingValue} ★ {feedback && `- "${feedback}"`}
        </div>
      )}
    </motion.div>
  );
};
export default TicketCard;