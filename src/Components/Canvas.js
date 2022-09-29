import React from "react";
import Player from "./Player";
import LaneSeparator from "./LaneSeparator";
import * as myConstants from "./Constants";
import ScaleCalculator from "./ScaleCalculator";
import CollidableObjectFactory from "./CollidableObjectFactory";
import Lane from "./Lane";


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

    
    this.canvas.fillStyle = "#CC00CC";

    this.valueM = myConstants.initialValueMultiplier;

    this.ctx = this.canvas.getContext("2d");

    this.scale = ScaleCalculator(this.canvas.width, this.canvas.height, this.props.lanesNum);

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

    for (let i = 0; i < this.props.lanesNum; i++) {
      let lane = new Lane(
        this.scale.laneOriginX + i * this.scale.laneWidth,
        this.scale.laneOriginY,
        this.scale.laneWidth,
        this.scale.laneHeight
      );
      this.backgroundObjects.push(lane);
    }

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

  DiscoFill(color) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      this.ctx.fillStyle = myConstants.colors[ind];
    } else {
      this.ctx.fillStyle = color;
    }
  }

  animate() {
    if (!this.gameIsOver) {
      requestAnimationFrame(() => this.animate());

      if (this.player.fuel <= 0) {
        this.player.handleDeath("Fuel ended");
      }

      this.DiscoFill("white");
      this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
      //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
      this.DiscoFill("black");

      this.ctx.fillRect(this.scale.laneOriginX,this.scale.laneOriginY,this.props.lanesNum*this.scale.laneWidth,this.scale.laneWidth*2);
      let fontSize=this.scale.laneWidth*myConstants.fontscale
      this.ctx.font =`${fontSize}px serif`;

      this.DiscoFill("white");

      this.ctx.fillText(`score:${Math.round(this.player.score)}`,this.scale.laneOriginX,this.scale.laneOriginY+fontSize);
      this.ctx.fillRect(
        this.scale.laneOriginX+0.1*this.props.lanesNum*this.scale.laneWidth,
        this.scale.laneOriginY+0.9*this.scale.laneWidth,
        this.player.fuel/myConstants.maxfuel*(this.props.lanesNum*this.scale.laneWidth*0.8),
        this.scale.laneWidth
        );
      

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
        this.aerialObstacleObjects.push(CollidableObjectFactory.createBird(this.scale,this.props.lanesNum));
        break;
      case 1: 
        this.groundObstacleObjects.push(CollidableObjectFactory.createCactus(this.scale,this.props.lanesNum))
        break;
      case 2:
        this.groundObstacleObjects.push(CollidableObjectFactory.createSmallCactus(this.scale,this.props.lanesNum));
        break;
      default:
        break;
    }
  }

  createConsumableObject() {
    this.consumableObjects.push(CollidableObjectFactory.createWorm(this.scale,this.props.lanesNum));
  }

  render() {
    return <canvas ref={(node) => (this.canvas = node)} />;
  }
}

export default Canvas;
