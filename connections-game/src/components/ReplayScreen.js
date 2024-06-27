import React, { useState, useEffect } from 'react';

/**
 * Parameters/Props:
 * - options: all options that are available on the game board
 * - visibility: states whether the component should be shown at this stage
 * - stage: what stage of the game we are in
 * - replay: a function to replay the game (essentially to start a new game with all new groups and choices)
 *
 * Returns:
 * An ending screen which displays the corresponding won/lost message and an option to play again after the game ends
 */

const ReplayScreen = ( { options, visibility, stage, replay }) => {

  // holds font colors for answers at the end
  const COLORARR = ["#234CEC", "green", "yellow", "#D72121"]

  // message starts off as sorry you lost but changes depending on stage
  const [message, setMessage] = useState("Sorry, you lost...");

  // the groups list is to hold the strings of answers to be shown at the end
  const [groupsList, setGroupsList] = useState(["", "", "", ""]);

  // the group names are to be shown at the end
  const [groupName, setGroupNames] = useState(["", "", "", ""]);

  // to update the message to parameter
  const checkMessage = (newMessage) => {
    setMessage(newMessage);
  }


  // whenever stage is changed, update to necessary message and add the correct values into the respective groups and names
  useEffect(() => {
    if(stage === "lost") {
      checkMessage("Sorry, you lost...");
    } else if(stage === "won") {
      checkMessage("Congrats, you got it!");
    }
    let temp = ["", "", "", ""];
    let names = ["", "", "", ""];
    options.forEach(option => {
      if(temp[option.group - 1] === "") {
        temp[option.group - 1] = option.name;
        names[option.group - 1] = option.groupName;
      } else {
        temp[option.group - 1] += ", " + option.name;
      }
    })
    setGroupsList(temp);
    setGroupNames(names);
  }, [stage])


  return (
    <>
      <div className="beginning" style={{visibility: visibility}}>
        <h1 style={{color: "white"}}>{message}</h1>
        <div className="answers" style={{margin: "10px", fontSize: "20px"}}>
          <h4 style={{color: COLORARR[0]}}>"{groupName[0]}": {groupsList[0]}</h4>
          <h4 style={{color: COLORARR[1]}}>"{groupName[1]}": {groupsList[1]}</h4>
          <h4 style={{color: COLORARR[2]}}>"{groupName[2]}": {groupsList[2]}</h4>
          <h4 style={{color: COLORARR[3]}}>"{groupName[3]}": {groupsList[3]}</h4>
        </div>
        <button onClick={replay}>Play Again</button>
      </div>
    </>
  );
};

export default ReplayScreen;