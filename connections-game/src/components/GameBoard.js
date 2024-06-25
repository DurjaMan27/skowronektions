import React, { useState, useEffect } from 'react';

const GameBoard = ( { visibility, selected, options, selectFunc } ) => {

  const UNSELECTED = "1px beige solid";
  const SELECTED = "5px beige solid";
  const COLORARR = ["5px blue solid", "5px green solid", "5px yellow solid", "5px red solid"]
  const returnColor = (groupNum) => {
    return COLORARR[groupNum - 1];
  }

  // border will now hold the border (selected value CSS) for each of options
  const [border, setBorder] = useState({});

  useEffect(() => {
    let temp = {};
    options.forEach((option) => {
      temp[option.name] = UNSELECTED
    });
    setBorder(temp);
  }, []);

  useEffect(() => {
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

  return (
    <>
      <div className="Gameboard" style={{visibility: visibility}}>
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