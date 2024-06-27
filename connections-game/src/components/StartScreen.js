import React from 'react';

/**
 * Parameters/Props:
 * - visibility: states whether the component should be shown at this stage
 * - startGame: function to start the game
 *
 * Returns:
 * A beginning screen that is shown every time the user first opens the application
 */

const StartScreen = ( { visibility, startGame }) => {

  return (
    <>
      <div className="beginning" style={{visibility: visibility}}>
        <h1 style={{color: "white"}}>Welcome to Completions, the NFL-themed Connections game!</h1>
        <button onClick={startGame}>Start Game</button>
      </div>
    </>
  );
};

export default StartScreen;