import React, { useState, useEffect } from 'react';

const ReplayScreen = ( { options, visibility, stage, replay }) => {

  const COLORARR = ["#234CEC", "green", "yellow", "#D72121"]

  const [message, setMessage] = useState("Sorry, you lost...");
  const checkMessage = (newMessage) => {
    setMessage(newMessage);
  }
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

  const [groupsList, setGroupsList] = useState(["", "", "", ""]);
  const [groupName, setGroupNames] = useState(["", "", "", ""]);

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