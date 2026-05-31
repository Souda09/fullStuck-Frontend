import React, { useContext } from 'react'; // 🟢 Added { useContext } explicitly!
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';

// simple Dashboard placeholder
const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // 🟢 Safe useContext
  
  return (
    <div className="w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl text-center relative z-10 hover:border-indigo-500/20 transition-all duration-500">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-300 via-purple-300 to-teal-300 bg-clip-text text-transparent">
        Welcome, {user?.name}!
      </h2>
      <p className="text-slate-400 mt-2 font-medium">Your session is secure & active.</p>
      
      <div className="my-6 p-5 bg-slate-950/60 border border-white/5 rounded-2xl text-left space-y-3 shadow-inner">
        <p className="text-slate-300"><strong className="text-indigo-400">Email:</strong> {user?.email}</p>
        <p className="text-slate-300"><strong className="text-teal-400">System Role:</strong> <span className={`ml-2 px-2.5 py-1 text-xs font-bold rounded-lg tracking-wider ${user?.role === 'admin' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>{user?.role?.toUpperCase()}</span></p>
      </div>

      {user?.role === 'admin' ? (
        <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-xl font-medium shadow-md">
          🛡️ Admin System Control Panel Active! Full permissions granted.
        </div>
      ) : (
        <div className="mb-6 p-3.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm rounded-xl font-medium shadow-md">
          👤 User Dashboard Active! Standard access permissions.
        </div>
      )}

      <button
        onClick={logout}
        className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      >
        Log Out Session
      </button>
    </div>
  );
};

// Route security component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // 🟢 Safe useContext
  
  if (loading) return <div className="text-white text-lg">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

const MainLayout = () => {
  const { user, logout } = useContext(AuthContext); // 🟢 Safe useContext

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* 🌀 AMBIENT NEON GLOWING ORBS (Floating Background Effects) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none animate-float-1"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none animate-float-2"></div>
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 🛡️ 100% RESPONSIVE GLASSMORPHIC NAVIGATION BAR */}
      <nav className="absolute top-6 left-4 right-4 sm:left-6 sm:right-6 flex justify-center sm:justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 sm:px-8 py-3.5 sm:py-4 shadow-xl z-20 hover:border-white/15 transition-all duration-300 max-w-6xl mx-auto w-[calc(100%-2rem)]">
        
        {/* 🟢 Mobile par 'SecureAuth' automatically hide ho jayega (hidden), Desktop par dikhega (sm:block) */}
        <h1 className="hidden sm:block text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
          SecureAuth 🛡️
        </h1>
        
        <div className="flex gap-4 sm:gap-6 items-center text-sm font-semibold text-slate-300">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-white transition-colors duration-200 py-1.5">Login</Link>
              <Link to="/signup" className="bg-gradient-to-r from-indigo-500 to-teal-500 hover:opacity-90 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-indigo-500/20">Register</Link>
            </>
          ) : (
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-slate-400 text-xs sm:text-sm">
                Hi, <strong className="text-teal-400 font-bold">{user.name}</strong>
              </span>
              <button 
                onClick={logout} 
                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Pages Container */}
      <div className="relative z-10 w-full flex items-center justify-center min-h-[70vh] mt-16">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;