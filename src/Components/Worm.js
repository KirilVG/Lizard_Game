import * as myConstants from "./Constants";
import WormIcon from "../Images/WormIcon.svg";

class Worm {
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
    this.IMGWidth = IMGWidth;
    this.IMGHeight = IMGHeight;
    this.hitboxWidth = hitboxWidth;
    this.hitboxHeight = hitboxHeight;
    this.currentLane = currentLane;
    this.distancetotravel = distancetotravel;
    this.colided = false;
    this.image = new Image();
    this.image.src = WormIcon;
  }

  draw(c) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      c.fillStyle = myConstants.colors[ind];
    } else {
      c.fillStyle = "black";
    }

    let p = this.getPath();

    const scaleX = this.IMGWidth/myConstants.wormPathWidth;
    const scaleY = this.IMGHeight/myConstants.wormPathHeight;
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
    c.stroke(p);
    c.fill(p);
    c.resetTransform();

    if (myConstants.displayHitboxes) {
      c.fillStyle = "green";
      c.globalAlpha = myConstants.hitboxOpacity;
      c.fillRect(
        this.position.x - this.hitboxWidth / 2,
        this.position.y + (this.IMGHeight - this.hitboxHeight),
        this.hitboxWidth,
        this.hitboxHeight
      ); //displays hitbox
      c.globalAlpha = 1
      c.fillStyle = "black";
    }
  }

  update(c, currentSpeed) {
    if (this.distancetotravel > 0) {
      let calculatedSpeed = currentSpeed * myConstants.wormSpeedMultiplier;
      this.position.y += calculatedSpeed;
      this.distancetotravel -= calculatedSpeed;
      this.draw(c);
    }
  }

  detectCollision(player) {
    if (
      player.position.y <= this.position.y + this.IMGHeight &&
      player.position.y + player.hitboxHeight >=
        this.position.y + (this.IMGHeight - this.hitboxHeight) &&
      player.currentLane == this.currentLane &&
      player.level == myConstants.levelGround
    ) {
      this.colided = true;
      player.fuel = myConstants.maxfuel;
    }
  }

  terminate() {
    return this.distancetotravel <= 0 || this.colided == true;
  }

  getPath() {
    let path = new Path2D(`M1340 12585 c-274 -43 -451 -199 -521 -462 -26 -98 -38 -455 -20
    -583 28 -189 103 -339 374 -749 301 -455 376 -619 365 -798 -4 -62 -12 -94
    -40 -155 -80 -172 -183 -299 -307 -379 -76 -49 -176 -86 -411 -150 -304 -83
    -461 -211 -603 -496 -52 -102 -113 -272 -147 -408 -23 -91 -29 -219 -23 -470
    2 -49 3 -105 2 -124 0 -19 8 -46 19 -61 11 -14 25 -53 32 -86 23 -116 103
    -392 156 -541 150 -421 380 -884 617 -1238 444 -664 923 -1065 1426 -1193 99
    -25 121 -27 322 -27 144 0 224 4 240 12 13 6 61 21 107 33 238 61 499 198 773
    406 188 142 351 288 664 594 116 113 224 212 241 221 16 9 38 31 47 50 16 33
    283 290 440 423 175 148 345 260 490 322 279 120 534 99 829 -68 161 -91 375
    -272 411 -348 14 -29 34 -52 57 -64 84 -45 305 -366 450 -654 213 -424 321
    -831 321 -1202 0 -170 -15 -273 -55 -394 -63 -187 -311 -617 -375 -651 -34
    -17 -45 -34 -55 -83 -6 -37 -107 -172 -275 -372 -211 -250 -672 -690 -724
    -690 -32 0 -84 -38 -97 -71 -10 -22 -50 -55 -154 -124 -373 -248 -686 -369
    -1024 -395 -228 -18 -384 -52 -540 -118 -409 -172 -692 -538 -692 -896 0 -161
    41 -268 139 -366 92 -92 217 -140 484 -185 443 -75 974 -52 1442 60 439 106
    745 243 1090 490 714 509 1369 1127 1772 1672 54 72 108 136 121 142 26 12 62
    67 62 95 0 11 29 67 64 126 187 311 311 625 367 925 76 410 -9 1138 -215 1853
    -174 600 -438 1181 -774 1702 -33 52 -72 109 -85 125 -14 17 -60 75 -103 130
    -449 577 -971 933 -1534 1047 -101 20 -143 23 -355 23 -206 0 -257 -4 -360
    -23 -606 -113 -1093 -319 -1532 -648 -63 -47 -134 -104 -159 -125 -25 -22 -60
    -47 -77 -56 -18 -9 -37 -23 -44 -33 -22 -32 -669 -676 -749 -746 -112 -99
    -196 -154 -233 -154 -21 0 -43 -11 -70 -35 -62 -56 -170 -79 -336 -72 -145 7
    -203 20 -311 71 -113 54 -274 188 -274 229 0 8 -21 36 -46 63 -84 88 -192 344
    -258 610 -32 125 -76 376 -69 387 3 5 5 33 4 64 0 46 5 63 29 98 58 85 111
    124 546 407 268 175 406 294 512 443 138 195 176 380 137 671 -59 449 -219
    1067 -471 1824 -69 206 -132 413 -140 460 -33 193 -110 373 -208 492 -163 197
    -387 269 -686 223z`);
    return path;
  }
}

export default Worm;