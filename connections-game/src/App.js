import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import StartScreen from './components/StartScreen';
import ReplayScreen from './components/ReplayScreen';
import Mistakes from './components/Mistakes';
import Buttons from './components/Buttons';
import { EASY_LIST, ALL_LIST} from './components/data';

function App() {

  const _ = require('lodash');

  //const [options, setOptions] = useState(sequence("easy"));
  const [options, setOptions] = useState([{name: "Ravens", group: 1, guessed: false}]);
  const loadData = async (difficulty) => {
    if(difficulty === "easy") {
      const { EASY_LIST } = await import('./components/data');
      return EASY_LIST;
    } else if(difficulty === "hard") {
      const { ALL_LIST } = await import('./components/data');
      return ALL_LIST;
    }
  };
  const selectLists = async (difficulty) => {
    const list = await loadData(difficulty);
    console.log(list);
    let groups = [];
    while(groups.length < 4) {
      let potentialNewGroup = list[Math.floor(Math.random() * list.length)];
      if(!groups.includes(potentialNewGroup)) {
        groups.push(potentialNewGroup);
      }
    }
    console.log(groups);
    return groups;
  }
  const pickValues = async (difficulty) => {
    const groups = await selectLists(difficulty);
    let allNames = new Set();
    let tempOptions = [];

    for(let i = 0; i < groups.length; i++){
      let namesAdded = 0
      while(namesAdded < 4) {
        let potentialOption = groups[i][1][Math.floor(Math.random() * groups[i][1].length)];
        if(!allNames.has(potentialOption)) {
          tempOptions.push({name: potentialOption, groupName: groups[i][0][0], group: i + 1, guessed: false});
          allNames.add(potentialOption)
          namesAdded++;
        }
      }
    }
    return tempOptions;
  }
  const generateOptions = async () => {
    const temp = await pickValues("easy");
    setOptions(temp);
  }

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
    if(correctGuesses > 0) {
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
      let message = checkGuesses();

      if(message === "four") {
        incCorrect();
      } else if(message === "three") {
        alert("one away...");
        incMistakes();
      } else {
        incMistakes();
      }
    }
  };

  const checkGuesses = () => {
    let groupIndices = [0,0,0,0];
    currentSelected.forEach((selection) => {
      for(let i = 0; i < options.length; i++) {
        if(options[i].name === selection) {
          groupIndices[options[i].group - 1]++;
        }
      }
    })
    for(let index = 0; index < 4; index++) {
      if(groupIndices[index] === 3) {
        return "three";
      } else if(groupIndices[index] === 4) {
        return "four";
      }
    }
    return "wrong";
  }

  useEffect(() => {
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

    setCorrectGuesses(0);
    setMistakes(0);
    setPrevGuesses(new Set());
    setSelected(new Set());
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Completions</h1>
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
          <GameBoard generate={generateOptions}shuffle={shuffle} correct={correctGuesses} mistakes={totalMistakes} visibility={getVisibility("gameboard")} stage={gameStage} selected={currentSelected} options={options} selectFunc={changedSelected}/>
        </div>
        <div className="mistakes" stage={gameStage} style={{visibility: getVisibility("mistakes")}}>
          <Mistakes totalMistakes={totalMistakes}/>
        </div>
      </div>
    </>
  );
}

export default App;

// const [options, setOptions] = useState([{name: "Ravens", group: 1, guessed: false},
//                                           {name: "Harbaugh", group: 2, guessed: false},
//                                           {name: "M&T", group: 3, guessed: false},
//                                           {name: "Dallas", group: 4, guessed: false},
//                                           {name: "Steelers", group: 1, guessed: false},
//                                           {name: "Reid", group: 2, guessed: false},
//                                           {name: "CenturyLink", group: 3, guessed: false},
//                                           {name: "New York", group: 4, guessed: false},
//                                           {name: "Browns", group: 1, guessed: false},
//                                           {name: "McDaniel", group: 2, guessed: false},
//                                           {name: "SoFi", group: 3, guessed: false},
//                                           {name: "Philadelphia", group: 4, guessed: false},
//                                           {name: "Bengals", group: 1, guessed: false},
//                                           {name: "Payton", group: 2, guessed: false},
//                                           {name: "AT&T", group: 3, guessed: false},
//                                           {name: "Washington", group: 4, guessed: false}]
//                                         );