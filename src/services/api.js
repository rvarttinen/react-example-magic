/**
 * API Service for Magic Backend
 * Handles communication with the localhost:8888 backend
 */

const API_BASE_URL = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:8888';

/**
 * Fetch magic data by key
 * @param {string} key - The magic key to fetch
 * @returns {Promise<Object>} The magic data response
 */
export const fetchMagicByKey = async (key) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/magic?key=${encodeURIComponent(key)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response for key:', key, data);
    return data;
  } catch (error) {
    console.error('Error fetching magic by key:', error);
    throw error;
  }
};

/**
 * Fetch all available magic keys
 * @returns {Promise<Object>} List of all known magic keys
 */
export const fetchAllMagicKeys = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/magic`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response for all keys:', data);
    
    // Log the structure to help debug
    if (process.env.NODE_ENV === 'development') {
      console.log('Response type:', typeof data);
      console.log('Is array:', Array.isArray(data));
      if (data && typeof data === 'object') {
        console.log('Object keys:', Object.keys(data));
        console.log('Response structure:', data);
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching all magic keys:', error);
    throw error;
  }
};

/**
 * Generic API request function
 * @param {string} endpoint - The API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} The API response
 */
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Generic API Response:', endpoint, data);
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
