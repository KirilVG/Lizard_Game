import * as myConstants from "./Constants";
import LizardIcon from "../Images/LizardIcon.svg"

class Player {
  constructor(
    xPos,
    yPos,
    IMGWidth,
    IMGHeight,
    hitboxWidth,
    hitboxHeight,
    currentLane,
    LanesNum,
    stepLength,
    underGroundAnimationTime,
    inAirAnimationTime,
    jumpHeightScale,
    gameOverHook
  ) {
    this.position = {
      x: xPos,
      y: yPos,
    };
    this.IMGHeight = IMGHeight;
    this.IMGWidth = IMGWidth;
    this.hitboxHeight = hitboxHeight;
    this.hitboxWidth = hitboxWidth;
    this.currentLane = currentLane;
    this.LanesNum = LanesNum;
    this.stepLength = stepLength;
    this.underGroundAnimationTime = underGroundAnimationTime;
    this.inAirAnimationTime = inAirAnimationTime;
    this.level = myConstants.levelGround;
    this.jumpHeightScale = jumpHeightScale;
    this.score = myConstants.initialScore;
    this.isDead = false;
    this.gameOverHook = gameOverHook;
    this.fuel = myConstants.maxfuel;
    this.image = new Image();
    this.image.src = LizardIcon;
    this.valuemultiplier = myConstants.initialValueMultiplier;
  }

  draw(c) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      c.fillStyle = myConstants.colors[ind];
    } else {
      c.fillStyle = "black";
    }

    if (this.level == myConstants.levelGround) {
      let p = this.getPath();

      const scaleX = this.IMGWidth / myConstants.playerPathWidth;
      const scaleY = this.IMGHeight / myConstants.playerPathHeight;
      const translateX = this.position.x - this.IMGWidth / 2;
      const translateY = this.position.y;
      const angle = 0;
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
    } else if (this.level == myConstants.levelUnder) {
      c.globalAlpha = myConstants.undergroundAnimationOpacity;

      c.drawImage(
        this.image,
        this.position.x - this.IMGWidth / 2,
        this.position.y,
        this.IMGWidth,
        this.IMGHeight
      );
      c.globalAlpha = 1;
    } else if (this.level == myConstants.levelAir) {
      let newIMGWidth = this.IMGWidth * this.jumpHeightScale;
      let newIMGHeight = this.IMGHeight * this.jumpHeightScale;

      c.drawImage(
        this.image,
        this.position.x - newIMGWidth / 2,
        this.position.y - (newIMGHeight - this.IMGHeight),
        newIMGWidth,
        newIMGHeight
      );
    }

    if (myConstants.displayHitboxes) {
      c.fillStyle = "green";

      c.globalAlpha = myConstants.hitboxOpacity;
      c.fillRect(
        this.position.x - this.hitboxWidth / 2,
        this.position.y,
        this.hitboxWidth,
        this.hitboxHeight
      ); //displays hitbox
      c.globalAlpha = 1;
      c.fillStyle = "black";
    }
  }

  update(c) {
    this.score += 1 * myConstants.scoreMultiplier * this.valuemultiplier;

    this.fuel -= myConstants.fuelLos * this.valuemultiplier;

    this.draw(c);
  }

  handleDeath(cause) {
    this.isDead = true;
    this.gameOverHook({ message: cause, score: Math.round(this.score) });
  }

  handleMovement(direction) {
    switch (direction) {
      case myConstants.dirUp:
        if (this.level == myConstants.levelGround) {
          this.level = myConstants.levelAir;
          setTimeout(
            () => (this.level = myConstants.levelGround),
            this.inAirAnimationTime
          );
        }
        break;
      case myConstants.dirDown:
        if (this.level == myConstants.levelGround) {
          this.level = myConstants.levelUnder;
          setTimeout(
            () => (this.level = myConstants.levelGround),
            this.underGroundAnimationTime
          );
        }
        break;
      case myConstants.dirLeft:
        if (this.currentLane > 0 && this.level != myConstants.levelAir) {
          this.position.x -= this.stepLength;
          this.currentLane--;
        }
        break;
      case myConstants.dirRight:
        if (
          this.currentLane < this.LanesNum - 1 &&
          this.level != myConstants.levelAir
        ) {
          this.position.x += this.stepLength;
          this.currentLane++;
        }
        break;
      default:
        break;
    }
  }
  getPath() {
    let path = new Path2D(`M0.705,270.191
		c0.668-2.699,2.87-4.689,4.807-6.684c1.275-1.312,2.51-2.841,3.14-4.52c-4.316-5.865-6.144-13.627-6.139-21.036
		c0.003-4.808,0.913-9.947,3.426-13.907c0.443-1.87,1.369-3.584,2.869-4.821c2.352-1.937,5.601-2.457,8.636-2.198
		c3.036,0.258,5.963,1.208,8.929,1.905c5.334,1.254,10.858,1.685,16.323,1.298c-4.794-4.323-9.26-8.857-11.566-14.751
		c-5.452-13.929,2.943-37.338-4.209-50.474c3.201-2.72,2.803-8.56-0.737-10.821c1.141-2.334,2.283-4.667,3.424-7.001l-3.681-2.197
		c2.938-3.265,3.569-8.402,1.509-12.28c3.235-1.133,4.889-5.429,3.25-8.439c-0.421-0.773-1.025-1.482-1.159-2.351
		c-0.291-1.881,1.634-3.264,3.242-4.281c3.193-2.018,9.683-11.714,6.593-11.826c-3.302-0.12-6.603-0.239-9.905-0.359
		c-0.814,0.24-1.667,0.338-2.522,0.24c-2.442-0.282-4.592-1.848-6.094-3.793c-1.502-1.945-2.443-4.257-3.32-6.553
		c-1.265-3.314-2.449-6.739-2.507-10.286c-0.004-0.246,0.007-0.495,0.017-0.743c-3.295-1.787-6.591-3.575-9.886-5.363
		c-0.44-0.238-0.954-0.669-0.758-1.129c0.12-0.281,0.453-0.393,0.752-0.458c2.477-0.536,5.077,0.07,7.348,1.224
		c-2.429-3.745-4.063-8.01-4.683-12.428c-0.072-0.51,0.591-0.794,0.893-0.377c3.2,4.408,5.948,9.141,8.207,14.097
		c0.246-0.19,0.502-11.501,1.117-16.979c0.909-1.6,1.711,2.148,1.905,3.54c0.602,4.316,0.68,8.704,0.239,13.039
		c0.151,0.035,0.083,0.019,0.234,0.054c1.008-2.703,2.284-5.307,3.821-7.748c0.292-0.463,1.002-0.292,1.086,0.249
		c0.338,2.17,0.294,4.399-0.137,6.553c-0.325,1.628-0.922,3.234-1.938,4.533c2.23,4.209,4.461,8.419,6.691,12.628
		c2.348-2.298,5.353-4.112,8.228-5.764c3.605-2.071,7.412-4.454,9.768-7.74c-2.136,0.086-4.265-0.247-6.248-1.117
		c0.361-1.558,0.722-3.116,1.083-4.675c-1.451-0.186-2.903-0.372-4.354-0.558c1.057-0.554,1.55-1.982,1.061-3.07
		c-0.49-1.088-1.886-1.666-3.001-1.243c1.469-5.773,3.147-11.506,5.405-17.019c2.871-7.01,6.681-13.647,11.421-19.555
		c2.105-2.625,4.395-5.109,6.288-7.891c2.414-3.547,4.158-7.542,6.838-10.893c2.563-3.205,6.332-5.821,10.396-5.72V0.503
		c0.093-0.008,0.184,0.005,0.277,0c0.093,0.005,0.183-0.008,0.277,0v0.001c4.063-0.101,7.833,2.515,10.396,5.72
		c2.68,3.351,4.424,7.346,6.838,10.893c1.893,2.782,4.183,5.266,6.288,7.891c4.74,5.908,8.55,12.545,11.421,19.555
		c2.258,5.513,3.936,11.246,5.405,17.019c-1.115-0.424-2.512,0.155-3.001,1.243c-0.49,1.088,0.004,2.517,1.061,3.07
		c-1.451,0.186-2.903,0.372-4.354,0.558c0.361,1.558,0.722,3.116,1.083,4.675c-1.984,0.87-4.112,1.203-6.248,1.117
		c2.356,3.287,6.163,5.669,9.768,7.74c2.875,1.652,5.88,3.466,8.228,5.764c2.23-4.209,4.461-8.419,6.691-12.628
		c-1.016-1.299-1.613-2.905-1.938-4.533c-0.432-2.162-0.475-4.4-0.133-6.578c0.084-0.532,0.781-0.701,1.069-0.245
		c1.544,2.447,2.823,5.058,3.835,7.769c0.151-0.035,0.083-0.019,0.234-0.054c-0.441-4.335-0.363-8.723,0.239-13.039
		c0.194-1.392,0.587-4.546,1.905-3.54c0.614,5.478,0.87,16.788,1.117,16.979c2.285-5.012,5.07-9.796,8.316-14.246
		c0.267-0.366,0.873-0.132,0.813,0.317c-0.597,4.493-2.244,8.833-4.712,12.637c2.271-1.154,4.871-1.759,7.348-1.224
		c0.298,0.065,0.632,0.177,0.752,0.458c0.196,0.46-0.318,0.891-0.758,1.129c-3.295,1.788-6.591,3.575-9.886,5.363
		c0.01,0.248,0.021,0.496,0.017,0.743c-0.058,3.547-1.241,6.972-2.507,10.286c-0.877,2.296-1.818,4.608-3.32,6.553
		c-1.502,1.945-3.653,3.511-6.094,3.793c-0.856,0.099-1.708,0.001-2.522-0.24c-3.302,0.12-6.603,0.239-9.905,0.359
		c-3.09,0.112,2.57,9.282,6.593,11.826c1.609,1.017,3.533,2.4,3.242,4.281c-0.134,0.869-0.738,1.579-1.159,2.351
		c-1.64,3.01,0.015,7.307,3.25,8.439c-2.06,3.879-1.429,9.016,1.509,12.28l-3.681,2.197c1.141,2.334,2.283,4.667,3.424,7.001
		c-3.54,2.26-3.938,8.101-0.737,10.821c-7.153,13.137,1.243,36.546-4.209,50.474c-2.307,5.893-6.773,10.427-11.566,14.751
		c5.465,0.387,10.989-0.044,16.323-1.298c2.966-0.697,5.893-1.647,8.929-1.905c3.036-0.258,6.285,0.261,8.636,2.198
		c1.501,1.236,2.426,2.95,2.869,4.821c2.514,3.96,3.423,9.099,3.426,13.907c0.005,7.409-1.823,15.171-6.139,21.036
		c0.63,1.679,1.865,3.208,3.14,4.52c1.937,1.994,4.139,3.985,4.807,6.684c0.525,2.123-0.009,4.398-1.02,6.338
		c-1.011,1.94-1.883,5.459-3.329,7.101c0.31-1.632,0.028-5.133,0.139-6.788c-1.197,3.993-3.464,7.668-6.532,10.492
		c-0.618-3.531,1.064-7.001,2.463-10.302c0.438-1.034,0.838-2.126,1.148-3.232c-2.794-1.374-5.542-2.857-7.89-4.888
		c-0.071-0.062-0.137-0.131-0.208-0.194c-0.882,2.455-0.703,5.309,0.673,7.537c0.357,0.578,0.78,1.35,0.335,1.865
		c-0.352,0.406-1.013,0.312-1.491,0.067c-1.82-0.932-2.418-3.211-2.69-5.238c-0.38-2.828-0.492-5.69-0.355-8.54
		c-0.904-1.604-1.499-3.357-1.611-5.196c-0.175-2.88,0.81-5.666,1.943-8.346c-1.034-3.169-1.889-6.412-2.691-9.651
		c-3.653,0.71-7.399,0.982-11.094,1.495c-5.862,0.814-11.628,2.288-17.181,4.336c-2.129,7.143-8.427,14.885-8.295,22.398
		c0.192,10.926,1.449,21.93-0.211,32.731c-2.384,15.507-10.596,29.457-19.367,42.466c-8.77,13.009-18.361,25.699-24.121,40.293
		c-5.759,14.594-7.231,31.792,0.283,45.565c-9.171-7.344-12.843-19.953-12.063-31.675c0.78-11.723,5.397-22.818,10.29-33.5
		c4.893-10.681,10.175-21.353,12.438-32.882c3.026-15.419,5.577-37.599-1.81-51.468c-8.048-15.109-8.837-33.087-9.986-33.53
		c-5.895-2.273-12.052-3.865-18.309-4.734c-3.695-0.513-7.441-0.785-11.094-1.495c-0.802,3.239-1.658,6.482-2.691,9.651
		c1.133,2.681,2.118,5.466,1.943,8.346c-0.112,1.839-0.707,3.592-1.611,5.196c0.137,2.85,0.025,5.712-0.355,8.54
		c-0.272,2.027-0.87,4.306-2.69,5.238c-0.478,0.245-1.139,0.34-1.491-0.067c-0.445-0.514-0.022-1.286,0.335-1.865
		c1.376-2.228,1.555-5.082,0.673-7.537c-0.071,0.063-0.137,0.132-0.208,0.194c-2.347,2.031-5.095,3.514-7.89,4.888
		c0.31,1.107,0.71,2.198,1.148,3.232c1.398,3.301,3.08,6.771,2.463,10.302c-3.068-2.824-5.335-6.5-6.532-10.492
		c0.111,1.654-0.519,4.693-0.208,6.325c-1.445-1.642-1.97-4.699-2.982-6.639C0.714,274.59,0.18,272.315,0.705,270.191z`);
    return path;
  }
}

export default Player;