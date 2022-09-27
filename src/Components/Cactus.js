import * as myConstants from "./Constants";
import CactusIcon from "../Images/CactusIcon.svg";

class Cactus {
  constructor(
    xPos,
    yPos,
    IMGWidth,
    IMGHeight,
    hitboxWidth,
    hitboxHeight,
    currentLane,
    distancetotravel
  ) {
    this.position = {
      x: xPos,
      y: yPos,
    };
    this.gameOverCauseMessage = "Killed by cactus";
    this.IMGWidth = IMGWidth;
    this.IMGHeight = IMGHeight;
    this.hitboxWidth = hitboxWidth;
    this.hitboxHeight = hitboxHeight;
    this.currentLane = currentLane;
    this.distancetotravel = distancetotravel;
    this.colided = false;
    this.image = new Image();
    this.image.src = CactusIcon;
  }

  draw(c) {
    c.drawImage(
      this.image,
      this.position.x - this.IMGWidth / 2,
      this.position.y,
      this.IMGWidth,
      this.IMGHeight
    );

    if(myConstants.displayHitboxes) {
        c.globalAlpha = myConstants.hitboxOpacity;
        c.fillStyle="red";
        c.fillRect(this.position.x-this.hitboxWidth/2,this.position.y + (this.IMGHeight - this.hitboxHeight),this.hitboxWidth,this.hitboxHeight)//displays hitbox
        c.globalAlpha = 1;
        c.fillStyle="black";
    }
  }

  update(c, currentSpeed) {
    if (this.distancetotravel > 0) {
      let calculatedSpeed = currentSpeed * myConstants.cactusSpeedMultiplier;
      this.position.y += calculatedSpeed;
      this.distancetotravel -= calculatedSpeed;
      this.draw(c);
    }

    if (this.distancetotravel <= 0) return true;
  }

  detectCollision(player) {
    if (
      player.position.y <= this.position.y + this.IMGHeight &&
      player.position.y + player.hitboxHeight >= this.position.y + (this.IMGHeight - this.hitboxHeight) &&
      player.currentLane == this.currentLane &&
      (player.level == myConstants.levelGround ||
        player.level == myConstants.levelUnder ||
        player.level == myConstants.levelAir)
    ) {
      this.colided = true;
      player.handleDeath(this.gameOverCauseMessage);
    }
  }

  terminate() {
    return this.distancetotravel <= 0 || this.colided == true;
  }
}

export default Cactus;