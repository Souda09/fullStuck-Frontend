// // // import React, { useState, useEffect } from 'react';
// // // import { useAuth } from '../context/AuthContext';
// // // import axios from '../api/axiosConfig';
// // // import TicketCard from '../components/TicketCard';
// // // import TicketForm from '../components/TicketForm';
// // // import ThemeToggle from '../components/ThemeToggle';
// // // import { useSocket } from '../hooks/useSocket';
// // // import toast from 'react-hot-toast';
// // // import { Plus, LogOut } from 'lucide-react';
// // // import Swal from 'sweetalert2';

// // // const CustomerDashboard = () => {
// // //   const { user, logout } = useAuth();
// // //   const socket = useSocket();
// // //   const [tickets, setTickets] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [showForm, setShowForm] = useState(false);
// // //   const [editingTicket, setEditingTicket] = useState(null);

// // //   useEffect(() => {
// // //     fetchTickets();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (socket) {
// // //       socket.on('ticket_updated', (updated) => {
// // //         setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
// // //         toast.success(`Ticket ${updated.ticketId} updated`);
// // //       });
// // //       return () => socket.off('ticket_updated');
// // //     }
// // //   }, [socket]);

// // //   const fetchTickets = async () => {
// // //     try {
// // //       const res = await axios.get('/api/tickets');
// // //       setTickets(res.data.data);
// // //     } catch (err) { toast.error('Failed to load tickets'); } finally { setLoading(false); }
// // //   };

// // //   const handleCreate = async (data) => {
// // //     try {
// // //       const res = await axios.post('/api/tickets', data);
// // //       setTickets([res.data.data, ...tickets]);
// // //       toast.success('Ticket created!');
// // //       setShowForm(false);
// // //     } catch { toast.error('Creation failed'); }
// // //   };

// // //   const handleUpdate = async (data) => {
// // //     try {
// // //       const res = await axios.put(`/api/tickets/${editingTicket._id}`, data);
// // //       setTickets(prev => prev.map(t => t._id === editingTicket._id ? res.data.data : t));
// // //       toast.success('Ticket updated!');
// // //       setEditingTicket(null); setShowForm(false);
// // //     } catch { toast.error('Update failed'); }
// // //   };

// // //   const handleDelete = async (id) => {
// // //     const result = await Swal.fire({
// // //       title: 'Delete Ticket?',
// // //       text: 'This action cannot be undone.',
// // //       icon: 'warning',
// // //       showCancelButton: true,
// // //       confirmButtonColor: '#0D9488',
// // //       cancelButtonColor: '#d33',
// // //       confirmButtonText: 'Yes, delete it!',
// // //     });
// // //     if (result.isConfirmed) {
// // //       try {
// // //         await axios.delete(`/api/tickets/${id}`);
// // //         setTickets(prev => prev.filter(t => t._id !== id));
// // //         toast.success('Deleted');
// // //       } catch { toast.error('Delete failed'); }
// // //     }
// // //   };

// // //   if (loading) return <div className="text-center p-8">Loading...</div>;

// // //   return (
// // //     <div className="min-h-screen animated-bg p-6">
// // //       <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
// // //         <div><h1 className="text-2xl font-bold text-[var(--text-primary)]">Welcome, {user?.name} 👋</h1><p className="text-[var(--text-secondary)]">Manage your tickets</p></div>
// // //         <div className="flex items-center gap-3">
// // //           <ThemeToggle />
// // //           <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition">
// // //             <Plus size={18} /> New Ticket
// // //           </button>
// // //           <button onClick={logout} className="flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition">
// // //             <LogOut size={18} />
// // //           </button>
// // //         </div>
// // //       </div>
// // //       {tickets.length === 0 ? (
// // //         <div className="text-center py-16 text-[var(--text-secondary)]"><p className="text-xl">No tickets yet.</p><p className="text-sm">Click "New Ticket" to create one.</p></div>
// // //       ) : (
// // //         <div className="grid gap-4">{tickets.map(t => <TicketCard key={t._id} ticket={t} onEdit={setEditingTicket} onDelete={handleDelete} isAdmin={false} />)}</div>
// // //       )}
// // //       {showForm && <TicketForm ticket={editingTicket} onSubmit={editingTicket ? handleUpdate : handleCreate} onClose={() => { setShowForm(false); setEditingTicket(null); }} />}
// // //     </div>
// // //   );
// // // };
// // // export default CustomerDashboard;

// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../context/AuthContext';
// // import axios from '../api/axiosConfig';
// // import TicketForm from '../components/TicketForm';
// // import { useSocket } from '../hooks/useSocket';
// // import toast from 'react-hot-toast';
// // import { motion } from 'framer-motion';
// // import { 
// //   Plus, Ticket, Clock, CheckCircle, XCircle, 
// //   Eye, ArrowLeft, Calendar, Edit, Trash2, 
// //   AlertCircle, Tag 
// // } from 'lucide-react';
// // import Swal from 'sweetalert2';
// // import { useNavigate, useParams } from 'react-router-dom';

// // // ========== TICKET DETAIL VIEW ==========
// // const TicketDetail = ({ ticket, onBack, onEdit, onDelete }) => {
// //   if (!ticket) return <div className="text-center py-8">Ticket not found</div>;

// //   const statusColors = {
// //     New: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
// //     'In Progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
// //     Resolved: 'bg-green-500/20 text-green-300 border-green-500/30',
// //     Cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
// //   };

// //   const priorityColors = {
// //     High: 'text-red-400',
// //     Medium: 'text-yellow-400',
// //     Low: 'text-gray-400',
// //   };

// //   const isLocked = ticket.isResolvedPermanently;

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       className="glass-card rounded-2xl p-6 border border-[var(--border-color)]"
// //     >
// //       <button
// //         onClick={onBack}
// //         className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-4 transition"
// //       >
// //         <ArrowLeft size={18} /> Back to Dashboard
// //       </button>

// //       <div className="space-y-4">
// //         <div className="flex flex-wrap items-start justify-between gap-4">
// //           <div>
// //             <h2 className="text-2xl font-bold text-[var(--text-primary)]">{ticket.title}</h2>
// //             <p className="text-sm font-mono text-[var(--text-secondary)]">{ticket.ticketId}</p>
// //           </div>
// //           <div className="flex flex-wrap gap-2">
// //             <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusColors[ticket.status]}`}>
// //               {ticket.status}
// //               {isLocked && ' 🔒'}
// //             </span>
// //             <span className={`px-3 py-1 text-xs font-bold rounded-full border bg-[var(--bg-primary)] border-[var(--border-color)] ${priorityColors[ticket.priority]}`}>
// //               {ticket.priority}
// //             </span>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// //           <div className="flex items-center gap-2 text-[var(--text-secondary)]">
// //             <Tag size={16} className="text-[var(--accent)]" />
// //             Category: <span className="text-[var(--text-primary)] font-medium">{ticket.category}</span>
// //           </div>
// //           <div className="flex items-center gap-2 text-[var(--text-secondary)]">
// //             <Calendar size={16} className="text-[var(--accent)]" />
// //             Created: <span className="text-[var(--text-primary)] font-medium">
// //               {new Date(ticket.createdAt).toLocaleDateString('en-GB', { 
// //                 day: '2-digit', month: 'short', year: 'numeric', 
// //                 hour: '2-digit', minute: '2-digit' 
// //               })}
// //             </span>
// //           </div>
// //         </div>

// //         <div className="border-t border-[var(--border-color)] pt-4">
// //           <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Description</h4>
// //           <p className="text-[var(--text-primary)] whitespace-pre-wrap">{ticket.description}</p>
// //         </div>

// //         {ticket.resolutionNote && (
// //           <div className="border-t border-[var(--border-color)] pt-4">
// //             <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Resolution Note</h4>
// //             <p className="text-[var(--text-primary)] whitespace-pre-wrap">{ticket.resolutionNote}</p>
// //           </div>
// //         )}

// //         {ticket.aiSummary && (
// //           <div className="border-t border-[var(--border-color)] pt-4">
// //             <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">🤖 AI Summary</h4>
// //             <p className="text-sm text-[var(--text-secondary)]">{ticket.aiSummary}</p>
// //           </div>
// //         )}

// //         {ticket.rating && (
// //           <div className="border-t border-[var(--border-color)] pt-4">
// //             <h4 className="text-sm font-semibold text-yellow-400 mb-2">⭐ Your Rating</h4>
// //             <div className="flex items-center gap-2">
// //               <span className="text-xl">{'⭐'.repeat(ticket.rating)}</span>
// //               <span className="text-sm text-[var(--text-secondary)]">({ticket.rating}/5)</span>
// //             </div>
// //             {ticket.feedback && (
// //               <p className="text-sm text-[var(--text-secondary)] mt-1">"{ticket.feedback}"</p>
// //             )}
// //           </div>
// //         )}

// //         <div className="border-t border-[var(--border-color)] pt-4 flex flex-wrap gap-3">
// //           <button
// //             onClick={() => onEdit(ticket)}
// //             disabled={isLocked}
// //             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
// //               isLocked 
// //                 ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' 
// //                 : 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-lg hover:shadow-teal-500/20'
// //             }`}
// //           >
// //             <Edit size={16} /> Edit Ticket
// //           </button>

// //           {(ticket.status === 'New' || ticket.status === 'Cancelled') && (
// //             <button
// //               onClick={() => onDelete(ticket._id)}
// //               className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-sm font-medium transition-all border border-red-500/20"
// //             >
// //               <Trash2 size={16} /> Delete Ticket
// //             </button>
// //           )}

// //           {isLocked && (
// //             <span className="flex items-center gap-2 px-4 py-2 text-sm text-green-400 bg-green-500/10 rounded-lg border border-green-500/20">
// //               <CheckCircle size={16} /> This ticket is permanently resolved
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // // ========== MAIN CUSTOMER DASHBOARD ==========
// // const CustomerDashboard = () => {
// //   const { user } = useAuth();
// //   const navigate = useNavigate();
// //   const { ticketId } = useParams();
// //   const socket = useSocket();
// //   const [tickets, setTickets] = useState([]);
// //   const [selectedTicket, setSelectedTicket] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingTicket, setEditingTicket] = useState(null);
// //   const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, cancelled: 0 });

// //   useEffect(() => {
// //     fetchTickets();
// //   }, []);

// //   useEffect(() => {
// //     if (socket) {
// //       socket.on('ticket_updated', (updated) => {
// //         setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
// //         toast.success(`Ticket ${updated.ticketId} updated`);
// //         if (selectedTicket && selectedTicket._id === updated._id) {
// //           setSelectedTicket(updated);
// //         }
// //       });
// //       return () => socket.off('ticket_updated');
// //     }
// //   }, [socket, selectedTicket]);

// //   const fetchTickets = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.get('/api/tickets');
// //       const data = res.data.data || [];
// //       setTickets(data);
// //       calculateStats(data);
// //       if (ticketId) {
// //         const found = data.find(t => t._id === ticketId);
// //         if (found) setSelectedTicket(found);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setError(err.message || 'Failed to load tickets');
// //       toast.error('Failed to load tickets');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const calculateStats = (tickets) => {
// //     const total = tickets.length;
// //     const pending = tickets.filter(t => t.status === 'New' || t.status === 'In Progress').length;
// //     const resolved = tickets.filter(t => t.status === 'Resolved').length;
// //     const cancelled = tickets.filter(t => t.status === 'Cancelled').length;
// //     setStats({ total, pending, resolved, cancelled });
// //   };

// //   const handleCreate = async (data) => {
// //     try {
// //       const res = await axios.post('/api/tickets', data);
// //       setTickets([res.data.data, ...tickets]);
// //       calculateStats([res.data.data, ...tickets]);
// //       toast.success('Ticket created!');
// //       setShowForm(false);
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || 'Creation failed');
// //     }
// //   };

// //   const handleUpdate = async (data) => {
// //     try {
// //       const res = await axios.put(`/api/tickets/${editingTicket._id}`, data);
// //       const updated = res.data.data;
// //       setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
// //       calculateStats(tickets.map(t => t._id === updated._id ? updated : t));
// //       toast.success('Ticket updated!');
// //       setEditingTicket(null);
// //       setShowForm(false);
// //       if (selectedTicket && selectedTicket._id === updated._id) {
// //         setSelectedTicket(updated);
// //       }
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || 'Update failed');
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     const result = await Swal.fire({
// //       title: 'Delete Ticket?',
// //       text: 'This action cannot be undone.',
// //       icon: 'warning',
// //       showCancelButton: true,
// //       confirmButtonColor: '#0D9488',
// //       cancelButtonColor: '#d33',
// //       confirmButtonText: 'Yes, delete it!',
// //     });
// //     if (result.isConfirmed) {
// //       try {
// //         await axios.delete(`/api/tickets/${id}`);
// //         const updatedTickets = tickets.filter(t => t._id !== id);
// //         setTickets(updatedTickets);
// //         calculateStats(updatedTickets);
// //         toast.success('Ticket deleted');
// //         if (selectedTicket && selectedTicket._id === id) {
// //           setSelectedTicket(null);
// //           navigate('/customer/dashboard');
// //         }
// //       } catch (err) {
// //         toast.error('Delete failed');
// //       }
// //     }
// //   };

// //   const handleViewTicket = (ticket) => {
// //     setSelectedTicket(ticket);
// //     navigate(`/customer/ticket/${ticket._id}`);
// //   };

// //   const handleBack = () => {
// //     setSelectedTicket(null);
// //     navigate('/customer/dashboard');
// //   };

// //   const openEditForm = (ticket) => {
// //     if (ticket.isResolvedPermanently) {
// //       toast.error('This ticket is permanently resolved and cannot be edited');
// //       return;
// //     }
// //     setEditingTicket(ticket);
// //     setShowForm(true);
// //   };

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center p-6">
// //         <div className="glass-card rounded-2xl p-8 text-center max-w-md">
// //           <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
// //           <h2 className="text-xl font-bold text-red-400">Error Loading Dashboard</h2>
// //           <p className="text-[var(--text-secondary)] mt-2">{error}</p>
// //           <button 
// //             onClick={() => window.location.reload()}
// //             className="mt-4 px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)]"
// //           >
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

// //   const statsCards = [
// //     { label: 'Total', value: stats.total, icon: Ticket, color: 'text-blue-400', bg: 'bg-blue-500/10' },
// //     { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
// //     { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
// //     { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
// //   ];

// //   // Detail view
// //   if (selectedTicket) {
// //     return (
// //       <div className="min-h-screen bg-[var(--bg-primary)] p-4 md:p-6">
// //         <div className="max-w-4xl mx-auto">
// //           <TicketDetail 
// //             ticket={selectedTicket} 
// //             onBack={handleBack} 
// //             onEdit={openEditForm}
// //             onDelete={handleDelete}
// //           />
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[var(--bg-primary)] p-4 md:p-6">
// //       <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
// //         <div>
// //           <h1 className="text-2xl font-bold text-[var(--text-primary)]">
// //             Welcome back, {user?.name || 'User'} 👋
// //           </h1>
// //           <p className="text-[var(--text-secondary)]">Manage your support tickets</p>
// //         </div>
// //         <button
// //           onClick={() => setShowForm(true)}
// //           className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-teal-500/20"
// //         >
// //           <Plus size={18} /> New Ticket
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// //         {statsCards.map((stat, idx) => (
// //           <motion.div
// //             key={idx}
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: idx * 0.05 }}
// //             className="glass-card rounded-2xl p-4 border border-[var(--border-color)] transition-all hover:scale-105"
// //           >
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">{stat.label}</p>
// //                 <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
// //               </div>
// //               <div className={`p-2 rounded-full ${stat.bg}`}>
// //                 <stat.icon className={`w-5 h-5 ${stat.color}`} />
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>

// //       {tickets.length === 0 ? (
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           className="text-center py-16 text-[var(--text-secondary)]"
// //         >
// //           <Ticket size={48} className="mx-auto opacity-20 mb-4" />
// //           <p className="text-xl">No tickets yet.</p>
// //           <p className="text-sm">Click "New Ticket" to create your first one.</p>
// //         </motion.div>
// //       ) : (
// //         <div className="glass-card rounded-2xl border border-[var(--border-color)] overflow-x-auto">
// //           {/* Table – responsive design */}
// //           <div className="min-w-[700px]">
// //             {/* Header */}
// //             <div className="grid grid-cols-5 gap-2 p-4 bg-[var(--bg-primary)] border-b border-[var(--border-color)] font-semibold text-sm text-[var(--text-secondary)]">
// //               <div>Ticket #</div>
// //               <div>Title</div>
// //               <div>Priority</div>
// //               <div>Status</div>
// //               <div className="text-center">Actions</div>
// //             </div>

// //             {/* Rows */}
// //             {tickets.map((ticket, idx) => {
// //               const isLocked = ticket.isResolvedPermanently;
// //               const canEdit = !isLocked;
// //               const canDelete = (ticket.status === 'New' || ticket.status === 'Cancelled');

// //               return (
// //                 <motion.div
// //                   key={ticket._id}
// //                   initial={{ opacity: 0, x: -20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   transition={{ delay: idx * 0.03 }}
// //                   className="grid grid-cols-5 gap-2 p-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-primary)]/50 transition-colors items-center"
// //                 >
// //                   <div className="font-mono text-sm text-[var(--text-primary)]">{ticket.ticketId}</div>
// //                   <div className="text-sm text-[var(--text-primary)] truncate">{ticket.title}</div>
// //                   <div>
// //                     <span className={`text-xs font-bold ${
// //                       ticket.priority === 'High' ? 'text-red-400' :
// //                       ticket.priority === 'Medium' ? 'text-yellow-400' :
// //                       'text-gray-400'
// //                     }`}>
// //                       {ticket.priority}
// //                     </span>
// //                   </div>
// //                   <div>
// //                     <span className={`text-xs px-2 py-1 rounded-full border ${
// //                       ticket.status === 'New' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
// //                       ticket.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
// //                       ticket.status === 'Resolved' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
// //                       'bg-red-500/20 text-red-300 border-red-500/30'
// //                     }`}>
// //                       {ticket.status}
// //                       {isLocked && ' 🔒'}
// //                     </span>
// //                   </div>
// //                   {/* Actions */}
// //                   <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
// //                     {/* View */}
// //                     <button
// //                       onClick={() => handleViewTicket(ticket)}
// //                       className="p-1.5 sm:p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
// //                       title="View Details"
// //                     >
// //                       <Eye size={16} className="sm:w-4 sm:h-4" />
// //                     </button>

// //                     {/* Edit – only if not locked */}
// //                     {canEdit && (
// //                       <button
// //                         onClick={() => openEditForm(ticket)}
// //                         className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200"
// //                         title="Edit Ticket"
// //                       >
// //                         <Edit size={16} className="sm:w-4 sm:h-4" />
// //                       </button>
// //                     )}

// //                     {/* Delete – only if New or Cancelled */}
// //                     {canDelete && (
// //                       <button
// //                         onClick={() => handleDelete(ticket._id)}
// //                         className="p-1.5 sm:p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
// //                         title="Delete Ticket"
// //                       >
// //                         <Trash2 size={16} className="sm:w-4 sm:h-4" />
// //                       </button>
// //                     )}
// //                   </div>
// //                 </motion.div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       )}

// //       {showForm && (
// //         <TicketForm
// //           ticket={editingTicket}
// //           onSubmit={editingTicket ? handleUpdate : handleCreate}
// //           onClose={() => {
// //             setShowForm(false);
// //             setEditingTicket(null);
// //           }}
// //           isAdmin={false}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default CustomerDashboard;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import axios from '../api/axiosConfig';
// import TicketForm from '../components/TicketForm';
// import { useSocket } from '../hooks/useSocket';
// import toast from 'react-hot-toast';
// import { motion } from 'framer-motion';
// import { 
//   Plus, Ticket, Clock, CheckCircle, XCircle, 
//   Eye, ArrowLeft, Calendar, Edit, Trash2, 
//   AlertCircle, Tag 
// } from 'lucide-react';
// import Swal from 'sweetalert2';
// import { useNavigate, useParams } from 'react-router-dom';

// // ========== TICKET DETAIL VIEW ==========
// const TicketDetail = ({ ticket, onBack, onEdit, onDelete }) => {
//   if (!ticket) return <div className="text-center py-8">Ticket not found</div>;

//   const statusColors = {
//     New: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
//     'In Progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
//     Resolved: 'bg-green-500/20 text-green-300 border-green-500/30',
//     Cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
//   };

//   const priorityColors = {
//     High: 'text-red-400',
//     Medium: 'text-yellow-400',
//     Low: 'text-gray-400',
//   };

//   const isLocked = ticket.isResolvedPermanently;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="glass-card rounded-2xl p-6 border border-[var(--border-color)]"
//     >
//       <button
//         onClick={onBack}
//         className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-4 transition"
//       >
//         <ArrowLeft size={18} /> Back to Dashboard
//       </button>

//       <div className="space-y-4">
//         <div className="flex flex-wrap items-start justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-[var(--text-primary)]">{ticket.title}</h2>
//             <p className="text-sm font-mono text-[var(--text-secondary)]">{ticket.ticketId}</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusColors[ticket.status]}`}>
//               {ticket.status}
//               {isLocked && ' 🔒'}
//             </span>
//             <span className={`px-3 py-1 text-xs font-bold rounded-full border bg-[var(--bg-primary)] border-[var(--border-color)] ${priorityColors[ticket.priority]}`}>
//               {ticket.priority}
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           <div className="flex items-center gap-2 text-[var(--text-secondary)]">
//             <Tag size={16} className="text-[var(--accent)]" />
//             Category: <span className="text-[var(--text-primary)] font-medium">{ticket.category}</span>
//           </div>
//           <div className="flex items-center gap-2 text-[var(--text-secondary)]">
//             <Calendar size={16} className="text-[var(--accent)]" />
//             Created: <span className="text-[var(--text-primary)] font-medium">
//               {new Date(ticket.createdAt).toLocaleDateString('en-GB', { 
//                 day: '2-digit', month: 'short', year: 'numeric', 
//                 hour: '2-digit', minute: '2-digit' 
//               })}
//             </span>
//           </div>
//         </div>

//         <div className="border-t border-[var(--border-color)] pt-4">
//           <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Description</h4>
//           <p className="text-[var(--text-primary)] whitespace-pre-wrap">{ticket.description}</p>
//         </div>

//         {ticket.resolutionNote && (
//           <div className="border-t border-[var(--border-color)] pt-4">
//             <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Resolution Note</h4>
//             <p className="text-[var(--text-primary)] whitespace-pre-wrap">{ticket.resolutionNote}</p>
//           </div>
//         )}

//         {ticket.aiSummary && (
//           <div className="border-t border-[var(--border-color)] pt-4">
//             <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">🤖 AI Summary</h4>
//             <p className="text-sm text-[var(--text-secondary)]">{ticket.aiSummary}</p>
//           </div>
//         )}

//         {ticket.rating && (
//           <div className="border-t border-[var(--border-color)] pt-4">
//             <h4 className="text-sm font-semibold text-yellow-400 mb-2">⭐ Your Rating</h4>
//             <div className="flex items-center gap-2">
//               <span className="text-xl">{'⭐'.repeat(ticket.rating)}</span>
//               <span className="text-sm text-[var(--text-secondary)]">({ticket.rating}/5)</span>
//             </div>
//             {ticket.feedback && (
//               <p className="text-sm text-[var(--text-secondary)] mt-1">"{ticket.feedback}"</p>
//             )}
//           </div>
//         )}

//         <div className="border-t border-[var(--border-color)] pt-4 flex flex-wrap gap-3">
//           <button
//             onClick={() => onEdit(ticket)}
//             disabled={isLocked}
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//               isLocked 
//                 ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' 
//                 : 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-lg hover:shadow-teal-500/20'
//             }`}
//           >
//             <Edit size={16} /> Edit Ticket
//           </button>

//           {(ticket.status === 'New' || ticket.status === 'Cancelled') && (
//             <button
//               onClick={() => onDelete(ticket._id)}
//               className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-sm font-medium transition-all border border-red-500/20"
//             >
//               <Trash2 size={16} /> Delete Ticket
//             </button>
//           )}

//           {isLocked && (
//             <span className="flex items-center gap-2 px-4 py-2 text-sm text-green-400 bg-green-500/10 rounded-lg border border-green-500/20">
//               <CheckCircle size={16} /> This ticket is permanently resolved
//             </span>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== MAIN CUSTOMER DASHBOARD ==========
// const CustomerDashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { ticketId } = useParams();
//   const socket = useSocket();
//   const [tickets, setTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [editingTicket, setEditingTicket] = useState(null);
//   const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, cancelled: 0 });

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.on('ticket_updated', (updated) => {
//         setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
//         toast.success(`Ticket ${updated.ticketId} updated`);
//         if (selectedTicket && selectedTicket._id === updated._id) {
//           setSelectedTicket(updated);
//         }
//       });
//       return () => socket.off('ticket_updated');
//     }
//   }, [socket, selectedTicket]);

//   const fetchTickets = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/tickets');
//       const data = res.data.data || [];
//       setTickets(data);
//       calculateStats(data);
//       if (ticketId) {
//         const found = data.find(t => t._id === ticketId);
//         if (found) setSelectedTicket(found);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.message || 'Failed to load tickets');
//       toast.error('Failed to load tickets');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateStats = (tickets) => {
//     const total = tickets.length;
//     const pending = tickets.filter(t => t.status === 'New' || t.status === 'In Progress').length;
//     const resolved = tickets.filter(t => t.status === 'Resolved').length;
//     const cancelled = tickets.filter(t => t.status === 'Cancelled').length;
//     setStats({ total, pending, resolved, cancelled });
//   };

//   const handleCreate = async (data) => {
//     try {
//       const res = await axios.post('/api/tickets', data);
//       setTickets([res.data.data, ...tickets]);
//       calculateStats([res.data.data, ...tickets]);
//       toast.success('Ticket created!');
//       setShowForm(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Creation failed');
//     }
//   };

//   const handleUpdate = async (data) => {
//     try {
//       const res = await axios.put(`/api/tickets/${editingTicket._id}`, data);
//       const updated = res.data.data;
//       setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
//       calculateStats(tickets.map(t => t._id === updated._id ? updated : t));
//       toast.success('Ticket updated!');
//       setEditingTicket(null);
//       setShowForm(false);
//       if (selectedTicket && selectedTicket._id === updated._id) {
//         setSelectedTicket(updated);
//       }
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
//       confirmButtonColor: '#0D9488',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     });
//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`/api/tickets/${id}`);
//         const updatedTickets = tickets.filter(t => t._id !== id);
//         setTickets(updatedTickets);
//         calculateStats(updatedTickets);
//         toast.success('Ticket deleted');
//         if (selectedTicket && selectedTicket._id === id) {
//           setSelectedTicket(null);
//           navigate('/customer/dashboard');
//         }
//       } catch (err) {
//         toast.error('Delete failed');
//       }
//     }
//   };

//   const handleViewTicket = (ticket) => {
//     setSelectedTicket(ticket);
//     navigate(`/customer/ticket/${ticket._id}`);
//   };

//   const handleBack = () => {
//     setSelectedTicket(null);
//     navigate('/customer/dashboard');
//   };

//   const openEditForm = (ticket) => {
//     if (ticket.isResolvedPermanently) {
//       toast.error('This ticket is permanently resolved and cannot be edited');
//       return;
//     }
//     setEditingTicket(ticket);
//     setShowForm(true);
//   };

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-6">
//         <div className="glass-card rounded-2xl p-8 text-center max-w-md">
//           <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
//           <h2 className="text-xl font-bold text-red-400">Error Loading Dashboard</h2>
//           <p className="text-[var(--text-secondary)] mt-2">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)]"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

//   const statsCards = [
//     { label: 'Total', value: stats.total, icon: Ticket, color: 'text-blue-400', bg: 'bg-blue-500/10' },
//     { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
//     { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
//     { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
//   ];

//   // Detail view
//   if (selectedTicket) {
//     return (
//       <div className="min-h-screen animated-bg p-4 md:p-6">   {/* ✅ Changed to animated-bg */}
//         <div className="max-w-4xl mx-auto">
//           <TicketDetail 
//             ticket={selectedTicket} 
//             onBack={handleBack} 
//             onEdit={openEditForm}
//             onDelete={handleDelete}
//           />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen animated-bg p-4 md:p-6">   {/* ✅ Changed to animated-bg */}
//       <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-[var(--text-primary)]">
//             Welcome back, {user?.name || 'User'} 👋
//           </h1>
//           <p className="text-[var(--text-secondary)]">Manage your support tickets</p>
//         </div>
//         <button
//           onClick={() => setShowForm(true)}
//           className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-teal-500/20"
//         >
//           <Plus size={18} /> New Ticket
//         </button>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         {statsCards.map((stat, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.05 }}
//             className="glass-card rounded-2xl p-4 border border-[var(--border-color)] transition-all hover:scale-105"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">{stat.label}</p>
//                 <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
//               </div>
//               <div className={`p-2 rounded-full ${stat.bg}`}>
//                 <stat.icon className={`w-5 h-5 ${stat.color}`} />
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {tickets.length === 0 ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-16 text-[var(--text-secondary)]"
//         >
//           <Ticket size={48} className="mx-auto opacity-20 mb-4" />
//           <p className="text-xl">No tickets yet.</p>
//           <p className="text-sm">Click "New Ticket" to create your first one.</p>
//         </motion.div>
//       ) : (
//         <div className="glass-card rounded-2xl border border-[var(--border-color)] overflow-x-auto">
//           <div className="min-w-[700px]">
//             {/* Header */}
//             <div className="grid grid-cols-5 gap-2 p-4 bg-[var(--bg-primary)] border-b border-[var(--border-color)] font-semibold text-sm text-[var(--text-secondary)]">
//               <div>Ticket #</div>
//               <div>Title</div>
//               <div>Priority</div>
//               <div>Status</div>
//               <div className="text-center">Actions</div>
//             </div>

//             {/* Rows */}
//             {tickets.map((ticket, idx) => {
//               const isLocked = ticket.isResolvedPermanently;
//               const canEdit = !isLocked;
//               const canDelete = (ticket.status === 'New' || ticket.status === 'Cancelled');

//               return (
//                 <motion.div
//                   key={ticket._id}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: idx * 0.03 }}
//                   className="grid grid-cols-5 gap-2 p-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-primary)]/50 transition-colors items-center"
//                 >
//                   <div className="font-mono text-sm text-[var(--text-primary)]">{ticket.ticketId}</div>
//                   <div className="text-sm text-[var(--text-primary)] truncate">{ticket.title}</div>
//                   <div>
//                     <span className={`text-xs font-bold ${
//                       ticket.priority === 'High' ? 'text-red-400' :
//                       ticket.priority === 'Medium' ? 'text-yellow-400' :
//                       'text-gray-400'
//                     }`}>
//                       {ticket.priority}
//                     </span>
//                   </div>
//                   <div>
//                     <span className={`text-xs px-2 py-1 rounded-full border ${
//                       ticket.status === 'New' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
//                       ticket.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
//                       ticket.status === 'Resolved' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
//                       'bg-red-500/20 text-red-300 border-red-500/30'
//                     }`}>
//                       {ticket.status}
//                       {isLocked && ' 🔒'}
//                     </span>
//                   </div>
//                   {/* Actions */}
//                   <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
//                     <button
//                       onClick={() => handleViewTicket(ticket)}
//                       className="p-1.5 sm:p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
//                       title="View Details"
//                     >
//                       <Eye size={16} />
//                     </button>
//                     {canEdit && (
//                       <button
//                         onClick={() => openEditForm(ticket)}
//                         className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200"
//                         title="Edit Ticket"
//                       >
//                         <Edit size={16} />
//                       </button>
//                     )}
//                     {canDelete && (
//                       <button
//                         onClick={() => handleDelete(ticket._id)}
//                         className="p-1.5 sm:p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
//                         title="Delete Ticket"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     )}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {showForm && (
//         <TicketForm
//           ticket={editingTicket}
//           onSubmit={editingTicket ? handleUpdate : handleCreate}
//           onClose={() => {
//             setShowForm(false);
//             setEditingTicket(null);
//           }}
//           isAdmin={false}
//         />
//       )}
//     </div>
//   );
// };

// export default CustomerDashboard;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosConfig';
import TicketForm from '../components/TicketForm';
import { useSocket } from '../hooks/useSocket';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  Plus, Ticket, Clock, CheckCircle, XCircle, 
  Eye, ArrowLeft, Calendar, Edit, Trash2, 
  AlertCircle, Tag, Star 
} from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

// ========== TICKET DETAIL VIEW (with Rating) ==========
const TicketDetail = ({ ticket, onBack, onEdit, onDelete }) => {
  if (!ticket) return <div className="text-center py-8">Ticket not found</div>;

  const [ratingValue, setRatingValue] = useState(ticket.rating || 0);
  const [feedbackText, setFeedbackText] = useState(ticket.feedback || '');
  const [submitted, setSubmitted] = useState(!!ticket.rating);

  const handleRatingSubmit = async () => {
    if (ratingValue === 0) {
      toast.error('Please select a rating');
      return;
    }
    try {
      await axios.post(`/api/tickets/${ticket._id}/rating`, { rating: ratingValue, feedback: feedbackText });
      toast.success('Thank you for your feedback! ⭐');
      setSubmitted(true);
      // Update local ticket object
      ticket.rating = ratingValue;
      ticket.feedback = feedbackText;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit rating');
    }
  };

  const statusColors = {
    New: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'In Progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Resolved: 'bg-green-500/20 text-green-300 border-green-500/30',
    Cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  const priorityColors = {
    High: 'text-red-400',
    Medium: 'text-yellow-400',
    Low: 'text-gray-400',
  };

  const isLocked = ticket.isResolvedPermanently;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 border border-[var(--border-color)]"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-4 transition"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{ticket.title}</h2>
            <p className="text-sm font-mono text-[var(--text-secondary)]">{ticket.ticketId}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusColors[ticket.status]}`}>
              {ticket.status}
              {isLocked && ' 🔒'}
            </span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full border bg-[var(--bg-primary)] border-[var(--border-color)] ${priorityColors[ticket.priority]}`}>
              {ticket.priority}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Tag size={16} className="text-[var(--accent)]" />
            Category: <span className="text-[var(--text-primary)] font-medium">{ticket.category}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Calendar size={16} className="text-[var(--accent)]" />
            Created: <span className="text-[var(--text-primary)] font-medium">
              {new Date(ticket.createdAt).toLocaleDateString('en-GB', { 
                day: '2-digit', month: 'short', year: 'numeric', 
                hour: '2-digit', minute: '2-digit' 
              })}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-[var(--border-color)] pt-4">
          <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Description</h4>
          <p className="text-[var(--text-primary)] whitespace-pre-wrap">{ticket.description}</p>
        </div>

        {ticket.resolutionNote && (
          <div className="border-t border-[var(--border-color)] pt-4">
            <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Resolution Note</h4>
            <p className="text-[var(--text-primary)] whitespace-pre-wrap">{ticket.resolutionNote}</p>
          </div>
        )}

        {ticket.aiSummary && (
          <div className="border-t border-[var(--border-color)] pt-4">
            <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">🤖 AI Summary</h4>
            <p className="text-sm text-[var(--text-secondary)]">{ticket.aiSummary}</p>
          </div>
        )}

        {/* ====== RATING SECTION ====== */}
        {!submitted && ticket.status === 'Resolved' && (
          <div className="border-t border-[var(--border-color)] pt-4">
            <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Rate Your Support Experience</h4>
            <div className="flex items-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingValue(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={star <= ratingValue ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                  />
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
          <div className="border-t border-[var(--border-color)] pt-4">
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">⭐ Your Rating</h4>
            <div className="flex items-center gap-2">
              <span className="text-xl">{'⭐'.repeat(ratingValue)}</span>
              <span className="text-sm text-[var(--text-secondary)]">({ratingValue}/5)</span>
            </div>
            {feedbackText && (
              <p className="text-sm text-[var(--text-secondary)] mt-1">"{feedbackText}"</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t border-[var(--border-color)] pt-4 flex flex-wrap gap-3">
          <button
            onClick={() => onEdit(ticket)}
            disabled={isLocked}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isLocked 
                ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' 
                : 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-lg hover:shadow-teal-500/20'
            }`}
          >
            <Edit size={16} /> Edit Ticket
          </button>

          {(ticket.status === 'New' || ticket.status === 'Cancelled') && (
            <button
              onClick={() => onDelete(ticket._id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-sm font-medium transition-all border border-red-500/20"
            >
              <Trash2 size={16} /> Delete Ticket
            </button>
          )}

          {isLocked && (
            <span className="flex items-center gap-2 px-4 py-2 text-sm text-green-400 bg-green-500/10 rounded-lg border border-green-500/20">
              <CheckCircle size={16} /> This ticket is permanently resolved
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ========== MAIN CUSTOMER DASHBOARD ==========
const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const socket = useSocket();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, cancelled: 0 });

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('ticket_updated', (updated) => {
        setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
        toast.success(`Ticket ${updated.ticketId} updated`);
        if (selectedTicket && selectedTicket._id === updated._id) {
          setSelectedTicket(updated);
        }
      });
      return () => socket.off('ticket_updated');
    }
  }, [socket, selectedTicket]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/tickets');
      const data = res.data.data || [];
      setTickets(data);
      calculateStats(data);
      if (ticketId) {
        const found = data.find(t => t._id === ticketId);
        if (found) setSelectedTicket(found);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load tickets');
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (tickets) => {
    const total = tickets.length;
    const pending = tickets.filter(t => t.status === 'New' || t.status === 'In Progress').length;
    const resolved = tickets.filter(t => t.status === 'Resolved').length;
    const cancelled = tickets.filter(t => t.status === 'Cancelled').length;
    setStats({ total, pending, resolved, cancelled });
  };

  const handleCreate = async (data) => {
    try {
      const res = await axios.post('/api/tickets', data);
      setTickets([res.data.data, ...tickets]);
      calculateStats([res.data.data, ...tickets]);
      toast.success('Ticket created!');
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Creation failed');
    }
  };

  const handleUpdate = async (data) => {
    try {
      const res = await axios.put(`/api/tickets/${editingTicket._id}`, data);
      const updated = res.data.data;
      setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
      calculateStats(tickets.map(t => t._id === updated._id ? updated : t));
      toast.success('Ticket updated!');
      setEditingTicket(null);
      setShowForm(false);
      if (selectedTicket && selectedTicket._id === updated._id) {
        setSelectedTicket(updated);
      }
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
      confirmButtonColor: '#0D9488',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/tickets/${id}`);
        const updatedTickets = tickets.filter(t => t._id !== id);
        setTickets(updatedTickets);
        calculateStats(updatedTickets);
        toast.success('Ticket deleted');
        if (selectedTicket && selectedTicket._id === id) {
          setSelectedTicket(null);
          navigate('/customer/dashboard');
        }
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    navigate(`/customer/ticket/${ticket._id}`);
  };

  const handleBack = () => {
    setSelectedTicket(null);
    navigate('/customer/dashboard');
  };

  const openEditForm = (ticket) => {
    if (ticket.isResolvedPermanently) {
      toast.error('This ticket is permanently resolved and cannot be edited');
      return;
    }
    setEditingTicket(ticket);
    setShowForm(true);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 text-center max-w-md">
          <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
          <h2 className="text-xl font-bold text-red-400">Error Loading Dashboard</h2>
          <p className="text-[var(--text-secondary)] mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  const statsCards = [
    { label: 'Total', value: stats.total, icon: Ticket, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
  ];

  // Detail view
  if (selectedTicket) {
    return (
      <div className="min-h-screen animated-bg p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <TicketDetail 
            ticket={selectedTicket} 
            onBack={handleBack} 
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Welcome back, {user?.name || 'User'} 👋
          </h1>
          <p className="text-[var(--text-secondary)]">Manage your support tickets</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-teal-500/20"
        >
          <Plus size={18} /> New Ticket
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card rounded-2xl p-4 border border-[var(--border-color)] transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {tickets.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-[var(--text-secondary)]"
        >
          <Ticket size={48} className="mx-auto opacity-20 mb-4" />
          <p className="text-xl">No tickets yet.</p>
          <p className="text-sm">Click "New Ticket" to create your first one.</p>
        </motion.div>
      ) : (
        <div className="glass-card rounded-2xl border border-[var(--border-color)] overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header */}
            <div className="grid grid-cols-5 gap-2 p-4 bg-[var(--bg-primary)] border-b border-[var(--border-color)] font-semibold text-sm text-[var(--text-secondary)]">
              <div>Ticket #</div>
              <div>Title</div>
              <div>Priority</div>
              <div>Status</div>
              <div className="text-center">Actions</div>
            </div>

            {/* Rows */}
            {tickets.map((ticket, idx) => {
              const isLocked = ticket.isResolvedPermanently;
              const canEdit = !isLocked;
              const canDelete = (ticket.status === 'New' || ticket.status === 'Cancelled');

              return (
                <motion.div
                  key={ticket._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="grid grid-cols-5 gap-2 p-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-primary)]/50 transition-colors items-center"
                >
                  <div className="font-mono text-sm text-[var(--text-primary)]">{ticket.ticketId}</div>
                  <div className="text-sm text-[var(--text-primary)] truncate">{ticket.title}</div>
                  <div>
                    <span className={`text-xs font-bold ${
                      ticket.priority === 'High' ? 'text-red-400' :
                      ticket.priority === 'Medium' ? 'text-yellow-400' :
                      'text-gray-400'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      ticket.status === 'New' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                      ticket.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                      ticket.status === 'Resolved' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                      'bg-red-500/20 text-red-300 border-red-500/30'
                    }`}>
                      {ticket.status}
                      {isLocked && ' 🔒'}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <button
                      onClick={() => handleViewTicket(ticket)}
                      className="p-1.5 sm:p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    {canEdit && (
                      <button
                        onClick={() => openEditForm(ticket)}
                        className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200"
                        title="Edit Ticket"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        className="p-1.5 sm:p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
                        title="Delete Ticket"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {showForm && (
        <TicketForm
          ticket={editingTicket}
          onSubmit={editingTicket ? handleUpdate : handleCreate}
          onClose={() => {
            setShowForm(false);
            setEditingTicket(null);
          }}
          isAdmin={false}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;