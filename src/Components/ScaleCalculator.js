import * as myConstants from "./Constants";

function ScaleCalculator(cWidth, cHeight, lanes) {
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

  let cactusHitboxHeight = Math.floor(
    myConstants.cactusHitboxHeightScale * unit
  );
  let cactusHitboxWidth = Math.floor(myConstants.cactusHitboxWidthScale * unit);
  let cactusIMGHeight = Math.floor(myConstants.cactusIMGHeightScale * unit);
  let cactusIMGWidth = Math.floor(myConstants.cactusIMGWidthScale * unit);

  let smallCactusHitboxHeight = Math.floor(
    myConstants.smallCactusHitboxHeightScale * unit
  );
  let smallCactusHitboxWidth = Math.floor(
    myConstants.smallCactusHitboxWidthScale * unit
  );
  let smallCactusIMGHeight = Math.floor(
    myConstants.smallCactusIMGHeightScale * unit
  );
  let smallCactusIMGWidth = Math.floor(
    myConstants.smallCactusIMGWidthScale * unit
  );

  let wormHitboxHeight = Math.floor(myConstants.wormHitboxHeightScale * unit);
  let wormHitboxWidth = Math.floor(myConstants.wormHitboxWidthScale * unit);
  let wormIMGHeight = Math.floor(myConstants.wormIMGHeightScale * unit);
  let wormIMGWidth = Math.floor(myConstants.wormIMGWidthScale * unit);

  let birdHitboxHeight = Math.floor(myConstants.birdHitboxHeightScale * unit);
  let birdHitboxWidth = Math.floor(myConstants.birdHitboxWidthScale * unit);
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
    playerHitboxHeight: playerHitboxHeight,
    playerHitboxWidth: playerHitboxWidth,
    playerIMGHeight: playerIMGHeight,
    playerIMGWidth: playerIMGWidth,
    cactusHitboxHeight: cactusHitboxHeight,
    cactusHitboxWidth: cactusHitboxWidth,
    cactusIMGHeight: cactusIMGHeight,
    cactusIMGWidth: cactusIMGWidth,
    smallCactusHitboxHeight: smallCactusHitboxHeight,
    smallCactusHitboxWidth: smallCactusHitboxWidth,
    smallCactusIMGHeight: smallCactusIMGHeight,
    smallCactusIMGWidth: smallCactusIMGWidth,
    birdHitboxHeight: birdHitboxHeight,
    birdHitboxWidth: birdHitboxWidth,
    birdIMGHeight: birdIMGHeight,
    birdIMGWidth: birdIMGWidth,
    wormHitboxHeight: wormHitboxHeight,
    wormHitboxWidth: wormHitboxWidth,
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
