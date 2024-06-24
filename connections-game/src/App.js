import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TestComponent from './components/testComponent';
import GameBoard from './components/GameBoard';
import StartScreen from './components/StartScreen';
import ReplayScreen from './components/ReplayScreen';
import Mistakes from './components/Mistakes';
import Buttons from './components/Buttons';
import { findBlock, makeSelection, reshuffleBoard, deselectAll, countSelectedItems, submit, correctGuess, wrongGuess, checkPreviousGuesses} from './components/functions';

function App() {

  // counts number of mistakes (default 0, max 4)
  const [totalMistakes, setMistakes] = useState(0);
  const incMistakes = () => {
    setMistakes(totalMistakes + 1);
    console.log(totalMistakes);
  };
  useEffect(() => {
    if(totalMistakes >= 4) {
      console.log("game over");
    }
  }, [totalMistakes]);

  // number of selected blocks
  const [currentSelected, setSelected] = useState([]);
  const changedSelected = (add, name) => {
    if(add) {
      if(currentSelected.length === 4) {
        console.log("you have already selected 4 choices");
      } else {
        setSelected([...currentSelected, name]);
      }
    } else {
      setSelected(currentSelected.filter(item => item != name));
    }
  }
  useEffect(() => {
    if(currentSelected.length === 4) {
      console.log("time to lock everything down");
    }
  }, [currentSelected])


  let actualList = [{name: "Ravens", group: 1, guessed: false},
                      {name: "Harbaugh", group: 2, guessed: false},
                      {name: "M&T", group: 3, guessed: false},
                      {name: "Dallas", group: 4, guessed: false},
                      {name: "Steelers", group: 1, guessed: false},
                      {name: "Reid", group: 2, guessed: false},
                      {name: "CenturyLink", group: 3, guessed: false},
                      {name: "New York", group: 4, guessed: false},
                      {name: "Browns", group: 1, guessed: false},
                      {name: "McDaniel", group: 2, guessed: false},
                      {name: "SoFi", group: 3, guessed: false},
                      {name: "Philadelphia", group: 4, guessed: false},
                      {name: "Bengals", group: 1, guessed: false},
                      {name: "Payton", group: 2, guessed: false},
                      {name: "AT&T", group: 3, guessed: false},
                      {name: "Washington", group: 4, guessed: false},];

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Skowronektions</h1>
        </header>
      </div>
      <div className="main">
        <StartScreen />
        <ReplayScreen />
        <div className="buttons">
          <Buttons shuffle={() => console.log("shuffle")} deselect={() => console.log("deselect")} submit={() => console.log("submit")}/>
        </div>
        <div className="Game-area">
          <div className="Gameboard">
            <GameBoard selected={currentSelected} options={actualList} />
          </div>
        </div>
        <div className="mistakes">
          <Mistakes totalMistakes = { totalMistakes }/>
        </div>
      </div>
    </>
  );
}

export default App;

// const list = ["HELLO", "WORLD", "HERE", "LONGBOAT", "AM", "THIS", "DECOR", "SOMETHING", "THAT", "DOES", "SUITABLE", "COOL", "NICE", "LOVING", "BRILLIANT", "THANKS"]
