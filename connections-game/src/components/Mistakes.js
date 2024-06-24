import React, { useState, useEffect } from 'react';

const Mistakes = ( { totalMistakes } ) => {
  const [bgColor, setBgColor] = useState(["black", "black", "black", "black"]);

  // this useEffect will run every time totalMistakes (a prop from the root component) is changed
  // when TotalMistakes is changed (because the user has made a mistake), the mistake color will be updated accordingly
  useEffect(() => {
    if(totalMistakes > 0) {
      let temp = bgColor;
      temp[totalMistakes - 1] = "beige";
      setBgColor(temp);
    }
  }, [totalMistakes]);

  return (
    <>
      <h1>Mistakes</h1>
      <div className="mistakeCircles">
        <div id="mistake0" style={{
                              width: '5px',
                              height: '5px',
                              backgroundColor: bgColor[0],
                            }}></div>
        <div id="mistake1" style={{
                              width: '5px',
                              height: '5px',
                              backgroundColor: bgColor[1],
                            }}></div>
        <div id="mistake2" style={{
                              width: '5px',
                              height: '5px',
                              backgroundColor: bgColor[2],
                            }}></div>
        <div id="mistake3" style={{
                              width: '5px',
                              height: '5px',
                              backgroundColor: bgColor[3],
                            }}></div>
      </div>
    </>
  );
};

export default Mistakes;

/**
 * <h1>Mistakes</h1>
    <div className="mistakeCircles">
      <div id="mistake0" style={{
                            width: '5px',
                            height: '5px',
                            backgroundColor: bgColor[0],
                          }}></div>
      <div id="mistake1" style={{
                            width: '5px',
                            height: '5px',
                            backgroundColor: bgColor[1],
                          }}></div>
      <div id="mistake2" style={{
                            width: '5px',
                            height: '5px',
                            backgroundColor: bgColor[2],
                          }}></div>
      <div id="mistake3" style={{
                            width: '5px',
                            height: '5px',
                            backgroundColor: bgColor[3],
                          }}></div>
    </div>
 */