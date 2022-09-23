import React from "react";
import StartMenu from "./StartMenu";
import Canvas from "./Canvas";
import { useState } from "react";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [lanesNum, setLanesNum] = useState(3);

  const handleStart = (inpVal) => {
    setLanesNum(inpVal)
    setGameStarted(true);
  };

  return (
    <div>
        {gameStarted ? <Canvas lanesNum={lanesNum}/> : <StartMenu onClick={handleStart}/>}
    </div>);
};

export default Game;