import React from "react";
import Player from "./Player";
import LaneSeparator from "./LaneSeparator";
import Cactus from "./Cactus";
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

    this.obstacleSpawnTime = myConstants.initialObstacleSpawnTime;

    this.consumableSpawnTime = myConstants.initialConsumableSpawnTime;

    this.backgroundObjects = [];

    this.groundObstacleObjects = [];

    this.aerialObstacleObjects = [];

    this.consumableObjects = [];

    this.player = new Player(
      this.scale.playerOriginX,
      this.scale.playerOriginY,
      this.scale.playerWidth,
      this.scale.playerHeight,
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

      this.player.fuel -= myConstants.fuelLos * this.valueM;
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

      this.gameIsOver = this.player.isDead;
    } else {
      clearInterval(this.colidableObjectCreator);
      clearInterval(this.consumableObjectCreator);
    }
  }

  createApproachingObstacleObject() {
    let res = Math.floor(Math.random() * 3);

    if (res == 0) {
      this.createBird();
    } else if (res > 0 && res <= 2) {
      this.createCactus();
    }
  }

  createBird() {
    let col = Math.floor(Math.random() * (this.props.lanesNum-2))+1;
    let originX =
      this.scale.laneOriginX +
      col * this.scale.laneWidth -
      Math.floor((this.scale.birdWidth - this.scale.laneWidth) / 2);
    let originY = this.scale.laneOriginY;
    let bird = new Bird(
      originX,
      originY,
      this.scale.birdWidth,
      this.scale.birdHeight,
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
      Math.floor(this.scale.laneWidth - this.scale.cactusWidth) / 2;
    let originY = this.scale.laneOriginY;
    let cact = new Cactus(
      originX,
      originY,
      this.scale.cactusWidth,
      this.scale.cactusHeight,
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
      Math.floor(this.scale.laneWidth - this.scale.wormWidth) / 2;
    let originY = this.scale.laneOriginY;
    let worm = new Worm(
      originX,
      originY,
      this.scale.wormWidth,
      this.scale.wormHeight,
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

    let playerHeight = Math.floor(myConstants.playerHeightScale * unit);
    let playerWidth = Math.floor(myConstants.playerWidthScale * unit);

    let cactusHeight = Math.floor(myConstants.cactusHeightScale * unit);
    let cactusWidth = Math.floor(myConstants.cactusWidthScale * unit);

    let wormHeight = Math.floor(myConstants.wormHeightScale * unit);
    let wormWidth = Math.floor(myConstants.wormWidthScale * unit);

    let birdHeight = Math.floor(myConstants.birdHeightScale * unit);
    let birdWidth = Math.floor(myConstants.birdWidthScale * unit);

    let laneOriginX = Math.floor((cWidth - lanes * unit) / 2);
    let laneOriginY = Math.floor((cHeigth - laneHeight) / 2);

    let playerLaneNum = Math.floor(lanes / 2);

    let playerOriginX = Math.floor(
      laneOriginX +
        playerLaneNum * laneWidth +
        Math.floor(laneWidth - playerWidth) / 2
    );
    let playerOriginY = Math.floor(
      laneOriginY + Math.floor(laneHeight - playerHeight)
    );

    let lineSeparatorWidth = Math.floor(
      unit * myConstants.lineSepaRatorWidthScale
    );

    let speed = unit * myConstants.speedScale;

    return {
      birdHeight: birdHeight,
      birdWidth:  birdWidth,
      wormHeight: wormHeight,
      wormWidth: wormWidth,
      playerStartingLane: playerLaneNum,
      laneOriginX: laneOriginX,
      laneOriginY: laneOriginY,
      laneWidth: laneWidth,
      laneHeight: laneHeight,
      playerOriginX: playerOriginX,
      playerOriginY: playerOriginY,
      playerWidth: playerWidth,
      playerHeight: playerHeight,
      lineSepaRatorWidth: lineSeparatorWidth,
      initialSpeed: speed,
      cactusHeight: cactusHeight,
      cactusWidth: cactusWidth,
    };
  }

  render() {
    return <canvas ref={(node) => (this.canvas = node)} />;
  }
}

export default Canvas;
