import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, LogOut, Sun, Moon, User, LayoutDashboard, Ticket, LogIn, UserPlus, Home, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const alwaysLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
  ];

  // 👇 Customer links: Dashboard & My Tickets
  const customerLinks = [
    { name: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'My Tickets', path: '/customer/tickets', icon: Ticket },
  ];

  // Admin links
  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Tickets', path: '/admin/dashboard', icon: Ticket },
  ];

  const authLinks = user
    ? user.role === 'admin'
      ? adminLinks
      : customerLinks
    : [];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-[var(--bg-secondary)]/80 backdrop-blur-md border-b border-[var(--border-color)] px-4 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            SupportFlow
          </span>
          <span className="text-xs bg-[var(--accent)] text-white px-2 py-0.5 rounded-full">v1.0</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {alwaysLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                <Icon size={16} />
                {link.name}
              </Link>
            );
          })}
          {user &&
            authLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  <Icon size={16} />
                  {link.name}
                </Link>
              );
            })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--bg-primary)] transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>

          {user ? (
            <>
              <div className="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <User size={16} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-primary)]">{user.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                  {user.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                <LogIn size={16} /> Login
              </Link>
              <Link
                to="/signup"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium bg-[var(--accent)] text-white px-4 py-1.5 rounded-lg hover:bg-[var(--accent-hover)] transition-colors duration-200"
              >
                <UserPlus size={16} /> Sign Up
              </Link>
            </>
          )}

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-1.5 rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-3 pt-3 border-t border-[var(--border-color)] space-y-3"
        >
          {alwaysLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              <link.icon size={16} />
              {link.name}
            </Link>
          ))}
          {user &&
            authLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            ))}
          {user ? (
            <>
              <div className="flex items-center gap-2 px-2 text-sm">
                <User size={16} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-primary)]">{user.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                  {user.role}
                </span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileOpen(false);
                }}
                className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg w-full transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                <LogIn size={16} /> Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                <UserPlus size={16} /> Sign Up
              </Link>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;