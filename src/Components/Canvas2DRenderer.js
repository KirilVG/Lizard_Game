import * as myConstants from "./Constants";

class Canvas2DRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
  }

  DiscoFill(color) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      this.ctx.fillStyle = myConstants.colors[ind];
    } else {
      this.ctx.fillStyle = color;
    }
  }

  DiscoStroke(color) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      this.ctx.strokeStyle = myConstants.colors[ind];
    } else {
      this.ctx.strokeStyle = color;
    }
  }

  clearScreen(width, height) {
    this.DiscoFill(myConstants.secondaryColor);

    this.ctx.fillRect(0, 0, width, height);
  }

  renderApproachingObject(approachingObject) {
    this.drawApproachingObjectIcon(approachingObject);

    if (myConstants.displayHitBoxes) {
      this.drawApproachingObjectHitBox(approachingObject);
    }
  }

  renderPlayer(player) {
    this.drawPlayerIcon(player);

    if (myConstants.displayHitBoxes) {
      this.drawPlayerHitBox(player);
    }
  }

  drawApproachingObjectIcon(approachingObject) {
    this.DiscoFill(myConstants.primaryColor);
    const path = this.getApproachingObjectPath(approachingObject);

    const scaleX =
      approachingObject.info.IMGWidth / approachingObject.info.pathWidth;
    const scaleY =
      approachingObject.info.IMGHeight / approachingObject.info.pathHeight;

    const translateX =
      approachingObject.position.x + approachingObject.info.IMGWidth / 2;
    const translateY =
      approachingObject.position.y + approachingObject.info.IMGHeight;

    const angle = Math.PI;

    const matrix = new DOMMatrix([
      Math.cos(angle) * scaleX,
      Math.sin(angle) * scaleX,
      -Math.sin(angle) * scaleY,
      Math.cos(angle) * scaleY,
      translateX,
      translateY,
    ]);

    this.ctx.setTransform(matrix);
    this.ctx.fill(path);
    this.ctx.resetTransform();
  }

  drawApproachingObjectHitBox(approachingObject) {
    this.ctx.globalAlpha = myConstants.hitBoxOpacity;
    this.ctx.fillStyle = "red";

    this.ctx.fillRect(
      approachingObject.position.x - approachingObject.info.hitBoxWidth / 2,
      approachingObject.position.y +
        (approachingObject.info.IMGHeight -
          approachingObject.info.hitBoxHeight),
      approachingObject.info.hitBoxWidth,
      approachingObject.info.hitBoxHeight
    );

    this.ctx.globalAlpha = 1;
  }

  drawPlayerIcon(player) {
    this.DiscoFill(myConstants.primaryColor);

    let p = this.getPlayerPath();

    let scaleX = player.IMGWidth / myConstants.playerPathWidth;
    let scaleY = player.IMGHeight / myConstants.playerPathHeight;

    let translateX = player.position.x - player.IMGWidth / 2;
    let translateY = player.position.y;

    const angle = 0;

    if (player.level == myConstants.levelAir) {
      let newIMGWidth = player.IMGWidth * player.jumpHeightScale;
      let newIMGHeight = player.IMGHeight * player.jumpHeightScale;

      scaleX = newIMGWidth / myConstants.playerPathWidth;
      scaleY = newIMGHeight / myConstants.playerPathHeight;

      translateX = player.position.x - newIMGWidth / 2;
      translateY = player.position.y - newIMGWidth / 2;
    }

    if (player.level == myConstants.levelUnder) {
      this.ctx.globalAlpha = myConstants.undergroundAnimationOpacity;
    }

    const matrix = new DOMMatrix([
      Math.cos(angle) * scaleX,
      Math.sin(angle) * scaleX,
      -Math.sin(angle) * scaleY,
      Math.cos(angle) * scaleY,
      translateX,
      translateY,
    ]);

    this.ctx.setTransform(matrix);
    this.ctx.fill(p);
    this.ctx.resetTransform();

    if (player.level == myConstants.levelUnder) {
      this.ctx.globalAlpha = 1;
    }
  }

  drawPlayerHitBox(player) {
    this.ctx.fillStyle = "green";

    this.ctx.globalAlpha = myConstants.hitBoxOpacity;

    this.ctx.fillRect(
      player.position.x - player.hitBoxWidth / 2,
      player.position.y,
      player.hitBoxWidth,
      player.hitBoxHeight
    ); //displays the hitBox

    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = myConstants.primaryColor;
  }

  displayScoreAndFuel(originX, originY, scaleUnit, lanesNum, score, fuel) {
    //set the background
    this.DiscoFill(myConstants.primaryColor);

    this.ctx.fillRect(originX, originY, lanesNum * scaleUnit, scaleUnit * 2);

    //set the score
    this.DiscoFill(myConstants.secondaryColor);

    let fontSize = scaleUnit * myConstants.fontScale;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillText(
      `score:${Math.round(score)}`,
      originX,
      originY + fontSize
    );

    //set the fuel bar
    this.DiscoFill(myConstants.secondaryColor);
    this.ctx.fillRect(
      originX + 0.1 * lanesNum * scaleUnit,
      originY + 0.9 * scaleUnit,
      (fuel / myConstants.maxFuel) * (lanesNum * scaleUnit * 0.8),
      scaleUnit
    );
  }

  renderLane(lane) {
    this.DiscoFill(myConstants.secondaryColor);

    this.ctx.fillRect(
      lane.position.x,
      lane.position.y,
      lane.width,
      lane.height
    );
  }

  renderLaneSeparator(lineSeparator) {
    this.DiscoStroke(myConstants.primaryColor);

    this.ctx.beginPath();
    this.ctx.lineWidth = lineSeparator.width;
    this.ctx.moveTo(lineSeparator.position.x1, lineSeparator.position.y1);
    this.ctx.lineTo(lineSeparator.position.x2, lineSeparator.position.y2);
    this.ctx.stroke();
  }

  getApproachingObjectPath(approachingObject) {
    let path = new Path2D(approachingObject.info.pathAsString);
    return path;
  }

  getPlayerPath() {
    let path = new Path2D(myConstants.playerPath);
    return path;
  }
}

export default Canvas2DRenderer;
