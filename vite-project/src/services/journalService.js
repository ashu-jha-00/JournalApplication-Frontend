import axios from 'axios';

// Define the base URL for the API
const API_URL = 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    const { response } = error;
    
    if (response) {
      // Handle specific status codes
      switch (response.status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          window.location.href = '/';
          break;
        case 403:
          // Forbidden - user doesn't have access
          console.error('You do not have permission to perform this action');
          break;
        case 404:
          // Resource not found
          console.error('The requested resource was not found');
          break;
        case 500:
          // Server error
          console.error('Server error occurred. Please try again later.');
          break;
        default:
          console.error('An error occurred:', response.data?.message || 'Unknown error');
      }
    } else {
      // Network or other error
      console.error('Network error or server is unreachable');
    }
    
    return Promise.reject(error);
  }
);

// Journal service functions

/**
 * Get all journal entries for the current user
 * @returns {Promise} Promise with journal entries data
 */
export const getAllJournalEntries = async () => {
  try {
    const response = await api.get('/journals');
    return response.data;
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw error;
  }
};

/**
 * Get a specific journal entry by ID
 * @param {string} id - Journal entry ID
 * @returns {Promise} Promise with journal entry data
 */
export const getJournalById = async (id) => {
  try {
    const response = await api.get(`/journals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching journal with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new journal entry
 * @param {object} journalData - Journal entry data
 * @returns {Promise} Promise with created journal entry data
 */
export const createJournalEntry = async (journalData) => {
  try {
    const response = await api.post('/journals', journalData);
    return response.data;
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw error;
  }
};

/**
 * Update an existing journal entry
 * @param {string} id - Journal entry ID
 * @param {object} journalData - Updated journal data
 * @returns {Promise} Promise with updated journal entry data
 */
export const updateJournalEntry = async (id, journalData) => {
  try {
    const response = await api.put(`/journals/${id}`, journalData);
    return response.data;
  } catch (error) {
    console.error(`Error updating journal with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a journal entry
 * @param {string} id - Journal entry ID
 * @returns {Promise} Promise indicating success/failure
 */
export const deleteJournalEntry = async (id) => {
  try {
    const response = await api.delete(`/journals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting journal with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getAllJournalEntries,
  getJournalById,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
};
