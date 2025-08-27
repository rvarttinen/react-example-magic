import { render, screen } from '@testing-library/react';
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
});
