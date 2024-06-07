import logo from './logo.svg';
import './App.css';
import TestComponent from './components/testComponent';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>This is my game</h1>
          <p>Let's build a game!</p>
          <TestComponent />
        </header>
      </div>
      <div className="Game-area">
        <p>This content is below the header</p>
        <div className="Gameboard">
          <div><p>This is first block</p></div>
          <div><p>This is second block</p></div>
          <div><p>This is third block</p></div>
          <div><p>This is fourth block</p></div>
        </div>
      </div>
    </>
  );
}

export default App;
