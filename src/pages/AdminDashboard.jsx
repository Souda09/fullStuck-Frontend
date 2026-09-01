// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../context/AuthContext';
// // import axios from '../api/axiosConfig';
// // import TicketCard from '../components/TicketCard';
// // import TicketForm from '../components/TicketForm';
// // import TicketFilters from '../components/TicketFilters';
// // import AnalyticsWidgets from '../components/AnalyticsWidgets';
// // import ThemeToggle from '../components/ThemeToggle';
// // import { useSocket } from '../hooks/useSocket';
// // import toast from 'react-hot-toast';
// // import { LogOut, Plus, LayoutDashboard } from 'lucide-react';
// // import Swal from 'sweetalert2';

// // const AdminDashboard = () => {
// //   const { user, logout } = useAuth();
// //   const socket = useSocket();
// //   const [tickets, setTickets] = useState([]);
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [activeFilter, setActiveFilter] = useState('All');
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingTicket, setEditingTicket] = useState(null);

// //   useEffect(() => {
// //     fetchTickets('All');
// //     fetchStats();
// //   }, []);

// //   useEffect(() => {
// //     if (socket) {
// //       socket.on('ticket_updated', (updated) => {
// //         setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
// //         fetchStats();
// //         toast.success(`Ticket ${updated.ticketId} updated`);
// //       });
// //       return () => socket.off('ticket_updated');
// //     }
// //   }, [socket]);

// //   const fetchTickets = async (filter) => {
// //     try {
// //       const res = await axios.get(`/api/tickets/filter/${filter}`);
// //       setTickets(res.data.data);
// //     } catch { toast.error('Failed to load tickets'); } finally { setLoading(false); }
// //   };

// //   const fetchStats = async () => {
// //     try { const res = await axios.get('/api/tickets/stats'); setStats(res.data.data); } catch {}
// //   };

// //   const handleFilterChange = (filter) => { setActiveFilter(filter); fetchTickets(filter); };

// //   // ✅ Admin update – full control
// //   const handleUpdate = async (data) => {
// //     try {
// //       const res = await axios.put(`/api/tickets/${editingTicket._id}`, data);
// //       setTickets(prev => prev.map(t => t._id === editingTicket._id ? res.data.data : t));
// //       fetchStats();
// //       toast.success('Ticket updated successfully!');
// //       setEditingTicket(null);
// //       setShowForm(false);
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || 'Update failed');
// //     }
// //   };

// //   // ✅ Admin delete – any ticket
// //   const handleDelete = async (id) => {
// //     const result = await Swal.fire({
// //       title: 'Delete Ticket?',
// //       text: 'This action cannot be undone.',
// //       icon: 'warning',
// //       showCancelButton: true,
// //       confirmButtonColor: '#d33',
// //       cancelButtonColor: '#0D9488',
// //       confirmButtonText: 'Yes, delete permanently!',
// //     });
// //     if (result.isConfirmed) {
// //       try {
// //         await axios.delete(`/api/tickets/${id}`);
// //         setTickets(prev => prev.filter(t => t._id !== id));
// //         fetchStats();
// //         toast.success('Ticket deleted');
// //       } catch { toast.error('Delete failed'); }
// //     }
// //   };

// //   // ✅ Open edit modal (check lock)
// //   const openEdit = (ticket) => {
// //     if (ticket.isResolvedPermanently) {
// //       Swal.fire({
// //         icon: 'info',
// //         title: '🔒 Permanently Resolved',
// //         text: 'This ticket is locked and cannot be modified.',
// //         confirmButtonColor: '#0D9488'
// //       });
// //       return;
// //     }
// //     setEditingTicket(ticket);
// //     setShowForm(true);
// //   };

// //   if (loading) return <div className="text-center p-8 text-[var(--text-secondary)]">Loading...</div>;

// //   return (
// //     <div className="min-h-screen animated-bg p-6">
// //       {/* Header */}
// //       <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
// //         <div className="flex items-center gap-3">
// //           <LayoutDashboard className="text-[var(--accent)]" size={28} />
// //           <div>
// //             <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Dashboard</h1>
// //             <p className="text-[var(--text-secondary)]">Manage all support tickets</p>
// //           </div>
// //         </div>
// //         <div className="flex items-center gap-3">
// //           <ThemeToggle />
// //           <button
// //             onClick={logout}
// //             className="flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition"
// //           >
// //             <LogOut size={18} /> Logout
// //           </button>
// //         </div>
// //       </div>

// //       {/* Stats Widgets */}
// //       {stats && <AnalyticsWidgets stats={stats} />}

// //       {/* Filter Bar */}
// //       <TicketFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />

// //       {/* Tickets Grid */}
// //       {tickets.length === 0 ? (
// //         <div className="text-center py-16 text-[var(--text-secondary)]">
// //           <p className="text-xl">No tickets found for this filter.</p>
// //         </div>
// //       ) : (
// //         <div className="grid gap-4">
// //           {tickets.map((ticket) => (
// //             <TicketCard
// //               key={ticket._id}
// //               ticket={ticket}
// //               onEdit={openEdit}
// //               onDelete={handleDelete}    // ✅ admin delete
// //               isAdmin={true}
// //             />
// //           ))}
// //         </div>
// //       )}

// //       {/* Edit Modal */}
// //       {showForm && (
// //         <TicketForm
// //           ticket={editingTicket}
// //           onSubmit={handleUpdate}
// //           onClose={() => {
// //             setShowForm(false);
// //             setEditingTicket(null);
// //           }}
// //           isAdmin={true}
// //         />
// //       )}
// //     </div>
// //   );
// // };
// // export default AdminDashboard;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import axios from '../api/axiosConfig';
// import TicketForm from '../components/TicketForm';
// import TicketFilters from '../components/TicketFilters';
// import AnalyticsWidgets from '../components/AnalyticsWidgets';
// import { useSocket } from '../hooks/useSocket';
// import toast from 'react-hot-toast';
// import { motion } from 'framer-motion';
// import { LayoutDashboard, Eye, Edit, Trash2, Calendar, User, Ticket } from 'lucide-react';
// import Swal from 'sweetalert2';

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const socket = useSocket();
//   const [tickets, setTickets] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [showForm, setShowForm] = useState(false);
//   const [editingTicket, setEditingTicket] = useState(null);

//   useEffect(() => {
//     fetchTickets('All');
//     fetchStats();
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.on('ticket_updated', (updated) => {
//         setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
//         fetchStats();
//         toast.success(`Ticket ${updated.ticketId} updated`);
//       });
//       return () => socket.off('ticket_updated');
//     }
//   }, [socket]);

//   const fetchTickets = async (filter) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/tickets/filter/${filter}`);
//       setTickets(res.data.data);
//     } catch (err) {
//       toast.error('Failed to load tickets');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get('/api/tickets/stats');
//       setStats(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleFilterChange = (filter) => {
//     setActiveFilter(filter);
//     fetchTickets(filter);
//   };

//   const handleUpdate = async (data) => {
//     try {
//       const res = await axios.put(`/api/tickets/${editingTicket._id}`, data);
//       setTickets(prev => prev.map(t => t._id === editingTicket._id ? res.data.data : t));
//       fetchStats();
//       toast.success('Ticket updated successfully!');
//       setEditingTicket(null);
//       setShowForm(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Update failed');
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: 'Delete Ticket?',
//       text: 'This action cannot be undone.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#0D9488',
//       confirmButtonText: 'Yes, delete permanently!',
//     });
//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`/api/tickets/${id}`);
//         setTickets(prev => prev.filter(t => t._id !== id));
//         fetchStats();
//         toast.success('Ticket deleted');
//       } catch (err) {
//         toast.error('Delete failed');
//       }
//     }
//   };

//   const openEdit = (ticket) => {
//     if (ticket.isResolvedPermanently) {
//       Swal.fire({
//         icon: 'info',
//         title: '🔒 Permanently Resolved',
//         text: 'This ticket is locked and cannot be modified.',
//         confirmButtonColor: '#0D9488'
//       });
//       return;
//     }
//     setEditingTicket(ticket);
//     setShowForm(true);
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       New: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
//       'In Progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
//       Resolved: 'bg-green-500/20 text-green-300 border-green-500/30',
//       Cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
//     };
//     return colors[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
//   };

//   if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

//   return (
//     <div className="min-h-screen animated-bg p-4 md:p-6">

//       {/* Header – Only Dashboard Title, No ThemeToggle/Logout */}
//       <div className="flex items-center gap-3 mb-6">
//         <div className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
//           <LayoutDashboard size={28} />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Dashboard</h1>
//           <p className="text-sm text-[var(--text-secondary)]">Manage all support tickets</p>
//         </div>
//       </div>

//       {/* Stats Widgets */}
//       {stats && <AnalyticsWidgets stats={stats} />}

//       {/* Filter Bar */}
//       <TicketFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />

//       {/* Tickets Table */}
//       {tickets.length === 0 ? (
//         <div className="text-center py-16 text-[var(--text-secondary)]">
//           <Ticket size={48} className="mx-auto opacity-20 mb-4" />
//           <p className="text-xl">No tickets found for this filter.</p>
//         </div>
//       ) : (
//         <div className="glass-card rounded-2xl border border-[var(--border-color)] overflow-x-auto">
//           <div className="min-w-[900px]">
//             {/* Table Headers */}
//             <div className="grid grid-cols-7 gap-3 p-4 bg-[var(--bg-primary)] border-b border-[var(--border-color)] font-semibold text-sm text-[var(--text-secondary)]">
//               <div>Ticket #</div>
//               <div>Title</div>
//               <div>Customer</div>
//               <div>Priority</div>
//               <div>Status</div>
//               <div>Created</div>
//               <div className="text-center">Actions</div>
//             </div>

//             {/* Table Rows */}
//             {tickets.map((ticket, idx) => (
//               <motion.div
//                 key={ticket._id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.03 }}
//                 className="grid grid-cols-7 gap-3 p-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-primary)]/50 transition-colors items-center"
//               >
//                 <div className="font-mono text-sm text-[var(--text-primary)]">
//                   {ticket.ticketId}
//                 </div>
//                 <div className="text-sm text-[var(--text-primary)] truncate">
//                   {ticket.title}
//                 </div>
//                 <div className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
//                   <User size={14} />
//                   <span className="truncate">{ticket.customer?.name || 'N/A'}</span>
//                 </div>
//                 <div>
//                   <span className={`text-xs font-bold ${
//                     ticket.priority === 'High' ? 'text-red-400' :
//                     ticket.priority === 'Medium' ? 'text-yellow-400' :
//                     'text-gray-400'
//                   }`}>
//                     {ticket.priority}
//                   </span>
//                 </div>
//                 <div>
//                   <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(ticket.status)}`}>
//                     {ticket.status}
//                     {ticket.isResolvedPermanently && ' 🔒'}
//                   </span>
//                 </div>
//                 <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
//                   <Calendar size={12} />
//                   {new Date(ticket.createdAt).toLocaleDateString('en-GB', {
//                     day: '2-digit', month: 'short'
//                   })}
//                 </div>
//                 <div className="flex items-center justify-center gap-1 sm:gap-2">
//                   <button
//                     onClick={() => openEdit(ticket)}
//                     className="p-1.5 sm:p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
//                     title="View/Edit"
//                   >
//                     <Eye size={16} />
//                   </button>
//                   <button
//                     onClick={() => openEdit(ticket)}
//                     className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200"
//                     title="Edit"
//                   >
//                     <Edit size={16} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(ticket._id)}
//                     className="p-1.5 sm:p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
//                     title="Delete"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {showForm && (
//         <TicketForm
//           ticket={editingTicket}
//           onSubmit={handleUpdate}
//           onClose={() => {
//             setShowForm(false);
//             setEditingTicket(null);
//           }}
//           isAdmin={true}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosConfig';
import TicketForm from '../components/TicketForm';
import TicketFilters from '../components/TicketFilters';
import AnalyticsWidgets from '../components/AnalyticsWidgets';
import { useSocket } from '../hooks/useSocket';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { LayoutDashboard, Eye, Edit, Trash2, Calendar, User, Ticket, Star } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const { user } = useAuth();
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
      setLoading(true);
      const res = await axios.get(`/api/tickets/filter/${filter}`);
      setTickets(res.data.data);
    } catch (err) {
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/tickets/stats');
      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    fetchTickets(filter);
  };

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
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

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

  const getStatusColor = (status) => {
    const colors = {
      New: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'In Progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      Resolved: 'bg-green-500/20 text-green-300 border-green-500/30',
      Cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="min-h-screen animated-bg p-4 md:p-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
          <LayoutDashboard size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Dashboard</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage all support tickets</p>
        </div>
      </div>

      {/* Stats Widgets */}
      {stats && <AnalyticsWidgets stats={stats} />}

      {/* Filter Bar */}
      <TicketFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />

      {/* Tickets Table */}
      {tickets.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-secondary)]">
          <Ticket size={48} className="mx-auto opacity-20 mb-4" />
          <p className="text-xl">No tickets found for this filter.</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl border border-[var(--border-color)] overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Table Headers – ✅ Now 8 Columns (including Rating) */}
            <div className="grid grid-cols-8 gap-3 p-4 bg-[var(--bg-primary)] border-b border-[var(--border-color)] font-semibold text-sm text-[var(--text-secondary)]">
              <div>Ticket #</div>
              <div>Title</div>
              <div>Customer</div>
              <div>Priority</div>
              <div>Status</div>
              <div className="text-center">Rating</div>   {/* ✅ New Rating Column */}
              <div>Created</div>
              <div className="text-center">Actions</div>
            </div>

            {/* Table Rows – ✅ Now 8 Columns */}
            {tickets.map((ticket, idx) => (
              <motion.div
                key={ticket._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="grid grid-cols-8 gap-3 p-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-primary)]/50 transition-colors items-center"
              >
                {/* Ticket # */}
                <div className="font-mono text-sm text-[var(--text-primary)]">
                  {ticket.ticketId}
                </div>

                {/* Title */}
                <div className="text-sm text-[var(--text-primary)] truncate">
                  {ticket.title}
                </div>

                {/* Customer */}
                <div className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                  <User size={14} />
                  <span className="truncate">{ticket.customer?.name || 'N/A'}</span>
                </div>

                {/* Priority */}
                <div>
                  <span className={`text-xs font-bold ${
                    ticket.priority === 'High' ? 'text-red-400' :
                    ticket.priority === 'Medium' ? 'text-yellow-400' :
                    'text-gray-400'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                    {ticket.isResolvedPermanently && ' 🔒'}
                  </span>
                </div>

                {/* ✅ Rating – Star Icons */}
                <div className="text-center text-sm text-yellow-400">
                  {ticket.rating ? '⭐'.repeat(ticket.rating) : '—'}
                </div>

                {/* Created */}
                <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(ticket.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short'
                  })}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <button
                    onClick={() => openEdit(ticket)}
                    className="p-1.5 sm:p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
                    title="View/Edit"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => openEdit(ticket)}
                    className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    className="p-1.5 sm:p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
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