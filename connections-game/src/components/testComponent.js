import React, { useState } from 'react';


/*
const [numWrongGuesses, setGuesses] = useState([0])
const incWrongGuesses = () => {
    setGuesses(numWrongGuesses + 1);
}

useEffect(() => {
    console.log("hello");
}, []);

const [gameboardItems, setGameboardItems] = useState([])
const generateGameboardItems = () => {
    // will use randomizer to fill in values of gameboardItems
    // will be passed to GameBoard component to fill in blocks
}
const updateOrderGameboardItems = () => {
    // will be used to move correct Guesses to the top of the list
    // will also be used to reshuffle board
}
const select = (name) => {
    // will set the selected parameter to true for a certain guess
    // will make sure that the number of selected items is less than 4 before doing so
}
const unselectAll = () => {
    // will set the selected parameter to false for all items in gameboard
}
const unselectOne = (name) => {
    // will set the selected parameter to false for a certain guess
}

const [previousGuesses, setPreviousGuesses] = useState([])
const submit = () => {
    // submits the guess
    // checks previous guesses to see if it already exists
        // if yes, returns a message that guess has already been made and does nothing
        // if no, adds guess to previousGuesses
    // checks if guess is correct or not
}
const correctGuess = () => {
    // moves the correct guesses to the front of the list and sets their guessed value to right
}
const wrongGuess = () => {
    setGuesses(numWrongGuesses + 1);
    changeBackgroundColor();
    checkGameOver();
}

const checkGameOver = () => {
    if(numWrongGuesses >= 4) {
        // bring up a game over page, along with a button to play again
    }
}
const showCorrect = () => {
    // maybe later
}

const [bgColor, setBgColor] = useState(['black', 'black', 'black', 'black']);
    // Function to change the background color
    const changeBackgroundColor = () => {
    const updatedColors = [...bgColor];
    updatedColors[numWrongGuesses - 1] = "beige";
    setBgColor(updatedColors);
};
*/





const TestComponent = () => {
    const [message, setMessage] = useState("Welcome to the game!");

    return (
        <div>
            <h2>{ message }</h2>
            <button onClick={() => setMessage('Button clicked!')}>Click Me</button>
        </div>
    );
};

export default TestComponent;