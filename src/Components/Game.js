import React from "react";
import StartMenu from "./StartMenu";
import Canvas from "./Canvas";
import GameOverMenu from "./GameOverMenu";
import { useState } from "react";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [lanesNum, setLanesNum] = useState();
  const [username, setUsername] = useState();
  const [inGameOverScreen, setInGameOverScreen] = useState(false);
  const [gameOverInf, setGameOverInf] = useState({
    message: "no cause",
    score: 0,
  });

  const handleStart = (inpVal) => {
    setLanesNum(inpVal.lanesNum);

    setUsername(inpVal.username);

    setGameStarted(true);
  };

  const handleGameEnd = (gameEnd) => {
    gameEnd.username = username;
    gameEnd.lanesNum = lanesNum;

    setGameStarted(false);

    setInGameOverScreen(true);

    setGameOverInf(gameEnd);
  };

  const resetGame = () => {
    setInGameOverScreen(false);

    setGameStarted(false);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#000000",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        {inGameOverScreen ? (
          <GameOverMenu onClick={resetGame} end={gameOverInf} />
        ) : gameStarted ? (
          <Canvas lanesNum={lanesNum} gameEndHandler={handleGameEnd} />
        ) : (
          <StartMenu onClick={handleStart} lanesNum={lanesNum} username={username}/>
        )}
      </ThemeProvider>
    </div>
  );
};

export default Game;
