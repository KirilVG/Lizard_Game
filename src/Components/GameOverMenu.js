import React from "react";
import { useState } from "react";
import * as myConstants from "./Constants";

function GameOverMenu (props) {
    const [gameScoreSaved, setGameScoreSaved] = useState(false);

    const clickContinue=()=>{
        props.onClick();
    }

    const saveScore=()=> {
        let lanesAsString=String(props.end.lanesNum);
        let scoreboard=JSON.parse(localStorage.getItem("scoreboard"));
        if(!scoreboard)scoreboard={};
        let currentScores=scoreboard[lanesAsString];
        if(!currentScores)currentScores=[];

        currentScores.push({username:props.end.username,lanesNum:props.end.lanesNum,score:props.end.score,causeOfDeath:props.end.message,discMode:myConstants.useDiscoMode});

        currentScores.sort((a,b) => b.score-a.score);

        if(currentScores.length>myConstants.maximumNumberOfScores) currentScores.pop();

        scoreboard[lanesAsString]=currentScores;

        localStorage.setItem("scoreboard",JSON.stringify(scoreboard));

        setGameScoreSaved(true);
    }

    const displayScores=()=> {
        let lanesAsString=String(props.end.lanesNum);
        let scoreboard=JSON.parse(localStorage.getItem("scoreboard"));

        if (!scoreboard[lanesAsString]) return(<li>no current scores</li>);

        let arr = [];

        for (let i = 0; i < scoreboard[lanesAsString].length; i++) {
          arr.push(
            <li key={i} >
                {`Username:${scoreboard[lanesAsString][i].username}, cause of death:${scoreboard[lanesAsString][i].causeOfDeath}, score: ${scoreboard[lanesAsString][i].score}`}
            </li>
          );
        }
        return arr;
    }

        return (
        <div>
            <h1>Game over</h1>
            <label>{`Username:${props.end.username}, cause of death:${props.end.message}, score: ${props.end.score}`}</label>
            <div>
                {!gameScoreSaved ? (<button onClick={saveScore}>Save Score</button>):null}
                <button onClick={clickContinue}>PLay Again</button>
            </div>
            <div>
                <ol>
                    {displayScores()}
                </ol>
            </div>
        </div>
        );
}

export default GameOverMenu;