import React from "react";

function StartMenu(props) {
  const [inputText, setInputText] = React.useState("3");

  const handleInput = (event) => {
    setInputText(event.target.value);
  };

  const clickStart = () => {
    let lanesNum = Number(inputText) || 3;
    props.onClick(lanesNum);
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