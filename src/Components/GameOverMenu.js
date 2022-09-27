import React from "react";

function GameOverMenu (props) {
    const clickContinue=()=>{
        props.onClick();
    }

        return (
        <div>
            <h1>Game over</h1>
            <label>{`${props.end.message}, score: ${props.end.score}`}</label>
            <button onClick={clickContinue}>PLay Again</button>
        </div>
        );
}

export default GameOverMenu;