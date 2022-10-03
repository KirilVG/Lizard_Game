import * as myConstants from "./Constants";

function ScaleCalculator(cWidth, cHeight, lanes) {

  function killPlayer(player) {
    this.collided = true;
    player.handleDeath(this.info.deathMessage);
  }

  function restorePlayerFuel(player) {
    this.collided = true;
    player.fuel = myConstants.maxfuel;
  }

  let widthScale = lanes;

  let hUnit = cHeight / myConstants.laneHeightScale;
  let wUnit = cWidth / widthScale;

  let unit = Math.floor(Math.min(hUnit, wUnit));

  let laneWidth = unit;
  let laneHeight = unit * myConstants.laneHeightScale;

  let playerHitboxHeight = Math.floor(
    myConstants.playerHitboxHeightScale * unit
  );
  let playerHitboxWidth = Math.floor(myConstants.playerHitboxWidthScale * unit);
  let playerIMGHeight = Math.floor(myConstants.playerIMGHeightScale * unit);
  let playerIMGWidth = Math.floor(myConstants.playerIMGWidthScale * unit);

  let cactusHitBoxHeight = Math.floor(
    myConstants.cactusHitboxHeightScale * unit
  );
  let cactusHitBoxWidth = Math.floor(myConstants.cactusHitboxWidthScale * unit);
  let cactusIMGHeight = Math.floor(myConstants.cactusIMGHeightScale * unit);
  let cactusIMGWidth = Math.floor(myConstants.cactusIMGWidthScale * unit);

  let smallCactusHitBoxHeight = Math.floor(
    myConstants.smallCactusHitboxHeightScale * unit
  );
  let smallCactusHitBoxWidth = Math.floor(
    myConstants.smallCactusHitboxWidthScale * unit
  );
  let smallCactusIMGHeight = Math.floor(
    myConstants.smallCactusIMGHeightScale * unit
  );
  let smallCactusIMGWidth = Math.floor(
    myConstants.smallCactusIMGWidthScale * unit
  );

  let wormHitBoxHeight = Math.floor(myConstants.wormHitboxHeightScale * unit);
  let wormHitBoxWidth = Math.floor(myConstants.wormHitboxWidthScale * unit);
  let wormIMGHeight = Math.floor(myConstants.wormIMGHeightScale * unit);
  let wormIMGWidth = Math.floor(myConstants.wormIMGWidthScale * unit);

  let birdHitBoxHeight = Math.floor(myConstants.birdHitboxHeightScale * unit);
  let birdHitBoxWidth = Math.floor(myConstants.birdHitboxWidthScale * unit);
  let birdIMGHeight = Math.floor(myConstants.birdIMGHeightScale * unit);
  let birdIMGWidth = Math.floor(myConstants.birdIMGWidthScale * unit);

  let laneOriginX = Math.floor((cWidth - lanes * unit) / 2);
  let laneOriginY = Math.floor((cHeight - laneHeight) / 2);

  let playerLaneNum = Math.floor(lanes / 2);

  let playerOriginX = Math.floor(
    laneOriginX + playerLaneNum * laneWidth + laneWidth / 2
  );
  let playerOriginY = Math.floor(
    laneOriginY + Math.floor(laneHeight - playerIMGHeight)
  );

  let lineSeparatorWidth = Math.floor(
    unit * myConstants.lineSepaRatorWidthScale
  );

  let speed = unit * myConstants.speedScale;

  return {
    cactus:{
      hitBoxHeight: cactusHitBoxHeight,
      hitBoxWidth: cactusHitBoxWidth,
      IMGHeight: cactusIMGHeight,
      IMGWidth: cactusIMGWidth,
      pathAsString: myConstants.cactusPath,
      speedMultiplier: myConstants.cactusSpeedMultiplier,
      pathWidth: myConstants.cactusPathWidth,
      pathHeight: myConstants.cactusPathHeight,
      occupiedLanes: [0],
      occupiedLevels: [myConstants.levelAir,myConstants.levelGround,myConstants.levelUnder],
      deathMessage: "killed by a cactus",
      collisionHandler: killPlayer,
    },
    smallCactus:{
      hitBoxHeight: smallCactusHitBoxHeight,
      hitBoxWidth: smallCactusHitBoxWidth,
      IMGHeight: smallCactusIMGHeight,
      IMGWidth: smallCactusIMGWidth,
      pathAsString: myConstants.smallCactusPath,
      speedMultiplier: myConstants.smallCactusSpeedMultiplier,
      pathWidth: myConstants.smallCactusPathWidth,
      pathHeight: myConstants.smallCactusPathHeight,
      occupiedLanes: [0],
      occupiedLevels: [myConstants.levelGround,myConstants.levelUnder],
      deathMessage: "killed by a small cactus",
      collisionHandler: killPlayer,
    },
    bird:{
      hitBoxHeight: birdHitBoxHeight,
      hitBoxWidth: birdHitBoxWidth,
      IMGHeight: birdIMGHeight,
      IMGWidth: birdIMGWidth,
      pathAsString: myConstants.birdPath,
      speedMultiplier: myConstants.birdSpeedMultiplier,
      pathWidth: myConstants.birdPathWidth,
      pathHeight: myConstants.birdPathHeight,
      occupiedLanes: [-1,0,1],
      occupiedLevels: [myConstants.levelAir,myConstants.levelGround],
      deathMessage: "killed by a bird",
      collisionHandler: killPlayer,
    },
    worm:{
      hitBoxHeight: wormHitBoxHeight,
      hitBoxWidth: wormHitBoxWidth,
      IMGHeight: wormIMGHeight,
      IMGWidth: wormIMGWidth,
      pathAsString: myConstants.wormPath,
      speedMultiplier: myConstants.wormSpeedMultiplier,
      pathWidth: myConstants.wormPathWidth,
      pathHeight: myConstants.wormPathHeight,
      occupiedLanes: [0],
      occupiedLevels: [myConstants.levelGround],
      deathMessage: "ate a worm",
      collisionHandler: restorePlayerFuel,
    },
    playerHitboxHeight: playerHitboxHeight,
    playerHitboxWidth: playerHitboxWidth,
    playerIMGHeight: playerIMGHeight,
    playerIMGWidth: playerIMGWidth,
    cactusIMGHeight: cactusIMGHeight,
    cactusIMGWidth: cactusIMGWidth,
    smallCactusIMGHeight: smallCactusIMGHeight,
    smallCactusIMGWidth: smallCactusIMGWidth,
    //birdHitboxHeight: birdHitboxHeight,
    //birdHitboxWidth: birdHitboxWidth,
    birdIMGHeight: birdIMGHeight,
    birdIMGWidth: birdIMGWidth,
    //wormHitboxHeight: wormHitboxHeight,
    //wormHitboxWidth: wormHitboxWidth,
    wormIMGHeight: wormIMGHeight,
    wormIMGWidth: wormIMGWidth,
    playerStartingLane: playerLaneNum,
    laneOriginX: laneOriginX,
    laneOriginY: laneOriginY,
    laneWidth: laneWidth,
    laneHeight: laneHeight,
    playerOriginX: playerOriginX,
    playerOriginY: playerOriginY,
    lineSepaRatorWidth: lineSeparatorWidth,
    initialSpeed: speed,
  };
}

export default ScaleCalculator;
