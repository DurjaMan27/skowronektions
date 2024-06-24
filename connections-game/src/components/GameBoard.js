import React, { useState, useEffect } from 'react';

const GameBoard = ( { selected, options } ) => {

  const [clickable, setClickable] = useState(true);
  const toggleClickable = ( click ) => {
    setClickable(click);
  };

  useEffect(() => {
    if(selected.length === 4) {
      toggleClickable( false );
    } else {
      toggleClickable( true );
    }
  }, [selected]);

  useEffect(() => {

  }, [options]);
  /*
  const printoptions = () => {
    options.forEach(option => {
      console.log(option)
    });
  };*/

  return (
    <>
      {options.map((item, index) => (
        <div key={index} className={"options"}>
          {item.name}
        </div>
      ))}
    </>
  );
};

export default GameBoard;