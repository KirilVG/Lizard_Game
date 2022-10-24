import ApproachingObject from "./ApproachingObject";

const CollidableObjectFactory = {
  createBird: (info, lanesNum) => {
    let col = Math.floor(Math.random() * (lanesNum - 2)) + 1;

    let originX = info.laneOriginX + col * info.laneWidth + info.laneWidth / 2;

    let originY = info.laneOriginY;

    let bird = new ApproachingObject(
      originX,
      originY,
      info.bird,
      col,
      info.laneHeight
    );

    return bird;
  },

  createWorm: function (info, lanesNum) {
    let col = Math.floor(Math.random() * lanesNum);

    let originX = info.laneOriginX + col * info.laneWidth + info.laneWidth / 2;

    let originY = info.laneOriginY;

    let worm = new ApproachingObject(
      originX,
      originY,
      info.worm,
      col,
      info.laneHeight
    );

    return worm;
  },

  createDiscoConsumable: function (info, lanesNum) {
    let col = Math.floor(Math.random() * lanesNum);

    let originX = info.laneOriginX + col * info.laneWidth + info.laneWidth / 2;

    let originY = info.laneOriginY;

    let discoConsumable = new ApproachingObject(
      originX,
      originY,
      info.discoConsumable,
      col,
      info.laneHeight
    );

    return discoConsumable;
  },

  createCactus: function (info, lanesNum) {
    let col = Math.floor(Math.random() * lanesNum);

    let originX = info.laneOriginX + col * info.laneWidth + info.laneWidth / 2;

    let originY = info.laneOriginY;

    let cactus = new ApproachingObject(
      originX,
      originY,
      info.cactus,
      col,
      info.laneHeight
    );

    return cactus;
  },

  createSmallCactus: function (info, lanesNum) {
    let col = Math.floor(Math.random() * lanesNum);

    let originX = info.laneOriginX + col * info.laneWidth + info.laneWidth / 2;

    let originY = info.laneOriginY;

    let smallCactus = new ApproachingObject(
      originX,
      originY,
      info.smallCactus,
      col,
      info.laneHeight,
      
    );

    return smallCactus;
  },
};

export default CollidableObjectFactory;
