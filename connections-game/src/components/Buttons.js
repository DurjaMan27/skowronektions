import React, { useState, useEffect } from 'react';

/**
 * Parameters/Props:
 * - selected: a set of all currently selected options
 * - shuffle: a function to shuffle the options
 * - deselect: a function to remove all selected options from the set
 * - submit: a function to submit the currently selected options
 *
 * Returns:
 * The left screen with all button options (shuffle, unselect, and submit)
 */

const Buttons = ( { selected, shuffle, deselect, submit } ) => {

  // controls whether the submit button can be clicked or not
  const [disabled, setDisabled] = useState(true);

  // sets the button to disabled or enabled depending on the selected set's size (must be 4, no more or less)
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
