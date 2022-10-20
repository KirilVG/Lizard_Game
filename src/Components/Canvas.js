import React from "react";
import * as myConstants from "./Constants";

const Canvas = (props) =>{
    return (
        <canvas id={props.canvasID} width={window.innerWidth} height={window.innerHeight * myConstants.heightOffset} />
    );
}

export default Canvas;
