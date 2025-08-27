import reportWebVitals from './reportWebVitals';

// Mock web-vitals module
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

describe('reportWebVitals', () => {
  let mockOnPerfEntry;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create mock performance entry function
    mockOnPerfEntry = jest.fn();
  });

  test('should be a function', () => {
    expect(typeof reportWebVitals).toBe('function');
  });

  test('should accept a function parameter', () => {
    // This should not throw an error
    expect(() => {
      reportWebVitals(mockOnPerfEntry);
    }).not.toThrow();
  });

  test('should accept no parameters', () => {
    // This should not throw an error
    expect(() => {
      reportWebVitals();
    }).not.toThrow();
  });

  test('should accept null parameter', () => {
    // This should not throw an error
    expect(() => {
      reportWebVitals(null);
    }).not.toThrow();
  });

  test('should accept non-function parameter', () => {
    // This should not throw an error
    expect(() => {
      reportWebVitals('not a function');
    }).not.toThrow();
  });

  test('should work with different types of function callbacks', () => {
    // Test with arrow function
    const arrowCallback = () => {};
    expect(() => {
      reportWebVitals(arrowCallback);
    }).not.toThrow();
    
    // Test with regular function
    function regularCallback() {}
    expect(() => {
      reportWebVitals(regularCallback);
    }).not.toThrow();
    
    // Test with async function
    const asyncCallback = async () => {};
    expect(() => {
      reportWebVitals(asyncCallback);
    }).not.toThrow();
  });
});
