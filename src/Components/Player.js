import * as myConstants from "./Constants";
import LizardIcon from "../Images/LizardIcon.svg"

class Player {
  constructor(
    xPos,
    yPos,
    IMGWidth,
    IMGHeight,
    hitboxWidth,
    hitboxHeight,
    currentLane,
    LanesNum,
    stepLength,
    underGroundAnimationTime,
    inAirAnimationTime,
    jumpHeightScale,
    gameOverHook
  ) {
    this.position = {
      x: xPos,
      y: yPos,
    };
    this.IMGHeight = IMGHeight;
    this.IMGWidth = IMGWidth;
    this.hitboxHeight = hitboxHeight;
    this.hitboxWidth = hitboxWidth;
    this.currentLane = currentLane;
    this.LanesNum = LanesNum;
    this.stepLength = stepLength;
    this.underGroundAnimationTime = underGroundAnimationTime;
    this.inAirAnimationTime = inAirAnimationTime;
    this.level = myConstants.levelGround;
    this.jumpHeightScale = jumpHeightScale;
    this.score = myConstants.initialScore;
    this.isDead = false;
    this.gameOverHook = gameOverHook;
    this.fuel = myConstants.maxfuel;
    this.image = new Image();
    this.image.src = LizardIcon;
    this.valuemultiplier=myConstants.initialValueMultiplier;
  }

  draw(c) {
    if (this.level == myConstants.levelGround) {
      c.drawImage(
        this.image,
        this.position.x-this.IMGWidth/2,
        this.position.y,
        this.IMGWidth,
        this.IMGHeight
      );
    } else if (this.level == myConstants.levelUnder) {
      c.globalAlpha = myConstants.undergroundAnimationOpacity;
      c.drawImage(
        this.image,
        this.position.x-this.IMGWidth/2,
        this.position.y,
        this.IMGWidth,
        this.IMGHeight
      );
      c.globalAlpha = 1;
    } else if (this.level == myConstants.levelAir) {
      let newIMGWidth =this.IMGWidth * this.jumpHeightScale;
      let newIMGHeight =this.IMGHeight * this.jumpHeightScale;

      c.drawImage(
        this.image,
        this.position.x-newIMGWidth/2,
        this.position.y-(newIMGHeight-this.IMGHeight),
        newIMGWidth,
        newIMGHeight
      );
    }

    if(myConstants.displayHitboxes) {
      c.fillStyle="green";
      c.globalAlpha = myConstants.hitboxOpacity;
      c.fillRect(this.position.x-this.hitboxWidth/2,this.position.y,this.hitboxWidth,this.hitboxHeight)//displays hitbox
      c.globalAlpha = 1
      c.fillStyle="black";
    }
  }

  update(c) {
    this.score += 1 * myConstants.scoreMultiplier * this.valuemultiplier;

    this.fuel -= myConstants.fuelLos * this.valuemultiplier;

    this.draw(c);
  }

  handleDeath(cause) {
    this.isDead = true;
    this.gameOverHook({ message: cause });
  }

  handleMovement(direction) {
    switch (direction) {
      case myConstants.dirUp:
        if (this.level == myConstants.levelGround) {
          this.level = myConstants.levelAir;
          setTimeout(
            () => (this.level = myConstants.levelGround),
            this.inAirAnimationTime
          );
        }
        break;
      case myConstants.dirDown:
        if (this.level == myConstants.levelGround) {
          this.level = myConstants.levelUnder;
          setTimeout(
            () => (this.level = myConstants.levelGround),
            this.underGroundAnimationTime
          );
        }
        break;
      case myConstants.dirLeft:
        if (this.currentLane > 0 && this.level != myConstants.levelAir) {
          this.position.x -= this.stepLength;
          this.currentLane--;
        }
        break;
      case myConstants.dirRight:
        if (
          this.currentLane < this.LanesNum - 1 &&
          this.level != myConstants.levelAir
        ) {
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