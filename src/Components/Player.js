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

  drawPlayerIcon(c) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      c.fillStyle = myConstants.colors[ind];
    } else {
      c.fillStyle = myConstants.primaryColor;
    }

    let p = this.getPath();

    let scaleX = this.IMGWidth / myConstants.playerPathWidth;
    let scaleY = this.IMGHeight / myConstants.playerPathHeight;

    let translateX = this.position.x - this.IMGWidth / 2;
    let translateY = this.position.y;

    const angle = 0;

    if (this.level == myConstants.levelAir) {
      let newIMGWidth = this.IMGWidth * this.jumpHeightScale;
      let newIMGHeight = this.IMGHeight * this.jumpHeightScale;

      scaleX = newIMGWidth / myConstants.playerPathWidth;
      scaleY = newIMGHeight / myConstants.playerPathHeight;

      translateX = this.position.x - newIMGWidth / 2;
      translateY = this.position.y - newIMGWidth / 2;
    }

    if (this.level == myConstants.levelUnder) {
      c.globalAlpha = myConstants.undergroundAnimationOpacity;
    }

    const matrix = new DOMMatrix([
      Math.cos(angle) * scaleX,
      Math.sin(angle) * scaleX,
      -Math.sin(angle) * scaleY,
      Math.cos(angle) * scaleY,
      translateX,
      translateY,
    ]);

    c.setTransform(matrix);
    c.fill(p);
    c.resetTransform();

    if (this.level == myConstants.levelUnder) {
      c.globalAlpha = 1;
    }
  }

  drawPlayerHitBox(c) {
    c.fillStyle = "green";

    c.globalAlpha = myConstants.hitBoxOpacity;

    c.fillRect(
      this.position.x - this.hitBoxWidth / 2,
      this.position.y,
      this.hitBoxWidth,
      this.hitBoxHeight
    ); //displays the hitBox

    c.globalAlpha = 1;
    c.fillStyle = myConstants.primaryColor;
  }

  draw(c) {
    this.drawPlayerIcon(c);

    if (myConstants.displayHitBoxes) {
      this.drawPlayerHitBox(c);
    }
  }

  update(c) {
    let scoreIncrement=1 * myConstants.scoreMultiplier * this.valueMultiplier;
    
    if(myConstants.useDiscoMode)scoreIncrement*=myConstants.discoModeScoreM;

    this.score += scoreIncrement;

    this.fuel -= myConstants.fuelLos * this.valueMultiplier;

    this.draw(c);
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
  getPath() {
    let path = new Path2D(myConstants.playerPath);
    return path;
  }
}

export default Player;
