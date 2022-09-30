import React from "react";
import { useState } from "react";

function GameOverMenu (props) {
    const [gameScoreSaved, setGameScoreSaved] = useState(false);
    const clickContinue=()=>{
        props.onClick();
    }

    const saveScore=()=> {
        let scoreboard=JSON.parse(localStorage.getItem("scoreboard"));
        if(!scoreboard)scoreboard={scores:[]};
        scoreboard.scores.push({username:props.end.username,lanesNum:props.end.lanesNum,score:props.end.score,causeOfDeath:props.end.message});
        scoreboard.scores.sort((a,b) => b.score-a.score);
        if(scoreboard.scores.length>10) scoreboard.scores.pop();
        localStorage.setItem("scoreboard",JSON.stringify(scoreboard));
        setGameScoreSaved(true);
    }

    const displayScores=()=> {
        let scoreboard=JSON.parse(localStorage.getItem("scoreboard"));
        if (!scoreboard) return(<li>no current scores</li>);
        let arr = [];
        for (let i = 0; i < scoreboard.scores.length; i++) {
          arr.push(
            <li key={i} >
                {`Username:${scoreboard.scores[i].username}, cause of death:${scoreboard.scores[i].causeOfDeath}, score: ${scoreboard.scores[i].score}`}
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
                {!gameScoreSaved ? (<button onClick={saveScore}>savescore</button>):null}
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