import React, { useState } from 'react';

const GameBoard = ( { options } ) => {
    const [message, setMessage] = useState("Check it out");

    const printoptions = (options) => {
        options.forEach(option => {
            console.log(option)
        });
    };

    return (
        <div>
            <h2>{ message }</h2>
            <button onClick={(options) => printoptions(options)}>Test This One</button>
        </div>
    );
};

export default GameBoard;