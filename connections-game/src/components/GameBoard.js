import React, { useState, useEffect, useRef, useMemo } from 'react';

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

const TempBoard = ( { generate, shuffle, correct, mistakes, visibility, stage, selected, options, selectFunc } ) => {

  // holds CSS border values for different classes of options (unselected, selected, correct (each group gets a different color))
  const UNSELECTED = "1px beige solid";
  const SELECTED = "5px beige solid";
  //const COLORARR = ["5px #234CEC solid", "5px green solid", "5px yellow solid", "5px #D72121 solid"];
  const COLORARR = useMemo(() => {
    return ["5px #234CEC solid", "5px green solid", "5px yellow solid", "5px #D72121 solid"]; // Your array values
  }, []);

  // border will now hold the border (selected value CSS) for each of options
  const [border, setBorder] = useState({});

  // determines whether it is the first time the player is seeing the board (so that the options can be generated) --> this resets to true for every new game
  const [firstTime, setFirstTime] = useState(true);

  // state that determines whether any more selections can be clicked (false if number of selected options is 4)
  const [clickable, setClickable] = useState(true);

  // used to determine when the div should animate (changes the div to animated version whenever an error is made after submitting)
  const [animate, setAnimate] = useState(false);

  // const [shuffleConfirm, setShuffle] = useState(false);

  // returns the right color based on group Number (just an abstraction for ease of use)
  // const returnColor = (groupNum) => {
  //   return COLORARR[groupNum - 1];
  // }

  const [shuffledConfirm, setShuffled] = useState(false);

  const refMistakes = useRef(mistakes);
  const refSelected = useRef(selected);
  const refOptions = useRef(options);

  useEffect(() => {
    console.log(options)
  }, [options])

  useEffect(() => {
    if(stage === "won" || stage === "lost") {
      setFirstTime(true);
      setClickable(true);
      setShuffled(false);
    } else if(stage === "playing") {
      if(firstTime) {
        console.log("generating")
        generate();
        setClickable(true);
        let temp = {};
        refOptions.current.forEach((option) => {
          temp[option.name] = UNSELECTED;
        });
        setBorder(temp);
        shuffle();
        setFirstTime(false);
        setShuffled(false);
      }
    }
  }, [stage, generate, shuffle, selected, shuffledConfirm, firstTime, refOptions])

  useEffect(() => {
    if(stage === "playing" && !shuffledConfirm && refOptions.current.length > 1 && !firstTime) {
      setTimeout(() => {
        setFirstTime(false);
        setShuffled(true);
        shuffle();
      }, 100)
    }
    if(options !== refOptions.current) {
      refOptions.current = options;
      let temp = {};
      options.forEach((option) => {
        if(option.guessed) {
          temp[option.name] = COLORARR[option.group - 1];
        } else {
          border[option.name] === SELECTED ? temp[option.name] = SELECTED : temp[option.name] = UNSELECTED;
        }
      })
      setBorder(temp);
    }
  }, [options, shuffle, stage, shuffledConfirm, refOptions, border, COLORARR, firstTime])

  useEffect(() => {
    if(options.length > 1) {
      if(selected !== refSelected.current) {
        let temp = {};
        options.forEach((option) => {
          if(option.guessed) {
            temp[option.name] = COLORARR[option.group - 1];
          } else if(selected.size === 0) {
            temp[option.name] = UNSELECTED;
          } else {
            border[option.name] === SELECTED ? temp[option.name] = SELECTED : temp[option.name] = UNSELECTED;
          }
        })
        setBorder(temp);
        refSelected.current = selected;
      }
      if(selected.size === 4 && clickable) {
        setClickable(false);
      } else if(selected.size < 4 && !clickable) {
        setClickable(true);
      }
    }
  }, [selected, options, options.length, refSelected, border, clickable, COLORARR])

  useEffect(() => {
    if(mistakes !== refMistakes.current) {
      refMistakes.current = mistakes;
      if(mistakes > 0) {
        setAnimate(true);
        setTimeout(() => {setAnimate(false)}, 2500)
      }
    }
  }, [animate, mistakes, refMistakes])


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

export default TempBoard;
