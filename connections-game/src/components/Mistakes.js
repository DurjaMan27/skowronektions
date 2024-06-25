import React, { useState, useEffect } from 'react';

const Mistakes = ( { stage, totalMistakes } ) => {
  const [bgColor, setBgColor] = useState(["black", "black", "black", "black"]);

  // this useEffect will run every time totalMistakes (a prop from the root component) is changed
  // when TotalMistakes is changed (because the user has made a mistake), the mistake color will be updated accordingly
  useEffect(() => {
    let temp = [...bgColor]
    if(totalMistakes > 0) {
      temp[totalMistakes - 1] = "beige";
      setBgColor(temp);
    } else if(totalMistakes === 0) {
      for(let i = 0; i < 4; i++) {
        temp[i] = "black";
        setBgColor(temp);
      }
    }
  }, [totalMistakes]);

  return (
    <>
      <h1>Mistakes</h1>
      <div className="mistakeCircles">
        <div id="mistake1" style={{backgroundColor: bgColor[0]}}></div>
        <div id="mistake2" style={{backgroundColor: bgColor[1]}}></div>
        <div id="mistake3" style={{backgroundColor: bgColor[2]}}></div>
        <div id="mistake4" style={{backgroundColor: bgColor[3]}}></div>
      </div>
    </>
  );
};

export default Mistakes;