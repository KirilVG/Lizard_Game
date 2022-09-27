import React from "react";
import * as myConstants from "./Constants";

function StartMenu(props) {
  const [inputText, setInputText] = React.useState("3");

  const handleInput = (event) => {
    setInputText(event.target.value);
  };

  const clickStart = () => {
    let lanesNum = Number(inputText);
    if (!lanesNum) {
      alert("lanes should be a number");
    } else if (lanesNum % 1 !== 0) {
      alert("lanes should be a whole number");
    } else if (lanesNum < myConstants.minLanesNum) {
      alert(`lanes should not be less than ${myConstants.minLanesNum}`);
    } else if (lanesNum > myConstants.maxLanesNum) {
      alert(`lanes should not be more than ${myConstants.maxLanesNum}`);
    } else {
      props.onClick(lanesNum);
    }
  };

  return (
    <div>
      <h1>Welcome to Run Kiro the Lizard.</h1>
      <label>
        Lanes:
        <input onChange={handleInput} placeholder="3" />
      </label>
      <button onClick={clickStart}>Start</button>
    </div>
  );
}

export default StartMenu;
