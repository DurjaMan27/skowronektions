import logo from './logo.svg';
import './App.css';
import TestComponent from './components/testComponent';

function App() {
  const [component, setComponents] = useState(["here is component 1", "here is component 2"])
    // component --> the current state value
    // setComponents --> a function that updates the state value
    // values inside useState --> the initial value of the state, which can be of any type
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>This is my game</h1>
          <p>Let's build a game!</p>
          <TestComponent />
        </header>
      </div>
      <div className="main">
        <div className="Game-area">
          <p>This content is below the header</p>
          <div className="Gameboard">
            <div className="list-item"><p>This is first block</p></div>
            <div className="list-item"><p>This is second block</p></div>
            <div className="list-item"><p>This is third block</p></div>
            <div className="list-item"><p>This is fourth block</p></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
