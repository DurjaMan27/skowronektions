import React, { useState } from 'react';
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

  const [numWrongGuesses, setGuesses] = useState([0])
  const incWrongGuesses = () => {
    setGuesses(numWrongGuesses + 1);
  }

  const [gameboardItems, setGameboardItems] = useState([])
  const generateGameboardItems = () => {
    // will use randomizer to fill in values of gameboardItems
    // will be passed to GameBoard component to fill in blocks
  }
  const updateOrderGameboardItems = (action) => {
    // will be used to move correct Guesses to the top of the list
    // will also be used to reshuffle board
  }
  const select = (name) => {
    // will set the selected parameter to true for a certain guess
    // will make sure that the number of selected items is less than 4 before doing so
  }
  const unselectAll = () => {
    // will set the selected parameter to false for all items in gameboard
  }
  const unselectOne = (name) => {
    // will set the selected parameter to false for a certain guess
  }

  const [previousGuesses, setPreviousGuesses] = useState([])
  const submit = () => {
    // submits the guess
    // checks previous guesses to see if it already exists
      // if yes, returns a message that guess has already been made and does nothing
      // if no, adds guess to previousGuesses
    // checks if guess is correct or not
  }
  const correctGuess = () => {
    // moves the correct guesses to the front of the list and sets their guessed value to right
  }
  const wrongGuess = () => {
    setGuesses(numWrongGuesses + 1);
    checkGameOver();
  }

  const checkGameOver = () => {
    if(numWrongGuesses >= 4) {
      // bring up a game over page, along with a button to play again
    }
  }
  const showCorrect = () => {
    // maybe later
  }

  const list = ["Hello", "world", "here", "I", "am"]

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>This is my game</h1>
          <p>Let's build a game!</p>
          <TestComponent />
          <GameBoard options = { list }/>
        </header>
      </div>
      <div className="main">
        <div className="buttons">
          <button onClick={console.log("shuffling")}>Shuffle</button>
          <button onClick={console.log("Deselecting")}>Unselect All</button>
          <button onClick={console.log("submitting")}>Submit</button>
        </div>
        <div className="Game-area">
          <p>This content is below the header</p>
          <div className="Gameboard">
            <div className="list-item"><p>This is first block</p></div>
            <div className="list-item"><p>This is second block</p></div>
            <div className="list-item"><p>This is third block</p></div>
            <div className="list-item"><p>This is fourth block</p></div>
          </div>
        </div>
        <div className="mistakes">
          <h3>Mistakes Remaining</h3>
        </div>
      </div>
    </>
  );
}

export default App;
