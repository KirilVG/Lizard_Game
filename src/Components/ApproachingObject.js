import * as myConstants from "./Constants";

class ApproachingObject {
  constructor(xPos, yPos, info, currentLane, distanceToTravel) {
    this.position = {
      x: xPos,
      y: yPos,
    };
    this.info = info;
    this.currentLane = currentLane;
    this.distanceToTravel = distanceToTravel;
    this.collided = false;
    this.collisionHandler = info.collisionHandler;
  }

  update(c, currentSpeed) {
    if (this.distanceToTravel > 0) {
      let calculatedSpeed = currentSpeed * this.info.speedMultiplier;

      this.position.y += calculatedSpeed;

      this.distanceToTravel -= calculatedSpeed;

      c.renderApproachingObject(this);
    }

    return this.distanceToTravel <= 0;
  }

  handleCollision(player) {
    if (
      player.position.y <= this.position.y + this.info.IMGHeight &&
      player.position.y + player.hitBoxHeight >=
        this.position.y + (this.info.IMGHeight - this.info.hitBoxHeight) &&
      this.info.occupiedLanes.includes(player.currentLane - this.currentLane) &&
      this.info.occupiedLevels.includes(player.level)
    ) {
      this.collisionHandler(player);
    }
  }

  terminate() {
    return this.distanceToTravel <= 0 || this.collided == true;
  }
}

export default ApproachingObject;
