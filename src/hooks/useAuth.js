// src/hooks/useAuth.js
import { useState, useCallback } from 'react'; // <-- 1. Import useCallback

// Get user data from localStorage if it exists
const getStoredUser = () => {
  const storedUser = localStorage.getItem('movieUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const useAuth = () => {
  const [user, setUser] = useState(getStoredUser());

  // 2. Wrap saveUser in useCallback
  // This ensures the function reference doesn't change on re-renders
  const saveUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('movieUser', JSON.stringify(userData));
  }, []); // <-- 3. Add empty dependency array

  // 4. Wrap logout in useCallback
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('movieUser');
  }, []); // <-- 5. Add empty dependency array

  return { user, saveUser, logout };
};