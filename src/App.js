import React, { useState, useEffect } from 'react';
import { fetchMagicByKey, fetchAllMagicKeys } from './services/api';
import './App.css';

function App() {
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [allKeys, setAllKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all available keys on component mount
  useEffect(() => {
    fetchAllKeysOnMount();
  }, []);

  const fetchAllKeysOnMount = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchAllMagicKeys();
      
      // Handle different response formats
      if (Array.isArray(response)) {
        setAllKeys(response);
      } else if (response && typeof response === 'object') {
        // If response is an object, try to extract keys from it
        if (response.keys && Array.isArray(response.keys)) {
          setAllKeys(response.keys);
        } else if (response.data && Array.isArray(response.data)) {
          setAllKeys(response.data);
        } else {
          // Convert object keys to array if it's a key-value object
          setAllKeys(Object.keys(response));
        }
      } else {
        setAllKeys([]);
      }
    } catch (err) {
      setError('Failed to fetch available keys');
      console.error('Error fetching all keys:', err);
      setAllKeys([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKey.trim()) {
      setError('Please enter a search key');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearchResult(null);
      
      const result = await fetchMagicByKey(searchKey.trim());
      setSearchResult(result);
    } catch (err) {
      setError('Failed to fetch magic data for the given key');
      console.error('Error searching magic:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleShowAllKeys = () => {
    setSearchResult(null);
    setSearchKey('');
    setError(null);
  };

  // Helper function to safely render key values
  const renderKeyValue = (key) => {
    if (typeof key === 'string' || typeof key === 'number') {
      return key.toString();
    } else if (key && typeof key === 'object') {
      // If key is an object, try to extract a meaningful identifier
      if (key.id !== undefined) return key.id.toString();
      if (key.key !== undefined) return key.key.toString();
      if (key.magicString !== undefined) return key.magicString.toString();
      if (key.name !== undefined) return key.name.toString();
      // Fallback to JSON string if no recognizable property
      return JSON.stringify(key);
    }
    return 'Unknown';
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Magic API Explorer</h1>
        
        <div className="search-container">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter magic key..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <button 
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={loading || !searchKey.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="actions">
          <button 
            className="btn btn-secondary"
            onClick={handleShowAllKeys}
            disabled={loading}
          >
            Show All Keys
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}

        {/* Search Results */}
        {searchResult && (
          <div className="search-results">
            <h3>Search Results for: {searchKey}</h3>
            <pre>{JSON.stringify(searchResult, null, 2)}</pre>
          </div>
        )}

        {/* All Available Keys */}
        {!searchResult && !loading && allKeys.length > 0 && (
          <div className="all-keys">
            <h3>Available Magic Keys</h3>
            <div className="keys-grid">
              {allKeys.map((key, index) => (
                <div key={index} className="key-item">
                  <code>{renderKeyValue(key)}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Debug Info - Remove this in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="debug-info" style={{ marginTop: '20px', fontSize: '12px', opacity: 0.7 }}>
            <p>Debug: Found {allKeys.length} keys</p>
            {allKeys.length > 0 && (
              <details>
                <summary>Raw API Response</summary>
                <pre style={{ fontSize: '10px', maxHeight: '200px', overflow: 'auto' }}>
                  {JSON.stringify(allKeys, null, 2)}
                </pre>
              </details>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;