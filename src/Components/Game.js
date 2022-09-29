import React from "react";
import StartMenu from "./StartMenu";
import Canvas from "./Canvas";
import GameOverMenu from "./GameOverMenu";
import { useState } from "react";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [lanesNum, setLanesNum] = useState(3);
  const [inGameOverScreen, setinGameOverScreen] = useState(false);
  const [gameOverInf,setGameOverInf] = useState({message:"no cause", score:0})

  const handleStart = (inpVal) => {
    setLanesNum(inpVal);
    setGameStarted(true);
  };

  const handleGameEnd = (gameEnd) => {
    setGameStarted(false);
    setinGameOverScreen(true);
    setGameOverInf(gameEnd);
  }

  const resetGame=() => {
    setinGameOverScreen(false);
    setGameStarted(false);
    setLanesNum(3);
  }


  return (
    <div>
        {inGameOverScreen
        ? <GameOverMenu onClick={resetGame} end={gameOverInf}/>
        : gameStarted 
          ? <Canvas lanesNum={lanesNum} gameEndHandler={handleGameEnd}/>
          : <StartMenu onClick={handleStart}/>}
    </div>);
};

export default Game;