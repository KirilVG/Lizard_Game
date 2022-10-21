import React from "react";
import { useState } from "react";
import * as myConstants from "./Constants";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme } from "@mui/material/styles";
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

    if (!scoreboard || !scoreboard[lanesAsString]) {
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
            <div className="scoreItem">
              <h1 className="scoreItemHeader">{`${scoreboard[lanesAsString][i].username}`}</h1>
              <p className="scoreItemP">
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
      className="bg-image d-flex justify-content-center align-items-center backgroundIMG"
      style={{
        backgroundImage: `url("${myConstants.gameOverMenuBackgroundIMGUrl}")`,
      }}
    >
      <div className="mask darkMask">
        <div className="justify-content-center align-items-center h-100 container">
          <div className="row d-flex justify-content-center cardHolder">
            <div className="col-12 col-md-10 col-lg-7 col-xl-6">
              <div className="card glassCard card-body p-3 text-white my-4">
                <h2 className="text-center mb-5">Game Over!</h2>
                <Stack spacing={3} class="formStack">
                  <div>
                    <label>{`Username:${props.end.username}, cause of death:${props.end.message}, score: ${props.end.score}`}</label>
                  </div>
                  {!gameScoreSaved ? (
                    <div>
                      <button
                        type="button"
                        className="btn btn-light playButton"
                        onClick={saveScore}
                      >
                        save Score
                      </button>
                    </div>
                  ) : null}
                  <div>
                    <button
                      type="button"
                      className="btn btn-light playButton"
                      onClick={clickContinue}
                    >
                      Play Again
                    </button>
                  </div>
                </Stack>
              </div>
            </div>
            <div className="col-12 col-md-10 col-lg-7 col-xl-6">
              <div className="card glassCard card-body p-1 text-white my-4">
                <h2 className="text-center mb-5">Scores</h2>
                <Stack spacing={5} className="formStack">
                  <ol className="scoreArea">{displayScores()}</ol>
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