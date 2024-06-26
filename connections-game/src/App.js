import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import StartScreen from './components/StartScreen';
import ReplayScreen from './components/ReplayScreen';
import Mistakes from './components/Mistakes';
import Buttons from './components/Buttons';
import sequence from './components/data';

function App() {

  const _ = require('lodash');

  const [options, setOptions] = useState(sequence("hard"));

  // counts number of mistakes (default 0, max 4)
  const [totalMistakes, setMistakes] = useState(-1);
  const incMistakes = () => {
    setMistakes((prevMistakes) => prevMistakes + 1);
  };

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
    let temp = new Set();
    previousGuesses.forEach(set => {
      temp.add(set)
    });
    let newguesses = new Set();
    currentSelected.forEach(guess => {
      newguesses.add(guess);
    })
    temp.add(newguesses);
    setPrevGuesses(temp);
  }

  const [correctGuesses, setCorrectGuesses] = useState(-1);
  const incCorrect = () => {
    setCorrectGuesses((prevCorrect) => prevCorrect + 1);
  }

  const shuffle = () => {
    let currentIndex = options.length;
    let temp = [...options]
    let FLOOR = 0;
    if(correctGuesses >= 0) {
      FLOOR  = correctGuesses * 4;
    }

    while(currentIndex > FLOOR) {
      let randomIndex = Math.floor(Math.random() * (currentIndex - FLOOR) + FLOOR);
      currentIndex--;
      [temp[currentIndex], temp[randomIndex]] = [temp[randomIndex], temp[currentIndex]];
    }
    setOptions(temp);
  }

  const submit = () => {
    let equal = false;
    setTimeout(() => {}, 500)
    previousGuesses.forEach(guess => {
      if(_.isEqual(guess, currentSelected)) {equal = true;}
    })
    if(equal) {
      alert("already guessed...");
    } else {
      addGuess();
      let currGroup = checkGuesses();

      if(currGroup === -1) {
        incMistakes();
      } else {
        incCorrect();
      }
    }
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
    console.log("Use effect on correct guesses");
    if(correctGuesses > 0) {
      let temp = [];
      let groupsSolved = new Set();
      for(let i = 0; i < (correctGuesses - 1) * 4; i++) {
        temp.push(options[i]);
        groupsSolved.add(options[i].group); // adds group that have been solved
      }

      let currentGroup = 0;
      let index = 0;
      while(currentGroup === 0) {
        if(currentSelected.has(options[index].name)) {
          currentGroup = options[index].group;
        }
        index++;
      }

      for(let j = 0; j < 16; j++) {
        if(options[j].group === currentGroup) {
          temp.push(options[j]);
          temp[temp.length - 1].guessed = true;
          groupsSolved.add(options[j].group);
        }
      }

      for(let k = 0; k < 16; k++) {
        if(!groupsSolved.has(options[k].group)) {
          temp.push(options[k]);
        }
      }

      setOptions(temp);
    }
    deselectAll();

  }, [correctGuesses])

  const [gameStage, setGameStage] = useState("start");
  const getVisibility = (component) => {
    if(component === "startscreen") {
      if(gameStage === "start") {
        return "visible";
      }
    } else if(component === "gameboard" || component === "mistakes" || component === "buttons") {
      if(gameStage === "playing") {
        return "visible";
      }
    } else if(component === "replayscreen") {
      if(gameStage === "lost" || gameStage === "won") {
        return "visible";
      }
    }
    return "hidden";
  }
  useEffect(() => {
    console.log("Use effect on correct guesses and totalMistakes together");
    if(correctGuesses === -1 && totalMistakes === -1) {
      setGameStage("start");
    } else if(correctGuesses === 0 && totalMistakes === 0) {
      setGameStage("playing");
    } else if(totalMistakes === 4) {
      setTimeout(() => {}, 500);
      setGameStage("lost");
    } else if(correctGuesses === 4) {
      setGameStage("won");
    }
  }, [correctGuesses, totalMistakes])

  const startgame = () => {
    options.forEach(option => {
      option.guessed = false;
    })

    let test = sequence("hard");
    setOptions(test);

    setCorrectGuesses(0);
    setMistakes(0);
    setPrevGuesses(new Set());
    setSelected(new Set());

    shuffle();
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Skowronektions</h1>
          <div className="inspiration">
            <h4>Inspired by NYT's "Connections"</h4>
          </div>
        </header>
      </div>
      <div className="main">
        <div className="buttons" style={{visibility: getVisibility("buttons")}}>
          <Buttons selected={currentSelected} shuffle={shuffle} deselect={deselectAll} submit={submit}/>
        </div>
        <div className="Game-area">
          <StartScreen visibility={getVisibility("startscreen")} stage={gameStage} startGame={startgame}/>
          <ReplayScreen options={options} visibility={getVisibility("replayscreen")} stage={gameStage} replay={startgame}/>
          <GameBoard correct={correctGuesses} mistakes={totalMistakes} visibility={getVisibility("gameboard")} stage={gameStage} selected={currentSelected} options={options} selectFunc={changedSelected}/>
        </div>
        <div className="mistakes" stage={gameStage} style={{visibility: getVisibility("mistakes")}}>
          <Mistakes totalMistakes={totalMistakes}/>
        </div>
      </div>
    </>
  );
}

export default App;
