import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock the API service
jest.mock('./services/api', () => ({
  fetchMagicByKey: jest.fn(),
  fetchAllMagicKeys: jest.fn(),
}));

// Import the mocked functions
import { fetchMagicByKey, fetchAllMagicKeys } from './services/api';

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Default mock implementations
    fetchAllMagicKeys.mockResolvedValue(['6204657', '1234567', 'abcdefg']);
    fetchMagicByKey.mockResolvedValue({ id: '6204657', magicString: 'test magic' });
  });

  test('renders Magic API Explorer title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Magic API Explorer/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders search input field', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders search button', () => {
    render(<App />);
    const searchButton = screen.getByText(/Search/i);
    expect(searchButton).toBeInTheDocument();
  });

  test('renders Show All Keys button', () => {
    render(<App />);
    const showAllButton = screen.getByText(/Show All Keys/i);
    expect(showAllButton).toBeInTheDocument();
  });

  test('search input is initially empty', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    expect(searchInput.value).toBe('');
  });

  test('search button is initially disabled', () => {
    render(<App />);
    const searchButton = screen.getByText(/Search/i);
    expect(searchButton).toBeDisabled();
  });

  test('search button is disabled when input is empty', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Input is empty, button should be disabled
    expect(searchInput.value).toBe('');
    expect(searchButton).toBeDisabled();
  });

  test('search button becomes enabled when input has content', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type in the input
    fireEvent.change(searchInput, { target: { value: 'test-key' } });
    
    // Button should now be enabled
    expect(searchButton).not.toBeDisabled();
  });

  test('search button becomes disabled when input is cleared', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type in the input
    fireEvent.change(searchInput, { target: { value: 'test-key' } });
    expect(searchButton).not.toBeDisabled();
    
    // Clear the input
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(searchButton).toBeDisabled();
  });

  test('search button becomes disabled when input only has whitespace', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type whitespace in the input
    fireEvent.change(searchInput, { target: { value: '   ' } });
    expect(searchButton).toBeDisabled();
  });

  test('search input updates value when typing', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type in the input
    fireEvent.change(searchInput, { target: { value: 'test-key' } });
    expect(searchInput.value).toBe('test-key');
  });

  test('search input handles special characters', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type special characters
    fireEvent.change(searchInput, { target: { value: 'test@#$%^&*()' } });
    expect(searchInput.value).toBe('test@#$%^&*()');
  });

  test('search input handles numbers', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type numbers
    fireEvent.change(searchInput, { target: { value: '12345' } });
    expect(searchInput.value).toBe('12345');
  });

  test('search input handles mixed content', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type mixed content
    fireEvent.change(searchInput, { target: { value: 'test123@#$' } });
    expect(searchInput.value).toBe('test123@#$');
  });

  test('search input is disabled during loading', async () => {
    // Mock loading state
    fetchAllMagicKeys.mockImplementation(() => new Promise(() => {}));
    
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    
    // Input should be disabled during loading
    expect(searchInput).toBeDisabled();
  });

  test('search button shows loading text during search', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type in the input
    fireEvent.change(searchInput, { target: { value: 'test-key' } });
    
    // Mock search to take time
    fetchMagicByKey.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve({ id: 'test-key', magicString: 'test magic' }), 100);
    }));
    
    // Click search button
    fireEvent.click(searchButton);
    
    // Button should show loading state
    expect(searchButton).toHaveTextContent('Searching...');
  });

  test('search button is disabled during search', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type in the input
    fireEvent.change(searchInput, { target: { value: 'test-key' } });
    
    // Mock search to take time
    fetchMagicByKey.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve({ id: 'test-key', magicString: 'test magic' }), 100);
    }));
    
    // Click search button
    fireEvent.click(searchButton);
    
    // Button should be disabled during search
    expect(searchButton).toBeDisabled();
  });

  test('search input is disabled during search', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type in the input
    fireEvent.change(searchInput, { target: { value: 'test-key' } });
    
    // Mock search to take time
    fetchMagicByKey.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve({ id: 'test-key', magicString: 'test magic' }), 100);
    }));
    
    // Click search button
    fireEvent.click(searchButton);
    
    // Input should be disabled during search
    expect(searchInput).toBeDisabled();
  });

  test('search can be triggered with Enter key', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type in the input
    fireEvent.change(searchInput, { target: { value: 'test-key' } });
    
    // Press Enter key
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    
    // Should trigger search
    await waitFor(() => {
      expect(fetchMagicByKey).toHaveBeenCalledWith('test-key');
    });
  });

  test('search is not triggered with other keys', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type in the input
    fireEvent.change(searchInput, { target: { value: 'test-key' } });
    
    // Press other keys
    fireEvent.keyDown(searchInput, { key: 'A', code: 'KeyA' });
    fireEvent.keyDown(searchInput, { key: 'Space', code: 'Space' });
    
    // Should not trigger search
    expect(fetchMagicByKey).not.toHaveBeenCalled();
  });

  test('Show All Keys button resets search state', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const showAllButton = screen.getByText(/Show All Keys/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type in search input
    fireEvent.change(searchInput, { target: { value: 'test-key' } });
    expect(searchInput.value).toBe('test-key');
    
    // Click Show All Keys button
    fireEvent.click(showAllButton);
    
    // Search input should be cleared
    expect(searchInput.value).toBe('');
  });

  test('Show All Keys button is disabled during loading', async () => {
    // Mock loading state
    fetchAllMagicKeys.mockImplementation(() => new Promise(() => {}));
    
    render(<App />);
    const showAllButton = screen.getByText(/Show All Keys/i);
    
    // Button should be disabled during loading
    expect(showAllButton).toBeDisabled();
  });

  test('handles empty API response gracefully', async () => {
    // Mock empty API response
    fetchAllMagicKeys.mockResolvedValue([]);
    
    render(<App />);
    
    // Wait for API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Should not show any keys
    const keyElements = screen.queryAllByText(/6204657|1234567|abcdefg/);
    expect(keyElements).toHaveLength(0);
  });

  test('handles API response with different data structures', async () => {
    // Mock API response with object structure
    fetchAllMagicKeys.mockResolvedValue({
      keys: ['key1', 'key2', 'key3'],
      total: 3
    });
    
    render(<App />);
    
    // Wait for API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Should extract and display keys from object
    await waitFor(() => {
      const keyElements = screen.getAllByText(/key1|key2|key3/);
      expect(keyElements.length).toBeGreaterThan(0);
    });
  });

  test('handles API response with data property', async () => {
    // Mock API response with data property
    fetchAllMagicKeys.mockResolvedValue({
      data: ['data1', 'data2'],
      status: 'success'
    });
    
    render(<App />);
    
    // Wait for API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Should extract and display keys from data property
    await waitFor(() => {
      const keyElements = screen.getAllByText(/data1|data2/);
      expect(keyElements.length).toBeGreaterThan(0);
    });
  });

  test('handles API response with plain object keys', async () => {
    // Mock API response with plain object
    fetchAllMagicKeys.mockResolvedValue({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    });
    
    render(<App />);
    
    // Wait for API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Should convert object keys to array and display them
    await waitFor(() => {
      const keyElements = screen.getAllByText(/key1|key2|key3/);
      expect(keyElements.length).toBeGreaterThan(0);
    });
  });

  test('handles API response with mixed data types', async () => {
    // Mock API response with mixed types
    fetchAllMagicKeys.mockResolvedValue([
      'string-key',
      12345,
      { id: 'object-key', name: 'Object Key' },
      null,
      undefined
    ]);
    
    render(<App />);
    
    // Wait for API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Should handle mixed data types gracefully
    await waitFor(() => {
      const stringKey = screen.getByText('string-key');
      const numberKey = screen.getByText('12345');
      expect(stringKey).toBeInTheDocument();
      expect(numberKey).toBeInTheDocument();
    });
  });

  test('handles search with special characters in key', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type special characters
    fireEvent.change(searchInput, { target: { value: 'test@#$%^&*()' } });
    
    // Click search button
    fireEvent.click(searchButton);
    
    // Should call API with special characters
    await waitFor(() => {
      expect(fetchMagicByKey).toHaveBeenCalledWith('test@#$%^&*()');
    });
  });

  test('handles search with spaces in key', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type key with spaces
    fireEvent.change(searchInput, { target: { value: 'test key with spaces' } });
    
    // Click search button
    fireEvent.click(searchButton);
    
    // Should call API with key including spaces
    await waitFor(() => {
      expect(fetchMagicByKey).toHaveBeenCalledWith('test key with spaces');
    });
  });

  test('handles search with very long key', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type very long key
    const longKey = 'a'.repeat(1000);
    fireEvent.change(searchInput, { target: { value: longKey } });
    
    // Click search button
    fireEvent.click(searchButton);
    
    // Should call API with long key
    await waitFor(() => {
      expect(fetchMagicByKey).toHaveBeenCalledWith(longKey);
    });
  });

  test('handles search with unicode characters', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Enter magic key/i);
    const searchButton = screen.getByText(/Search/i);
    
    // Wait for initial API call to complete
    await waitFor(() => {
      expect(fetchAllMagicKeys).toHaveBeenCalledTimes(1);
    });
    
    // Type unicode characters
    fireEvent.change(searchInput, { target: { value: 'test-üñïçødé-ключ-🔑' } });
    
    // Click search button
    fireEvent.click(searchButton);
    
    // Should call API with unicode characters
    await waitFor(() => {
      expect(fetchMagicByKey).toHaveBeenCalledWith('test-üñïçødé-ключ-🔑');
    });
  });
});
