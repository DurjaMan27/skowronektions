import React, { useState } from 'react';

const Buttons = ( { shuffle, deselect, submit } ) => {
  const [message, setMessage] = useState("Check it out");

  return (
    <>
      <button onClick={shuffle}>Shuffle</button>
      <button onClick={deselect}>Unselect All</button>
      <button onClick={submit}>Submit</button>
    </>
  );
};

export default Buttons;