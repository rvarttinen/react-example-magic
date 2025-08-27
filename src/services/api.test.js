import { fetchMagicByKey, fetchAllMagicKeys, apiRequest } from './api';

// Mock fetch globally
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('fetchMagicByKey', () => {
    it('should fetch magic data by key successfully', async () => {
      const mockResponse = { key: '6204657', data: 'magic data' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchMagicByKey('6204657');
      
      expect(fetch).toHaveBeenCalledWith('/v1/magic?key=6204657', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle HTTP errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchMagicByKey('invalid-key')).rejects.toThrow('HTTP error! status: 404');
    });

    it('should handle network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchMagicByKey('6204657')).rejects.toThrow('Network error');
    });
  });

  describe('fetchAllMagicKeys', () => {
    it('should fetch all magic keys successfully', async () => {
      const mockResponse = ['6204657', '1234567', 'abcdefg'];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchAllMagicKeys();
      
      expect(fetch).toHaveBeenCalledWith('/v1/magic', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle HTTP errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(fetchAllMagicKeys()).rejects.toThrow('HTTP error! status: 500');
    });
  });

  describe('apiRequest', () => {
    it('should make generic API requests successfully', async () => {
      const mockResponse = { success: true };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiRequest('/v1/test', { method: 'POST' });
      
      expect(fetch).toHaveBeenCalledWith('/v1/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle custom headers', async () => {
      const mockResponse = { success: true };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await apiRequest('/v1/test', { 
        headers: { 'Authorization': 'Bearer token' } 
      });
      
      expect(fetch).toHaveBeenCalledWith('/v1/test', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token',
        },
      });
    });
  });
});
