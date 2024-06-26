import React, { useState, useEffect } from 'react';

const GameBoard = ( { shuffle, correct, mistakes, visibility, stage, selected, options, selectFunc } ) => {

  const UNSELECTED = "1px beige solid";
  const SELECTED = "5px beige solid";
  const COLORARR = ["5px #234CEC solid", "5px green solid", "5px yellow solid", "5px #D72121 solid"];
  const returnColor = (groupNum) => {
    return COLORARR[groupNum - 1];
  }

  // border will now hold the border (selected value CSS) for each of options
  const [border, setBorder] = useState({});

  useEffect(() => {
    console.log("Use effect upon activation");
    let temp = {};
    options.forEach((option) => {
      temp[option.name] = UNSELECTED
    });
    setBorder(temp);
  }, []);

  useEffect(() => {
    console.log("Use effect on game stage");
    if(correct === 0 && mistakes === 0) {
      if(stage === "playing") {
        shuffle();
      }
      let temp = {};
      options.forEach((option) => {
        temp[option.name] = UNSELECTED
      });
      setBorder(temp);
      setClickable(true);
    } else if(stage === "won" || stage === "lost") {
      let temp = {};
      options.forEach((option) => {
        temp[option.name] = returnColor(option.group);
      });
      setBorder(temp);
      setClickable(false);
    }
  }, [stage])

  useEffect(() => {
    console.log("Use effect on options");
    let temp = {...border};
    options.forEach((option) => {
      // border[option.name] === SELECTED ? temp[option.name] = SELECTED : temp[option.name] = UNSELECTED;
      if(option.guessed) {
        temp[option.name] = returnColor(option.group);
      } else {
        border[option.name] === SELECTED ? temp[option.name] = SELECTED : temp[option.name] = UNSELECTED;
      }
    });
    setBorder(temp);
  }, [options])

  useEffect(() => {
    console.log("Use effect on selected");
    if(selected.size === 0) {
      let temp = {};
      options.forEach((option) => {
        if(option.guessed) {
          temp[option.name] = returnColor(option.group);
        } else {
          temp[option.name] = UNSELECTED;
        }
      });
      setBorder(temp);
    }
    setClickable(selected.size < 4);
  }, [selected]);

  const checkGuessed = (name) => {
    for(let i = 0; i < 16; i++) {
      if(options[i].name === name) {
        return options[i].guessed;
      }
    }
  }

  const [clickable, setClickable] = useState(true);

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

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    console.log("Use effect on mistakes");
    if(mistakes > 0) {
      setAnimate(true);
      setTimeout(() => {setAnimate(false)}, 2500)
    }
  }, [mistakes])

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

// <div className={`Gameboard${animate ? 'Animate' : ''}`} style={{visibility: visibility}}>
// <div className="Gameboard" style={{visibility:visibility}}>