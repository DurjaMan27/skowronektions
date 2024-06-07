import React, { useState } from 'react';

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