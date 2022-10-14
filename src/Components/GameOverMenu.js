import React from "react";
import { useState } from "react";
import * as myConstants from "./Constants";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import { Stack } from "react-bootstrap";
import FormControl from "@mui/material/FormControl";

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
    let displayValue;
    let lanesAsString = String(props.end.lanesNum);

    let scoreboard = JSON.parse(localStorage.getItem("scoreboard"));

    if (!scoreboard[lanesAsString]) {
      displayValue = (
        <div>
          <h1>No current scores!</h1>
          <p>be the first</p>
        </div>
      );
    } else {
      displayValue = [];

      for (
        let i = 0;
        i < scoreboard[lanesAsString].length &&
        i < myConstants.maximumNumberOfScores;
        i++
      ) {
        displayValue.push(
          <li key={i}>
            <div class="scoreItem">
              <h1
                class="scoreItemHeader"
              >{`${scoreboard[lanesAsString][i].username}`}</h1>
              <p
                class="scoreItemP"
              >
                {`score: ${scoreboard[lanesAsString][i].score}, cause of death:${scoreboard[lanesAsString][i].causeOfDeath}`}
              </p>
            </div>
          </li>
        );
      }
    }

    return displayValue;
  };

  return (
    <div
      className="bg-immage d-flex justify-content-center align-items-center backgroundIMG"
      style={{
        backgroundImage: `url("${myConstants.gameOverMenuBackgroundIMGUrl}")`,
      }}
    >
      <div class="mask darkMask">
        <div class="justify-content-center align-items-center h-100 container">
          <div class="row d-flex justify-content-center cardHolder">
            <div class="col-12 col-md-10 col-lg-7 col-xl-6">
              <div class="card glassCard card-body p-3 text-white my-4">
                <h2 class="text-center mb-5">Game Over!</h2>
                <Stack spacing={3} class="formStack">
                  <div>
                    <label>{`Username:${props.end.username}, cause of death:${props.end.message}, score: ${props.end.score}`}</label>
                  </div>
                  {!gameScoreSaved ? (
                    <div>
                      <button
                        type="button"
                        class="btn btn-light playButton"
                        onClick={saveScore}
                      >
                        save Score
                      </button>
                    </div>
                  ) : null}
                  <div>
                    <button
                      type="button"
                      class="btn btn-light playButton"
                      onClick={clickContinue}
                    >
                      Play Again
                    </button>
                  </div>
                </Stack>
              </div>
            </div>
            <div class="col-12 col-md-10 col-lg-7 col-xl-6">
              <div class="card glassCard card-body p-1 text-white my-4">
                <h2 class="text-center mb-5">Scores</h2>
                <Stack spacing={5} class="formStack">
                  <ol class="scoreArea">{displayScores()}</ol>
                </Stack>
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
                          
                            <Stack spacing={3} style={{ alignItems: "center" }} >
                              <div style={{ paddingBottom: "3vh" }}>
                                <label>{`Username:${props.end.username}, cause of death:${props.end.message}, score: ${props.end.score}`}</label>
                              </div>

                              {!gameScoreSaved ? (
                                <div style={{ paddingBottom: "3vh" }}>
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
                          <Stack spacing={5} style={{ display: "flex", alignItems: "center" }} >

                            <ol>{displayScores()}</ol>

                          </Stack>
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
  */