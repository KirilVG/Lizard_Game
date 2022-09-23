import React from "react";
import Player from "./Player";
import LaneSeparator from "./LaneSeparator";

const heigthOffset = 0.99;
const playerHeightScale = 1.5;
const playerWidthScale = 0.75;
const heightScale = 10;
const directions = {
  "ArrowDown":"down",
  "ArrowUp":"up",
  "ArrowLeft":"left",
  "ArrowRight":"right",
};

class Canvas extends React.Component {
  componentDidMount() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = Math.floor(window.innerHeight * heigthOffset);

    const ctx = this.canvas.getContext("2d");

    let scale = this.claculateParameters();
    console.log(scale);

    let renderableObjects=[];

    for(let i=0;i<=this.props.lanesNum;i++) {
      let laneSep=new LaneSeparator(scale.laneOriginX+i*scale.laneWidth,scale.laneOriginY,scale.laneHeight);
      renderableObjects.push(laneSep);
    }

    const player = new Player(scale.playerOriginX,scale.playerOriginY,scale.playerWidth,scale.laneHeight,scale.playerStartingLane,this.props.lanesNum,scale.laneWidth);
    renderableObjects.push(player);

    for(let i=0;i<renderableObjects.length;i++) {
      renderableObjects[i].draw(ctx);
    }

    this.animate(ctx,renderableObjects);

    window.addEventListener("keydown",(e) => {
      player.handleMovement(directions[e.key]);
    })
  }

  animate(ctx,renderableObjects) {
    requestAnimationFrame(()=>this.animate(ctx,renderableObjects));

    ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

    for (let i=0;i<renderableObjects.length;i++){
      renderableObjects[i].update(ctx);
    }
    //console.log("go");
  }

  claculateParameters() {
    let cWidth = this.canvas.width;
    let cHeigth = this.canvas.height;
    let lanes = this.props.lanesNum;

    let widthScale = lanes;

    let hUnit = cHeigth / heightScale;
    let wUnit = cWidth / widthScale;

    let unit = Math.floor(Math.min(hUnit, wUnit));

    let laneWidth = unit;
    let laneHeight = unit * heightScale;

    let playerHeight = Math.floor(playerHeightScale * unit);
    let playerWidth = Math.floor(playerWidthScale * unit);

    let laneOriginX = Math.floor((cWidth - lanes * unit) / 2);
    let laneOriginY = Math.floor((cHeigth - laneHeight) / 2);

    let playerLaneNum = Math.floor(lanes / 2);

    let playerOriginX = Math.floor(laneOriginX + playerLaneNum * laneWidth + Math.floor(laneWidth - playerWidth) / 2);
    let playerOriginY = Math.floor(laneOriginY + Math.floor(laneHeight - playerHeight));

    return {
      playerStartingLane: playerLaneNum,
      laneOriginX: laneOriginX,
      laneOriginY: laneOriginY,
      laneWidth: laneWidth,
      laneHeight: laneHeight,
      playerOriginX: playerOriginX,
      playerOriginY: playerOriginY,
      playerWidth: playerWidth,
      playerHeight: playerHeight,
    };
  }

  tr() {
    console.log("tr");
  }

  render() {
    return <canvas ref={(node) => (this.canvas = node)} />;
  }
}

export default Canvas;
