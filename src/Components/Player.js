import * as myConstants from "./Constants";

class Player {
  constructor(
    xPos,
    yPos,
    width,
    height,
    currentLane,
    LanesNum,
    stepLength,
    underGroundAnimationTime,
    inAirAnimationTime,
    jumpHeightScale,
    gameOverHook,
  ) {
    this.position = {
      x: xPos,
      y: yPos,
    };
    this.baseWidth = width;
    this.baseHeight = height;
    this.width = width;
    this.height = height;
    this.currentLane = currentLane;
    this.LanesNum = LanesNum;
    this.stepLength = stepLength;
    this.underGroundAnimationTime = underGroundAnimationTime;
    this.inAirAnimationTime = inAirAnimationTime;
    this.level = myConstants.levelGround;
    this.jumpHeightScale = jumpHeightScale;
    this.score=myConstants.initialScore;
    this.isDead = false;
    this.gameOverHook=gameOverHook;
    this.fuel=myConstants.maxfuel;
  }

  draw(c) {
    if (this.level == myConstants.levelGround) {
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    } else if (this.level == myConstants.levelUnder) {
      c.globalAlpha = myConstants.undergroundAnimationOpacity;
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
      c.globalAlpha = 1;
    } else if (this.level == myConstants.levelAir) {
      let newOriginX=this.position.x-(Math.round((this.width*this.jumpHeightScale-this.width))/2);
      let newOriginY=this.position.y-(this.height*this.jumpHeightScale-this.height);
      c.fillRect(newOriginX, newOriginY, this.width*this.jumpHeightScale, this.height*this.jumpHeightScale);
    }
  }

  update(c) {
    this.score++;
    this.draw(c);
  }

  handleDeath(cause) {
    this.isDead=true;
    this.gameOverHook({message:cause});
  }

  handleMovement(direction) {
    switch (direction) {
      case myConstants.dirUp:
        if (this.level == myConstants.levelGround) {
          this.level = myConstants.levelAir;
          setTimeout(() => (this.level = myConstants.levelGround), this.inAirAnimationTime);
        }
        break;
      case myConstants.dirDown:
        if (this.level == myConstants.levelGround) {
          this.level = myConstants.levelUnder;
          setTimeout(() => (this.level = myConstants.levelGround), this.underGroundAnimationTime);
        }
        break;
      case myConstants.dirLeft:
        if (this.currentLane > 0 && this.level!=myConstants.levelAir) {
          this.position.x -= this.stepLength;
          this.currentLane--;
        }
        break;
      case myConstants.dirRight:
        if (this.currentLane < this.LanesNum - 1 && this.level!=myConstants.levelAir) {
          this.position.x += this.stepLength;
          this.currentLane++;
        }
        break;
      default:
        console.log("wrongDirection");
        break;
    }
  }
}

export default Player;