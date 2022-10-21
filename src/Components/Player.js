import { render } from "@testing-library/react";
import * as myConstants from "./Constants";

class Player {
  constructor(
    xPos,
    yPos,
    IMGWidth,
    IMGHeight,
    hitBoxWidth,
    hitBoxHeight,
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

    this.hitBoxHeight = hitBoxHeight;

    this.hitBoxWidth = hitBoxWidth;

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

    this.fuel = myConstants.maxFuel;

    this.valueMultiplier = myConstants.initialValueMultiplier;
  }

  update(c) {
    let scoreIncrement = 1 * myConstants.scoreMultiplier * this.valueMultiplier;

    myConstants.useDiscoMode &&
      (scoreIncrement = scoreIncrement * myConstants.discoModeScoreM);

    this.score += scoreIncrement;

    this.fuel -= myConstants.fuelLos * this.valueMultiplier;

    c.renderPlayer(this);
  }

  handleDeath(cause) {
    this.isDead = true;

    this.gameOverHook({ message: cause, score: Math.round(this.score) });
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
        break;
    }
  }
}

export default Player;