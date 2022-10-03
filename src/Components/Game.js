import React from "react";
import StartMenu from "./StartMenu";
import Canvas from "./Canvas";
import GameOverMenu from "./GameOverMenu";
import { useState } from "react";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [lanesNum, setLanesNum] = useState(3);
  const [username, setUsername] = useState("Noname");
  const [inGameOverScreen, setInGameOverScreen] = useState(false);
  const [gameOverInf,setGameOverInf] = useState({message:"no cause", score:0})

  const handleStart = (inpVal) => {
    setLanesNum(inpVal.lanesNum);
    setUsername(inpVal.username)
    setGameStarted(true);
  };

  const handleGameEnd = (gameEnd) => {
    gameEnd.username=username;
    gameEnd.lanesNum=lanesNum;
    setGameStarted(false);
    setInGameOverScreen(true);
    setGameOverInf(gameEnd);
    //setLanesNum(3);
  }

  const resetGame=() => {
    setInGameOverScreen(false);
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