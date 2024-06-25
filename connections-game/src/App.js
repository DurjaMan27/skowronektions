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

  const [options, setOptions] = useState([{name: "Ravens", group: 1, guessed: false},
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
                                          {name: "Washington", group: 4, guessed: false}]
                                        );

  // counts number of mistakes (default 0, max 4)
  const [totalMistakes, setMistakes] = useState(0);
  const incMistakes = () => {
    setMistakes((prevMistakes) => prevMistakes + 1);
  };
  useEffect(() => {
    if(totalMistakes >= 4) {
      console.log("game over");
    }
  }, [totalMistakes]);

  // number of selected blocks
  const [currentSelected, setSelected] = useState(new Set());
  const changedSelected = (add, name) => {
    if(add) {
      if(currentSelected.size < 4) {
        setSelected((prevSet) => new Set(prevSet).add(name));
      }
    } else {
      let temp = currentSelected;
      temp.delete(name);
      setSelected(new Set(temp));
    }
  }
  const deselectAll = () => {
    setSelected(new Set());
  }

  // keeps track of previous guesses
  const [previousGuesses, setPrevGuesses] = useState(new Set());
  const addGuess = () => {
    setPrevGuesses((prevGuesses) => new Set(prevGuesses).add(currentSelected));
    console.log(previousGuesses);
  }

  const [correctGuesses, setCorrectGuesses] = useState(0);
  const incCorrect = () => {
    setCorrectGuesses((prevCorrect) => prevCorrect + 1);
  }

  const shuffle = () => {
    let currentIndex = options.length;
    let temp = [...options]
    const FLOOR = correctGuesses * 4;

    while(currentIndex !== FLOOR) {
      let randomIndex = Math.floor(Math.random() * (currentIndex - FLOOR) + FLOOR);
      currentIndex--;
      [temp[currentIndex], temp[randomIndex]] = [temp[randomIndex], temp[currentIndex]];
    }
    setOptions(temp);
  }

  const submit = () => {
    if(previousGuesses.has(currentSelected)) {
      alert("already guessed...");
    } else {
      addGuess();
      let currGroup = checkGuesses();

      if(currGroup === -1) {
        incMistakes();
      } else {
        console.log("all good!");
        incCorrect();
      }
    }

    console.log(options);
  };

  const checkGuesses = () => {
    let currGroup = 0;
    currentSelected.forEach((selection) => {
      for(let i = 0; i < options.length; i++) {
        if(options[i].name === selection) {
          if(currGroup === 0) {
            currGroup = options[i].group;
          } else if (currGroup !== options[i].group) {
            currGroup = -1;
          }
        }
      }
    });
    return currGroup;
  }

  useEffect(() => {
    let temp = [...options]
    if(correctGuesses > 0) {
      const guesses = Array.from(currentSelected);
      for(let i = 0; i < guesses.length; i++) {
        for(let j = i; j < options.length; j++) {
          if(options[j].name === guesses[i]) {
            temp[j].guessed = true;
            [temp[i + ((correctGuesses - 1) * 4)], temp[j]] = [temp[j], temp[i + ((correctGuesses - 1) * 4)]];
          }
        }
      }
    }
    deselectAll();
    setOptions(temp);
  }, [correctGuesses])

  const [gameStage, setGameStage] = useState("playing");
  const getVisibility = (component) => {
    if((component === "startscreen" || component === "replayScreen") && gameStage === "playing") {
      return "hidden";
    } else if((component === "gameboard" || component === "buttons" || component === "mistakes") && gameStage !== "playing") {
      return "hidden";
    } else {
      return "visible";
    }
  }
  // useEffect(() => {
  //   if(correctGuesses === 0 && totalMistakes === 0) {
  //     setGameStage("start");
  //   } else if(totalMistakes === 4) {
  //     setGameStage("lost");
  //   } else if(correctGuesses === 4) {
  //     setGameStage("won");
  //   }
  // }, [correctGuesses, totalMistakes])

  useEffect(() => {
    if(gameStage === "start") {
      // show start screen
    } else if(gameStage === "lost") {
      // show lost and replay screen
    } else if(gameStage === "won") {
      // show won and replay screen
    } else if(gameStage === "playing") {
      // show gameboard screen
    }
  }, [gameStage])

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Skowronektions</h1>
          <div className="inspiration">
            <h4>Inspired by NYT's "Connections".</h4>
          </div>
        </header>
      </div>
      <div className="main">
        <div className="buttons" style={{visibility: getVisibility("buttons")}}>
          <Buttons selected={currentSelected} shuffle={shuffle} deselect={deselectAll} submit={submit}/>
        </div>
        <div className="Game-area">
          <StartScreen stage={gameStage} visibility={getVisibility("startscreen")} startGame={() => console.log("start game!")}/>
          <ReplayScreen stage={gameStage} replay={() => console.log("replay")}/>
          <GameBoard visibility={getVisibility("gameboard")} selected={currentSelected} options={options} selectFunc={changedSelected}/>
        </div>
        <div className="mistakes" style={{visibility: getVisibility("mistakes")}}>
          <Mistakes totalMistakes={totalMistakes}/>
        </div>
      </div>
    </>
  );

  return (
    <div className="Game-area">

    </div>
  );
}

export default App;

// const list = ["HELLO", "WORLD", "HERE", "LONGBOAT", "AM", "THIS", "DECOR", "SOMETHING", "THAT", "DOES", "SUITABLE", "COOL", "NICE", "LOVING", "BRILLIANT", "THANKS"]
