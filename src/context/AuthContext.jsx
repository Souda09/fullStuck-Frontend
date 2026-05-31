import React, { createContext, useState, useEffect } from 'react';

// Context create karna
export const AuthContext = createContext();

// Provider Component definition
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // App load hote hi LocalStorage se user session check karna
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      // 🔴 Inspect Console (F12) mein reload par log dikhana
      console.log('%c🔄 [AUTH SYSTEM] Existing Session Loaded from LocalStorage!', 'color: #00e5ff; font-weight: bold; font-size: 12px;');
      console.log(`👤 User: ${parsedUser.name} | Role: ${parsedUser.role.toUpperCase()}`);
    } else {
      console.log('%cℹ️ [AUTH SYSTEM] No active session found. Please login.', 'color: #888888; font-style: italic;');
    }
    setLoading(false);
  }, []);

  // Login session save karna (LocalStorage + Context State)
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout session (Clear everything)
  const logout = () => {
    // 🔴 Inspect Console (F12) mein logout print
    console.log('%c🚪 [AUTH SYSTEM] User logged out. LocalStorage session cleared.', 'color: #ff9900; font-weight: bold; font-size: 12px;');
    
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};