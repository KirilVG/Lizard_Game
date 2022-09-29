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
    if (myConstants.useDiscoMode) {
        let ind = Math.round(Math.random() * myConstants.colors.length);
        c.fillStyle = myConstants.colors[ind];
      } else {
        c.fillStyle = "black";
      }
  
      
        let p = this.getPath();
  
        const scaleX = this.IMGWidth/myConstants.cactusPathWidth;
        const scaleY = this.IMGHeight/myConstants.cactusPathHeight;
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
  getPath() {
    let path =
      new Path2D(`M3335 12366 l-390 -424 -130 0 c-140 1 -242 -16 -350 -57 l-62 -23
  -494 332 c-422 284 -496 331 -509 319 -13 -11 -11 -16 10 -37 14 -12 197 -181
  407 -375 l382 -351 -107 -108 c-59 -59 -127 -137 -151 -174 -24 -38 -48 -68
  -55 -68 -6 0 -256 18 -556 40 -541 39 -559 39 -560 9 0 -4 10 -9 23 -12 1062
  -243 1009 -230 1004 -251 -3 -12 -14 -57 -25 -101 -34 -129 -42 -201 -42 -362
  0 -83 -3 -154 -7 -156 -5 -3 -246 13 -538 34 -291 21 -538 39 -547 39 -11 0
  -18 -8 -18 -20 0 -11 3 -20 6 -20 6 0 148 -32 772 -176 178 -41 326 -74 328
  -74 2 0 3 -86 2 -192 l-3 -192 -480 -108 c-264 -59 -481 -107 -482 -108 -7 -1
  -2 -29 5 -33 4 -2 218 10 477 28 259 17 473 30 478 28 11 -6 9 -763 -3 -763
  -5 0 -193 50 -416 111 -400 109 -424 113 -424 79 0 -3 191 -89 423 -192 l422
  -187 0 -437 0 -438 -410 -63 c-225 -34 -411 -63 -412 -63 -2 0 -3 -9 -3 -20 0
  -20 7 -20 415 -20 l415 0 0 -414 c0 -232 -4 -417 -9 -420 -5 -3 -244 -42 -532
  -85 -288 -44 -543 -83 -567 -87 -32 -5 -42 -11 -42 -25 0 -18 22 -19 572 -21
  l573 -3 3 -332 c2 -253 -1 -333 -10 -333 -6 0 -120 38 -252 84 -133 46 -366
  128 -520 182 -224 78 -280 94 -287 83 -4 -8 -5 -17 -1 -21 4 -3 241 -131 527
  -283 286 -153 526 -282 532 -287 10 -8 13 -65 13 -224 l0 -214 -22 0 c-13 0
  -239 16 -503 35 -573 42 -545 41 -545 15 0 -11 7 -20 15 -20 8 0 101 -20 207
  -44 106 -25 333 -77 503 -116 171 -39 318 -73 328 -76 16 -5 17 -27 17 -284 0
  -153 -3 -281 -7 -283 -5 -2 -179 8 -388 24 -463 34 -425 33 -425 11 0 -16 53
  -31 402 -111 221 -51 405 -94 410 -97 4 -3 8 -147 8 -320 l0 -314 -570 0 -570
  0 0 -1494 c0 -822 4 -1496 8 -1498 4 -2 18 -40 30 -86 83 -314 316 -563 627
  -669 159 -54 134 -53 1527 -53 1263 0 1292 0 1391 21 256 51 483 202 621 413
  60 91 118 223 137 310 7 32 19 60 26 63 11 4 13 272 13 1499 l0 1494 -550 0
  -550 0 2 332 3 333 300 12 c165 6 312 12 328 12 19 1 27 6 27 19 0 16 -33 22
  -330 57 l-330 39 0 225 0 224 178 -6 c599 -22 584 -22 580 -1 -3 17 -49 28
  -378 91 -206 40 -376 72 -378 73 -1 0 -1 95 0 211 l3 211 482 257 c266 141
  483 258 483 261 0 33 -30 25 -391 -101 -473 -165 -571 -199 -576 -199 -1 0 -3
  167 -3 370 0 273 3 370 12 370 6 0 228 -47 492 -105 265 -58 490 -107 501
  -108 11 -1 21 5 23 15 2 12 -17 24 -80 48 -46 18 -164 63 -263 101 -99 39
  -245 95 -325 126 -80 31 -192 75 -250 98 l-105 41 -3 241 -2 241 67 37 67 37
  351 -42 c562 -67 545 -65 555 -49 6 8 5 16 -3 20 -7 4 -160 48 -342 98 -181
  50 -337 95 -346 99 -13 5 17 29 115 92 72 46 216 141 320 210 104 69 213 137
  242 152 123 63 175 152 221 382 l8 39 240 103 c132 57 245 105 250 107 6 2 7
  8 2 12 -4 5 -98 -20 -210 -55 -111 -34 -221 -69 -245 -76 l-42 -13 2 166 3
  166 344 148 c189 82 346 151 349 154 21 21 -48 3 -345 -89 -186 -58 -342 -106
  -346 -106 -4 0 -7 103 -7 229 l0 229 356 152 c195 84 352 156 347 161 -4 4
  -163 -41 -353 -100 l-345 -108 -6 236 c-7 239 -11 272 -55 383 l-18 47 101
  321 c55 176 97 323 92 326 -11 6 -10 7 -139 -296 -63 -146 -114 -266 -115
  -268 -2 -1 -25 11 -52 28 -31 20 -74 35 -116 42 -37 6 -67 14 -67 17 0 3 -18
  147 -40 320 -22 173 -40 316 -40 318 0 1 -5 3 -11 3 -7 0 -8 -97 -4 -327 l7
  -328 -49 -15 c-49 -15 -52 -15 -144 15 l-94 30 -85 198 c-47 108 -89 197 -94
  197 -12 0 -4 -30 53 -212 27 -87 46 -158 42 -158 -3 0 -98 29 -211 64 l-205
  64 -5 222 -5 222 285 -8 c157 -4 301 -8 320 -8 25 -1 35 4 38 16 4 19 13 17
  -381 90 -281 52 -288 54 -293 78 -21 96 -107 303 -155 372 l-19 26 58 6 c31 3
  244 19 472 36 538 39 520 37 520 61 0 14 -7 19 -27 19 -16 0 -224 16 -463 35
  -239 19 -502 40 -585 46 -147 11 -151 12 -190 44 -60 49 -184 128 -235 149
  -25 11 -46 21 -48 21 -1 1 132 202 296 446 282 419 311 470 273 469 -3 0 -181
  -191 -396 -424z m783 -2148 l223 -32 27 -91 c27 -84 28 -93 15 -140 -8 -30
  -13 -108 -13 -197 0 -147 0 -148 -22 -148 -13 0 -108 -7 -213 -15 -104 -8
  -207 -15 -227 -15 l-38 0 0 335 c0 261 3 335 13 335 6 0 112 -14 235 -32z
  m362 -55 c0 -5 -7 -16 -15 -26 -13 -18 -14 -18 -24 2 -15 28 -14 31 14 31 14
  0 25 -3 25 -7z m-110 -882 l0 -220 -52 -5 c-29 -3 -123 -10 -208 -16 -85 -6
  -174 -12 -197 -15 l-43 -5 0 184 0 183 238 55 c130 31 243 56 250 57 9 1 12
  -49 12 -218z m-2 -432 l-3 -122 -220 -143 c-147 -96 -229 -144 -248 -144 l-27
  0 2 212 3 211 225 53 c124 28 235 53 248 53 22 1 23 0 20 -120z`);
    return path;
  }
}

export default Cactus;