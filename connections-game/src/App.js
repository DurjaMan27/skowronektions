import logo from './logo.svg';
import './App.css';
import TestComponent from './components/testComponent';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>This is my game</h1>
          <p>Let's build a game!</p>
          <TestComponent />
        </header>
      </div>
  );
}

export default App;
