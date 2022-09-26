import * as myConstants from "./Constants";
import BirdIcon from "../Images/BirdIcon.svg";

class Bird {
  constructor(xPos, yPos, width, height, currentLane, distancetotravel) {
    this.position = {
      x: xPos,
      y: yPos,
    };
    this.gameOverCauseMessage = "Killed by bird";
    this.width = width;
    this.height = height;
    this.currentLane = currentLane;
    this.distancetotravel = distancetotravel;
    this.colided = false;
    this.image=new Image();
    this.image.src=BirdIcon;
  }

  draw(c) {
    c.drawImage(this.image,this.position.x, this.position.y, this.width, this.height);
  }

  update(c, currentSpeed) {
    if (this.distancetotravel > 0) {
      let calculatedSpeed = currentSpeed * myConstants.birdSpeedMultiplier;
      this.position.y += calculatedSpeed;
      this.distancetotravel -= calculatedSpeed;
      this.draw(c);
    }

    if (this.distancetotravel <= 0) return true;
  }

  detectCollision(player) {
    if (
      player.position.y <= this.position.y + this.height &&
      (player.currentLane == this.currentLane ||
        player.currentLane == this.currentLane - 1 ||
        player.currentLane == this.currentLane + 1) &&
      (player.level == myConstants.levelGround ||
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

export default Bird;