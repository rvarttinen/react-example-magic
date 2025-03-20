import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="centerPiece">
          <input
            type="text"
            name="search"
            id="search"
          />
          <button class="btn btn-sm">
            Search
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;