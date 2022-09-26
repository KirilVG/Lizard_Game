import React from "react";

function GameOverMenu (props) {
    const clickContinue=()=>{
        props.onClick();
    }

        return (
        <div>
            <h1>Game over</h1>
            <label>{props.cause.message}</label>
            <button onClick={clickContinue}>PLay Again</button>
        </div>
        );
}

export default GameOverMenu;