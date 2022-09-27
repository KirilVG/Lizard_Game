import React from "react";
import StartMenu from "./StartMenu";
import Canvas from "./Canvas";
import GameOverMenu from "./GameOverMenu";
import { useState } from "react";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [lanesNum, setLanesNum] = useState(3);
  const [inGameOverScreen, setinGameOverScreen] = useState(false);
  const [gameOverCause,setGameOverCause] = useState({message:"no cause"})
  const handleStart = (inpVal) => {
    setLanesNum(inpVal);
    setGameStarted(true);
  };

  const handleGameEnd = (gameEnd) => {
    setGameStarted(false);
    setinGameOverScreen(true);
    setGameOverCause(gameEnd)
  }

  const resetGame=() => {
    setinGameOverScreen(false);
    setGameStarted(false);
    setLanesNum(3);
  }


  return (
    <div>
        {inGameOverScreen ? <GameOverMenu onClick={resetGame} cause={gameOverCause}/> : gameStarted ? <Canvas lanesNum={lanesNum} gameEndHandler={handleGameEnd}/> : <StartMenu onClick={handleStart}/>}
    </div>);
};

export default Game;