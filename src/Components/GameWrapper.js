import React, { useEffect } from 'react';
import Canvas from './Canvas';
import GameLogic from './GameLogic';

const GameWrapper = (props) => {

    const { id } = props;

	useEffect(() => {
        const gameCanvas=document.getElementById(id);
        
        const gameLogic=new GameLogic(gameCanvas,props.lanesNum,props.gameEndHandler);
    }, []);

    return (
      <div>
        <Canvas canvasID={id} ></Canvas>
      </div>
    );
};

export default GameWrapper;