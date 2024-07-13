import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Parameters/Props:
 * - generate: a function to generate the options for the game
 * - shuffle: a function to shuffle all options in the list
 * - correct: the total number of correct guesses made in the current game
 * - mistakes: the total number of mistakes made in the current game
 * - visibility: states whether the component should be shown at this stage
 * - stage: what stage of the game we are in
 * - selected: a set of all selected options currently
 * - options: all options that are available on the game board
 * - selectedFunc: a function to update the selected list, either by removing or adding a name
 *
 * Returns:
 * The middle screen with all options -- the main interactive component of the game, updating when changes to options,selected, etc. are made
 */

const GameBoard = ( { generate, shuffle, correct, mistakes, visibility, stage, selected, options, selectFunc } ) => {

  // holds CSS border values for different classes of options (unselected, selected, correct (each group gets a different color))
  const UNSELECTED = "1px beige solid";
  const SELECTED = "5px beige solid";
  const COLORARR = ["5px #234CEC solid", "5px green solid", "5px yellow solid", "5px #D72121 solid"];

  // border will now hold the border (selected value CSS) for each of options
  const [border, setBorder] = useState({});

  // determines whether it is the first time the player is seeing the board (so that the options can be generated) --> this resets to true for every new game
  const [firstTime, setFirstTime] = useState(true);

  // state that determines whether any more selections can be clicked (false if number of selected options is 4)
  const [clickable, setClickable] = useState(true);

  // used to determine when the div should animate (changes the div to animated version whenever an error is made after submitting)
  const [animate, setAnimate] = useState(false);

  // returns the right color based on group Number (just an abstraction for ease of use)
  const returnColor = (groupNum) => {
    return COLORARR[groupNum - 1];
  }

  const refMistakes = useRef(mistakes);
  const refSelected = useRef(selected);

  useEffect(() => {
    if( (stage === "won" || stage === "lost") && !firstTime) {
      let temp = {};
      options.forEach((option) => {
        temp[option.name] = returnColor(option.group);
      });
      setBorder(temp);
      setClickable(false);
      setFirstTime(true);
    } else if(mistakes !== refMistakes.current) {
      refMistakes.current = mistakes;
      if(mistakes > 0) {
        setAnimate(true);
        setTimeout(() => {setAnimate(false)}, 2500)
      }
    } else if(selected.size > 0) {
      let temp = {...border};
      options.forEach((option) => {
        if(option.guessed) {
          temp[option.name] = returnColor(option.group);
        } else {
          border[option.name] === SELECTED ? temp[option.name] = SELECTED : temp[option.name] = UNSELECTED;
        }
      });
      setBorder(temp);
    } else if(selected.size === 0 && selected !== refSelected.current) {
      refSelected.current = selected;
      let temp = {...border};
      options.forEach((option) => {
        if(option.guessed) {
          temp[option.name] = returnColor(option.group);
        } else {
          border[option.name] === SELECTED ? temp[option.name] = SELECTED : temp[option.name] = UNSELECTED;
        }
      });
      setBorder(temp);
    }

    /*if(visibility === "hidden") {
      // do nothing
    }*/


    else if(correct === 0 && mistakes === 0) {
      if(stage === "playing") {
        if(firstTime) {
          setFirstTime(false);
          generate();
          let temp = {};
          options.forEach((option) => {
            temp[option.name] = UNSELECTED
          });
          setBorder(temp);
          setClickable(true);
          shuffle();
        }
      }
    }
  }, [generate, shuffle, correct, mistakes, refMistakes, visibility, stage, selected, options, selectFunc, border, refSelected]);


  // function to check whether the name being passed in has been guessed correctly already
  const checkGuessed = (name) => {
    for(let i = 0; i < 16; i++) {
      if(options[i].name === name) {
        return options[i].guessed;
      }
    }
  }


  // function to determine whether a block should be selected or unselected when clicked on (also calls function to add/remove block from selected list and change border)
  const clickOrUnclick = (name) => {
    const temp = {...border};
    if(selected.has(name)) {
      temp[name] = UNSELECTED;
      setBorder(temp);
      selectFunc(false, name);
    } else if(clickable && !checkGuessed(name)) {
      temp[name] = SELECTED;
      setBorder(temp);
      selectFunc(true, name);
    }
  }


  // ----------------------------------------------------------------
  return (
    <>
      <div className={`Gameboard${animate ? 'Animate' : ''}`} style={{visibility: visibility}}>
        {options.map((item, index) => (
          <div onClick={() => clickOrUnclick(item.name)} key={index} className={"options"} style={{border: border[item.name]}}>
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
