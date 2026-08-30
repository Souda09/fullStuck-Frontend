import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';        // ✅ CHANGED
import Signup from './components/Signup';      // ✅ CHANGED
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ThemeToggle from './components/ThemeToggle';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/customer/dashboard" replace />;
  }
  return children;
};

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-[var(--bg-primary)]">
    <nav className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-[var(--text-primary)]">SupportFlow</Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
    <main className="max-w-7xl mx-auto p-4">{children}</main>
  </div>
);

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Signup />} />
      <Route path="/customer/dashboard" element={
        <ProtectedRoute allowedRoles={['user']}>
          <MainLayout><CustomerDashboard /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout><AdminDashboard /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard') : '/login'} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;