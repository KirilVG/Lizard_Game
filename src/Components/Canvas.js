import React from "react";
import Player from "./Player";
import LaneSeparator from "./LaneSeparator";
import Cactus from "./Cactus";
import SmallCactus from "./SmallCactus";
import Worm from "./Worm";
import * as myConstants from "./Constants";
import Bird from "./Bird";

const directions = {
  ArrowDown: myConstants.dirDown,
  ArrowUp: myConstants.dirUp,
  ArrowLeft: myConstants.dirLeft,
  ArrowRight: myConstants.dirRight,
};

class Canvas extends React.Component {
  componentDidMount() {
    this.gameIsOver = false;

    this.canvas.width = window.innerWidth;

    this.canvas.height = Math.floor(
      window.innerHeight * myConstants.heigthOffset
    );

    this.valueM = myConstants.initialValueMultiplier;

    this.ctx = this.canvas.getContext("2d");

    this.scale = this.claculateParameters();

    this.speed = this.scale.initialSpeed;

    this.speedUps=0;

    this.obstacleSpawnTime = myConstants.initialObstacleSpawnTime/this.props.lanesNum;

    this.consumableSpawnTime = myConstants.initialConsumableSpawnTime/this.props.lanesNum;

    this.backgroundObjects = [];

    this.groundObstacleObjects = [];

    this.aerialObstacleObjects = [];

    this.consumableObjects = [];

    this.player = new Player(
      this.scale.playerOriginX,
      this.scale.playerOriginY,
      this.scale.playerIMGWidth,
      this.scale.playerIMGHeight,
      this.scale.playerHitboxWidth,
      this.scale.playerHitboxHeight,
      this.scale.playerStartingLane,
      this.props.lanesNum,
      this.scale.laneWidth,
      myConstants.undergroundAnimationTime,
      myConstants.inAirAnimationTime,
      myConstants.jumpHeigthScale,
      this.props.gameEndHandler
    );

    for (let i = 0; i <= this.props.lanesNum; i++) {
      let laneSep = new LaneSeparator(
        this.scale.laneOriginX + i * this.scale.laneWidth,
        this.scale.laneOriginY,
        this.scale.laneHeight
      );
      this.backgroundObjects.push(laneSep);
    }

    this.colidableObjectCreator = setInterval(
      () => this.createApproachingObstacleObject(),
      this.obstacleSpawnTime
    );
    this.animate();

    this.consumableObjectCreator = setInterval(
      () => this.createConsumableObject(),
      this.consumableSpawnTime
    );

    this.animate();

    window.addEventListener("keydown", (e) => {
      this.player.handleMovement(directions[e.key]);
    });
  }

  animate() {
    if (!this.gameIsOver) {
      requestAnimationFrame(() => this.animate());

      if (this.player.fuel <= 0) {
        this.player.handleDeath("Fuel ended");
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < this.backgroundObjects.length; i++) {
        this.backgroundObjects[i].update(this.ctx);
      }

      for (let i = 0; i < this.groundObstacleObjects.length; i++) {
        this.groundObstacleObjects[i].update(this.ctx, this.speed);

        this.groundObstacleObjects[i].detectCollision(this.player);

        if (this.groundObstacleObjects[i].terminate()) {
          this.groundObstacleObjects.splice(i, 1);
          i--;
        }
      }

      this.player.update(this.ctx);

      for (let i = 0; i < this.consumableObjects.length; i++) {
        this.consumableObjects[i].update(this.ctx, this.speed);

        this.consumableObjects[i].detectCollision(this.player);

        if (this.consumableObjects[i].terminate()) {
          this.consumableObjects.splice(i, 1);
          i--;
        }
      }

      for (let i = 0; i < this.aerialObstacleObjects.length; i++) {
        this.aerialObstacleObjects[i].update(this.ctx, this.speed);

        this.aerialObstacleObjects[i].detectCollision(this.player);

        if (this.aerialObstacleObjects[i].terminate()) {
          this.aerialObstacleObjects.splice(i, 1);
          i--;
        }
      }

      //displayscore
      this.ctx.fillRect(this.scale.laneOriginX,this.scale.laneOriginY,this.props.lanesNum*this.scale.laneWidth,this.scale.laneWidth*2);
      let fontSize=this.scale.laneWidth*myConstants.fontscale
      this.ctx.font =`${fontSize}px serif`;
      this.ctx.fillStyle="white";
      this.ctx.fillText(`score:${Math.round(this.player.score)}`,this.scale.laneOriginX,this.scale.laneOriginY+fontSize);
      this.ctx.fillRect(this.scale.laneOriginX+0.1*this.props.lanesNum*this.scale.laneWidth,0.9*this.scale.laneWidth,this.player.fuel/myConstants.maxfuel*(this.props.lanesNum*this.scale.laneWidth*0.8),this.scale.laneOriginY+this.scale.laneWidth);
      this.ctx.fillStyle="black";

      if(Math.floor(this.player.score/myConstants.pointsNeededToIncreaseScore)>this.speedUps) this.speedUp();

      this.gameIsOver = this.player.isDead;
    } else {
      clearInterval(this.colidableObjectCreator);
      clearInterval(this.consumableObjectCreator);
    }
  }

  speedUp() {
    let prevSpeed=this.speed;
    this.speed*=myConstants.valueMultiplier;
    this.player.valuemultiplier*=myConstants.valueMultiplier;

    let diff=prevSpeed/this.speed;

    this.player.inAirAnimationTime*=diff;
    this.player.underGroundAnimationTime*=diff;

    this.obstacleSpawnTime*=diff;
    this.consumableSpawnTime*=diff;

    clearInterval(this.colidableObjectCreator);
    clearInterval(this.consumableObjectCreator);

    this.colidableObjectCreator = setInterval(
      () => this.createApproachingObstacleObject(),
      this.obstacleSpawnTime
    );

    this.consumableObjectCreator = setInterval(
      () => this.createConsumableObject(),
      this.consumableSpawnTime
    );

    this.speedUps++;
  }

  createApproachingObstacleObject() {
    let res = Math.floor(Math.random() * 3);

    switch(res) {
      case 0:
        this.createBird();
        break;
      case 1: 
        this.createCactus();
        break;
      case 2:
        this.createSmallCactus();
        break;
      default:
        break;
    }
  }

  createBird() {
    let col = Math.floor(Math.random() * (this.props.lanesNum-2))+1;
    let originX =
      this.scale.laneOriginX +
      col * this.scale.laneWidth +
      this.scale.laneWidth  / 2;
    let originY = this.scale.laneOriginY;
    let bird = new Bird(
      originX,
      originY,
      this.scale.birdIMGWidth,
      this.scale.birdIMGHeight,
      this.scale.birdHitboxWidth,
      this.scale.birdHitboxHeight,
      col,
      this.scale.laneHeight
    );
    this.aerialObstacleObjects.push(bird);
  }

  createCactus() {
    let col = Math.floor(Math.random() * this.props.lanesNum);
    let originX =
      this.scale.laneOriginX +
      col * this.scale.laneWidth +
      this.scale.laneWidth  / 2;
    let originY = this.scale.laneOriginY;
    let cact = new Cactus(
      originX,
      originY,
      this.scale.cactusIMGWidth,
      this.scale.cactusIMGHeight,
      this.scale.cactusHitboxWidth,
      this.scale.cactusHitboxHeight,
      col,
      this.scale.laneHeight
    );
    this.groundObstacleObjects.push(cact);
  }

  createSmallCactus() {
    let col = Math.floor(Math.random() * this.props.lanesNum);
    let originX =
      this.scale.laneOriginX +
      col * this.scale.laneWidth +
      this.scale.laneWidth  / 2;
    let originY = this.scale.laneOriginY;
    let cact = new SmallCactus(
      originX,
      originY,
      this.scale.smallCactusIMGWidth,
      this.scale.smallCactusIMGHeight,
      this.scale.smallCactusHitboxWidth,
      this.scale.smallCactusHitboxHeight,
      col,
      this.scale.laneHeight
    );
    this.groundObstacleObjects.push(cact);
  }

  createConsumableObject() {
    this.createWorm();
  }

  createWorm() {
    let col = Math.floor(Math.random() * this.props.lanesNum);
    let originX =
      this.scale.laneOriginX +
      col * this.scale.laneWidth +
      this.scale.laneWidth  / 2;
    let originY = this.scale.laneOriginY;
    let worm = new Worm(
      originX,
      originY,
      this.scale.wormIMGWidth,
      this.scale.wormIMGHeight,
      this.scale.wormHitboxWidth,
      this.scale.wormHitboxHeight,
      col,
      this.scale.laneHeight
    );
    this.consumableObjects.push(worm);
  }

  claculateParameters() {
    let cWidth = this.canvas.width;
    let cHeigth = this.canvas.height;
    let lanes = this.props.lanesNum;

    let widthScale = lanes;

    let hUnit = cHeigth / myConstants.laneHeightScale;
    let wUnit = cWidth / widthScale;

    let unit = Math.floor(Math.min(hUnit, wUnit));

    let laneWidth = unit;
    let laneHeight = unit * myConstants.laneHeightScale;

    let playerHitboxHeight = Math.floor(myConstants.playerHitboxHeightScale * unit);
    let playerHitboxWidth = Math.floor(myConstants.playerHitboxWidthScale * unit);
    let playerIMGHeight = Math.floor(myConstants.playerIMGHeightScale * unit);
    let playerIMGWidth = Math.floor(myConstants.playerIMGWidthScale * unit);

    let cactusHitboxHeight = Math.floor(myConstants.cactusHitboxHeightScale * unit);
    let cactusHitboxWidth = Math.floor(myConstants.cactusHitboxWidthScale * unit);
    let cactusIMGHeight = Math.floor(myConstants.cactusIMGHeightScale * unit);
    let cactusIMGWidth = Math.floor(myConstants.cactusIMGWidthScale * unit);

    let smallCactusHitboxHeight = Math.floor(myConstants.smallCactusHitboxHeightScale * unit);
    let smallCactusHitboxWidth = Math.floor(myConstants.smallCactusHitboxWidthScale * unit);
    let smallCactusIMGHeight = Math.floor(myConstants.smallCactusIMGHeightScale * unit);
    let smallCactusIMGWidth = Math.floor(myConstants.smallCactusIMGWidthScale * unit);

    let wormHitboxHeight = Math.floor(myConstants.wormHitboxHeightScale * unit);
    let wormHitboxWidth = Math.floor(myConstants.wormHitboxWidthScale * unit);
    let wormIMGHeight = Math.floor(myConstants.wormIMGHeightScale * unit);
    let wormIMGWidth = Math.floor(myConstants.wormIMGWidthScale * unit);

    let birdHitboxHeight = Math.floor(myConstants.birdHitboxHeightScale * unit);
    let birdHitboxWidth = Math.floor(myConstants.birdHitboxWidthScale * unit);
    let birdIMGHeight = Math.floor(myConstants.birdIMGHeightScale * unit);
    let birdIMGWidth = Math.floor(myConstants.birdIMGWidthScale * unit);

    let laneOriginX = Math.floor((cWidth - lanes * unit) / 2);
    let laneOriginY = Math.floor((cHeigth - laneHeight) / 2);

    let playerLaneNum = Math.floor(lanes / 2);

    let playerOriginX = Math.floor(
      laneOriginX +
        playerLaneNum * laneWidth +
        laneWidth / 2
    );
    let playerOriginY = Math.floor(
      laneOriginY + Math.floor(laneHeight - playerIMGHeight)
    );

    let lineSeparatorWidth = Math.floor(
      unit * myConstants.lineSepaRatorWidthScale
    );

    let speed = unit * myConstants.speedScale;

    return {
      playerHitboxHeight: playerHitboxHeight,
      playerHitboxWidth: playerHitboxWidth,
      playerIMGHeight: playerIMGHeight,
      playerIMGWidth: playerIMGWidth,
      cactusHitboxHeight: cactusHitboxHeight,
      cactusHitboxWidth: cactusHitboxWidth,
      cactusIMGHeight: cactusIMGHeight,
      cactusIMGWidth: cactusIMGWidth,
      smallCactusHitboxHeight: smallCactusHitboxHeight,
      smallCactusHitboxWidth: smallCactusHitboxWidth,
      smallCactusIMGHeight: smallCactusIMGHeight,
      smallCactusIMGWidth: smallCactusIMGWidth,
      birdHitboxHeight: birdHitboxHeight,
      birdHitboxWidth: birdHitboxWidth,
      birdIMGHeight: birdIMGHeight,
      birdIMGWidth: birdIMGWidth,
      wormHitboxHeight: wormHitboxHeight,
      wormHitboxWidth: wormHitboxWidth,
      wormIMGHeight: wormIMGHeight,
      wormIMGWidth: wormIMGWidth,
      playerStartingLane: playerLaneNum,
      laneOriginX: laneOriginX,
      laneOriginY: laneOriginY,
      laneWidth: laneWidth,
      laneHeight: laneHeight,
      playerOriginX: playerOriginX,
      playerOriginY: playerOriginY,
      lineSepaRatorWidth: lineSeparatorWidth,
      initialSpeed: speed,
    };
  }

  render() {
    return <canvas ref={(node) => (this.canvas = node)} />;
  }
}

export default Canvas;
