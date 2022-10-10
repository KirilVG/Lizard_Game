import React from "react";
import { useState } from "react";
import * as myConstants from "./Constants";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import { Stack } from "react-bootstrap";

function GameOverMenu(props) {
  const [gameScoreSaved, setGameScoreSaved] = useState(false);

  const clickContinue = () => {
    props.onClick();
  };

  const saveScore = () => {
    let lanesAsString = String(props.end.lanesNum);

    let scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
    if (!scoreboard) scoreboard = {};

    let currentScores = scoreboard[lanesAsString];
    if (!currentScores) currentScores = [];

    currentScores.push({
      username: props.end.username,
      lanesNum: props.end.lanesNum,
      score: props.end.score,
      causeOfDeath: props.end.message,
      discMode: myConstants.useDiscoMode,
    });

    currentScores.sort((a, b) => b.score - a.score);

    if (currentScores.length > myConstants.maximumNumberOfScores)
      currentScores.pop();

    scoreboard[lanesAsString] = currentScores;

    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));

    setGameScoreSaved(true);
  };

  const displayScores = () => {
    let lanesAsString = String(props.end.lanesNum);
    let scoreboard = JSON.parse(localStorage.getItem("scoreboard"));

    if (!scoreboard[lanesAsString]) return <li>no current scores</li>;

    let arr = [];

    for (let i = 0; i < scoreboard[lanesAsString].length; i++) {
      arr.push(
        <li key={i} >
            <div style={{backgroundColor: "white", borderRadius:"1vh"}}>
                <h1 style={{color: "black",fontSize:"2vh"}}>{`${scoreboard[lanesAsString][i].username}`}</h1>
                <p style={{color: "black",fontSize:"1.5vh", padding:"0.5vh" }}>
                    {`score: ${scoreboard[lanesAsString][i].score}, cause of death:${scoreboard[lanesAsString][i].causeOfDeath}`}
                </p>
            </div>
        </li>
      );
    }
    return arr;
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#000000',
      },
    },
  });

  return (
    <div>
      <div
        className="bg-immage d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url("${myConstants.gameOverMenuBackgroundIMGUrl}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat-y",
          height: `100vh`,
        }}
      >
        <div class="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-7 col-xl-6">
                  <div
                    class="card"
                    style={{
                      backdropFilter: "blur(15px)",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderRadius: "3em",
                      border: "2px solid rgba(255,255,255,.1)",
                      backgroundClip: "padding-box",
                      boxShadow: "10px 10px 10px rgba(46, 54, 68, 0.03)",
                    }}
                  >
                    <div class="card-body p-3 text-white">
                      <div class="my-4">
                        <h2 class="text-center mb-5">
                          Game Over!
                        </h2>
                        <form>
                          <ThemeProvider theme={theme}>
                            <Stack spacing={3} style={{ alignItems: "center" }} >
                                <div style={{paddingBottom:"3vh"}}>
                                <label>{`Username:${props.end.username}, cause of death:${props.end.message}, score: ${props.end.score}`}</label>
                                </div>

                              {!gameScoreSaved ? (
                                <div style={{paddingBottom:"3vh"}}>
                                <button
                                type="button"
                                class="btn btn-light"
                                style={{
                                  height: `7vh`,
                                  width: "20vh",
                                  fontSize: "2vh",
                                }}
                                onClick={saveScore}
                              >
                                save Score
                              </button>
                              </div>
                              ) : null}
                              <button
                                type="button"
                                class="btn btn-light"
                                style={{
                                  height: `7vh`,
                                  width: "20vh",
                                  fontSize: "2vh",
                                }}
                                onClick={clickContinue}
                              >
                                Play Again
                              </button>
                            </Stack>
                          </ThemeProvider>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-10 col-lg-7 col-xl-6">
                  <div
                    class="card"
                    style={{
                      backdropFilter: "blur(15px)",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderRadius: "3em",
                      border: "2px solid rgba(255,255,255,.1)",
                      backgroundClip: "padding-box",
                      boxShadow: "10px 10px 10px rgba(46, 54, 68, 0.03)",
                    }}
                  >
                    <div class="card-body p-1 text-white">
                      <div class="my-4">
                        <h2 class="text-center mb-5">Scores</h2>
                        <ThemeProvider theme={theme}>
                          <Stack spacing={5} style={{ display: "flex", alignItems: "center" }} >

                            <ol>{displayScores()}</ol>

                          </Stack>
                        </ThemeProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameOverMenu;
/*
<div>
      <h1>Game over</h1>
      <label>{`Username:${props.end.username}, cause of death:${props.end.message}, score: ${props.end.score}`}</label>
      <div>
        {!gameScoreSaved ? (
          <button onClick={saveScore}>Save Score</button>
        ) : null}
        <button onClick={clickContinue}>PLay Again</button>
      </div>
      <div>
        <ol>{displayScores()}</ol>
      </div>
    </div>*/
