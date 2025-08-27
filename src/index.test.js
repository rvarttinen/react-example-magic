import React from 'react';
import ReactDOM from 'react-dom/client';

// Mock the modules
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(),
}));

jest.mock('./App', () => {
  return function MockApp() {
    return <div data-testid="mock-app">Mock App Component</div>;
  };
});

jest.mock('./reportWebVitals', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Index.js - App Entry Point', () => {
  let mockRoot;
  let mockRender;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create mock root and render functions
    mockRender = jest.fn();
    mockRoot = {
      render: mockRender,
    };
    
    // Mock createRoot to return our mock root
    ReactDOM.createRoot.mockReturnValue(mockRoot);
  });

  test('should create root and render App component', () => {
    // Import index.js to trigger the execution
    require('./index');
    
    // Verify createRoot was called with the correct element
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(
      document.getElementById('root')
    );
    
    // Verify render was called
    expect(mockRoot.render).toHaveBeenCalled();
    
    // Get the rendered content
    const renderCall = mockRoot.render.mock.calls[0][0];
    
    // Verify it's wrapped in StrictMode
    expect(renderCall.type).toBe(React.StrictMode);
    
    // Verify App component is rendered inside StrictMode
    expect(renderCall.props.children.type.name).toBe('MockApp');
  });

  test('should handle root element not found gracefully', () => {
    // Mock getElementById to return null
    const originalGetElementById = document.getElementById;
    document.getElementById = jest.fn().mockReturnValue(null);
    
    // This should not throw an error
    expect(() => {
      require('./index');
    }).not.toThrow();
    
    // Restore original function
    document.getElementById = originalGetElementById;
  });
});
