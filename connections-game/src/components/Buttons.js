import React, { useState, useEffect } from 'react';

const Buttons = ( { selected, shuffle, deselect, submit } ) => {
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setDisabled(selected.size !== 4);
  }, [selected]);

  return (
    <>
      <button onClick={shuffle}>Shuffle</button>
      <button onClick={deselect}>Unselect All</button>
      <button disabled={disabled} onClick={submit}>Submit</button>
    </>
  );
};

export default Buttons;