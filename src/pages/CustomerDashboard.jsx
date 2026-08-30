import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosConfig';
import TicketCard from '../components/TicketCard';
import TicketForm from '../components/TicketForm';
import ThemeToggle from '../components/ThemeToggle';
import { useSocket } from '../hooks/useSocket';
import toast from 'react-hot-toast';
import { Plus, LogOut } from 'lucide-react';
import Swal from 'sweetalert2';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const socket = useSocket();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('ticket_updated', (updated) => {
        setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
        toast.success(`Ticket ${updated.ticketId} updated`);
      });
      return () => socket.off('ticket_updated');
    }
  }, [socket]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('/api/tickets');
      setTickets(res.data.data);
    } catch (err) { toast.error('Failed to load tickets'); } finally { setLoading(false); }
  };

  const handleCreate = async (data) => {
    try {
      const res = await axios.post('/api/tickets', data);
      setTickets([res.data.data, ...tickets]);
      toast.success('Ticket created!');
      setShowForm(false);
    } catch { toast.error('Creation failed'); }
  };

  const handleUpdate = async (data) => {
    try {
      const res = await axios.put(`/api/tickets/${editingTicket._id}`, data);
      setTickets(prev => prev.map(t => t._id === editingTicket._id ? res.data.data : t));
      toast.success('Ticket updated!');
      setEditingTicket(null); setShowForm(false);
    } catch { toast.error('Update failed'); }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Ticket?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0D9488',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/tickets/${id}`);
        setTickets(prev => prev.filter(t => t._id !== id));
        toast.success('Deleted');
      } catch { toast.error('Delete failed'); }
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-bold text-[var(--text-primary)]">Welcome, {user?.name} 👋</h1><p className="text-[var(--text-secondary)]">Manage your tickets</p></div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition">
            <Plus size={18} /> New Ticket
          </button>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition">
            <LogOut size={18} />
          </button>
        </div>
      </div>
      {tickets.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-secondary)]"><p className="text-xl">No tickets yet.</p><p className="text-sm">Click "New Ticket" to create one.</p></div>
      ) : (
        <div className="grid gap-4">{tickets.map(t => <TicketCard key={t._id} ticket={t} onEdit={setEditingTicket} onDelete={handleDelete} isAdmin={false} />)}</div>
      )}
      {showForm && <TicketForm ticket={editingTicket} onSubmit={editingTicket ? handleUpdate : handleCreate} onClose={() => { setShowForm(false); setEditingTicket(null); }} />}
    </div>
  );
};
export default CustomerDashboard;