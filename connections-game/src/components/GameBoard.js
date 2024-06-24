import React, { useState } from 'react';

const GameBoard = ( { options } ) => {
  const [message, setMessage] = useState("Check it out");

  const printoptions = () => {
    options.forEach(option => {
      console.log(option)
    });
  };

  return (
    <>
      {options.map((item, index) => (
        <div key={index} className={"options"}>
          {item}
        </div>
      ))}
    </>
  );
};

export default GameBoard;