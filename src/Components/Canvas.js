import React from "react";
import Player from "./Player";
import LaneSeparator from "./LaneSeparator";
import * as myConstants from "./Constants";
import VariableContainer from "./VariableContainer";
import CollidableObjectFactory from "./CollidableObjectFactory";
import Lane from "./Lane";

class Canvas extends React.Component {
  componentDidMount() {
    this.gameIsOver = false;

    this.canvas.width = window.innerWidth;

    this.canvas.height = Math.floor(
      window.innerHeight * myConstants.heightOffset
    );

    this.valueM = myConstants.initialValueMultiplier;

    this.ctx = this.canvas.getContext("2d");

    this.info = VariableContainer(
      this.canvas.width,
      this.canvas.height,
      this.props.lanesNum
    );

    this.speed = this.info.initialSpeed;

    this.speedUps = 0;

    this.dayNightCycles = 0;

    this.obstacleSpawnTime =
      myConstants.initialObstacleSpawnTime / this.props.lanesNum;

    this.consumableSpawnTime =
      myConstants.initialConsumableSpawnTime / this.props.lanesNum;

    this.backgroundObjects = [];

    this.groundObstacleObjects = [];

    this.aerialObstacleObjects = [];

    this.consumableObjects = [];

    this.player = new Player(
      this.info.playerOriginX,
      this.info.playerOriginY,
      this.info.playerIMGWidth,
      this.info.playerIMGHeight,
      this.info.playerHitBoxWidth,
      this.info.playerHitBoxHeight,
      this.info.playerStartingLane,
      this.props.lanesNum,
      this.info.laneWidth,
      myConstants.undergroundAnimationTime,
      myConstants.inAirAnimationTime,
      myConstants.jumpHeightScale,
      this.props.gameEndHandler
    );

    for (let i = 0; i < this.props.lanesNum; i++) {
      let lane = new Lane(
        this.info.laneOriginX + i * this.info.laneWidth,
        this.info.laneOriginY,
        this.info.laneWidth,
        this.info.laneHeight
      );
      this.backgroundObjects.push(lane);
    }

    for (let i = 0; i <= this.props.lanesNum; i++) {
      let laneSep = new LaneSeparator(
        this.info.laneOriginX + i * this.info.laneWidth,
        this.info.laneOriginY,
        this.info.laneHeight
      );
      this.backgroundObjects.push(laneSep);
    }

    this.collidableObstacleObjectCreator = setInterval(
      () => this.createApproachingObstacleObject(),
      this.obstacleSpawnTime
    );
    this.animate();

    this.consumableObjectCreator = setInterval(
      () => this.createConsumableObject(),
      this.consumableSpawnTime
    );

    myConstants.setDiscoModeRemainder(0);

    myConstants.setDayNightCycle();

    this.animate();

    window.addEventListener("keydown", (e) => this.WindowKeyDown(e));
  }

  WindowKeyDown(e) {
    this.player.handleMovement(myConstants.directions[e.key]);
  }

  DiscoFill(color) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      this.ctx.fillStyle = myConstants.colors[ind];
    } else {
      this.ctx.fillStyle = color;
    }
  }

  handleGameObjectsChanges(gameObjectsArr) {
    for (let i = 0; i < gameObjectsArr.length; i++) {
      gameObjectsArr[i].update(this.ctx, this.speed);

      gameObjectsArr[i].handleCollision(this.player);

      if (gameObjectsArr[i].terminate()) {
        gameObjectsArr.splice(i, 1);
        i--;
      }
    }
  }

  animate() {
    if (!this.gameIsOver) {
      requestAnimationFrame(() => this.animate());

      myConstants.setDiscoModeRemainder(myConstants.discoModeRemainder-1*this.player.valueMultiplier);

      //check if fuel has ended
      if (this.player.fuel <= 0) {
        this.player.handleDeath("Fuel ended");
      }

      //clear canvas
      this.DiscoFill(myConstants.secondaryColor);

      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      //display background objects
      for (let i = 0; i < this.backgroundObjects.length; i++) {
        this.backgroundObjects[i].update(this.ctx);
      }

      //display game objects
      this.handleGameObjectsChanges(this.groundObstacleObjects);

      this.player.update(this.ctx);

      this.handleGameObjectsChanges(this.consumableObjects);

      this.handleGameObjectsChanges(this.aerialObstacleObjects);

      //display score
      this.displayScoreAndFuel();

      //handle speed increase
      if (
        Math.floor(
          this.player.score / myConstants.pointsNeededToIncreaseScore
        ) > this.speedUps
      )
        this.speedUp();

        if (
          Math.floor(
            this.player.score / myConstants.pointsNeededToChangeDayNightCycle
          ) > this.dayNightCycles
        )
          {
            this.dayNightCycles++;
            myConstants.switchDayNightCycle();
          }

      this.gameIsOver = this.player.isDead;
    } else {
      clearInterval(this.collidableObstacleObjectCreator);
      clearInterval(this.consumableObjectCreator);
    }
  }

  displayScoreAndFuel() {
    //set the background
    this.DiscoFill(myConstants.primaryColor);

    this.ctx.fillRect(
      this.info.laneOriginX,
      this.info.laneOriginY,
      this.props.lanesNum * this.info.laneWidth,
      this.info.laneWidth * 2
    );

    //set the score
    this.DiscoFill(myConstants.secondaryColor);
    let fontSize = this.info.laneWidth * myConstants.fontScale;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillText(
      `score:${Math.round(this.player.score)}`,
      this.info.laneOriginX,
      this.info.laneOriginY + fontSize
    );

    //set the fuel bar
    this.DiscoFill(myConstants.secondaryColor);
    this.ctx.fillRect(
      this.info.laneOriginX + 0.1 * this.props.lanesNum * this.info.laneWidth,
      this.info.laneOriginY + 0.9 * this.info.laneWidth,
      (this.player.fuel / myConstants.maxFuel) *
        (this.props.lanesNum * this.info.laneWidth * 0.8),
      this.info.laneWidth
    );
  }

  speedUp() {
    let prevSpeed = this.speed;
    this.speed *= myConstants.valueMultiplier;

    this.player.valueMultiplier *= myConstants.valueMultiplier;

    let diff = prevSpeed / this.speed;

    this.player.inAirAnimationTime *= diff;
    this.player.underGroundAnimationTime *= diff;

    this.obstacleSpawnTime *= diff;
    this.consumableSpawnTime *= diff;

    clearInterval(this.collidableObstacleObjectCreator);
    clearInterval(this.consumableObjectCreator);

    this.collidableObstacleObjectCreator = setInterval(
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

    switch (res) {
      case 0:
        this.aerialObstacleObjects.push(
          CollidableObjectFactory.createBird(this.info, this.props.lanesNum)
        );
        break;
      case 1:
        this.groundObstacleObjects.push(
          CollidableObjectFactory.createCactus(this.info, this.props.lanesNum)
        );
        break;
      case 2:
        this.groundObstacleObjects.push(
          CollidableObjectFactory.createSmallCactus(
            this.info,
            this.props.lanesNum
          )
        );
        break;
      default:
        break;
    }
  }

  createConsumableObject() {
    let consumable;

    let res = Math.floor(Math.random() * 100);

    if(res<=33) {
      consumable=CollidableObjectFactory.createDiscoConsumable(this.info, this.props.lanesNum)
    } else {
      consumable=CollidableObjectFactory.createWorm(this.info, this.props.lanesNum)
    }

    this.consumableObjects.push(consumable);
  }

  render() {

    return (
      <div>
        <canvas ref={(node) => (this.canvas = node)} />
      </div>
    );
  }
}

export default Canvas;
