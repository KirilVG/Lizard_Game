import * as myConstants from "./Constants";

class Bird {
  constructor(xPos, yPos, width, height, currentLane, distancetotravel) {
    this.position = {
      x: xPos,
      y: yPos - height,
    };
    this.gameOverCauseMessage = "Killed by bird";
    this.width = width;
    this.height = height;
    this.currentLane = currentLane;
    this.distancetotravel = distancetotravel;
    this.colided = false;
  }

  draw(c) {
    c.fillStyle = "brown";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.fillStyle = "black";
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