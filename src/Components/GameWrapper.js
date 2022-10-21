import React, { useEffect } from "react";
import Canvas from "./Canvas";
import GameLogic from "./GameLogic";
import Canvas2DRenderer from "./Canvas2DRenderer";

const GameWrapper = (props) => {
  const { id } = props;

  useEffect(() => {
    const gameCanvas = document.getElementById(id);

    const canvas2dRenderer = new Canvas2DRenderer(gameCanvas);

    const gameLogic = new GameLogic(
      gameCanvas.width,
      gameCanvas.height,
      props.lanesNum,
      canvas2dRenderer,
      props.gameEndHandler
    );
  }, []);

  return (
    <div>
      <Canvas canvasID={id}></Canvas>
    </div>
  );
};

export default GameWrapper;
