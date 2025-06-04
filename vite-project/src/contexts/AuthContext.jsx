import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        
        if (token && username) {
          // Set the user without making an API call
          setUser({ username });
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setError('Authentication check failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password
      });
      
      // Store auth data
      localStorage.setItem('username', username);
      
      // If server sends a token, store it too
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // Set user in state
      setUser({ username });
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setError(
        error.response?.status === 401
          ? 'Invalid credentials. Please check your username and password.'
          : 'Login failed. Please try again.'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:8080/create-user', {
        username,
        password
      });
      
      // If signup successful, log the user in
      return await login(username, password);
    } catch (error) {
      console.error('Signup failed:', error);
      setError(
        error.response?.status === 409
          ? 'Username already exists. Please choose a different one.'
          : 'Signup failed. Please try again.'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/');
  };

  // Value to be provided by the context
  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
