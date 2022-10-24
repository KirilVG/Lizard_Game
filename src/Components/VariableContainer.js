import * as myConstants from "./Constants";

function VariableContainer(cWidth, cHeight, lanes) {
  function killPlayer(player) {
    this.collided = true;

    player.handleDeath(this.info.deathMessage);
  }

  function restorePlayerFuel(player) {
    this.collided = true;

    player.fuel = myConstants.maxFuel;
  }

  function consumeFunStuff(player) {
    this.collided = true;

    player.fuel = myConstants.maxFuel;

    let res = Math.floor(Math.random() * 100);

    if (res <= myConstants.discoConsumableDeathChance) {
      player.handleDeath(this.info.deathMessage);
    } else {
      myConstants.setDiscoModeRemainder(myConstants.discoModeDuration);
    }
  }

  let widthScale = lanes;

  let hUnit = cHeight / myConstants.laneHeightScale;
  let wUnit = cWidth / widthScale;

  let unit = Math.floor(Math.min(hUnit, wUnit));

  let laneWidth = unit;
  let laneHeight = unit * myConstants.laneHeightScale;

  let playerHitBoxHeight = Math.floor(
    myConstants.playerHitBoxHeightScale * unit
  );
  let playerHitBoxWidth = Math.floor(myConstants.playerHitBoxWidthScale * unit);
  let playerIMGHeight = Math.floor(myConstants.playerIMGHeightScale * unit);
  let playerIMGWidth = Math.floor(myConstants.playerIMGWidthScale * unit);

  let cactusHitBoxHeight = Math.floor(
    myConstants.cactusHitBoxHeightScale * unit
  );
  let cactusHitBoxWidth = Math.floor(myConstants.cactusHitBoxWidthScale * unit);
  let cactusIMGHeight = Math.floor(myConstants.cactusIMGHeightScale * unit);
  let cactusIMGWidth = Math.floor(myConstants.cactusIMGWidthScale * unit);

  let smallCactusHitBoxHeight = Math.floor(
    myConstants.smallCactusHitBoxHeightScale * unit
  );
  let smallCactusHitBoxWidth = Math.floor(
    myConstants.smallCactusHitBoxWidthScale * unit
  );
  let smallCactusIMGHeight = Math.floor(
    myConstants.smallCactusIMGHeightScale * unit
  );
  let smallCactusIMGWidth = Math.floor(
    myConstants.smallCactusIMGWidthScale * unit
  );

  let wormHitBoxHeight = Math.floor(myConstants.wormHitBoxHeightScale * unit);
  let wormHitBoxWidth = Math.floor(myConstants.wormHitBoxWidthScale * unit);
  let wormIMGHeight = Math.floor(myConstants.wormIMGHeightScale * unit);
  let wormIMGWidth = Math.floor(myConstants.wormIMGWidthScale * unit);

  let discoConsumableHitBoxHeight = Math.floor(
    myConstants.discoConsumableHitBoxHeightScale * unit
  );
  let discoConsumableHitBoxWidth = Math.floor(
    myConstants.discoConsumableHitBoxWidthScale * unit
  );
  let discoConsumableIMGHeight = Math.floor(
    myConstants.discoConsumableIMGHeightScale * unit
  );
  let discoConsumableIMGWidth = Math.floor(
    myConstants.discoConsumableIMGWidthScale * unit
  );

  let birdHitBoxHeight = Math.floor(myConstants.birdHitBoxHeightScale * unit);
  let birdHitBoxWidth = Math.floor(myConstants.birdHitBoxWidthScale * unit);
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
    cactus: {
      hitBoxHeight: cactusHitBoxHeight,
      hitBoxWidth: cactusHitBoxWidth,
      IMGHeight: cactusIMGHeight,
      IMGWidth: cactusIMGWidth,
      pathAsString: myConstants.cactusPath,
      speedMultiplier: myConstants.cactusSpeedMultiplier,
      pathWidth: myConstants.cactusPathWidth,
      pathHeight: myConstants.cactusPathHeight,
      occupiedLanes: [0],
      occupiedLevels: [
        myConstants.levelAir,
        myConstants.levelGround,
        myConstants.levelUnder,
      ],
      type: myConstants.cactusType,
      deathMessage: "killed by a cactus",
      collisionHandler: killPlayer,
    },
    smallCactus: {
      hitBoxHeight: smallCactusHitBoxHeight,
      hitBoxWidth: smallCactusHitBoxWidth,
      IMGHeight: smallCactusIMGHeight,
      IMGWidth: smallCactusIMGWidth,
      pathAsString: myConstants.smallCactusPath,
      speedMultiplier: myConstants.smallCactusSpeedMultiplier,
      pathWidth: myConstants.smallCactusPathWidth,
      pathHeight: myConstants.smallCactusPathHeight,
      occupiedLanes: [0],
      occupiedLevels: [myConstants.levelGround, myConstants.levelUnder],
      type: myConstants.smallCactusType,
      deathMessage: "killed by a small cactus",
      collisionHandler: killPlayer,
    },
    bird: {
      hitBoxHeight: birdHitBoxHeight,
      hitBoxWidth: birdHitBoxWidth,
      IMGHeight: birdIMGHeight,
      IMGWidth: birdIMGWidth,
      pathAsString: myConstants.birdPath,
      speedMultiplier: myConstants.birdSpeedMultiplier,
      pathWidth: myConstants.birdPathWidth,
      pathHeight: myConstants.birdPathHeight,
      occupiedLanes: [-1, 0, 1],
      occupiedLevels: [myConstants.levelAir, myConstants.levelGround],
      type: myConstants.birdType,
      deathMessage: "killed by a bird",
      collisionHandler: killPlayer,
    },
    worm: {
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
      type: myConstants.wormType,
      deathMessage: "ate a worm",
      collisionHandler: restorePlayerFuel,
    },
    discoConsumable: {
      hitBoxHeight: discoConsumableHitBoxHeight,
      hitBoxWidth: discoConsumableHitBoxWidth,
      IMGHeight: discoConsumableIMGHeight,
      IMGWidth: discoConsumableIMGWidth,
      pathAsString: myConstants.discoConsumablePath,
      speedMultiplier: myConstants.discoConsumableSpeedMultiplier,
      pathWidth: myConstants.discoConsumablePathWidth,
      pathHeight: myConstants.discoConsumablePathHeight,
      occupiedLanes: [0],
      occupiedLevels: [myConstants.levelGround],
      type: myConstants.discoConsumableType,
      deathMessage: "Overdosed",
      collisionHandler: consumeFunStuff,
    },
    playerHitBoxHeight: playerHitBoxHeight,
    playerHitBoxWidth: playerHitBoxWidth,
    playerIMGHeight: playerIMGHeight,
    playerIMGWidth: playerIMGWidth,
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

export default VariableContainer;
