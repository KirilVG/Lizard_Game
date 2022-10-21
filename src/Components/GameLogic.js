import Player from "./Player";
import LaneSeparator from "./LaneSeparator";
import VariableContainer from "./VariableContainer";
import CollidableObjectFactory from "./CollidableObjectFactory";
import Lane from "./Lane";
import * as myConstants from "./Constants";

class GameLogic{
    constructor(width, height, lanesNum, renderer, gameEndHandler){
        this.width = width;

        this.height = height;

        this.gameIsOver = false;

        this.renderer = renderer;

        this.lanesNum = lanesNum;

        this.valueM = myConstants.initialValueMultiplier;

        this.info = VariableContainer(
            this.width,
            this.height,
            this.lanesNum
        );

        this.speed = this.info.initialSpeed;

        this.speedUps = 0;

        this.dayNightCycles = 0;

        this.obstacleSpawnTime =
            myConstants.initialObstacleSpawnTime / this.lanesNum;

        this.consumableSpawnTime =
            myConstants.initialConsumableSpawnTime / this.lanesNum;

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
            this.lanesNum,
            this.info.laneWidth,
            myConstants.undergroundAnimationTime,
            myConstants.inAirAnimationTime,
            myConstants.jumpHeightScale,
            gameEndHandler,
        );

        for (let i = 0; i < this.lanesNum; i++) {
            let lane = new Lane(
                this.info.laneOriginX + i * this.info.laneWidth,
                this.info.laneOriginY,
                this.info.laneWidth,
                this.info.laneHeight
            );
            this.backgroundObjects.push(lane);
        }

        for (let i = 0; i <= this.lanesNum; i++) {
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
        this.player.handleMovement(myConstants.directions[e.code]);
    }

    handleGameObjectsChanges(gameObjectsArr) {
        for (let i = 0; i < gameObjectsArr.length; i++) {
            gameObjectsArr[i].update(this.renderer, this.speed);
    
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
          this.renderer.clearScreen(this.width,this.height);
    
          //display background objects
          for (let i = 0; i < this.backgroundObjects.length; i++) {
            this.backgroundObjects[i].update(this.renderer);
          }
    
          //display game objects
          this.handleGameObjectsChanges(this.groundObstacleObjects);
    
          this.player.update(this.renderer);
    
          this.handleGameObjectsChanges(this.consumableObjects);
    
          this.handleGameObjectsChanges(this.aerialObstacleObjects);
    
          //display score
          this.renderer.displayScoreAndFuel(this.info.laneOriginX,this.info.laneOriginY,this.info.laneWidth,this.lanesNum,this.player.score,this.player.fuel)
    
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
          CollidableObjectFactory.createBird(this.info, this.lanesNum)
        );
        break;
      case 1:
        this.groundObstacleObjects.push(
          CollidableObjectFactory.createCactus(this.info, this.lanesNum)
        );
        break;
      case 2:
        this.groundObstacleObjects.push(
          CollidableObjectFactory.createSmallCactus(
            this.info,
            this.lanesNum
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
      consumable=CollidableObjectFactory.createDiscoConsumable(this.info, this.lanesNum)
    } else {
      consumable=CollidableObjectFactory.createWorm(this.info, this.lanesNum)
    }

    this.consumableObjects.push(consumable);
  }
}

export default GameLogic;
/* displayScoreAndFuel() {
        //set the background
        this.DiscoFill(myConstants.primaryColor);
    
        this.ctx.fillRect(
          this.info.laneOriginX,
          this.info.laneOriginY,
          this.lanesNum * this.info.laneWidth,
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
      this.info.laneOriginX + 0.1 * this.lanesNum * this.info.laneWidth,
      this.info.laneOriginY + 0.9 * this.info.laneWidth,
      (this.player.fuel / myConstants.maxFuel) *
        (this.lanesNum * this.info.laneWidth * 0.8),
      this.info.laneWidth
    );
  }*/