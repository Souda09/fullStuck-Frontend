import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const newSocket = io(SOCKET_URL, {
       transports: ['polling', 'websocket'],  // ✅ Allow both
   // ✅ Force polling only (no WebSocket)
        auth: { token },
      });
      setSocket(newSocket);
      return () => newSocket.disconnect();
    }
  }, []);

  return socket;
};