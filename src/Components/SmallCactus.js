import * as myConstants from "./Constants";
import SmallCactusIcon from "../Images/SmallCactusIcon.svg";

class SmallCactus {
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
    this.gameOverCauseMessage = "Killed by a small cactus";
    this.IMGWidth = IMGWidth;
    this.IMGHeight = IMGHeight;
    this.hitboxWidth = hitboxWidth;
    this.hitboxHeight = hitboxHeight;
    this.currentLane = currentLane;
    this.distancetotravel = distancetotravel;
    this.colided = false;
    this.image = new Image();
    this.image.src = SmallCactusIcon;
  }

  draw(c) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      c.fillStyle = myConstants.colors[ind];
    } else {
      c.fillStyle = "black";
    }

    
      let p = this.getPath();

      const scaleX = this.IMGWidth/myConstants.smallCactusPathWidth;
      const scaleY = this.IMGHeight/myConstants.smallCactusPathHeight;
      const translateX = this.position.x+this.IMGWidth/2;
      const translateY = this.position.y+this.IMGHeight;
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
      c.fill(p);
      c.resetTransform();

    if (myConstants.displayHitboxes) {
      c.globalAlpha = myConstants.hitboxOpacity;
      c.fillStyle = "red";
      c.fillRect(
        this.position.x - this.hitboxWidth / 2,
        this.position.y + (this.IMGHeight - this.hitboxHeight),
        this.hitboxWidth,
        this.hitboxHeight
      ); //displays hitbox
      c.globalAlpha = 1;
      c.fillStyle = "black";
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
      player.position.y + player.hitboxHeight >=
        this.position.y + (this.IMGHeight - this.hitboxHeight) &&
      player.currentLane == this.currentLane &&
      (player.level == myConstants.levelGround ||
        player.level == myConstants.levelUnder)
    ) {
      this.colided = true;
      player.handleDeath(this.gameOverCauseMessage);
    }
  }

  terminate() {
    return this.distancetotravel <= 0 || this.colided == true;
  }

  getPath() {
    let path = new Path2D(
      `M8443 8565 c-278 -112 -583 -373 -839 -717 -83 -111 -294 -428 -372
      -559 -344 -573 -845 -2122 -1041 -3214 -23 -129 -37 -238 -47 -350 -3 -44 -9
      -85 -13 -92 -13 -24 -306 502 -492 882 -173 353 -263 582 -323 820 -39 158
      -93 535 -141 990 -41 382 -97 727 -152 935 -85 321 -196 537 -356 692 -54 53
      -169 138 -187 138 -3 0 4 -53 16 -117 88 -441 146 -867 185 -1348 7 -82 12
      -292 12 -465 -1 -325 -4 -371 -57 -775 -42 -320 -86 -801 -86 -942 0 -40 -4
      -73 -9 -73 -4 0 -28 28 -52 63 -24 34 -98 130 -163 212 -856 1073 -1991 1776
      -2939 1821 l-112 5 35 -28 c19 -15 90 -72 157 -126 278 -220 640 -563 922
      -872 752 -826 1350 -1757 1802 -2810 42 -99 76 -181 74 -183 -1 -2 -58 20
      -126 49 -768 321 -1358 511 -1860 598 -697 121 -1348 78 -1984 -130 -157 -51
      -285 -102 -285 -112 0 -5 12 -6 28 -3 128 26 589 84 805 101 537 42 969 -12
      1242 -154 158 -82 352 -249 770 -661 801 -790 1046 -1015 1409 -1294 542 -417
      989 -640 1486 -740 401 -81 575 -98 980 -100 364 -1 410 4 685 74 105 26 255
      62 335 80 253 56 392 112 730 291 223 117 311 171 430 259 476 354 1184 619
      1818 681 146 14 440 6 545 -15 524 -106 1041 -365 1444 -724 l72 -64 -118 254
      c-65 140 -139 287 -165 328 -151 233 -519 494 -1026 727 -415 190 -744 291
      -1030 315 -287 24 -573 -13 -955 -123 -38 -11 -78 -22 -87 -25 -12 -4 5 41 61
      163 108 233 121 267 201 539 81 278 113 367 185 521 271 576 791 1125 1391
      1468 l99 57 -120 -6 c-185 -8 -316 -42 -500 -130 -142 -68 -690 -396 -823
      -493 -238 -173 -449 -368 -852 -787 -168 -174 -408 -423 -534 -554 -219 -227
      -328 -346 -389 -422 l-28 -35 21 55 c97 252 400 877 600 1235 223 400 390 671
      680 1105 215 321 282 435 364 616 205 459 325 966 376 1604 13 156 16 696 4
      827 l-7 88 -13 -60 c-7 -33 -22 -116 -34 -185 -92 -536 -163 -798 -300 -1111
      -83 -187 -240 -445 -381 -625 -69 -87 -319 -408 -568 -729 -211 -271 -417
      -517 -617 -737 -321 -353 -554 -670 -764 -1040 -24 -43 -47 -78 -50 -78 -4 0
      -15 73 -26 162 -31 267 -25 643 17 1003 49 427 152 952 300 1525 180 699 487
      1654 763 2379 36 96 65 175 64 177 -2 1 -40 -13 -85 -31z`
    );
    return path;
  }
}

export default SmallCactus;
