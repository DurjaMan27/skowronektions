import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TestComponent from './components/testComponent';
import GameBoard from './components/GameBoard';
import { findBlock, makeSelection, reshuffleBoard, deselectAll, countSelectedItems, submit, correctGuess, wrongGuess, checkPreviousGuesses} from './components/functions';

function App() {
  const [component, setComponents] = useState(["here is component 1", "here is component 2"])
    // component --> the current state value
    // setComponents --> a function that updates the state value
    // values inside useState --> the initial value of the state, which can be of any type

  const trythis = ( { comp }) => {
    console.log(`This is the component right here : ${comp}`);
  }

  const bgColor = ["black", "black", "black", "black"];

  const list = ["HELLO", "WORLD", "HERE", "LONGBOAT", "AM", "THIS", "DECOR", "SOMETHING", "THAT", "DOES", "SUITABLE", "COOL", "NICE", "LOVING", "BRILLIANT", "THANKS"]

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Skowronektions</h1>
        </header>
      </div>
      <div className="main">
        <div className="buttons">
          <button onClick={() => trythis(bgColor[0])}>Shuffle</button>
          <button>Unselect All</button>
          <button>Submit</button>
        </div>
        <div className="Game-area">
          <div className="Gameboard">
            <GameBoard options={list} />
          </div>
        </div>
        <div className="mistakes">
          <h1>Mistakes</h1>
          <div className="mistakeCircles">
            <div id="mistake0" style={{
                                  width: '5px',
                                  height: '5px',
                                  backgroundColor: bgColor[0],
                                }}></div>
            <div id="mistake1" style={{
                                  width: '5px',
                                  height: '5px',
                                  backgroundColor: bgColor[1],
                                }}></div>
            <div id="mistake2" style={{
                                  width: '5px',
                                  height: '5px',
                                  backgroundColor: bgColor[2],
                                }}></div>
            <div id="mistake3" style={{
                                  width: '5px',
                                  height: '5px',
                                  backgroundColor: bgColor[3],
                                }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
