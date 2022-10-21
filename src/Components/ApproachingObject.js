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
    this.path = this.getPath();
    this.collisionHandler = info.collisionHandler;
  }

  update(c,currentSpeed) {
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

  getPath() {
    let path = new Path2D(this.info.pathAsString);
    return path;
  }
}

export default ApproachingObject;

/*draw(c) {
    this.drawIcon(c);

    if (myConstants.displayHitBoxes) {
      this.drawHitBox(c);
    }
  }

  drawIcon(c) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      c.fillStyle = myConstants.colors[ind];
    } else {
      c.fillStyle = myConstants.primaryColor;
    }

    const scaleX = this.info.IMGWidth / this.info.pathWidth;
    const scaleY = this.info.IMGHeight / this.info.pathHeight;

    const translateX = this.position.x + this.info.IMGWidth / 2;
    const translateY = this.position.y + this.info.IMGHeight;

    const angle = Math.PI;

    const matrix = new DOMMatrix([
      Math.cos(angle) * scaleX,
      Math.sin(angle) * scaleX,
      -Math.sin(angle) * scaleY,
      Math.cos(angle) * scaleY,
      translateX,
      translateY,
    ]);

    c.setTransform(matrix);
    c.fill(this.path);
    c.resetTransform();
  }

  drawHitBox(c) {
    c.globalAlpha = myConstants.hitBoxOpacity;
    c.fillStyle = "red";

    c.fillRect(
      this.position.x - this.info.hitBoxWidth / 2,
      this.position.y + (this.info.IMGHeight - this.info.hitBoxHeight),
      this.info.hitBoxWidth,
      this.info.hitBoxHeight
    );

    c.globalAlpha = 1;
  } */