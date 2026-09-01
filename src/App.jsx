// // import React from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import { useAuth } from './context/AuthContext';
// // import Login from './components/Login';
// // import Signup from './components/Signup';
// // import CustomerDashboard from './pages/CustomerDashboard';
// // import AdminDashboard from './pages/AdminDashboard';
// // import Navbar from './components/Navbar';
// // import ThemeToggle from './components/ThemeToggle';

// // const ProtectedRoute = ({ children, allowedRoles }) => {
// //   const { user, loading } = useAuth();
// //   if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
// //   if (!user) return <Navigate to="/login" replace />;
// //   if (allowedRoles && !allowedRoles.includes(user.role)) {
// //     return <Navigate to="/customer/dashboard" replace />;
// //   }
// //   return children;
// // };

// // const MainLayout = ({ children }) => {
// //   return (
// //     <div className="min-h-screen bg-[var(--bg-primary)]">
// //       <Navbar />
// //       <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
// //     </div>
// //   );
// // };

// // function App() {
// //   const { user } = useAuth();
// //   return (
// //     <Routes>
// //       <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Login />} />
// //       <Route path="/signup" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Signup />} />
// //       <Route path="/customer/dashboard" element={
// //         <ProtectedRoute allowedRoles={['user']}>
// //           <MainLayout><CustomerDashboard /></MainLayout>
// //         </ProtectedRoute>
// //       } />
// //       <Route path="/admin/dashboard" element={
// //         <ProtectedRoute allowedRoles={['admin']}>
// //           <MainLayout><AdminDashboard /></MainLayout>
// //         </ProtectedRoute>
// //       } />
// //       <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard') : '/login'} />} />
// //       <Route path="*" element={<Navigate to="/login" />} />
// //     </Routes>
// //   );
// // }

// // export default App;

// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import CustomerDashboard from './pages/CustomerDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import Home from './pages/Home';
// import Navbar from './components/Navbar';
// import About from './pages/About';


// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, loading } = useAuth();
//   if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   if (!user) return <Navigate to="/login" replace />;
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/customer/dashboard" replace />;
//   }
//   return children;
// };

// const MainLayout = ({ children }) => (
//   <div className="min-h-screen bg-[var(--bg-primary)]">
//     <Navbar />
//     <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
//   </div>
// );

// function App() {
//   const { user } = useAuth();
//   return (
//     <Routes>
//             <Route path="/" element={<MainLayout><About /></MainLayout>} />
//       <Route path="/about" element={<MainLayout><About /></MainLayout>} />
//  <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      

//       <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Login />} />
//       <Route path="/signup" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Signup />} />
      
//       <Route path="/customer/dashboard" element={
//         <ProtectedRoute allowedRoles={['user']}>
//           <MainLayout><CustomerDashboard /></MainLayout>
//         </ProtectedRoute>
//       } />
//       {/* ✅ Yeh route zaroori hai – detail page ke liye */}
//       <Route path="/customer/ticket/:ticketId" element={
//         <ProtectedRoute allowedRoles={['user']}>
//           <MainLayout><CustomerDashboard /></MainLayout>
//         </ProtectedRoute>
//       } />
      
//       <Route path="/admin/dashboard" element={
//         <ProtectedRoute allowedRoles={['admin']}>
//           <MainLayout><AdminDashboard /></MainLayout>
//         </ProtectedRoute>
//       } />
      
//       <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard') : '/login'} />} />
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import About from './pages/About';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/customer/dashboard" replace />;
  }
  return children;
};

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-[var(--bg-primary)]">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
  </div>
);

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Signup />} />

      {/* Customer Routes */}
      <Route path="/customer/dashboard" element={
        <ProtectedRoute allowedRoles={['user']}>
          <MainLayout><CustomerDashboard /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/customer/tickets" element={
        <ProtectedRoute allowedRoles={['user']}>
          <MainLayout><CustomerDashboard /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/customer/ticket/:ticketId" element={
        <ProtectedRoute allowedRoles={['user']}>
          <MainLayout><CustomerDashboard /></MainLayout>
        </ProtectedRoute>
      } />

      {/* Admin Route */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout><AdminDashboard /></MainLayout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;