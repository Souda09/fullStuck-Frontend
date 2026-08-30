import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosConfig';
import TicketCard from '../components/TicketCard';
import TicketForm from '../components/TicketForm';
import TicketFilters from '../components/TicketFilters';
import AnalyticsWidgets from '../components/AnalyticsWidgets';
import ThemeToggle from '../components/ThemeToggle';
import { useSocket } from '../hooks/useSocket';
import toast from 'react-hot-toast';
import { LogOut, Plus, LayoutDashboard } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const socket = useSocket();
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    fetchTickets('All');
    fetchStats();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('ticket_updated', (updated) => {
        setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
        fetchStats();
        toast.success(`Ticket ${updated.ticketId} updated`);
      });
      return () => socket.off('ticket_updated');
    }
  }, [socket]);

  const fetchTickets = async (filter) => {
    try {
      const res = await axios.get(`/api/tickets/filter/${filter}`);
      setTickets(res.data.data);
    } catch { toast.error('Failed to load tickets'); } finally { setLoading(false); }
  };

  const fetchStats = async () => {
    try { const res = await axios.get('/api/tickets/stats'); setStats(res.data.data); } catch {}
  };

  const handleFilterChange = (filter) => { setActiveFilter(filter); fetchTickets(filter); };

  // ✅ Admin update – full control
  const handleUpdate = async (data) => {
    try {
      const res = await axios.put(`/api/tickets/${editingTicket._id}`, data);
      setTickets(prev => prev.map(t => t._id === editingTicket._id ? res.data.data : t));
      fetchStats();
      toast.success('Ticket updated successfully!');
      setEditingTicket(null);
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  // ✅ Admin delete – any ticket
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Ticket?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#0D9488',
      confirmButtonText: 'Yes, delete permanently!',
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/tickets/${id}`);
        setTickets(prev => prev.filter(t => t._id !== id));
        fetchStats();
        toast.success('Ticket deleted');
      } catch { toast.error('Delete failed'); }
    }
  };

  // ✅ Open edit modal (check lock)
  const openEdit = (ticket) => {
    if (ticket.isResolvedPermanently) {
      Swal.fire({
        icon: 'info',
        title: '🔒 Permanently Resolved',
        text: 'This ticket is locked and cannot be modified.',
        confirmButtonColor: '#0D9488'
      });
      return;
    }
    setEditingTicket(ticket);
    setShowForm(true);
  };

  if (loading) return <div className="text-center p-8 text-[var(--text-secondary)]">Loading...</div>;

  return (
    <div className="min-h-screen animated-bg p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="text-[var(--accent)]" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Dashboard</h1>
            <p className="text-[var(--text-secondary)]">Manage all support tickets</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Stats Widgets */}
      {stats && <AnalyticsWidgets stats={stats} />}

      {/* Filter Bar */}
      <TicketFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />

      {/* Tickets Grid */}
      {tickets.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-secondary)]">
          <p className="text-xl">No tickets found for this filter.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onEdit={openEdit}
              onDelete={handleDelete}    // ✅ admin delete
              isAdmin={true}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showForm && (
        <TicketForm
          ticket={editingTicket}
          onSubmit={handleUpdate}
          onClose={() => {
            setShowForm(false);
            setEditingTicket(null);
          }}
          isAdmin={true}
        />
      )}
    </div>
  );
};
export default AdminDashboard;