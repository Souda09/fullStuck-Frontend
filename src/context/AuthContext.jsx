import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axiosConfig';
import { useSocket } from '../hooks/useSocket';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      if (socket) {
        socket.emit('join_user_room', parsed.id);
        if (parsed.role === 'admin') socket.emit('join_admin_room');
      }
    }
    setLoading(false);
  }, [socket]);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    if (socket) {
      socket.emit('join_user_room', userData.id);
      if (userData.role === 'admin') socket.emit('join_admin_room');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (socket) socket.disconnect();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);