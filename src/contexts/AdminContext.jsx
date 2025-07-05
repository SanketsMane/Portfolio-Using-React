import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  // Check if admin is already authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setIsAuthenticated(true);
        setAdminData(response.data.admin);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
      setAdminData(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${API_BASE_URL}/admin/login`, {
        email,
        password
      });

      if (response.data.success) {
        const { token, admin } = response.data;
        
        // Store token in localStorage
        localStorage.setItem('adminToken', token);
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Update state
        setIsAuthenticated(true);
        setAdminData(admin);
        
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setAdminData(null);
    setError(null);
  };

  const getPortfolioData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/portfolio`);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch portfolio data');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePortfolioData = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_BASE_URL}/admin/portfolio`, data);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update portfolio data');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('resume', file);

      const response = await axios.post(`${API_BASE_URL}/admin/upload-resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to upload resume');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      adminData,
      loading,
      error,
      login,
      logout,
      getPortfolioData,
      updatePortfolioData,
      uploadResume,
      setError
    }}>
      {children}
    </AdminContext.Provider>
  );
};
