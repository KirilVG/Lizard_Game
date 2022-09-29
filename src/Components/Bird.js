import * as myConstants from "./Constants";
import BirdIcon from "../Images/BirdIcon.svg";

class Bird {
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
    this.gameOverCauseMessage = "Killed by bird";
    this.IMGWidth = IMGWidth;
    this.IMGHeight = IMGHeight;
    this.hitboxWidth = hitboxWidth;
    this.hitboxHeight = hitboxHeight;
    this.currentLane = currentLane;
    this.distancetotravel = distancetotravel;
    this.colided = false;
    this.image = new Image();
    this.image.src = BirdIcon;
  }

  draw(c) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      c.fillStyle = myConstants.colors[ind];
    } else {
      c.fillStyle = "black";
    }
      
      let p=this.getPath();

      const scaleX = this.IMGWidth/myConstants.birdPathWidth;
      const scaleY = this.IMGHeight/myConstants.birdPathHeight;
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
      let calculatedSpeed = currentSpeed * myConstants.birdSpeedMultiplier;
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
      (player.currentLane >= this.currentLane-1 && player.currentLane<=this.currentLane+1) &&
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

  getPath() {
    return new Path2D(`M11797 7438 c-89 -125 -162 -212 -356 -430 -382 -427 -810 -798
    -1147 -994 -74 -44 -188 -115 -252 -160 -181 -125 -184 -126 -111 -47 76 81
    129 154 129 178 0 12 -7 15 -32 11 -278 -45 -452 -101 -617 -198 -64 -38 -132
    -84 -151 -103 -43 -41 -842 -571 -1040 -689 -80 -48 -244 -137 -365 -197 -121
    -61 -256 -130 -300 -154 -110 -60 -167 -81 -338 -125 -146 -37 -148 -37 -220
    -24 -102 19 -307 86 -307 101 0 7 -10 18 -22 24 -64 33 -146 94 -137 100 19
    11 1 28 -44 40 -23 6 -69 22 -102 35 -131 51 -173 59 -315 58 -311 -1 -549
    -97 -591 -237 -7 -26 -19 -47 -26 -47 -30 0 -251 74 -373 125 -302 127 -481
    231 -1082 626 -533 351 -845 536 -1006 598 -41 16 -76 21 -157 21 -58 0 -105
    -4 -105 -8 0 -19 63 -105 126 -173 78 -83 78 -83 -71 22 -60 42 -166 110 -235
    149 -214 124 -425 281 -678 504 -211 187 -509 502 -657 696 -50 66 -302 342
    -317 348 -9 4 -8 -5 19 -113 60 -252 197 -536 350 -724 116 -144 183 -231 177
    -231 -3 0 -75 52 -161 116 -175 129 -532 368 -539 361 -9 -9 157 -329 223
    -431 36 -55 91 -132 123 -171 75 -91 275 -285 367 -355 40 -30 71 -56 69 -57
    -2 -2 -106 43 -232 101 -323 146 -585 248 -600 233 -14 -13 120 -173 265 -317
    288 -285 547 -471 769 -550 34 -13 61 -24 59 -26 -2 -2 -28 1 -58 6 -30 6
    -143 12 -252 14 l-198 3 23 -25 c27 -29 221 -175 305 -229 32 -20 92 -52 133
    -70 l75 -33 -55 0 c-66 0 -123 -15 -141 -36 -19 -23 14 -79 71 -122 64 -48
    218 -144 268 -166 31 -14 42 -25 42 -41 0 -33 39 -62 141 -107 l94 -40 125 4
    c69 3 134 8 145 12 11 5 4 -5 -15 -20 -108 -89 -170 -183 -170 -260 0 -45 5
    -58 39 -99 21 -25 56 -58 77 -73 21 -14 58 -41 82 -59 24 -18 50 -33 58 -33
    10 0 11 -6 4 -26 -16 -40 -12 -77 16 -166 29 -92 63 -145 98 -154 16 -4 26
    -15 29 -33 8 -37 48 -84 106 -123 25 -17 61 -45 80 -61 25 -21 41 -28 62 -25
    27 4 30 1 40 -36 16 -67 29 -92 58 -120 23 -22 40 -28 107 -34 l79 -7 -3 -43
    c-5 -61 16 -140 42 -157 28 -19 154 -45 215 -45 l48 0 -10 -40 c-9 -33 -8 -43
    5 -56 17 -18 233 -73 284 -74 28 0 91 16 137 35 13 6 17 2 17 -18 0 -39 28
    -62 130 -105 125 -52 167 -65 191 -59 11 3 19 0 19 -8 0 -20 74 -81 116 -96
    22 -8 74 -13 117 -12 l77 1 0 -29 c0 -36 27 -64 77 -79 30 -9 51 -8 103 3 36
    9 72 18 81 22 13 5 18 -2 22 -33 7 -41 21 -56 105 -117 64 -45 135 -58 176
    -31 24 15 25 15 36 -18 13 -39 48 -56 114 -55 64 1 106 21 125 58 15 28 24 34
    59 36 67 5 127 43 213 133 54 57 84 82 94 78 9 -3 34 6 56 21 22 14 41 24 44
    21 2 -2 11 -35 19 -73 13 -63 13 -70 -2 -81 -9 -7 -20 -10 -24 -8 -14 9 -96
    -34 -110 -56 -7 -11 -80 -62 -162 -112 -141 -86 -339 -228 -418 -300 -49 -44
    -108 -125 -108 -148 0 -24 83 -79 132 -86 44 -8 45 -11 17 -58 -37 -63 -16
    -85 119 -126 48 -15 87 -21 113 -17 21 3 39 4 39 2 0 -2 -7 -31 -16 -65 -14
    -56 -14 -63 0 -85 21 -32 47 -45 106 -52 l50 -6 0 -59 c0 -79 10 -94 69 -108
    60 -14 102 -7 139 25 l28 24 12 -44 c6 -23 40 -85 74 -136 68 -101 89 -114
    134 -85 21 15 24 15 24 1 0 -64 152 -245 206 -245 50 0 155 125 187 222 6 16
    8 16 35 1 16 -9 36 -14 45 -10 22 8 136 180 154 233 l15 44 29 -21 c38 -27 93
    -34 147 -20 52 15 65 37 60 112 l-3 59 35 1 c52 0 101 21 123 51 20 27 20 29
    4 88 -9 33 -17 61 -17 62 0 2 28 4 63 4 60 1 181 38 214 65 19 16 16 49 -7 87
    -25 40 -25 42 -2 42 28 0 141 59 151 79 35 64 -189 264 -527 470 -83 51 -157
    102 -165 114 -15 23 -68 50 -119 61 -41 9 -37 47 7 72 13 8 20 22 20 43 0 35
    3 37 31 16 10 -8 30 -15 44 -15 18 0 44 -21 96 -78 78 -85 152 -132 216 -137
    35 -2 44 -8 59 -36 20 -39 62 -57 134 -58 63 -1 97 16 109 54 6 17 11 32 12
    34 2 1 13 -4 26 -13 44 -31 99 -21 181 35 73 49 107 92 107 134 0 11 6 15 18
    11 84 -26 152 -35 183 -25 50 17 79 47 79 83 l0 31 76 -3 c55 -3 88 0 121 13
    49 19 113 70 113 90 0 8 18 14 48 17 48 5 256 88 281 113 8 7 14 27 15 44 1
    24 5 30 16 25 97 -42 142 -43 292 -8 152 36 152 35 145 93 l-5 46 50 3 c60 3
    182 28 208 42 26 14 44 75 43 148 l-1 62 47 0 c117 1 168 38 193 140 13 52 16
    55 45 55 18 0 41 9 55 21 13 12 51 40 85 63 66 44 113 101 113 137 0 16 8 23
    29 27 36 8 70 62 100 161 23 74 27 136 11 167 -9 15 -7 19 7 19 10 0 38 16 63
    35 25 20 59 44 76 55 17 11 51 44 75 72 41 49 44 55 42 110 -1 72 -36 130
    -126 215 l-62 58 142 -3 c135 -4 145 -3 210 23 124 50 163 79 163 121 0 16 9
    25 32 33 40 14 203 113 269 164 53 41 91 92 87 117 -5 27 -69 50 -138 50 l-65
    1 75 33 c42 18 102 49 133 69 72 47 273 196 310 230 26 25 36 60 19 71 -4 2
    -113 -11 -242 -30 -129 -18 -242 -33 -250 -33 -8 0 12 10 45 23 199 77 393
    205 635 422 58 51 132 122 166 156 92 96 234 278 234 300 0 22 -405 -145 -825
    -339 -5 -2 8 10 30 29 283 236 406 368 534 570 70 112 226 416 218 425 -3 3
    -52 -33 -109 -79 -158 -130 -434 -321 -549 -378 l-62 -32 54 69 c29 37 80 100
    112 138 142 169 246 370 306 592 27 97 55 262 47 271 -2 1 -33 -39 -69 -90z`);
  }
}

export default Bird;