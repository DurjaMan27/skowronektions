import React, { useState } from 'react';

const StartScreen = ( { stage, visibility, startGame }) => {

    return (
        <>
            <div className="beginning" style={{visibility: visibility}}>
                <h1 style={{color: "white"}}>Welcome to Skowronektions, the NFL-themed Connections game!</h1>
                <button onClick={startGame}>Start Game</button>
            </div>
        </>
    );
};

export default StartScreen;
// <div className="beginning" style={{visibility: visibility}}>
// <div className="beginning" style={{visibility: "visible"}}>